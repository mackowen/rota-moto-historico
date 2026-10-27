# Campanha 0304 — Parte J: prontidão para promoção financeira

Data: 2026-10-27 UTC. Base Restaurante `4fcb095bae2f7f2803668207a488ccae391d20a6`.

## Auditoria dos repositórios e histórico

| Repositório | Branch / HEAD | Estado observado |
|---|---|---|
| Restaurante | `codex/campaign-0304-visual-consolidated` / `4fcb095bae2f7f2803668207a488ccae391d20a6` | Limpo; exatamente na base solicitada. Nenhuma alteração de aplicativo ou commit nesta Parte J. |
| Motoboy | `main` / `64d2e13d8e455f48b20b32b396e9c49ba7553e0b` | Limpo e alinhado com `origin/main`; sem mudanças necessárias. |
| browser-tests | `codex/campaign-0294-admin-settings` / `57cb7745828e24d50502bec89061d2ceb59e0200` | Worktree já continha numerosas alterações/arquivos não rastreados antes desta Parte; preservados, não editados, limpos ou commitados. |
| codex-historico | `main` / `baf38b0867c1edf6d87ba7623a907dbcd635389b` | Arquivos de registro/gates tinham commits até Parte I. Diretório não rastreado `EVIDENCIAS/0304/login-redesign-2026-10-25/` foi preservado. |

Registros acumulados E–I foram lidos. Contratos cross-app e ownership não mudaram na Parte I; Motoboy continua proprietário dos fatos de execução Delivery e Restaurante dos Orders/repasse calculado Earning. `Order.money` não é prova de recebimento; a ledger confirma somente os eventos aceitos conforme suas origens. Baseline `v5.50-ui-mobile-fix5` não foi modificada. Backlog desde 0257 permanece; 0305 não iniciada.

Tag Restaurante `v5.50-ui-mobile-fix5` encontrada e preservada em `9ebb7098725200bdec82e79be1e9ea622fe20120`.

## Disponibilidade da auditoria e escopo das consultas

A consulta local de disponibilidade confirmou uma entrada de autenticação para `rotamoto_auditor` sem expor segredo. Conexão ao host loopback/database exato `rotamoto`, identidade `rotamoto_auditor`, PostgreSQL 18.6. Todas as leituras oficiais ocorreram dentro de transação `READ ONLY`; `SHOW transaction_read_only` retornou `on`, seguida de `ROLLBACK` para fechar cada sessão.

A role é login não-superuser, sem `CREATEDB`, `CREATEROLE`, `REPLICATION`, `BYPASSRLS`, memberships, `CREATE` no database/schema ou `TEMP`. Pode ler as colunas autorizadas do ledger de migrations e catálogo, mas não tem `SELECT` operacional nas tabelas de dados. Não foram lidos pedidos, pagamentos, clientes, operadores nem payloads. Nenhum privilégio foi alterado e nenhuma outra role foi usada para substituir o auditor.

## Resultado do inventário de migrations

Ver matriz completa em [`migration-matrix.md`](migration-matrix.md).

- Código local: 55 migrations sequenciais `0001–0055`.
- Oficial `rotamoto`: 47 linhas contíguas `0001–0047`; todos os 47 IDs/checksums conferem com a fonte local. Pendentes exatamente `0048–0055`.
- E2E `rotamoto_e2e`: 55 linhas contíguas `0001–0055`; todos os IDs/checksums conferem com a fonte local.
- Migration `0041_delivery_custody_return` está aplicada em ambos. Checksum oficial/E2E/local: `c75063f833da16a8efdd2e8d448bf1c7c3aee7e360be8d9e1f12397d15251a9c`.
- Não presumi promoção das migrations intermediárias: `0048–0051` também estão pendentes no oficial e precisam preceder `0052–0055`.

Metadados oficiais: 853 constraints catalogadas, zero não validadas (incluindo FKs); 128 índices, zero inválidos. `delivery_custody_operations` existe com RLS e FORCE RLS. `financial_events`, `platform_administrators` e `roles.description` não existem. Os tipos-base visíveis no catálogo confirmam IDs de tenant/registro como UUID, tipos de entidade como text e payload como JSONB. FKs selecionadas para custody, domain records, roles e role permissions estão validadas.

