# Plano mestre de finalização do RotaMoto

**Revisão:** 2026-10-04 · **Fonte de verdade:** este documento, reconciliado com DEC-0002 a DEC-0006, os Registros 0001–0039, os dois checkouts em `codex/setup-workflow`, o contrato sincronizado e o PostgreSQL oficial. **Estado:** F1 concluída como implementação (classificação B); Browser QA/IndexedDB real permanece em F9.

Este plano reúne trabalho já comprovado, lacunas encontradas no código e dependências externas reais. Não reabre o trabalho concluído nos Registros 0033–0036: role split, domínio canônico, ownership, ACK, transporte e reconciliação Local-First permanecem concluídos nos limites registrados. `main`, tags e baselines são referências protegidas.

## Legenda e limites da inspeção

- **Completo:** há implementação e evidência de teste/histórico para o escopo descrito.
- **Parcial:** existe implementação, mas faltam fluxo integrado, cobertura, operação ou semântica.
- **Ausente:** não localizado no código atual.
- **Derivado:** projeção/cache calculado a partir de dados canônicos ou eventos.
- **Legado:** estrutura mantida para compatibilidade/migração, sem autoridade canônica.
- **Externo:** requer fornecedor, domínio/HTTPS, credencial, decisão operacional ou ambiente fora dos repositórios.

A inspeção histórica do Registro 0037 foi estática; na conclusão F1 (Registro 0039), ambos `npm test` e o `npm run test:postgres` foram executados. Não se executou Browser QA. Migrations 0009–0010 foram aplicadas e validadas no PostgreSQL oficial pelo `rotamoto_migrator`, usando pgpass; status confirma 0001–0010 aplicadas. Nenhuma senha foi lida ou exibida.

## Estado atual verificável após o Registro 0039

- Restaurante: `codex/setup-workflow` @ `f837268222b351145116690c6cee7649b9a09c78`, árvore limpa; baseline tag peel `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` intacta.
- Motoboy: `codex/setup-workflow` @ `f1ac938ca2fde6150e5f24b94b8125d466e19e24`, árvore limpa; baseline tag peel `79c527b59d32d8b55236c62042acb868166ed4ad` intacta.
- `main` dos apps não foi alterada; nenhum push foi feito.
- PostgreSQL oficial: migrations 0001–0010 aplicadas; 0009 adiciona checks monetários e de Route, função de validação, índice GIN; 0010 concede somente EXECUTE para validação de constraint no runtime.

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
- **Componentes:** `CONTRACT.md`, `contract.js`, `DECISOES.md` DEC-0005/0006; Restaurante `app.js`/`backup-format.js` e stores `rota-moto-restaurante-local-v30`; Motoboy `app.js`/`backup-format.js` e DB `RotaMotoDB`; migrations Restaurante `backend/postgres/migrations/0001–0010`; `backend/domain/sync-service.js` e `media-storage.js`.
- **Dependências:** nenhum bloqueio externo impede fechar o schema v1; validação real do IndexedDB segue em F9.
- **Bloqueios externos:** blob storage cifrado, export cifrado e política de retenção dependem de infraestrutura/decisão próprias, sem bloquear F1.
- **Conclusão objetiva:** modelo estrutural v1 implementado; PostgreSQL mantém JSONB com constraints/índices somente onde há ganho concreto, preservando RLS/FORCE e roles. Browser QA real foi adiado para F9 e não mantém F1 aberta.
- **Testes:** ver Registro 0039: schemas/backup, integração PostgreSQL, suites finais dos dois apps, checks de sintaxe e diff. Sem Browser QA nesta etapa.
- **Browser QA:** não para schema; sim em F9 para upgrade/recovery nos clientes reais.

### F2 — Backend/API e operação de domínio

- **Estado:** Parcial; API loopback de identidade e sync push/pull existe, com handlers separados, mas a API não cobre todas as operações humanas/administrativas.
- **Lacunas/tarefas:** mapear casos de uso e endpoints restantes somente a partir do contrato; CRUD seguro de memberships/roles/conexões; limites e paginação; idempotência/auditoria por operação; health/readiness; worker/filas duráveis locais para providers; padronizar repositories e fronteira transacional sem refatoração ampla; rate-limit distribuído apenas se houver múltiplas instâncias.
- **Componentes:** Restaurante `server.js`, `backend/identity/http.js`, `backend/domain/sync-service.js`, serviços identity/domain, `backend/postgres/migrate.js`, migrations e testes API.
- **Dependências:** autorização e semantics de cada caso; identidade de operador para provisionamento. Não criar signup público.
- **Bloqueios externos:** operação de produção requer domínio/TLS e ambiente de execução gerenciado; local loopback não é produção.
- **Conclusão objetiva:** API cobre casos aprovados; tenant é sempre derivado da sessão; erros/logs não vazam dados; contratos e testes integração cobrem autorização/transação/duplicação.
- **Testes:** HTTP de autorização/CSRF, tenant, payload/limites, idempotência, falha/rollback, auditoria, shutdown/health e testes PostgreSQL direcionados.
- **Browser QA:** fluxo navegável será verificado em F9, não durante serviço headless.

