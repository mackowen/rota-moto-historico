# Evidências — recuperação das APIs e auditoria runtime — 2026-11-09

## Configuração e rotas

| Origem | Front door | Upstream | Resultado |
|---|---:|---:|---|
| Restaurante oficial | 8081 | API 8788 | live 200; ready 200 |
| Motoboy oficial | 8082 | API 8788 | live 200; ready 200 |
| Restaurante E2E | 8083 | API 8787 | live 200; ready 200 |
| Motoboy E2E | 8084 | API 8787 | live 200; ready 200 |

`/health/ready` nas portas diretas 8787 e 8788 devolveu `{"status":"ready","dependencies":{"postgres":"ready"},...}`. `sv status rotamoto-api-official rotamoto-api-e2e nginx` manteve os três serviços em `run` após mais de nove minutos de observação.

O serviço oficial usa `.rotamoto-private/official-api/runtime.env`, derivado de `deploy/termux/official-api.env.example`, modo 0600; keystore/master key oficiais novos existem, sem credenciais SMTP ou marketplace. O E2E usa `.rotamoto-private/e2e/{keystore,keys/master.key}`; a chave de QR foi gerada e armazenada cifrada com novo `kid=e2e-recovery-20261109` e uma nova referência `local-v1` (valor omitido neste histórico). Permissões verificadas em 0700/0600. `.gitignore` exclui toda a raiz privada e `git check-ignore` confirmou runtime, master key e screenshots.

Não há backup conhecido das chaves antigas. O novo runtime deixa as APIs processualmente saudáveis, mas não recupera segredos de negócio nem valida QRs emitidos anteriormente.

## Testes reproduzíveis

- `npm test` — Restaurante, suite completa, exit 0.
- `node tests/test-e2e-secret-store-config.js` — PASS.
- `node tests/test-official-api-runtime.js` — PASS.
- `npm run test:e2e-guards` — PASS.
- `npm run test:logistics-postgres` — PASS; rollback.
- `npm run test:territorial-postgres` — PASS; rollback.
- `node tests/test-cross-app-contract-parity.js` — PASS.
- Round-trip sintético QR Ed25519 via provider filesystem — PASS.
- `sh -n deploy/runit/rotamoto-api-official/run` e `sh -n deploy/runit/rotamoto-api-e2e/run` — PASS.
- `nginx -t` — PASS.

## Browser público

Chromium instalado no Termux controlado por CDP (`chrome-remote-interface`), sem Playwright. URLs `http://127.0.0.1:8083/` Restaurante E2E e `http://127.0.0.1:8084/` Motoboy E2E. Viewports desktop 1365×900 e mobile 390×844.

As quatro combinações chegaram a `document.readyState=complete/interactive`; largura de documento medida em 1365 e 390 pixels respectivamente, sem overflow horizontal. Não houve erros de console/exceções JavaScript. Uma requisição foi cancelada com `net::ERR_ABORTED` durante navegação entre URL/viewports. Capturas estão no repositório Restaurante em `.rotamoto-private/browser-audit/` e não são versionadas.

O estado público do Restaurante foi login. O Motoboy também mostrou bloqueio de autenticação/vínculo pendente e orientação de GPS sem permissão. Nenhuma sessão foi fornecida; por isso as jornadas autenticadas, localização, tiles/OSRM e rotas de rua não podem ser considerados validados por esse browser smoke. Contratos e lifecycle dos mapas passaram nos testes automatizados do app.

## Segurança e integridade

- Nenhum arquivo privado foi colocado no Git; apenas `.gitignore`, código, teste e templates de serviço foram commitados.
- Banco oficial sem escrita. Testes PostgreSQL foram limitados ao banco E2E e transações rollback.
- Sem alterações no repositório Motoboy.
- App Restaurante commit local `b21ce4c`; sem push. Histórico será publicado separadamente, sem modificar `REGISTROS/0305.md` ou `REGISTROS/0306.md`.
