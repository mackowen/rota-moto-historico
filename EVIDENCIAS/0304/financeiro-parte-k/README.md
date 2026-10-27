# Campanha 0304 — Parte K: backup, restauração e ensaio 0048–0055

**Data:** 2026-10-27 UTC
**Base Restaurante:** `4fcb095bae2f7f2803668207a488ccae391d20a6`
**Escopo:** somente auditoria de mecanismos e ensaio PostgreSQL sintético descartável. Nenhum backup/exportação, migration, evento financeiro ou alteração de configuração foi executado no PostgreSQL oficial `rotamoto`.

## Repositórios e preservação

| Repositório | Branch / HEAD | Resultado |
|---|---|---|
| Restaurante | `codex/campaign-0304-visual-consolidated` / `4fcb095bae2f7f2803668207a488ccae391d20a6` | Limpo; base conferida |
| Motoboy | `main` / `64d2e13d8e455f48b20b32b396e9c49ba7553e0b` | Limpo; sem alteração |
| browser-tests | `codex/campaign-0294-admin-settings` / `57cb7745828e24d50502bec89061d2ceb59e0200` | Worktree preexistente sujo preservado; sem alteração |
| codex-historico | `main` / `0d6484ad8cb69383b09ef432693c19577f7d853b` | Alterado apenas para este registro; untracked `login-redesign-2026-10-25` preservado |

Tag Restaurante `v5.50-ui-mobile-fix5`, baselines e backlog desde 0257 preservados. Nenhum commit de aplicativo necessário.

## K1 — inventário e autorização do backup

Runbooks revisados: `docs/operations/BACKUP-RESTORE.md`, `POSTGRES-BACKUP-ROLES.md`, `RECOVERY-TERMUX-LINUX-0236.md` e `BACKUP-EXECUTOR-0229.md`. O mecanismo existente produz recovery set custom cifrado AES-256-GCM, SHA-256/HMAC, manifesto autenticado e publicação no-clobber; `pg_dump` usa role dedicada `rotamoto_backup`; arquivos são privados. Restore permite somente banco `rotamoto_disposable_*` e usa role `rotamoto_restore`. A role de backup com BYPASSRLS é dedicada e somente leitura; não foi substituída por app/migrator.

O runbook exige opt-in operacional explícito e diz para não ativar backup real em Termux antes de avaliação/autorização de risco, pois executor e serviço compartilham UID. Na sessão não havia flag `ROTAMOTO_BACKUP_OPERATIONAL_SOURCE_ENABLED`, URL, chave/diretório ou destino de backup configurados. `~/projetos/backups` existia privado (`0700`), mas vazio. O conjunto UUID citado no runbook de 0236 não estava no caminho documentado. Relatórios antigos 0063/0064 documentam backups/restores autorizados em outubro; são evidência histórica, não autorização operacional vigente para uma nova exportação nesta Parte K. A existência de pgpass/role não constitui autorização. Nenhuma senha, chave, URL, conteúdo de backup ou dado pessoal foi coletado para esta evidência.

**K1: BLOCKED.** Não foi iniciado `pg_dump` nem qualquer exportação oficial. Falta aprovação operacional vigente e provisionamento seguro do executor/destino/chave.

## K2 — restore oficial descartável

Sem recovery set atual disponível/autenticável e autorização para novo backup, não há origem válida para restore oficial. Não se restaurou sobre `rotamoto` ou `rotamoto_e2e`.

**K2: BLOCKED.** O clone sintético abaixo não comprova recuperação de dados oficiais.

## Ensaio sintético do pipeline existente

Executado Restaurante `npm run test:backup-disposable-postgres`, script existente `tests/test-backup-disposable-postgres.js`, modo `NODE_ENV=test`, cluster PostgreSQL efêmero ligado somente a `127.0.0.1`, nomes descartáveis da campanha 0228, roles sintéticas, chave aleatória temporária. O teste migrou schema vazio por 0001–0055, gravou uma linha sintética RLS, criou recovery set cifrado, verificou manifesto/hash/ledger, transferiu para fixture HTTP S3 local assinada e restaurou em banco descartável diferente. O teste confirmou 55 migrations, head `0055_financial_reference_uniqueness`, 41 tabelas RLS, 44 policies, uma linha sintética restaurada, zero índices inválidos e zero constraints não validadas. Resultado observado: **PASS**, run ID `41977d48-36ed-461f-9eb1-da921ab73b4d`.

O runner encerrou o cluster e removeu o diretório temporário; a verificação pós-run encontrou um diretório de mídia vazio remanescente do run, criado por `finally` que não remove pai não vazio. Esse caminho exato, com subdiretório vazio, foi removido e ausência confirmada. Outros diretórios antigos sob o tmp de mídia são preexistentes e foram preservados; não foi feita limpeza ampla. Nenhum banco E2E/oficial participou.

