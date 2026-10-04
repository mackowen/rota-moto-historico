# Plano mestre de finalização do RotaMoto

**Revisão:** 2026-10-04 · **Fonte de verdade:** este documento, reconciliado com DEC-0002 a DEC-0006, Registros 0001–0050, checkouts atuais, contrato sincronizado e status read-only do PostgreSQL oficial. **Fases:** F1 B; F2 A; F3–F8 B; F9 iniciada pelo bloco de QA visual/renderizado (Registro 0049). O pré-requisito `READY_FOR_F9 = YES` foi confirmado no Registro 0048; o Registro 0050 corrigiu os quatro achados internos P1/P2; os dois P3 permanecem deliberadamente abertos e a campanha integrada continua pendente.

Este plano reúne trabalho já comprovado, lacunas encontradas no código e dependências externas reais. Não reabre o trabalho concluído nos Registros 0033–0036: role split, domínio canônico, ownership, ACK, transporte e reconciliação Local-First permanecem concluídos nos limites registrados. `main`, tags e baselines são referências protegidas.

## Legenda e limites da inspeção

- **Completo:** há implementação e evidência de teste/histórico para o escopo descrito.
- **Parcial:** existe implementação, mas faltam fluxo integrado, cobertura, operação ou semântica.
- **Ausente:** não localizado no código atual.
- **Derivado:** projeção/cache calculado a partir de dados canônicos ou eventos.
- **Legado:** estrutura mantida para compatibilidade/migração, sem autoridade canônica.
- **Externo:** requer fornecedor, domínio/HTTPS, credencial, decisão operacional ou ambiente fora dos repositórios.

No Registro 0048, `npm test` passou nos dois apps, `npm run test:postgres` passou contra o PostgreSQL oficial e `migrate.js status` confirmou 0001–0013 aplicadas; aquela reconciliação não fez Browser QA. O Registro 0050 validou os quatro P1/P2 no Chromium/CDP. Nenhuma senha foi lida ou exibida.

| Fase | Classificação pré-F9 | Base | Pendência interna impeditiva de F9 |
|---|---|---|---|
| F1 — modelo/Local-First | B | Registro 0039 | Nenhuma identificada; validar IndexedDB real/import no roteiro F9. |
| F2 — Backend/API | A | Registro 0040 | Nenhuma identificada para API interna v1. |
| F3 — identidade/RBAC | B | Registro 0041 | Nenhuma interna identificada; owner operacional, MFA seguro e email são externos/fail-closed. |
| F4 — integrações | B | Registro 0046 | Nenhuma interna identificada; protocolos/contas/homologações dos três providers externos. |
| F5 — Restaurante | B | Registro 0042 | Nenhuma identificada; QA integrado fica em F9. |
| F6 — Motoboy | B | Registro 0044 | Nenhuma identificada; blob/hardware real são capacidades externas. |
| F7 — UI/UX | B | Registro 0045 | Nenhuma identificada; renderização/dispositivo/leitor de tela ficam para F9. |
| F8 — operação | B | Registro 0047 | Nenhuma local impeditiva; produção, restore isolado e política operacional dependem de infraestrutura/decisão externa. |

**READY_FOR_F9: YES.** A decisão significa que não foi encontrada pendência interna estrutural anterior ao QA integrado; não declara integração externa funcional nem ambiente de produção. O QA inicial do Registro 0049 encontrou dois P1 e dois P2, todos corrigidos e repetidos com sucesso no Registro 0050; F9 permanece aberta para a campanha restante.

## Estado atual verificável após a rodada de correções do Registro 0050

- Restaurante: `codex/setup-workflow` @ `5a80a75b26c1dc3484ad51b7b7f274f407898ec8`, árvore limpa; baseline tag peel `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` intacta.
- Motoboy: `codex/setup-workflow` @ `09bcf745965486e545649d875a03e77df01825d3`, árvore limpa; baseline tag peel `79c527b59d32d8b55236c62042acb868166ed4ad` intacta.
- `main` dos apps não foi alterada; nenhum push foi feito.
- Restaurante `main`: `8fcd9f0ffffe37047a79834161cc1f791f20d76f`; Motoboy `main`: `aad1c6c07499e4fdf5c931ce5ce9e92cde3f7478`. Nenhuma tag/baseline mudou.
- PostgreSQL oficial: somente leitura nesta execução; readiness passou pela role runtime e `migrate.js status` confirmou 0001–0013 aplicadas via migrator. Nenhum schema, dado, role, grant ou configuração foi alterado.
- O Termux/PostgreSQL/nginx existente continua classificado como desenvolvimento/homologação local, não produção. F8 não aplicou configuração de servidor ou proxy.

