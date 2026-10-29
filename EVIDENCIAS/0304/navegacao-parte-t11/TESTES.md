# Testes — Parte T.11

## Checkout Restaurante

- `node --check app.js`: PASS.
- `node tests/test-mobile-more-navigation.js`: PASS; módulo local preservado, destino direto removido, categoria em Ajustes mantida, alias legado e composição de cabeçalho cobertos.
- `node tests/test-dashboard-semantics.js`: PASS; expectativa atualizada para distinguir capacidade RBAC de destino de navegação.
- `node tests/test-dashboard-v2.js`: PASS; guarda de permissão de navegação permanece coberta.
- `npm run assets:sync`: executado para atualizar `index.html` e manifesto após alteração de `app.js`.
- `npm run assets:check`: PASS após sincronização.
- `npm test`: PASS integral (exit 0), incluindo navegação, administração global, identidade, RBAC/CSRF, sincronização e operações. Duas asserções estruturais antigas foram alinhadas à mudança (`admin` continua capability, mas não destino; `goTab` recebe o destino solicitado). A suíte integral final, já com o código e os testes finais, passou.
- `git diff --check`: PASS após as alterações finais de código/testes. `node --check app.js`: PASS.

Navegação real Motoboy em CDP isolado, 390 px: Início → Entregas → Rotas → Ganhos → Ajustes → Ajuda. As telas Entregas/Rotas/Ajustes/Ajuda exibiram um cabeçalho `.pageHead` com um único H1, associado à topbar global do produto. Ao selecionar Ganhos sem vínculo/sessão válida, a aplicação voltou à Home. Isso confirma o gate operacional no contexto sem vínculo; não é QA autenticado.

## Checkout Motoboy

- `npm test`: PASS, código de saída 0; inclui navegação estrutural/responsiva, identidade, temas, posição de toast, contratos e fluxos locais.
- `npm run assets:check`: PASS (executado no `pretest` e separadamente).
- `tests/test-structural-navigation-responsive.js`: PASS como parte da suíte. Nenhum arquivo Motoboy alterado.

## Chromium/CDP isolado — HTTP público

Procedimento: perfil temporário criado pelo harness já existente em `~/projetos/browser-tests`, Chromium sem login, sem cookies importados, sem manipulação do perfil pessoal; páginas 8083 e 8084, 6 larguras × 2 esquemas de cor.

- 320, 390, 412, 768, 1024, 1440 px; em cada aplicação, claro e escuro: largura do documento igual à viewport, `overflow=false` em todos os pontos coletados.
- Restaurante: página de login/entrada pública carregada. Nenhuma tela autenticada foi aberta. Requisição de sessão sem credencial retornou 401 (esperado para este contexto).
- Motoboy: tela inicial local carregada; sem contexto empresarial/sessão autenticada, estado “Vínculo pendente” apresentado pelo próprio aplicativo. Não foi interpretado como defeito de navegação.
- Sem exceções JavaScript no coletor CDP. Chromium registrou avisos de GPU/ReadPixels no stderr; não impediram as observações. A primeira tentativa teve lock transitório ao apagar o perfil descartável; removi apenas o diretório temporário criado pelo próprio teste depois de confirmar ausência de processos Chromium. Nenhum perfil pessoal ou estado de usuário foi acessado.

## Publicação e serviços

SHA-256 local/HTTP após `assets:sync` (todos HTTP 200):

| Aplicativo | Arquivo | SHA-256 | Resultado |
|---|---|---|---|
| Restaurante 8083 | `index.html` | `c07af46d8e53d6e23fa1492e492356e4043d98ab5b434aa0ee8c14b2fcb0ba31` | MATCH |
| Restaurante 8083 | `app.js` | `f6fb51930e735705297066aa62b531a4ae3e2c260b176fd068148dcfe4cb8fe9` | MATCH |
| Restaurante 8083 | `asset-manifest.js` | `49de875fb7b5b7c148b6f2dcef5f6b7af114437391effa60128889060fd93386` | MATCH |
| Motoboy 8084 | `index.html` | `e5093b22cdffba204414c4bb4ba77b629002e079afffcedb62d6949359bf9499` | MATCH |
| Motoboy 8084 | `app.js` | `aaa87137663480eee147dd84c42420ca9a174a96e8603ccc7ee338f3e86632dd` | MATCH |
| Motoboy 8084 | `asset-manifest.js` | `197ffee7cc231f602a3af8db46e862d7c687a1403ddb4d73d6c8ce61241f808d` | MATCH |

API readiness: `8787/health/ready` HTTP 200; `8788/health/ready` HTTP 200.

- Nenhum teste PostgreSQL foi necessário para a alteração de frontend.
- Nenhuma escrita em `rotamoto`/`rotamoto_e2e`; migration 0061 e founder preservados.