**Limitação relevante:** o teste existente aplica 0001–0055 desde zero. Ele não constrói checkpoint em 0047 e depois aplica exclusivamente 0048–0055 sobre uma cópia já populada; tampouco valida conflitos de linhas reais, recursos por migration ou rollback após promoção. K3 é apenas comprovação sintética da cadeia integral contendo as migrations 0048–0055, não o ensaio de upgrade solicitado sobre clone 0047.

## Matriz de gates

| Gate | Estado | Evidência / limite |
|---|---|---|
| K1 Backup oficial autorizado e íntegro | **BLOCKED** | Sem autorização vigente/configuração; nenhum export oficial executado. |
| K2 Restore descartável de backup oficial | **BLOCKED** | Artefato documentado antigo ausente; sem cópia atual autorizada. |
| K3 Migrations 0048–0055 no clone | **PARTIAL** | Teste sintético migrou do zero até 0055, mas não checkpointou 0047 para upgrade isolado. |
| K4 Integridade pós-migration | **PARTIAL** | Integridade básica do schema sintético restaurado passou (RLS/policies, índices/constraints válidos, ledger); não há dados reais/clonados. |
| K5 Permissões, RLS e isolamento | **PARTIAL** | Harness comprovou RLS no fixture sintético e roles descartáveis; não valida ACL/RLS dos dados oficiais copiados. |
| K6 Recuperação/rollback comprovado | **PARTIAL** | Recovery set sintético cifrado verificado/restaurado; rollback de 0048–0055 não executado, nem seria seguro sem checkpoint restaurável. |
| K7 Tempo/recursos medidos | **PARTIAL** | Execução concluiu em aproximadamente 20 s de tempo de parede observado; não houve medição reprodutível por migration, CPU ou pico de memória. Espaço livre foi visto antes, mas não houve perfil de recursos. |
| K8 Limpeza/resíduos | **PARTIAL** | Cluster efêmero encerrou e raiz do runner foi removida; resíduo de mídia desta execução foi identificado/removido. Resíduos de mídia antigos foram preservados sem atribuição comprovável. |
| K9 Prontidão para promoção | **BLOCKED — NO-GO** | Backup atual/autorizado, clone oficial, upgrade incremental 0047→0055, dados/permissões e recuperação não comprovados. Não promover. |

### Critérios de continuidade antes de promoção futura

1. Aprovação operacional expressa do proprietário para uma janela de export read-only, com identificação de executor/role/destino e avaliação do risco Termux ou executor isolado com UID dedicado.
2. Confirmar origem `rotamoto`, uso exclusivo de `rotamoto_backup`, chave recuperável por canal/cofre separado, destino 0700 com espaço suficiente, retenção protegida e auditoria de operador. Não registrar segredos.
3. Criar recovery set oficial por pipeline existente, verificar MAC/hash/tamanho/TOC e preservá-lo fora do filesystem que será atualizado; comprovar cópia protegida e custódia recuperável da chave.
4. Restaurar o set em banco exclusivo `rotamoto_disposable_*`; validar ledger/checksums iniciais 0001–0047, objetos, constraints/índices, permissões/RLS e contagens agregadas sem expor linhas pessoais.
5. Em clone restaurado, ensaiar exclusivamente upgrade ordenado 0048–0055 com medição por migration, preflight de dados/conflitos, integridade/RLS/grants, smoke API/relatórios e teste de recuperação via novo restore. Não executar downs destrutivos; preferir recovery testado.
6. Definir backup/restore aprovado, janela, writers pausados, monitoramento, critérios de abortar e validações pós-migration. Exigir aprovação expressa do proprietário para promoção separada; checagem auditor oficial continua read-only e limitada às permissões de `rotamoto_auditor`.

**Recomendação:** NO-GO para promoção nesta Parte K. Há evidência de que o pipeline sintético cifrado/restore funciona, mas ela não estabelece recuperabilidade atual do banco oficial nem segurança do upgrade sobre seu estado/dados. Nada foi promovido.

## Integridade oficial e histórico

Estado oficial/e2e de Parte J mantido como referência: ledger oficial 0001–0047, E2E 0001–0055, checksums conferidos. Não se reconectou para operações mutáveis nem se executou migration nesta Parte K. A role `rotamoto_auditor` não foi usada para contornar limites de leitura. Nenhuma consulta sensível ou dado pessoal foi registrado.

G14 continua **FAIL**, Campanha 0304 aberta, 0305 não iniciada.
