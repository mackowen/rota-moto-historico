# Plano mestre de finalização do RotaMoto

**Revisão:** 2026-10-04 · **Fonte de verdade:** este documento, reconciliado com DEC-0002 a DEC-0006, os Registros 0001–0047, os checkouts em `codex/setup-workflow`, o contrato sincronizado e o PostgreSQL oficial. **Estado:** F1 concluída como implementação (classificação B); F2 concluída para operações v1; F3 implementada localmente com bloqueios externos explícitos (classificação PARCIAL); F4 com infraestrutura local concluída e providers externos bloqueados (Registro 0046); F5 Restaurante implementada (classificação B, Registro 0042); F6 Motoboy implementada (classificação B, Registro 0044); F7 UI/UX consolidada estaticamente (classificação B, Registro 0045); F8 preparação operacional local concluída com implantação externa pendente (classificação B, Registro 0047). F9 permanece não iniciada.

Este plano reúne trabalho já comprovado, lacunas encontradas no código e dependências externas reais. Não reabre o trabalho concluído nos Registros 0033–0036: role split, domínio canônico, ownership, ACK, transporte e reconciliação Local-First permanecem concluídos nos limites registrados. `main`, tags e baselines são referências protegidas.

## Legenda e limites da inspeção

- **Completo:** há implementação e evidência de teste/histórico para o escopo descrito.
- **Parcial:** existe implementação, mas faltam fluxo integrado, cobertura, operação ou semântica.
- **Ausente:** não localizado no código atual.
- **Derivado:** projeção/cache calculado a partir de dados canônicos ou eventos.
- **Legado:** estrutura mantida para compatibilidade/migração, sem autoridade canônica.
- **Externo:** requer fornecedor, domínio/HTTPS, credencial, decisão operacional ou ambiente fora dos repositórios.

A inspeção histórica do Registro 0037 foi estática; na conclusão F1 (Registro 0039), ambos `npm test` e o `npm run test:postgres` foram executados. Não se executou Browser QA. Migrations 0009–0010 foram aplicadas e validadas no PostgreSQL oficial pelo `rotamoto_migrator`, usando pgpass; status confirma 0001–0010 aplicadas. Nenhuma senha foi lida ou exibida.

## Estado atual verificável após o Registro 0047

- Restaurante: `codex/setup-workflow` @ `22a06c248b3e9baa9c2ad047f9155d18921151f7`, árvore limpa; baseline tag peel `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` intacta.
- Motoboy: `codex/setup-workflow` @ `3e0f42b1129930a8d69d5a979b5da14149089fa7`, árvore limpa; baseline tag peel `79c527b59d32d8b55236c62042acb868166ed4ad` intacta.
- `main` dos apps não foi alterada; nenhum push foi feito.
- Restaurante `main`: `8fcd9f0ffffe37047a79834161cc1f791f20d76f`; Motoboy `main`: `aad1c6c07499e4fdf5c931ce5ce9e92cde3f7478`. Nenhuma tag/baseline mudou.
- PostgreSQL oficial: somente leitura nesta execução; readiness passou pela role runtime e `migrate.js status` confirmou 0001–0013 aplicadas via migrator. Nenhum schema, dado, role, grant ou configuração foi alterado.
- O Termux/PostgreSQL/nginx existente continua classificado como desenvolvimento/homologação local, não produção. F8 não aplicou configuração de servidor ou proxy.

As linhas de auditoria abaixo preservam o panorama do Registro 0037; lacunas da F1 foram atualizadas pelos Registros 0038–0039 e pela seção F1 vigente.

| Área | Estado em 2026-10-04 | Resumo |
|---|---|---|
| Restaurante | Parcial, branch limpa `codex/setup-workflow`, HEAD `f837268222b351145116690c6cee7649b9a09c78` | F1 implementada; fluxo de identidade, administração e produção seguem em fases posteriores. |
| Motoboy | Parcial, branch limpa `codex/setup-workflow`, HEAD `f1ac938ca2fde6150e5f24b94b8125d466e19e24` | F1 implementada; identidade visual/operacional e fluxos restantes seguem em fases posteriores. |
| PostgreSQL oficial | Parcial, PostgreSQL 18.6 em `127.0.0.1:5432`, banco `rotamoto` | Migrations 0001–0010 aplicadas; modelo de domínio continua em `domain_records` JSONB com novas garantias para Route/Earning. |
| API/backend | Parcial, loopback | Identidade e sync HTTP existem; autorização/session/CSRF e role split foram testados. Falta administração operacional completa, frontend de identidade, processamento durável de integrações e operação de produção. |
| Contrato | F1 concluída | `CONTRACT.md` e `contract.js` byte a byte idênticos nos apps; schemas v1 fecham as entidades do escopo F1 e regras Route/Earning/mídia. |
| QA final | Pendente | CDP existe, mas QA end-to-end integrado deve ocorrer após fechamento dos fluxos e depende de runtime Chromium/Termux estável. |

## Matriz de dados: IndexedDB ↔ PostgreSQL ↔ contrato/API

