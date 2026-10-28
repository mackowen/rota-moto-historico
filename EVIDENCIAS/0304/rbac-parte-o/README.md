# Campanha 0304 — Parte O: autorização do proprietário

Data: 2026-10-28. Commits locais do Restaurante: implementação `427be6461cca35d0c092f467af48021083d96628`, teste do bootstrap `88ce785295d8813c47d193cd6537a5a40c3b473f` e teste do gate MFA `38ffa32b5836743db43546f0fd9f7f6f8d2c3704`; HEAD final `38ffa32b5836743db43546f0fd9f7f6f8d2c3704` na branch `codex/campaign-0304-rbac-o`; sem push do aplicativo. Nenhuma migration, alteração de baseline ou modificação no PostgreSQL oficial nesta parte.

## Contrato esclarecido

- O bootstrap de empresa cria uma associação de empresa com papel `owner` e uma lista explícita de permissões tenant. Isso não constitui, por si só, administração global da plataforma.
- A administração global usa `platform_administrators` e bootstrap próprio, independente de `role_permissions`. A sessão informa `platformAdmin` separadamente e não mistura esse sinalizador nas permissões da empresa.
- `finance.read` e `finance.manage` são permissões empresariais explícitas; `finance.manage` exige MFA na guarda central. `finance.read` não exige MFA pelo contrato atual.
- Criação/edição de perfis delegáveis limita o administrador às permissões que ele mesmo possui. O papel `owner` e templates de sistema não podem ser editados pelo formulário genérico; associação própria também é protegida.

## Causa provável e limite de diagnóstico

A migration 0052 insere `finance.read`/`finance.manage` ao selecionar papéis empresariais que já têm `company.manage`. A migração não configura `app.tenant_id`; as tabelas tenant relevantes usam RLS forçado, e `rotamoto_migrator` não tem bypass. Por isso, o backfill pode ter visto zero papéis e deixado owners criados antes da 0052 sem as duas permissões. Em contraste, `provisionInitialOwner` inclui as permissões financeiras para owners provisionados pelo código atual.

Essa causa é comprovada no contrato/código e reproduzida no E2E sintético. **Não foi possível confirmar a linha de papel/permissões da conta real:** consultas READ ONLY feitas como `rotamoto_auditor` não têm privilégio de SELECT nas tabelas tenant de identidade/RBAC. A conexão oficial não foi contornada nem usada com outra credencial. Assim, o diagnóstico da conta real fica PARTIAL; não houve alteração direta de seus privilégios.

## Correção

Configurações agora apresenta grupo “Financeiro” com descrições simples para os dois acessos delegáveis, desde que o solicitante já possua cada permissão. O perfil owner continua protegido contra edição/remover acessos essenciais. Quando o próprio perfil owner ativo não tem uma ou ambas as permissões, `company.manage` permite ao proprietário solicitar, manualmente, restauração somente de `finance.read` e `finance.manage` para aquele papel e empresa. A ação exige MFA central, CSRF, sessão autenticada, confirmação explícita, transação e registro de auditoria; é idempotente e não concede acesso global. Usuários comuns e papéis não-owner recebem `FORBIDDEN`. A ação não foi acionada contra a conta real.

## Validação e gates

- Sintaxe dos módulos backend/UI e `git diff --check`: PASS.
- `tests/test-identity-ui.js`: PASS; categoria, rótulos e proteções conferidos pelo contrato de UI.
- `tests/test-platform-admin-http.js`: PASS; administração global permanece separada de papel empresarial, com MFA/CSRF.
- `tests/test-identity-http-postgres.js` em `rotamoto_e2e`: PASS; owner criado pelo bootstrap atual recebe os dois grants explicitamente; proprietário tenant sem grants não herda admin global, `finance.read` é negada antes do grant, `finance.manage` exige MFA verificado, restauração restrita é idempotente, sessão reflete grants, perfil owner genérico é imutável e papel não-owner é recusado. Fixture executada em transação E2E com rollback.
- Browser QA visual em Chromium/CDP: BLOCKED/PARTIAL. O runner iniciou Chromium mas não produziu resultado observável antes de ser encerrado pelo runtime; não há captura nem aprovação visual. Não se declara validação de ponta a ponta no browser.
- Diagnóstico de identidade/permissões da conta real no banco oficial: BLOCKED por falta de SELECT autorizado nas tabelas tenant; não houve leitura alternativa nem escrita.

| Gate | Estado | Evidência/limite |
|---|---|---|
| Distinção entre fundador, admin global e owner empresarial | PASS no contrato de código/teste | `test-platform-admin-http.js`, `test-identity-http-postgres.js` |
| Delegação financeira em papéis editáveis | PASS por contrato automatizado; visual PARTIAL | teste UI e rótulos; Browser QA não concluído |
| Proteção e reparo explícito do owner empresarial | PASS em E2E sintético | MFA, CSRF, owner-only, tenant-scoped, idempotente e auditado |
| Conta real e grants efetivos | BLOCKED | auditor sem SELECT tenant; nenhuma alteração real |
| Relatórios autenticados no browser real | BLOCKED/PARTIAL | runner CDP sem resultado; conta de teste anterior exigiu MFA não satisfeita |
| G14 | FAIL | requer aprovação visual expressa do proprietário |

G14 permanece FAIL; Campanha 0304 aberta; backlog desde 0257 preservado; Campanha 0305 não iniciada. A leitura READ ONLY anterior registrou migration 0055; esta parte não reaplicou migrations. `rotamoto_e2e` foi usado apenas para testes transacionais e o harness executa rollback; nenhum novo banco foi criado.
