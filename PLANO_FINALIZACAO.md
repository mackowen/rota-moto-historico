# Plano mestre de finalização do RotaMoto

**Revisão:** 2026-10-04 · **Fonte de verdade:** este documento, reconciliado com DEC-0002 a DEC-0006, os Registros 0001–0036, os dois checkouts em `codex/setup-workflow`, o contrato sincronizado e uma inspeção read-only do PostgreSQL oficial. **Estado:** planejamento; nenhuma implementação de fase foi iniciada neste registro.

Este plano reúne trabalho já comprovado, lacunas encontradas no código e dependências externas reais. Não reabre o trabalho concluído nos Registros 0033–0036: role split, domínio canônico, ownership, ACK, transporte e reconciliação Local-First permanecem concluídos nos limites registrados. `main`, tags e baselines são referências protegidas.

## Legenda e limites da inspeção

- **Completo:** há implementação e evidência de teste/histórico para o escopo descrito.
- **Parcial:** existe implementação, mas faltam fluxo integrado, cobertura, operação ou semântica.
- **Ausente:** não localizado no código atual.
- **Derivado:** projeção/cache calculado a partir de dados canônicos ou eventos.
- **Legado:** estrutura mantida para compatibilidade/migração, sem autoridade canônica.
- **Externo:** requer fornecedor, domínio/HTTPS, credencial, decisão operacional ou ambiente fora dos repositórios.

A inspeção de IndexedDB foi estática: os bancos de usuários não foram abertos nem modificados. Não se executou Browser QA, npm test amplo ou test:postgres amplo nesta revisão. PostgreSQL foi consultado somente em transações read-only e pelo mecanismo pgpass existente; não se inspecionaram credenciais. `migrate.js status` confirmou 0001–0008 aplicadas. A role runtime não pode ler `schema_migrations`; o status foi consultado com `rotamoto_migrator`.

## Estado atual verificável

| Área | Estado em 2026-10-04 | Resumo |
|---|---|---|
| Restaurante | Parcial, branch limpa `codex/setup-workflow`, HEAD `df562f7fd26fb93a2f3c857234987fa1d34800c9` | UI, integrações e IndexedDB maduros para operação local; sync canônico reconciliado. Identidade visual/operacional e administração server-side não integradas. |
| Motoboy | Parcial, branch limpa `codex/setup-workflow`, HEAD `6a1574f6a72e5ed87b0b8cbf16a3c90533d68b22` | Operação local, GPS/provas/eventos e sync reconciliado. Identidade visual/operacional, administração e consolidação de dados ainda incompletas. |
| PostgreSQL oficial | Parcial, PostgreSQL 18.6 em `127.0.0.1:5432`, banco `rotamoto` | Migrações 0001–0008 aplicadas; 20 tabelas, 12 relações tenant-scoped com RLS ENABLE/FORCE, 50 índices e 258 constraints catalogadas. Modelo de domínio usa `domain_records` JSONB genérico. |
| API/backend | Parcial, loopback | Identidade e sync HTTP existem; autorização/session/CSRF e role split foram testados. Falta administração operacional completa, frontend de identidade, processamento durável de integrações e operação de produção. |
| Contrato | Parcialmente completo | `CONTRACT.md` e `contract.js` sincronizados para v1 e DEC-0006 define autoridade/ACK. A relação Route→Delivery e alguns campos/estados ainda não têm semântica suficiente para persistência tipada. |
| QA final | Pendente | CDP existe, mas QA end-to-end integrado deve ocorrer após fechamento dos fluxos e depende de runtime Chromium/Termux estável. |

## Matriz de dados: IndexedDB ↔ PostgreSQL ↔ contrato/API

| Entidade/conceito | Restaurante IndexedDB | Motoboy IndexedDB | PostgreSQL/API e contrato | Estado e trabalho pendente |
|---|---|---|---|---|
| Company/tenant | `companies`, perfis/configuração e identificadores legados | tenant/configuração local em `meta`/sync state | `companies`, memberships, sessão; tenant derivado no servidor | Parcial/legado. Mapear onboarding dos IDs locais para tenant canônico sem associar tenant por payload. |
| User/Driver | `users`, `profiles`, cadastro local de bikes/driver | perfil/configuração local | `users`, `credentials`, `memberships`, roles/permissions; Driver em `domain_records` conforme contrato | Parcial. Separar identidade, membership, cadastro administrativo de Driver e preferências/execução locais; fluxo de membros e gestão não tem UI/API completa. |
| Order | `orders` | não há store de pedidos dedicado; dados chegam em cache/projeções da entrega | `domain_records(Order)`; escrita autoritativa Restaurante | Parcial. Especificar projeção mínima e ligação segura da Order canônica na experiência Motoboy; preservar dados comerciais. |
| Delivery | `deliveries` e projeções relacionadas | `deliveries` mais `races` como projeção operacional | `domain_records(Delivery)` com revisão, ownership por campo e transições | Parcial. Diferenças de modelos e campos locais exigem mapeamento/versionamento; não há LWW. `races` é derivado/local. |
| Route | `routes` e planejamento | sem store canônico próprio; rota recebida é cacheada | `domain_records(Route)`, escrita/plano Restaurante | Parcial. Relação Route→Delivery não está definida; não inventar vínculo. |
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