| Entidade/conceito | Restaurante IndexedDB | Motoboy IndexedDB | PostgreSQL/API e contrato | Estado e trabalho pendente |
|---|---|---|---|---|
| Company/tenant | `companies`, perfis/configuração e identificadores legados | tenant/configuração local em `meta`/sync state | `companies`, memberships, sessão; tenant derivado no servidor | Parcial/legado. Mapear onboarding dos IDs locais para tenant canônico sem associar tenant por payload. |
| User/Driver | `users`, `profiles`, cadastro local de bikes/driver | perfil/configuração local | `users`, `credentials`, `memberships`, roles/permissions; Driver em `domain_records` conforme contrato | Parcial. Separar identidade, membership, cadastro administrativo de Driver e preferências/execução locais; fluxo de membros e gestão não tem UI/API completa. |
| Order | `orders` | não há store de pedidos dedicado; dados chegam em cache/projeções da entrega | `domain_records(Order)`; escrita autoritativa Restaurante | Parcial. Especificar projeção mínima e ligação segura da Order canônica na experiência Motoboy; preservar dados comerciais. |
| Delivery | `deliveries` e projeções relacionadas | `deliveries` mais `races` como projeção operacional | `domain_records(Delivery)` com revisão, ownership por campo e transições | Parcial. Diferenças de modelos e campos locais exigem mapeamento/versionamento; não há LWW. `races` é derivado/local. |
| Route | `routes` e planejamento | sem store canônico próprio; rota recebida é cacheada | `domain_records(Route)`, escrita/plano Restaurante | A auditoria inicial dizia “não definida”; fechada no Registro 0039 por `Route.deliveryIds`, sem campo inverso. |
| DeliveryEvent | `deliveryEvents`/`events` | `deliveryEvents` | `domain_records`, append-only, imutável e idempotente por `eventId` | Completo no contrato/sync; verificar mapeamentos legados e visualização/consulta operacional na fase de fluxo/QA. |
| LocationPoint | `locations` | `locations` | `domain_records`, escrita Motoboy e leitura Restaurante | Parcial operacional. Política de retenção/privacidade, volume e consulta agregada ainda precisam definição antes de produção. |
| DeliveryProof | `proofs` | `proofs` | `domain_records`, escrita Motoboy e leitura Restaurante | Parcial. Contrato de metadados existe; armazenamento/limites de binários, política de retenção e exportação operacional precisam fechar antes de produção. |
| Earning | `earnings` calculado pelo Restaurante | `earnings` para consulta/projeção | `domain_records(Earning)`, autoritativo Restaurante; Motoboy não escreve | Completo quanto à autoridade; reconciliação de dados históricos/legados e regra financeira auditável continuam trabalho local. |
| IDs, versões, tombstones | `meta`, `outbox`, `inbox`, `tombstones`, `syncState` | stores equivalentes | `local_id_maps`, `sync_inbox/outbox`, `sync_installations`, revisões e tombstones | Parcial. Migração de IDs legados e retenção entre reinstalações ainda precisam política/testes de recuperação. Protocolo/ACK/retry/pull já concluídos em 0035–0036. |
| Configuração | settings em `meta`/estado da app | settings em `meta` | integração/configuração server-side parcial; sem secrets no cliente | Parcial. Separar preferências locais de configuração tenant e segredos de provider. |
| Backup/import | export/import local em ambos, com formatos próprios | JSON/local backup e compatibilidade localStorage antiga | sem fluxo completo tenant-scoped de backup/restore canônico | Parcial/legado. Planejar formato versionado, validação, preview, merge, auditoria e recuperação sem sobregravar sync pendente. |

### Estruturas IndexedDB observadas estaticamente

- **Restaurante:** DB `rota-moto-restaurante-local-v30`, `DB_VERSION=4`; stores `meta`, `companies`, `orders`, `deliveries`, `bikes`, `routes`, `events`, `deliveryEvents`, `locations`, `proofs`, `earnings`, `outbox`, `inbox`, `tombstones`, `syncState`, `logs`, `profiles`, `users`. Chaves primárias existem; poucos índices de consulta são criados. Migração é concentrada em normalização/upgrade, sem catálogo explícito de migrações de domínio.
- **Motoboy:** DB `RotaMotoDB`, `DB_VERSION=5`; stores `meta`, `races`, `deliveries`, `deliveryEvents`, `locations`, `proofs`, `earnings`, `outbox`, `inbox`, `tombstones`, `syncState`. Índices observados em `races` para status/createdAt; dados/configuração adicional em `meta`. Compatibilidade legado inclui `rotaMoto.backup`/`motoboy.db.v2` em localStorage.
- **Lacuna comum:** nomes, campos e índices não formam ainda uma matriz versionada única com o contrato. Planejar inventário de campos, migrações idempotentes e fixtures de dados legados; manter os bancos separados e compatibilidade offline. A auditoria estática não prova conteúdo real dos perfis locais.

### PostgreSQL e evolução de schema

O catálogo consultado em modo read-only no Registro 0037 mostrava schema `public`, 20 tabelas, 50 índices e 258 constraints. Após a F1, migrations 0001–0010 estão aplicadas; roles e RLS permanecem conforme Registros 0030/0033. O runner preserva transação, advisory lock, checksums, detecção de migration ausente e rollback.

`companies`, identidade/RBAC, integrações, aliases e inbox/outbox têm tabelas relacionais. Os tipos de domínio compartilhado, exceto Company, residem em `domain_records` com JSONB, UUID canônico, tenant, revisão, timestamps e tombstone; há integridade genérica/tenant e trigger de imutabilidade para eventos, mas não colunas/FKs tipadas por entidade nem validação SQL de todos os payloads/estados. Isso é uma decisão deliberada do DEC-0005 até que o contrato de campos amadureça. Próxima evolução deve começar por matriz de payloads e invariantes, criando migrations aditivas apenas quando contrato e consultas justificarem; não alterar migrations aplicadas nem criar tabelas artificiais.

## Integrações de delivery

