# Campanha 0304 — Parte M revisada: Relatórios

Data: 2026-10-27 UTC. **Correções implementadas; validação autenticada PENDENTE/BLOCKED.** Campanha 0304 aberta/PARTIAL, G14 **FAIL** até aprovação visual expressa do proprietário. 0305 não iniciada.

## Escopo e acesso real

Restaurante inicial `4fcb095bae2f7f2803668207a488ccae391d20a6`; branch própria `codex/campaign-0304-relatorios-m`. Commit local: `c8e021955cc074c237f6d5fdb26e5d3a359e1d40`. Nenhum push de aplicativo.

A página real em `127.0.0.1:8083` foi aberta no Chromium 155/CDP. Login visível, `RotaMotoAppReady=false`, aplicativo protegido oculto. Não havia sessão autorizada ativa nem credencial de teste recuperável disponível para essa navegação. Não se criou conta, sessão artificial no servidor ou fixture PostgreSQL para contornar autenticação. **Browser QA autenticado dos Relatórios: BLOCKED.** As credenciais hardcoded de harnesses históricos não representam conta existente: os registros anteriores dizem que os fixtures foram removidos.

Foi feita auditoria dinâmica dos componentes reais em página isolada `data:`, com CSS, renderizador, agregador, módulo monetário, navegação e módulo logístico do projeto. Dados e respostas HTTP são amostras sintéticas em memória; o adaptador de filtros chama o agregador real. Isso exercita o navegador e o DOM, mas não equivale a login, RBAC, sincronização ou consulta autenticada do banco. Nenhuma aprovação visual é inferida desta amostra.

## Problemas, correções e evidências

Os links “antes” usam a versão anterior `4fcb095` renderizada no Chromium com a mesma amostra; “depois” usa o código corrigido. As reproduções controladas não são capturas do aparelho do proprietário.

| ID | Problema / causa | Classificação | Evidência |
|---|---|---|---|
| M01 | Avisos financeiros em grid de duas colunas comprimiam o título e a explicação; textos se cruzavam. Corrigido o fluxo vertical, com largura mínima flexível e espaçamento. | **CORRIGIDO**, no componente | [Antes mobile](before/390-light-empty-report-costs.png), [depois](after/390-light-empty-report-costs.png). Detector de texto: 14 estados anteriores com colisão, zero posteriores na comparação. |
| M02 | Quatro KPIs e três cards eram forçados pela largura da tela, ignorando a sidebar. Agora seguem a largura útil; KPIs estreitos usam ícone em linha própria, e indicador único ocupa toda a linha. | **CORRIGIDO**, no componente | [Antes 980 px](before/980-light-data-overview.png), [depois](after/980-light-data-overview.png). |
| M03 | Grupos executivos ficavam encostados mesmo com gap dentro de cada grid. O painel executivo agora organiza seus grupos em grid com token de espaçamento. | **CORRIGIDO**, no componente | [Antes desktop](before/1440-light-data-overview.png), [depois](after/1440-light-data-overview.png); mínimo medido de **12 px** entre grupos na passagem final. |
| M04 | Notas eram limitadas a duas linhas por CSS; explicações de KPIs dependiam de hover. Retirada a limitação e disponibilizado disclosure nativo para notas completas. | **CORRIGIDO**, no componente | [Antes custos](before/1440-dark-empty-report-costs.png), [depois](after/1440-dark-empty-report-costs.png); zero notas cortadas no teste final. Prévia abreviada com “Detalhes” é intencional; a explicação completa permanece acessível. |
| M05 | Acordeões de etapas/distribuições não compartilhavam tratamento de borda, padding e summary. Agora usam o padrão de disclosures do relatório, sem altura fixa ou animação artificial. | **CORRIGIDO**, no componente | [Antes horários](before/390-light-data-report-intelligence.png), [depois](after/390-light-data-report-intelligence.png); estados fechados/abertos registrados, clique de ponteiro e retenção do filtro avançado verificados. |
| M06 | Categorias herdavam `position:sticky`; filtros/navegação podiam ficar sobre o conteúdo. Removido na regra de origem. | **CORRIGIDO**, no componente | [Medições](browser-matrix.json): filtros deslocaram exatamente 200 px para scroll de 200 px. Cabeçalhos/coluna de tabela dentro do scroll próprio foram preservados. |
| M07 | Escala financeira ficava na área percentual do SVG e disputava espaço com valores monetários longos. Eixo HTML agora reserva largura pelo texto real; rótulos de datas têm amostragem legível. | **CORRIGIDO**, no componente | [Antes 980 px](before/980-light-data-overview.png), [depois](after/980-light-data-overview.png), sem trocar os valores ou a moeda. |
| M08 | Resumo do mapa dividia espaço com botão e comprimia a descrição. Botão passou para sua própria linha. | **CORRIGIDO**, no componente | [Antes mapa](before/1440-light-data-overview.png), [depois](after/1440-light-data-overview.png). Mapa, cobertura, tabela e filtros territoriais foram expandidos na amostra. |
| M09 | Distribuição detalhada por hora herdava limite de 12 barras; ocultava 12h–23h. Agora exibe as **24 horas** já calculadas pelo agregador. | **CORRIGIDO** | [Depois horários](after/390-light-data-report-intelligence.png); teste exige 24 linhas e 23:00 na distribuição detalhada, sem alterar a agregação. |
| M10 | Falha de consulta financeira não atualizava a tela; resposta HTTP 200 malformada podia virar lista vazia. Agora há estados distintos de consulta/carregamento/erro/offline/acesso e validação de `events`. | **CORRIGIDO**, no componente; **PARCIAL** ponta a ponta | [Antes erro](before/390-dark-error-finance.png), [depois](after/390-dark-error-finance.png); teste executa função real com falha, retry, offline e resposta inválida, sem loop de requisições. Falha não é “nenhum lançamento”. |
| M11 | Jargões e concordância: IndexedDB, razão não consultado, callbacks, outcomes, timestamps, Order, plural “1 pedidos” etc. Textos simplificados; limitações de pagamentos mantidas. | **CORRIGIDO**, revisão de código/amostra; aprovação **PENDENTE** | Capturas e testes de renderização. Valores de pedidos, recebimentos, estornos, ajustes e repasses continuam separados. |
| M12 | Seções tinham `aria-labelledby` apontando para títulos inexistentes. | **CORRIGIDO** | Títulos passaram a ter IDs correspondentes; teste confere todas as referências do relatório. |
| M13 | Jornada real autenticada, dados/sessão reais, reload/sync e exportação autenticada após patch. | **PENDENTE — BLOCKED** | [Acesso real](live-check.json). Sem credencial/sessão disponível; nenhuma autenticação simulada foi promovida a prova real. |
| M14 | Aprovação visual do proprietário. | **PENDENTE — G14 FAIL** | Esta entrega não encerra a campanha. |

