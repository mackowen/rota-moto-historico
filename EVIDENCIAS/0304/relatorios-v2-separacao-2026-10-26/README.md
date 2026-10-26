# Relatórios V2 — separação Executivo/Operacional

Data: 2026-10-26. Capturas e medições foram produzidas com Chromium headless via CDP, carregando o renderer `analytics-view.js`, CSS de produção e as funções reais de navegação extraídas do `app.js`. A fonte é um fixture visual explícito (rótulo “Visualização de fixture de teste”); não é sessão autenticada nem prova de integração de dados reais.

## Resultado observado

- 20 verificações de estrutura/interação: Executivo padrão; painel Operacional inicialmente oculto; conjunto único de filtros; sete categorias executivas com uma ativa; oito seções operacionais presentes, individualmente acessíveis; preservação de datas/motoboy ao alternar; links “Ver mais”; navegação por setas do teclado.
- 26 renders: 13 viewports, claro e escuro. Viewports: 320×800, 360×800, 390×844, 430×932, 720×360, 800×360, 844×390, 932×430, 768×1024, 1024×768, 1280×800, 1440×900 e 1920×1080.
- Zero overflow horizontal, exceções JavaScript ou respostas HTTP 4xx/5xx observadas no renderer isolado.
- `medicoes-dom.json` contém cada viewport, colunas calculadas, dimensões de navegação/filtros/cards e paleta computada. Os screenshots usam o mesmo identificador de viewport e tema.

## Limites

O dashboard não foi aberto com usuário autenticado nesta execução. Nenhum teste confirmou atualização de consultas de produção após mudança de filtro, sincronização, permissões/isolamento por tenant, exportação real ou mapa com resposta autorizada. Esses gates são PARTIAL/BLOCKED e continuam para a validação posterior. Os screenshots são evidência da estrutura e responsividade técnica, não uma aprovação visual dos esboços. G14 continua FAIL até aprovação explícita do proprietário.
