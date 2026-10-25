# Campanha 0304 — QR, layout paisagem e estado vazio de Rotas

Data: 2026-10-25. Repositório Restaurante, branch `codex/campaign-0304-visual-consolidated`.

## QR de check-in

Causa confirmada no backend: a emissão do QR retorna o erro de domínio `PRESENCE_QR_UNAVAILABLE` quando a chave temporária de assinatura não está configurada. O handler traduz esse estado para HTTP 503, mas depois a regra genérica para status `>=500` substituía código e mensagem por `INTERNAL_ERROR` / “Falha interna ao processar a fila operacional”. A indisponibilidade de configuração era, portanto, apresentada como falha da fila.

O processo API E2E em execução aponta para `rotamoto_e2e` e foi verificado sem gravar dados; nele não havia referência nem identificador de chave QR. A emissão real e o check-in cross-app ficaram bloqueados por esse pré-requisito. Não houve bypass, configuração de chave, escrita/migration no banco oficial ou QR ativo em evidências.

Correção: preservar `PRESENCE_QR_UNAVAILABLE` como resposta HTTP 503 com mensagem pública específica; converter erros de leitura/formato da chave para erro de disponibilidade com código diagnóstico sanitizado; propagar o request ID ao cliente para correlação de erros genéricos; mapear sessão expirada, permissão, indisponibilidade, rede e erro interno em mensagens próprias. Se o desenho do QR falhar, o modal é fechado em vez de deixar um painel inválido.

O teste direcionado usa chave sintética em memória e cliente PostgreSQL falso: confirma payload assinado/temporário, inserção do nonce sob tenant, ausência de consulta à fila/elegibilidade e resposta HTTP/diagnóstico sem segredo. Também cobre falha da chave e código de correlação sanitizado. Isso valida a emissão no serviço e tratamento HTTP, mas não a câmera, a leitura do Motoboy nem a confirmação autenticada de presença.

## Largura em orientação paisagem

O defeito estava no shell responsivo compartilhado: até 900 px a regra legada redefinia `.main` com `width:auto` e margens automáticas. As composições de Rotas, e em alguns viewports tablet as demais abas, ativavam uma grade com sidebar; o item de grid ficava com largura intrínseca, centrado na coluna restante. A regra compartilhada tablet/paisagem passou a atribuir a `.main` largura total da coluna, sem max-width ou margens automáticas. Desktop amplo mantém limite de leitura.

As referências novas do proprietário não estavam acessíveis localmente. O Chromium/CDP carregou CSS/HTML real servido em `127.0.0.1:8083`, com cache e service worker ignorados para medir a versão corrente; o conteúdo de página foi DOM sintético e não autenticado. Matriz: 13 tamanhos × 4 módulos (Início, Pedidos, Rotas, Motoboys) × 2 temas = 104 medições. Sem overflow horizontal nas combinações executadas. Sidebar compacta foi representada nos viewports 600–1023 px; sidebar aberta ampla foi usada no desktop. Esta fixture não substitui o Chrome Android físico.

| Viewport | Aba | Área principal antes → depois | Conteúdo antes → depois | Ocupação antes → depois |
|---:|---|---:|---:|---:|
| 720×320 | Início | 350,3 → 629,0 px | 307,1 → 585,8 px | 88% → 93% |
| 720×320 | Pedidos | 332,8 → 644,0 px | 289,6 → 600,8 px | 87% → 93% |
| 720×320 | Rotas | 313,6 → 641,0 px | 289,6 → 617,0 px | 92% → 96% |
| 720×320 | Motoboys | 332,8 → 644,0 px | 289,6 → 600,8 px | 87% → 93% |
| 800×360 | Início | 633,1 → 709,0 px | 585,1 → 661,0 px | 92% → 93% |
| 800×360 | Pedidos | 339,2 → 724,0 px | 291,2 → 676,0 px | 86% → 93% |
| 800×360 | Rotas | 678,0 → 717,0 px | 650,0 → 689,0 px | 96% → 96% |
| 800×360 | Motoboys | 339,2 → 724,0 px | 291,2 → 676,0 px | 86% → 93% |
| 844×390 | Início | 635,7 → 753,0 px | 585,1 → 702,4 px | 92% → 93% |
| 844×390 | Pedidos | 343,6 → 768,0 px | 293,0 → 717,4 px | 85% → 93% |
| 844×390 | Rotas | 678,0 → 761,0 px | 650,0 → 733,0 px | 96% → 96% |
| 844×390 | Motoboys | 343,6 → 768,0 px | 293,0 → 717,4 px | 85% → 93% |
| 932×430 | Início | 841,0 → 841,0 px | 785,1 → 785,1 px | 93% → 93% |
| 932×430 | Pedidos | 856,0 → 856,0 px | 800,1 → 800,1 px | 93% → 93% |
| 932×430 | Rotas | 849,0 → 849,0 px | 821,0 → 821,0 px | 97% → 97% |
| 932×430 | Motoboys | 856,0 → 856,0 px | 800,1 → 800,1 px | 93% → 93% |

Na Rotas 720×320, o cabeçalho passou de borda direita a 175,7 px para 12 px; nas demais três abas a margem computada caiu de 161–177 px para 21,6 px. Em 800/844 px, as margens das abas afetadas ficaram em 24–25,3 px. A 932 px não houve diferença porque o shell já ocupava a largura disponível. Os dados completos de `innerWidth`, `clientWidth`, `visualViewport`, cabeçalho, shell, main, conteúdo e overflow estão nos JSONs antes/depois.

## Estado vazio de Rotas

O estado “Nenhuma rota planejada” agora usa o ícone SVG semântico de rota, superfície de ícone contrastante, título e descrição com padding/gap próprios. A regra mobile conserva recuo mínimo e reduz o ícone sem cortar o texto. Capturas sintéticas do estado escuro antes/depois estão incluídas. O DOM desta captura usa conteúdo de teste; não representa uma rota operacional.

## Testes e gates desta intervenção

- QR serviço + HTTP: PASS unitário, chave sintética/falso cliente; emissão autenticada no ambiente ativo e check-in Motoboy: BLOCKED, chave de assinatura ausente e sem sessão E2E autorizada para este fluxo.
- Largura responsiva: PASS técnico na fixture Chromium/CDP 104 combinações, cache bypassado; Chrome Android físico e comparação direta com novas referências: BLOCKED/PENDING.
- Estado vazio Rotas: PASS estrutural/CSS em fixture, claro/escuro; aprovação visual: pendente.
- `npm test` Restaurante completo: exit 0; `node --check` em `app.js`, serviços QR, `server.js` e `sw.js`, e `git diff --check`: PASS.
- Banco oficial: sem escrita. Motoboy e Browser QA: não modificados nesta intervenção.
- G14: FAIL; campanha 0304: PARTIAL/aberta; nenhuma pendência anterior foi encerrada.

Arquivos `before/` e `after/` incluem geometria JSON e capturas dark em 720×320, 800×360 e 932×430; `after/` inclui também o tema claro em 720×320 e 800×360, além de 1280×800 em ambos os temas.