| Provider | Implementado no código | Simulação/parcial | Dependência/risco e próximo trabalho |
|---|---|---|---|
| iFood | Adaptador servidor com OAuth exchange/refresh, polling, ACK e operações de pedido/status; normalização e helper PKCE no cliente | “Laboratório” oferece simulação. Estado/polling/cache é em memória e temporizador local; não equivale a worker durável por tenant. | **Parcial + externo.** Sem prova de credenciais/merchant/sandbox ou execução contra provider nesta inspeção. Validar APIs e termos em documentação oficial, isolar adapter, persistir conexão/cursores, idempotência, retry/backoff/rate limit, health/auditoria. |
| 99Food | Adapter HTTP configurável, bearer auth, rotas de status/pedidos/ações e webhook com HMAC/timing-safe compare | Lab simula eventos; deduplicação é mapa limitado em memória, sem fila durável/normalização persistida demonstrada; polling não está implementado. | **Parcial + externo.** Assinatura/endpoints precisam confirmação oficial. Implementar fila durável e idempotência depois da especificação oficial; credenciais e conta de parceiro são externas. |
| Keeta | Adapter com OAuth/token refresh em memória, polling/ACK, ações e webhook | Lab simula. Webhook usa cálculo próprio de assinatura e dedup temporária; host/rotas por default não foram validados contra material oficial. | **Parcial + externo.** Verificar host, protocolo, assinatura e capacidades em documentação oficial antes de integração real; depois adapter isolado, fila, cursor, retry e status. |

Para todos: criar fronteira de provider/adapters e configuração tenant-scoped sem enviar secrets ao browser; segredo via vault/KMS quando disponível; normalizar evento/pedido para casos de uso; persistir webhook inbox e dedup; processar com worker durável; aplicar timeout, retry com backoff/jitter, rate limits, circuit/health e auditoria sem payload/token. Não presumir endpoints, assinatura, polling ou autorização externa ainda não documentados. “Código existe” não significa integração homologada ou credencial ativa.

## Identidade, telas e fluxos

### Backend disponível

O backend de identidade oferece login/logout/sessão atual, tenant selection, recuperação/consumo, aceitação de convite/verificação e provisionamento administrativo protegido por adapter fail-closed. Sessões opacas, cookie seguro, CSRF, expiração/revogação, RBAC e RLS existem. Sync restaura sessão e opera quando já há sessão. Não há signup público. Operador real/primeiro owner e MFA operacional seguem fail-closed.

### Lacunas exatas de produto

- **Restaurante:** falta tela/rota de login ligada à API, logout visível, sessão expirada/renovação, seleção de empresa, recuperação de conta, confirmação de convite/verificação, loading/erro/offline de identidade e bootstrap pós-login. Administração atual de `users`/`profiles` é local e permissões são UX, não gestão server-side de membership/role. Settings de integração não provisionam conexão externa segura.
- **Motoboy:** não há telas de login/logout/recuperação/convite/verificação/seleção de empresa; perfil/cadastro/configuração do motorista é local. Falta mostrar conta bloqueada/sessão expirada, permissões, sincronização pós-login e distinção de perfil administrativo versus dados de execução.
- **Ambos:** UI ainda não expõe claramente estado de sync (pendentes, rejeitados, conflitos, último êxito, offline) apesar do estado interno; não há fluxo de resolução humana para conflito canônico. Feedback/estados existentes são mistos com toasts/estados locais e precisam ser mapeados por fluxo.
- **MFA:** schema exige MFA para owner, mas challenge/enrollment/recovery operacional não está implementado. Não contornar o fail-closed. Login visual pode avançar com fluxo de sessão que respeite erro “MFA indisponível”; ativação real depende de KMS/segredo e decisão operacional.

## Inventário estático de UX/arquitetura

- Restaurante organiza painel, pedidos, motos, rotas, relatórios, eventos, configurações, laboratório de integração e administração em `app.js`; renderização e parte das regras ainda são monolíticas. Há estados vazios/toasts e diálogos; CSS responsivo existente deve ser preservado e auditado em navegador só na fase final.
- Motoboy organiza início/corridas, rotas, ganhos e configurações em `app.js`; projeção `races` não é entidade canônica. GPS/localização, prova e eventos são operações locais. Manifest/service worker mantêm recursos offline; consistência de versão do branding/cache precisa ser revisada. Sem inspeção visual nesta execução.
- A separação desejada UI → aplicação/use cases → domínio → repositories/adapters → IndexedDB/HTTP → backend/PostgreSQL/providers existe parcialmente: backend já separa handler/serviço e clientes têm transporte/reconciliação separados, mas a UI e regras antigas continuam concentradas em arquivos grandes.
- Backup local existe, mas formatos/migrações, mídia, retenção e troca entre versão antiga/nova precisam matriz de compatibilidade. Service worker cacheia app; não há worker de sync de fundo, e o desenho deve continuar limitado por sessão/CSRF e APIs de browser.
- Acessibilidade e responsividade são incompletas até medição automatizada/manual final: teclado/foco, labels/erros, dialogs, contrastes, tamanhos de toque, viewport estreito e tabelas/mapas.

## Macrofases de finalização

As fases são incrementais; uma dependência externa bloqueia somente a capacidade que a exige. Trabalhos independentes locais devem continuar. Browser QA deliberadamente fica no checkpoint F9.

### F1 — Modelo de dados definitivo e evolução Local-First

- **Estado:** Implementação concluída. Classificação: B — implementação concluída / Browser QA pendente para F9. F1.1 foi fechada no Registro 0038; F1.2 no Registro 0039. O sync/reconciliação dos Registros 0034–0036 foi preservado.
- **Checklist desta fase:**
  - [x] F1.1: matriz entidade/campo e authority entre contrato, ambos IndexedDBs, PostgreSQL/API e sync.
  - [x] Auditar as stores, versões e caminhos de upgrade dos dois IndexedDBs; implementar registry incremental e índices seguros sem regravar dados.
  - [x] Revisar migrations 0001–0008 e schema instalado em read-only; manter JSONB quando ainda não há ganho concreto para normalização.
  - [x] Classificar dados sensíveis e explicitar retenções confirmadas versus políticas pendentes.
  - [x] Fechar schemas canônicos e constraints seguras por entidade.
  - [x] Fechar Route→Delivery, moeda segura do Earning, modelo de prova/mídia e backup/restore sem sobrescrita.
  - [x] Aplicar e testar constraints PostgreSQL aditivas 0009–0010; manter o registry IndexedDB 0038 sem bump desnecessário.
