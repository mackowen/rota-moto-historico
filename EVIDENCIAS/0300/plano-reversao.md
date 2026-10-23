# Plano de reversão local — 0300

Ponto de partida Restaurant: `379576f708374161b77c8b3f35b2317550993274`, branch original `codex/campaign-0299-dashboard-v2-preview`. Baseline protegida `v5.50-ui-mobile-fix5` aponta para `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; não foi movida.

O trabalho fica em `codex/campaign-0300-dashboard-integration`. Para revisão/reversão, comparar ou criar nova branch a partir do commit de partida citado; não usar reset/checkout destrutivo. Reversão de integração é um commit novo que restaure o router para a implementação anterior `dashboardLegacyReference()` e seus estilos/handlers, ou retira o commit de integração via revert após revisão. Não executar essas ações automaticamente; não há deploy/alteração de serviço a desfazer.

History também é alterado por commit novo, mantendo histórico anterior. Nenhum force push. Não há migração nem dado operacional para rollback: fixture usou transação E2E e encerrou `databaseCommitted=false`, cleanup `COMPLETED`, resíduos zero.
