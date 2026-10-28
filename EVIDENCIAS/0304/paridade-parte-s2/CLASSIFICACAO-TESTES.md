# Classificação dos cinco testes solicitados

Legenda: A = compatível com estado persistente; B = instalação vazia; C = sessão autenticada com MFA real; D = fixtures/transação.

| Arquivo | Classe | Executado | Resultado honesto |
|---|---|---|---|
| `tests/test-identity-http-postgres.js` | A, B, D | A/D no E2E persistente | PASS para sessão, CSRF, tenant/RLS, MFA recovery, grants, convite, limite e erros; segundo bootstrap recebe 403 sem tocar no founder. Ramo B de first-claim/replay: **NOT EXECUTED**; o próprio output nomeia essa pendência. Fixtures HTTP transacionais revertidas e ausência do usuário sintético confirmada. |
| `tests/test-integrated-founder-bootstrap-postgres.js` | A, B, D | preflight A; B/D positivos não executados | **NOT EXECUTED** para first-claim, replay e segundo owner porque depende de instalação vazia. Read-only preflight confirma um grant ligado ao founder/latch. Sem reset. |
| `tests/test-integrated-founder-bootstrap-service-postgres.js` | A, B, D | preflight A; B/D positivos não executados | **NOT EXECUTED** para first owner/replay/segundo owner sem grants porque depende de instalação vazia. Sem reset. |
| `tests/test-platform-admin-postgres-e2e.js` | A, B, C, D | A negativo; positivo B/D não executado; C não executado | PASS para negação runtime de listagem/financeiro sem sessão e preservação do grant. Operações MFA positivas com sessão real: **NOT EXECUTED**. Fixtures de bootstrap/admin da branch limpa são transacionais, mas não foram usadas no E2E persistente. |
| `tests/test-tenant-rls-isolation-e2e.js` | A, D | completo | PASS para catálogo/policies/ACL e isolamento de dois tenants. Fixtures usam UUIDs verificados ausentes, transações, remoção por IDs/nome/role exatos e verificação zero residual. Nenhum tenant existente foi removido. |

## Outros testes PostgreSQL executados

- `tests/test-identity-postgres.js`: PASS, testes em transação revertida.
- `tests/test-logistics-e2e-postgres.js`: PASS, a suíte reportou rollback.
- `tests/test-domain-sync-postgres.js`: PASS, `databaseCommitted:false`, cleanup concluído, zero residuals.
- Teste schema/RLS read-only integrado ao teste tenant: PASS.
- `tests/test-postgres-migrations.js`: execução registrada como **NOT EXECUTED**; o guard recusou a suíte antes de conexão porque ela roda DOWN/limpeza e não há banco descartável autorizado. Não foi contado como PASS.

Os cenários B e C pendentes não bloquearam MIG-0056-0061, conforme gate específico solicitado; seguem pendentes de infraestrutura/sessão própria.