| Área | Estado reconciliado em 2026-10-04 | Evidência/limite |
|---|---|---|
| Restaurante | Implementação F1–F8 pronta para validação integrada; branch limpa `codex/setup-workflow`, HEAD `5a80a75b26c1dc3484ad51b7b7f274f407898ec8` | P1/P2 iniciais corrigidos; P3 e QA integrado ainda pendentes. |
| Motoboy | Implementação F1–F8 pronta para validação integrada; branch limpa `codex/setup-workflow`, HEAD `09bcf745965486e545649d875a03e77df01825d3` | P1/P2 iniciais corrigidos; P3 e QA integrado ainda pendentes. |
| PostgreSQL oficial | Estruturalmente compatível no estado instalado | Migrations 0001–0013 status aplicadas; suite de migration/RLS/identity/domain/sync passou sem DDL nesta reconciliação. Não é instância de produção. |
| API/backend | Coerente para API v1 definida | Sessão/CSRF/RBAC/tenant/sync/Driver e fail-closed de providers cobertos por testes; email/MFA/provider/produção externos permanecem indisponíveis. |
| Contrato e Local-First | Sincronizados e coerentes | `CONTRACT.md`, `contract.js` e `backup-format.js` byte a byte idênticos; IndexedDB 6/7, outbox/inbox e merge cobertos por testes. |
| QA final / F9 | Iniciada; correção dirigida concluída, campanha ainda aberta | Quatro P1/P2 corrigidos e repetidos em CDP; dois P3, fluxos end-to-end autorizados e capacidades externas permanecem pendentes. |

## F9 — rodada de correção P1/P2 (Registro 0050)

- P1 Motoboy bootstrap/capture, P1 Restaurante corrida de modo local, P2 Motoboy estado de identidade e P2 Motoboy navegação desktop foram corrigidos e não se reproduziram nos testes CDP dirigidos em 393×873, 1366×768 e 360×800.
- Regressões automatizadas dos dois apps passam. P3 mantidos: cópia inicial de sessão anônima no Restaurante e quebra textual do status de sync no card de ganhos do Motoboy.
- F9 continua aberta. Inventário atualizado: P0 0, P1 0, P2 0, P3 2, BLOCKED_EXTERNAL 8. Evidências/commits no [Registro 0050](REGISTROS/0050.md) e [F9_QA_INICIAL.md](F9_QA_INICIAL.md).

## Matriz de dados: IndexedDB ↔ PostgreSQL ↔ contrato/API

Esta matriz foi reconciliada no Registro 0048. Descrições anteriores do snapshot 0037/0038 abaixo foram substituídas pelos estados atuais F1–F8; elas não devem ser usadas como pendências vigentes.

