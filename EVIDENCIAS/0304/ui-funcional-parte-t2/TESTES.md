# Testes e verificações

- Restaurante `npm test`: PASS.
- Motoboy `npm test`: PASS.
- `npm run assets:check` nos dois: PASS.
- `node tests/test-cross-app-contract-parity.js`: PASS.
- Restaurante navegação: `test-navigation-shell-renderer.js`, `test-mobile-more-navigation.js`: PASS.
- Motoboy navegação: `test-structural-navigation-responsive.js`, `test-navigation-workflow.js`, `test-navigation-intents.js`, `test-navigation-map-alert-preferences.js`: PASS.
- Rotas: `test-routes-v2.js`: PASS (quatro filtros de camada, fit, disabled, `aria-pressed`, view switch, seleção/detalhes, regra sidebar/tablet e presença de estado vazio).
- Geometria/mapa: `test-route-origin-settings.js`, `test-map-runtime-lifecycle.js`, `test-osrm-route-distance.js`, `test-ors-route-distance.js`: PASS.
- `git diff --check`, `node --check tests/test-routes-v2.js`, `node --check app.js`: PASS.
- CDP real Chromium: smoke público + harness 10 pares de viewport/tema; estado preenchido sintético: 2 rotas, 2 entregas, detalhe selecionado e largura do documento 390 para viewport 390.
- Readiness: `http://127.0.0.1:8787/health/ready` e `:8788/health/ready`: `ready`.

Não foi executado Browser QA autenticado nem mapa operacional Leaflet com dados reais.
