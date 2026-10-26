# Relatórios V2 — correção P0 — 2026-10-26

## Escopo e fontes

Continuação da Campanha 0304 sobre a branch `codex/campaign-0304-visual-consolidated`. As referências originais estão em Downloads e foram copiadas para este diretório. Os quatro arquivos são esboços de celular claro/escuro e PC/tablet claro/escuro. Capturas recentes do proprietário, além das capturas prévias já arquivadas, não estavam disponíveis no armazenamento acessível; portanto, a comparação antes/depois abaixo usa a captura prévia do Chromium e as referências originais disponíveis.

Commit Restaurante desta correção: `de615411372fb792f44033a17dc56fd37f616f20` (local, sem push do aplicativo).

O renderer e CSS reais foram carregados em Chromium via CDP pelo harness temporário `.temporarias/0304-relatorios-v2/visual-audit.cjs` do repositório `browser-tests`. A fixture usa dados QA sintéticos e shell simulado. **Não é E2E autenticado, não valida API ou persistência, e não equivale a teste físico no Chrome Android.**

## Causas e correções

| Defeito | Causa raiz | Correção |
|---|---|---|
| Status/Tipo/Origem apareciam como “To” no celular | O formulário mantinha três colunas com largura mínima de 130 px; no retrato, o `<details>` ocupava a coluna lateral junto de Motoboy e cada select encolhia para cerca de 39 px | O `<details>` aberto passa para uma linha própria com largura integral do painel. Em contêineres estreitos os filtros viram uma coluna, com select de altura de toque de 44 px; contêineres médios usam duas colunas e os largos, três. O mínimo rígido de 130 px foi removido. |
| Terceiro cartão isolado em meia linha no desktop-mode de 980 px | Breakpoints dependiam da largura da janela, mesmo com sidebar reduzindo o painel útil; o grid usava duas colunas nesse caso | O dashboard agora nomeia o contêiner `reports` e decide composição pela largura interna. A linha de três cartões recebe modificador de layout explícito. Os dois rankings e mapa usam proporção de duas colunas, com mapa em largura integral nos painéis intermediários e span 2 em painéis largos. |
| Ativo da navegação operacional contrastava com a aba executiva | Estilos ativos diferentes: link operacional tinha fundo pastel/texto da cor de destaque | Link ativo operacional usa o azul semântico e texto branco, preservando foco visível. |

## Matriz antes/depois

| Viewport/tema | Antes | Depois | Resultado medido |
|---|---|---|---|
| 390×844, claro | Captura `antes-390.png`: três selects ficam em faixa lateral estreita; aparecem “T”, “T” e “To”; Motoboy e filtros avançados competem na mesma linha | `depois-390-aberto-claro.png`: Motoboy e filtros em linhas próprias; Status/Tipo/Origem completos e empilhados | Painel avançado: 147 px → 351 px; selects: 39/39/42 px → 327 px cada. Sem overflow horizontal. |
| 390×844, escuro | Não havia captura prévia escura desta falha | `depois-390-aberto-escuro.png` | Mesma largura/alinhamento; ativo operacional azul com texto branco. |
| 980×720, claro, sidebar visível (emulação desktop-mode) | `antes-980.png`: grid secundário em duas colunas; terceiro cartão isolado na linha seguinte | `depois-980-aberto-claro.png`; medidas executivas no JSON | Largura útil do dashboard: 658 px; três cartões secundários têm 211 px e partilham a mesma linha; rankings 323 px cada e mapa 658 px. Campos avançados em duas colunas (~312 px por select). |
| 980×720, escuro, sidebar visível (emulação desktop-mode) | Sem captura prévia escura | `depois-980-aberto-escuro.png` | Mesmo posicionamento e largura, ativo azul com texto branco. |
| 320×700, claro/escuro | 320 px não tinha medida arquivada da interação | Capturas `open-320x700-light.png` e `open-320x700-dark.png` disponíveis no runner temporário | Painel: 281 px; selects: 257 px cada. Sem overflow. |
| 360×800, 430×932, paisagens 720×320/800×360/844×390/932×430, tablets 768×1024/1024×768, desktops 1280×800/1440×900/1920×1080, claro/escuro | Matriz anterior contém renderer atual antes da correção em 14 viewports | Medições `medicoes-filtros.json` e `medicoes-dashboard.json` | 28 pares de viewport/tema; painel aberto/recolhido; nenhum campo abaixo de 180 px nos alvos testados e nenhum overflow do documento. Cards medidos pelo DOM, inclusive após sidebar. |

