# Campanha 0304 — Parte P: bootstrap e permissões

Data: 2026-10-28. Evidências sanitizadas; nenhuma credencial, token, OTP, email ou identificador pessoal incluído.

## Gates

| Área | Estado | Evidência / limite |
|---|---|---|
| Contrato bootstrap owner vs fundador global | PASS | Owner é papel empresarial por tenant; administração global é mecanismo explícito separado da migration 0048. |
| Conta autenticada E2E fornecida | PASS (diagnóstico) | Login/sessão 200; MFA satisfeito; tenant esperado; membership ativa; role `owner`; `company.manage` true; grants `finance.read` e `finance.manage` ausentes no papel e sessão; `platformAdmin` false. Sessão encerrada; nenhum grant alterado. Não prova criação histórica nem estado da conta oficial. |
| Conta PostgreSQL oficial | BLOCKED | `rotamoto_auditor` sem SELECT em `memberships`, `roles`, `role_permissions`, `users`, `platform_administrators`. Somente leitura; nenhum bypass ou credencial alternativa. Migration 0052 registrada; sua falha de backfill sob RLS é hipótese para a conta real. |
| Mensagem de vínculo operacional | PASS | Removida a inferência de vínculo Motoboy baseada apenas em grants de sincronização; estados de membership e `driverId` ficam separados. |
| Avisos duplicados em Relatórios | PASS | Renderização evita repetir o aviso financeiro nos cards executivos/detalhados. |
| Ajustes e autorização | PASS automatizado | Testes de interface e persistência; E2E de identidade e administrador em transações revertidas. Não equivale a Browser QA visual. |
| Browser QA autenticado | BLOCKED | Nenhuma captura ou inspeção visual verificável obtida nesta rodada; não se declara aprovação visual. |
| Banco/schema oficial | PASS sem escrita | Nenhuma migration, escrita, grant, backup, chave ou banco adicional; PostgreSQL oficial consultado somente em leitura. |

## Causa e correções

A sessão E2E refletia corretamente os grants ausentes no papel. MFA e contexto empresarial estavam corretos; não foi observado defeito de propagação de sessão. O bootstrap atual adiciona grants financeiros a novos owners. Migration 0052 tenta backfill nos papéis empresariais sem contexto de tenant, sob RLS forçado; pode ter deixado owners antigos sem grants, mas a conta oficial não pôde ser consultada para provar isso.

A UI de membros chamava “Aguardando vínculo operacional” a situação de sync.pull/sync.push sem Driver associado. Esse texto confundia grants/sincronização com associação de Motoboy e foi substituído por estados explícitos. Relatórios remove a repetição de avisos de acesso financeiro. Nenhuma permissão real foi concedida e nenhuma arquitetura de segurança foi enfraquecida.

## Testes

PASS: `node tests/test-analytics-view.js`; `node tests/test-identity-ui.js`; `node tests/test-company-settings.js`; `node tests/test-company-settings-persistence.js`; `node tests/test-platform-admin-http.js`; `node tests/test-identity-http-postgres.js` em `rotamoto_e2e`; `node tests/test-platform-admin-postgres-e2e.js` em `rotamoto_e2e`. Os dois últimos testes PostgreSQL usam transações/rollback. Também passaram `node --check` nos scripts alterados e `git diff --check`.

## Pendências e continuidade

- Confirmar por consulta autorizada somente leitura o vínculo e grants da conta proprietária no `rotamoto` oficial.
- Completar Browser QA autenticado de Ajustes/Relatórios; testes automatizados não substituem inspeção visual.
- Tratar hipótese do backfill 0052 somente após confirmação oficial e autorização específica para qualquer reparo.
- G14 continua FAIL; Campanha 0304 permanece aberta; backlog desde 0257 preservado; 0305 não iniciada.
