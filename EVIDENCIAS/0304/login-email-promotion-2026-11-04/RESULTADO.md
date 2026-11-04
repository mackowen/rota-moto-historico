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

**Resultado: Campanha 0304 PARTIAL; promoção interrompida nos gates de bootstrap e integração. Campanha 0305 não iniciada.** Corrigidas a integridade de migrations e a ordem de autorização do endpoint no checkout Restaurante; nenhuma migration foi executada em qualquer banco, nenhum serviço foi reiniciado e nenhum dado empresarial foi escrito.

### Preflight, causa da divergência e correção

- Preflight dos repositórios autorizados: Motoboy `main` `9da9e6cd4b1b8f0b895f1d825735f04cb96f78c6`, Restaurante `main` `e23d06c754c5b5d654d2a233e88ed6ebee42785d`, histórico `main` `caf144aed3c549d4ca629756c4ff4b842b0bc17e`; os três estavam limpos e alinhados com `origin`. Nenhuma branch foi criada/trocada. Tags-base preservadas.
- A causa foi o commit Restaurante `e23d06c` (`style(postgres): trim blank lines at migration EOF`), que alterou bytes de quatro migrations históricas já aplicadas. Em 0060, o SHA-256 do arquivo corrente era `533c689405c3123de8936b316530285105187db1533bf1b6ad27ac2867418042`, mas ambos os ledgers registravam `196417e7d247c1e3c0f4c562d9895aad29ff3858ea1ef26ffe5f7ef99e42520e`. A versão imediatamente anterior a `e23d06c`, também presente desde o commit de introdução `35c6778`, tem exatamente o hash registrado nos dois bancos. Isso prova alteração apenas do newline final; o SQL executável é o mesmo.
- Restauradas de forma rastreável as versões pre-`e23d06c` de `0060_platform_admin_permission_reason_guard.up.sql`, `0061_platform_admin_permission_reason_null_guard.up.sql` e `0068_bootstrap_runtime_identity_pairing.up.sql`/`.down.sql`. Hashes up restaurados: 0060 `196417e7d247c1e3c0f4c562d9895aad29ff3858ea1ef26ffe5f7ef99e42520e`; 0061 `018ec167fde4488ce26ea07078f0dfa471a5b568e91779c1a2975619f8683849`; 0068 `7860c046e0208beb8fd503c48ac3809fdf55488f88978c1193b6b331d1a9ddc3`. Os ledgers E2E e oficial registram esses mesmos hashes. Nenhum checksum de ledger foi alterado.
- `NODE_ENV=test E2E_MIGRATOR_DATABASE_URL=postgresql://rotamoto_migrator@127.0.0.1:5432/rotamoto_e2e node backend/postgres/migrate.js status --e2e` e `NODE_ENV=production MIGRATOR_DATABASE_URL=postgresql://rotamoto_migrator@127.0.0.1:5432/rotamoto node backend/postgres/migrate.js status` validaram as cadeias sem divergências. Cada banco contém 70 migrations até `0070_founder_mfa_audit_actor_kind`; `0071_identity_login_company_options` é a única pendente. Hashes locais 0071: up `5f9bd787fbe3c734c490f56f0a18aa5ba248b12d7c58a8eee48e4bed66d7da5c`, down `3b6500d93b7169333b2179951a815892a010fd38b2c21b51793e4aaa1f2915c`.
- Leitura do latch E2E em transação `READ ONLY` como `rotamoto_migrator` mostrou `completed_at IS NOT NULL = false`. Contagens de empresas sob esse papel estão sujeitas a RLS e não foram tratadas como globais. Isso permanece uma pré-condição não resolvida para fluxos completos de instalação; não foi tentado completar instalação nem provisionar empresa.

### Testes, limites e estado dos bancos

