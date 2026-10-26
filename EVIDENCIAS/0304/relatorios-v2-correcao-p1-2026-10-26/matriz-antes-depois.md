# Relatórios V2 — matriz visual Parte B (2026-10-26)

As referências são os quatro arquivos preservados na evidência da Parte A (`relatorios-v2-correcao-p0-2026-10-26/referencia-*.png`). Comparação baseada em composição e medidas DOM; capturas atuais usam Chromium/CDP e fixture de renderer, não sessão autenticada.

| Elemento | Antes desta Parte B | Depois | Resultado/limite |
|---|---|---|---|
| Eixo X de datas e horários | Fonte computada de 10,5 px no celular; rótulos densos podiam encostar | 12 px, até seis marcas espaçadas uniformemente, data DD/MM e hora HHh | Sem rótulos encavalados nos 390 e 1440 medidos; os 12 px também foram aplicados a tablets e demais tamanhos. |
| Gráfico diário | Desenhava apenas uma seleção de barras/rótulos e largura podia exagerar séries curtas | Preserva pontos de dados reais, largura limitada a 28 unidades SVG; zero retorna estado vazio e 1/5/20 pontos têm fixtures | Testes renderer confirmam contagem de barras exatamente igual ao número de pontos fornecido, sem fabricar intermediários. |
| KPIs operacionais | Descrições longas inflavam os cartões | Nota resumida no card; texto integral em `<details>` acessível; Canceladas/Falhas no mesmo bloco | Todas as métricas foram mantidas. Em 1440×900, Visão geral operacional: 511,09→438,81 px. |
| Seções 2–8 | Conteúdo/descrições altas e séries extensas | Resumos menores, detalhes técnicos sob demanda e série horária compactada | Alturas fixture em 1440×900: Entregas 475,39→390,59; Frota 430,30→371,61; Custos 549,33→501,61; Inteligência 443,00→416,41; Qualidade 390,91→323,06; Clientes/endereços 476,14→436,42; Exportação 216,38→193,78 px. Sem remover seções. |
| Faturamento indisponível | Cartão alto com explicação integral sempre aberta | Aviso compacto “Fonte financeira indisponível”; explicação em disclosure | Não converte ausência de fonte em R$ 0. |
| Mapa territorial | Resumo de falha/sem dados ocupava o dashboard e podia expor controles manuais | Estados compactos; filtros e dados detalhados em disclosure; retry somente em falha recuperável | Fixtures: vazio 84,03 px; amostra abaixo do mínimo 128,25 px; mapa agregado 126,81 px. Acesso negado e sessão expirada não oferecem retry. |
| Composição responsiva | Eixos pequenos e diversos cartões altos | Capturas 14 viewports × 2 temas; KPI em duas colunas a 390 px e quatro a 1440 px; sem overflow documental | Não equivale à aprovação visual humana nem ao Chrome Android físico. |

## Medidas DOM dos gráficos

| Viewport/tema | Largura do gráfico principal | Fonte do eixo | Marcas X observadas | Barras por série na fixture |
|---|---:|---:|---|---:|
| 390×844 claro | 327 px | 12 px | `01/10, 06/10, 11/10, 16/10, 21/10, 26/10`; horário `00h, 05h, 09h, 14h, 18h, 23h` | 26 datas / 24 horas |
| 1440×900 claro | 569,5 px | 12 px | Mesmo espaçamento, relativo à largura do cartão | 26 datas / 24 horas |

O gráfico de faturamento permanece estado indisponível pois o sistema não fornece fonte financeira oficial configurada. O mapa fixture inclui apenas células agregadas controladas para verificar renderer; não é dado operacional.
