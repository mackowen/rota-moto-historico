## Atualização — Registro 0046 / F4 integrações externas (2026-10-04)

- Restaurante `codex/setup-workflow` HEAD `0ace64884a9f546368909073e60dbe5a8b363647`, árvore limpa; commit anterior `3e84fad04eb877b466a6757a4fedf2db8e0f66c8`. `main` preservada em `8fcd9f0ffffe37047a79834161cc1f791f20d76f`; baseline `v5.50-ui-mobile-fix5` preservada em `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- iFood, 99Food e Keeta não têm integração externa real comprovada. Adapters/handlers antigos continham protocolo não verificado; labs eram sintéticos. Fronteiras agora falham fechado, API admin mostra estado tenant-scoped sem secrets, rotas provider respondem 503 e laboratório iFood fica só em memória sem criar Orders.
- Nenhuma migration ou mudança no PostgreSQL oficial/grants/RLS. Testes focados de integração/segurança/readiness, identidade UI/auditoria, `node --check` e `git diff --check` passaram; sem Browser QA, npm test amplo, test:postgres ou push.
- F4 classificada **B — infraestrutura local concluída; dependências externas isoladas**. Detalhes e classificação individual em [Registro 0046](REGISTROS/0046.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).
- Motoboy não alterado: `codex/setup-workflow` HEAD `2c82d094ef8a2f04aa436507a36682b4f36e95fc`, árvore limpa; main/baseline intactas. Próxima macrofase indicada pelo plano é F8, não iniciada; F9 pendente.

## Atualização — Registro 0045 / F7 UI/UX (2026-10-04)

- Restaurante: `codex/setup-workflow` @ `3e84fad04eb877b466a6757a4fedf2db8e0f66c8`, árvore limpa. Motoboy: `codex/setup-workflow` @ `2c82d094ef8a2f04aa436507a36682b4f36e95fc`, árvore limpa. Cada app tem commits separados de consolidação da UI e escopo das configurações; nenhum push.
- Conta autenticada/offline agora fica no header e usa diálogo modal acessível com foco controlado e fundo inerte. Restaurante ganhou UI administrativa para Membership↔Driver via endpoints existentes; Motoboy recebeu semântica correta de navegação/filtros, feedback anunciável e modais acessíveis.
- Safe areas/teclado virtual foram tratados; tokens/estilos de identidade consolidados, regras CSS mortas removidas e contraste do acento verde Motoboy ajustado. As telas de configuração informam que as preferências são locais e separam estimativas locais de Earning canônico. Nenhum domínio, sync, IndexedDB, contrato, PostgreSQL ou regra de negócio foi alterado.
- `npm test` passou nos dois apps; testes focados de identidade/sync, `node --check` e `git diff --check` passaram. A primeira execução detectou uma expectativa antiga de versão de assets no teste Motoboy; a expectativa foi alinhada aos arquivos já existentes (`sync-reconciliation`/`execution-workflow` v2 e app v40.2) e a suíte passou.
- F7 classificada **B — implementação concluída / Browser QA pendente para F9**. Sem Browser QA, screenshots, CDP ou dispositivos físicos nesta execução. Nenhuma alteração em `main` ou baseline: Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`, Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad`.
- Ver [Registro 0045](REGISTROS/0045.md), [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md) e [PENDENCIAS.md](PENDENCIAS.md).

## Atualização — Registro 0043 / F6 Motoboy (2026-10-04)

- Motoboy: branch `codex/setup-workflow`, HEAD `d92e5915ca94dba80c37d234cac14634deadcd4f`, árvore limpa. Implementados ciclo de execução de DeliveryEvent, fluxo offline/outbox, GPS/assinatura local fail-closed, arquivo de tentativas na reentrega, reconciliação de Route/Earning, estado de sync, atualização das projeções e exclusão de `/api/` do cache PWA.
- Restaurante: branch `codex/setup-workflow`, HEAD `86e0185f66aa8e9342b6582ad8a38bd91dc9957d`, árvore limpa. Backend agora projeta `DELIVERY_ACCEPTED` e `DELIVERY_PICKED_UP`, preservando timestamps canônicos. Shared contract docs/scripts estão idênticos.
- F6 classificada **C — parcial** por lacuna de segurança: não existe vínculo canônico server-side User/Membership↔Driver, então o backend não prova atribuição individual nas operações/pull Motoboy. Não inferido por email/cliente. Provas remotas também dependem de storage provider; Browser QA permanece para F9.
- Testes: `npm test` Motoboy passou; `tests/test-domain-sync-postgres.js` passou contra PostgreSQL oficial via pgpass; node --check e git diff --check nos arquivos alterados passaram. Nenhuma migration/administração PostgreSQL, Browser QA, push ou mudança em main/tags/baselines.
- Baselines: Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad`; Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`. `main` preservada nos dois repositórios.
- Ver [Registro 0043](REGISTROS/0043.md), [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md) e [PENDENCIAS.md](PENDENCIAS.md).

## Atualização — Registro 0042 / F5 Restaurante (2026-10-04)

- F5 está **implementada** (classificação B: Browser QA integrado fica para F9). Restaurante permanece em `codex/setup-workflow`, HEAD `104b552273059c1848dc2ca3f7b5df2d45b1c016`; a árvore está limpa após os commits `b85b57a5c661324f705022055e323c1c310a212c` e `104b552273059c1848dc2ca3f7b5df2d45b1c016`. `main` continua `8fcd9f0ffffe37047a79834161cc1f791f20d76f`; baseline `v5.50-ui-mobile-fix5` continua em `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- Fluxos cobertos: criação/edição de pedidos; Delivery, atribuição/troca/cancelamento/reentrega; eventos/provas; Route com `deliveryIds` ordenáveis e sem relação inversa; cadastro Driver separado de GPS; ganhos/relatórios em unidades monetárias inteiras; indicadores de conclusão por `completedAt`; backup com aviso plaintext e merge sem sobrescrever; projeções sync canônicas e estado/rejeição visível.
- Corrigidos status executivos rebaixados por sync, exclusão física que quebrava Order/histórico, GPS editável no cadastro Driver, `driverId`/Earning ausentes na atribuição, falta de ID estável em pedidos legados e redelivery impossível no enforcement do servidor. A reentrega só é aceita depois de `DELIVERED`, `FAILED` ou `RETURNED` e gera audit_log via actor da sessão; `DELIVERY_RETURNED` agora atualiza a projeção canônica.
- Aplicativo: commit `b85b57a5c661324f705022055e323c1c310a212c` (`feat(restaurante): complete local-first operating flows`). Arquivos: `app.js`, `restaurant-operations.js`, `backend/domain/sync-service.js`, `index.html`, `styles.css`, `package.json`, `tests/test-restaurant-operations.js`, `tests/test-domain-sync-postgres.js`, `tests/test-sync-flows.js`. Nenhuma migration foi necessária; PostgreSQL oficial não teve alteração administrativa.
- Testes finais: Restaurante `npm test` e `npm run test:sync` passaram; teste PostgreSQL dirigido passou com `DATABASE_URL` runtime `rotamoto_app` e `MIGRATOR_DATABASE_URL` `rotamoto_migrator` via pgpass, sem senha na URL. Fixture transacional foi revertida; sem dados sintéticos residuais. `node --check` dos JS alterados e `git diff --check` passaram. Sem Browser QA.
- Motoboy permaneceu sem alteração: `codex/setup-workflow`, HEAD `3634b3da045500a1dbb84cb82bd967f03b332167`. Baseline do Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad` intacta. Nenhum push, F4/F6/F7/F8/F9 ou mudança em `main` iniciada.
- Próxima fase recomendada no plano: F6 Motoboy. Bloqueios F3 externos continuam conforme Registro 0041; importação de pedidos reais depende de F4; browser integrado de F5 fica para F9.
- Ver [Registro 0042](REGISTROS/0042.md), [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md) e [PENDENCIAS.md](PENDENCIAS.md).

# Estado Atual dos Projetos

Estado inspecionado em 2026-10-04, com atualizações registradas cronologicamente abaixo. Este documento resume somente fatos verificáveis nos checkouts locais; não presume estado de produção ou de serviços remotos. Histórico mais recente: Registro 0046.

## Atualização — Registro 0044 / vínculo canônico User↔Driver (2026-10-04)

- Restaurante: `codex/setup-workflow` @ `ec0fc333ea2373c5ac6207fee7b3727a6da1c5ad`. Motoboy: `codex/setup-workflow` @ `f8f3e2e251bc54111e0f445c40cf18780dc9ccbb`. Histórico será commitado ao final; sem push.
- Migration `0013_membership_driver_binding` aplicada no PostgreSQL oficial `18.6`, `127.0.0.1:5432/rotamoto`, via `rotamoto_migrator`; conexão runtime permaneceu em `rotamoto_app`/pgpass. Não houve alteração de role/configuração administrativa.
- Membership guarda vínculo opcional único ao Driver canônico do mesmo tenant. API administrativa protegida por RBAC, CSRF, MFA e auditoria. Sessão retorna o Driver resolvido no servidor; não há inferência por dados do cliente.
- Sync Motoboy exige vínculo server-side; pull/domínio respeitam o Driver e push valida sob lock atribuição corrente de DeliveryEvent/LocationPoint/DeliveryProof. Reatribuição preserva fatos e notifica minimamente o Driver anterior; fatos atrasados ficam rejeitados/conflict no cliente, sem perder modo offline.
- Testes focados de migration/status, constraints/FKs/grants/RLS e API/sync PostgreSQL passaram; testes Motoboy de workflow/reconciliação, syntax checks e `git diff --check` passaram. Sem Browser QA, suites amplas ou fixtures persistidas.
- F6 classificada **B — implementação concluída / Browser QA pendente em F9**. Restam provider de blob e permissões/hardware físicos como capacidades externas, sem bloquear implementação. Não iniciadas F4/F7/F8/F9. Baselines e main intactas; sem push.

## Atualização — Registro 0041 / F3 (2026-10-04)

- F3 implementada localmente até o limite seguro, classificada **PARCIAL** somente por dependências operacionais externas: primeiro owner/operator auditável, MFA enrollment/verificação com armazenamento seguro de chave e entrega real de convite/recuperação por email. Não existe signup público nem bypass MFA. Browser QA foi deliberadamente adiado para F9 e não mantém a implementação F3 aberta.
- Restaurante adicionou lifecycle administrativo de roles/memberships/convites, subset permission grants, proteção transacional do último owner e prevenção de autoelevação; alterações auditadas. Migration aditiva `0012_identity_rbac_lifecycle` aplicada pelo migrator oficial. APIs de criação/atualização de role, mudança de membership e convite usam sessão, CSRF, tenant da sessão, MFA exigida e erros sanitizados.
- Ambos os clientes agora têm login/logout, restauração e expiração de sessão, troca de tenant validada, recuperação/aceitação de convite, challenge MFA fail-closed, estados de loading/erro e sincronização best-effort após autenticação. Senha, session token, CSRF e tokens de recuperação/convite não são persistidos em IndexedDB/localStorage. O Motoboy diferencia modo local/offline de sessão autenticada; a UI do Restaurante expõe administração conforme permission keys e mantém profiles locais explicitamente separados.
- Corrigidos: POST de roles sombreado por GET; MFA ausente no fluxo de convite; último owner podia ser rebaixado em corrida; ausência das telas/clientes de identidade; assets/scripts duplicados/quebrados no Motoboy; campo oculto visível por CSS. Implementados testes de UI/API e sincronizados `identity-ui.js`/`.css`.
- PostgreSQL oficial `18.6`, `127.0.0.1:5432/rotamoto`, migrations 0001–0012 aplicadas; runtime continua `rotamoto_app`, DDL via `rotamoto_migrator`, RLS/FORCE preservada. Nenhuma role/configuração administrativa foi alterada nesta execução.
- Testes de fechamento: `npm test` nos dois apps e `npm run test:postgres` no Restaurante passaram; `node --check` nos JS modificados e `git diff --check` passaram. Sem Browser QA, sem push, sem dados sintéticos persistentes.
- Restaurante: branch `codex/setup-workflow`, HEAD `03634a6199cdc6b94440c55367f652f66df6e68f`; commits F3 `5a814d8` e `03634a6`. Motoboy: branch `codex/setup-workflow`, HEAD `3634b3da045500a1dbb84cb82bd967f03b332167`; commit F3 `3634b3d`. `main` preservada; tags/baselines permanecem Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad`.
- Ver [Registro 0041](REGISTROS/0041.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md). Próxima fase recomendada: F5. F4 não foi iniciada.

