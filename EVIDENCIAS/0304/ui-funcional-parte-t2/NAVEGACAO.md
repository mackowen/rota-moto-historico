# Navegação e shell dos dois apps

**T2-07 — PASS no harness de layout; PARTIAL em dispositivos reais.** O topo do Restaurante usa `position: sticky`; nos viewports medidos permaneceu contínuo: em 320 px iniciou e ficou em y=0; em 768 px passou de y=12 a y=11 no primeiro pixel; em 1024/1440 px passou de y=28 a y=27, chegando suavemente a y=0 com o scroll máximo medido. Não houve salto abrupto.

**T2-08 — PARTIAL.** O cabeçalho e conteúdo usam regras compartilhadas; a matriz de Rotas mediu os limites disponíveis. Home, Pedidos, Entregas, Motoboys, Relatórios e Ajustes não foram medidos visualmente em sessão autenticada. Não foi aplicada regra pontual às abas.

**T2-09 — PARTIAL.** O trilho de Rotas foi corrigido em tablet. `test-navigation-shell-renderer.js` e `test-mobile-more-navigation.js` aprovam labels sem duplicação, destinos e navegação agrupada do Restaurante; testes Motoboy `test-structural-navigation-responsive.js`, `test-navigation-workflow.js`, `test-navigation-intents.js` passaram. O CSS usa safe-area na navegação inferior e toast; no harness, toast sintético ficou acima da barra (sem sobreposição). Insets reais de Android e mudança de orientação não foram emulados com hardware.

**T2-10 — BLOCKED para sessão real.** O estado padrão do Restaurante é `dashboard`; `goTab()` verifica permissão e mantém histórico. Não havia sessão autenticada browser/CDP reutilizável; não foi feita tentativa de login.

Motoboy não recebeu alteração de código nesta parte.
