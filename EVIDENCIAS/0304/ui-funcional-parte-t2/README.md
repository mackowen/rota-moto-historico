# Campanha 0304 — Parte T.2

**Resultado global: PARTIAL.** Corrigi um colapso real do painel Rotas em tablet retrato: a regra mobile global `display:none!important` escondia a sidebar, embora Rotas mudasse o shell para duas colunas e reservasse 68 px para o trilho. A regra deixou de ser importante; o seletor específico da página volta a mostrar o trilho, e a área principal recupera a largura da segunda coluna.

A interface atual foi rastreada: a faixa tem quatro filtros de camada e um botão de enquadramento. Não existe modal/painel avançado de filtros de Rotas nem um conjunto distinto de cinco filtros. A borda reportada não se reproduziu na faixa atual; medições mostram `border-top: 0`, `box-shadow: none` e pseudo-elementos `none`. Nenhuma correção foi alegada para esses dois relatos não reproduzidos.

O Chromium 155 arm64 iniciou com renderização por software e CDP em perfil temporário isolado. A função real `routes()` foi renderizada com CSS real em 10 combinações de viewport/tema e em estado vazio; também foi renderizado estado preenchido sintético. Isso comprova o componente e o layout, **não** as telas autenticadas nem o mapa Leaflet ativo. O `qa-profile` compartilhado está bloqueado por arquivos Singleton; não foi aberto, limpo ou inspecionado por dentro.

- Restaurante: commit local `a6a1b5c`, sem push.
- Motoboy: nenhum arquivo alterado; testes de navegação/responsividade passaram.
- APIs: readiness `ready` em 8787 e 8788. Nenhuma migration ou banco foi alterado.
- **G14 FAIL**, campanha 0304 aberta, backlog 0257 preservado, 0305 não iniciada.

Capturas em `IMAGENS/` são somente do harness isolado; a tela com dados é identificada como sintética. Matriz numérica integral: `METRICAS-ROTAS.json`.
