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

## Retomada da campanha — 2026-11-04 (sem criação de bancos ou empresas)

**Resultado: Campanha 0304 PARTIAL; promoção interrompida nos gates de bootstrap e integração. Campanha 0305 não iniciada.** Aplicada somente uma correção de integridade no checkout Restaurante; nenhuma migration foi executada em qualquer banco, nenhum serviço foi reiniciado e nenhum dado empresarial foi escrito.

### Preflight, causa da divergência e correção

- Preflight dos repositórios autorizados: Motoboy `main` `9da9e6cd4b1b8f0b895f1d825735f04cb96f78c6`, Restaurante `main` `e23d06c754c5b5d654d2a233e88ed6ebee42785d`, histórico `main` `caf144aed3c549d4ca629756c4ff4b842b0bc17e`; os três estavam limpos e alinhados com `origin`. Nenhuma branch foi criada/trocada. Tags-base preservadas.
- A causa foi o commit Restaurante `e23d06c` (`style(postgres): trim blank lines at migration EOF`), que alterou bytes de quatro migrations históricas já aplicadas. Em 0060, o SHA-256 do arquivo corrente era `533c689405c3123de8936b316530285105187db1533bf1b6ad27ac2867418042`, mas ambos os ledgers registravam `196417e7d247c1e3c0f4c562d9895aad29ff3858ea1ef26ffe5f7ef99e42520e`. A versão imediatamente anterior a `e23d06c`, também presente desde o commit de introdução `35c6778`, tem exatamente o hash registrado nos dois bancos. Isso prova alteração apenas do newline final; o SQL executável é o mesmo.
- Restauradas de forma rastreável as versões pre-`e23d06c` de `0060_platform_admin_permission_reason_guard.up.sql`, `0061_platform_admin_permission_reason_null_guard.up.sql` e `0068_bootstrap_runtime_identity_pairing.up.sql`/`.down.sql`. Hashes up restaurados: 0060 `196417e7d247c1e3c0f4c562d9895aad29ff3858ea1ef26ffe5f7ef99e42520e`; 0061 `018ec167fde4488ce26ea07078f0dfa471a5b568e91779c1a2975619f8683849`; 0068 `7860c046e0208beb8fd503c48ac3809fdf55488f88978c1193b6b331d1a9ddc3`. Os ledgers E2E e oficial registram esses mesmos hashes. Nenhum checksum de ledger foi alterado.
- `NODE_ENV=test E2E_MIGRATOR_DATABASE_URL=postgresql://rotamoto_migrator@127.0.0.1:5432/rotamoto_e2e node backend/postgres/migrate.js status --e2e` e `NODE_ENV=production MIGRATOR_DATABASE_URL=postgresql://rotamoto_migrator@127.0.0.1:5432/rotamoto node backend/postgres/migrate.js status` validaram as cadeias sem divergências. Cada banco contém 70 migrations até `0070_founder_mfa_audit_actor_kind`; `0071_identity_login_company_options` é a única pendente. Hashes locais 0071: up `5f9bd787fbe3c734c490f56f0a18aa5ba248b12d7c58a8eee48e4bed66d7da5c`, down `3b6500d93b7169333b2179951a815892a010fd38b2c21b51793e4aaa1f2915c`.
- Leitura do latch E2E em transação `READ ONLY` como `rotamoto_migrator` mostrou `completed_at IS NOT NULL = false`. Contagens de empresas sob esse papel estão sujeitas a RLS e não foram tratadas como globais. Isso permanece uma pré-condição não resolvida para fluxos completos de instalação; não foi tentado completar instalação nem provisionar empresa.

### Testes, limites e estado dos bancos

- Passaram: `node tests/test-postgres-migration-targets.js`, `node tests/test-identity-ui.js` e `node tests/test-cross-app-contract-parity.js` no Restaurante; `node tests/test-identity-ui.js` e `node tests/test-cross-app-contract-parity.js` no Motoboy.
- Commits locais específicos no Restaurante: `1f366e582cfc5851f615106b032c97537cc6e6e3` (restaura hashes históricos) e `38d6e5b7de78b11db6b24169a9db2df676e62132` (ordem de autorização HTTP e teste restrito). A publicação e o registro final de G8 ainda estão pendentes neste ponto do registro.
- O modo restrito `IDENTITY_HTTP_PREFLIGHT_ONLY=1` de `tests/test-identity-http-postgres.js` passou no E2E real com transação revertida: pedido sem autorização recebeu 403 `PROVISIONER_UNAUTHORIZED`; pedido autorizado continuou bloqueado com 503 `BOOTSTRAP_NOT_READY`; nenhum convite foi enviado nem tenant/empresa gravado. A causa da falha HTTP anterior foi a ordem da rota: ela consultava `bootstrapReadiness` (SMTP/URL) antes de autenticar o operador. `backend/identity/http.js` agora autentica primeiro; `backend/identity/service.js` entrega uma prova interna de uso único ao provisionamento, sem autenticar duas vezes. O guard de readiness permanece. A suíte HTTP completa não foi executada porque prossegue para provisionar uma empresa; `tests/test-identity-login-context-postgres.js` não foi executado porque cria três empresas. MFA, CSRF, sessão HTTP de login e Browser E2E real ainda não foram aprovados.
- Os dois bancos autorizados permaneceram sem DDL desta execução: 70 migrations cada, 0071 pendente. E2E não foi limpo nem recebeu uma empresa; oficial `rotamoto` não foi alterado. Nenhum banco adicional foi conectado, criado ou removido. Nenhum backup foi feito, conforme dispensa do proprietário.
- Serviços atuais não foram reiniciados nem promovidos. Por isso o commit de backend carregado, readiness pós-promoção, contrato de autenticação real e assets servidos não foram revalidados aqui. Nenhum login operacional foi feito.

### Gates desta retomada

| Gate | Estado | Evidência |
|---|---|---|
| G1 | **WAIVED BY OWNER** | Backup expressamente dispensado; nenhum backup realizado. |
| G2 | **PASS** | Versão histórica de 0060 recuperada do Git; SHA-256 coincide com ambos os ledgers; migration runner agora valida as cadeias. |
| G3 | **BLOCKED** | 0071 é a única pendente nos dois bancos; aplicação suspensa até os gates de autenticação/browser. |
| G4 | **PARTIAL** | Regressão HTTP real da ordem autorização/readiness passou sem escrita; login, MFA, CSRF e sessão ainda não validados. |
| G5 | **BLOCKED** | Browser E2E com backend real não executado; pré-condição de bootstrap E2E não concluída. |
| G6 | **BLOCKED** | E2E e oficial continuam em 0070, 70 migrations; não executar 0071 antes dos gates anteriores. |
| G7 | **BLOCKED** | Backend não promovido/reiniciado; contrato real ainda não validado. |
| G8 | **PARTIAL** | Correção do Restaurante e este registro precisam ser publicados; Motoboy não requer alteração de código nesta retomada. |

**Continuidade:** preparar um caminho de teste HTTP que use apenas a única empresa E2E preexistente, sem provisionar empresas e sem alterar dados persistentes; então validar autenticação/MFA/CSRF/sessões/RLS e Browser E2E. Somente depois, revisar pendências dos dois ledgers e aplicar 0071 e demais migrations válidas em `rotamoto_e2e` e `rotamoto`. Não criar bancos adicionais, não completar bootstrap com empresa fictícia e não iniciar 0305.
