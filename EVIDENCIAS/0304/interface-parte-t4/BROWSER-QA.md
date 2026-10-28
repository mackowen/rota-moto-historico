# Browser QA — T4-02/T4-03/T4-13

- Browser: Chromium `155.0.8059.79`, arm64, CDP, perfil novo temporário por ensaio; software rendering `--disable-gpu --use-gl=swiftshader --enable-unsafe-swiftshader --disable-features=Vulkan`.
- Host público E2E 8083 foi aberto sem login para registrar instalação/recarga do worker e ausência de erros de console/rede. Isso não é QA autenticado.
- Harness DOM utilizou os stylesheets reais `styles.css` e `design-system.css`, componente sintético de toast/nav/topbar e helper de posição da aplicação. As dez combinações claro/escuro e viewports 320×700, 390×844, 768×1024, 1024×768 e 1440×900 não mostraram overflow horizontal. A barra aparece em 320/390, com 66px medidos e toast separado por 12px; em 768 ou mais, ela fica oculta e o fallback do toast é 12px.
- No harness de topbar, 320/390 mediram top=0 em scroll de 1 e 100px. Para 768/1024/1440, o conteúdo sintético apresentou deslocamento inicial/âncora entre medições; como o shell autenticado real não foi montado e o scroll do Chromium foi afetado por redimensionamento de viewport, isso não é atribuído à aplicação nem usado como aprovação/defeito real.
- Login, Relatórios, Configurações, Rotas, mapa com corridas, estados RBAC e operação autenticada continuam **BLOCKED** por ausência de sessão autorizada no CDP. Não houve tentativa de ler cookies ou falsificar MFA.
- Screenshot do login não foi repetida nem apresentada como prova.

Após commits e sincronização dos assets, os seis arquivos de shell modificados/operacionais acima tiveram hash local=HTTP em 8083. Novo perfil isolado 390×844 encontrou controller ativo e cache `rotamoto-restaurante-shell-bbb300abdbe7692f`, sem exceção JS/rede. Esta é checagem dos arquivos alterados após o trabalho, não repetição do inventário amplo T.3.
