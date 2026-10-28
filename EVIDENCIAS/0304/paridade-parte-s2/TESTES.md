# Testes e comandos

| Verificação | Resultado |
|---|---|
| `npm test` Restaurante | PASS integral; `pretest` `assets:check` PASS |
| `npm test` Motoboy | PASS integral; `pretest` `assets:check` PASS |
| `npm run test:e2e-platform-admin` | negação sem sessão PASS; first-install NOT EXECUTED; MFA positivo real NOT EXECUTED; sem impersonação |
| `test-identity-postgres.js` | PASS |
| `test-identity-http-postgres.js` | PASS para E2E persistente, segundo bootstrap negado, fixtures revertidas; ramo primeira instalação NOT EXECUTED |
| `test-tenant-rls-isolation-e2e.js` | PASS, duas empresas temporárias criadas, isolamento testado e remoção exata/zero residual verificados |
| `npm run test:logistics-postgres` | PASS com rollback informado |
| `test-domain-sync-postgres.js` | PASS, sem commit e zero residuals |
| `test-cross-app-contract-parity.js` | PASS nas duas suítes `npm test` |
| `npm run assets:check` nos dois apps | PASS via pretest e execução do runner após os testes |
| `git diff --check` | PASS |
| Runner `migrate.js status` principal/E2E | 0001–0061 aplicadas, checksums válidos |
| API `/health/ready` oficial/E2E | HTTP 200 / HTTP 200 |
| `test-postgres-migrations.js` | NOT EXECUTED; guard bloqueia suite de rollback/limpeza sem DB descartável, antes de conexão |

Nenhum teste não executado foi contado como PASS. Veja `CLASSIFICACAO-TESTES.md` para A/B/C/D por arquivo.