## Atualização — Registro 0040 (2026-10-04)

- F2 concluída para as operações internas v1 definidas: Restaurante adicionou consulta tenant-scoped para Order, Delivery, Route, Driver, DeliveryEvent, LocationPoint, DeliveryProof e Earning; leitura administrativa de Company, memberships, roles/permissões e metadados de integrações; health/readiness PostgreSQL; erros/request IDs/logs estruturados e documentação `rota-moto-restaurante/docs/API-v1.md` no app.
- Todas as leituras derivam tenant da sessão e verificam permission key; RLS/FORCE permanece defesa adicional. Não foi criado CRUD de domínio paralelo ao sync. As mutações de domínio seguem nos serviços/use cases de sync com ACK por operação. A API administrativa não revela `secret_ref` ou credenciais.
- Migration `0011_runtime_integration_read` concedeu somente SELECT em `integrations` e `external_accounts` a `rotamoto_app`; sem grants de escrita ou alteração de 0001–0010. Aplicada com `rotamoto_migrator`; status confirmou 0001–0011. PostgreSQL oficial continua 18.6 em `127.0.0.1:5432/rotamoto`.
- Testes: `npm test` e `npm run test:postgres` Restaurante passaram contra a instância oficial; cobrem migração/rollback/reapply, RLS, privilégios, endpoints, tenant, RBAC, sessão, sync e readiness. `node --check` em todos os JS alterados e `git diff --check` passaram. Sem Browser QA; sem dados sintéticos persistidos.
- Restaurante: `codex/setup-workflow`, HEAD `3cd0476e24feec8834028165da23a42d7b94db0e`, commits `3c5cd4b` e `3cd0476`, árvore limpa. CORS atende somente `ALLOWED_ORIGIN`, com preflight e CSRF; testes específicos de origem aceita/negada passaram. Motoboy sem alteração, branch `codex/setup-workflow`, HEAD permanece `f1ac938ca2fde6150e5f24b94b8125d466e19e24`, árvore limpa.
- Baselines intactas: Restaurante tag peel `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; Motoboy tag peel `79c527b59d32d8b55236c62042acb868166ed4ad`. `main` dos dois apps não alterada; nenhum push.
- Mutação de memberships/roles e convites genéricos requer política de lifecycle/RBAC da F3; primeiro operador/email/MFA continuam fail-closed. Integrações reais/deploy permanecem F4/F8. F2 não fica aberta por essas fases. Ver [Registro 0040](REGISTROS/0040.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).

## Atualização — Registro 0039 (2026-10-04)

- F1 implementada e encerrada na classificação **B: implementação concluída / Browser QA pendente para F9**. O plano não mantém F1 aberta por QA real posterior; F2 não foi iniciada.
- Restaurante: `codex/setup-workflow`, HEAD `f837268222b351145116690c6cee7649b9a09c78`, árvore limpa; commits F1 `40f712f` e `f837268`. Motoboy: `codex/setup-workflow`, HEAD `f1ac938ca2fde6150e5f24b94b8125d466e19e24`, árvore limpa; commits F1 `89deced` e `f1ac938`.
- Baselines preservadas: Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`. `main` dos apps não foi alterada; sem push.
- Contrato `CONTRACT.md`/`contract.js` byte a byte idêntico nos apps. Schemas canônicos v1 atualizados; Route→Delivery representa 0..N por `Route.deliveryIds`, sem campo inverso; o backend valida tenant/existência/tombstone, exclusividade de Route ativa, serializa concorrência e audita alterações.
- Earning usa `amountMinor` inteiro seguro, moeda explícita, componentes tipados e `rule`/`ruleVersion` opcionais; Restaurante calcula/escreve e Motoboy apenas consome. Provas usam metadata + storageRef/SHA-256, PNG/JPEG até 8 MiB; adapter de blob falha fechado enquanto não configurado e Data URL permanece somente local/legado.
- Backup Local-First v1 exporta todas as stores, remove campos de credenciais/sessão/CSRF/MFA/tokens/secrets e limita Data URL legado a PNG/JPEG de 8 MiB. Restore pede confirmação e faz merge atômico apenas de chaves ausentes, preservando colisões, outbox, conflitos e tombstones. Corrigido no Motoboy o export não implementado e o restore antigo que substituía os dados correntes.
- IndexedDB não precisou de novo store/índice ou bump: registry do Registro 0038 permanece nas versões Restaurante 6 e Motoboy 7. PostgreSQL oficial 18.6 (`127.0.0.1:5432/rotamoto`) aplicou migrations 0009–0010 via `rotamoto_migrator`; `migrate.js status` confirmou 0001–0010. Não houve alteração de role/configuração PostgreSQL.
- Testes: `npm test` passou em ambos; `npm run test:postgres` passou (migrations/RLS, identidade/HTTP e domínio/sync). Após adicionar `ruleVersion`, testes de schema nos dois apps e teste PostgreSQL de domínio/sync passaram novamente; `node --check` e `git diff --check` passaram. Sem Browser QA e sem dados sintéticos persistidos.
- Registro detalhado: [Registro 0039](REGISTROS/0039.md). Plano e pendências atualizados; sem nova decisão arquitetural além das decisões de domínio aprovadas nesta tarefa.

