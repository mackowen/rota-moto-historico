# Relatórios V2 — Parte 2: fidelidade visual, responsividade e acabamento

Execução: 2026-10-26. Continuação do commit Restaurante `c8e78a6`, sem reinício da Parte 1. Commit local da aplicação: `07a50eebf56be8d7a6c87bca21d3020ceada00d8` (`fix(0304): refine reports visual layout`) e `872d2ada6ef627bcd5e5b44f9a72d375860af5c4` (`fix(0304): normalize report chart labels`), branch `codex/campaign-0304-visual-consolidated`. Aplicativo não publicado.

## O que foi corrigido

- Cabeçalho de Relatórios: removido o título duplicado no topbar compartilhado, mantendo o branding, a topbar e navegação aprovados. Data inicial/final usam um controle de período pareado; motoboy fica alinhado; Status/Tipo/Origem ficam em Filtros avançados.
- Navegação e painel: categorias executivas ficaram compactas com seleção azul; abas Executivo/Operacional mantidas. A grade operacional ganhou índice responsivo com oito destinos e só a seção selecionada aparece.
- KPIs: retrato 2×2; desktop largo quatro cartões na mesma linha; cartões harmonizados, ícones semânticos à esquerda, textos indisponíveis mantidos sem inventar métricas.
- Gráficos: rótulos temporais menos densos, SVG permanece dimensionado pelo container e status continua com rosca/legenda interativa. Sem troca por imagem.
- Inteligência logística: a distribuição passou a abrir com três agregados derivados dos arrays do relatório (hora de pico, dia da semana com maior volume e dias ativos). Séries horárias, semanais e diárias completas continuam acessíveis via `<details>`. Na fixture, painel reduziu de 1832,8 px para 443 px. Os serviços de capacidade/custo seguem nos pontos de integração existentes.
- Qualidade de decisões: informações individuais permanecem recolhidas sob demanda, após indicadores consolidados.
- Restaurei da base os estilos compartilhados de Configurações e Motoboys que tinham sido removidos na tentativa de consolidar o CSS, após o teste de corridas detectar essa regressão. `test-dispatch-assignment.js` confirma o layout desktop/mobile do modal.
- Cache revisto: `styles.css?v=0304.18`, `analytics-view.js?v=0254.7`, service worker `v136`. Os rótulos SVG usam escala uniforme também no gráfico de horário.

## Comparação e medidas

Referências encontradas no Download: 2 imagens de celular (claro/escuro, 1024×1536) e 2 composições PC/tablet (claro/escuro, 1536×1024). Capturas antes da correção em `antes/`; imagens originais preservadas em `referencias/`; 26 capturas posteriores do Executivo em `apos/`; oito capturas operacionais em `operacional/`. Matriz caso a caso em [matriz-antes-depois.md](matriz-antes-depois.md).

CDP carregou CSS/renderer reais (`styles.css`, `design-system.css`, `dashboard-v2.css`, `analytics.js`, `analytics-view.js`, `dashboard-v2.js`) e funções reais de navegação do app. Testou 13 larguras/alturas em dois temas. `getBoundingClientRect`, colunas computadas, largura documental, navegação inferior, cores dos controles, exceções e respostas estão em [medicoes-dom.json](medicoes-dom.json); runner reproduzível em [visual-audit-fixture.cjs](visual-audit-fixture.cjs). A grade confirmada foi KPI 2 colunas em 320–932/720–932/768 retrato, 4 colunas a partir de 1024 CSS px disponíveis; os gráficos secundários abriram em 2 colunas desde 720 e 3 a partir de 1280. Zero overflow horizontal e zero exceções JS no renderer fixture.

O harness usa dados QA sintéticos marcados internamente, com layout real, mas é **fixture visual**, sem autenticação e sem requisições HTTP. As contagens e nomes não representam a operação. Não é prova de E2E, sync, RBAC, tenant, API, dados financeiros, exportação autenticada ou mapa em produção. Chrome Android físico/modo computador não estava disponível. A emulação CDP usa scrollbar de desktop e pode reduzir a largura útil CSS em 15 px; veja as medições diretas antes de extrapolar para Android.

## Testes

PASS: `test-analytics.js`, `test-logistics-decision-quality.js`, `test-visual-shell-cache.js`, `test-sw-atomic-install.js`, `test-presence-qr-modal.js`, `test-dashboard-v2.js`, `test-dispatch-assignment.js`, `test-printing-offline.js`, `test-identity-ui.js`, `test-territorial-analytics.js`, `test-logistics-http.js`, `test-logistics-domain.js`; `node --check` em `analytics-view.js`, `app.js`, `dashboard-v2.js`, `logistics-ui.js`, `sw.js`; `git diff --check`. CDP: 20 verificações estruturais/interativas, 26 capturas executivo e 8 painéis; sem overflow ou exceção JS. Não foi executada suíte integral `npm test` nesta intervenção.

BLOCKED/PARTIAL: E2E autenticado não foi substituído pela fixture; esta rodada não dispunha de sessão/tenant isolados autorizados e verificáveis para escrita. Não houve alteração ou escrita no PostgreSQL oficial. Auditoria instrumental completa WCAG AA não executada. Referências não cobrem celular paisagem independente nem tablet retrato; comparação nesses casos é por composição. Alguns dados reais e destinos detalhados dependem das integrações já existentes e não foram validados neste harness.

## Gates da intervenção

| Gate | Estado | Evidência |
|---|---|---|
| Celular retrato claro/escuro | PARTIAL | 320/360/390/430 × 2 temas sem overflow; fixture CDP, Android físico pendente. |
| Celular paisagem claro/escuro | PARTIAL | 720/800/844/932 × 2 temas emulados; sem desenhos específicos ou dispositivo físico. |
| Tablet | PARTIAL | 768×1024 e 1024×768 × 2 temas; grade DOM sem overflow; composição independente não fornecida. |
| PC claro/escuro | PARTIAL | 1280/1440/1920 × 2 temas, filtros e categorias medidos; G14 depende do proprietário. |
| Executivo/operacional | PASS técnico | 20 checks de navegação, tabs, filtro preservado e acesso direto a 8 seções. |
| Gráficos/rankings | PARTIAL | SVG/rosca e cartões renderizados na fixture; dados reais, integração completa e mapa autenticado não provados. |
| Responsividade/overflow | PASS técnico | 26 casos CDP em dimensões CSS solicitadas, sem overflow horizontal. |
| Regressões | PASS | 12 testes direcionados, 5 verificações de sintaxe e diff-check passaram. |
| Acessibilidade/contraste | PARTIAL | semântica/foco e cores consultadas por DOM; sem auditoria instrumental completa. |
| E2E autenticado / Android físico | BLOCKED | infraestrutura/sessão autorizada e device físico indisponíveis nesta execução. |
| G14 — aprovação do proprietário | **FAIL** | Aprovação humana ainda necessária; nenhum score de similaridade é alegado. |

Diferenças restantes: as capturas de referência usam outra proporção e hierarquia sem a aba estrutural Executivo/Operacional aprovada; o renderer mostra placeholder indisponível para faturamento e serviços sem estado autenticado; a grade no tablet e paisagem precisa de avaliação humana no dispositivo alvo; navegação, filtro sincronizado, expansão e densidade final não foram aceitos pelo proprietário. A Campanha 0304 continua aberta; não iniciar 0305.