- **Concluído no Registro 0038:** matriz versionada em `MODELO_DADOS.md` cobrindo domínio, identidade, sync e segurança; authority, stores, PG/API/sync, IDs/revisões/relações/constraints, offline, legado, sensibilidade e retenção; revisão read-only migrations 0001–0008/schema instalado; decisão de manter JSONB onde campos completos não estão definidos; registry IndexedDB com versão final Restaurante 4→6 e Motoboy 5→7, índices não únicos, marker e upgrade abortável sem regravar registros.
- **Concluído no Registro 0039:** schemas compartilhados, Route→Delivery, Earning em unidades monetárias inteiras, referência de mídia, migrations PostgreSQL 0009–0010, backup v1 integral e merge seguro. F1 não depende de decisão externa para sua conclusão estrutural.
- **Limites não bloqueantes:** blob storage real e backup cifrado dependem de provider e decisão segura de chave/UX. Retenção legal/operacional de GPS, PII, foto/assinatura e audit depende de política aprovada. Bikes e users/profiles continuam estruturas locais sem migração conceitual inventada.
- **Componentes:** `CONTRACT.md`, `contract.js`, `DECISOES.md` DEC-0005/0006; Restaurante `app.js`/`backup-format.js` e stores `rota-moto-restaurante-local-v30`; Motoboy `app.js`/`backup-format.js` e DB `RotaMotoDB`; migrations Restaurante `backend/postgres/migrations/0001–0013`; `backend/domain/sync-service.js` e `media-storage.js`.
- **Dependências:** nenhum bloqueio externo impede fechar o schema v1; validação real do IndexedDB segue em F9.
- **Bloqueios externos:** blob storage cifrado, export cifrado e política de retenção dependem de infraestrutura/decisão próprias, sem bloquear F1.
- **Conclusão objetiva:** modelo estrutural v1 implementado; PostgreSQL mantém JSONB com constraints/índices somente onde há ganho concreto, preservando RLS/FORCE e roles. Browser QA real foi adiado para F9 e não mantém F1 aberta.
- **Testes:** ver Registro 0039: schemas/backup, integração PostgreSQL, suites finais dos dois apps, checks de sintaxe e diff. Sem Browser QA nesta etapa.
- **Browser QA:** não para schema; sim em F9 para upgrade/recovery nos clientes reais.

### F2 — Backend/API e operação de domínio

- **Estado:** **Concluída para as operações internas v1 definidas** no Registro 0040. A implementação usa HTTP → application/use cases → domain services → repositories → PostgreSQL. F1 não foi reaberta.
- **Concluído:** inventário versionado em `rota-moto-restaurante/docs/API-v1.md`; identidade/sessão existente; health liveness/readiness com conexão curta e runtime `rotamoto_app`; leitura tenant-scoped de Order, Delivery, Route, Driver, DeliveryEvent, LocationPoint, DeliveryProof e Earning; leituras administrativas de Company, Membership, Role/Permission e estado/metadados não secretos de Integration/ExternalAccount. Filtros são allowlisted/parametrizados, paginação keyset, UUIDs e cursor validados, sessão duplicada rejeitada. Escritas operacionais continuam nos use cases de sync/outbox/inbox com ACK por operação, sem CRUD HTTP paralelo.
- **Segurança:** tenant vem de sessão/identity context e RLS; RBAC por permission key; `companyId` em query rejeitado; memberships e integrações são protegidos por permissão; external account não expõe `secret_ref`; sem novo endpoint público. Erros padronizam code/message/requestId; logs estruturados guardam método/path/status/duração/error code sem payload; readiness sanitiza falhas; rate limit por IP/endpoint. `ALLOWED_ORIGIN` governa preflight/POST e credenciais/CSRF são permitidos só para a origem configurada. `rotamoto_app` segue sem DDL e ganhou somente SELECT em duas tabelas tenant-scoped.
- **Migration:** `0011_runtime_integration_read`, up/down versionados e aplicada pelo `rotamoto_migrator`; sem alteração de 0001–0010. Verificadas leituras, ausência de escrita e RLS/FORCE já vigente.
- **Ainda fora da F2:** mutações administrativas de memberships/roles e convite genérico dependem da semântica de lifecycle/RBAC que será fechada em F3; provisionamento segue sem adapter operacional e fail-closed. Nenhuma dessas rotas foi improvisada. Provider real, TLS/domínio e deploy seguem F4/F8.
- **Testes:** `npm test` Restaurante e `npm run test:postgres` no PostgreSQL oficial passaram; após CORS, `npm test`, `test-server-security.js`, `test-domain-sync-postgres.js` e `test-identity-http-postgres.js` passaram. Cobertura inclui autorização, tenant, IDs/cursor, cookies, readiness, grants/rollback, preflight e origens aceitas/negadas; `node --check` e `git diff --check`. Sem Browser QA.
- **Critério:** rotas internas definidas, cases desacoplados, isolamento/RBAC, validação/erros/logs, readiness, migration/grants, docs e testes dirigidos satisfeitos. Cliente/browser continua para F3/F5/F6/F9.

### F3 — Identidade, login e RBAC nos dois clientes