## Atualização — Registro 0038 (2026-10-04)

- F1.1 concluída: [MODELO_DADOS.md](MODELO_DADOS.md) mapeia entidades, campos conhecidos/desconhecidos, authority CRUD/tombstone, IndexedDB, PostgreSQL/API/sync, IDs/revisões/relations/constraints/indexes, offline/conflict/legacy, sensibilidade e retenção.
- Restaurante: `codex/setup-workflow`, HEAD `3efe7c3c8bb866d8c028a91ada00d03efa346914` (base `09f0c8c` + correção `3efe7c3`); DB_VERSION 4→6 com registry explícito e índices secundários não únicos.
- Motoboy: `codex/setup-workflow`, HEAD `a99356e1472e94b958c63bbebe985d3505bc4fa7` (base `f852b6d` + correção `a99356e`); DB_VERSION 5→7 com registry, índices e atualização do cache/service worker. Os upgrades não regravam/apagam registros; marker fica em meta e erro aborta versionchange transaction.
- PostgreSQL oficial 18.6 verificado read-only/status via `rotamoto_migrator`; migrations 0001–0008 aplicadas. Nenhum dado/schema/role foi alterado. Nenhuma migration PostgreSQL nova; domínio permanece JSONB enquanto campos/consultas não justificarem normalização. CONTRACT/contract.js permaneceram idênticos nos dois repos.
- Testes dirigidos: migration registry em ambos; lifecycle storage Motoboy; `node --check` dos JS/testes/service worker alterados; validação package JSON e `git diff --check` passaram. Sem `npm test` amplo, `test:postgres` amplo ou Browser QA. Banco local real/browser não foi aberto.
- F1 está **parcial**, não concluída: além de Route→Delivery, schema de algumas entidades e retenção, exports atuais são parciais e restore seguro de estado sync precisa semântica/testes. Próximo bloco permanece F1.2, sem iniciar F2. Ver [Registro 0038](REGISTROS/0038.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).

## Atualização — Registro 0037 (2026-10-04)

- Foi criado [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md) como fonte de verdade para concluir os dois aplicativos. Reconcilia DEC-0002–0006, Registros 0001–0036, contrato, código, IndexedDB estático, migrations 0001–0008, catálogo PostgreSQL read-only, API, integrações e UI.
- Restaurante: `codex/setup-workflow` @ `df562f7fd26fb93a2f3c857234987fa1d34800c9`, árvore limpa; baseline `v5.50-ui-mobile-fix5` peel `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`. Motoboy: `codex/setup-workflow` @ `6a1574f6a72e5ed87b0b8cbf16a3c90533d68b22`, árvore limpa; baseline `v39.6-ui-mobile-fix2` peel `79c527b59d32d8b55236c62042acb868166ed4ad`.
- PostgreSQL oficial 18.6 em `127.0.0.1:5432/rotamoto`; migrations 0001–0008 aplicadas. Catálogo read-only: 20 tabelas, 12 tenant-scoped com RLS ENABLE/FORCE, 50 índices, 258 constraints catalogadas. Nenhuma alteração no banco.
- Nenhuma alteração nos aplicativos, `main`, tags ou baselines. Sem Browser QA, QA end-to-end ou suites amplas. Sync/reconciliação 0034–0036 foi aceito como concluído, sem reimplementação.
- Ordem planejada: F1 modelo de dados; F2 backend/API; F3 identidade; F5/F6 fluxos dos apps; F4 integrações em paralelo; F7 UX; F8 produção; F9 QA final. Primeiro bloco recomendado: matriz por entidade/campo entre CONTRACT, IndexedDB dos dois apps, PostgreSQL/API e fixtures legadas, antes de migrations.
- Ver [Registro 0037](REGISTROS/0037.md). Commit somente no histórico; sem push.

## Atualização — Registro 0036 (2026-10-04)

- Restaurante: `codex/setup-workflow`, commit `df562f7fd26fb93a2f3c857234987fa1d34800c9` após `de53138cf68a4abba42530158fb793064e85069f`; sync agora reconcilia pull canônico em Inbox e projeções IndexedDB, preservando conflitos/edições locais.
- Motoboy: `codex/setup-workflow`, commit `6a1574f6a72e5ed87b0b8cbf16a3c90533d68b22` após `1eb7e6ae2a1fea31dd7e10e72c52892cd1ce5fae`; Delivery atribuída, Order, eventos, provas, pontos e earnings recebidos são associados às projeções/cache sem duplicar eventos ou substituir execução pendente.
- ACK por operação diferencia accepted/duplicate/rejected/conflict; IDs/revisões canônicos e estado são persistidos. Outbox mantém retry de rede e não repete automaticamente a mesma rejeição/conflito. Sync calcula status, restaura sessão existente, renova CSRF em caso de concorrência entre abas, serializa e continua paginação limitada.
- `npm test` passou nos dois apps; `npm run test:postgres` passou no Restaurante contra PostgreSQL oficial (migrations/RLS, identidade/CSRF/tenant e sync canônico). Syntax checks e `git diff --check` passaram também após correção de paginação. Sem Browser QA, conforme solicitado.
- Sem login visual/owner operacional enquanto MFA e identidade operacional não existirem; contrato ainda não define vínculo Route→Delivery; QA end-to-end via CDP fica para etapa posterior. Email, domínio/TLS e integrações externas permanecem dependências externas.
- `main` e baselines permanecem inalteradas; sem push. Detalhes no [Registro 0036](REGISTROS/0036.md).