E2E 18.6: schema contém `financial_events`, `platform_administrators` e `roles.description`; 914 constraints catalogadas, zero não validadas, 138 índices e zero inválidos. As colunas financeiras têm identificadores UUID, `amount_minor bigint`, BRL/ISO currency text e timestamps `timestamptz`; checks/FKs e o índice normalizado de referência da migration 0055 estão válidos. Os testes autenticados e concorrentes das Partes H/I provaram API/Relatórios e lançamentos sintéticos nesse E2E. Isso não é restauração de cópia oficial nem simulação integral de promoção.

### Cobertura que o auditor não permite comprovar

O ledger e o catálogo não revelam quantidade/cobertura de Orders/Earnings, duplicidades de `finance.read/manage`, distribuição de `company.manage` ou dados para reconciliação. O auditor não tem SELECT nessas relações. Não tentei consultas que excedem a permissão. Essas verificações continuam pré-condições da promoção e requerem um contrato de auditoria aprovado que disponibilize somente agregados necessários, sem trocar silenciosamente para `rotamoto_app`, `rotamoto_migrator` ou DBA.

Quando a autorização explícita de leitura agregada estiver disponível, executar em `BEGIN READ ONLY` e descartar o resultado detalhado após registrar apenas agregados:

```sql
SELECT entity_type, count(*)
FROM rotamoto.domain_records
WHERE entity_type IN ('Order','Earning','Delivery')
GROUP BY entity_type ORDER BY entity_type;

SELECT permission_key, catalog_version, count(*)
FROM rotamoto.permissions
WHERE permission_key IN ('finance.read','finance.manage')
GROUP BY permission_key,catalog_version;

SELECT p.permission_key, count(*) AS assignment_count,
       count(*) FILTER (WHERE r.role_id IS NULL) AS orphan_count
FROM rotamoto.role_permissions p
LEFT JOIN rotamoto.roles r ON r.id=p.role_id AND r.company_id=p.company_id
WHERE p.permission_key IN ('finance.read','finance.manage','company.manage')
GROUP BY p.permission_key ORDER BY p.permission_key;
```

Estas consultas são um roteiro, não foram executadas na Parte J. Para row-level integrity, constraints já validadas e catálogo sem FKs não validadas reduzem risco; não substituem reconciliação de payloads de pedido, cálculo Earning ou ledger financeiro, que ainda não está no oficial.

## Backup e ensaio

Não foi encontrada cópia oficial sanitizada autorizada nem dump de promoção verificável nos diretórios locais de checkpoint/evidência acessíveis; `projetos/db-checkpoints` existe com modo `0700` e sem arquivos. Não se conclui que não haja backup remoto, apenas que não há artefato disponível para verificar. O dump incompleto histórico citado no runbook antigo não serve. Nenhum backup, restauração, migration ou escrita financeira foi executado.

Não é seguro usar `down` no PostgreSQL E2E compartilhado. O E2E está no alvo final `0055`, não é uma base oficial clonada. Os scripts foram revisados: cada migration é transacional e o runner serializa via advisory lock. O ensaio `tests/test-postgres-migrations.js` aborta antes de conectar porque `rotamoto_e2e` é explicitamente protegido para não receber rollback/cleanup. Por isso, duração de promoção e rollback físico permanecem não medidos. Validadores executados sem mutação: `node tests/test-postgres-migration-targets.js` e `node tests/test-postgres-auditor-config.js`, ambos PASS. Readback `migrate.js status --e2e` confirmou o chain completo.

## Plano de promoção — preparado, não executado