- **Estado:** Implementação local extensa; **PARCIAL** apenas para capacidades externas/operacionais identificadas abaixo. APIs administrativas de lifecycle e clientes de conta existem nos dois apps.
- **Concluído no Registro 0041:** lifecycle User/Membership/Role/Permission com grants limitados, convite autorizado, bloqueio de self-escalation e proteção transacional do último owner válido; auditoria; Migration 0012; login/logout/restauração/expiração/recuperação/convite/troca de tenant; gate de áreas autenticadas e modo offline local claramente separado; UI administrativa do Restaurante; fluxo focado de login/conta Motoboy; MFA challenge fail-closed e nenhuma credencial/session/CSRF persistida no storage local.
- **API:** `POST /api/admin/roles`, `PATCH /api/admin/roles/:roleId`, `PATCH /api/admin/memberships/:membershipId`, `POST /api/identity/invitations`, além das rotas identity/session existentes. Toda mutação verifica sessão, CSRF, tenant derivado server-side, permission subset, MFA quando exigido e auditoria. Não há signup público.
- **Lacunas locais fechadas:** mascaramento de endpoints POST por rota GET, convite que ignorava marker MFA, falta de controle da membership suspend/re-role, falha em impedir rebaixamento do último owner, ausência de integração de sessão nos clientes, caminhos duplicados/quebrados de assets no Motoboy e campo de formulário oculto ainda visível pelo CSS.
- **Bloqueios externos reais:** primeiro owner exige operador/ato auditável; MFA enrollment/verificação real exige adapter seguro para chave/verificador (KMS/secret store ou política aprovada); entrega de convite/recovery exige provider de email e domínio. Sem esses elementos as capacidades permanecem fail-closed, sem tokens de convite/recovery expostos por API de produção.
- **Componentes:** Restaurante `backend/admin/*`, `backend/identity/*`, `backend/postgres/migrations/0012*`, `identity-ui.*`, `app.js`, `sync-client.js`; Motoboy `identity-ui.*`, `app.js`, `sync-client.js`, `index.html`, `sw.js`; API descrita em `docs/API-v1.md`.
- **Critério:** lifecycle/admin local, sessões e UI existentes, tenant/RBAC server-side, auditoria, testes direcionados e migration aplicada. Browser QA/cookies/redirects/responsividade completa continua no checkpoint F9, sem reabrir implementação por isso.
- **Testes:** `npm test` dos dois apps, `npm run test:postgres` no Restaurante via as roles oficiais, checagem de todos os JS alterados e `git diff --check`; detalhes em Registro 0041. Sem Browser QA.

### F4 — Integrações externas e arquitetura de providers

- **Estado:** **B — infraestrutura e implementação local concluídas; protocolos/contas externas bloqueados** (Registro 0046).
- **Classificação do código anterior:** iFood tinha handlers OAuth, polling, ACK e normalização plausíveis, mas sem teste/documentação oficial de versão no repositório; sua tela é laboratório sintético. 99Food tinha client bearer, rotas configuráveis e HMAC presumido, sem prova oficial. Keeta tinha host/caminhos/signatura assumidos e simulator. Nenhuma dessas implementações foi confirmada por conexão real, merchant, homologação ou credencial. Não contar mocks/fixtures como integração.
- **Concluído localmente:** registry comum bloqueado por padrão, catálogo administrativo tenant-scoped e sem segredos, classificação/sanitização de erro e política retryable; clientes 99Food/Keeta e serviços server-side falham fechado; rotas HTTP legadas dos três providers retornam `503 PROVIDER_BLOCKED_EXTERNAL`; polling em background removido; configuração visual separa origem local de conexão externa e não oferece connect/reconnect falso; o laboratório iFood mantém simulações exclusivamente em memória e fora de Orders/IndexedDB; nenhuma normalização sintética é tratada como contrato.
- **Componentes:** Restaurante `backend/integrations/registry.js`, `backend/admin/repository.js`, `server.js`, `99food-service.js`, `keeta-service.js`, três clientes UI, `app.js`, `identity-ui.js`, `docs/API-v1.md`, `README-IFOOD.md` e testes de integração/segurança.
- **Modelo atual:** `integrations`/`external_accounts` existentes mantêm tenant isolation e RLS/FORCE; runtime conserva somente leitura. `GET /api/admin/integrations` exige sessão e `integrations.manage`; `secret_ref`, payloads e tokens não saem da API. Uma linha `active`/conta confirmada não significa conexão verificada. Sem migration: não habilitamos eventos externos e não há base segura para grant runtime/esquema de inbox provider antes de definir autenticação e retenção de payload potencialmente pessoal.
- **Pipeline canônico:** a fronteira documentada é adapter verificado → serviço tenant-scoped → mapping aprovado → caso de uso canônico Order/Delivery → idempotência persistente/sync. Pedido externo ainda não é aceito. Até existir documentação, autenticidade verificável, external ID estável e mapping aprovado, o pipeline falha fechado e não grava payload bruto nem cria pedido; conflitos com edição local deverão exigir revisão explícita.
- **Bloqueios externos reais por provider:** iFood requer documentação/protocolo oficial aplicável, conta/merchant, credenciais e homologação; 99Food requer documentação oficial/parceria, credenciais e homologação; Keeta requer documentação oficial da versão/protocolo, conta e credenciais/homologação. Produção também requer secret manager/KMS e execução segura de worker/webhook. Não há provider funcional declarado.
- **Próximas tarefas externas:** quando materiais oficiais e credenciais chegarem, validar um provider de cada vez, implementar adapter real, webhook autenticado, fila persistente/idempotente, mapping canônico, health/audit/retry e controles tenant/RBAC/MFA; então habilitar mutação segura de Integration/ExternalAccount e UI de connect/disable/reconnect. Não configurar endpoints, assinaturas ou campos por inferência.
- **Testes:** testes focados do registry/catalog, ausência de segredo, bloqueio client/service, respostas HTTP 503, CORS/health readiness, isolamento do laboratório, sintaxe e diff; sem migration, Browser QA ou suite ampla.
- **Browser QA:** pendente somente em F9 para interface e integração com o restante do produto; não é parte do bloqueio externo de protocolo.