| Entidade/conceito | Restaurante IndexedDB | Motoboy IndexedDB | PostgreSQL/API e contrato | Estado e trabalho pendente |
|---|---|---|---|---|
| Company/tenant | R `companies`; M mantém apenas hint/cache | PG `companies` e memberships; tenant sempre da sessão | Estruturado; onboarding/primeiro owner exige operador controlado, não há signup público. |
| User/Membership/Role/Permission | Stores locais são perfil/UX, não identidade autoritativa | Sessão vem do backend; nenhum segredo é persistido em IDB/localStorage | Lifecycle, grants por subset, último owner, autoelevação, associação Driver e auditoria protegidos por API/RLS; email/MFA operacional externo/fail-closed. |
| Driver | R administra `bikes`/projeção Driver | M usa perfil local como executor, sem autoridade cadastral | Driver em `domain_records`; `Membership.driver_id` tenant-scoped e único, resolvido server-side; atribuição e acesso Motoboy validam Driver da sessão. |
| Order | R `orders`, autoridade de escrita | Sem store Order dedicado; subset operacional chega em cache/projeção da Delivery | JSONB `domain_records`, revisão/alias/sync; Motoboy apenas lê os campos permitidos. |
| Delivery | R `deliveries`; campos administrativos e projeções | M `deliveries` + `races` como projeção | Ownership por campo/origem, revisão, transições e Driver atribuída validados; reatribuição não apaga fatos e rejeita push atrasado do antigo Driver. |
| Route | R `routes` | M consome cache/snapshot | JSONB `Route.deliveryIds` é fonte única: rota contém 0..N deliveries; Delivery pertence a no máximo uma rota ativa; sem campo inverso. |
| DeliveryEvent | R `deliveryEvents`/`events` | M `deliveryEvents` e outbox | Fato append-only, eventId idempotente, ACK por operação e projeções locais; histórico preservado em reentrega/retorno. |
| LocationPoint/DeliveryProof | R lê fatos permitidos | M persiste localmente e publica pelo sync quando autorizado | Tenant/Driver/Delivery validados no servidor. Provas usam metadata+storageRef canônico; blobs não são enviados sem provider. GPS/provas têm retenção legal pendente. |
| Earning | R calcula em `amountMinor`/currency/components/rule | M consome snapshot canônico | Restaurante é autoridade; Motoboy não publica/calc. Valor monetário não usa float binário como autoridade. |
| Sync IDs/revisions/tombstones | Inbox/outbox/syncState/aliases e backup v1 | Stores equivalentes, sem apagar pendências/conflitos | PostgreSQL aliases/inbox/outbox/installations, cursor, baseVersion, canonicalVersion; ACK accepted/duplicate/rejected/conflict; retry idempotente sem LWW. |
| Backup/import | Export Local-First versionado | Mesmo formato compartilhado | Merge explícito não sobrescrevente, validação/limites e sanitização de segredos; plaintext é sensível, export cifrado depende de chave/UX. |
| Integrações | UI mostra estado sanitizado, nenhum segredo/client real | Sem credenciais/provider store | iFood/99Food/Keeta ficam `BLOCKED_EXTERNAL`, sem status conectado falso, sem normalização/provider ativo. |

### Estruturas IndexedDB reconciliadas (inspeção estática + testes de contrato)

- **Restaurante:** 18 stores existentes, registry incremental, DB_VERSION 6; índices não únicos aditivos e upgrade em `versionchange` abortável sem regravar stores. Backup Local-First v1 cobre stores e merge transacional.
- **Motoboy:** 11 stores existentes, registry incremental, DB_VERSION 7; atualização de shell não limpa IndexedDB. Backup Local-First v1 mantém compatibilidade com formatos legados reconhecidos.
- **Limite:** os testes usam harness de IndexedDB e contratos; o comportamento real em Chromium, atualização de abas abertas e importação em aparelhos permanecem para F9, não são pendência interna comprovada nesta reconciliação.

### PostgreSQL e evolução de schema

O status read-only executado nesta reconciliação confirmou migrations 0001–0013 aplicadas. `npm run test:postgres` passou com `rotamoto_app`/`rotamoto_migrator` explícitos e pgpass. O role split, RLS/FORCE, least privilege e default-deny são cobertos pelos testes PostgreSQL; nenhum DDL foi executado nesta reconciliação.

Identidade, roles, integrações, aliases e filas de sync têm tabelas relacionais; domínio operacional usa `domain_records` JSONB com UUID canônico, tenant, revisão, timestamps e tombstone e constraints seletivas para invariantes comprovados. A escolha acompanha DEC-0005; não há evidência nesta reconciliação que justifique nova migration. Operações Motoboy são filtradas por membership.driver_id e atribuição da Delivery.

## Integrações de delivery

| Provider | Implementado no código | Simulação/parcial | Dependência/risco e próximo trabalho |
|---|---|---|---|
| iFood | Nenhuma conexão/protocolo externo validado ativo; fronteira local bloqueada | Laboratório sintético restrito à memória, sem criar Order/alterar IndexedDB | **B — BLOCKED_EXTERNAL** até documentação oficial, conta/credenciais e homologação; status conectado sempre falso. |
| 99Food | Nenhum client de produção ativo; endpoints legados falham fechado | Fixtures/testes não representam conexão real | **B — BLOCKED_EXTERNAL** pelas mesmas dependências oficiais/conta/homologação; secrets externos ausentes. |
| Keeta | Nenhum client de produção ativo; endpoints legados falham fechado | Simulação não é indicada como provider conectado | **B — BLOCKED_EXTERNAL** por protocolo/documentação oficial, conta/credenciais e homologação. |

