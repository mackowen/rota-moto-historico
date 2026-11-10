# Evidências — Fluxo Bootstrap E2E e comando compacto (0311)

- Browser: Chromium headless por CDP em `http://127.0.0.1:8083/bootstrap.html`, emulação 390×844.
- Diagnóstico: título do ambiente E2E; indicador `Diagnóstico · Etapa 1 de 8`; botão Continuar disponível; comando E2E exibido/copied.
- Navegação: clique em Continuar apresentou `Administrador · Etapa 2 de 8`; barra contém oito etapas; guia do operador presente e fechado inicialmente; comando nele corresponde ao comando E2E e botão `Copiar comando E2E`.
- Console/network/layout: zero exceções JS, zero HTTP 4xx/5xx, sem overflow horizontal.
- Comando: `cd "$HOME/projetos/repos/rota-moto-restaurante" && npm run --silent bootstrap:prepare-browser:e2e`.
- CLI sem TTY: código `E2E_BOOTSTRAP_TTY_REQUIRED` esperado, antes de qualquer conexão; não revelou parâmetros de ambiente.
- `npm run assets:check`, testes CLI de bootstrap oficial/E2E e `npm run test:e2e-guards`: PASS.
- Nenhuma autorização ou escrita de banco foi realizada.
