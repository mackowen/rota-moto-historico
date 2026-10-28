# Browser QA público — Parte S

Executado em Chromium/CDP sobre os serviços HTTP locais já disponíveis (`127.0.0.1:8081` Restaurante e `127.0.0.1:8082` Motoboy). Não foi inserida sessão nem credencial. Screenshots capturam somente páginas públicas de entrada.

- Larguras verificadas: 320, 390, 768, 1024, 1440 px, tema claro.
- Tema escuro capturado em 390 e 1440 px para ambos.
- Exceções JavaScript: nenhuma registrada.
- Chamadas `/api/identity/session`: HTTP 401 por ausência de sessão; esperado nesta navegação anônima.
- O emulador inicialmente reportou viewport +1 px no Motoboy em 320/390. Repetição em 320 resultou em `innerWidth/clientWidth/scrollWidth` 320/320/320. A largura 390 requer repetição; não editar CSS com base em medida instável.
- QA das telas protegidas, fluxos, tema escuro nos demais tamanhos, navegação integral e console Super ADM: BLOCKED sem sessão autorizada.
- Chromium encerrou por falha do runtime gráfico do Termux após as capturas; a aplicação não foi alterada para contornar a falha.

O arquivo `browser-qa-summary.json` não contém credenciais ou dados pessoais. Capturas estão nomeadas por aplicativo, largura e tema.
