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

## Paridade HTTP depois dos commits

Leitura SHA-256 via HTTP local confirmou que 8083 e 8084 servem exatamente os arquivos locais; todas as respostas foram HTTP 200, sem transformação/compressão observada no corpo comparado.

| App | Arquivo | SHA-256 | Estado |
|---|---|---|---|
| Restaurante | `dialog-service.js` | `da82b77f2dc0866c67feeefc95ee02995cda3a35725a35149991eb63f3a38c92` | MATCH |
| Restaurante | `dialog-service.css` | `c6810acf999235b8c0dd73ee8db510f8f6caf4dca68381137bf8b326bca40b29` | MATCH |
| Restaurante | `identity-ui.js` | `48fb51504b432b923c1d5c6b353d089c20a8a2ab8029fa99aa5d1ce0e4fda68d` | MATCH |
| Restaurante | `identity-ui.css` | `7a0688198d457237f028dc97a2ad9ea0e844777d809187b239ec13aa0ee6a61b` | MATCH |
| Restaurante | `asset-manifest.js` | `08ac674f0e600566345890676750c6a138b613e3747def048157e9a3b8bb5856` | MATCH |
| Motoboy | `dialog-service.js` | `da82b77f2dc0866c67feeefc95ee02995cda3a35725a35149991eb63f3a38c92` | MATCH |
| Motoboy | `dialog-service.css` | `c6810acf999235b8c0dd73ee8db510f8f6caf4dca68381137bf8b326bca40b29` | MATCH |
| Motoboy | `identity-ui.js` | `e827465d81ce50907c5fb53f0ccdc3986641491a4e260b6cfcc38cc7981865cd` | MATCH |
| Motoboy | `identity-ui.css` | `1580231216f6dd15f1c23af8898a3a745c13b092baa7c5e628f97824a1b9a941` | MATCH |
| Motoboy | `asset-manifest.js` | `197ffee7cc231f602a3af8db46e862d7c687a1403ddb4d73d6c8ce61241f808d` | MATCH |