### F5 — Fluxos completos do Restaurante

- **Estado:** **B — implementação concluída / Browser QA integrado pendente em F9** (Registro 0042). F1/F2/F3 continuam fechadas; nenhum outro macrobloco foi iniciado.
- **Concluído:** ciclo local de Order/Delivery; validação de criação/edição; projeções transacionais de Order+Delivery+Earning; atribuição com `driverId`/`assignedAt` e estados permitidos; cancelamento administrativo sem exclusão física; pedido de reentrega auditado para transições `DELIVERED|FAILED|RETURNED → REDELIVERY → ASSIGNED`; o backend também projeta `DELIVERY_RETURNED` para `RETURNED`; fatos/provas recebidos são visíveis no detalhe; edição explícita de Route por `deliveryIds`, com ordenação, exclusividade visual e preservação de paradas históricas; Driver editável como cadastro sem edição manual de GPS/presença; relatório de repasse usa `amountMinor`; KPIs de conclusão usam horário de conclusão; export/import existente exibe que JSON é plaintext e mantém merge sem sobrescrita; pedido/Driver/Delivery/Route são enviados como projeções canônicas restritas; falha de geocoding não bloqueia construir pacote sync.
- **Correções de causa raiz:** sincronização de uma edição de Order não rebaixa Delivery em execução a `ASSIGNED`; Delivery sem ID recebe ID estável antes de salvar; edição de perfil não permite status canônico de execução; pedido não é removido fisicamente ao cancelar; serviço de sync aceita/audita reentrega somente depois de estado terminal permitido.
- **Componentes:** Restaurante `app.js`, `restaurant-operations.js`, `backend/domain/sync-service.js`, `index.html`, `styles.css`; stores orders/deliveries/bikes/routes/deliveryEvents/proofs/earnings e transporte/reconciler existente.
- **Dependências:** F1/F2/F3 concluídas. Provider F4 só bloqueia entrada real de pedidos externos; não bloqueia fluxo operacional manual/local.
- **Bloqueios externos/validação:** Browser QA de UI/IndexedDB e fluxo real integrado fica em F9, conforme escopo. Provider/contas para pedidos externos continuam F4. Nenhuma dessas dependências mantém a implementação F5 aberta.
- **Testes:** `npm test`; `npm run test:sync`; integração dirigida `tests/test-domain-sync-postgres.js` contra o PostgreSQL oficial para rejeição de reentrega prematura, falha/retorno, reentrega autorizada, reatribuição, auditoria via permissão de insert e rollback/limpeza; syntax checks e `git diff --check`.
- **Browser QA:** reservado a F9; não executado em F5.

### F6 — Fluxos completos do Motoboy

- **Estado:** **B — implementação concluída / Browser QA pendente para F9** (Registro 0044 resolveu o último bloqueio de autorização individual). Ciclo de execução, estados/eventos, operação offline, GPS local, assinatura local, reconciliação, Route/Earning de leitura, PWA e enforcement server-side estão implementados; não reabre F1–F5.
- **Concluído:** aceitar/coletar/sair/chegar/finalizar/falhar/retornar segundo contrato; motivos para falha/retorno; ACK e retry permanecem por fato; atualização de telas após pull; Route.deliveryIds dirige ordenação; Earnings vêm somente do Restaurante; tentativas anteriores são arquivadas antes da reentrega; sync expõe pendências, rejeições, conflitos e provas locais; respostas `/api/` não entram no cache offline.
- **Autorização fechada:** migration `0013_membership_driver_binding` liga Membership a um Driver canônico da mesma empresa por FK composta e unicidade; API `PUT/DELETE /api/admin/memberships/{membershipId}/driver` requer RBAC, CSRF e MFA, valida membership/permissions/tenant, audita link/unlink e não infere identidade. A sessão passa a resolver `driverId` no servidor.
- **Isolamento Motoboy:** instalação, push e pull exigem Driver da sessão. Pull e leituras de domínio de usuários sem permissão administrativa são limitadas às entregas atribuídas; Order/eventos/localização/provas/earnings e rotas são escopados. DeliveryEvent/LocationPoint/DeliveryProof são verificados sob lock da Delivery. `source.app`, `actor` e `driverId` do pacote não concedem autorização. Idempotência/revisões permanecem.
- **Reatribuição:** fatos já aceitos não são removidos; fatos offline do executor anterior recebem `DRIVER_NOT_ASSIGNED`, permanecem como conflito local e deixam de repetir automaticamente sem mudança. O backend direciona `CANONICAL_ASSIGNMENT_REVOKED` minimal ao Driver anterior. Motoboy encerra sua projeção local e desativa ações sem apagar fatos/outbox. A nova atribuição permanece sob autoridade Restaurante.
- **Componentes:** Motoboy `app.js`, `execution-workflow.js`, `sync-reconciliation.js`, Service Worker/assets e testes; Restaurante `backend/admin/*`, `backend/identity/*`, `backend/domain/{sync,query}-*`, migration `0013_membership_driver_binding`, testes e `docs/API-v1.md`; `CONTRACT.md` idêntico nos dois repositórios.
- **Testes:** Motoboy `node tests/test-execution-workflow.js`, `node tests/test-sync-reconciliation.js`, `node --check` dos JS alterados e `git diff --check`; Restaurante `tests/test-postgres-migrations.js` e `tests/test-domain-sync-postgres.js` no PostgreSQL oficial via runtime `rotamoto_app`/migrator `rotamoto_migrator`. Fixtures tenant-scoped foram revertidas. Sem Browser QA ou suite ampla.
- **Capacidades externas/validação:** provider de blobs para envio real de DeliveryProof; permissão/hardware físicos para GPS/câmera; Browser QA integrado reservado a F9. Nenhum deles mantém a implementação da F6 parcial.
- **Conclusão:** F6 classificada **B — implementação concluída / Browser QA pendente para F9**. Não iniciar F4/F7/F8/F9 nesta execução.

