# Testes da Campanha 0300

## Automatizados

- `npm test` Restaurante: PASS (suíte integral; saída final no transcript da execução local).
- `node --check app.js`, `dashboard-v2.js`, `sw.js`: PASS.
- `git diff --check`: PASS.
- Testes direcionados DashboardV2, semântica dos indicadores, navegação Mais, shell/cache, impressão offline e atribuição: PASS.

## Browser/CDP

- Chromium real via CDP; sessão sintética emitida pelo backend, MFA verificada; tenant fixture em `rotamoto_e2e`.
- Criação pela UI → sync `synced` → ACK/readback canônico GET 200 → reload/re-render: PASS.
- Comparativo legacy/V2 same session/company: mesmos IDs em Entregas para revisar; semântica KPI descrita em [comparativo](comparativo-dados.md).
- Abrir corrida, preview de impressão e QR assinado de Delivery elegível: PASS no browser.
- Navegação de destinos existentes e Mais (close/Escape/foco/clique externo): PASS no subset.
- Dez larguras (320, 360, 390, 430, 600, 768, 1024, 1280, 1440, 1920) × claro/escuro = 20 capturas; sem overflow da página.
- Sem exceções JS. As APIs que não têm implementação no fixture retornaram 404: `/api/restaurant-driver-queue`, `/api/logistics/analytics`, `/api/logistics/intelligence/analytics`, `/api/logistics/intelligence/decision-quality`, `/api/logistics/route-settings`, `/api/analytics/territorial` e `/api/analytics/territorial/deliveries/:id/destination`. São limites de coverage; a funcionalidade dessas áreas não recebe PASS.
- `/api/identity/session` 401 ocorreu antes de instalar cookie no teste; depois sessão + MFA foram confirmadas.
- Fixture: `databaseCommitted=false`; `cleanup=COMPLETED`; `tenantScopedResiduals=0`.

## Não executados

Motoboy não foi alterado nem testado. Sem Chrome Android físico, confirmação física de impressora, auditoria integral cross-module da mesma Order, testes adversariais cross-tenant, falhas de sync para todos os estados, e sem aprovação visual humana. Nenhuma escrita no banco `rotamoto`.