## Atualização — Registro 0035 (2026-10-04)

- Restaurante: branch `codex/setup-workflow`, commit `78e10f2217edc053e2d0193b1b297d7e7fc16bd3`; árvore limpa. Migration 0008 associa instalação sync à identidade que a registrou. Serviço impõe ownership por entidade/campo, revisão canônica e ACK por operação; `source.app` não seleciona autoridade.
- Motoboy: branch `codex/setup-workflow`, commit `d88aeea9cbfedfa2e7e0e46e2437fec39155e5f2`; árvore limpa. Transporte Local-First envia fatos de execução/localização/provas, sem publicar Delivery, Earning ou dados administrativos como canônicos.
- `CONTRACT.md` e `contract.js` estão sincronizados. Restaurante escreve Order/Earning/Route/Driver e planejamento/cancelamento de Delivery; Motoboy escreve eventos de execução, LocationPoint e DeliveryProof. `DeliveryEvent` é imutável/idempotente. ACK individual distingue accepted/duplicate/rejected/conflict; retry usa IDs/revisões, sem LWW.
- Ambos preservam IndexedDB/outbox/inbox/syncState e operação offline. ACK só é aplicado após resposta; pull é keyset e cacheado sem sobrescrever projeções locais. Login/CSRF existem como helpers de sync, mas não há fluxo visual de login; merge de snapshots ao modelo da UI ainda requer reconciliação que preserve alterações pendentes. Sem Browser QA.
- `npm test` passou em ambos; `npm run test:postgres` passou no Restaurante contra PostgreSQL oficial; migration status confirma 0001–0008. Sintaxe JS e `git diff --check` passaram. Nenhum dado sintético persistiu.
- `main` permanece Restaurante `8fcd9f0ffffe37047a79834161cc1f791f20d76f` e Motoboy `aad1c6c07499e4fdf5c931ce5ce9e92cde3f7478`; baselines preservadas em `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e `79c527b59d32d8b55236c62042acb868166ed4ad`. Sem push. Detalhes em [Registro 0035](REGISTROS/0035.md).

## Atualização — Registro 0034 (2026-10-03)

- Restaurante: `codex/setup-workflow`, commit `e3e0656` (`feat(sync): add canonical tenant domain API`), árvore limpa após commit. Migrations `0005`–`0007` aplicadas pelo migrator no PostgreSQL oficial; `migrate.js status` confirma 0001–0007 aplicadas.
- Schema inclui `sync_installations` e `domain_records` canônicos, relações/aliases tenant-scoped, idempotência por pacote/evento, FK/checks/índices, RLS ENABLE/FORCE e grants runtime mínimos. API loopback `POST /api/sync/push` e `GET /api/sync/pull` usa sessão/RBAC `sync.push`/`sync.pull`, CSRF e tenant derivado server-side.
- `npm run test:postgres` e `npm test` Restaurante passaram; `npm test` Motoboy passou; checks de sintaxe e `git diff --check` passaram. Fixtures do novo teste PostgreSQL foram revertidas; nenhum dado sintético permaneceu. Sem Browser QA.
- Motoboy não foi alterado: branch `codex/setup-workflow`, HEAD `c0e019d607a0e713f308447e4581ef60e09ddf6e`, árvore limpa.
- PostgreSQL confirmado: 18.6, `rotamoto_app` em database `rotamoto`; `rotamoto_migrator` executou migrations. Nenhuma alteração administrativa de roles/ownership/grants foi feita nesta execução.
- Restaurante `main` preservada em `8fcd9f0ffffe37047a79834161cc1f791f20d76f`; baseline `v5.50-ui-mobile-fix5` em `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`. Motoboy `main` preservada em `aad1c6c07499e4fdf5c931ce5ce9e92cde3f7478`; baseline `v39.6-ui-mobile-fix2` em `79c527b59d32d8b55236c62042acb868166ed4ad`. Nenhuma tag/branch protegida ou contrato foi alterado; sem push.
- Limites: os apps ainda não chamam a API; ownership por campo de Delivery e ack/retention não estão definidos; `Earning` diverge entre o dono financeiro no contrato e o pacote Motoboy; source.app é metadado cliente. Detalhes e próximos passos em [Registro 0034](REGISTROS/0034.md).

## Atualização — Registro 0033 (2026-10-03)

- Restaurante: `codex/setup-workflow`, HEAD `c96907bc46165ec8ff2f7dda721bdc6b8160b0a2`, árvore limpa; commit `fix(db): enforce dedicated migration role`. `main` permanece `8fcd9f0ffffe37047a79834161cc1f791f20d76f`; baseline `v5.50-ui-mobile-fix5` continua no SHA `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- O checkpoint completo foi validado e o script administrativo do Registro 0032 foi executado manualmente com sucesso pelo operador DBA. Não foram usados `u0_a436`, sua senha ou `.pgpass` por esta execução; conexões foram somente como `rotamoto_app`/`rotamoto_migrator` via mecanismo existente.
- Catálogo PostgreSQL 18.6 confirma: database `rotamoto` owned pela role DBA de emergência; schema, 18 tabelas e duas funções owned por `rotamoto_migrator`; ambas roles LOGIN sem SUPERUSER/CREATEDB/CREATEROLE/BYPASSRLS. Runtime tem CONNECT/USAGE e DML explícito, sem CREATE/TEMP/DDL, sem `schema_migrations`, sem DELETE/TRUNCATE e sem UPDATE/DELETE de auditoria. Migrator pode criar objetos e ler o ledger.
- Dez policies tenant permanecem com RLS ENABLE/FORCE. Trigger append-only de `audit_log` rejeitou UPDATE e DELETE; runtime default-deny e cross-tenant também passaram. ACL padrão global foi ajustada para que funções futuras do migrator não recebam EXECUTE de PUBLIC.
- Runner usa `MIGRATOR_DATABASE_URL` e confere role/destino/conexão; servidor usa `DATABASE_URL` como `rotamoto_app`, valida loopback e faz preflight de `current_user`. `npm run test:postgres`, `node tests/test-server-security.js`, `migrate.js status`, smoke HTTP (health 200 e login sintético 401 esperado), `node --check` dos JS alterados e `git diff --check` passaram. Suites reverteram fixtures; nenhuma conta/tenant de teste foi mantida. Não foi executada bateria ampla nem Browser QA.
- Motoboy permaneceu sem alteração em `codex/setup-workflow`, HEAD `c0e019d607a0e713f308447e4581ef60e09ddf6e`, árvore limpa; baseline permanece `79c527b59d32d8b55236c62042acb868166ed4ad`. Sem push.
- Após revisar DEC-0002 e pendências, nenhum bloco subsequente foi implementado: owner real depende de adapter/prova de titularidade, email e MFA/KMS; integrações e sync/import dependem dessas capacidades e do contrato/rollout Local-First. Serviço permanece loopback. Ver [Registro 0033](REGISTROS/0033.md).

## Atualização — Registro 0032 (2026-10-03)

- Restaurante: preparação versionada para split DBA/migrator/runtime commitada como `70e42e0` em `codex/setup-workflow`. Inclui script SQL administrativo ainda não executado, runbook de backup/execução manual/validação/rollback e ajuste documental; nenhuma migration foi alterada.
- Auditoria PostgreSQL foi somente leitura via `rotamoto_app`: database/schema/18 tabelas ainda pertencem ao runtime; duas funções e trigger; nenhuma sequence/default ACL customizado; dez tabelas continuam RLS `FORCE`. `u0_a436` aparece como superuser nos catálogos, mas não foi autenticado nem teve senha solicitada/lida.
- Script atribui database ao DBA, objetos de `rotamoto` ao futuro `rotamoto_migrator`, e grants DML específicos ao HTTP `rotamoto_app`. Script não executado: checkpoint completo, configuração segura da senha do migrator e verificações pós-split continuam pendentes.
- `node --check backend/postgres/migrate.js` e `git diff --check` passaram; sem testes amplos/browser. O harness `test:postgres` ainda mistura conexão migration e runtime. Motoboy não mudou; baselines e `main` intactas. Ver [Registro 0032](REGISTROS/0032.md).

