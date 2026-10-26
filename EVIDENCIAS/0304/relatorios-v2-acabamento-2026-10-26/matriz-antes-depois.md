# Relatórios V2 — comparação visual Parte 2

Data: 2026-10-26. Comparação entre referências preservadas, capturas da implementação pré-ajuste e capturas pós-ajuste. Todos os screenshots “antes/depois” são do renderer/CSS real carregado em fixture visual CDP; os dados Ana QA e Cliente QA existem apenas nessa fixture. Não são E2E autenticado.

## Referências disponíveis e cobertura

| Referência | Uso nesta comparação |
|---|---|
| `referencias/aba-relatorios-celular-claro.png` (1024×1536) | R01 retrato claro. |
| `referencias/aba-relatorios-celular-escuro.png` (1024×1536) | R02 retrato escuro. |
| `referencias/aba-relatorios-pc-tablet-claro.png` (1536×1024) | Referência composta para R05 tablet paisagem e R06 desktop claro. |
| `referencias/aba-relatorios-pc-tablet-escuro.png` (1536×1024) | Referência composta para R07 desktop escuro. |

Não há desenhos independentes de celular paisagem nem de tablet retrato. R03/R04 são comparados com a hierarquia e densidade das referências de celular/desktop, sem alegar correspondência pixel a pixel. R05 também não possui recorte de tablet exclusivo. Chrome Android físico/modo computador não estava disponível; emulação CDP desktop é registrada como tal.

## Matriz comparativa

| Caso | Referência | Antes | Depois | Medição e observação depois |
|---|---|---|---|---|
| R01 celular retrato claro | referência celular claro | `antes/390x844-light.png` | `apos/reports-390x844-light.png` | 390×844 CSS px; área de layout medida 375 px no Chromium desktop (15 px da scrollbar clássica); KPI 2 colunas; gráficos primários 1; categorias 4 colunas; bottom nav y=778 h=66; overflow horizontal falso. Título duplicado e formulário alto foram removidos. |
| R02 celular retrato escuro | referência celular escuro | `antes/390x844-dark.png` | `apos/reports-390x844-dark.png` | Mesmas grades de R01; superfícies e cores semânticas preservadas; sem overflow. |
| R03 celular paisagem claro | sem arte própria; comparação composta | — | `apos/reports-720x360-light.png` | Conteúdo útil 457 px após navegação existente; KPI 2 colunas, gráficos secundários 2; sem overflow. |
| R04 celular paisagem escuro | sem arte própria; comparação composta | — | `apos/reports-720x360-dark.png` | Mesma distribuição de R03 no tema escuro; sem overflow. |
| R05 tablet paisagem claro | composição PC/tablet claro | — | `apos/reports-1024x768-light.png` | Conteúdo útil 753 px; KPIs 4 colunas, gráficos secundários 2, categorias 7; sem overflow. |
| R06 desktop claro | composição PC/tablet claro | `antes/1440x900-light.png` | `apos/reports-1440x900-light.png` | Conteúdo útil 1169 px; KPIs 4, navegação analítica 7; gráficos principais 2; secundários/terciários 3; sem overflow. |
| R07 desktop escuro | composição PC/tablet escuro | `antes/1440x900-dark.png` | `apos/reports-1440x900-dark.png` | Mesma grade de R06; legendas/status e valores revisados; sem overflow. |
| Operacional — todas as seções | sem desenhos separados | não havia screenshots nesta matriz | `operacional/operational-<section>-1440x900-light.png` (8 arquivos) | Uma única seção visível por vez. Inteligência logística reduziu de 1832,8 px a 443 px no fixture; distribuições detalhadas passaram para expansão acessível. |

As 26 capturas executivas estão em `apos/` (13 viewports por dois temas), não somente os sete casos representativos da tabela. Viewports verificados: 320×800, 360×800, 390×844, 430×932; 720×360, 800×360, 844×390, 932×430; 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080. Medições completas `getBoundingClientRect`/grades/overflow, erros e as oito alturas operacionais: `medicoes-dom.json`.

## Alterações observáveis

- Relatórios tem um único título no conteúdo, filtros de período alinhados, motoboy compacto e filtros avançados recolhíveis no Executivo.
- KPIs usam 2×2 no retrato e 4 colunas a partir da largura útil disponível. Conteúdo indisponível usa “Sem base”/“Indisponível” em vez de valores inventados.
- Categorias executivas estão visualmente compactas; o desenho acrescenta a aba principal Executivo/Operacional detalhado, aprovada na Parte 1.
- Gráficos preservam SVG responsivo, tooltips `<title>`, rosca e paleta semântica; rótulos de eixo reduziram densidade e escala em telas menores.
- A área operacional mostra índice compacto em grade; a inteligência logística agora prioriza três resumos derivados dos agregados reais, com distribuições extensas sob demanda.
- Estilos compartilhados de configurações e frota removidos acidentalmente durante a consolidação foram restaurados da versão anterior; testes específicos confirmam os estilos do modal de corridas.

## Gates visuais e limites

| Gate | Estado | Evidência/limite |
|---|---|---|
| Estrutura/responsividade CSS nos 13 viewports | PASS técnico | 26 medidas DOM sem overflow; grades e navegação no `medicoes-dom.json`. |
| Temas claro/escuro no renderer isolado | PARTIAL | 26 capturas; sem auditoria instrumental completa de contraste/assistiva e sem shell autenticado. |
| Comparação com desenhos em retrato e desktop | PARTIAL | Quatro desenhos originais confrontados visualmente; estrutura ficou mais próxima. Ainda existe diferença de conteúdo/composição e a aprovação é do proprietário. |
| Paisagem e tablet retrato | PARTIAL | Emulação responsiva coberta; referência independente ausente e dispositivo físico não testado. |
| Oito painéis operacionais | PARTIAL | Navegação estrutural e screenshots da fixture; dados remotos e seção de custos/logística autenticados não exercitados. |
| E2E autenticado / Chrome Android físico | BLOCKED | Fixture sem login não substitui sessão autorizada; dispositivo físico/modo computador não acessível nesta execução. |
| G14 | **FAIL** | Reprovação anterior continua até aprovação visual expressa do proprietário. |

Não se declara meta de 95%: não existe pareamento semântico por pixel dos desenhos compostos nem aprovação humana. Diferenças restantes: as referências celular/PC têm outras proporções e não mostram a navegação primária estrutural acrescentada; screenshots da fixture têm os dados sintéticos explicitamente rotulados e, por isso, não provam os cartões/mapa com dados autorizados; filtros nativos de data variam com locale/dispositivo.