- Passaram: `node tests/test-postgres-migration-targets.js`, `node tests/test-identity-ui.js` e `node tests/test-cross-app-contract-parity.js` no Restaurante; `node tests/test-identity-ui.js` e `node tests/test-cross-app-contract-parity.js` no Motoboy.
- Commits específicos no Restaurante, publicados em `origin/main`: `1f366e582cfc5851f615106b032c97537cc6e6e3` (restaura hashes históricos) e `38d6e5b7de78b11db6b24169a9db2df676e62132` (ordem de autorização HTTP e teste restrito). Motoboy `main` permaneceu em `9da9e6cd4b1b8f0b895f1d825735f04cb96f78c6`, sem alterações necessárias, e foi confirmado igual a `origin/main`. Histórico publicou o registro inicial em `9fb5fb8b288c4114e03ed50ced53307441ca7937`; esta atualização final do gate G8 também será publicada em `main`.
- O modo restrito `IDENTITY_HTTP_PREFLIGHT_ONLY=1` de `tests/test-identity-http-postgres.js` passou no E2E real com transação revertida: pedido sem autorização recebeu 403 `PROVISIONER_UNAUTHORIZED`; pedido autorizado continuou bloqueado com 503 `BOOTSTRAP_NOT_READY`; nenhum convite foi enviado nem tenant/empresa gravado. A causa da falha HTTP anterior foi a ordem da rota: ela consultava `bootstrapReadiness` (SMTP/URL) antes de autenticar o operador. `backend/identity/http.js` agora autentica primeiro; `backend/identity/service.js` entrega uma prova interna de uso único ao provisionamento, sem autenticar duas vezes. O guard de readiness permanece. A suíte HTTP completa não foi executada porque prossegue para provisionar uma empresa; `tests/test-identity-login-context-postgres.js` não foi executado porque cria três empresas. MFA, CSRF, sessão HTTP de login e Browser E2E real ainda não foram aprovados.
- Os dois bancos autorizados permaneceram sem DDL desta execução: 70 migrations cada, 0071 pendente. E2E não foi limpo nem recebeu uma empresa; oficial `rotamoto` não foi alterado. Nenhum banco adicional foi conectado, criado ou removido. Nenhum backup foi feito, conforme dispensa do proprietário.
- Snapshot de segurança read-only nos dois bancos: `rotamoto_app` e `rotamoto_migrator` sem SUPERUSER e sem BYPASSRLS; `companies`, `memberships` e `role_permissions` com RLS e FORCE RLS; `users`, `credentials`, `identity_tokens` e `sessions` sem RLS. O app tem SELECT nos quatro recursos consultados (`memberships`, `companies`, `credentials`, `sessions`). Isso não substitui teste funcional de isolamento, que permanece pendente. As consultas de `count(*)` de empresas pelo migrator retornaram zero visíveis por RLS e não permitem contagem global; conforme a informação do proprietário, o E2E deve conter uma empresa. Como não houve escrita, essa execução não alterou a quantidade. O banco oficial permaneceu sem escrita de dados de negócio.
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
| G8 | **PASS** | Correções do Restaurante publicadas; Motoboy `main` confirmado igual ao remoto; histórico atualizado e publicado, incluindo a atualização de RLS. Nenhum force push. |

**Continuidade:** preparar um caminho de teste HTTP que use apenas a única empresa E2E preexistente, sem provisionar empresas e sem alterar dados persistentes; então validar autenticação/MFA/CSRF/sessões/RLS e Browser E2E. Somente depois, revisar pendências dos dois ledgers e aplicar 0071 e demais migrations válidas em `rotamoto_e2e` e `rotamoto`. Não criar bancos adicionais, não completar bootstrap com empresa fictícia e não iniciar 0305.

## Continuidade final — 2026-11-04 (teste HTTP sem tenant e dependências pendentes)

**Resultado: Campanha 0304 ainda PARTIAL; sem alteração de banco ou serviço; 0305 não iniciada.** O proprietário reiterou que `rotamoto` está vazio e que a validação deve usar `rotamoto_e2e`. Nenhum acesso de autenticação ao oficial foi feito.