## Navegador, estados e scroll

- Sete categorias executivas e oito seções operacionais percorridas individualmente. O teste não se limitou à primeira dobra.
- Matriz principal: **750 estados**, larguras 320/390/768/980/1440, temas claro/escuro, pedidos com dados/sem pedidos, carregamento, erro e offline; dimensões com disclosures recolhidos e expandidos. Scroll atravessou o conteúdo até o limite em cada estado.
- Passagem adicional após corrigir os grupos encostados e o KPI único: **270 estados**, 390/980/1440, dois temas, dados/vazio/erro. Zero overflow de página/cards, sobreposição de cards, conteúdo escapando, notas cortadas ou fixação indevida fora da tabela. Zero scrolls incompletos; gap executivo mínimo 12 px.
- Comparação controlada: **64 estados** antes/depois em 320/390/980/1440, dois temas. Cliques de ponteiro alternaram filtros corretamente; scroll natural medido. As **20 verificações** de navegação incluem todas as categorias/seções, teclado, troca de origem, preservação de seção/filtro avançado e alerta de intervalo inválido.
- Capturas adicionais (20 estados finais) cobrem [visão operacional geral](after/1440-dark-report-overview-details.png), [frota](after/390-light-report-fleet.png), [qualidade](after/390-dark-report-quality.png), [exportação](after/1440-light-report-export.png) e falha financeira. O [indicador único financeiro](after/390-light-data-finance.png) também ocupa a largura disponível. Não houve download de CSV com dados reais; apenas apresentação e acesso ao controle foram inspecionados.
- Capturas completas são composições do documento: a barra inferior fixa aparece na coordenada do viewport inicial. Isso não representa uma sobreposição entre cards. [Último trecho de custos](after/390-dark-empty-report-costs-bottom.png) e [último trecho de horários](after/390-dark-data-report-intelligence-bottom.png) mostram o conteúdo alcançável ao final do scroll, com espaço para a navegação.