## Atualização — Registro 0031 (2026-10-03)

- Restaurante e Motoboy permanecem limpos em `codex/setup-workflow`, nos HEADs `7403ab9736775f078c7ec40c7a9312d1c03d94c9` e `c0e019d607a0e713f308447e4581ef60e09ddf6e`. Nenhum commit de aplicativo foi criado.
- PostgreSQL oficial 18.6 em `127.0.0.1:5432/rotamoto` aceita conexão por `.pgpass` somente como `rotamoto_app`. Essa role não é superuser, não cria roles, não faz bypass de RLS, mas é owner do database/schema/tabelas e tem `CREATE` no database/schema.
- Não há credencial DBA disponível no `.pgpass`. O dump completo foi bloqueado por RLS forced em `audit_log`; o artefato parcial foi marcado `.incomplete`. Dump somente de schema foi validado, mas não constitui checkpoint de dados.
- Nenhuma role/grant/ownership, migration, configuração PostgreSQL, código, main ou baseline foi alterada. `migrate.js status` e conexão Node da aplicação passaram; separação de privilégios permanece bloqueada até acesso DBA seguro e checkpoint completo. Detalhes no [Registro 0031](REGISTROS/0031.md).

## Atualização — Registro 0030 (2026-10-03)

- Restaurante: `codex/setup-workflow`, HEAD `7403ab9736775f078c7ec40c7a9312d1c03d94c9`, árvore limpa após commit. Migration `0004_foundation_integrity_constraints` aplicada ao PostgreSQL oficial; nenhuma migration anterior foi editada.
- Validação cobriu 17 tabelas de domínio, 25 FKs, 10 tabelas RLS forçadas, checksums, migrations ausentes, lock concorrente, reexecução idempotente, rollback de DDL e clean install em schema temporário revertido. `npm run test:postgres`, `npm test`, syntax checks e `git diff --check` passaram.
- PostgreSQL 18.6 continuou em `127.0.0.1:5432`/`rotamoto`, conexão `rotamoto_app` via `.pgpass`; nenhuma role, privilégio, ownership ou configuração foi alterada. Nenhum dado sintético permaneceu.
- Lacuna crítica: `rotamoto_app` é proprietário do database, schema e das tabelas; owner pode mudar policies/triggers e RLS. Separação entre runtime e migration/owner requer operação administrativa de ownership/grants, não permitida nesta etapa. Portanto a fundação não está pronta para exposição nem para fases operacionais que dependam dessa fronteira.
- Motoboy permaneceu limpo em `codex/setup-workflow`, HEAD `c0e019d607a0e713f308447e4581ef60e09ddf6e`. Baselines e `main` dos aplicativos permaneceram intactas; sem push.

## Atualização — Registro 0029 (2026-10-03)

- Restaurante: branch `codex/setup-workflow`, HEAD `014c286c1957c77a687d4bcfb0d0f1a666b408ad`, árvore limpa após commit. API HTTP de identidade montada no servidor loopback; endpoints e controles estão detalhados no [Registro 0029](REGISTROS/0029.md).
- A camada HTTP conecta-se ao PostgreSQL oficial 18.6 em `127.0.0.1:5432`, banco `rotamoto`, usuário `rotamoto_app`, usando `.pgpass`. Fixtures sintéticas foram revertidas; queries posteriores confirmaram zero tenants/usuários de teste persistidos.
- Argon2id usa `argon2` 0.45.1 compatível com Node >=18; addon compilado no Termux. `npm test`, `npm run test:postgres`, HTTP direcionado, `npm audit --omit=dev`, sintaxe JS e `git diff --check` passaram. Smoke do servidor: health 200 e sessão anônima 401.
- Motoboy permaneceu sem alteração em `codex/setup-workflow`, HEAD `c0e019d607a0e713f308447e4581ef60e09ddf6e`. Baseline Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e `main` `8fcd9f0ffffe37047a79834161cc1f791f20d76f` intactos; sem push.
- Provisionamento real continua fechado sem adapter de operador, prova de titularidade, email, HTTPS e MFA/KMS. Não há UI/browser flow integrado; sessão de owner permanece bloqueada por MFA obrigatória. O rate limit é local por processo/socket; proxy/múltiplas instâncias exigem configuração explícita antes do deploy.

## Atualização — Registro 0028 (2026-10-03)

- Restaurante: branch `codex/setup-workflow`, HEAD final `5c6e9b4fc64bfad62d7011c14135fa273ae80788`; commits `f521431310a0bc29c4a21f6b9f1d354ff3c7e875` (serviços de identidade) e `5c6e9b4fc64bfad62d7011c14135fa273ae80788` (cobertura de expiração de sessão); árvore limpa.
- PostgreSQL oficial 18.6/`rotamoto` em `127.0.0.1:5432`, usuário `rotamoto_app` por `.pgpass` modo 600; migrations 0001–0003 aplicadas. Testes transacionais foram revertidos; tabelas de tenant, conta, token, sessão e auditoria sem registros sintéticos persistidos.
- Provisionamento, Argon2id, convite/verificação, recovery, sessão/CSRF, RBAC e contexto RLS estão implementados como serviços internos e passaram testes. Não existe endpoint/API conectado; autorização real de provisionador, email/HTTPS e MFA/KMS faltam. Identidade requer Node >=24.7 por `crypto.argon2` release-candidate; o serviço existente declara Node >=18.
- `npm test`, `npm run test:postgres`, syntax checks, `git diff --check` passaram nos apps. Motoboy permaneceu sem mudança. Audit: Restaurante offline zero vulnerabilidades (online sem DNS); Motoboy online zero.
- Baselines e `main` não mudaram; sem push. Detalhes em [Registro 0028](REGISTROS/0028.md).

## Atualização — Registro 0027 (2026-10-03)

- Restaurante: commit `a82160037e4538525e398db70d25aef4165e1c38` em `codex/setup-workflow`; schema/migration DEC-0002 Fase 1 aplicado no PostgreSQL oficial 18.6 em `127.0.0.1:5432`, banco `rotamoto`, usuário `rotamoto_app` via `.pgpass`. Não foram criadas contas/tenants ou endpoints de login/API.
- Motoboy permaneceu sem alterações nesta execução em `codex/setup-workflow`, HEAD `c0e019d607a0e713f308447e4581ef60e09ddf6e`. O Restaurante está em `codex/setup-workflow`, HEAD final `a82160037e4538525e398db70d25aef4165e1c38`.
- `npm test` passou nos dois; PostgreSQL migration/RLS, sintaxe JS, `git diff --check`, `npm audit` e Browser QA desktop/tablet/mobile passaram. Captura sintética de câmera e finalização Motoboy com assinatura sobreviveram ao reload. Varredura não encontrou novo bug de aplicação.
- Baselines continuam Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad`; `main` inalterada; sem push. Fase 2 depende de prova operacional de titularidade e serviço de email; KMS/secret manager e demais fases também permanecem pendentes. Veja [Registro 0027](REGISTROS/0027.md).

## Atualização — Registro 0026 (2026-10-03)

- Motoboy: correção da concorrência entre abas commitada como `c0e019d607a0e713f308447e4581ef60e09ddf6e` em `codex/setup-workflow`; HEAD final `c0e019d607a0e713f308447e4581ef60e09ddf6e`, árvore limpa. Web Lock exclusivo protege snapshot persistido/rebase dos comandos; dois ajustes concorrentes sobreviveram ao reload em Chromium/CDP.
- `npm test`, `node --check app.js` e `git diff --check` passaram no Motoboy. `npm test` e `git diff --check` passaram no Restaurante, que permaneceu sem alteração em `3b12dec0923c779a4745d1a834c2bbf6b40b1f2f`.
- Baselines Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad` e Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e os respectivos `main` não foram alterados. Sem push. Suporte Web Locks nos browsers-alvo e pendências DEC-0002/câmera/GPS continuam abertas. [Registro 0026](REGISTROS/0026.md).

