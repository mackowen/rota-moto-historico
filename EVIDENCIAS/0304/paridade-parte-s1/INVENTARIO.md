# Inventário técnico e cobertura de telas

Esta matriz enumera as rotas superiores descobertas nos entrypoints. As telas condicionais de modais, subpainéis e permissões dependem de sessão/dados e não são consideradas cobertas por existir código.

| ID | App / tela | Implementação e API/dados | Testes desta rodada | Cobertura real |
|---|---|---|---|---|
| REST-01 | Visão geral | `app.js` dashboard; projeções local-first e sync autenticado | `test-dashboard-v2.js`, `test-dashboard-semantics.js` | unitário/contrato PASS; browser autenticado BLOCKED |
| REST-02 | Pedidos e entregas | `app.js`, `restaurant-operations.js`, APIs sync/logistics | `test-orders-*`, `test-restaurant-operations.js`, logistics E2E | unitário/E2E parcial PASS; browser BLOCKED |
| REST-03 | Motoboys | `app.js` / projeções driver e presença | `test-motoboys-v2-view.js`, QR/availability tests | sintético PASS; autenticado BLOCKED |
| REST-04 | Rotas | `app.js`, `logistics-ui.js`, `/api/logistics/route-settings` | `test-route-origin-settings.js`, map lifecycle | módulo PASS; browser BLOCKED |
| REST-05 | Relatórios | `analytics.js`, `analytics-view.js`, API analytics/finance | `test-analytics*`, territorial, finance read lifecycle | testes PASS; dados da conta real BLOCKED |
| REST-06 | Eventos | `app.js` eventos locais e server audit conforme sessão | `test-audit.js`, contract suite | estático/testes indiretos; browser BLOCKED |
| REST-07 | Configurações | `settings()` e `settingsPanel()` em `app.js`; ver CONFIGURAÇÕES.md | aparência, company settings/persistence, route settings, RBAC unit | teste de módulo PASS; persistência real autenticada BLOCKED |
| REST-08 | Sistema local | `admin()` em `app.js`, IndexedDB local | identity UI, backup/local persistence tests | sintético PASS; browser BLOCKED |
| REST-09 | Laboratório | integração sintética local em `app.js` | provider hooks/guards, runtime tests | cobertura sintética PASS; browser BLOCKED |
| REST-10 | Central de ajuda | conteúdo estático/local e busca | `test-help-center.js` | teste PASS; visual completa BLOCKED |
| MOTO-01 | Início / operação | `app.js`, estado local e sync | home map, GPS, workflow e mobile tests | sintético PASS; browser autenticado BLOCKED |
| MOTO-02 | Entregas | `app.js`, APIs sync/confirm/custody | execution workflow, delivery confirmation, sync tests | sintético PASS; cross-app real PARTIAL |
| MOTO-03 | Rotas/navegação | workflow local, provider intents e OSRM/mapa | navigation workflow/intents/map tests | unitário PASS; dispositivo real BLOCKED |
| MOTO-04 | Ganhos | projeção financeira local/canônica conforme sessão | earnings card e driver persistence | testes PASS; sessão real BLOCKED |
| MOTO-05 | Ajustes | `renderSettings()`/`openSettingsPanel()` em `app.js`, IndexedDB; company-owned disabled quando integrado | ownership e goal persistence; ver CONFIGURAÇÕES.md | testes PASS; readback autenticado BLOCKED |
| MOTO-06 | Ajuda | `index.html` + help module | `test-help-center.js` | teste PASS; visual completa BLOCKED |
| CON-01 | Contrato Restaurant↔Motoboy | `CONTRACT.md`, `contract.js`, sync schemas | `test-cross-app-contract-parity.js` em ambos | PASS semântico |
| PWA-01 | Shell/Service Worker | `scripts/sync-asset-manifest.js`, `asset-manifest.js`, `sw.js` | asset check, atomic SW tests e probe temporário | cache hash PASS; browser offline/upgrade BLOCKED |

## Limites da cobertura

- Viewports solicitados (320, 390, 768, 1024, 1440), temas claro/escuro e navegação completa não foram percorridos em sessão autenticada. Testes de layout existentes são estruturais/automatizados e não substituem inspeção visual real.
- Endpoints `/api/identity/session` responderam 401 nos serviços locais usados no checkpoint. Nenhuma credencial anterior foi reutilizada e nenhum teste sintético foi chamado de sessão real.
- Ainda não há matriz afirmando, para cada botão/modal, resultado de persistência após reload em ambos os apps.
