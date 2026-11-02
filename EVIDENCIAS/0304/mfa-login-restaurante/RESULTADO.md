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