O catálogo consultado em modo read-only mostrou schema `public`, 20 tabelas (incluindo ledger), 12 tabelas tenant-scoped com policy e RLS ENABLE/FORCE, 50 índices e 258 constraints. A política de default-deny é reforçada pela role `rotamoto_app` sem DDL/ledger; ownership/migrations pertencem a `rotamoto_migrator`. Migrations 0001–0008 estão aplicadas e o runner existente implementa transação, advisory lock, checksums, detecção de migration ausente e rollback conforme Registros 0030/0033.

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

- **Estado:** Parcial; sync/reconciliação v1 concluídos em 0034–0036; bancos locais, legado e JSONB ainda não reconciliados campo a campo.
- **Lacunas/tarefas:** matriz CONTRACT↔stores↔payload PostgreSQL; regras tipadas por entidade; campos requeridos/opcionais/enumerações; índice por consultas reais; relação Route→Delivery apenas após decisão contratual; política de retenção de localização/provas; migrações IndexedDB nomeadas/idempotentes; fixtures/export de versões antigas; mapeamento de IDs/tombstones e recuperação de conflitos.
- **Componentes:** `CONTRACT.md`, `contract.js`, `DECISOES.md` DEC-0005/0006; Restaurante `app.js` e stores `rota-moto-restaurante-local-v30`; Motoboy `app.js` e DB `RotaMotoDB`; migrations em Restaurante `backend/postgres/migrations/0001–0008`; `backend/domain/sync-service.js`.
- **Dependências:** decisões de campos/semântica podem ser feitas por comparação de código, exceto Route→Delivery, retenção de dados sensíveis e exigências regulatórias/operacionais.
- **Bloqueios externos:** nenhum para inventário e migrações locais; retenção final de geolocalização/provas precisa política do produto/privacidade.
- **Conclusão objetiva:** cada campo de entidade tem autoridade, validação e mapeamento nos quatro lados; fixtures antigas migram sem perda; constraints e RLS testadas por tenant; nenhum payload válido é rejeitado sem código de erro estável.
- **Testes:** migration clean/replay/rollback; IndexedDB upgrade com fixtures; schema/constraint/FK/RLS/cross-tenant; idempotência, tombstone, conflitos e compatibilidade offline.
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
- **Dependências:** F1/F2 e login F3 para sync autenticado; provider F4 só bloqueia pedidos externos reais.
- **Bloqueios externos:** credenciais e homologação para importar pedidos reais.
- **Conclusão objetiva:** casos de uso principais passam local/offline e online; cada transição tem feedback e auditoria; nenhuma operação local válida depende da rede; servidor mantém autoridade definida.
- **Testes:** testes de use cases/IndexedDB/migration, API integração e regressão de pedido→Delivery→atribuição→execução→ganho.
- **Browser QA:** sim em F9 para desktop/tablet/mobile e fluxo integrado.

### F6 — Fluxos completos do Motoboy

- **Estado:** Parcial; corridas/projeções, estados, GPS, prova, eventos e ganhos locais existem; integração de identidade/dados administrativos e UX de conflitos falta.
- **Lacunas/tarefas:** consumir atribuição/Order/Route/cancelamento com autoridade Restaurante; garantir offline/reload e não perder fatos pendentes; separar cadastro Driver de execução; feedback de localização/prova e permissões; sincronizar eventos e refletir ACK/conflict sem duplicação; política de localização e prova.
- **Componentes:** Motoboy `app.js`, stores deliveries/races/events/locations/proofs/earnings/meta; sync transport/reconciler; service worker/manifest.
- **Dependências:** F1/F2/F3; Route→Delivery requer contrato antes de implementação.
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

