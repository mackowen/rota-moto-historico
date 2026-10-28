# Responsividade e visual

Medições do diálogo real em harness isolado (CSS do projeto, Chromium 155, escala 1):

| Viewport | Largura doc | Retângulo do diálogo (x, largura) | Overflow |
|---|---:|---:|---|
| 320×700 | 320 | 9, 302 | não |
| 390×844 | 390 | 9, 372 | não |
| 768×1024 | 768 | 123, 522 | não |
| 1024×768 | 1024 | 251, 522 | não |
| 1440×900 | 1440 | 459, 522 | não |

O componente usa tokens existentes com fallback, `safe-area-inset`, largura máxima, limite de altura e empilhamento de botões em telas estreitas. A página Super ADM ganhou CSS escopado: cards compactos, grid adaptável de informações, permissões agrupadas e campos financeiros de empresa/período.

Esta execução não inspecionou o Super ADM autenticado em tema claro/escuro, nem percorreu todas as telas da matriz. As medições valem para o componente de diálogo sintético; não extrapolar para as telas autenticadas. Sem nova captura destas telas, nada foi promovido a aprovação visual/G14.
