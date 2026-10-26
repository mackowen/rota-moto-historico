# Campanha 0304 — Parte H: provisionamento E2E e reconciliação integrada

Data: 2026-10-26. Continuação do commit Restaurante `46d1c4d0288a422a2f589782ea80a21db079d026`; campanha 0304 permanece aberta. Escopo: ambiente descartável `rotamoto_e2e` somente. PostgreSQL oficial `rotamoto` não foi acessado nem alterado; migrations 0052–0055 não foram promovidas.

## Causa do 42501 e correção

O rejeitado era `INSERT` em `rotamoto.users`, identidade global, executado como `rotamoto_app` pela fixture sintética `tests/test-domain-sync-postgres.js`. A fixture desabilitava RLS temporariamente para inserir usuário e reabilitava no `finally`. Migration 0001 não habilita RLS em `users`; a tabela originalmente estava `relrowsecurity=false`, sem política RLS. Reativar RLS em tabela sem política efetiva implicou default-deny, apesar do INSERT grant: erro SQLSTATE `42501`. A identidade não era o usuário da aplicação nem um callback financeiro; era a role de runtime usada indevidamente pelo fixture para bootstrap.

A regressão nasceu no teste de concorrência da Parte G: o teardown reabilitava RLS incondicionalmente em `users` (e nas demais tabelas) em vez de restaurar os flags originais. Testes HTTP anteriores à Parte G passaram quando `users` ainda estava sem RLS. Nenhuma migration autorizava habilitar RLS em `users`, e fixture sintética não pode ampliar privilégio da aplicação.

No banco E2E isolado, restauramos a tabela `users` ao estado prescrito pela migration (RLS/FORCE desligados); não há escrita oficial. O fixture de concorrência agora captura os estados RLS/FORCE e trigger imutável e os restaura exatamente inclusive em falha. A fixture de API usa provisionamento autorizado do migrator/seed isolado para identidade de teste, mantendo API autenticada na role app; não desabilita política global nem concede BYPASSRLS. Cleanup dos testes reportou zero companies, domain_records, memberships, outbox, financial events e usuário sintético residual.

## Falha adicional observada pelo browser

O pull de uma instalação Restaurante recebia `CANONICAL_ASSIGNMENT_REVOKED`, aviso privado emitido ao antigo motoboy na reatribuição. A linha compartilhada da outbox tinha `app_key='restaurante'`, mas o scope do pull Restaurante era vazio; o evento de notificação (não canônico para o cliente Restaurante) era entregue à reconciliação estrita, que só aceita UPSERT/TOMBSTONE. `backend/domain/sync-service.js` agora filtra apenas esse tipo no pull Restaurante; o pull do motoboy destinatário continua recebendo-o, coberto por assertions HTTP. Isso não altera contrato financeiro.

A sessão E2E autorizada no Chromium/CDP autenticou e completou a reconciliação/sync do pull depois do filtro. Essa execução identificou adicionalmente acesso a `order.sync` sem guarda quando uma Delivery não tinha Order local correspondente. Foi corrigido para calcular `orderConfirmed` apenas com Order associado. O teste de browser avançou até procurar ação de detalhe para o Order sintético, mas a lista não expôs o seletor esperado dentro do timeout; formulários financeiros, relatórios e exportações no navegador permanecem **BLOCKED/PARTIAL**, sem alegar aprovação visual. O harness/teste de browser ainda precisa ser ajustado à navegação real de lista antes de reivindicar esse subfluxo.

## Execuções

- `node --check backend/domain/sync-service.js` e `node --check tests/test-domain-sync-postgres.js`: PASS.
- `NODE_ENV=test DATABASE_URL=postgresql://rotamoto_app@127.0.0.1:5432/rotamoto_e2e MIGRATOR_DATABASE_URL=postgresql://rotamoto_migrator@127.0.0.1:5432/rotamoto_e2e node tests/test-domain-sync-postgres.js`: PASS autenticado HTTP/PostgreSQL. Incluiu sessão/MFA, RBAC, CSRF, isolamento entre tenants, pagamentos, parciais, estornos/ajustes, payouts, idempotência/conflitos/retries, leitura e reconciliação independente, limpeza zero. Não houve chamada a PSP real.
- `NODE_ENV=test DATABASE_URL=postgresql://rotamoto_app@127.0.0.1:5432/rotamoto_e2e E2E_MIGRATOR_DATABASE_URL=postgresql://rotamoto_migrator@127.0.0.1:5432/rotamoto_e2e node tests/test-finance-concurrency-postgres.js`: PASS com backends PostgreSQL independentes PID 17217 e 17218. Testou referência duplicada, recebimento/estorno/repasse concorrente limitado, retry idempotente e ajustes concorrentes; 7 eventos; cleanup COMPLETED, resíduos 0. Estado RLS/trigger restaurado.
- Variante browser autenticada no mesmo teste: autenticação e sync/pull passam; timeout em `Order detail action` depois da reconciliação. Não se atribui PASS a UI financeira, exportação ou filtros via browser.
- Suíte Restaurante `npm test`: PASS, exit 0, completa após atualização de app/service worker e expectativas dos testes de cache.
- Seis regressões de shell/cache executadas diretamente: PASS. `node --check` nos scripts/testes alterados e `git diff --check`: PASS.
- Commit local Restaurante `7b3ea730b792050edf22bf79840988bade260fa2` (`fix(0304): repair authenticated finance E2E sync`); nenhum push de aplicativo.

## Gates e pendências

HTTP/API e persistência financeira E2E: PASS nos cenários exercitados; concorrência duas conexões: PASS. Sync de evento de revogação para Motoboy e exclusão da projeção Restaurante: PASS. Navegação autenticada até a UI financeira: BLOCKED pelo seletor de detalhe não encontrado após sync, assim como filtros/exportação visuais. Chamadas de integração externa de pagamentos não existem e não foram simuladas. Auditoria oficial continua BLOCKED pela falta da credencial autorizada `rotamoto_auditor`; nenhuma consulta oficial foi feita. Promoção oficial não realizada. G14 permanece FAIL; campanha 0304 aberta; 0305 não iniciada.

Checklist futuro de promoção continua separado: aprovação explícita, provisionamento do auditor, revisão da migration/backout, backup verificado, janela autorizada, dry-run e checagem de checksum/contagens, execução por operador autorizado, smoke test e plano de rollback. Nenhuma dessas ações foi feita aqui.