1. **F1.1 — Matriz canônica de campos e migração de dados local:** inventariar modelos reais, payloads/fixtures legadas e autoridade por campo; resolver lacunas de contrato sem inventar Route→Delivery; produzir plano de upgrade aditivo.
2. **F1.2/F2 — Validar e fechar schema/API orientados pela matriz:** tipagem/constraints apenas onde há contrato estável; consultas/repositories/casos de uso e testes de isolamento; migration aditiva via migrator.
3. **F3 — Cliente e telas de identidade**, inicialmente com estados fail-closed e API fake; completar endpoints administrativos sem provisionador/bypass real.
4. **F5 e F6 — Fechar fluxos de cada app**, preservando operação offline e campos/autoridade; fazer integração funcional antes de polir estados visuais.
5. **F4 — Providers:** preparar durabilidade/fakes localmente em paralelo; validar cada integração real somente quando docs, contas e credenciais existirem. Esta dependência não bloqueia F5/F6 com dados locais.
6. **F7 — UX/configurações/acessibilidade/responsividade** após fluxos/estados serem reais.
7. **F8 — Deploy, secrets, observabilidade, backup/restore, atualização e hardening operacional**; separar preparação local da ativação externa.
8. **F9 — QA end-to-end e regressão final**; somente após fases anteriores e com browser permitido.

### Primeiro bloco recomendado

Começar por **F1.1, sem migration ainda**: gerar uma matriz versionada por entidade e campo a partir do `CONTRACT.md`/`contract.js`, stores e normalizadores de cada app, `domain_records`/services e fixtures de backup legado. O resultado deve marcar autoridade, tipo, nulabilidade, normalização, alias/canonical ID, tombstone, revisão, projeção e compatibilidade. Isso reduz risco de schema genérico ou perda em upgrades e fornece critério objetivo para decidir migrations e os fluxos subsequentes. A relação Route→Delivery e retenções sensíveis ficam explicitamente abertas até decisão apropriada.

## Bloqueios externos reais versus trabalho local

**Bloqueios externos reais:** primeiro owner exige operador/prova de autoridade; MFA de owner exige armazenamento seguro de segredo/KMS ou decisão operacional equivalente; convite/recovery por email exige provider/domínio; APIs reais exigem documentação oficial, conta/merchant/sandbox e credenciais de cada fornecedor; deploy exige domínio/TLS, host e operação; QA final pode sofrer encerramento de Chromium/GPU pelo Termux; avaliação de GPS/câmera requer dispositivo/permissões reais; regras de retenção de geolocalização/provas podem exigir decisão de produto/privacidade.

**Trabalho que pode avançar agora:** matriz de dados e fixtures; migrações IndexedDB idempotentes; validação/constraints orientadas ao contrato; UI cliente de identidade usando APIs/fakes sem permitir login inseguro; gestão administrativa server-side protegida/fail-closed; fluxos locais do Restaurante/Motoboy; feedback de sync e conflitos; adapters e filas testadas com fakes; backup/export versionado; logging/health e runbooks; acessibilidade estática e testes automatizados. Nenhum bloqueio externo justifica interromper estes blocos independentes.

## Proteções de execução

Todos os trabalhos seguintes continuam em `codex/setup-workflow` nos dois apps; não alterar `main`, tags ou baselines, não fazer push. Migrations novas são aditivas e executadas por `rotamoto_migrator`; API usa somente `rotamoto_app`; dados de teste são sintéticos e revertidos. Não ler/mostrar `.pgpass` nem transportar segredos. Não reimplementar o sync/reconciliação de 0034–0036; só alterar esses componentes se a matriz revelar lacuna reproduzível, com teste direcionado. Browser QA não faz parte da etapa de planejamento e fica para F9.

## Fontes principais

- Histórico: `ESTADO_ATUAL.md`, `PENDENCIAS.md`, `DECISOES.md`, `INDICE.md`, Registros 0027–0036 e registros anteriores indexados.
- Contrato: cópias `CONTRACT.md` e `contract.js` nos repositórios dos dois apps.
- Restaurante: `backend/postgres/migrations/0001–0008`, `backend/domain/sync-service.js`, `backend/identity/`, `server.js`, `app.js`, `ifood-integration.js`, `99food-*`, `keeta-*`, manifest/service worker e testes.
- Motoboy: `app.js`, sync transport/reconciliation, IndexedDB upgrade/normalizers, manifest/service worker, backup/import e testes.
- PostgreSQL oficial: catálogo read-only e status do migration runner em 2026-10-04, sem alteração de schema/dados/roles.
