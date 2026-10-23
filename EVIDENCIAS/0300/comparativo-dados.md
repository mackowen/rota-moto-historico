# Comparativo operacional antes/depois

## Contexto

Mesma sessão Browser backend-issued, MFA verificada, mesma Company sintética, mesmo IndexedDB/estado no instante capturado. A página antiga foi avaliada pela função de projeção legada em modo instrumentado de teste; a Home v2 foi a renderização oficial. A instrumentação viveu apenas no runner temporário, não no código do app.

## Order pela interface

- Ação: Nova corrida na Home, preenchimento pelo formulário, submissão normal.
- Local: `ord_mvl6bbda_nsqgmy`, tenant `01a1698d-200f-7dec-bc92-a3039af92286`, versão local 1, `sync.state=synced`, canonical ID `01a1698d-ba4a-7f60-81bf-79c018074f75`, versão canônica 1.
- API: GET canônico 200; Company da Order coincide com a sessão; cliente sintético esperado.
- Reload: mesma Order local/sync e número visível na Home após restauração da sessão.
- Fixture extra: Order `01a1698d-a1b3-7071-9bb4-1c8b165f3e35`; Delivery `01a1698d-a1cc-755f-b2ac-8f7c8a479761`.

## Paridade antiga/V2

- IDs de entrega para revisar coincidiram exatamente (a Order sintética criada pela UI).
- Contagem de Company-scoped e contagem legada visível: 1.
- O agregado canônico tem 2 entregas abertas: `ASSIGNED=1`, `CREATED=1`; concluídas = 0.
- O texto antigo “aguardando entregador” contava somente `ASSIGNED` e mostrava 1. O rótulo novo “Aguardando” agrupa `CREATED + ASSIGNED + REDELIVERY` e mostra 2, com descrição “distribuição ou aceite”. É diferença semântica explicitada, não divergência de fonte. O número antigo “em andamento” 2 corresponde a `openCount=2`.
- Campos sem valor canônico permanecem “Indisponível”; nenhum dado ou KPI inventado.

## Saídas

- Preview de impressão contém número, cliente, endereço, taxa e estado do pedido criado. A execução física de impressão não foi verificada.
- QR foi exercitado separadamente em Delivery sintética elegível/atribuída e abriu com visual QR; token/segredo não foi persistido no relatório.
- Evidência detalhada: [browser-report.json](browser-report.json).
