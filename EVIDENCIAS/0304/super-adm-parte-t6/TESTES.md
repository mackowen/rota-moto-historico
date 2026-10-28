# Testes e medições

## Restaurante

- `node --check identity-ui.js`, `identity-request-state.js`, `app.js`: PASS.
- `node tests/test-platform-admin-ui.js`: PASS, incluindo resposta fora de ordem/cancelamento do controlador real usado pelo console, um painel financeiro por seção, guardas de seção e tokens de contraste.
- `node tests/test-identity-ui.js`: PASS.
- `node tests/test-platform-admin-http.js`: PASS sintético (MFA/RBAC/CSRF/auditoria).
- `node tests/test-backup-admin-http.js`: PASS sintético (allowlist, MFA, CSRF, idempotência e dupla aprovação).
- `npm run assets:check`: PASS.
- `npm test`: PASS completo (exit 0; pretest/assets incluído).
- `git diff --check`: PASS.

## Motoboy

- `npm test`: PASS completo (exit 0; pretest/assets incluído). Nenhum arquivo foi alterado.
- `npm run assets:check` foi executado via `pretest`.

## Ambiente e browser

- `/health/ready` em 8787 e 8788: `ready`, PostgreSQL reported ready.
- Frontends 8083/8084: HTTP 200. API readiness não substitui diagnóstico de migrações ou consulta ao banco; nenhuma foi feita nesta parte.
- CDP sintético visual: PASS nas 10 combinações registradas em `browser-measurements.json`.
- CDP público anônimo 8083: PASS de carregamento do shell e ordem do helper; sessão de login permaneceu ausente.
- Hashes dos quatro assets em 8083: 200/MATCH.
- Browser autenticado: BLOCKED.