## Atualização — Registro 0025 (2026-10-03)

- Branches locais `codex/qa-functional-2026-10-03` removidas dos dois aplicativos após confirmar que todo o conteúdo estava preservado em `codex/setup-workflow`. No Restaurante, o commit QA `36b05e8` tem patch/tree idênticos ao cherry-pick `3b12dec`; no Motoboy, ambas as branches apontavam para `b57afc2`.
- Branches remotas QA não existiam. Estado final limpo em `codex/setup-workflow`: Motoboy HEAD `b57afc2ae5c82ad0ae65a4857c59e95581ed809d`; Restaurante HEAD `3b12dec0923c779a4745d1a834c2bbf6b40b1f2f`.
- Baselines Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad` e Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e os respectivos `main` não foram alterados. Sem push. Detalhes: [Registro 0025](REGISTROS/0025.md).

## Atualização — Registro 0024 (2026-10-03)

- A tag anotada Motoboy `v39.6-ui-mobile-fix2` tem ref/tag object `d5b8f463f9daec615fecf1b01ff7f61533fd1827`; seu commit após peel, que é o SHA real da baseline, é `79c527b59d32d8b55236c62042acb868166ed4ad`.
- O checkout estava limpo na branch `codex/qa-functional-2026-10-03`. A verificação foi somente leitura; nenhum arquivo, branch ou tag do aplicativo foi alterado. Ver [Registro 0024](REGISTROS/0024.md).

## Atualização — Registro 0023 (2026-10-03)

- Correção de QA Restaurante `36b05e830ceb9c36e964207ecc83ac4731f4a572` consolidada por cherry-pick em `codex/setup-workflow`; HEAD final `3b12dec0923c779a4745d1a834c2bbf6b40b1f2f`. Cherry-pick sem conflito; `npm test`, `node --check app.js` e `git diff --check` passaram.
- Baseline `v5.50-ui-mobile-fix5` continua no commit `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` (ref anotada `9ebb7098725200bdec82e79be1e9ea622fe20120`). `main` e tags não foram alteradas; sem push. Detalhes: [Registro 0023](REGISTROS/0023.md).

## Atualização — Registro 0022 (2026-10-03)

- QA Chromium/CDP nos dois apps em desktop, tablet e mobile. Restaurante corrigido para exibir integralmente ações/QR da tabela completa e manter o título do modal acima do cabeçalho fixo. Motoboy não exigiu mudança.
- Commit Restaurante `36b05e830ceb9c36e964207ecc83ac4731f4a572`, branch `codex/qa-functional-2026-10-03`; sem push. Motoboy permaneceu limpo em `b57afc2ae5c82ad0ae65a4857c59e95581ed809d` na branch `codex/qa-functional-2026-10-03`.
- `npm test`, `node --check app.js` e `git diff --check` passaram nos dois repositórios. Regressão de fluxos corrigidos repetida via CDP.
- Baselines `v5.50-ui-mobile-fix5` e `v39.6-ui-mobile-fix2` permanecem inalteradas e ancestrais dos respectivos HEADs. Câmera não existe no runtime Chromium; validação de finalização/assinatura Motoboy dependente de GPS não pôde ser concluída de modo confiável. Ver [Registro 0022](REGISTROS/0022.md).

## Atualização — Registro 0021 (2026-10-03)

- A infraestrutura compartilhada `~/projetos/browser-tests/run-qa-infra.sh` foi criada e commitada no workspace de browser testing como `8a2d463`.
- Diagnóstico inicial identificou Chromium/CDP e servidores locais ausentes. A execução validada usa Chromium `149.0.7827.155`, CDP em `127.0.0.1:9222`, Restaurante em `8788` e Motoboy em `8789`, com `--disable-gpu` para contornar instabilidade de GPU no Termux/Android.
- Navegação real via CDP confirmou acesso aos dois aplicativos. Chromium/CDP e servidores temporários foram encerrados corretamente após o uso.
- Nenhum aplicativo ou baseline foi alterado. A limitação de Chromium/GPU no Termux/Android permanece; consulte o [Registro 0021](REGISTROS/0021.md).

## Atualização — Registro 0020 (2026-10-03)

- Histórico mais recente: Registro 0020. Validação somente leitura dos aplicativos; nenhum arquivo de aplicação foi alterado.
- Restaurante: branch `codex/setup-workflow`, HEAD `b1ef1bcc47e8294cc15dbc83e4f5f63add14d231`, worktree limpo. Baseline `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`, ancestral do HEAD.
- Motoboy: branch `codex/setup-workflow`, HEAD `b57afc2ae5c82ad0ae65a4857c59e95581ed809d`, worktree limpo. Baseline `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`, ancestral do HEAD.
- `npm test` passou nos dois aplicativos. Browser QA bloqueado: CDP em `127.0.0.1:9222` retornou `ECONNREFUSED`.
- Nenhuma implementação da Fase 1 foi realizada. Segundo DEC-0002, ela cobre schema/migrations PostgreSQL para identidade, tenant, sessão, roles/permissões, integrações e mapeamento de IDs. O roadmap posterior de persistência do Restaurante é complementar e não substitui essa definição.

## Identidade e autorização do backend futuro

- O Restaurante ainda não tem autenticação real, credenciais de usuário, sessões ou membership no backend. `users`, `profiles`, `companies`, permissões e `currentUserId` são estado local no IndexedDB e não são autoridade de segurança.
- O contrato compartilhado atual é Local-First e orientado a dados de domínio; esta análise não o alterou. Recomendações ainda não foram aprovadas como decisões de implementação.
- Registro 0004 contém análise e fontes consultadas; decisões pendentes sobre onboarding, credenciais, permissões, integração, IDs e offline estão em `PENDENCIAS.md`.

## RotaMoto Motoboy

- **Baseline:** tag `v39.6-ui-mobile-fix2`, commit `79c527b59d32d8b55236c62042acb868166ed4ad`; tag preservada.
- **Branch atual:** `codex/setup-workflow`.
- **Último commit:** `4b4fd6acf137134b38ed6d37c992c7aee2199c6a` — `fix(settings): serialize transactional settings updates` (Registro 0018).
- **Situação do worktree:** limpo após Registro 0018.
- **Funcionalidades relevantes:** README descreve finalização de corrida protegida por assinatura do cliente, slider de confirmação, persistência da assinatura/horário e validação de distância/GPS. `AGENTS.md` descreve aplicativo web do entregador e estratégia local-first com IndexedDB.
- **Pendências conhecidas:** nenhuma listada em `PENDENCIAS.md` nem encontrada nas seções consultadas dos documentos do projeto; não é afirmação de ausência absoluta de trabalho futuro.
- **Testes disponíveis:** `npm test` executa contratos/fluxos de sync, ciclo de vida de storage, persistência de pacotes, comandos e exclusão; passou no Registro 0018. `tests/test-command-persistence.js` verifica estruturalmente commit/erro/fila dos comandos locais.
- **Infraestrutura de browser testing:** instruções documentam Chromium/CDP e workspace compartilhado. Situação corrente detalhada em “Infraestrutura”.

## RotaMoto Restaurante

- **Baseline:** tag `v5.50-ui-mobile-fix5`, commit `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; HEAD está seis commits à frente. Tag não alterada. (O Registro 0001 tinha referência abreviada incorreta; este hash foi conferido diretamente na tag.)
- **Branch atual:** `codex/setup-workflow`.
- **Último commit conhecido:** `133da3d0bc9ec953e4175e5bbb40a89abb5cd2ba` — `fix(server): return 413 for oversized request bodies` (2026-10-01).
- **Situação do worktree:** limpo após Registro 0006; nenhum arquivo staged, unstaged ou não rastreado.
- **Funcionalidades relevantes:** README descreve painel de restaurante, origens de pedidos e laboratório local-first para integrações incluindo iFood, 99Food e Keeta; `AGENTS.md` documenta contrato de dados e integrações desacopladas.
- **Pendências conhecidas:** nenhuma listada em `PENDENCIAS.md` nem encontrada nas seções consultadas dos documentos do projeto; não é afirmação de ausência absoluta de trabalho futuro.
- **Testes disponíveis:** scripts `npm test` (auditoria, integrações, segurança do servidor, sync, billing e iFood), `npm run test:sync` (contrato e fluxos de sync) e `npm run check` (sintaxe do `server.js`). Arquivos listados em `tests/`: audit, integrations, server-security, sync-adversarial, sync-contract e sync-flows. Também existem `test-billing.js` e `test-ifood.js` referenciados pelo script. Nada foi executado nesta leitura.
- **Infraestrutura de browser testing:** instruções documentam Chromium/CDP e workspace compartilhado. Situação corrente detalhada em “Infraestrutura”.

