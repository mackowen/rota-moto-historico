# Matriz visual e responsividade

Chromium/CDP autenticado, sessão MFA, Dashboard oficial e mesma Company sintética. Arquivos PNG referem-se ao diretório `capturas/`.

| Largura × altura | Tema escuro | Tema claro | Nota observada |
|---|---|---|---|
| 320×720 | `dashboard-320x720-dark.png` | `dashboard-320x720-light.png` | Navegação inferior; sem overflow do documento. IDs longos truncados por ellipsis. |
| 360×800 | `dashboard-360x800-dark.png` | `dashboard-360x800-light.png` | Cards 2×2 e ações operacionais móveis. |
| 390×844 | `dashboard-390x844-dark.png` | `dashboard-390x844-light.png` | Comparação de referência: `before-legacy-390x844-dark.png`, `after-dashboard-v2-390x844-dark.png`. |
| 430×932 | `dashboard-430x932-dark.png` | `dashboard-430x932-light.png` | Cards em uma coluna por entrega; página sem overflow. |
| 600×960 | `dashboard-600x960-dark.png` | `dashboard-600x960-light.png` | Sidebar compacta, conteúdo responsivo; nomes/IDs longos usam ellipsis. |
| 768×1024 | `dashboard-768x1024-dark.png` | `dashboard-768x1024-light.png` | Sidebar tablet, grade KPI responsiva. |
| 1024×768 | `dashboard-1024x768-dark.png` | `dashboard-1024x768-light.png` | Workspace de coluna única, sem scroll horizontal da página. |
| 1280×800 | `dashboard-1280x800-dark.png` | `dashboard-1280x800-light.png` | Tabela da fila usa rolagem horizontal interna quando suas 6 colunas não cabem no painel. |
| 1440×900 | `dashboard-1440x900-dark.png` | `dashboard-1440x900-light.png` | Sidebar e espaço de trabalho desktop. |
| 1920×1080 | `dashboard-1920x1080-dark.png` | `dashboard-1920x1080-light.png` | Largura máxima do conteúdo preservada. |

Menu Mais em `more-390x844-dark.png`. Em todos os 20 registros a largura do documento permaneceu abaixo ou igual ao viewport, sem erro JS. Detectores internos registram text nodes com scrollWidth maior sob ellipsis (número comprido) e `.dv2-table-wrap` com scroll próprio; nenhum deles causa overflow da página. Esta é emulação Chromium, sem validação do teclado/safe area no aparelho Android físico. A lista estruturada completa de capturas e observações está em [browser-report.json](browser-report.json).
