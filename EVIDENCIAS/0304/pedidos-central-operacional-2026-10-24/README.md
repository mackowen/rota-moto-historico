# Pedidos V2 — cartões compactos e central operacional

Data: 2026-10-24. Continuação da Campanha 0304; sem iniciar 0305.

## Escopo e implementação

A lista mantém um artigo por pedido, com identificação, horário, cliente, endereço, origem, motoboy e taxa quando conhecida. “Abrir pedido” delega ao detalhe existente; imprimir continua como ação secundária. A central acrescenta fila real de pedidos elegíveis, consulta de disponibilidade autenticada, estado da entrega selecionada, fatos de execução e feedback de sincronização. A distribuição rápida delega a `openAssignment`, preservando confirmação, autorização, validação e sincronização já existentes. A central não realiza mutações diretas.

A elegibilidade da fila de motoboys só é exibida como utilizável quando a resposta autenticada é recente (30 s), com presença confirmada, estado Online e lease válido. Offline, não autenticado, erro e resposta expirada são estados explícitos; nesses estados a UI não oferece a fila como disponível. Pedidos sem motoboy só entram na fila rápida se forem entregas próprias, não removidas e em estado canônico `CREATED`/`REDELIVERY` com transição para `ASSIGNED` permitida. Atribuição em lote e individual seguem o fluxo existente, sem bypass do despacho.

O botão “Gerenciamento completo” foi removido após confirmação de que chamava o mesmo `openDetail` do botão “Abrir pedido”. Os detalhes completos têm agora um único ponto de entrada por cartão; as ações próprias da central (atualizar fila, distribuir pedidos elegíveis, distribuir um pedido selecionado e atribuir motoboy elegível) permanecem distintas.

## Capturas e método

As 16 capturas `before-*` e `after-*` comparam o renderer do HEAD de entrada com o código de trabalho, em viewport móvel/tablet/desktop e temas claro/escuro. A fixture contém cinco pedidos e um motoboy sintéticos. O shell é uma moldura de teste, não a aplicação autenticada. A matriz de geometrias está em [`measurements.json`](measurements.json); exceções de console: 0. Capturas não comprovam autenticação, persistência nem execução operacional.

| Viewport claro | Lista (x/y/w/h) | Cartão | Central/painel |
|---|---:|---:|---:|
| 390×844 | 10/188/370/1393 | 370×270,6; coluna móvel | 370×841,1, após lista; atalho “Ir para a central operacional” visível acima dos filtros |
| 768×1024 | 104/148/621/957,6 | 621×183,5 | 621×780,8, empilhada para não comprimir colunas |
| 1280×800 | 278/148/617/957,6 | 617×183,5 | 326×668, em duas regiões; painel com rolagem própria |
| 1920×1080 | 278/148/1203/917,6 | 1203×175,5 | 380×845,1, em duas regiões |

Arquivos: `before-phone-390x844-{light,dark}.png`, `after-phone-390x844-{light,dark}.png`, `before-tablet-768x1024-{light,dark}.png`, `after-tablet-768x1024-{light,dark}.png`, `before-desktop-1280x800-{light,dark}.png`, `after-desktop-1280x800-{light,dark}.png`, `before-desktop-1920x1080-{light,dark}.png`, `after-desktop-1920x1080-{light,dark}.png`.

Nos viewports capturados, os cartões mediram 270,6 px no telefone e 183,5 px em 1280 px; a comparação não mostra mudança de altura nesses dois pontos. A alteração estrutural demonstrada é a central complementar. A interface mantém uma coluna no telefone e empilha lista/central no tablet médio. Em desktop >=920 px o painel lateral é complementar. As imagens são evidência comparativa de composição sintética, não referências aprovadas nem aprovação visual do proprietário.

## Validação

- Cobertura de renderer: listas com 0, 1, 5 e 20 cartões; exatamente um cartão por pedido; Abrir, impressão, seleção e QR elegível.
- Cobertura da central: estado de fila confirmada e elegível, fila expirada/erro, fatos de execução, ações de distribuição delegadas e proteção contra botão de abertura duplicado.
- Testes direcionados: `test-orders-v2-cards.js`, `test-orders-operational-center.js`, `test-navigation-shell-renderer.js`, `test-dispatch-assignment.js`, `test-printing-offline.js`, `test-visual-shell-cache.js`.
- CDP: 16 capturas, cinco registros sintéticos por imagem, temas claro/escuro, 390×844, 768×1024, 1280×800, 1920×1080; sem exceções de console.
- E2E autenticado, tenant sintético com cleanup verificável, ações reais de despacho e sincronização cross-app: **BLOCKED** nesta rodada; não simulado.
- Banco PostgreSQL oficial: sem escrita nesta rodada. Motoboy e Browser QA: sem alterações.
- Aprovação visual humana G14: **FAIL / PENDING_USER_APPROVAL**, conforme reprovação vigente.

## Reversão

Commit local da aplicação poderá ser revertido com `git revert <SHA>` sem reescrever histórico. Este diretório contém apenas screenshots e JSON sanitizados com dados sintéticos.

## Rótulos de distribuição

- **Selecionar pedidos para distribuir** abre o fluxo existente com a lista de entregas elegíveis. A pessoa escolhe quais pedidos e motoboys; nada é atribuído até confirmar.
- **Preparar distribuição do selecionado** abre o mesmo fluxo com o pedido selecionado já marcado. A seleção pode ser revisada e ainda exige confirmação.
- **Escolher motoboy** ao lado de uma entrega abre o mesmo fluxo com aquela entrega marcada.

Os rótulos e explicações foram ajustados após o proprietário apontar que os textos anteriores não deixavam clara a diferença. O botão redundante “Gerenciamento completo” segue removido; “Abrir pedido” é o acesso único ao detalhe.
- **Usar este motoboy** na fila de disponibilidade abre o mesmo fluxo com pedido e motoboy marcados; a confirmação continua necessária.
