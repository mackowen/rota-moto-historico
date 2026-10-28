# Parte T.1 — resumo de execução

Estado global: **PARTIAL**. O fluxo de entrada da distribuição tinha duas vinculações de clique e foi unificado; o teste DOM dos controles e o E2E PostgreSQL de disponibilidade/despacho passaram. O controle de filtros do mapa foi extraído para um binder testável e seus quatro modos e o ajuste de enquadramento passaram no DOM. O fluxo de QR/impressão já possuía operações reais e testes direcionados passaram. Navegação visual, modal/scroll e impressão em dispositivo permanecem sem Browser QA autenticado.

- Restaurante: branch `codex/campaign-0304-parity-s`; commit local `26bbe27`, sem push.
- Motoboy: sem alterações nesta parte; `npm test`, `assets:check` e contrato compartilhado passaram.
- Banco E2E: teste PostgreSQL retido pelo runner; nenhuma limpeza executada. `rotamoto` não foi acessado nesta parte.
- G14: **FAIL**. Campanha 0304 aberta; 0305 não iniciada.

Documentos desta pasta descrevem causa, mudança, teste e limite. Os testes DOM não são Browser QA autenticado.
