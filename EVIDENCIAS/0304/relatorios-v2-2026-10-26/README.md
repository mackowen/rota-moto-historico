# Relatórios V2 — evidências da Parte 1 e Parte 2

Data: 2026-10-26  
Aplicativo: `rota-moto-restaurante`  
Branch: `codex/campaign-0304-visual-consolidated`  
Commit: `5de9258` (`feat(0304): complete reports dashboard v2`)

## Escopo concluído

- Cabeçalho de Relatórios, seleção de datas civis, motoboy, status, tipo e origem.
- Navegação por Visão Geral, Entregas, Financeiro, Motoboys, Horários, Clientes e Endereços; links levam às seções correspondentes e os filtros do donut atualizam o recorte.
- KPIs de operações de entrega distintas, sucesso, faturamento indisponível sem razão oficial, e duração média atribuída→concluída.
- Gráficos de operações por dia, status e hora local; série de faturamento mostra o motivo da indisponibilidade. As séries diárias/horárias reconciliam com operações reais (incluindo RETURN/REDELIVERY distintos) agrupadas pela data/hora civil de `Order.createdAt`.
- Rankings do recorte: motoboys por contagem (desempate estável por nome/ID); clientes e endereços apresentados anonimizados na visão geral. Seções detalhadas legadas mantêm a recorrência disponível no app, baseada na base local tenant-scoped.
- Cartão do mapa ligado ao serviço territorial existente. A UI só recebe geodados do serviço autorizado; sem consulta autenticada desta execução, a captura mostra estado de carregamento/indisponibilidade, nunca coordenadas inventadas.
- Layout por largura útil, tema claro/escuro, foco, títulos acessíveis e estados vazios.

## Fontes e fórmulas

- Dados operacionais: `RotaMotoAnalytics.aggregate` (`analytics.js`), usando Orders, Deliveries, DeliveryEvents, Earnings e Motoboys já carregados no espaço local da empresa. A tela não grava dados.
- Datas: intervalo inclusivo de datas civis no fuso IANA cadastrado pela empresa. Sem fuso válido, a faixa usa UTC; gráficos por hora local são indisponíveis. A coorte é `Order.createdAt`.
- Entregas: uma contagem por Delivery distinta associada aos pedidos do recorte; sem Delivery, o registro legado de Order representa uma operação. RETURN/REDELIVERY são operações próprias. A Order permanece única nos totais comerciais.
- Taxa de sucesso: Deliveries concluídas (`DELIVERED`/estados canônicos de conclusão) ÷ Deliveries com estado reconhecido. Desconhecidos ficam fora do denominador. A porcentagem não representa SLA.
- Faturamento: **indisponível**. Não foi encontrada fonte oficial de razão de receita com cancelamentos, ajustes e estornos. Totais monetários de pedidos e Earnings não são usados como faturamento.
- Tempo médio: `assignedAt` (fallback de evento de atribuição único) até `completedAt` (fallback de evento de conclusão), somente para Delivery concluída e sequência válida; minutos com uma casa decimal. Incompletas, futuras ou invertidas não entram.
- Tendências comparativas não aparecem sem período-base equivalente.
- Território envia datas e filtros ao endpoint tenant-scoped existente, resolve motoboy local para ID canônico e não inventa coordenadas ou tiles.

## Auditoria visual

Referências fornecidas pelo proprietário em `/storage/emulated/0/Download/`:

| Referência | SHA-256 |
|---|---|
| `aba-relatorios-celular-claro.png` | `65a6d175349877562791ee0b45d69f8bdda6e8f7d570c62318746047eb4c8a86` |
| `aba-relatorios-celular-escuro.png` | `f9bc1da1a6765114a7d5f57bfed22198cc7f6332f4e02599636394a0c9805572` |
| `aba-relatorios-pc-tablet-claro.png` | `8f462561c4e19bd0108f118f43fbcd46ac1633e503b756a9c0dace623cd795e0` |
| `aba-relatorios-pc-tablet-escuro.png` | `2dd23d481842494b7d7f4b740f0d54eeb605ac2d22ab67b2df61790bba15a82e` |

Chromium/CDP executou renderer e CSS reais com fixtures marcadas “Visualização de fixture de teste”. Foram registrados 26 cenários (13 viewports × claro/escuro): retrato 320×800, 360×800, 390×844 e 430×932; paisagem 720×360, 800×360, 844×390 e 932×430; tablet 768×1024 e 1024×768; PC 1280×800, 1440×900 e 1920×1080. `dom-measurements.json` traz margens/retângulos de cabeçalho, filtros, KPIs e painéis, colunas, cores e largura do documento. Resultado: 0 overflow horizontal, 0 exceções de runtime e 0 respostas HTTP de erro. Capturas representativas:

- `mobile-retrato-claro-390x844.png` — R01.
- `mobile-retrato-escuro-390x844.png` — R02.
- `mobile-paisagem-claro-800x360.png` — R03.
- `mobile-paisagem-escuro-800x360.png` — R04.
- `tablet-paisagem-claro-1024x768.png` — R05.
- `pc-claro-1440x900.png` — R06.
- `pc-escuro-1440x900.png` — R07.