Para todos, a fronteira interna e estado fail-closed estão implementados. Não existe endpoint/provider conectado; avançar exige material oficial e credenciais/homologação, além de secret manager para produção. Não presumir endpoints, assinatura, polling ou autorização externa. “Código de laboratório” não significa integração homologada ou credencial ativa.

## Identidade, telas e fluxos

### Backend disponível

O backend de identidade oferece login/logout/sessão atual, tenant selection, recuperação/consumo, aceitação de convite/verificação e provisionamento administrativo protegido por adapter fail-closed. Sessões opacas, cookie seguro, CSRF, expiração/revogação, RBAC e RLS existem. Sync restaura sessão e opera quando já há sessão. Não há signup público. Operador real/primeiro owner e MFA operacional seguem fail-closed.

### Estado reconciliado após F3/F5/F6/F7 (Registros 0041–0045)

- **Restaurante e Motoboy:** login/logout, sessão, recuperação/convite, estados de loading/error, bootstrap e administração aplicável foram implementados nos limites atuais. Senhas/tokens não são persistidos no storage local; APIs continuam autoridade.
- **Pendências externas:** primeiro owner requer operador; email e MFA real exigem providers/armazenamento seguro. Os adapters permanecem fail-closed. Sync exibe estado/rejeições, mas resolução humana completa de conflitos complexos continua melhoria do produto, sem bloquear teste integrado dos fluxos existentes.
- O inventário estático não substitui verificação renderizada nem prova de hardware/permissões; ambos são parte da F9, não uma constatação de defeito prévio.

## Inventário estático de UX/arquitetura

- Restaurante organiza painel, pedidos, motos, rotas, relatórios, eventos, configurações, laboratório de integração e administração em `app.js`; renderização e parte das regras ainda são monolíticas. Há estados vazios/toasts e diálogos; CSS responsivo existente deve ser preservado e auditado em navegador só na fase final.
- Motoboy organiza início/corridas, rotas, ganhos, conta e configurações em `app.js`; `races` continua projeção local. Service worker atual v40.5 cacheia somente shell same-origin allowlisted e exclui API; teste de contrato passou no Registro 0047 e nesta reconciliação.
- A separação desejada UI → aplicação/use cases → domínio → repositories/adapters → IndexedDB/HTTP → backend/PostgreSQL/providers existe parcialmente: backend já separa handler/serviço e clientes têm transporte/reconciliação separados, mas a UI e regras antigas continuam concentradas em arquivos grandes.
- Backup local versionado com merge não sobrescrevente, sanitização de segredos e aviso plaintext; restore foi testado por harness, mas restore real/recovery drill permanece operação F8/F9.
- F7 implementou foco/dialogs/labels/safe areas por inspeção estática e testes. Contraste renderizado, teclado virtual em aparelhos e leitores de tela não foram medidos e ficam para F9.

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

- **Estado:** **A — CONCLUÍDA** para as operações internas v1 definidas no Registro 0040. A implementação usa HTTP → application/use cases → domain services → repositories → PostgreSQL. F1 não foi reaberta.
- **Concluído:** inventário versionado em `rota-moto-restaurante/docs/API-v1.md`; identidade/sessão existente; health liveness/readiness com conexão curta e runtime `rotamoto_app`; leitura tenant-scoped de Order, Delivery, Route, Driver, DeliveryEvent, LocationPoint, DeliveryProof e Earning; leituras administrativas de Company, Membership, Role/Permission e estado/metadados não secretos de Integration/ExternalAccount. Filtros são allowlisted/parametrizados, paginação keyset, UUIDs e cursor validados, sessão duplicada rejeitada. Escritas operacionais continuam nos use cases de sync/outbox/inbox com ACK por operação, sem CRUD HTTP paralelo.
- **Segurança:** tenant vem de sessão/identity context e RLS; RBAC por permission key; `companyId` em query rejeitado; memberships e integrações são protegidos por permissão; external account não expõe `secret_ref`; sem novo endpoint público. Erros padronizam code/message/requestId; logs estruturados guardam método/path/status/duração/error code sem payload; readiness sanitiza falhas; rate limit por IP/endpoint. `ALLOWED_ORIGIN` governa preflight/POST e credenciais/CSRF são permitidos só para a origem configurada. `rotamoto_app` segue sem DDL e ganhou somente SELECT em duas tabelas tenant-scoped.
- **Migration:** `0011_runtime_integration_read`, up/down versionados e aplicada pelo `rotamoto_migrator`; sem alteração de 0001–0010. Verificadas leituras, ausência de escrita e RLS/FORCE já vigente.
- **Ainda fora da F2:** mutações administrativas de memberships/roles e convite genérico dependem da semântica de lifecycle/RBAC que será fechada em F3; provisionamento segue sem adapter operacional e fail-closed. Nenhuma dessas rotas foi improvisada. Provider real, TLS/domínio e deploy seguem F4/F8.
- **Testes:** `npm test` Restaurante e `npm run test:postgres` no PostgreSQL oficial passaram; após CORS, `npm test`, `test-server-security.js`, `test-domain-sync-postgres.js` e `test-identity-http-postgres.js` passaram. Cobertura inclui autorização, tenant, IDs/cursor, cookies, readiness, grants/rollback, preflight e origens aceitas/negadas; `node --check` e `git diff --check`. Sem Browser QA.
- **Critério:** rotas internas definidas, cases desacoplados, isolamento/RBAC, validação/erros/logs, readiness, migration/grants, docs e testes dirigidos satisfeitos. Cliente/browser continua para F3/F5/F6/F9.

