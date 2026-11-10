# Evidências — Bootstrap E2E e comando de cópia (0309)

- Serviço E2E reiniciado via runit (`rotamoto-api-e2e`).
- `GET http://127.0.0.1:8081/api/identity/bootstrap/status`: `state=ready`, `checks.localOnlyBootstrapAvailable=true` (alvo oficial implícito).
- `GET http://127.0.0.1:8083/api/identity/bootstrap/status`: `target=e2e`, `state=ready`, `checks.localOnlyBootstrapAvailable=true`.
- Chromium headless + Chrome DevTools Protocol: `http://127.0.0.1:8083/bootstrap.html`, viewport móvel 390×844. Resultado capturado: `Bootstrap E2E · autorização local`, comando `cd "$HOME/projetos/repos/rota-moto-restaurante" && npm run bootstrap:prepare-browser:e2e`, botão `Copiar comando E2E`, `copyResult=PASS`, `overflow=false`, `errors=[]`, `badResponses=[]`.
- Screenshot bruto: `/data/data/com.termux/files/home/projetos/repos/rota-moto-restaurante/.rotamoto-private/e2e/bootstrap-copy-qa.png` (privado/ignorado no Git; permanece dentro do repositório do app).
- Suítes: `npm run test:e2e-guards` PASS; testes de status HTTP, modo local-only e CLI oficial/E2E PASS; `git diff --check` PASS.
- Não executado: emissor de autorização. Não houve escrita em `rotamoto` ou `rotamoto_e2e`.