## Infraestrutura

- **Termux:** caminhos observados estão sob `/data/data/com.termux/files/home`; versão não verificada.
- **Node/npm:** Node `v26.4.0`, npm `11.20.0` no ambiente desta leitura. Restaurante declara requisito Node `>=18`.
- **Browser testing compartilhado:** `~/projetos/browser-tests` existe; pacote declara `chrome-remote-interface ^0.34.0`, resolvível em `node_modules`. `scripts/` existe, sem arquivos. O `package.json` do workspace tem somente script `test` sem testes configurados.
- **Chromium:** `$PREFIX/lib/chromium/chrome` existe e é executável; `--version` informou `Chromium 149.0.7827.155`.
- **CDP em localhost:9222:** nenhum processo Chromium com porta de depuração foi encontrado; consulta a `http://127.0.0.1:9222/json/version` falhou com conexão recusada (HTTP 000). Portanto, binário e cliente estão instalados, mas não havia sessão CDP ativa. Nenhum browser testing foi executado.
- **PHP / PostgreSQL / Nginx / SSH:** situação não verificada.
- **Codex:** utilizado nesta interação; versão/runtime não inspecionado.
- **Demais componentes:** não verificados; não presumir instalação, execução ou configuração ativa.

## Auditoria Git — Registro 0005

- Restaurante: `codex/setup-workflow`, HEAD `133da3d0bc9ec953e4175e5bbb40a89abb5cd2ba`, sete commits após `v5.50-ui-mobile-fix5`; worktree limpo.
- Motoboy: `codex/setup-workflow`, HEAD `6ccd8b9059c6fa5bc4ac7165c762a5f094ee750e`, quatro commits após `v39.6-ui-mobile-fix2`; worktree limpo.
- Registro 0006: auditoria funcional/de sync/segurança encontrou defeito médio no limite de 1 MiB do corpo HTTP do Restaurante; fix commitado e coberto por teste. Suíte completa e `node --check server.js` passaram. Testes do Motoboy e `node --check app.js` passaram. Nenhum browser test foi necessário para a mudança backend.
- As tags baselines continuam apontando para os commits `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e `79c527b59d32d8b55236c62042acb868166ed4ad`; worktrees limpos e nenhum push realizado.

## Atualização — Registro 0007

- Motoboy: branch `codex/setup-workflow`, HEAD `ec668b19265e70c9f039956668a36355f040a472` (`fix(storage): persist rider state atomically`), worktree limpo. Persistência de `races`, `deliveries` e `meta.settings` agora é atômica numa transação multi-store; falhas do IndexedDB propagam ao chamador.
- Restaurante: sem alterações; branch `codex/setup-workflow`, HEAD `133da3d0bc9ec953e4175e5bbb40a89abb5cd2ba`, worktree limpo.
- Baselines verificadas sem alteração: Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`.
- Registro 0007 executou testes de sync e sintaxe no Motoboy e a suíte completa/check no Restaurante; nenhum browser QA. Nenhum push.

## Atualização — Registro 0008

- Histórico mais recente: Registro 0008.
- Motoboy: branch `codex/setup-workflow`, HEAD `b150b73f4f97fc8dd4ca88be9a750be2a5e453b8` (`fix(sync): persist rider events with state atomically`), worktree limpo. A transação que salva corrida e projeção agora também salva `deliveryEvents` e `outbox` nas transições operacionais; falhas do IndexedDB propagam e restauram o estado em memória. `npm test` executa os três testes de sync existentes.
- Restaurante: sem alterações; branch `codex/setup-workflow`, HEAD `133da3d0bc9ec953e4175e5bbb40a89abb5cd2ba`, worktree limpo. Suíte e check passaram.
- Baselines preservadas: Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`; Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- Nenhum push; browser QA e chamadas reais a provedores externos não foram realizados.

## Atualização — Registro 0009

- Histórico mais recente: Registro 0009. DEC-0002 adota a arquitetura de identidade/tenant e o plano faseado. As pendências agora são implementação dependente de PostgreSQL, secret manager/KMS e entrega de email.
- Restaurante: branch `codex/setup-workflow`, HEAD `3a0ed99c0a1db9b50d19711f0fed2502be4360a2` (`fix(security): restrict unauthenticated service to loopback`), worktree limpo. O servidor recusa inicialização com HOST não-loopback enquanto não existe autenticação humana/tenant.
- Motoboy: sem alteração nesta etapa; branch `codex/setup-workflow`, HEAD `b150b73f4f97fc8dd4ca88be9a750be2a5e453b8`, worktree limpo.
- Baselines permanecem inalteradas: Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`.
- Testes dos dois projetos e `git diff --check` passaram. Nenhum push, browser QA ou chamada real a provedor externo.

## Atualização — Registro 0010

- Motoboy: branch `codex/setup-workflow`, HEAD `b150b73f4f97fc8dd4ca88be9a750be2a5e453b8`; sem alterações nesta etapa.
- Restaurante: branch `codex/setup-workflow`, HEAD `af711d39064c0e487e07f187720408434104ff80` (`fix(security): reject untrusted delivery status markup`), worktree limpo.
- Corrigido XSS armazenado: status desconhecido vindo de backup/import ou dados de integração não é mais devolvido como HTML; recebe rótulo fixo. Incluído teste de segurança com payload de markup.
- Baselines confirmadas sem alteração: Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`; Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- `npm test` nos dois apps, `npm run check` do Restaurante, verificações `node --check` e `git diff --check` passaram. Browser QA não executado conforme solicitado. Nenhum push.


## Atualização — Registro 0011

- Restaurante: branch `codex/setup-workflow`, HEAD `92ddb8df9a060446c098fb0edc0c0d121c5d6369` (`fix(sync): compare tombstones against staged deliveries`), worktree limpo. O recebimento agora compara tombstones também com gravações já preparadas no pacote, evitando que exclusão mais antiga vença entrega mais recente.
- Motoboy: branch `codex/setup-workflow`, HEAD `b150b73f4f97fc8dd4ca88be9a750be2a5e453b8`, worktree limpo; sem alteração nesta etapa.
- Baselines continuam preservadas: Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`.
- Testes completos dos dois apps, `npm run check` do Restaurante e verificações de sintaxe/diff passaram. Nenhum browser QA ou chamada externa. Push: NÃO.

## Atualização — Registro 0012

