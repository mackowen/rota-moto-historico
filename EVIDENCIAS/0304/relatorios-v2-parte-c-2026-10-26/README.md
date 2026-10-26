# Relatórios V2 — Parte C — 2026-10-26

## Checklist e causas

- [x] Cabeçalho de Relatórios usa o cabeçalho compartilhado com título e subtítulo; o H1 duplicado no renderer foi removido. A causa era a página chamar o shell com título vazio e desenhar título próprio dentro do relatório.
- [x] Filtros dentro de um único painel com superfície, borda, raio e padding; filtros avançados integrados e expansíveis. A causa visual eram estilos que removiam superfície/padding do painel compartilhado.
- [x] Estado avançado inicia fechado e fica persistido ao alternar entre Executivo/Operacional e em novos renders. Antes, a ativação da aba Operacional abria sempre o formulário, elevando a navegação no celular.
- [x] Cartões, textos KPI, nomes de ranking e links operacionais receberam padding/raios e quebra de texto coerentes.
- [x] Índice operacional agora usa duas colunas na largura efetiva estreita (inclusive 320 px e 980 px após sidebar) e quatro em desktop largo. Causa: regra base de quatro colunas tinha precedência sobre o breakpoint estreito por especificidade/ordem.
- [x] Cache de estilos/scripts incrementado e assertions de shell atualizadas.

## Matriz antes/depois

| Área | Antes (Parte B) | Depois (Parte C) |
|---|---|---|
| Shell | H1 do shell vazio; título Relatórios duplicado dentro da composição | H1 compartilhado “Relatórios”, uma ocorrência; subtítulo contextual no padrão de página |
| Filtros | Controles pareciam soltos, sem superfície/padding de painel | Um painel com borda 1 px e padding 12 px; filtros avançados dentro dele |
| Celular 320×700 | Índice operacional podia ser quatro colunas estreitas; filtros avançados forçados abertos na aba operacional | 2 colunas; links 137 px, altura natural 47–61 px e sem clipping; painel avançado fechado; sem overflow |
| Celular 390×844 | Expansão automática aumentava a área superior e deslocava a navegação | 2 colunas; índice 208 px; filtros fechados por padrão e expansíveis por ação |
| Tablet 768×1024 | Índice sem regra coerente pela largura após shell | 2 colunas, links sem clipping e sem overflow |
| Android desktop emulado 980×720 | A sidebar reduzia conteúdo mas o grid seguia janela/estilo base | 2 colunas com largura efetiva; sem clipping/overflow |
| Desktop 1440×900 | Quatro colunas previstas, porém cabeçalho/filtros/card styles inconsistentes | Índice 4 colunas, filtros 1083 px de largura úteis, cartões alinhados; sem overflow |

As capturas `antes/` são Chromium da etapa anterior. As capturas `capturas/` são renderer Chromium/CDP com código e CSS reais e dados sintéticos isolados de apresentação. O navegador da fixture não autentica contra o app nem consulta APIs do tenant. As referências originais estão em `../relatorios-v2-acabamento-2026-10-26/referencias/` (esboços em Downloads previamente arquivados); capturas novas do proprietário não estavam disponíveis nesta intervenção.

## Medições e evidência

- `capturas/report.json`: 23 verificações estruturais aprovadas; 28 viewport/tema na auditoria executiva; 10 casos operacionais em 320×700, 390×844, 768×1024, 980×720 e 1440×900 (claro/escuro); 8 medições de seções operacionais; 3 medições de rolagem/topbar.
- Em todos os casos medidos: `overflow=false`, `clipped=false`, nenhum erro JS e nenhuma resposta HTTP 4xx/5xx observada pelo harness.
- Os selects Status/Tipo/Origem mediram 233 px externos / 231 px de texto disponível a 320 px no painel aberto; valores “Todos/Todas” cabem completos.
- Topbar: 57 px de altura, `position: sticky`, `top: 0px`; bounds y=0 no início e nas amostras de rolagem. Navegação inferior permanece posicionada na viewport mobile.
- Hashes servidos pelo Nginx 127.0.0.1:8083 coincidiram com o worktree: styles `df6693a78ed12a272a41f3921c27966027bcb49857723bb2bb6cbceafb647a1d`; renderer `e686790fbe85c5e98ee6ccf46fb3494e5c2baffe7d28dbb9a8af1720de61eb40`; app `a7bdb63e9f1ec764fa76fab91185b61b65664129d5e15d6e4bece12a75b99a12`.

## Testes

- `npm test`: PASS, exit 0 (suíte completa).
- `npm run test:analytics`: após correção da asserção de whitespace, renderer/analytics PASS. O primeiro run havia falhado somente na nova asserção que não aceitava espaço antes de `>`; corrigido e `test-analytics-view.js` repetido com PASS; a suíte completa rodou depois e passou.
- Chromium/CDP com renderer e CSS reais: PASS técnico, fixture de UI, sem integração autenticada.
- `node --check app.js`, `analytics-view.js`, `sw.js`, `tests/test-analytics-view.js`; `git diff --check`: PASS.
- Teste físico Chrome Android / modo computador: BLOCKED, dispositivo físico não acessível nesta sessão.
- E2E autenticado com dados reais, tenant/permissões: BLOCKED nesta execução; esta Parte C trata apresentação e usa renderer isolado.
- Auditoria instrumental WCAG/leitor de tela: PARTIAL; semântica, foco e navegação por teclado cobertos em verificações direcionadas, mas sem ferramenta assistiva/instrumental externa.

## Gates desta Parte C

| Gate | Estado | Evidência |
|---|---|---|
| Cabeçalho compartilhado e título único | PASS técnico | Checks estruturais e Nginx com hashes locais |
| Filtros integrados/expansíveis | PASS técnico | DOM/bounds, selects sem truncamento em 320 px, estado preservado |
| Grids/navegação operacional | PASS técnico | 10 medições operacionais por tamanho/tema |
| Responsividade e overflow no renderer | PASS técnico | 28 combinações executivas; 10 operacionais; zero overflow |
| Regressão automatizada | PASS | `npm test` exit 0 |
| Shell autenticado/dados reais | PARTIAL | Não foi executado E2E autenticado |
| Chrome Android físico | BLOCKED | Dispositivo inacessível nesta execução |
| Fidelidade comparativa e aprovação humana | PARTIAL | Esboços arquivados; comparação técnica registrada, aprovação do proprietário pendente |
| G14 | **FAIL** | Requer aprovação visual expressa do proprietário |

Commit local Restaurante: `5e88a253c6e274d77a38ccea637757f894010d28` (`fix(0304): align reports shell filters and grids`), não publicado. Campanha 0304 segue PARTIAL e aberta. Nenhuma Parte D/E nem Campanha 0305 iniciada. Nenhuma alteração ao PostgreSQL oficial, app Motoboy, baseline ou contratos.