- Preflight desta continuidade: Restaurante `main` `38d6e5b7de78b11db6b24169a9db2df676e62132`, Motoboy `main` `9da9e6cd4b1b8f0b895f1d825735f04cb96f78c6` e histórico `main` `bb32ce6b3220378de808163a9c6f3206264435ce`; os três estavam limpos e iguais a `origin/main` antes das alterações desta etapa. Baselines preservadas.
- Consulta ao E2E foi feita por `rotamoto_app`, sem `BYPASSRLS`: em transação `READ ONLY`, `users=0`, `credentials=0` e `to_regprocedure('rotamoto.identity_login_company_options(uuid)')` ausente. O ID histórico conhecido de Chico Restaurante (`01a14b34-2f79-7b57-a29d-9535574e3806`) não retornou empresa quando consultado com `app.tenant_id` igual a esse ID. As políticas `FORCE RLS` impedem transformar essa consulta em contagem global; não é seguro declarar qual a contagem global atual nem escolher outro tenant. Nenhuma identidade foi examinada por email/PII.
- Bootstrap: o serviço de autenticação normal não consulta o latch. `authenticate()` verifica credenciais e membership; o latch aparece nos caminhos de provisionamento e conclusão do primeiro bootstrap. O status SQL `platform_admin_bootstrap_status()` retornou `unavailable` no E2E porque a função 0068 só autoriza `session_user='rotamoto_e2e_app'`, enquanto o perfil/runtime permitido aqui é `rotamoto_app`. Isso não prova que o latch bloqueia login normal; o latch `completed_at=false` continua impedindo bootstrap/provisionamento. Não se alterou o latch.
- A migration 0071 segue necessária para o fluxo sem `companyId`: `authenticate()` chama `identity_login_company_options(uuid)` depois da senha válida. A função ainda não existe no E2E nem no oficial. Portanto há uma dependência circular nas pré-condições prescritas: validar login positivo e Browser de login antes de 0071, embora o próprio caminho sem `companyId` dependa dela. Não apliquei 0071 antecipadamente nem alterei a ordem definida pelo proprietário.
- Acrescentado o modo `IDENTITY_HTTP_AUTH_NO_TENANT_ONLY=1` ao teste PostgreSQL HTTP. Ele usa somente `rotamoto_app`, sem conectar o migrator, envolve as chamadas em transação revertida e não cria fixtures empresariais. Passou: login sem `companyId` para identidades sintéticas inexistentes devolve 401 genérico idêntico, sem lista de empresas nem cookie; `/api/identity/session` e `/api/admin/memberships` sem sessão devolvem 401. Isso valida somente caminhos negativos/anônimos, não prova login válido, MFA ou sessão autenticada.
- Commit local Restaurante `61a5e9c1e8d3150629714322ad90b1d90dab0fac` contém somente esse modo de teste; ainda pendente de push neste ponto do registro.
- Status dos runners, repetido sem escrita: `rotamoto_e2e` e `rotamoto` têm 70 migrations até 0070; 0071 é a única pendente em ambos; sem divergência de checksums. Nenhuma migration foi aplicada, nenhum backup ou envio de email foi realizado, nenhum serviço foi reiniciado e nenhum dado persistente foi alterado.

### Gates após esta continuidade

| Gate | Estado | Evidência |
|---|---|---|
| G1 | **WAIVED BY OWNER** | Backup dispensado e não realizado. |
| G2 | **PASS** | Checksums históricos alinhados; status dos dois runners sem divergência. |
| G3 | **BLOCKED** | 0071 pendente; ordem de gate requer HTTP e Browser completos primeiro. |
| G4 | **PARTIAL** | Regressões HTTP negativas/anônimas passaram; nenhum usuário autorizado/credencial existe visível ao runtime, e login positivo depende de 0071. |
| G5 | **BLOCKED** | Login/MFA autenticado não pode ser validado no navegador sem usuário/tenant acessível e 0071; nenhum mock será tratado como aprovação. |
| G6 | **BLOCKED** | Ambos os bancos permanecem em 0070, 70 migrations. |
| G7 | **BLOCKED** | Serviço oficial não reiniciado/promovido; G3–G6 não passaram. |
| G8 | **PASS** | Modo de teste `61a5e9c1e8d3150629714322ad90b1d90dab0fac` e histórico atualizados em `origin/main`; Motoboy confirmado igual ao remoto; publicação sem force push. |

