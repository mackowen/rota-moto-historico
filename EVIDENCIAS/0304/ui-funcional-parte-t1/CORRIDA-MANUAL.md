# Corrida manual, QR e impressão

## Arquivos e operação existente

- Restaurante `app.js`, `openDetail()`: `data-detail-qr` chama `openQrPreview(o.id)` e `data-detail-print` chama `openPrintPreview(o.id)`.
- `openQrPreview` consulta a rota autenticada `/api/delivery-qr/deliveries/:id`; a assinatura é validada antes da exibição.
- `openPrintPreview` prepara snapshot sanitizado, apresenta prévia e chama `RotaMotoBrowserPrinter.print`; a mensagem informa envio para a caixa de impressão do navegador, não impressão física concluída.
- `ticket-renderer.js` e `browser-printer-provider.js` geram conteúdo imprimível sem controles da interface e tratam indisponibilidade do browser.

## Resultado

Não foi reproduzido defeito funcional que justificasse alterar esse fluxo nesta parte. Dimensão/área de toque em aparelho real e comportamento físico da impressão não foram validados por Browser QA autenticado.

## Testes executados

- `node tests/test-delivery-qr.js`: PASS (autenticação, tenant, assinatura, expiração e casos fail-closed).
- `node tests/test-printing.js`: PASS (snapshot, escaping, conteúdo do QR, decode obrigatório, falha/indisponibilidade e limpeza da área imprimível).
- `node tests/test-printing-offline.js`: PASS na suíte completa do Restaurante.
- `node tests/test-orders-v2-cards.js`: PASS.

Estado: **PARTIAL** para validação visual/operacional em dispositivo; mecanismo de aplicação coberto por testes de contrato/serviço. Nenhuma alegação de impressão física.
