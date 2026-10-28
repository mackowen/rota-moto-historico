# Parte R — pré-validação da regularização do fundador no E2E

Data: 2026-10-28. Resultado da concessão: **BLOCKED**, interrompida antes de qualquer escrita. Banco solicitado e validado: `rotamoto_e2e`; `rotamoto` não foi acessado.

## Pré-validação READ ONLY

- Conexão validada: `current_database=rotamoto_e2e`; sessão como `rotamoto_migrator`; role sem superuser e sem `BYPASSRLS` — **PASS**.
- `migrate.js status --e2e`: migrations 0001–0061 aplicadas; status confere checksums antes de reportar — **PASS**.
- Busca por email normalizado: uma conta, verificada e ativa — **PASS**. O identificador e o email não são registrados aqui.
- Usuários: 1 total — leitura completa (tabela sem RLS).
- Administradores globais: 0 ativos, 0 registros históricos; latch de fundador sem reivindicação — **PASS**, leitura completa (tabelas sem RLS).
- Empresas e memberships: consulta retornou 0 linhas visíveis sem contexto tenant, mas ambas as tabelas têm RLS **FORCE**. Portanto, a contagem global de empresas e a membership `owner` da conta **não puderam ser comprovadas**. Nenhum bypass ou impersonação de tenant foi usado — **BLOCKED**.
- Autorização/histórico: um grant/capability de bootstrap consumido; latch da instalação completo com digest não-zero. Um registro de provisionamento corresponde à identidade pesquisada e ao digest concluído da instalação. Porém o status membership/role e a empresa ativa correspondente não puderam ser confirmados por causa do RLS forçado — prova suficiente para executar a função oficial **BLOCKED**.
- MFA: fator configurado e requerido — **PASS**; sessões ativas com `mfa_verified_at` nos últimos 15 minutos: 0 — autenticação recente **BLOCKED**. A tabela de sessões não tem RLS; a ausência foi confirmada sem ler token/código.

## Mecanismo e decisão

As migrations 0056–0058 estão aplicadas e o código da função oficial exige que a identidade corresponda ao bootstrap original e a uma membership `owner` ativa; regularização usa latch transacional e auditoria `founder.created`. Migrations 0059–0061 preservam controles escopados, MFA, auditoria e validação de permissões. A autorização expressa desta Parte R identifica a conta pretendida, mas não substitui os gates exigidos aqui: owner ativo e autenticação/MFA recente.

A função `platform_admin_bootstrap_founder` **não foi chamada**. Nenhuma grant, membership, role, permissão ou sessão foi modificada. Não houve tentativa de contornar RLS, editar tabelas diretamente, alterar MFA ou conceder acesso a outra conta.

## Gates

| Gate | Estado |
|---|---|
| Banco E2E e ledger/checksums 0001–0061 | PASS |
| Conta única, verificada e ativa | PASS |
| Contagem real de empresas e vínculo `owner` | BLOCKED por RLS FORCE sem membership autenticada |
| Prova de membership owner ativa e empresa ativa | BLOCKED |
| Registro de provisionamento/digest associado ao bootstrap | PASS restrito; não prova membership atual |
| MFA configurado/requerido | PASS |
| Sessão recente com MFA | BLOCKED (0 sessões elegíveis nos últimos 15 min) |
| Conflito/outro administrador global | PASS (nenhum registro global encontrado) |
| Concessão/auditoria/post-validation | BLOCKED (nenhuma concessão) |
| Browser QA do console Super ADM | BLOCKED (sem grant e sem sessão elegível) |
| `rotamoto` fora do escopo | PASS (não conectado nem consultado) |

## Regressão de cache

`sw.js` declara cache `v147`. Quatro testes ainda esperavam `v144` ou assets antigos (`styles.css?v=0304.21`, `app.js?v=0304-finance-h.1`). As asserções foram alinhadas às referências atuais (`v147`, `styles.css?v=0304.22`, `app.js?v=0304-reports-n.2`). `test-dashboard-v2.js` isolado passou; a suíte avançou além dos testes de Dashboard, offline/printing e QR, mas terminou em `tests/test-cross-app-contract-parity.js`: os dois repositórios têm conteúdo diferente em `CONTRACT.md`. Nenhum dos dois contratos foi alterado nesta parte; não sincronizei os arquivos, preservando as alterações do Motoboy. A falha permanece **PARTIAL/fora do escopo**, sem aprovação da suíte completa.

Sem migrations, criação de banco, backup, chave, concessão ou alteração em `rotamoto`. Nenhuma evidência inclui credenciais, tokens, códigos MFA, valores financeiros ou identificadores pessoais. Parte R permanece **BLOCKED** para regularização. G14 **FAIL**, Campanha 0304 aberta, backlog desde 0257 preservado, 0305 não iniciada.
