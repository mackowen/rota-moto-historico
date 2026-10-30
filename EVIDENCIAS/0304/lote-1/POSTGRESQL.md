# PostgreSQL — Lote 1

| Banco | Conexão de leitura | Ledger | Ação de schema |
|---|---|---|---|
| `rotamoto_e2e` | `rotamoto_migrator` em loopback | 61, `0061_platform_admin_permission_reason_null_guard`; runner `status --e2e` validou checksums | Nenhuma migration aplicada/criada |
| `rotamoto` | `rotamoto_migrator` em loopback | 61, mesmo último ID; runner `status` validou checksums | Nenhuma migration aplicada/criada |

Checks de founder após testes no E2E: user count 1; company count 0; grant global ativo count 1; grant coincide com latch; ledger 61. O founder permaneceu preservado. A ausência de empresa/membership impede comprovação do contexto empresarial e requer diagnóstico/autorização específica antes de regularização.

`test-postgres-migrations.js` foi corretamente bloqueado pelo guard: essa suíte exige alvo descartável, não o E2E persistente. Não se contornou o guard e nenhum banco foi criado. Os testes transacionais aplicáveis foram executados individualmente.
