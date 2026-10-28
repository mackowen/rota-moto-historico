# Testes e comandos

| Verificação | Resultado | Evidência/limite |
|---|---|---|
| `npm test` Restaurante | PASS, exit 0 | inclui assets:check e asserções de diálogo, Super ADM, contratos e módulos |
| `npm test` Motoboy | PASS, exit 0 | inclui assets:check e contrato compartilhado de diálogo |
| `npm run assets:check` nos dois | PASS, como `pretest` das suítes completas | os manifests refletem novos arquivos JS/CSS |
| `node --check app.js identity-ui.js logistics-ui.js dialog-service.js` (Restaurante) | PASS | parsing dos módulos alterados |
| `node --check identity-ui.js dialog-service.js` (Motoboy) | PASS | parsing dos módulos alterados |
| `tests/test-platform-admin-http.js` (incluído em `npm test`) | PASS sintético | MFA, CSRF, rotas e auditoria; não é sessão real |
| `tests/test-platform-admin-ui.js` | PASS | DTO, distinção founder latch, escopo financeiro e proteção de perfil |
| `tests/test-dialog-service-contract.js` nos dois apps | PASS | semântica/accessibility hooks e inventário de chamadas nativas |
| Harness CDP do diálogo | PASS | interação componente real em cinco viewports; detalhes em `DIALOGOS-TESTES.md` |
| Cross-app contract parity | PASS | incluído na suíte completa dos dois apps |
| PostgreSQL escrito/consultado | NÃO EXECUTADO | nenhuma necessidade de migration/dado para estas correções; bancos preservados |
| Readiness 8787/8788 | HTTP 200 | `/health/ready` |
| HTTP 8083/8084 | HTTP 200 | frontend público; não comprova tela autenticada |
| Browser QA autenticado | BLOCKED | nenhuma sessão legítima disponível no CDP; sem repetição de 401, leitura de cookies ou MFA falso |
| Tema escuro do Super ADM real | BLOCKED | tela exige sessão autenticada; CDP sintético cobriu layout do diálogo, não console |
| `git diff --check` nos dois apps | PASS | sem whitespace errors |
