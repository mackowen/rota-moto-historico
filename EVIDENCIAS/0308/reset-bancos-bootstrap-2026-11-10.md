# Evidências — reset de bancos para bootstrap — 2026-11-10

## Alvos

| Banco | Identidade PostgreSQL | Host | Versão | Última migration |
|---|---|---|---:|---|
| `rotamoto` | `rotamoto_migrator` | 127.0.0.1 | PG 18.0 | `0071_identity_login_company_options` |
| `rotamoto_e2e` | `rotamoto_migrator` | 127.0.0.1 | PG 18.0 | `0071_identity_login_company_options` |

Os dois bancos só tinham schemas de usuário `public` e `rotamoto`; `public` não continha tabelas. O schema `rotamoto` não contém sequences e `pg_largeobject_metadata` retornou zero objetos nos dois alvos. Nenhum valor de usuário, empresa, credencial ou PII foi consultado para a auditoria.

## Execução transacional

Procedimento: `backend/postgres/admin/reset-application-data.sql`.

1. APIs oficial/E2E paradas com runit.
2. `pg_stat_activity` confirmou zero conexões concorrentes em cada DB.
3. Nos dois DBs, execução com `psql -X -w -v commit_reset=false -f ...`: guard de alvo/estrutura, `TRUNCATE`, reabertura dos latches, assinatura estrutural e dados validados, `ROLLBACK` aprovado.
4. Nos dois DBs, repetição com `commit_reset=true`: `COMMIT` e mensagem `RESET COMMIT aplicado e verificado.`
5. Consultas pós-commit confirmaram ledger 71, permissões 10, empresas 0, usuários 0 e cada latch singleton disponível em estado inicial.

O verificador do SQL exige zero linhas em todas as tabelas `rotamoto` exceto `schema_migrations`, `permissions` e os dois latches singleton. A comparação antes/depois inclui relações, RLS/force RLS, donos/ACLs, índices, constraints, triggers, policies, funções, grants, migration ledger e catálogo RBAC. Nenhuma estrutura foi removida.

## Disponibilidade após reset

As APIs foram iniciadas novamente e permanecem `run`. O endpoint `/api/identity/bootstrap/status` retornou `state=ready` para o oficial (8081) e E2E (8083). No oficial: `databaseAndMigrations=true`, `pricingConfigurationAvailable=true`, `mfaKeystoreConfigured=true`, `localOnlyBootstrapAvailable=true`; SMTP e entrega de convite por email `false`. Health `/api/health/live` e `/api/health/ready` retornaram HTTP 200 via 8081, 8082, 8083 e 8084. `nginx -t` também passou.

## Semântica do “pronto para bootstrap”

“Pronto” significa latches disponíveis e tabelas operacionais vazias. O proprietário/empresa não foram provisionados automaticamente. O procedimento real pede input interativo do nome empresarial e email; entrega por email requer configurar SMTP. O fluxo local-only oficial está marcado disponível pela API. O banco E2E tem bootstrap CLI sintético separado.

Não houve backup dos dados, conforme objetivo explícito de remoção total; nenhuma alteração em roles/passwords, schemas, migrations, código ou estrutura. A auditoria e os resets E2E usam apenas checks/transações que foram revertidas até o momento do commit explicitamente autorizado.