Para continuar sem violar as regras, é necessária uma via segura para confirmar a empresa atual sob RLS e obter uma identidade E2E de teste já vinculada, ou uma decisão do proprietário para reordenar a promoção de 0071 no E2E como pré-requisito técnico dos testes positivos. Até lá, não criar empresa/usuário empresarial, não elevar privilégios, não consultar via bypass e não promover o oficial.

## Continuidade da ordem de promoção — 2026-11-04

**Resultado: 0071 aplicada somente no E2E; autenticação positiva ainda bloqueada pela ausência de identidade e contexto de empresa verificáveis sob RLS. Banco oficial e serviços não alterados. Campanha 0304 PARTIAL; 0305 não iniciada.** O proprietário autorizou corrigir a sequência e aplicar 0071 primeiro no E2E.

- Preflight: Motoboy `main` `9da9e6cd4b1b8f0b895f1d825735f04cb96f78c6`, Restaurante `main` `61a5e9c1e8d3150629714322ad90b1d90dab0fac`, histórico `main` `3b28c289bdc9918afa835aa292b4b09e5f2a234a`; worktrees limpos e iguais a `origin/main`. Nenhuma branch foi criada/trocada. Baselines preservadas.
- Hashes 0071 verificados antes da aplicação: up `5f9bd787fbe3c734c490f56f0a18aa5ba248b12d7c58a8eee48e4bed66d7da5c`; down `3b6500d93b7169333b2179951a815892a010fd38b2c21b51793a4eaaa1f2915c`. O up cria somente três policies de leitura, a função `identity_login_company_options(uuid)`, revoga EXECUTE de PUBLIC e concede EXECUTE a `rotamoto_app`; não insere nem atualiza dados empresariais.
- O runner oficial executou `NODE_ENV=test E2E_MIGRATOR_DATABASE_URL=postgresql://rotamoto_migrator@127.0.0.1:5432/rotamoto_e2e node backend/postgres/migrate.js up --e2e` e registrou 0071. Não foi feita escrita no oficial. Status posterior do runner E2E confirmou 0071 aplicada; catalog read-only confirmou ledger/hash iguais, função presente, EXECUTE para `rotamoto_app`, sem EXECUTE para PUBLIC e as três policies com as expressões esperadas. `companies`, `memberships` e `role_permissions` continuam RLS + FORCE RLS; `rotamoto_app` e `rotamoto_migrator` continuam sem SUPERUSER/BYPASSRLS. A transação de catalog foi somente leitura.
- Verificação de identidade autorizada no E2E: por `rotamoto_app`, sem BYPASSRLS, a conta QA sintética de registro anterior (`qa-saneamento-0304-20261031@rotamoto.invalid`) não foi encontrada; `users` e `credentials` retornaram contagem zero (essas relações não têm RLS). O UUID histórico de Chico Restaurante (`01a14b34-2f79-7b57-a29d-9535574e3806`) não foi visível nem quando usado como `app.tenant_id`. Isso não é tratado como contagem global de empresas: a tabela `companies` tem FORCE RLS. Não há identidade, membership, credencial ou contexto MFA utilizável confirmado para um teste positivo. Nenhuma senha/hash/fator foi lido.
- A consulta sem tenant do E2E não pode provar ausência global. O catálogo oferece `platform_admin_list_companies()`, mas a função exige contexto de sessão de Super ADM Global; nenhuma sessão autorizada de teste está disponível. Não se falsificou `app.platform_admin_user_id`, não se usou migrator para contornar RLS e não se tentou listar dados como administrador. O status Bootstrap `unavailable` também decorre da função 0068 aceitar `session_user='rotamoto_e2e_app'`, enquanto o perfil autorizado é `rotamoto_app`; o login normal não chama essa função. Não se alterou latch ou bootstrap.
- Após 0071, `IDENTITY_HTTP_AUTH_NO_TENANT_ONLY=1` foi repetido com `rotamoto_app` e rollback: respostas genéricas 401 para identidades inexistentes sem `companyId`, sem empresas/cookie, e rotas de sessão/admin protegidas com 401. PASS limitado a caminhos negativos/anônimos; não comprova login vinculado, MFA, CSRF autenticado ou sessão positiva.
- Banco E2E agora está em 0071/71 migrations. Status oficial repetido em transação de leitura pelo runner confirma `rotamoto` em 0070/70, com 0071 pendente; nenhum comando de escrita foi executado no oficial. Não foi executado Browser E2E, não houve restart, backup, e-mail, criação de empresa/usuário ou alteração permanente de dados.

