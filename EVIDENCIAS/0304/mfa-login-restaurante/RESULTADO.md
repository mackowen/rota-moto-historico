# Campanha 0304 — MFA indisponível no login do Restaurante

**Resultado: PARTIAL.** O login/MFA sintético foi validado pela interface e pela API HTTP reais. A conta administradora afetada continua sem o arquivo MFA referenciado pelo banco; não foi substituído nem redefinido seu fator.

## Causa raiz

Os serviços estavam ativos: Nginx, Restaurante `8083`, Motoboy `8084` e API E2E `8787` responderam; `/health/ready` retornou `200`. A API em `8787` estava no checkout do Restaurante, em `NODE_ENV=test`, conectada a `rotamoto_e2e`. O HTML, `identity-ui.js` e `asset-manifest.js` servidos em `8083` coincidem com o checkout pelos SHA-256 registrados abaixo.

A mensagem do Chrome corresponde a `MFA_PROVIDER_UNAVAILABLE` (HTTP `503`). O fluxo de login verifica a referência criptografada com o keystore e converte falhas do provider em indisponibilidade MFA. A comparação do commit recente `d26b848` mostrou alterações somente em associação de Motoboys, UI administrativa e testes; nenhum arquivo de login ou MFA foi alterado.

A causa encontrada foi o cleanup do harness temporário `~/projetos/browser-tests/.temporarias/0304-team-invitations-e2e.cjs`: após o rollback PostgreSQL, ele consultava as referências MFA de todos os integrantes ativos de Chico, classificava cada referência diferente da referência da conta QA como temporária e removia esses arquivos do keystore. Assim, o banco conservava a referência de um administrador de plataforma e da empresa, mas seu arquivo cifrado deixou de existir. A referência QA continuou legível. O estado observado e o caminho de remoção do harness explicam a regressão temporal sem implicar as alterações de produto em Motoboys.

Foi procurada uma cópia com o nome cifrado exato nos diretórios conhecidos de keystore, manutenção e recuperação do RotaMoto. Nenhuma cópia foi encontrada. Dumps PostgreSQL preservam a referência, não o segredo MFA. A execução atual não acessou a senha, o TOTP, os códigos de recuperação ou a sessão do proprietário; não alterou a conta afetada, `rotamoto`, migrations ou dados empresariais.

## Correção preventiva

O harness agora remove somente referências registradas pelo seu próprio `secretProvider.put()`. Também rejeita `put()` com uma referência explícita, para não sobrescrever nem remover um segredo preexistente durante cleanup. `node --check` passou. Essa correção impede repetir a remoção de fatores de outros integrantes.

O keystore ausente não pode ser reconstruído a partir da referência. Para recuperar acesso sem bypass, o titular pode usar um código de recuperação previamente emitido no campo MFA e seguir o fluxo autenticado de substituição do fator. Se não houver código disponível, é necessário o procedimento local de recuperação auditada e autorizado. Nenhum desses procedimentos foi iniciado nesta execução.

## Login sintético por HTTP real

Browser QA isolado carregou a página servida por `8083`; as requisições atravessaram Nginx e chegaram ao processo API persistente `8787` em `rotamoto_e2e`. Foi usada a fixture MFA sintética protegida do E2E, vinculada somente a Chico Restaurante. Este ensaio não usou handlers transacionais do harness.

| Ação | HTTP/resultado |
|---|---|
| Login sem código, apresentação do desafio | `403 MFA_REQUIRED` |
| Código MFA inválido | `403 MFA_REQUIRED` |
| TOTP sintético válido | `200` |
| Leitura de sessão autenticada | `200`, MFA verificado, empresa Chico Restaurante |
| Configurações → Motoboys | Conteúdo carregado, sem erro de interface |
| Reload | Sessão restaurada e MFA verificado |
| Logout com CSRF | `204`; a sessão deixou de ser autenticada |
| Exceções JS e erros de console | `0` |

O login válido também confirma que a API atual lê e verifica fatores MFA do keystore corretamente quando a referência possui arquivo e contexto válidos. A conta que perdeu o arquivo não foi usada no browser.

## Serviços e arquivos servidos