1. **Autorização e release:** aprovação explícita do proprietário do banco e responsável de aplicação; janela e limite de duração aprovados; commit/release exatos e cadeia 0048–0055 revistos; credenciais de migração autorizadas disponíveis pelo mecanismo protegido; confirmar que só o alvo oficial previsto será usado. A credencial de auditoria não serve para DDL.
2. **Cobertura/dados:** concluir os agregados pendentes de permissions/role_permissions e cobertura Order/Delivery/Earning via acesso read-only expressamente autorizado. Verificar ausência de conflito de semântica para `finance.read/manage`, dados órfãos e compatibilidade da versão API/Relatórios a ser ativada. Não criar transações financeiras sintéticas/reais no banco oficial.
3. **Backup/restauração:** obter dump completo pelo processo/role de backup aprovado; armazenar fora do Git com controle de acesso e checksum; validar `pg_restore --list`; restaurar em banco descartável autorizado e sanitizado; conferir schema/contagens agregadas e inicialização. Sem esse artefato e teste, não iniciar janela.
4. **Preflight:** snapshot read-only confirma PostgreSQL 18.6, target `rotamoto`, ledger contíguo/checksums exatos 0001–0047, sem 0048+ aplicada, `0041` íntegra, nenhuma relation conflitante de `financial_events`, constraints/indexes válidos, RLS e grants esperados. Confirmar backup validado e aplicação em modo compatível/maintenance.
5. **Janela:** pausar writers e chamadas que dependem do novo schema; monitorar lock/tempo; usar exclusivamente o migration runner oficial autorizado e executar sequência sem saltos 0048, 0049, 0050, 0051, 0052, 0053, 0054, 0055. Não usar auditor, superuser de substituição, SQL manual ou `down`. O advisory lock/checksum do runner protege repetição concorrente; verificar ledger depois de falha antes de qualquer retry.
6. **Postflight read-only:** confirmar ledger 0001–0055 e hashes locais; constraints/FKs validadas, índice 0055 válido, RLS/FORCE/policy e grants least-privilege; permissões efetivas sem duplicidade/órfãos; API readiness e consultas de leitura dos relatórios. Habilitar a versão de aplicação compatível só depois de postflight. Não registrar pagamentos, estornos ou repasses reais como smoke test.
7. **Rollback/interrupção:** migrations aplicam uma a uma em transação; sucesso de etapas anteriores persiste se uma posterior falhar. Interromper, manter writers pausados, registrar migration exata e auditar estado antes de retry. Rollback automático não é estratégia: 0049 down sempre bloqueia; 0048 down depende de ausência de histórico; 0050 down perde descrições; 0052 down bloqueia com evento e remove ledger/seeds se vazio; 0053/0054 downs podem falhar após eventos novos; 0055 down remove só índice. Preferir correção forward. Restauração do backup validado requer aprovação explícita, plano de downtime e reconciliação; nunca executar `down` em produção como resposta automática.
8. **Parada imediata:** ledger/checksum inesperado, cópia/restore não validado, permission key incompatível, lock inesperado ou duração acima do limite aprovado, constraint/índice inválido, falha de RLS/grants, API/report incompatível, perda de conectividade ou suspeita de escrita financeira indevida.

## Gates Parte J

| Requisito | Estado | Evidência/limite |
|---|---|---|
| Repositórios, branches, HEADs, contratos e histórico | PASS | Restaurante/Motoboy limpos; estado preexistente de browser-tests preservado; quatro repositórios e histórico E–I conferidos. |
| Inventário completo de migrations | PASS | 55 IDs listados; oficial 0001–0047 e E2E 0001–0055, contíguos e checksum match; 0041 explícita. |
| Credencial e auditoria somente leitura oficial | PASS (metadados) | Auditor autenticado; alvo/identidade confirmados; transaction read-only; sem escrita. |
| Cobertura, contagens e conflitos de dados | BLOCKED | Permissões do auditor não incluem SELECT operacional. Nenhuma role substituta usada; consultas pendentes documentadas. |
| Tipos, constraints, integridade catalogada e conflito de schema | PASS (schema) / PARTIAL (dados) | Catálogo oficial sem constraints/FKs inválidas ou índices inválidos; tipos/fks-base conferidos. Linhas/permissões não são visíveis ao auditor. |
| Compatibilidade financeira/API/Relatórios | PASS no E2E / PARTIAL para oficial | E2E já migrado e testes Parte I aprovados; oficial ainda em 0047 sem ledger financeiro. |
| Simulação de promoção, tempo e rollback | PARTIAL | E2E final é referência de schema e scripts foram revistos; sem cópia oficial sanitizada/DB descartável, sem medir duração nem executar down. |
| Backup e teste de restauração | BLOCKED | Sem artefato local autorizado/verificável ou restore rehearsal. Pré-requisito obrigatório, não executado. |
| Procedimento de promoção e parada | PASS (planejado) | Checklist verificável documentado; nenhuma ação de promoção executada. |
| PostgreSQL oficial sem escrita | PASS | Apenas SELECT de catálogo/ledger em READ ONLY; nenhuma migration, permissão ou evento financeiro alterado. |
| G14 | **FAIL** | Continua pendente de aprovação visual expressa do proprietário. |
| Campanha | PARTIAL/aberta | Nenhuma promoção, nenhuma Parte seguinte e 0305 não iniciada. Backlog 0257 preservado. |

## Commits

Nenhum commit de aplicativo nesta Parte J. Motoboy inalterado. Commit de evidência/documentação e publicação do histórico serão registrados em `REGISTROS/0304.md` depois da revisão final. Nenhum push de aplicativo.
