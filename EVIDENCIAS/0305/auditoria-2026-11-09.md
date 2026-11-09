# Evidências — Auditoria RotaMoto — 2026-11-09

## Matriz de resultado

| Área | Resultado observado | Limite |
|---|---|---|
| Contrato Restaurante↔Motoboy | PASS: `test-cross-app-contract-parity.js` nos dois repositórios; sem divergência no contrato compartilhado normalizado | Seções específicas por app não são idênticas textualmente |
| Banco oficial ↔ E2E | PASS: comparação read-only de schema/security e checksums; ambos em `0071_identity_login_company_options` | ACL de trigger é exceção explícita e testada |
| Regressões dos apps | PASS: `npm test` completo em ambos | Suítes não substituem fluxo autenticado real |
| Regras logísticas e roteamento | PASS: `npm run test:logistics`; geometria e adaptadores OSRM/ORS testados | Adaptadores usam fixtures/controlados; sem chamada pública de roteamento |
| E2E de PostgreSQL logística | PASS: `npm run test:logistics-postgres`; schema transacional foi revertido | Escopo da suíte de logistics |
| Bootstrap | PASS: testes HTTP/CLI/setup/guards; `npm run test:e2e-guards`, `npm run test:bootstrap-owner` | Sem jornada operacional real com serviço de API e identidade autenticável |
| Integridade frontend/assets | PASS: `assets:check` nos dois apps, sintaxe Motoboy e teste estático do Restaurante | Sem scanner semântico dedicado para dead code |
| Responsividade pública | PASS no escopo medido: páginas e navegação em 1440, 768 e 390 CSS px; sem overflow horizontal do documento nem exceção JS | Telas operacionais autenticadas não foram alcançadas no Restaurante |
| Mapa e marcadores | Parcial: contêiner Leaflet e marcador renderizados | Chromium não carregou tiles na janela de observação; GPS ficou pendente |
| Rotas por ruas | Parcial: estado vazio e geometria canônica exercitados | Sem parada/entrega atribuída na UI; sem rota real de rua em browser |
| Backend via browser | BLOCKED pelo harness | 8788/8789 serviram arquivos estáticos; `/api/identity/session` e bootstrap/status retornaram 404 nesse servidor |
| Chrome Android físico | Pendente | Foi usado Chromium headless em Termux |

## Comandos e resultados

- `npm test` no Restaurante — exit 0.
- `npm test` no Motoboy — exit 0.
- `node tests/test-cross-app-contract-parity.js` em ambos — PASS.
- `npm run test:logistics` — PASS.
- `npm run test:logistics-postgres` — PASS; transação revertida.
- `npm run test:e2e-guards && npm run test:bootstrap-owner` — PASS.
- `npm run check && npm run assets:check` no Restaurante — PASS.
- No Motoboy: `node --check app.js`, `node --check contract.js`, `node --check service-worker.js`, `npm run assets:check` — PASS. Não existe script npm `check`.
- Auditoria de metadados: `NODE_ENV=test ROTAMOTO_AUDIT_DATABASE_URL=postgresql://rotamoto_auditor@127.0.0.1:5432/rotamoto E2E_RUNTIME_DATABASE_URL=postgresql://rotamoto_app@127.0.0.1:5432/rotamoto_e2e E2E_MIGRATOR_DATABASE_URL=postgresql://rotamoto_migrator@127.0.0.1:5432/rotamoto_e2e node tests/test-postgres-e2e-security-parity.js` — PASS; oficial em transação somente leitura.
- Browser/CDP em `http://127.0.0.1:8788/` e `http://127.0.0.1:8789/`; páginas e navegação pública inspecionadas em 1440×900, 768×1024 e 390×844. Sem exceção JS; 404 foram do servidor estático sem APIs.

## Segurança e integridade

Nenhuma credencial ou dado pessoal foi colocado neste relatório. Não houve escrita no banco oficial, alteração em configuração global/Termux, deploy, envio de e-mail ou publicação dos apps. Os testes temporários de browser ficaram fora dos repositórios. Nenhuma correção foi aplicada por não haver causa de código confirmada.
