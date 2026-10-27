# Campanha 0304 — Parte L.2: aplicação direta de 0048–0055

Data: 2026-10-27 UTC. Execução `0304-l2-20261027T140334Z`. **Resultado técnico: PASS — PostgreSQL `rotamoto` atualizado até 0055.** G14 **FAIL**, Campanha 0304 aberta/PARTIAL, 0305 não iniciada; backlog desde 0257 preservado.

## Autorização expressa e limites

O proprietário declarou que `rotamoto` é exclusivamente de desenvolvimento, sem dados importantes a preservar, e autorizou expressamente aplicar 0048–0055 diretamente **sem backup prévio**. Essa autorização substitui, para L.2, os gates de backup/recuperação das partes anteriores. **Não existe ponto de restauração garantido desta execução.** O artefato histórico L.1 foi preservado, mas não usado como pré-requisito nem declarado restore garantido.

Não se criou backup, chave ou banco. Nenhuma conexão ou escrita em `rotamoto_e2e`. Não se modificaram credenciais, grants fora das migrations, arquivos de migration ou baselines. Não se executou down nem rollback destrutivo. Os commits/secrets/artefatos privados não foram publicados; somente o Histórico.

## Preparação

Registros J/K/L/L.1, estado, pendências, índice e política Git consultados. Snapshot privado antes da operação preservou HEAD, branch/upstream, status, remotos e tags dos quatro repositórios.

| Repositório | HEAD inicial | Preservação |
|---|---|---|
| Restaurante | `4fcb095bae2f7f2803668207a488ccae391d20a6` | Branch `codex/campaign-0304-visual-consolidated`; limpo; HEAD/status/tags finais idênticos. |
| Motoboy | `64d2e13d8e455f48b20b32b396e9c49ba7553e0b` | `main`, limpo; HEAD/status/tags idênticos. |
| Browser QA | `57cb7745828e24d50502bec89061d2ceb59e0200` | Branch `codex/campaign-0294-admin-settings`; 1027 linhas de status preexistente preservadas exatamente. |
| Histórico | `9263e16b404f12bdb652cd72283a2f73aad43c82` | Alterado apenas para L.2 em branch própria; untracked `login-redesign-2026-10-25/` preservado. |

Tag protegida Restaurante `v5.50-ui-mobile-fix5` continua em `9ebb7098725200bdec82e79be1e9ea622fe20120`. Nenhum commit ou push de aplicativo.

Pré-voo com `rotamoto_migrator` autenticado por pgpass existente e URL sem senha, host/porta loopback exatos, transação READ ONLY: PostgreSQL 18.6, database `rotamoto`, ledger contíguo 0001–0047, 47/47 IDs/checksums iguais ao código. Exatamente oito pendentes, 0048–0055. Role sem superuser/CREATEDB/CREATEROLE/BYPASSRLS; owner do schema, CREATE e SELECT/INSERT no ledger disponíveis. Zero locks aguardando, zero outras sessões ativas. Tabelas financeiras/plataforma e coluna description ainda ausentes, sem colisão de schema.

## Aplicação real

Runner oficial intacto:

```sh
node backend/postgres/migrate.js up --through=0055_financial_reference_uniqueness
```

Execução com `NODE_ENV=production`, `MIGRATOR_DATABASE_URL` operacional exata sem senha, `PGOPTIONS` definindo lock_timeout=5s, statement_timeout=60s e idle_in_transaction_session_timeout=60s. Nenhum environment de backup foi carregado. O runner validou identidade/checksums, adquiriu seu advisory lock de sessão e executou cada migration e seu INSERT no ledger na mesma transação, em ordem, sem saltos.

| Ordem | Migration | Resultado |
|---|---|---|
| 1 | 0048_platform_administration | Aplicada |
| 2 | 0049_platform_administration_hardening | Aplicada |
| 3 | 0050_company_role_descriptions | Aplicada |
| 4 | 0051_company_role_description_runtime_update | Aplicada |
| 5 | 0052_financial_ledger | Aplicada |
| 6 | 0053_financial_event_time_independence | Aplicada |
| 7 | 0054_adjustment_event_reference | Aplicada |
| 8 | 0055_financial_reference_uniqueness | Aplicada |

Início `2026-10-27T14:03:55.872Z`, término `2026-10-27T14:03:57.028Z`, duração total observada **1125 ms**, exit **0**, stderr vazio. Timestamps das linhas são observações de stdout, não benchmarks individuais de migration. Nenhuma falha ou rollback ocorreu. A migration 0052 executou seus seeds versionados de permissões; não foram inseridos pagamentos, pedidos ou eventos sintéticos como smoke test.

## Validação posterior real

Nova sessão do migrator em READ ONLY, sem reaplicar runner:

- Ledger contíguo **0001–0055**, 55/55 IDs e checksums iguais aos arquivos locais; nenhuma pendente ou inesperada.
- **914 constraints**, zero não validadas; **138 índices**, zero inválidos/não prontos.
- **40 tabelas com RLS**, todas FORCE; **43 policies** no schema. São os valores observados deste banco, sem inferência a partir do E2E.
- `financial_events` presente, owner migrator, RLS/FORCE ativos e policy tenant_isolation com USING/WITH CHECK por current_tenant_id. App com SELECT/INSERT e sem UPDATE/DELETE. Trigger de imutabilidade habilitado; constraint de referências de 0054 válida; índice normalizado único de 0055 válido/pronto.
- `platform_administrators`, `platform_admin_bootstrap_latch` e `platform_admin_audit_log` presentes. São entidades globais de identidade conforme a migration, sem RLS tenant. App tem apenas SELECT dos grants, sem escrita direta; latch/audit sem acesso direto. Audit trigger habilitado. As sete funções de plataforma são SECURITY DEFINER com search_path explícito, sem EXECUTE PUBLIC; app não executa bootstrap founder e pode executar as seis funções runtime previstas.
- `roles.description` NOT NULL; app pode atualizar essa coluna. `finance.read`/`finance.manage` existem uma vez cada no catálogo versão 1. Role app continua sem superuser/BYPASSRLS/CREATEDB/CREATEROLE. Não se alteraram permissões manualmente para fazer verificações passar.

Compatibilidade com runtime verificada em conexão real `rotamoto_app`/`rotamoto`, dentro de BEGIN READ ONLY: `createFinanceService().list` executou SQL real sem tenant (nenhum evento visível), SELECT de description com LIMIT 0 passou, contexto de plataforma sem ator retornou false. Nenhum dado de usuário foi exposto ou contexto privilegiado simulado.

HTTP na API oficial existente: `/health/live` e `/health/ready` **200**; `/api/finance/events` e `/api/platform-admin/companies` sem cookie **401 UNAUTHENTICATED**, esperados. Nenhum POST/PATCH foi enviado; nenhuma sessão ou fundador foi criado. Portanto, validação técnica de schema/runtime/roteamento/auth gate **PASS**; não se declara jornada financeira/admin autenticada ou concorrência HTTP nesta execução.

API oficial, postgres e nginx permaneceram ativos pelo runit, sem restart. Logs correntes consultados desde o início da migration não continham ERROR/FATAL/PANIC/exceções não tratadas; log da API desde o pré-voo registrou duas respostas 200 e duas 401 esperadas, sem 5xx. Observação limitada a esta janela, não promessa de monitoramento contínuo. A tentativa inicial de consultar o serviço pelo nome `postgresql` encontrou diretório inexistente; o nome correto `postgres` foi verificado ativo, sem alteração de serviço.

## Testes e revisão

Sete testes existentes pertinentes passaram: migration-targets, platform-admin-http, order-money, earning-lifecycle, analytics, runtime-config e server-security. São validações em memória/HTTP com dependências simuladas; nenhuma fixture PostgreSQL foi executada. A primeira chamada de server-security com NODE_ENV=test falhou antes do teste por faltar E2E_RUNTIME_DATABASE_URL; repetido no ambiente padrão previsto pelo projeto (NODE_ENV ausente), passou. Não houve modificação de teste/código nem conexão ao E2E para contornar isso.

`node --check` do runner, server, finance/service e finance/http passou; `git diff --check` passou. Nenhuma mudança de UI/código nesta parte; não houve alteração visual para validar por navegador. Não foram executadas suítes de backup ou ensaios que criam banco. Os resultados sanitizados completos estão em [validation.json](validation.json).

## Gates

| Gate | Estado |
|---|---|
| Autorização direta sem backup registrada | PASS |
| Origem/role/ledger inicial/checksums/pending | PASS |
| Runner oficial 0048–0055 em ordem | PASS |
| Ledger final 55 e checksums | PASS |
| Constraints/índices/RLS/grants/objetos esperados | PASS |
| Compatibilidade técnica API/schema e serviços | PASS, nos limites de leitura e auth gate descritos |
| Testes pertinentes e revisão | PASS, após corrigir ambiente da primeira chamada de um teste |
| E2E/baselines/trabalho preexistente preservados | PASS |
| Restore garantido desta execução | Não existe; dispensa expressa do proprietário |
| G14 | **FAIL** |
| Campanha 0304 / 0305 | Aberta/PARTIAL / não iniciada |

O bloqueio de backup L.1 fica como fato histórico de custódia; não impediu L.2 por autorização expressa posterior. A atualização do PostgreSQL de desenvolvimento está concluída. Pendências de aprovação visual, autenticação E2E, fluxos cross-app e backlog desde 0257 permanecem sem encerramento automático.
