# Testes — Parte T.14

Chromium/CDP headless, perfil temporário, com CSS de produção na ordem do HTML e o cabeçalho produzido por `RotaMotoDashboardV2.render`, dentro do shell com sidebar/main/navegação inferior. Conteúdo adicional sintético, sem autenticação. Scroll efetivo: `window`.

| Viewport | Antes: y inicial → após 1/10/40/100/meio → retorno | Depois | Nota |
|---|---|---|---|
| 390×844 | 0 → 0/0/0/0/0 → 0 | igual | portrait, altura 57 px |
| 700×320 | 22 → 21/12/0/0/0 → 22 | 0 → 0/0/0/0/0 → 0 | altura 99,77 px |
| 844×390 | 22 → 21/12/0/0/0 → 22 | 0 → 0/0/0/0/0 → 0 | altura 99,77 px |
| 915×412 | 22 → 21/12/0/0/0 → 22 | 0 → 0/0/0/0/0 → 0 | altura 92,16 px |
| 768×1024 | 22 → 21/12/0/0/0 → 22 | igual | tablet vertical |
| 1024×768 | 28 → 27/18/0/0/0 → 28 | igual | tablet landscape |
| 1440×900 | 28 → 27/18/0/0/0 → 28 | igual | desktop |

Todos os viewports em claro/escuro. Fora dos três landscapes corrigidos, top, altura, checkpoints e retorno coincidiram antes/depois. Sem overflow horizontal. Altura estável durante a rolagem. Rotação 390×844→844×390 sem reload: antes landscape y=22/padding 22; depois y=0/padding 0; `sticky; top:0`, 99,77 px.

Resultados:

- Restaurante `npm test` completo e `pretest assets:check`: PASS; inclui `test-landscape-topbar-layout.js`.
- Motoboy `npm test` completo: PASS; teste T.13 `test-landscape-topbar.js` PASS.
- Restaurante `assets:sync`: PASS, manifesto `restaurante 707e172b8a54e521`.
- `assets:check` e `git diff --check` nos dois: PASS.
- CDP: PASS, sete viewports × dois temas e rotação.
- HTTP `/` em 8083/8084: 200; APIs `/health` 8787/8788: 200/live.
- CSS de 8083 SHA-256 `3cf184ae73a556ff2ca8cea394a77348e04f095ee9f3e605dd8f4faf1d98bc9f`, igual ao checkout. HTML servido referencia `design-system.css?v=3cf184ae73a556ff`.

Harness não é sessão autenticada ou Chrome Android físico. Nenhum cookie, token ou perfil pessoal foi usado.