### F3 — Identidade, login e RBAC nos dois clientes

- **Estado:** **B — implementação local concluída com dependências externas explicitamente isoladas**. APIs administrativas de lifecycle e clientes de conta existem nos dois apps; não há bypass para email/MFA/primeiro operador.
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

- **Estado:** **B — implementação concluída / Browser QA integrado pendente em F9** (Registro 0042). F1/F2/F3 permanecem fechadas.
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

- **Estado:** Em andamento. QA inicial visual/renderizado no Registro 0049: `F9_INITIAL_QA = PASS_WITH_FINDINGS` (contagem de entrada: P0 0, P1 2, P2 2, P3 2, BLOCKED_EXTERNAL 8). Registro 0050 corrigiu e repetiu os quatro P1/P2; estado corrente P0 0/P1 0/P2 0/P3 2/BLOCKED_EXTERNAL 8. F9 não está concluída.
- **Lacunas/tarefas:** P1/P2 do Registro 0049 corrigidos no 0050. Permanecem os dois P3; seguir com roteiro autorizado de ponta a ponta por app, sync multi-app, offline/reconnect/reload/conflitos, backup/upgrade, roles e acessibilidade. Não contornar dependências externas.
- **Componentes:** `~/projetos/browser-tests/run-qa-infra.sh`, app servidores, testes automatizados e checklist deste plano.
- **Dependências:** F1–F8 em estado fechável; dados sintéticos isolados/limpos; Chromium/Termux vivo.
- **Bloqueios externos reais:** Chromium pode sofrer limitações GPU/processo no Termux/Android; permissões físicas e integrações reais dependem de hardware/contas. Continuar testes automatizados e registrar limitações.
- **Conclusão do bloco 0049:** matriz inicial executada; erros JS e fluxos P1 foram inventariados sem alteração de app. O Registro 0050 corrigiu os quatro achados P1/P2 e repetiu os fluxos. A matriz inicial não certifica critérios finais nem conclui F9; evidências preservadas em `F9_QA_INICIAL.md`.
- **Testes:** `npm test` nos dois apps, `npm run test:postgres`, checks de sintaxe/diff, CDP dirigido a fluxos e acessibilidade.
- **Browser QA:** autorizado; primeira matriz e repetição corretiva executadas via CDP. Evidências fora do Git em `~/projetos/browser-tests/f9-initial-qa-2026-10-04/` e `f9-correction-round-1-2026-10-04/`. Sessão real, providers, hardware e storage seguem isolados.

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

F1/F2 estão concluídas; F3 mantém dependências externas registradas; F4 local concluída com providers bloqueados externamente; F5/F6 estão implementadas; F7 está implementada estaticamente; F8 está preparada localmente, sem rollout/restore de produção. **F9 está em andamento**: P1/P2 do QA inicial foram corrigidos; permanecem P3 e QA end-to-end/hardening. A disponibilidade de capacidades físicas/externas limita somente seus fluxos respectivos.

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
