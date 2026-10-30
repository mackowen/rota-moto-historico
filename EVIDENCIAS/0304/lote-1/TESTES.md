# Testes e resultados — Lote 1

| Verificação | Resultado | Evidência/limite |
|---|---|---|
| Restaurante `npm test` | PASS na execução final isolada após a correção do teste E2E | Suíte integral concluiu com exit 0, incluindo os testes de configuração, sessão, RBAC, PWA, integração, diálogos, despacho e contratos. |
| Motoboy `npm test` | PASS | Suíte integral concluiu com exit 0; inclui contratos compartilhados e topbar T.13. |
| `assets:check` Restaurante/Motoboy | PASS | Execução explícita em ambos; `npm test` também executa pretest. |
| `test-identity-postgres.js` | PASS | E2E com transação/rollback; identidade, credencial sintética, recuperação, sessão, CSRF, RBAC e tenant. |
| `test-identity-http-postgres.js` | PASS / PARTIAL | Sessão, MFA, CSRF, tenant/RLS, permissões, convites, rate limit e erros passaram; bootstrap first-install não executado pois founder persiste. |
| `test-domain-sync-postgres.js` | PASS | API/PostgreSQL, sincronização, revisão e readback; fixture retirada e resíduos zero. |
| `test:e2e-lifecycle` | PASS após correção | Dois logins de fixture, MFA, disponibilidade e sync; rollback/cleanup. |
| `test:e2e-tenant-isolation` | PASS | 55 tabelas, 40 FORCE RLS, ACL e isolamento; fixtures removidas e ausência verificada. |
| `test:e2e-platform-admin` | PARTIAL | Denials globais/financeiros e preservação do founder passaram; positivo MFA-autenticado não executado por ausência de sessão legítima. Bootstrap vazio também não executado. |
| `test:postgres` agregado | BLOCKED pelo guard | A primeira suíte exige alvo descartável para rollback/cleanup; guard recusou `rotamoto_e2e` persistente. Testes individuais seguros foram executados separadamente. |
| Runner migration `status --e2e` e oficial `status` | PASS | Ambos aplicados até 0061; o runner validou checksums sem mudança de schema. |
| Browser QA anônimo | PASS limitado | Chromium isolado, 390×844 e 1440×900, claro/escuro nos dois apps; sem overflow horizontal nas medições estáveis, capturas em `browser/`. 401 em `/api/identity/session` foi esperado sem login. Não equivale a QA autenticado. |
| `git diff --check` | PASS | Restaurante e histórico após edição; Motoboy sem alteração. |

## Falha de harness corrigida

`tests/test-postgres-e2e-lifecycle.js` assumia `body.availability` em uma consulta GET. O contrato atual retorna `body.records[]`; o teste agora seleciona pelo `driverId` da fixture e continua assertando estado online/offline, revisão e reconciliação. Resultado direcionado: `E2E fixture lifecycle: PASS`.

A execução repetida do script público Browser QA antigo produziu capturas/medições, mas terminou com `ENOTEMPTY` ao limpar perfil temporário. Foi feita nova execução isolada com limpeza limitada/retry; ela concluiu exit 0. Não houve alteração do repositório Browser QA.
