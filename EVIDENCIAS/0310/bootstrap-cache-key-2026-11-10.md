# Evidências — Cache do Bootstrap E2E (0310)

- `npm run assets:sync`: atualizou a versão do script para `14dd2ade9d51b7d2`, hash do HTML no manifest e cacheName.
- `npm run assets:check`: PASS.
- `curl http://127.0.0.1:8083/bootstrap.html`: script tag retornou `bootstrap-wizard.js?v=14dd2ade9d51b7d2`.
- Chromium headless via CDP, URL `http://127.0.0.1:8083/bootstrap.html`, viewport 390×844: `target=Bootstrap E2E · autorização local`, comando copiado `cd "$HOME/projetos/repos/rota-moto-restaurante" && npm run bootstrap:prepare-browser:e2e`, `copyResult=PASS`, overflow falso, sem erros JS/HTTP.
- `node tests/test-e2e-browser-bootstrap-cli.js`: PASS; `npm run test:e2e-guards`: PASS; `git diff --check`: PASS.
- Nenhuma autorização foi emitida e nenhum dado foi gravado.