### F7 — UI/UX, configurações, acessibilidade e responsividade

- **Estado:** **B — implementação concluída / Browser QA pendente para F9** (Registro 0045). Revisão estática e consolidação nos dois aplicativos, sem reabrir F1–F6.
- **Concluído:** conta/sessão integrada ao header, diálogos com foco, Escape/Tab e fundo inerte; associação Membership↔Driver administrável visualmente no Restaurante usando APIs existentes; labels de busca/filtros, semântica correta de navegação versus filtros; feedback de toast acessível; layout de header/dialog/nav considera safe areas e teclado virtual; tokens de foco/radius reunidos e regras CSS comprovadamente duplicadas/ineficazes removidas; contraste do token verde Motoboy melhorado sem trocar a identidade visual; telas de configurações identificam o escopo local e distinguem estimativas de ganhos canônicos.
- **Componentes:** `app.js`, `index.html`, `identity-ui.js`, `identity-ui.css`, `styles.css` e testes estáticos de UI em ambos os apps.
- **Dependências:** F3–F6 estabilizadas; nenhuma dependência de serviço externo para as alterações implementadas.
- **Bloqueios externos:** nenhum para implementação local. Validação com navegador/renderização, leitores de tela e hardware real está deliberadamente reservada para F9.
- **Conclusão objetiva:** implementação e suítes locais passam; sem Browser QA não se declara verificado o layout renderizado em desktop/tablet/mobile nem a interação em dispositivo físico.
- **Testes:** `npm test` em ambos os apps; testes direcionados de identidade/navegação e sincronização estática; `node --check` dos JS e testes alterados; `git diff --check`.
- **Browser QA:** não nesta execução; obrigatório em F9.

### F8 — Instalação, deploy, segurança e operação

- **Estado:** **B — preparação operacional local concluída com implantação e ensaios externos pendentes** (Registro 0047). O ambiente Termux/PostgreSQL/nginx não é declarado produção.
- **Concluído localmente:** modos development/test/production; defaults somente fora de produção; produção exige DATABASE_URL de `rotamoto_app` sem senha e com TLS `verify-full`, CA e secret-provider externo, origins HTTPS, Host allowlist e proxy IP allowlist; listener loopback; não confia X-Forwarded-Proto; cliente encaminhado só é lido de peer confiável e para rate limit. Segurança HTTP/CSP/HSTS, body/time limits, pool/timeouts, readiness de schema e startup fail-closed; nenhuma migration no startup.
- **Lifecycle/observabilidade:** request IDs e logs JSON sem body/credenciais; readiness verifica role e objetos das migrations 0005/0008/0012/0013; SIGTERM/SIGINT fecham listener, drenam conexões até timeout e fecham pool; erros de bootstrap saem sanitizados. Rate limit local é por processo, complementado pelo limite por IP do proxy de exemplo.
- **Deploy/proxy:** exemplo versionado `docs/operations/nginx-api.conf.example`, nunca instalado; sequência de deploy e rollback proíbe rollback destrutivo automático, exige migration status separado, artefato compatível e readiness.
- **Backup/restore:** runbook PostgreSQL cobre dump custom, TOC/checksum, RLS/roles, restore isolado e validação; IndexedDB documenta backup v1 plaintext sensível, merge não sobrescrevente e recuperação sem apagar DB. Procedimento não foi executado: falta alvo isolado de restore e política/RPO/RTO aprovados.
- **PWA:** Motoboy usa cache de shell versionado, cache-first apenas para URLs exatas de assets same-origin, API nunca é interceptada/cacheada, atualização espera abas anteriores fecharem e não apaga IndexedDB. Restaurante não tem service worker próprio no checkout auditado.
- **Componentes:** Restaurante `backend/runtime/*`, `server.js`, handlers HTTP, `.env.example`, `.node-version`, docs de operação e testes runtime; Motoboy `service-worker.js` e teste do contrato PWA.
- **PostgreSQL/migrations:** nenhuma migration criada/aplicada. `migrate.js status` read-only como `rotamoto_migrator` confirmou 0001–0013; readiness/smoke `rotamoto_app` passou. Role split/RLS/FORCE/grants ficaram intactos.
- **Bloqueios externos reais:** domínio/certificado/TLS, host e PostgreSQL de produção, módulo real de secrets/KMS e CA, email/MFA operational providers, canal de distribuição/operadores, política de retenção/RPO/RTO e alvo isolado para ensaio de restore. Nenhum provider foi fingido.
- **Testes:** `npm test` nos dois apps passou; testes dirigidos de configuração fail-closed, proxy/Host/security headers/CORS/health/readiness contra PostgreSQL oficial, shutdown, documentação/runbooks e service worker passaram; migration status; `node --check` e `git diff --check`. Aviso conhecido: `pg` 8.23.1 avisa que seu suporte pgpass será removido em pg 9; credencial existente não foi lida nem alterada.
- **Classificação:** F8 **B — implementação operacional local concluída com dependências externas isoladas**; não houve deploy, backup/restore real, nginx -t ou Browser QA.
- **Browser QA:** reservado para F9 após ambiente de staging aprovado; não executado.