### Gates nesta etapa

| Gate | Estado | Evidência |
|---|---|---|
| G1 | **WAIVED BY OWNER** | Nenhum backup feito. |
| G2 | **PASS** | Hashes históricos íntegros; runner sem divergência antes/depois. |
| G3 | **PARTIAL** | 0071 aplicada/validada no E2E; oficial continua em 0070 até HTTP e Browser aprovados. |
| G4 | **PARTIAL** | Testes negativos HTTP reais aprovados após 0071; login válido e MFA bloqueados sem identidade/empresa contextualizada. |
| G5 | **BLOCKED** | Não executado porque G4 positivo não passou; nenhum mock usado como substituto. |
| G6 | **PARTIAL** | E2E em 0071; oficial em 0070. |
| G7 | **BLOCKED** | API não promovida/reiniciada; banco oficial e autenticação completa ainda pendentes. |
| G8 | **PASS** | Registro de aplicação E2E publicado em `origin/main` (`08d5626c42c1dc8d20e79713716b1f6b9fd95b49`); Restaurante e Motoboy seguem iguais aos remotos, sem alterações pendentes. |

**Próximo bloqueio objetivo:** é necessário um UUID atual da empresa confirmado por contexto autorizado ou uma sessão QA existente que permita resolver a empresa sem bypass. Se a única empresa for outra que não o UUID histórico, não há base segura para inserir identidade sintética/membership nela. Após obter esse contexto, fixture sintética e login completo poderão usar só essa empresa e rollback; então Browser real, 0071 oficial e promoção podem seguir na ordem autorizada. Nenhum banco adicional ou empresa será criado.

## Busca autorizada da empresa informada pelo proprietário — 2026-11-04

O proprietário informou o nome **Chico Restaurante Pte Rasa** e autorizou procurar no E2E. Preflight dos três repositórios confirmou branches `main`, worktrees limpos e HEADs iguais aos remotos; nenhuma branch foi criada ou trocada.

- A pesquisa pelo nome exato foi feita em `rotamoto_e2e` como `rotamoto_app`, em transação `READ ONLY`, sem tenant conhecido; retornou zero linhas visíveis. A mesma busca de escopo tentada antes pelo UUID histórico não retornou linha. Como `companies` tem RLS + FORCE RLS, estes resultados **não provam ausência global** e não permitem descobrir o UUID.
- Os papéis `rotamoto_app`, `rotamoto_migrator` e `rotamoto_auditor` não têm BYPASSRLS; o migrator não foi usado para atravessar políticas. O papel `rotamoto_backup` tem BYPASSRLS e foi excluído. A função `platform_admin_list_companies()` exige contexto ativo de Super ADM Global; a função `identity_company_options(bytea)` exige digest de sessão válida. O E2E não tem usuário ou credencial de teste visível ao runtime, e não há sessão autorizada para essas funções. Não foram lidas identidades por email, fatores MFA ou hashes.
- Nenhum dado foi alterado nesta busca. E2E segue em 0071 (71 migrations); `rotamoto` permanece em 0070 (70), com 0071 pendente. O teste HTTP negativo/anônimo permanece PASS limitado. Não houve login positivo, Browser E2E, backup, email, restart, empresa/usuário criado ou alteração no oficial.

### Estado após a busca do proprietário

| Gate | Estado | Evidência |
|---|---|---|
| G1 | **WAIVED BY OWNER** | Backup dispensado; nenhum backup realizado. |
| G2 | **PASS** | Integridade histórica e hash 0071 conferidos. |
| G3 | **PARTIAL** | 0071 aplicada/validada no E2E; oficial ainda pendente. |
| G4 | **PARTIAL** | HTTP negativo aprovado; identidade/tenant autorizado não localizados para login positivo/MFA. |
| G5 | **BLOCKED** | Sem autenticação positiva HTTP, Browser real não executado. |
| G6 | **PARTIAL** | E2E 0071; oficial 0070. |
| G7 | **BLOCKED** | API não promovida nem reiniciada. |
| G8 | **PASS** | Motoboy (`9da9e6cd4b1b8f0b895f1d825735f04cb96f78c6`) e Restaurante (`61a5e9c1e8d3150629714322ad90b1d90dab0fac`) já estavam alinhados; este registro foi publicado no Histórico (`9548474`). |

