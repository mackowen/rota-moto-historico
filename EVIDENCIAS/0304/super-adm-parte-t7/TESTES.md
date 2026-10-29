# Testes e gates

- Restaurante `npm test` (inclui `assets:check`): PASS integral após a alteração.
- Motoboy `npm test`: PASS; sem alteração no app.
- `npm run assets:check` em ambos: PASS.
- `test-platform-admin-request.js`: PASS (timeout, abort, cancelamento, sucesso).
- `test-platform-admin-ui.js`: PASS (contratos por DTO, geração de request, navegação, layout).
- `test-platform-admin-http.js`: PASS (MFA/RBAC/CSRF e payloads sintéticos válidos de usuários/vínculos).
- `test-platform-admin-postgres-e2e.js`: PARTIAL seguro; leu estado persistente, confirmou exatamente um grant ativo associado ao founder latch e negativas globais/financeiras sem sessão; positivo MFA autenticado não executado.
- `migrate.js status --e2e`: confirmou migrations/checksums registradas de 0001 a 0061; comando de status, sem aplicar migration. Banco oficial não consultado nesta parte.
- Harness CDP sintético: PASS 10/10 tema/viewport; autenticação: BLOCKED.
- API 8787 readiness 200; sites 8083/8084 HTTP 200; endpoints protegidos sem sessão 401 esperado.
- `node --check` dos JS alterados, `git diff --check`: PASS.

Hashes SHA-256 verificados por HTTP 8083 contra o checkout commitado: `identity-ui.js` `bc603067953746271d29fbeb5fdf4032f8e37c6903cb55b58b949077985b8a5e`; `identity-ui.css` `eb232356da6d7dd430c73a5759c8c7bd926c217a4e03152666f995f381e7ed36`; `platform-admin-request.js` `3bfaee6419dfa8f4a0f31b0ec66cf6feafe7e5d617e495e5d08dd08e680f222d`. Shell público carregou ambos helpers com HTTP 200; o app permaneceu oculto por ausência de sessão.
