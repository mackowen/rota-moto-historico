# Matriz comparativa ANTES — Relatórios V2

Registrada em 2026-10-26, antes da intervenção desta Parte 2. Referências originais vieram de `/storage/emulated/0/Download/` e foram copiadas sem alteração para `referencias/`.

## Identificação das referências

| Arquivo | Dispositivo/tema identificado | Dimensão fonte |
|---|---|---:|
| `aba-relatorios-celular-claro.png` | celular retrato, claro | 1024×1536 |
| `aba-relatorios-celular-escuro.png` | celular retrato, escuro | 1024×1536 |
| `aba-relatorios-pc-tablet-claro.png` | composição desktop/tablet, claro | 1536×1024 |
| `aba-relatorios-pc-tablet-escuro.png` | composição desktop/tablet, escuro | 1536×1024 |

Hashes SHA-256 em ordem: `65a6d175349877562791ee0b45d69f8bdda6e8f7d570c62318746047eb4c8a86`; `f9bc1da1a6765114a7d5f57bfed22198cc7f6332f4e02599636394a0c9805572`; `8f462561c4e19bd0108f118f43fbcd46ac1633e503b756a9c0dace623cd795e0`; `2dd23d481842494b7d7f4b740f0d54eeb605ac2d22ab67b2df61790bba15a82e`.

## Comparação com a captura anterior à correção

| Aspecto | Referências | Captura anterior (390×844 / 1440×900) | Diferença observada antes |
|---|---|---|---|
| Cabeçalho | Uma ocorrência de “Relatórios”, toolbar compacta; filtros alinhados ao título | Topbar mobile também mostrava “Relatórios” e o conteúdo repetia título, eyebrow e descrição | Hierarquia duplicada e mais altura no mobile |
| Filtros | Período e motoboy lado a lado, baixos e discretos | Cartão separado, datas em campos independentes e status/avançados abaixo | Formulário dominava o início do dashboard |
| Navegação | Categorias compactas em duas linhas no mobile; uma linha em tablet/desktop | Categorias com fundo preenchido de grandes botões, separadas do seletor principal por formulário alto | Densidade e destaque excessivos |
| KPIs | Mobile 2×2; desktop quatro em linha, baixos, com ícone à esquerda | Mobile duas colunas mas cartões altos; desktop quatro em linha, conteúdo vertical/desbalanceado | Altura maior e menor semelhança com referência |
| Gráficos | Diário + rosca em blocos equilibrados; secundários compactos; rankings/mapa em grade | Top row parcialmente próxima, mas rosca e listas no tema escuro tinham labels de baixo contraste | Legibilidade e hierarquia incompletas |
| Uso do espaço | Painel analítico preenchendo a largura útil; pouca moldura | Área do formulário ocupava largura e altura sem conteúdo analítico proporcional | Densidade inicial baixa |
| Tema escuro | Labels e legendas claros sobre superfícies escuras | Labels secundários da legenda da rosca aparentavam escuros/cinza sobre cartão escuro | Contraste insuficiente, a corrigir |
| Tela estreita | Título e seletores compactos; navegação inferior visível | Cabeçalho alto + filtros empilhados empurravam KPIs para baixo | Conteúdo principal começava tarde |

Capturas de baseline desta matriz: `antes/390x844-light.png`, `antes/390x844-dark.png`, `antes/1440x900-light.png`, `antes/1440x900-dark.png`. São renderer/CSS reais com fixture visual identificada, não E2E autenticado.