- Restaurante: branch `codex/setup-workflow`, HEAD `381ab17a8b9e430fb0bd485037eaf53213c0cbb7` (`fix(sync): make packet receipt idempotent in transaction`), worktree limpo. A checagem final de `syncReceipts` agora ocorre dentro da mesma transação readwrite que grava o conteúdo do pacote; chamadas concorrentes com o mesmo `packetId` não reaplicam o pacote.
- Motoboy: sem alteração nesta etapa; branch `codex/setup-workflow`, HEAD `b150b73f4f97fc8dd4ca88be9a750be2a5e453b8`, worktree limpo.
- Baselines preservadas e ancestrais dos HEADs: Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`.
- `npm test` nos dois aplicativos, `npm run check` do Restaurante, verificações de sintaxe e `git diff --check` passaram. Browser QA não executado conforme solicitado. Push: NÃO.

## Atualização — Registro 0013

- Motoboy: branch `codex/setup-workflow`, HEAD `50b9dff` (`fix(storage): recover IndexedDB connection lifecycle`), worktree limpo. `openDB()` agora limpa a Promise cacheada ao falhar, trata abertura bloqueada, fecha a conexão em `versionchange` e fecha uma conexão que abra após a falha por bloqueio. Suite dedicada cobre retry, troca de versão, bloqueio e sucesso tardio.
- Restaurante: sem alteração; branch `codex/setup-workflow`, HEAD `381ab17a8b9e430fb0bd485037eaf53213c0cbb7`, worktree limpo.
- Baselines inalteradas: Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`; Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- Testes completos dos dois aplicativos, `npm run check` do Restaurante, verificações de sintaxe, `git diff --check` e estados Git finais passaram. Nenhum browser QA ou push.

## Atualização — Registro 0014

- Motoboy: branch `codex/setup-workflow`, HEAD `c81d18b8614976b4b4353f4c7ee08174e8dd18a2` (`fix(storage): clear rider history atomically`), worktree limpo. Exclusão do histórico grava tombstones e limpa corridas, projeções e stores relacionados na mesma transação; memória/UI muda após o commit.
- Restaurante: branch `codex/setup-workflow`, HEAD `381ab17a8b9e430fb0bd485037eaf53213c0cbb7`, sem alteração e worktree limpo.
- Baselines preservadas: Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`; Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- Testes completos dos dois aplicativos, verificações de sintaxe relevantes e `git diff --check` passaram. Cobertura da garantia nova é estrutural, pois o ambiente Node não oferece IndexedDB nem simulador instalado. Nenhum browser QA ou push.

## Atualização — Registro 0015

- Histórico mais recente: Registro 0015. Branch `codex/setup-workflow` nos dois projetos; worktrees limpos após commits.
- Motoboy: HEAD `9b0a5acd5e9cad0055a946c92587ac12041ebcc9` (`fix(sync): apply rider packets atomically`). Recebimento de pacotes do Restaurante prepara `nextRaces`, grava projeções alteradas e recibo na mesma transação `races`/`deliveries`/`inbox`, e só atualiza memória/UI após `oncomplete`. Repetição consulta o recibo dentro da transação. `persistOnly` segue gravando `races`, projeções, settings e opcionalmente evento/outbox numa transação, mas chamadores gerais ainda mutam estado global antes de persistir.
- Restaurante: HEAD `b1ef1bcc47e8294cc15dbc83e4f5f63add14d231` (`test(sync): cover tombstone rollback on receipt`), após também `b721257e36af7c09038278c25b58562ca197c288` (`test(sync): exercise transactional packet recovery`). Recebimento existente já prepara staged writes e confirma domínio, tombstones, recibo e settings numa transação; memória e eventos de sucesso são publicados depois do commit. A cobertura executável inclui tombstone no rollback/retry/replay.
- Baselines verificadas como ancestrais dos HEADs e inalteradas: Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`; Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- Suítes `npm test` de ambos, `npm run check` do Restaurante, `node --check` dos JS relevantes e `git diff --check` passaram. Os novos testes usam transação fake isolada nos testes e exercitam erro/abort depois de enfileirar gravações, rollback, retry e pacote repetido.
- Limitação: Node neste ambiente não oferece IndexedDB; os testes não provam escalonamento/browser, quota, upgrade bloqueado nem detalhes de abort nativos. Nenhum browser QA, chamada externa ou push foi realizado.


## Atualização — Registro 0016

- Motoboy: fronteira `commitRiderCommand` serializa comandos migrados e persiste snapshot antes de publicar estado/render. Cadastro/edição, iniciar, chegada, finalizar, problema, cancelamento e recálculo de taxas migrados. Teste estrutural cobre sucesso, falha e concorrência.
- Pendências remanescentes desta frente: ajustes gerais ainda mutam `state.settings` antes de persistir; exclusão de corrida grava tombstone separadamente; outros mutadores de rota/GPS seguem usando persistência sobre estado global já alterado.
- `node --check app.js`, `npm test` e `git diff --check` passaram. Runtime sem IndexedDB nativo; sem browser QA e sem push. HEAD `46844e1a6d4ee00b4fe86b939d08123d574a72e9` (`fix(race): serialize transactional race commands`); worktree limpo.


## Atualização — Registro 0017

- Motoboy: HEAD `9faa45fcb6f5ece8810f45ce8749dd679d873af1` (`fix(race): make deletion and tombstone atomic`), branch `codex/setup-workflow`, worktree limpo. Exclusão serializada agora confirma races/deliveries/settings e tombstone em transação única; backup/estado/UI só avançam após commit. A edição enfileirada após delete não recria a corrida.
- QA Chromium 149.0.7827.155 via CDP, viewport mobile 412×915: criação, edição, início, exclusão, leitura IndexedDB e reload controlado pelo service worker passaram; sem erro JS/IndexedDB ou HTTP local 4xx/5xx. QA browser concluído sem SIGKILL durante este registro. Mensagens de GPU fatal ocorreram no stderr somente ao encerrar Chromium voluntariamente após QA.
- `node --check app.js`, `node --check service-worker.js`, testes direcionados, `npm test` e `git diff --check` passaram. Sem push. Ajustes/autosave e outros mutadores continuam pendentes.


## Atualização — Registro 0018

- Motoboy: HEAD `4b4fd6acf137134b38ed6d37c992c7aee2199c6a` na branch `codex/setup-workflow`; worktree limpo. Baseline `v39.6-ui-mobile-fix2` (`79c527b59d32d8b55236c62042acb868166ed4ad`) preservada.
- Autosave e salvamento manual de ajustes, tema/idioma e fechamento diário usam `commitRiderCommand` através de `commitSettingsCommand`; os valores são aplicados ao snapshot enfileirado e a memória/UI só são publicadas após `persistOnly` confirmar. Recalculo de taxas usa as configurações candidatas. Falha mantém configuração anterior e restaura os controles; tiers permanecem rascunho até salvamento/autosave.
- `node --check app.js`, `node tests/test-command-persistence.js`, `npm test` e `git diff --check` passaram. Teste de persistência é estrutural; IndexedDB nativo não foi exercitado. Browser QA não executado conforme escopo. Nenhum push.


## Atualização — Registro 0019

- Varredura consolidada no Motoboy encontrou falhas de persistência em normalização inicial, distâncias/ordem de rota, GPS, importação e limpeza; também tombstones recebidos que não eram retidos e HTML que não escapava IDs/assinaturas importados. Correções usam a fila/snapshot e transações existentes.
- HEAD final `b57afc2ae5c82ad0ae65a4857c59e95581ed809d` (`fix(motoboy): consolidate remaining technical issues`); baseline `v39.6-ui-mobile-fix2` preservada; Restaurante sem alteração.
- `node --check app.js`, `npm test` e `git diff --check` passaram. Browser QA não executado. Uma limitação de concorrência entre abas independentes permanece documentada no Registro 0019.
