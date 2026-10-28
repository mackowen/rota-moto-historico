# Responsividade — medição do componente Rotas

**T2-13 — PARTIAL.** Harness chama `routes()` de produção, aplica as folhas reais na ordem de `index.html` e mede área útil/documento, faixa, retângulos dos cinco controles, mapa, topo, nav e toast. Estado vazio em 320×700, 390×844, 768×1024, 1024×768, 1440×900, claro e escuro. Estado preenchido sintético adicional em 390×844 claro.

| Viewport | Largura útil Rotas | Mapa | Faixa (altura) | Resultado |
|---|---:|---:|---:|---|
| 320×700 | 296 px | 296 px | 296×38 px | cinco controles 56×38, sem overflow |
| 390×844 | 366 px | 366 px | 366×38 px | cinco controles 70×38, sem overflow |
| 768×1024 | 657 px | 657 px | 657×40 px | trilho lateral e mapa dominante, sem overflow |
| 1024×768 | 692 px | 457 px | 692×40 px | lista/mapa em duas colunas, sem overflow |
| 1440×900 | 1083 px | 797 px | 1083×40 px | lista/mapa/detalhes em desktop, sem overflow |

Em viewport desktop o `documentWidth` fica 15 px menor que `innerWidth`, correspondente à scrollbar clássica, não overflow. O tema foi alternado no documento; o mapa Leaflet ativo não foi inicializado no harness. Capturas não são Browser QA autenticado.

Motoboy e outras telas autenticadas não foram medidas por CDP; testes de navegação/responsividade existentes passaram.
