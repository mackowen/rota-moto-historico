# Contraste

## Causa

O cartão interno `.rm-platform-fact` usava `var(--surface-muted, var(--surface-2, #f7f9fc))`. `--surface-muted` e `--surface-2` não existem nos tokens atuais (o produto fornece `--surface-soft`). No tema escuro o fallback permanecia quase branco enquanto `--text-primary` virava claro, reproduzindo texto quase invisível.

O mesmo alias inexistente era usado em badges/notas. Esses fundos foram trocados pelo token de superfície já usado pelo design system. O texto e a borda receberam tokens semânticos explícitos, com fallback compatível.

## Medição CDP

Chromium 155.0.8059.79, CSS de `identity-ui.css` do checkout, seis modelos de seção e uma permissão aninhada. O harness usa valores sintéticos e declara isso na página.

| Tema | Viewport | Contraste mínimo de texto | Baixo de AA | Overflow |
|---|---:|---:|---:|---|
| Claro | 320×700 | 4,73:1 | 0 | não |
| Claro | 390×844 | 4,73:1 | 0 | não |
| Claro | 768×1024 | 4,73:1 | 0 | não |
| Claro | 1024×768 | 4,73:1 | 0 | não |
| Claro | 1440×900 | 4,73:1 | 0 | não |
| Escuro | 320×700 | 5,62:1 | 0 | não |
| Escuro | 390×844 | 5,62:1 | 0 | não |
| Escuro | 768×1024 | 5,62:1 | 0 | não |
| Escuro | 1024×768 | 5,62:1 | 0 | não |
| Escuro | 1440×900 | 5,62:1 | 0 | não |

Valores medidos, seletores e cores estão em `browser-measurements.json`. Capturas PNG têm nomes com tema e largura. O navegador usa os componentes/classes CSS do produto com fixtures visuais sintéticas; não são capturas da conta Super ADM.