| Arquivo | HTTP | SHA-256 checkout = HTTP |
|---|---:|---|
| `index.html` | 200 | `321a9d5c4a1137f522bd2263307f606a99f7fba85e11fae86c6f44f19b828eaf` |
| `identity-ui.js` | 200 | `ae00f9057e75c083f6c6127a8fba574a5fa45f0bca1e7a9c40c4e5fa0ce0c421` |
| `asset-manifest.js` | 200 | `801299968e3314a5af05b2f3da112e0eb1e63cfefb6c991dcb11f35549d5b668` |

HTTP final: `8083=200`, `8084=200`, `8787 /health/ready=200`. O runit API não tem subserviço de log dedicado; a resposta HTTP foi observada diretamente. Nenhum segredo ou dado pessoal foi escrito em evidência.

## Testes e gates

- `node --check` no harness corrigido: **PASS**.
- `npm run test:identity-http` com `NODE_ENV=test` e URLs locais explícitas: **PASS** — inclui sessão, CSRF, tenant/RLS, MFA, permissões e erros; o ramo de bootstrap inicial não foi executado porque o fundador persistente foi preservado.
- Browser QA autenticado sintético contra `8083 → 8787`: **PASS** para desafio, MFA inválido/válido, sessão, Motoboys, reload e logout.
- SHA-256 HTTP da publicação `8083`: **MATCH** para os três arquivos.
- Login da conta administradora sem arquivo MFA: **BLOCKED** até recuperação autorizada do fator.

Não houve alteração de código nos aplicativos; portanto, não foram criados commits locais de Restaurante ou Motoboy. Evidência documental e atualização do backlog estão no commit do histórico informado no registro da Campanha 0304. Nenhum push de aplicativo foi feito.

G14 continua FAIL; a Campanha 0304 permanece aberta e a Campanha 0305 não foi iniciada.

## Reavaliação e correção de recuperação — 2026-11-02

**Resultado: PARTIAL.** A causa do arquivo perdido e a proteção do harness continuam confirmadas. A recuperação do fator do titular não foi executada. A reavaliação constatou que o banco atual também diverge do estado usado no QA anterior.

### Estado atual e recuperação de arquivos

- Nginx, Restaurante `8083`, Motoboy `8084`, API E2E `8787` e API `8788` responderam HTTP 200; `/health/ready` em `8787` passou. A API E2E usa o checkout Restaurante, `NODE_ENV=test`, banco `rotamoto_e2e` e papel `rotamoto_e2e_app`.
- O E2E está na migration `0066_identity_linked_companies`, com **zero empresas, zero vínculos, dois usuários e dois fatores MFA obrigatórios**. A identidade mascarada `m***@gmail.com` é o fundador do latch e tem grant global ativo, mas não possui membership ativo. O registro MFA permanece obrigatório; fingerprint SHA-256 da referência: `77035b51a331`; arquivo cifrado ausente. O keystore E2E tem dois arquivos cifrados, nenhum correspondente ao fundador.
- `rotamoto` não contém empresas, usuários ou vínculos e não contém essa identidade. Nenhuma consulta de escrita, alteração de banco, criação de empresa/conta ou alteração de keystore ocorreu.
- O dump `rotamoto-e2e-final-20261031.dump` passou `pg_restore --list` e a leitura direcionada de suas tabelas confirma que, naquela cópia, existiam a mesma identidade/referência, **Chico Restaurante e um membership do fundador**. É um dump PostgreSQL, não contém o arquivo MFA e não recupera o fator. O dump não foi restaurado.
- Nenhuma cópia cifrada do fator ou envelope de recuperação E2E correspondente foi encontrada. Os envelopes de keystore disponíveis pertencem ao armazenamento oficial e não são compatíveis com o fator E2E.
- A discrepância entre o dump e o banco atual — ausência da empresa e do vínculo — não foi atribuída ao harness: a execução de QA desta atualização usa rollback e não deixou registros. A causa/execução que removeu o estado empresarial continua indeterminada.

### Comportamento e recuperação segura

O login valida membership e empresa ativos antes de consultar o provedor MFA. Portanto, no estado atual do E2E, a conta não alcança a verificação MFA e o `503 MFA_PROVIDER_UNAVAILABLE` do relato anterior não pode ser reproduzido usando esse banco atual; a falha ocorre antes, por ausência de vínculo. Não foi tentado login real do titular nem usada senha, sessão ou código pessoal.

