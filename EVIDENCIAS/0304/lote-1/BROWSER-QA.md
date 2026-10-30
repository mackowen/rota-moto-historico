# Browser QA — Lote 1

Executado com Chromium headless isolado e perfil temporário descartável (sem cookies importados), nas URLs E2E Restaurante 8083 e Motoboy 8084. Viewports: 390×844 e 1440×900; temas claro/escuro. Capturas sem dados pessoais: `browser/restaurante-mobile-light.png`, `browser/restaurante-mobile-dark.png`, `browser/restaurante-desktop-light.png`, `browser/restaurante-desktop-dark.png` e equivalentes `motoboy-*`. Medições em `browser/smoke.json`.

Medições estáveis: `scrollWidth` igual à largura de viewport, sem overflow horizontal. Chromium emitiu avisos de GPU software; sem exceção JavaScript. O endpoint `/api/identity/session` retornou 401 nas navegações anônimas, como esperado. Isso confirma apenas a proteção sem sessão, não acesso autenticado.

**BLOCKED autenticado:** não havia sessão ativa/recentemente MFA-verificada no E2E e o perfil pessoal do proprietário não foi acessado. Nenhum login foi contornado. A verificação real dos fluxos Super ADM/Configurações requer sessão legítima de QA e membership/contexto empresarial válido.

Veredito limitado da superfície pública: **4/5** para renderização responsiva e tela pública nos viewports medidos; telas protegidas não foram avaliadas nem pontuadas por falta de sessão.