A revisão visual das capturas detectou espaçamento vertical insuficiente que o detector de colisão não marcava; ele foi corrigido antes da passagem de 270 estados. A primeira automação também lia `scrollY` antes de terminar o scroll suave; a infraestrutura foi ajustada para posicionamento determinístico e posição final conferida. Os testes relevantes foram repetidos, sem mudar o aplicativo para contornar isso.

A coleta de eventos CDP foi corrigida para inscrição por `client.on(...)`, em lugar de atribuição a propriedades. Os arrays de exceções das passagens geométricas iniciais não são usados para provar ausência global de erro. A referência final é `final-observation.json`, com autoteste de listener em página QA separada. `live-check.json` registra 38 respostas HTTP reais, zero resposta inesperada, página não autenticada preservada e quatro assets HTTP 200 com SHA-256 igual ao arquivo local.

**Observação final de exceções: **750 estados do código final, listener verificado, zero exceções e zero falhas geométricas/scroll**. O autoteste de exceção é deliberado, ocorre em página QA separada e não é contado como erro do aplicativo.** Nota de QA da amostra de componentes: **4/5**, limitada pela ausência de jornada autenticada e aprovação do proprietário; não é G14 PASS.

## Testes, manutenção e dados preservados

Doze scripts pertinentes passaram: analytics, analytics-view, territorial-analytics, territorial-http, logistics-decision-quality, logistics-intelligence, visual-shell-cache, sw-atomic-install, navigation-shell-renderer, mobile-more-navigation, identity-ui e order-money. `npm run test:analytics` passou. Novos testes distinguem falha de consulta e histórico vazio, validam 24 horas, referências acessíveis e lifecycle de carregamento/falha/retry/offline/resposta inválida. Nenhum teste foi removido ou desativado.

Asserções existentes de versões do shell foram atualizadas para os assets novos e cache v145; falhas iniciais dessas expectativas não foram escondidas. Os contratos de autenticação permaneceram nos testes. `node --check` em app/renderizador/logística/SW e `git diff --check` passaram; 37 referências do HTML existem. Índice e SW usam versões consistentes para evitar servir combinação antiga de CSS/JS.

`analytics.js`, regras financeiras, contratos, payloads, backend, migrations e dados PostgreSQL não foram alterados. `app.js` muda a comunicação da consulta financeira e rejeita resposta inválida; só repassa lançamentos confirmados quando há sessão com permissão de leitura. Agregação monetária e escrituras financeiras permanecem intactas. As respostas sintéticas de QA ficam somente no harness, fora do código de produção.

PostgreSQL conferido como `rotamoto_auditor` em transação READ ONLY: `rotamoto` segue com **55 migrations e 55 checksums corretos**. Nenhuma migration reaplicada; nenhum banco, backup ou chave criado; nenhuma conexão ao E2E. Não houve fixture de banco nesta parte.

Motoboy `64d2e13d8e455f48b20b32b396e9c49ba7553e0b` e Browser QA `57cb7745828e24d50502bec89061d2ceb59e0200` mantiveram HEAD/status/tags; 1027 linhas de status preexistente do Browser QA preservadas. Novos runners/capturas ficaram na área temporária compartilhada. A tag protegida Restaurante continua em `9ebb7098725200bdec82e79be1e9ea622fe20120`. Untracked `login-redesign-2026-10-25/` do Histórico preservado. Backlog de Restaurante/Motoboy desde 0257 permanece aberto, sem migração de pendências para PASS por estes testes.

## Artefatos e reprodução

- [Matriz geométrica, scroll e comparação](browser-matrix.json).
- [Resultado dos testes](tests-final.json), [assets/referências](asset-references.json), [acesso real](live-check.json), [PostgreSQL preservado](postgres-preserved.json), [preservação Git](preservation.json).
- Runners CDP: `audit.cjs`, `fixture-prefix.cjs`, `focus.cjs`, `observe-final.cjs`, `extra-sections.cjs`, `live-check.cjs`. Dependem da infraestrutura Termux já instalada; não usam Playwright.

Os runners lêem fontes reais do checkout e a revisão anterior por `git show`; não fazem checkout destrutivo nem escrevem banco. A referência privada `~/rotamoto-data/maintenance/active-0304-m` aponta ao diretório desta execução sob `~/projetos/browser-tests/.temporarias/`; ela não contém segredo. Para repetir no mesmo ambiente, iniciar Chromium/CDP em 19222, então executar o runner correspondente. Perfis, logs privados e artefatos completos da execução não foram adicionados aos repositórios de aplicativos. Evidências públicas contêm apenas amostras sintéticas e metadados não sensíveis.