Foi corrigido um bloqueio de recuperação sem desativar MFA: a etapa autenticada de substituição de autenticador agora aceita TOTP ou um código de recuperação ainda não usado, em formatos de 20 caracteres hexadecimais ou agrupados. O backend mantém a validação da senha atual e consome o código de recuperação uma única vez na mesma transação. O fator novo só fica ativo após confirmação TOTP. O ajuste não redefine nenhuma conta.

O fluxo administrativo existente requer contexto de empresa e confirmação autorizada; o procedimento local existente é limitado ao banco oficial `rotamoto`. Não foi executado contra o E2E. Assim, sem arquivo ou código de recuperação utilizável, ainda é necessária confirmação do titular antes de preparar/executar qualquer recuperação administrativa do fundador E2E.

### Testes e publicação

- `npm test`: **PASS**; `npm run assets:check`: **PASS**; `git diff --check`: **PASS**; `node --check` dos arquivos alterados: **PASS**.
- `npm run test:identity-http` em `rotamoto_e2e`: **PASS** com HTTP local, handlers de produção e transação/savepoints revertidos. Cobriu referência de keystore ausente (`503`, sem cookie/sessão), recuperação sintética aprovada, login limitado, novo enrollment, TOTP válido, substituição usando código de recuperação, rejeição de replay, novo login e sessão MFA verificada. As identidades e a empresa eram fixtures transacionais; não é o serviço autenticado do titular.
- Chromium/CDP temporário em `390×844`: **PASS** para a página real servida em `8083`, validando o campo TOTP/código de recuperação e seu padrão HTML; nenhum erro JS/console. **Anônimo**, não Browser QA autenticado.
- Após reiniciar somente a API E2E, a validação HTTP do endpoint de enrollment aceitou a forma sintática de recovery proof até a barreira de autenticação (`401`) e rejeitou formato inválido na fronteira (`400`). `8083`, `8084` e readiness `8787` responderam `200`.
- SHA-256 checkout = HTTP: `index.html` `515900ba8bd2a6d93225b606a80af02220198d3ca1d09b647198491e01977e99`; `identity-ui.js` `ccc8d6d1417109b44b7d1b980b458cbc0fc6d8d991726a7e61bc6a2313348c90`; `asset-manifest.js` `e77c9e6036da9e8a1d6fa0361e808df3d69712f0d13fb3d236b79c11f2ddfe8a`.
- Readback após a suíte: E2E ainda com zero empresas/vínculos, dois usuários, nenhum usuário fixture persistido e migration `0066_identity_linked_companies`. Nenhuma migration foi criada/aplicada.

Commit local Restaurante: `380afce` (`Allow MFA recovery codes for factor replacement`). Motoboy não alterado. Nenhum push dos aplicativos.

### Gates atualizados

| Gate | Estado | Evidência |
|---|---|---|
| Serviços, alvo e harness | PASS | Processos, readiness, banco/role e `node --check`; cleanup limitado às referências criadas pelo próprio harness |
| Cópia/restore do fator | BLOCKED | Referência ativa sem arquivo; nenhum backup cifrado E2E válido |
| Recovery proof e re-enrollment sintético | PASS | `test:identity-http` com rollback e TOTP nativo |
| Browser QA anônimo do formulário | PASS | Chromium 390×844 e hashes HTTP |
| Browser QA autenticado do titular | BLOCKED | E2E atual não tem empresa nem membership; não foram usadas credenciais pessoais |
| Login real do titular | BLOCKED | Requer restaurar o contexto empresarial e um fator autorizado |

### Confirmação necessária antes de qualquer alteração sensível

O próximo passo de recuperação exige confirmação explícita do titular para (1) restaurar **somente** Chico Restaurante e o membership preexistente do fundador a partir do dump validado de 2026-10-31, após criar backup verificável do E2E atual; isso não restaura o segredo MFA e não deve reverter outros dados do banco; e, somente se não houver fator/código de recuperação utilizável, (2) autorizar recuperação MFA de uso único do fundador nesse E2E. A segunda ação preservará senha, identidade, founder latch, grant e `mfa_required=true`, revogará sessões existentes e exigirá cadastro e confirmação de um novo fator; o fator apagado não poderá ser restaurado sem sua cópia original. Nenhuma dessas ações foi iniciada.

G14 continua FAIL; Campanha 0304 aberta; Campanha 0305 não iniciada.