### F3 — Identidade, login e RBAC nos dois clientes

- **Estado:** Backend parcial; interfaces de conta ausentes. Owner operacional e MFA fail-closed.
- **Lacunas/tarefas:** cliente compartilhado de sessão; telas login/logout/sessão expirada/tenant/recovery/invite/verification; estado de loading/erro/rede; pós-login restaurar sessão e disparar sync; tela de usuários/membership/permissões baseada em autorização; motorista administrativo distinto da execução; refresh/CSRF sem persistir secret em IndexedDB/localStorage.
- **Componentes:** `backend/identity/*`; Restaurante views/render em `app.js`, local `users/profiles`; Motoboy configurações em `app.js`; contrato/permissions.
- **Dependências:** API existe para subset. Modelar fluxos de invitation management e MFA conforme operações reais, sem bypass.
- **Bloqueios externos reais:** primeiro owner exige operador/prova auditável; MFA operacional requer storage de segredo seguro; email real requer provider/domínio. É possível implementar UI/client e testes fake antes disso mantendo login fail-closed.
- **Conclusão objetiva:** os dois apps têm fluxo de sessão testável; role/tenant vêm do servidor; conta sem MFA exigido funciona conforme política; owner permanece bloqueado quando MFA não configurado; logout revoga sessão server-side.
- **Testes:** unidade/HTTP, sessão expirada/revogada, CSRF, troca tenant, permissões e cliente com API fake; browser em F9.
- **Browser QA:** sim, obrigatório para navegação, cookie/redirects, loading/erro/mobile.

### F4 — Integrações externas e arquitetura de providers

- **Estado:** Parcial/simulada; existem adapters, mas nenhum provider foi homologado nesta revisão.
- **Lacunas/tarefas:** adapters isolados por plataforma; configuração por tenant; secrets fora do cliente; assinatura/webhook baseada em docs oficiais; durable inbox/dedup; normalização de Order/status; polling/cursor somente quando documentado; retry/backoff/rate limit; saúde/auditoria; credenciais rotativas; isolamento dos labs simulados.
- **Componentes:** Restaurante `ifood-integration.js`, `99food-integration.js`, `99food-service.js`, `keeta-integration.js`, `keeta-service.js`, `server.js`, settings/lab em `app.js`; backend integration tables.
- **Dependências:** docs oficiais, contas/merchant/sandbox, credenciais e aprovação de parceiro; KMS/secret store para produção.
- **Bloqueios externos reais:** nenhum teste real ou webhook de produção sem credenciais/contas e material oficial. Adapter/fakes e filas locais podem avançar sem eles.
- **Conclusão objetiva:** contrato/provider documentado por plataforma; fixtures success/error/signature/replay passam; conexão/health e status são visíveis; segredo nunca aparece em browser/log.
- **Testes:** fakes HTTP com timeout/5xx/401/rate-limit, assinatura inválida/replay, normalização/idempotência e isolamento tenant.
- **Browser QA:** sim para configuração/status e feedback quando UI integrar adapters.

### F5 — Fluxos completos do Restaurante

- **Estado:** Parcial; operações locais de pedidos, planejamento, atribuição, motos, rotas, relatórios e eventos existem; autoridade/sync com servidor ainda sem identidade UI.
- **Lacunas/tarefas:** mapear cada fluxo e estado; pedidos externos→Order local/canônico; atribuição/cancelamento de Delivery sem editar fatos de execução; fatos recebidos Motoboy; indicadores financeiros derivados de Earning autoritativo; casos de rede/sessão/rejected/conflict/tombstone; reconciliação de dados preexistentes.
- **Componentes:** Restaurante `app.js`, stores orders/deliveries/bikes/routes/events/deliveryEvents/earnings; adapters e sync transport/reconciler.
- **Dependências:** modelo F1 concluído; API F2 e login F3 para sync autenticado; provider F4 só bloqueia pedidos externos reais.
- **Bloqueios externos:** credenciais e homologação para importar pedidos reais.
- **Conclusão objetiva:** casos de uso principais passam local/offline e online; cada transição tem feedback e auditoria; nenhuma operação local válida depende da rede; servidor mantém autoridade definida.
- **Testes:** testes de use cases/IndexedDB/migration, API integração e regressão de pedido→Delivery→atribuição→execução→ganho.
- **Browser QA:** sim em F9 para desktop/tablet/mobile e fluxo integrado.

### F6 — Fluxos completos do Motoboy

