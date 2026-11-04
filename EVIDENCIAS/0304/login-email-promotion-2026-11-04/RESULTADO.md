# Campanha 0304 — preflight de promoção do login por e-mail

**Data:** 2026-11-04 UTC
**Classificação da execução:** BLOCKED antes da promoção.
**Classificação da campanha:** PARTIAL; backlog existente preservado; G14 continua FAIL; 0305 não iniciada.

## Limites e preservação

Foram feitas inspeções de repositórios, serviços, metadados de arquivos, HTTP público e consultas PostgreSQL somente leitura. Nenhum SMTP/e-mail foi enviado; nenhuma senha, MFA, sessão ou login do proprietário foi usado; nenhum segredo, conteúdo pessoal, token, dado operacional ou valor do keystore foi lido ou publicado. Nenhuma migration, restart, backup novo, restore, limpeza, alteração de grants/configuração ou escrita em dados oficiais ocorreu.

Restaurante e Motoboy estavam limpos nos branches de campanha observados e não foram alterados. Baseline `v5.50-ui-mobile-fix5` preservada. No histórico foram preservados dois caminhos preexistentes não rastreados: a captura de Empresa/Operação e o diretório `login-redesign-2026-10-25`.

## Runtime e contratos

- 8083 e 8084 responderam HTTP 200; os assets de `identity-ui.js` conferem com os workspaces Restaurante e Motoboy.
- API oficial está supervisionada e ativa em 8788. O processo é anterior aos arquivos backend atuais; como o preflight proibia restart, não se validou o contrato carregado nem se atribuiu comportamento de runtime ao código atual. Health anônimo de sessão retornou 401 `UNAUTHENTICATED`, resposta esperada sem sessão.
- Há divergência operacional entre assets atuais e backend efetivamente carregado. Não houve validação de login oficial e nenhum login real foi tentado.

## PostgreSQL e migration 0071

Consulta READ ONLY confirmou ledger oficial em `0070_founder_mfa_audit_actor_kind`; `0071_identity_login_company_options` e sua função ainda não existem no banco oficial. Checksums locais conferidos:

| Arquivo | SHA-256 |
|---|---|
| 0071 up | `5f9bd787fbe3c734c490f56f0a18aa5ba248b12d7c58a8eee48e4bed66d7da5c` |
| 0071 down | `3b6500d93b7169333b2179951a815892a010fd38b2c21b51793e4aaa1f2915c` |

O SQL é aditivo, cria função `SECURITY DEFINER` de resolução e políticas de leitura para o fluxo pós-autenticação; o ensaio de compatibilidade/privilegios só pode ser considerado concluído em cópia restaurada, não no oficial. RLS e FORCE RLS foram confirmados nas relações centrais consultadas. O papel auditor não conseguiu executar `current_tenant_id()` na consulta de memberships (`permission denied`); não foi usado BYPASSRLS para contornar a falha e nenhum privilégio foi alterado. Por isso, vínculo fundador e listagem administrativa global não foram revalidados nesta passagem.

## Gate G1 — backup e recuperação

O artefato 0304-L1 já arquivado identifica o set `f96bb29f-b067-4b1c-8709-86e678b1b622`, com manifesto/componentes estruturalmente válidos em verificação histórica. A mesma evidência registra que a chave local não corresponde à chave associada ao envelope, que não foi feito decrypt/compare e que não houve restore rehearsal. Esse set não prova recuperação utilizável.

No processo/configuração corrente, as variáveis operacionais necessárias à criação/verificação de backup não estão configuradas. Não se tentou substituir chave ou recuperar credencial a partir de artefatos de campanha. O resultado é G1 **BLOCKED**: não há backup atual comprovadamente recuperável nem ensaio em banco descartável. A promoção foi interrompida aqui antes de qualquer DDL.

## Gates G1–G7

| Gate | Estado | Fundamento |
|---|---|---|
| G1 | **BLOCKED** | Custódia incompatível do set existente, sem restore rehearsal e sem configuração atual homologada para novo backup. |
| G2 | **BLOCKED** | RLS/FORCE observado; leitura necessária para memberships negada ao papel auditor; testes negativos requeridos não foram repetidos em cópia restaurada nesta execução. |
| G3 | PARTIAL | Migration e hashes inspecionados; não ensaiada na cópia restaurada e não aplicada no oficial. |
| G4 | PARTIAL | Existem evidências sintéticas históricas, mas elas não comprovam runtime oficial; frontend atualizado e API carregada desatualizada. Credenciais reais não usadas. |
| G5 | BLOCKED | Matriz requerida dos dois apps, 390/768/1440, claro/escuro e estados MFA/logout/troca não executada nesta promoção. |
| G6 | **BLOCKED** | Gate obrigatório G1–G5 não está integralmente PASS. Nenhuma migration ou restart. |
| G7 | BLOCKED | Pós-promoção não iniciada. |

