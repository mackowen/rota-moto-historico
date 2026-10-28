# Parte S.2 — bootstrap persistente e paridade PostgreSQL

Data: 2026-10-28. Continuação do checkpoint S.1; sem repetir inventário geral. Baselines, branches e alterações anteriores preservados.

## Resultado

- **MIG-0056-0061: PASS.** Gate específico passou e o runner oficial aplicou as seis migrations pendentes ao principal.
- **PostgreSQL: PASS.** `rotamoto_e2e` e `rotamoto` em 0061; runner validou os checksums de 0001–0061 em cada banco. Comparação de estrutura foi idêntica para relações/RLS, políticas, constraints, índices e definições/configuração/owner de funções.
- **Serviços: PASS.** `/health/ready` respondeu HTTP 200 tanto na API oficial quanto na E2E após a aplicação.
- **Testes: PASS no que foi executado.** `npm test` integral nos dois apps, identidade HTTP/PostgreSQL, negativos globais/financeiros, RLS de schema e data-plane com limpeza, logística e sync/domain passaram.
- **Bootstrap instalação vazia: NOT EXECUTED.** O E2E persistente contém o fundador; nenhum latch foi apagado e nenhuma instalação vazia foi simulada.
- **Operação positiva Super ADM/MFA real: NOT EXECUTED.** Não havia sessão autenticada legítima disponível; nenhum contexto foi falsificado.
- **`test-postgres-migrations.js`: NOT EXECUTED.** O guard do próprio teste o interrompe antes de abrir conexão porque a suíte de rollback/limpeza exige alvo descartável separado, não autorizado/disponível.
- **G14: FAIL.** Campanha 0304 aberta; Campanha 0305 não iniciada.

## Migrations no principal

Comando executado depois do gate: `MIGRATOR_DATABASE_URL=postgresql://rotamoto_migrator@127.0.0.1:5432/rotamoto node backend/postgres/migrate.js up`.

O runner aplicou em ordem `0056_integrated_founder_bootstrap` até `0061_platform_admin_permission_reason_null_guard`. Cada migration usa transação própria sob lock do runner; em falha, a migration em andamento reverte e as migrations anteriores já confirmadas permanecem no ledger para retomada forward-only. Não foi executado rollback.

Sem backfill e sem concessão: a migration alterou definições de funções, grants de execução e constraints auditáveis; nenhum comando DML de migration foi executado contra linhas de usuário/empresa/grant. Após a aplicação, `rotamoto` ainda tem zero administradores globais ativos e latch do founder não reivindicado. No E2E, o único grant continua ligado ao latch; os testes não removeram usuário, empresa, founder ou grant.

## Diferenças de ACL específicas do deployment

A comparação normalizada de estrutura tem diff vazio. ACL bruta não é byte a byte igual por configuração de ambiente preexistente: `rotamoto` contém o papel operacional `rotamoto_backup`, ausente no E2E, com BYPASSRLS e privilégios de leitura de backup; `rotamoto_app` e `rotamoto_migrator` não têm BYPASSRLS. O papel de backup não foi usado nem alterado nesta fase. O principal também restringe a execução pública de uma função trigger de imutabilidade financeira; o E2E mantém o ACL padrão dessa função. Essa diferença antecede S.2 e não foi modificada pelas migrations 0056–0061. Tabelas continuam com RLS/FORCE conforme políticas comparadas; os grants das novas funções administrativas coincidem entre bancos e são negados a PUBLIC.

Arquivos, classificação por teste, gate e consultas: `TESTES.md`, `MIGRACOES.md`, `CLASSIFICACAO-TESTES.md`. Commits e evidências de conclusão estão no histórico e em REGISTROS/RESUMOS.

## Checkpoint de código/publicação

- Restaurante: commit local `e79c8e6` (`test: isolate tenant RLS fixtures and label skipped bootstrap branches`); sem push.
- Motoboy: nenhuma alteração de aplicação nesta parte; sem push.
- Histórico: alterações S.2 serão publicadas via commit e fast-forward seguro.
- Baselines protegidas permanecem intactas.
