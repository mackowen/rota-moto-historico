# Testes realizados

| Teste/comando | Alvo | Resultado |
|---|---|---|
| `npm test` | Restaurante | PASS integral; pretest `assets:check` também PASS |
| `npm test` | Motoboy | PASS integral; pretest `assets:check` também PASS |
| `test-identity-postgres.js` | `rotamoto_e2e` / role runtime; rollback | PASS |
| `test-identity-http-postgres.js` | E2E; auth/MFA/CSRF/RLS e bootstrap preservado | PASS |
| `npm run test:e2e-platform-admin` | E2E | processos exit 0; negatives PASS, founder/bootstrap positives PARTIAL por sessão/estado persistente |
| `npm run test:logistics-postgres` | E2E | PASS, transação revertida |
| `test-domain-sync-postgres.js` | E2E | PASS; `databaseCommitted:false`, residuals 0 |
| `test-tenant-rls-isolation-e2e.js` com `ROTAMOTO_RLS_SCHEMA_ONLY=1` | E2E, somente leitura | PASS para catálogo/roles/policies/ACL; fixtures/data-plane desta suíte não executados |
| `test-cross-app-contract-parity.js` | ambos | PASS |
| `test-sw-atomic-install.js` | Restaurante | PASS |
| `test-service-worker-atomic-install.js` | Motoboy | PASS |
| Probe temporário de manifest versioning | ambos, cópias isoladas | PASS; cache name alterado após byte-change e check regenerado |
| `git diff --check` | Restaurante | PASS |

## Não executados / limites

- Full browser QA autenticado, sessão Super ADM positiva, operação com MFA recente e persistência de Configurações através de browser: BLOCKED pela falta de sessão autenticada autorizada.
- Full tenant data-plane `test-tenant-rls-isolation-e2e.js` não executado: a versão padrão cria e retém tenants/roles sintéticos; não introduzir persistência duradoura adicional nesta execução. Os testes de identity HTTP e domain sync exerceram isolamento com rollback.
- Migrations 0056–0061 no principal: não executadas porque DB-01 não está PASS.
