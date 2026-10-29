# Testes — Parte T.12

## Restaurante

- `npm test` — PASS (suíte completa; inclui UI identity, permissões, requests Super ADM, diálogos, navegação, segurança, contratos, logística e PWA).
- `npm run assets:check` — PASS.
- `node --check app.js`, `identity-ui.js`, `admin-form-dialog.js` — PASS.
- `node tests/test-identity-ui.js` — PASS.
- `node tests/test-mobile-more-navigation.js` — PASS.
- `node tests/test-platform-admin-ui.js` — PASS.
- `node tests/test-platform-permission-catalog.js` — PASS.
- `node tests/test-platform-admin-request.js` — PASS.
- `node tests/test-dialog-service-contract.js` — PASS.
- `node tests/test-cross-app-contract-parity.js` — PASS.
- `git diff --check` — PASS.

## Motoboy

- `npm test` — PASS (suíte completa).
- `npm run assets:check` — PASS.
- `git diff --check` — PASS; nenhum arquivo foi alterado.

## Ambiente e browser

- `http://127.0.0.1:8083/` — HTTP 200; `http://127.0.0.1:8787/health` — HTTP 200.
- `http://127.0.0.1:8084/` — HTTP 200; `http://127.0.0.1:8788/health` — HTTP 200.
- CDP com perfil temporário: modal real exercitado em 320×700, 390×844, 768×1024, 1024×768 e 1440×900, tema claro/escuro. 10/10 PASS para foco, acessibilidade, contenção de largura, cancelar, confirmar descarte/reset e restaurar foco. Sem erros da página ou respostas 5xx.
- Shell 8083 aberto anonimamente; componente e cliente de identidade carregados, login presente. Nenhuma seção autenticada foi apresentada como validada.
- SHA-256 servido/local de `admin-form-dialog.js`: `955bb9b9003ee7a5f6369200dfd421f3c9ff6044e3d8b8bc206597d0c0a8f686` (MATCH). O index HTTP referencia sua versão atual do manifesto.

## Limites

Sem sessão autorizada no Chromium, fluxos de criação/edição persistidos, MFA, CSRF, RBAC com identidade real e QA autenticado no Chrome Android não foram executados. Os testes de contrato e UI não substituem esses testes. Nenhum banco foi consultado ou alterado; migration 0061, fundador e grants foram preservados.