Para prosseguir, o mecanismo precisa receber um UUID ou sessão de QA válida que já tenha escopo autorizado à empresa; não é necessário compartilhar senha, MFA, cookie ou fator. Sem esse contexto não é permitido usar o papel de backup, enumeração cross-tenant ou criar uma sessão administrativa sintética.

### Verificação do usuário QA indicado pelo proprietário — 2026-11-04

O proprietário indicou um endereço para reutilizar como usuário de QA. A consulta foi executada em `rotamoto_e2e` como `rotamoto_app`, em transação `READ ONLY`, comparando o endereço sem registrar seu valor neste histórico. As relações `users` e `credentials` não têm RLS (`relrowsecurity=false`, `relforcerowsecurity=false`); a correspondência exata retornou `user_exists=false` e `credential_exists=false`. Portanto, não existe essa conta no E2E para autenticar ou verificar MFA. Não foi tentada senha, não houve alteração de contador/credencial, sessão, MFA ou envio de email.

Como a conta indicada não existe, criar uma identidade com esse endereço não seria reutilizar o mesmo usuário. Também não foi possível confirmar a empresa atual sob o contexto autorizado da aplicação: a busca pelo nome não retornou linha visível, e o UUID histórico não foi visível com `app.tenant_id`. Nenhuma fixture, membership ou alteração permanente foi criada. G4 continua parcial; G5 e G7 permanecem bloqueados, G3/G6 continuam parciais conforme o estado dos bancos registrado acima. A única via segura para o QA positivo é uma conta de teste realmente existente e autorizada no E2E, ou autorização explícita para fixture sintética transacional vinculada à empresa depois de sua resolução por mecanismo autorizado.

### Busca no banco oficial solicitada pelo proprietário — 2026-11-04

Em `rotamoto`, a consulta `READ ONLY` como `rotamoto_app` encontrou a conta correspondente ao endereço indicado pelo proprietário e uma credencial associada. Não foram lidos nem registrados email, segredo, hash, senha ou detalhes de MFA. O nome da empresa pesquisado não ficou visível para essa role; como `companies` está protegida por RLS/FORCE RLS, isso não é tratado como prova de ausência global. Não houve tentativa de login nem alteração no banco oficial. A conta oficial não foi usada para substituir o usuário E2E ausente.

## Limpeza autorizada e preparação para novo bootstrap — 2026-11-04

**Esta seção atualiza o estado operacional descrito acima:** por autorização expressa do proprietário, a limpeza completa dos dados de aplicação foi efetivada somente nos bancos existentes `rotamoto_e2e` e `rotamoto`. Sem backup, como dispensado. Nenhum banco adicional foi criado; Campanha 0305 não iniciada.