### F9 — QA integrado e hardening final

- **Estado:** Pendente intencionalmente; infraestrutura CDP foi criada no Registro 0021 e usada antes, mas nenhum QA nesta revisão.
- **Lacunas/tarefas:** roteiro de ponta a ponta por app e roles; desktop/tablet/mobile; sync multi-app; offline/reconnect/reload/conflitos; provider fake/real separado; acessibilidade; HTTP/console; backup/upgrade; evidências e correção de regressões.
- **Componentes:** `~/projetos/browser-tests/run-qa-infra.sh`, app servidores, testes automatizados e checklist deste plano.
- **Dependências:** F1–F8 em estado fechável; dados sintéticos isolados/limpos; Chromium/Termux vivo.
- **Bloqueios externos reais:** Chromium pode sofrer limitações GPU/processo no Termux/Android; permissões físicas e integrações reais dependem de hardware/contas. Continuar testes automatizados e registrar limitações.
- **Conclusão objetiva:** critérios de fluxos passam nos dois apps em desktop/tablet/mobile; sem erros JS/HTTP inesperados; sync/DB consistente; baseline/main preservadas; evidências anexadas ao histórico.
- **Testes:** `npm test` nos dois apps, `npm run test:postgres`, checks de sintaxe/diff, CDP dirigido a fluxos e acessibilidade.
- **Browser QA:** sim; é o objetivo desta fase.

## Ordem definitiva recomendada

1. **F1 — Modelo definitivo:** implementação concluída no Registro 0039; Browser QA/IndexedDB real fica em F9.
2. **F2 — Backend/API:** concluída no Registro 0040 para operações internas v1; não duplicar sync nem reimplementar API read.
3. **F3 — Identidade/login/RBAC:** implementação local concluída no Registro 0041; external owner/MFA/email fail-closed e Browser QA fica para F9.
4. **F5 — Restaurante:** implementação fechada no Registro 0042; Browser QA fica em F9. **F6 — Motoboy:** implementação fechada no Registro 0044; Browser QA fica em F9.
5. **F4 — Providers:** preparar adapters/fakes localmente; validar integrações reais quando docs, conta e credenciais existirem.
6. **F7 — UX/configurações/acessibilidade/responsividade:** implementação estática fechada no Registro 0045; validar layout renderizado em F9.
7. **F8 — Deploy, secrets, observabilidade, backup/restore, atualização e hardening operacional.**
8. **F9 — QA end-to-end e regressão final**, depois das fases anteriores.

### Próximo bloco recomendado

F1/F2 estão concluídas; F3 mantém dependências externas registradas; F4 local concluída com providers bloqueados externamente; F5/F6 estão implementadas; F7 está implementada estaticamente; F8 está preparada localmente, sem rollout/restore de produção. **Próxima fase: F9**, QA integrado/hardening, ainda não iniciada e dependente de ambiente/Chromium e capacidades físicas/externas conforme cada fluxo.

## Bloqueios externos reais versus trabalho local

**Bloqueios externos reais:** primeiro owner exige operador/prova de autoridade; MFA de owner exige armazenamento seguro de segredo/KMS ou decisão operacional equivalente; convite/recovery por email exige provider/domínio; APIs reais exigem documentação oficial, conta/merchant/sandbox e credenciais de cada fornecedor; deploy exige domínio/TLS, host e operação; QA final pode sofrer encerramento de Chromium/GPU pelo Termux; avaliação de GPS/câmera requer dispositivo/permissões reais; regras de retenção de geolocalização/provas podem exigir decisão de produto/privacidade.

**Trabalho que pode avançar agora:** UI cliente de identidade usando APIs/fakes sem permitir login inseguro; gestão administrativa server-side protegida/fail-closed; fluxos locais do Restaurante/Motoboy; feedback de sync e conflitos; adapters e filas testadas com fakes; logging/health e runbooks; acessibilidade estática e testes automatizados. O modelo canônico v1, migrations IndexedDB base e backup local versionado foram concluídos na F1. Nenhum bloqueio externo justifica interromper estes blocos independentes.

## Proteções de execução

Todos os trabalhos seguintes continuam em `codex/setup-workflow` nos dois apps; não alterar `main`, tags ou baselines, não fazer push. Migrations novas são aditivas e executadas por `rotamoto_migrator`; API usa somente `rotamoto_app`; dados de teste são sintéticos e revertidos. Não ler/mostrar `.pgpass` nem transportar segredos. Não reimplementar o sync/reconciliação de 0034–0036; só alterar esses componentes se a matriz revelar lacuna reproduzível, com teste direcionado. Browser QA não faz parte da etapa de planejamento e fica para F9.

## Fontes principais

- Histórico: `ESTADO_ATUAL.md`, `PENDENCIAS.md`, `DECISOES.md`, `INDICE.md`, Registros 0027–0036 e registros anteriores indexados.
- Contrato: cópias `CONTRACT.md` e `contract.js` nos repositórios dos dois apps.
- Restaurante: `backend/postgres/migrations/0001–0008`, `backend/domain/sync-service.js`, `backend/identity/`, `server.js`, `app.js`, `ifood-integration.js`, `99food-*`, `keeta-*`, manifest/service worker e testes.
- Motoboy: `app.js`, sync transport/reconciliation, IndexedDB upgrade/normalizers, manifest/service worker, backup/import e testes.
- PostgreSQL oficial: catálogo read-only e status do migration runner em 2026-10-04, sem alteração de schema/dados/roles.
