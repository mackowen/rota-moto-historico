# Testes executados

## Regressão de aplicativos

- Restaurante: `npm test` — PASS (inclui assets:check/pretest e suíte completa; última mudança posterior foi apenas resolução do alvo no teste domain-sync, executado separadamente).
- Motoboy: `npm test` — PASS.
- `npm run assets:check` explícito: PASS nos dois.
- `git diff --check`: PASS nos diffs dos aplicativos; repetir no checkpoint final.
- `node --check` nos arquivos JS alterados: PASS, incluindo `tests/test-domain-sync-postgres.js` após ajuste.
- Contratos compartilhados, guards, fixtures e testes frontend/RBAC incluídos nas suítes: PASS.

## PostgreSQL descartável

Comandos executados no target validado `rotamoto_e2e_lote1b_20261030_3e9a4c12` (URLs omitidas para não registrar configuração sensível):

- `node backend/postgres/migrate.js up --part-b-disposable` e `status --part-b-disposable` — 0001–0063/checksums PASS.
- `node tests/test-identity-http-postgres.js` — PASS.
- `node tests/test-platform-admin-postgres-e2e.js` — PASS.
- `node tests/test-integrated-founder-bootstrap-postgres.js` — PASS.
- `node tests/test-integrated-founder-bootstrap-service-postgres.js` — PASS.
- `node tests/test-tenant-rls-isolation-e2e.js` — PASS.
- `node tests/test-postgres-e2e-lifecycle.js` — PASS.
- `node tests/test-domain-sync-postgres.js` — PASS após migrar do URL hardcoded para o resolver de alvo protegido.
- `node tests/test-postgres-migration-targets.js`, `test-e2e-fixture-guards.js` e `test-backup-inventory.js` — PASS na regressão Restaurante.
- Teste com host inválido (`127.0.0.0`) foi rejeitado pelo guard, como esperado.

Os testes de escrita aplicáveis usam transação/rollback ou limpeza e terminaram sem resíduos de fixture. Um teste de instalação vazia foi executado no DB inicialmente vazio; o ramo founder-existente foi testado separadamente. Nenhum teste foi marcado PASS por estar ignorado.

## Serviços e HTTP

No fechamento, `GET /` em 8083/8084 e `GET /health` em 8787/8788 retornaram HTTP 200. Esses hosts publicados foram apenas checados; Browser QA usou proxy temporário do checkout atual. Nenhum serviço/nginx foi reiniciado.
