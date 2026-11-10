# Evidências — SMTP externo no Bootstrap E2E (0312)

- `POST /api/identity/bootstrap/smtp/validate` com body vazio, origem local e sem token/autorização: 8081 → HTTP 403 `PROVISIONER_UNAUTHORIZED`; 8083 → HTTP 404 `NOT_FOUND`. Nenhum envio SMTP é associado à validação e nenhum segredo foi usado.
- `node tests/test-bootstrap-smtp-http.js`: PASS; a suíte mantém E2E sem rota SMTP externa.
- Chromium + CDP na página `http://127.0.0.1:8083/bootstrap.html`, viewport 390×844: navegação por Diagnóstico 1/8, Administrador 2/8 e dados sintéticos de teste até E-mail 6/8. Tela mostra que SMTP externo não está habilitado no E2E, nenhum formulário/botão SMTP foi renderizado e nenhuma requisição SMTP ocorreu. Continuar habilitado; sem overflow/erros JS/HTTP.
- `npm run assets:check`, `node --check bootstrap-wizard.js`, `git diff --check`: PASS.
- Não houve credencial real, autorização, configuração salva ou e-mail enviado.
