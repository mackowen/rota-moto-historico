# Testes executados

## Restaurante

- `npm test`: PASS (suíte completa; incluiu `test-dispatch-assignment.js`, contratos, QR, impressão, logística e navegação).
- `npm run assets:check`: PASS.
- `node tests/test-dispatch-assignment.js`: PASS, ativação DOM e guarda contra clique duplicado.
- `node tests/test-routes-v2.js`: PASS, ativação DOM dos modos do mapa e fit-to-overview.
- `node tests/test-delivery-qr.js`: PASS.
- `node tests/test-printing.js`: PASS.
- `node tests/test-orders-v2-cards.js`: PASS.
- `ROTAMOTO_E2E_CAMPAIGN=0304 npm run test:availability-concurrency-e2e`: PASS, PostgreSQL concorrente/dispatch/RLS/rollback conforme DISTRIBUICAO.md.
- `node --check app.js`, `node --check tests/test-dispatch-assignment.js`, `node --check tests/test-routes-v2.js`: PASS.

## Motoboy

- `npm test`: PASS.
- `npm run assets:check`: PASS.
- `node tests/test-cross-app-contract-parity.js`: PASS.

## Integridade de diff

`git diff --check`: PASS após alterações. Teste Browser QA autenticado não executado; não equivale a PASS visual.