- **Estado:** Parcial; corridas/projeções, estados, GPS, prova, eventos e ganhos locais existem; integração de identidade/dados administrativos e UX de conflitos falta.
- **Lacunas/tarefas:** consumir atribuição/Order/Route/cancelamento com autoridade Restaurante; garantir offline/reload e não perder fatos pendentes; separar cadastro Driver de execução; feedback de localização/prova e permissões; sincronizar eventos e refletir ACK/conflict sem duplicação; política de localização e prova.
- **Componentes:** Motoboy `app.js`, stores deliveries/races/events/locations/proofs/earnings/meta; sync transport/reconciler; service worker/manifest.
- **Dependências:** modelo F1 e API F2/F3; vínculo Route→Delivery está definido no contrato, restam os fluxos de produto.
- **Bloqueios externos:** permissões reais do dispositivo/serviços de mapa e política de geolocalização/prova em produção.
- **Conclusão objetiva:** receber atribuição/cancelamento e executar/registrar fatos offline, reload e retry sem perda nem autoridade cruzada; ganho é somente consulta.
- **Testes:** transições/eventos, prova/localização, IndexedDB offline/reload, conflito/retry, permissões e regressão por estados.
- **Browser QA:** sim em F9; hardware GPS/câmera precisa ser distinguido de simulação.

### F7 — UI/UX, configurações, acessibilidade e responsividade

- **Estado:** Parcial e inspecionado somente estaticamente; identidade visual existente preservada.
- **Lacunas/tarefas:** feedback de sync/online/offline/conflicts; telas de conta/admin; settings tenant vs local; estado vazio/loading/error consistente; teclado/foco/labels/contrast/touch; layout de tabelas, mapa, dialogs e navegação; remover duplicação apenas quando os fluxos funcionais estabilizarem.
- **Componentes:** HTML/CSS/JS e manifests dos dois apps; `app.js` concentra muitas vistas e regras.
- **Dependências:** fluxos F3–F6 estabilizados para desenhar estados reais, não mocks.
- **Bloqueios externos:** nenhum para acessibilidade/usabilidade local; validação física de dispositivos é externa.
- **Conclusão objetiva:** checklist WCAG aplicável atendido, sem overflow/foco perdido, fluxos utilizáveis em viewports alvo e estados de sync acionáveis.
- **Testes:** análise estática, testes de DOM/teclado quando possível, Chromium screenshots/viewport e auditoria manual assistiva.
- **Browser QA:** sim, obrigatório.

### F8 — Instalação, deploy, segurança e operação

- **Estado:** Parcial; loopback de desenvolvimento e role split seguros; sem rollout de produção demonstrado.
- **Lacunas/tarefas:** runtime Node suportado e pinned; configuração/secrets manager; TLS/domínio/reverse proxy/IP trusted; deploy/restart/health; migrations controladas como migrator separado; logs sem segredo, métricas/alertas; PostgreSQL backup/restore ensaiado e RPO/RTO; rotação credenciais/cookies; atualização app/SW/cache/schema e rollback compatível; rate limiting multi-instância; retenção/auditoria.
- **Componentes:** server/migrate, scripts/package config, manifests/SW, documentação de operação, PostgreSQL e infraestrutura de deploy.
- **Dependências:** arquitetura e procedures podem ser preparados localmente; rollout exige ambiente/dono operacional.
- **Bloqueios externos reais:** domínio/TLS, KMS/secret manager, host de produção, canal de distribuição e operadores/on-call.
- **Conclusão objetiva:** runbooks reproduzíveis de deploy, migration, restore testado, monitoramento e rollback; runtime mínimo privilege; RLS e segredos verificados sem credenciais no Git.
- **Testes:** security audit, migration em staging, restore com validação, health/shutdown, atualização SW e smoke depois de deploy aprovado.
- **Browser QA:** sim após deploy/staging e atualização PWA; não agora.

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
2. **F2 — Backend/API:** próxima macrofase planejada, não iniciada no Registro 0039.
3. **F2 — Validar/completar API** com schema estável, casos de uso e testes de isolamento; DDL via migrator.
4. **F3 — Cliente e telas de identidade**, em fail-closed e com API fake; sem provisionador/bypass real.
5. **F5 e F6 — Fechar fluxos dos apps**, preservando operação offline e autoridade.
6. **F4 — Providers:** preparar adapters/fakes localmente; validar integrações reais quando docs, conta e credenciais existirem.
7. **F7 — UX/configurações/acessibilidade/responsividade** após fluxos estabilizados.
8. **F8 — Deploy, secrets, observabilidade, backup/restore, atualização e hardening operacional.**
9. **F9 — QA end-to-end e regressão final**, depois das fases anteriores.

### Próximo bloco recomendado

F1 foi implementada até o limite sem Browser QA. O próximo bloco planejado é F2 — revisão dos casos de uso da API e implementação orientada pelos schemas v1. F2 não foi iniciada nesta execução.

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