- Preflight imediato: os três repositórios estavam em `main`, worktrees limpos e sem divergência. Motoboy `9da9e6cd4b1b8f0b895f1d825735f04cb96f78c6`; Restaurante `61a5e9c1e8d3150629714322ad90b1d90dab0fac`; Histórico `a6fd3e7047fdf3d98a41ba1c3126aa506d381b5a` antes deste registro.
- O primeiro ensaio rollback do E2E passou. O ensaio rollback do oficial detectou 8 linhas em `bootstrap_smtp_test_attempts`; por isso nenhum dado foi apagado nessa tentativa. O script `backend/postgres/admin/reset-application-data.sql` foi corrigido para incluir também `bootstrap_smtp_test_attempts` e `platform_smtp_test_attempts`. Os ensaios rollback seguintes passaram nos dois bancos. Correção publicada no Restaurante, commit `be1b27a573f0918ee67807314e7ade2f9473a58c`.
- Migration runner validou integridade histórica e confirmou 0071 como única pendente no oficial. A migration `0071_identity_login_company_options` foi aplicada no `rotamoto` pelo usuário autorizado `rotamoto_migrator`. Up SHA-256 `5f9bd787fbe3c734c490f56f0a18aa5ba248b12d7c58a8eee48e4bed66d7da5c`; down SHA-256 `3b6500d93b7169333b2179951a815892a010fd38b2c21b51793e4aaa1f2915c`.
- O script de reset foi executado com `commit_reset=true` primeiro no E2E e depois no oficial. Ambos imprimiram `RESET COMMIT aplicado e verificado.` O script preserva e compara a assinatura do schema, índices, constraints, triggers, policies, funções/grants, ledger e catálogo de permissões; RLS não foi desabilitado. O reset limpa os dados de aplicação, preserva `schema_migrations` e `permissions`, e recria os dois latches singleton em estado inicial. O ensaio rollback posterior confirmou que todas as tabelas de aplicação estão vazias, exceto esses latches estruturais.
- Pós-validação por runner/catálogo: `rotamoto_e2e` e `rotamoto` estão em 0071, 71/71 migrations; o ledger de ambos tem 0071 com checksum up correspondente. A função de contexto existe, EXECUTE de `rotamoto_app` é verdadeiro e PUBLIC EXECUTE é falso. `companies`, `memberships` e `role_permissions` mantêm RLS + FORCE RLS. No E2E a sessão runtime efetiva é `rotamoto_app` via login `rotamoto_e2e_app`; nenhum papel superuser ou BYPASSRLS foi usado.
- Depois da limpeza, a função autorizada `platform_admin_bootstrap_status()` retornou `ready` em ambos. Portanto não há empresa, usuário, credencial, sessão, pedido ou outro dado de aplicação nos bancos; a conta anteriormente indicada também foi removida como parte da limpeza autorizada. O catálogo RBAC e o ledger continuam presentes. Não se declarou empresa anterior preservada após a autorização de limpeza.
- O serviço runit `rotamoto-api-e2e` foi reiniciado após o reset (novo processo PID `24876`) e segue ativo em `127.0.0.1:8787`. Sua configuração instalada usa `E2E_RUNTIME_DATABASE_URL=postgresql://rotamoto_e2e_app@127.0.0.1:5432/rotamoto_e2e`, `NODE_ENV=test`, e aplica role runtime `rotamoto_app`. `/health/ready` respondeu `ready`; `/api/identity/bootstrap/status` confirmou `state=ready` e schema/migrations prontos. O serviço oficial separado continua em `8788` apontado a `rotamoto`; não houve chamada de escrita nele.
- Limite do bootstrap E2E: status indica keystore MFA presente, mas SMTP, entrega de convite e modo local-only indisponíveis. Nenhum convite foi enviado nem bootstrap empresarial concluído. O banco E2E está preparado no latch inicial; não se contornaram os guards de bootstrap. O serviço oficial informa seu estado pronto, mas seu banco permanece limpo.
- Nenhum backup, restauração, empresa criada, branch, clone ou repositório adicional. A limpeza foi apenas nos dois bancos autorizados. A publicação da atualização do Restaurante ocorreu no commit acima; este registro será publicado no Histórico.

### Estado desta operação

| Critério | Estado | Evidência |
|---|---|---|
| Backup | **WAIVED BY OWNER** | Dispensado; nenhum backup realizado. |
| Integridade e aplicação de migrations | **PASS** | Runner 71/71 e checksum 0071 alinhado nos dois bancos. |
| Limpeza dos bancos | **PASS** | Reset transacional com verificação integral; latches iniciais e schema preservado. |
| Backend E2E | **PASS** | Serviço reiniciado em `8787`, runtime E2E validado e API pronta. |
| Bootstrap novo | **PARTIAL** | Estado `ready`; SMTP/convite/local-only indisponíveis no E2E, então nenhum owner/empresa foi provisionado. |
| Oficial sem dados de aplicação | **PASS** | Reset confirmado; status de bootstrap `ready`; somente schema, catálogo RBAC e ledger preservados. |