## Causa e continuidade segura

A falha de acesso oficial ainda não pode ser atribuída unicamente a frontend, backend ou MFA, pois o backend atual não está carregado e a migration 0071 está ausente. O estado oficial é incompatível com o fluxo novo completo: o schema não expõe a resolução de vínculos necessária, e o processo API não acompanha o checkout atual. Isso demonstra promoção incompleta, mas não autoriza concluir qual seria a resposta final após alinhar versões.

O primeiro passo para retomada é o operador de backup restabelecer, por procedimento protegido, acesso à chave correspondente ao set ou preparar configuração homologada independente sem sobrescrever artefatos antigos. Criar um recovery set atualizado, verificar autenticidade/integridade e comprovar restore em banco descartável isolado. Em seguida, concluir G2–G5 em clone aprovado. Só então revalidar ausência de alterações concorrentes e considerar G6.

**Estado final:** PostgreSQL oficial permaneceu em 0070, sem escrita; configuração, credenciais, autorizações e keystore preservados; nenhum serviço reiniciado; nenhum envio ou login real; nenhuma promoção. Nenhuma alteração de aplicação nesta execução, portanto nenhum commit local de app. O histórico receberá commit documental e será o único repositório com push, por fast-forward.

## Retomada controlada — 2026-11-04 (autorização expressa sem backup)

**Classificação da execução: BLOCKED antes da promoção. Campanha 0304: PARTIAL; G14 FAIL preservado; 0305 não iniciada.** O proprietário dispensou expressamente backup/restore nesta execução. G1 fica **WAIVED BY OWNER — BACKUP NÃO REALIZADO**, nunca PASS. O risco adicional aceito é não haver ponto de recuperação comprovadamente restaurável caso DDL ou incompatibilidade oficial cause impacto. Nenhum backup, restore, rotação/geração de chave ou alteração do keystore foi feito.

### Preflight e estado oficial

- Repositórios existentes: Motoboy `main` HEAD/origin `9da9e6cd4b1b8f0b895f1d825735f04cb96f78c6`; Restaurante `main` HEAD/origin `e23d06c754c5b5d654d2a233e88ed6ebee42785d`; histórico `main` HEAD/origin inicialmente `96098533565c61cf3a4fcd06a97205794b56a946`. Worktrees dos aplicativos estavam limpos; nenhuma branch foi criada ou trocada. Tags-base protegidas: Motoboy `v39.6-ui-mobile-fix2` → commit `79c527b59d32d8b55236c62042acb868166ed4ad`; Restaurante `v5.50-ui-mobile-fix5` → commit `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` (tag anotada preservada).
- 8083/8084 retornaram HTTP 200 e os SHA-256 do `identity-ui.js` servido coincidem com cada checkout (`b7b6f6a1…b05e` Restaurante; `136e52fe…a7f2` Motoboy). API 8788 e PostgreSQL reportam readiness `ready`, mas o processo API iniciou antes do commit de backend `f85d5bc` (`feat(identity): resolve company context after email login`); os assets atuais são posteriores. Não se reiniciou o processo, então o contrato de login atual não foi comprovado no runtime oficial. Sessão anônima respondeu 401 `UNAUTHENTICATED`; POST sem payload de teste respondeu 400 `INVALID_INPUT`/`Email inválido.` sem credenciais.
- Consulta ao oficial foi transacional `READ ONLY` pelo papel `rotamoto_migrator`, que foi confirmado sem `SUPERUSER`/`BYPASSRLS`: ledger com 70 migrations, latest `0070_founder_mfa_audit_actor_kind`; 0071 ausente. Checksum oficial/local 0070 coincide (`7ca26baeb2fc82966d2cc0ae0318ccc7696a5a37bc3bf0963e15f5396609b22d`). 0071 local permanece sem alteração; SHA-256 up `5f9bd787fbe3c734c490f56f0a18aa5ba248b12d7c58a8eee48e4bed66d7da5c`, down `3b6500d93b7169333b2179951a815892a010fd38b2c21b51793e4aaa1f2915c`.
- Nenhum dado operacional foi selecionado ou escrito. Nenhum email, login real, credencial do proprietário, migration oficial ou restart foi executado.

### Ambiente descartável, regressões e Browser QA

