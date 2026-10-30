# Testes e medições — Parte T.13

## Regressão automatizada

- Restaurante `npm test` completo: PASS.
- Restaurante `npm run assets:check`: PASS (executado pela suíte e verificado separadamente após a mudança, sem alteração do Restaurante).
- Motoboy `npm test`: PASS, incluindo novo `tests/test-landscape-topbar.js`.
- Motoboy `npm run assets:check`: PASS.
- `git diff --check`: PASS nos dois repositórios.
- O novo teste protege a regra short-landscape, reserva de espaço/safe area, altura 56 px e preservação dos breakpoints portrait e desktop.

## Browser QA — Chromium/CDP isolado

Perfil temporário descartável; CSS real lido dos dois checkouts; harness de topbar e conteúdo longo sintético. Temas claro/escuro. Cada viewport foi medido no topo, após deslocamentos de 1 px e 100 px, no meio do conteúdo e ao voltar ao topo. Valores de cada medição estão nos JSON anexos.

| App / viewport | Antes | Depois | Observação |
|---|---:|---:|---|
| Motoboy 390×844 | fixed, y=0, 56 px | fixed, y=0, 56 px | portrait preservado |
| Motoboy 844×390 | sticky, y=0, 60 px | fixed, y=0, 56 px | lacuna de breakpoint corrigida |
| Motoboy 915×412 | sticky, y=0, 60 px | fixed, y=0, 56 px | lacuna de breakpoint corrigida |
| Motoboy 700×320 | fixed, y=0, 56 px | fixed, y=0, 56 px | regra móvel existente |
| Motoboy 768×1024 | sticky, y=0, 60 px | sticky, y=0, 60 px | layout tablet intacto |
| Motoboy 1024×768 | sticky, y=0, 60 px | sticky, y=0, 60 px | layout desktop intacto |
| Motoboy 1440×900 | sticky, y=0, 60 px | sticky, y=0, 60 px | layout desktop intacto |
| Restaurante 844×390 / 915×412 | sticky, y=0, 42,19 px | mesmo | sem deslocamento no harness; não alterado |
| Restaurante 700×320 | sticky, y=0, 52,19 px | mesmo | regra existente |
| Restaurante 390×844 | sticky, y=0, 83,69 px | mesmo | portrait sem alteração |

Nos 14 pares viewport/tema de cada aplicativo (28 no total), o cabeçalho permaneceu ancorado na posição superior durante os pontos de rolagem medidos e não houve overflow horizontal. Mudança portrait→landscape sem recarga preservou y=0: Restaurante permaneceu sticky; Motoboy passou a fixed em 844×390. O CSS deixa a alteração de altura de viewport fora da fórmula da altura fixa; safe-area é aplicada ao topo e ao espaço reservado.

A medição anterior confirmou a causa como diferença de modo (60 px sticky fora do breakpoint vs 56 px fixed no mobile), mas não reproduziu deslocamento geométrico em Chromium headless. O proprietário reportou o salto no Chrome Android real; emulação Chromium não substitui a validação física/autenticada.

## Publicação/serviços

- Restaurante 8083: HTTP 200; `styles.css` SHA-256 local/HTTP `e0f733a72c6ede208cba662801d73006a956b3133b94ed949d5c4315c69ac741` (MATCH).
- Motoboy 8084: HTTP 200; `styles.css` SHA-256 local/HTTP `4f422d087d9594dd16ac79ed4ccdcd704c9a43ea69888b00bb22ace3b508f5aa` (MATCH); `index.html` referencia `styles.css?v=4f422d087d9594dd`.
- API 8787 `/health` e API 8788 `/health`: HTTP 200.

A autenticação e o Chrome Android real não estavam disponíveis ao QA. O harness não usou perfil pessoal, cookies ou credenciais e não valida páginas autenticadas.