Comparação de composição: retrato mantém filtros empilháveis/compactos, abas em duas linhas e KPIs 2×2; paisagem reusa a largura e adapta a grade à largura útil após sidebar; tablet usa duas ou quatro colunas segundo espaço disponível; desktop segue 4 KPIs, 2 painéis principais, 3 secundários e 3 painéis finais. A composição geral está próxima dos esboços. Não foi calculada pontuação pixel a pixel; validação e aprovação visual humana continuam pendentes. As capturas sintéticas comprovam somente renderer/layout, não dados, sessão, mapa ou fluxos E2E reais. O seletor HTML nativo de data segue a localidade do Chromium.

Chrome Android físico/modo computador não estava disponível para esta rodada.

## Testes, segurança e limites

- `npm test` do Restaurante: PASS (suíte integral).
- `node tests/test-analytics.js`: PASS, inclusive intervalo civil, faixa inválida, timezone e fixture controlada 1 Order/2 Deliveries reconciliando contagens diárias/horárias.
- `node tests/test-territorial-analytics.js`: PASS, agregação, privacidade, intervalo civil/UTC e entrada inválida.
- `node tests/test-territorial-http.js`: PASS, autenticação, RBAC/CSRF e limites HTTP existentes.
- `node --check` nos cinco módulos alterados de aplicação e `sw.js`: PASS.
- Atualização dos URLs do shell e cache Service Worker: PASS nos testes offline/atomic install.
- Sessão autenticada, consulta real dos gráficos/rankings/mapa, isolamento cross-tenant E2E via browser e recarga autenticada: **BLOCKED**; não havia credencial/browser autorizado para login nesta execução. Os testes HTTP unitários não são prova de E2E real.
- Faturamento oficial: **PARTIAL/BLOCKED por fonte ausente**; apresentado como indisponível.
- Modo computador físico Android e aprovação humana: **BLOCKED**.

## Gates da Parte 1/2

| Gate | Estado | Evidência/limite |
|---|---|---|
| Celular claro/escuro | PARTIAL | CDP renderer nos tamanhos indicados, sem overflow; não autenticado e sem aprovação humana. |
| Paisagem claro/escuro | PARTIAL | CDP renderer em quatro viewports, sem overflow; sidebar da fixture reproduz o shell. |
| Tablet | PARTIAL | 768×1024 e 1024×768 nos dois temas; sem prova Android físico. |
| PC claro/escuro | PARTIAL | 1280/1440/1920 nos dois temas; screenshot em 1440. |
| Filtros | PARTIAL | Datas/faixa civil, motoboy/status/tipo/origem em UI; não houve fluxo autenticado no browser. |
| KPIs/cálculos | PASS | Teste da agregação canônica e fixture controlada; comparação percentual omitida sem baseline. |
| Gráficos | PARTIAL | Entregas/status/horários reais na agregação e layout aprovado em CDP; receita sem razão oficial e sem E2E real. |
| Rankings | PARTIAL | Agregação por filtros, desempate determinístico e visão geral anonimizada; E2E autorizado não executado. |
| Mapa | PARTIAL | Ligado ao endpoint territorial existente, tenant-scoped; captura não consultou mapa autenticado. |
| Segurança/tenant | PASS (testes de contrato) / PARTIAL (integração) | HTTP territorial auth/CSRF e testes de privacy PASS; browser cross-tenant BLOCKED. |
| E2E integrado | BLOCKED | Nenhuma sessão/tenant autenticado autorizada disponível; fixtures isoladas não foram tratadas como integração real. |
| Acessibilidade/contraste | PARTIAL | Labels, status, foco visível, SVG e tema verificados manualmente; sem auditoria automatizada completa WCAG AA. |
| Regressão | PASS | `npm test` integral e testes pertinentes passaram. |
| G14 | **FAIL** | Requer aprovação expressa do proprietário; não inferida. |

## Pendências para conclusão

- Executar E2E com sessão/tenant de teste autorizados para datas vazias/preenchidas, filtros rápidos, permissões, isolamento entre tenants, refresh/reload, mapa e sincronização.
- Definir a fonte oficial do faturamento e regras de cancelamento, ajustes e estornos antes de preencher KPI/gráfico financeiro.
- Cobrir decisão do proprietário para métricas de sucesso, fonte/unidade do tempo médio e comparação entre períodos equivalentes.
- Auditar WCAG AA instrumentalmente e executar Chrome Android modo computador.
- Comparação visual e aprovação humana explícita; até ela, G14 FAIL.

## Gates e commits

- `5de9258` local em `rota-moto-restaurante`; aplicativo não publicado.
- Nenhuma alteração em `rota-moto`, PostgreSQL oficial ou início da Campanha 0305.
- Histórico publicado por fast-forward apenas depois do commit documental.