- Banco `rotamoto_e2e_lote1b_20261030_3e9a4c12` foi identificado por allowlist/guard de campanha existente, loopback 127.0.0.1, papéis `rotamoto_app` e `rotamoto_migrator` não-BYPASSRLS. Estado read-only: migration 0071 presente com checksum idêntico ao arquivo; as 43 tabelas com RLS também têm FORCE RLS. Teste `tests/test-identity-login-context-postgres.js` passou com rollback: senha sem companyId, resposta genérica sem enumeração, vínculos múltiplos, seleção automática de vínculo único, troca autorizada de tenant, rejeição de tenant estrangeiro, sessão e logout invalidado.
- Gate de integridade do migration runner no mesmo banco falhou fechado: `status --part-b-disposable` reportou checksum divergente em `0060_platform_admin_permission_reason_guard`. A mesma divergência ocorre no banco E2E `rotamoto_e2e`; por isso o estado 0071 isoladamente correto não basta para comprovar cadeia/migration nesse ambiente. Nenhuma migration foi executada para contornar a divergência.
- `tests/test-identity-http-postgres.js` iniciou com fixture sintética em `rotamoto_e2e`, mas falhou antes dos cenários de autenticação: esperava 403, recebeu 503 `BOOTSTRAP_NOT_READY`; a transação de fixture foi revertida pelo próprio teste. Não se repetiu no banco nem se alterou estado do bootstrap.
- PASS isolado: `test-identity-ui.js`, `test-identity-session-race.js`, `test-identity-csrf.js`, `test-cross-app-contract-parity.js`, `test-postgres-migration-targets.js` no Restaurante; `test-identity-ui.js`, `test-identity-session-first-access.js`, `test-tenant-cache-scope.js`, `test-cross-app-contract-parity.js` no Motoboy. Um nome de teste inexistente no Motoboy (`test-identity-session-race.js`) não foi tratado como teste executado.
- Browser QA Chromium/CDP executou 6 casos por aplicativo em perfil limpo, viewports 390/768/1440, com API totalmente sintética/interceptada: formulário sem campo `companyId`, escolha de empresas e mensagens para contrato backend antigo. Não houve login, rede de identidade real, escrita ou credencial real. O QA não cobriu temas claro/escuro nem substitui E2E contra API; evidências em `../login-context-2026-11-04/` com sufixos `run-*`/`stale-run-*`, preservando capturas anteriores.

### Matriz de gates e decisão

| Controle/Gate | Estado | Evidência/limite |
|---|---|---|
| Contrato frontend/backend | PARTIAL | Assets compatíveis com o checkout; API em execução precede a implementação de login por email. |
| Autenticação e sessão (G4) | BLOCKED | Contexto sintético E2E passou; suíte HTTP ampla não passou do guard do bootstrap; MFA completa e runtime oficial não validados. |
| Resolução de empresa | PASS limitado ao teste descartável | Um/múltiplos vínculos e tenant estrangeiro cobertos por regressão transacional. |
| Segurança multiempresa (G2) | PARTIAL | Negativos direcionados passaram; suíte de segurança completa e runtime oficial não comprovados; checksum histórico do clone diverge. |
| RLS e permissões | PARTIAL | 43/43 relações RLS observadas no lote; evidência não cobre todas as permissões/API, e o runner rejeita a cadeia por checksum 0060. |
| Migration 0071 descartável (G3) | BLOCKED | Checksum exato de 0071 registrado, mas runner de status falha em 0060; não houve ensaio confiável de cadeia/idempotência. |
| HTTP/integração | BLOCKED | Fixture existente retorna `BOOTSTRAP_NOT_READY` antes da autenticação completa. |
| Browser E2E (G5) | PARTIAL | Responsivo/contrato visual passou com mocks; temas e backend real não exercitados. |
| Estado dos serviços | BLOCKED | API ready, mas carregada antes do código de login atual; contrato não está alinhado. |
| G1 | WAIVED BY OWNER | Backup e restauração não realizados, com risco adicional explicitamente aceito. |
| G6 promoção oficial | BLOCKED | Obrigatórios sem PASS; nenhuma alteração no oficial. |
| G7 pós-promoção | BLOCKED | Não iniciada. |

### Causa e continuidade

A causa operacional comprovada da incompatibilidade é promoção parcial: os dois frontends servem o contrato atual, mas o processo oficial da API foi iniciado antes do commit que adicionou login por email e a função 0071 não existe no PostgreSQL oficial (ledger 0070). Isso impede afirmar que o login oficial funciona; não prova falha de senha, Gmail ou MFA. Não houve defeito de aplicação comprovado nesta rodada que justificasse alteração de código. A promoção não prosseguiu porque os gates de segurança, cadeia de migrations, HTTP e Browser QA não alcançaram PASS, mesmo com G1 expressamente dispensado.

Continuidade segura: corrigir a divergência de checksum 0060 no ambiente descartável de forma documentada sem reescrever migration aplicada; restabelecer fixture bootstrap isolada e repetir regressões MFA/HTTP/RLS; executar QA claro/escuro completo; então revalidar processo/API e ledger oficial antes de qualquer promoção. Não executar login do proprietário até API/schema alinhados. Estado final: banco oficial continua em 0070; nenhum serviço reiniciado; nenhum e-mail enviado; credenciais, autorização, keystore, latches e dados preservados.