### Dimensões principais do grid após a correção

- 980×720: conteúdo útil 658 px. Linha secundária tem 3 cartões alinhados de 211 px; os dois rankings ficam em colunas iguais de 323 px; mapa ocupa 658 px.
- 1280×800: conteúdo útil 932 px. Linha dos três cartões tem colunas de 303 px; os dois rankings têm ~224 px e o mapa ocupa ~460 px.
- 1440×900: conteúdo útil 1083 px. Linha dos três cartões tem 353 px; rankings têm 262 px cada e mapa 535 px.
- 1920×1080: conteúdo útil 1504 px. Os cartões principais medem 493 px; rankings, 367 px; mapa, 746 px.

Os valores acima são do DOM Chromium/CDP. As alturas seguem o conteúdo natural; não foram igualadas à força.

## Testes e limites

- Chromium/CDP com CSS/JS reais: 28 combinações (14 viewports × claro/escuro), sem overflow; 20 verificações de estrutura, troca de abas, filtro compartilhado, teclado e acesso aos oito destinos operacionais passaram.
- Formulário avançado aberto nos 28 casos; largura do painel, selects, active state, scroll width e screenshot medidos. Formulário recolhido foi renderizado pelo ciclo principal do harness.
- O runner não observou exceções JavaScript ou respostas 4xx/5xx; a página era `data:` com fixture, sem chamadas de API, portanto respostas HTTP vazias não são prova de integração.
- Chrome Android físico e modo computador no aparelho: **BLOCKED** (sem sessão física acessível). 980×720 é emulação Chromium desktop-mode, não aparelho Android.
- Sessão autenticada, filtros em dados reais, sincronização, cache/offline em rede real e estado de tenant: não reexecutados por esta correção visual. A navegação funcional já tem os testes estruturais da evidência de Separação; este conjunto é fixture.
- G14 permanece **FAIL** até aprovação visual expressa do proprietário. Parte A: **PARTIAL**.

## Checklist P0/P1

- [x] P0 — Status, Tipo e Origem legíveis ao expandir em retrato (320/360/390/430 px; dois temas).
- [x] P0 — Filtros principais e avançados sem disputar coluna lateral em contêineres estreitos.
- [x] P0 — Terceiro cartão não fica sozinho em meia linha no desktop-mode de 980 px.
- [x] P0 — Rankings alinhados e mapa proporcional após a sidebar em contêineres médios/largos.
- [x] P0 — Estado ativo da seção operacional contrastante e foco visível.
- [ ] P1 — Repetir a inspeção no Chrome Android físico, inclusive opção “Versão para computador”.
- [ ] P1 — Validar filtros e dados reais em sessão autorizada, inclusive mudanças rápidas e ausência de dados.
- [ ] P1 — Aprovação visual expressa do proprietário (G14 segue FAIL).

## Arquivos desta evidência

- `antes-390.png`, `antes-980.png`: capturas Chromium anteriores à correção.
- `depois-390-aberto-*.png`, `depois-980-aberto-*.png`: filtros abertos após a correção.
- `depois-320-aberto-*.png`: menor largura retrato, com campos completos.
- `grid-980-claro.png`, `grid-1440-claro.png`: alinhamento dos cartões e uso de largura após sidebar.
- `referencia-*.png`: originais encontrados em `/storage/emulated/0/Download`.
- `medicoes-filtros.json`: bounds e dimensões dos filtros abertos em 28 casos.
- `medicoes-dashboard.json`: bounds, larguras e grade dos cartões em 28 casos.
- Harnesses sob `~/projetos/browser-tests/.temporarias/0304-relatorios-v2/` e `.temporarias/0304-relatorios-p0/`; fora da aplicação.
