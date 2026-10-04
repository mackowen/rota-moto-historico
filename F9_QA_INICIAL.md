# F9 — QA inicial visual/renderizado e exploratório

**Data:** 2026-10-04
**Escopo:** primeiro bloco da F9; inspeção renderizada/funcional exploratória de Restaurante e Motoboy. F9 permanece aberta.
**Resultado:** `F9_INITIAL_QA = PASS_WITH_FINDINGS`
**Contagem de achados agrupados:** P0 0 · P1 2 · P2 2 · P3 2 · BLOCKED_EXTERNAL 8.

## Ambiente e proteção de dados

- Chromium Headless Chrome `149.0.7827.155`, CDP em `127.0.0.1:9222`; servidor estático Restaurante `127.0.0.1:8788`; Motoboy `127.0.0.1:8789`; API de desenvolvimento `127.0.0.1:8787`. Todos limitados a loopback. Launcher: `~/projetos/browser-tests/run-qa-infra.sh` (`--disable-gpu` conforme infraestrutura existente).
- API iniciou em development contra a instância oficial configurada da aplicação e recebeu somente leituras anônimas de sessão (`GET /api/identity/session`); não houve login, SQL administrativo, escrita no banco, migration, alteração de configuração, role ou grant.
- Viewport emulation, escala 1: mobile 360×800, 393×873 e 412×915; tablet 768×1024; desktop 1366×768 e 1920×1080. Sem device físico, notch/teclado nativo ou leitor de tela.
- Perfis Chromium temporários, separados de perfis pessoais. Não foram submetidas credenciais, criados usuários/tenants, pedidos ou entregas de QA. O Restaurante inicializou apenas os registros locais padrão do app no seu IndexedDB isolado (companies 1, users 1, profiles 1, syncState 1; pedidos/entregas/eventos/rotas 0); Motoboy não chegou a inicializar IndexedDB. Nenhum dado foi apagado ou importado. Launcher encerrou seus processos/perfil temporários; API recebeu SIGINT e iniciou shutdown normal.
- Interações de tela usaram clique DOM/CDP e captura de screenshot; Tab foi enviado por CDP no modal do Restaurante. Não equivalem a teste em touchscreen/dispositivo físico.

## Matriz executada

| Aplicativo | Áreas renderizadas | Viewports | Limite funcional |
|---|---|---|---|
| Restaurante | dashboard; entregas/pedidos; motoboys; rotas/mapa; relatórios; eventos; configurações; laboratório de integração; administração local; conta/login; recovery e convite abertos sem enviar; formulário Nova entrega aberto/cancelado | 6 dimensões requeridas | Sem sessão legítima, pedidos/drivers reais ou fixture de QA; detalhe/atribuição, administração server-side e transições não foram fabricados. |
| Motoboy | início/dashboard; lista vazia de corridas; rotas vazias; ganhos; configurações pelo controle superior; conta/login; recovery e convite abertos sem enviar; shell PWA offline | 6 dimensões requeridas | Nenhum Driver/sessão/Delivery atribuída; “Nova corrida” tentou abrir captura e falhou. Provas, estados de execução e detalhe sem registro não podiam ser exercitados sem dados autorizados. |
| Acessibilidade renderizada | labels/required/aria-current observados; conta com `role=dialog`/`aria-modal`; modal Restaurante com foco inicial, Tab envolvendo primeiro/último controle, fechamento; contraste evidente inspecionado visualmente | mobile e desktop | Inspeção básica, não auditoria WCAG; sem leitor de tela e sem teclado/dispositivo físico. |
| HTTP/console/PWA | exceções e console, respostas ≥400, falhas de request, registro/cache SW e reload offline | execução nos apps; offline no Motoboy | 401 anônimo esperado; requests externos de tiles foram cancelados por navegação; CDP manteve `navigator.onLine=true` mesmo com offline emulation, então o TypeError de fetch e shell cacheado são a evidência de rede offline. |

Dados completos e métricas por tela: `~/projetos/browser-tests/f9-initial-qa-2026-10-04/report.json`. Capturas ficam fora dos repositórios:

- Restaurante mobile dashboard: `restaurante-360x800-dashboard.png`
- Restaurante escolha local bloqueada após resposta de sessão: `restaurante-local-mode-race-locked-393x873.png`
- Motoboy captura parcialmente renderizada após Nova corrida: `motoboy-new-race-failure-393x873.png`
- Restaurante mapa/estado vazio: `restaurante-360x800-routes.png`
- Restaurante formulário/modal: `restaurante-360x800-create-dialog.png`
- Restaurante dashboard desktop: `restaurante-1366x768-dashboard.png`
- Motoboy home: `motoboy-360x800-home.png`
- Motoboy rotas: `motoboy-393x873-routesScreen.png`
- Motoboy home desktop/bottom navigation: `motoboy-1366x768-home.png`
- Conta anônima: `restaurante-entry-393x873.png`, `motoboy-entry-393x873.png`
- Motoboy estado local/conta: `motoboy-393x873-account.png`

Diretório absoluto: `/data/data/com.termux/files/home/projetos/browser-tests/f9-initial-qa-2026-10-04/`.

## Inventário de achados

### P1 — Restaurante: seleção de modo local pode bloquear o app durante o bootstrap

- **Reprodução:** perfil novo; ao aparecer `[data-offline]`, clicar imediatamente em “Continuar somente com dados locais”, enquanto a consulta de sessão continua pendente; aguardar a resposta 401 anônima.
- **Esperado:** manter `offlineMode`, fechar o painel e deixar `#app` interativo (`inert=false`, `data-gated=false`).
- **Observado:** no clique imediato o painel fecha/status mostra modo local; após 700 ms a conclusão tardia de `restore()` muda status para “Sem sessão autenticada” e deixa `#app.inert=true`, `data-gated=true` com painel ainda fechado. Fluxos locais ficam sem interação até reabrir Conta e repetir a opção.
- **Console/rede:** apenas `GET /api/identity/session` → 401 `UNAUTHENTICATED`, esperado sem cookie; sem erro JS.
- **Causa provável/arquivo:** `identity-ui.js`, `showSession(null)` zera `offlineMode` sem proteger uma escolha local mais recente; `restore()` aplica resultado assíncrono atrasado.
- **Evidência:** `restaurante-local-mode-race-locked-393x873.png`; estado DOM `panelHidden=true`, `appInert=true`, `gated=true`; dados adicionais no relatório fora do repo.

### P1 — Motoboy: inicialização parcial impede abrir captura/Nova corrida

- **Reprodução:** entrar no app, escolher modo local, ir à tela inicial e clicar “Nova corrida”. O botão muda a classe ativa para `capture`, mas a rotina de captura lança erro e não apresenta o formulário/captura utilizável. A navegação também lança erro ao chamar `show()`; controles posteriores à falha de inicialização ficam sem handler.
- **Esperado:** inicialização completa; abrir formulário/câmera ou oferecer preenchimento manual, com recursos já inicializados.
- **Observado:** exceções repetidas. `TypeError: $(...).forEach is not a function` em `app.js?v=40.2:470` (`$` é querySelector singular e é usado sobre `.historyPeriod button`); `ReferenceError: Cannot access 'cameraStream' before initialization` em `app.js:499`; ao acionar captura, `ReferenceError: Cannot access 'lastCapturedFile' before initialization` em `app.js:477`. Tela parcial pode trocar, mas não completa a ação principal.
- **Causa provável/arquivo:** `app.js`; a exceção de inicialização interrompe a configuração antes das declarações/handlers que vêm depois; chamada a `stopCamera()`/`openCapture()` encontra bindings em TDZ. Uma única causa de inicialização interrompida, efeitos agrupados.
- **Viewport/tela:** reproduzido em mobile 393×873; a tela estática de captura aparece, mas a inicialização lança exceções antes de provar captura/preenchimento funcional. Screenshot antes: `motoboy-360x800-home.png`; pós-clique: `motoboy-new-race-failure-393x873.png`; exceções no `report.json`. A matriz restante reproduziu a exceção durante boot/navegação nos seis viewports.

### P2 — Motoboy: restauração anônima de identidade fica em erro e estado “Verificando sessão…”

- **Reprodução:** abrir Motoboy sem cookie/sessão e aguardar `GET /api/identity/session` retornar 401.
- **Esperado:** renderizar estado não autenticado/local/offline, sem rejeição não tratada.
- **Observado:** `Uncaught (in promise) TypeError: Cannot set properties of null (setting 'hidden')` em `identity-ui.js:109` dentro de `showSession(null)`; permanecem “Verificando sessão…” e áreas de identidade incompletas. Motoboy remove `[data-admin]`, que continha `[data-invite]` e `[data-members]`, mas `showSession` acessa os seletores sem guarda.
- **Console/rede:** HTTP 401 é esperado; a exceção JavaScript é defeito interno. Reproduzido em todos os viewports/recargas da varredura; agrupado, não contado por ocorrência.
- **Evidência:** `motoboy-entry-393x873.png`, `motoboy-393x873-account.png`, relatório JSON.

### P2 — Motoboy: navegação fixa sobrepõe conteúdo no desktop

- **Reprodução:** home no viewport 1366×768, antes de rolar.
- **Esperado:** bottom navigation fixa não cobrir títulos/ações do conteúdo atual.
- **Observado:** a barra inferior flutuante cobre/sobrepõe a região do início da seção “Corridas”; o conteúdo continua atrás da barra. Documento não tem overflow horizontal.
- **Causa provável/arquivo:** `styles.css`, regra de `nav` fixa e layout desktop; revisar recuo/área útil ou posicionamento no viewport desktop.
- **Evidência:** `motoboy-1366x768-home.png`.

### P3 — Motoboy: estado de sync ocupa o card de ganho com quebra excessiva

- **Reprodução:** home sem Earning canônico e sem sincronização disponível, 360×800/393×873.
- **Esperado:** estado pendente legível sem romper hierarquia/grade dos indicadores.
- **Observado:** “Aguardando sincronização do Restaurante” ocupa várias linhas dentro do card estreito “Ganhos confirmados”, deixando o primeiro card desproporcional e apertado. Não há clipping/overflow do documento.
- **Causa provável/arquivo:** `app.js` (`formatCanonicalTotals`) e `index.html`/`styles.css` (`#todayValue` dentro de `.stats`); apresentação de estado textual longo como valor financeiro.
- **Evidência:** `motoboy-360x800-home.png`.

### P3 — Restaurante: mensagem de sessão expirada aparece para sessão simplesmente ausente

- **Reprodução:** primeira abertura anônima, sem cookie ou sessão anterior.
- **Esperado:** “Sem sessão autenticada” sem afirmar que uma sessão expirou.
- **Observado:** status indica “Sem sessão autenticada”, mas o formulário apresenta em vermelho “Sua sessão expirou. Entre novamente.”; trata `UNAUTHENTICATED` inicial como expiração.
- **Causa provável/arquivo:** `identity-ui.js`, mapeamento `UNAUTHENTICATED` e `restore()` aplicando erro de sessão ao estado inicial.
- **Console/rede:** 401 de `GET /api/identity/session` esperado; sem exceção.
- **Evidência:** `restaurante-entry-393x873.png`.

### BLOCKED_EXTERNAL — capacidades que não foram contornadas

Contadas como oito bloqueios agrupados por capacidade: (1) fluxo real de login/admin/empresa e deliveries atribuídas sem conta/session/tenant/Driver de teste legítimos; (2) recuperação/convite requer token entregue por email; (3) challenge MFA operacional depende de owner e configuração segura; (4) câmera/GPS dependem de permissões/hardware real; (5) persistência de blob de prova exige storage provider; (6) iFood requer documentação oficial, conta/credenciais e homologação; (7) 99Food requer o mesmo conjunto; (8) Keeta requer o mesmo conjunto. Nenhuma credencial, conta, fixture ou integração foi simulada.

## Rede, console, cache e estado

- Restaurante: zero exceções JS. As únicas respostas HTTP ≥400 foram três 401 da sessão anônima, esperadas. Duas chamadas de tiles OpenStreetMap foram canceladas (`ERR_ABORTED`) quando a navegação trocou de tela; não houve 404/5xx. Sem falhas de assets locais ou evidência de CORS/CSP.
- Motoboy: 27 eventos de exceção agrupam as duas causas P1/P2 acima; 401 de sessão anônima esperado; offline emulation gerou `ERR_INTERNET_DISCONNECTED` para shell/API durante reload offline, conforme esperado. Nenhum 404/5xx inesperado.
- Service worker ativo `service-worker.js`, cache observado `rota-moto-v40.5`. O shell foi renderizado após reload offline; fetch da API não foi respondido pelo cache e falhou como rede indisponível. O worker versionado só allowlista assets same-origin e exclui `/api`; não houve evidência de API autenticada em cache. `navigator.onLine` permaneceu `true` na emulação offline do CDP, limitação do simulador registrada.
- Restaurante: documento sem overflow horizontal nas seis dimensões. Navegação mobile é horizontalmente rolável (`overflow-x:auto`) e o tab ativo foi trazido para a área visível; bottom nav expõe itens adicionais por scroll. Sem conteúdo de tabela/registro operacional real para provar largura de tabelas preenchidas.
- Motoboy: documento sem overflow horizontal nas seis dimensões; barra inferior e mapa/rotas vazias renderizam. Captura operacional não conclui por defeito P1. IndexedDB não foi criado na origem Motoboy nesta sessão, consistente com interrupção de startup.

## Problemas históricos confirmados

- **NOT_REPRODUCED:** topbar fixa do Restaurante (visível e estável no topo nos viewports inspecionados); alinhamento vertical geral do header/cards; corte/overflow horizontal do documento; navegação mobile do Restaurante (rolável); estados vazios do mapa/sem corridas (texto explicativo e controles renderizados). Evidências mobile/desktop acima.
- **Reproduzido:** sobreposição da bottom navigation no desktop do Motoboy; estado de sync comprime a hierarquia do card de ganhos; modal operacional Motoboy não pode ser aberto por Nova corrida devido à falha P1.
- **Parcialmente observável:** formulários de criação do Restaurante são abertos e cabe teclado/foco; pedido/delivery preenchidos, atribuição real, tabela larga e modal de edição não foram exercitados por ausência de dados autorizados. Não registrar esses limites como defeitos.

## Ordem recomendada antes de continuar a campanha F9

1. Corrigir a inicialização Motoboy (P1), incluindo teste do boot e do botão Nova corrida; conferir todos os handlers que ficaram depois da linha que lança exceção.
2. Corrigir a corrida do modo local do Restaurante (P1) preservando decisão do usuário contra resultado assíncrono antigo; testar 401 atrasado e estado interativo.
3. Corrigir seletor ausente no `identity-ui.js` Motoboy e estado não autenticado (P2).
4. Ajustar bottom nav desktop Motoboy e apresentação do estado de ganho/sync (P2/P3).
5. Corrigir copy de `UNAUTHENTICATED` para separar “sem sessão” de “sessão expirada” (P3).
6. Repetir os fluxos corrigidos e depois prosseguir a F9 com conta de QA autorizada, quando disponível; não usar identidade ou dados reais.

**Sem correções de produto nesta execução.** Erros iniciais no harness CDP (variáveis fora do contexto da página e serialização de promise IndexedDB) foram corrigidos apenas no script temporário fora dos repositórios; as execuções finais foram feitas após a correção. Nenhum código/baseline/tag/main/PostgreSQL/configuração de servidor foi alterado.


## Atualização de correção dirigida — Registro 0050

Os achados originais acima permanecem preservados como evidência histórica. Os quatro P1/P2 foram corrigidos; nenhum se reproduziu na repetição CDP.

| Achado do 0049 | Estado após correção | Repetição renderizada | Evidência externa |
|---|---|---|---|
| P1 Motoboy bootstrap/capture | **FIXED** | 393×873: boot sem exception; 401 anônimo sem unhandled rejection; status “Sem sessão autenticada”; 4 history handlers ativos e “7 dias” selecionável; Nova corrida abre capture; sem câmera mostra fallback; formulário manual abre. | `motoboy-capture-no-camera-393x873.png`; report.json |
| P1 Restaurante escolha modo local | **FIXED** | 393×873: sessão suspensa; escolha local antes do 401; depois do 401 `inert=false`, `data-gated=false`, `offline=true`; Conta reabre com formulário enabled. | `restaurant-local-choice-after-delayed-401-393x873.png`; report.json |
| P2 Motoboy identity após 401 | **FIXED** | Incluído no bootstrap 393×873; nenhum unhandled rejection, status não fica verificando, sem exceção administrativa. | `motoboy-home-393x873.png`; report.json |
| P2 Motoboy bottom nav desktop | **FIXED** | 1366×768: `<main>` encerra no início do espaço próprio da navegação, sem interseção/oclusão; 360×800: posição fixa mobile preservada. | `motoboy-home-1366x768.png`, `motoboy-home-360x800.png`; report.json |

**Ambiente:** Chromium 149.0.7827.155, CDP loopback 9222; Restaurante 8788 e Motoboy 8789; launcher terminou os processos temporários. O teste de sessão interceptou apenas o GET de sessão e forneceu 401 anônimo controlado para reproduzir a ordem; não acessou sessão/credencial real. Requests sem falha/4xx/5xx observados. Única mensagem de console Motoboy foi o diagnóstico esperado de câmera indisponível; zero exception/unhandled. Restaurante sem erros de console.

**Não alterados:** os P3 originais continuam abertos. Contagem corrente: P0 0, P1 0, P2 0, P3 2, BLOCKED_EXTERNAL 8. F9 não concluída. Ver [Registro 0050](REGISTROS/0050.md).

## Atualização — Registro 0051: correções P3 e QA exploratório ampliado

O inventário e a evidência inicial acima permanecem preservados. Esta atualização registra o estado após correção e a exploração adicional.

### Correções dos achados originais P3

| Achado original | Estado em 0051 | Repetição |
|---|---|---|
| Restaurante: primeiro 401 anônimo exibia “Sua sessão expirou” | **FIXED** | API local retornou 401 real sem cookie; estado final “Sem sessão autenticada”, sem mensagem falsa, exceção ou unhandled rejection. A resposta atrasada após escolha local continua sem tornar `#app` inert. |
| Motoboy: aviso longo de sincronização deformava card de ganhos | **FIXED** | Sem Earning canônico, o card mostra `—`; explicação fica fora da grade. Confirmado nos seis viewports; em 360 px a largura do documento permaneceu 360 px. Service worker avançado a `rota-moto-v40.7`; shell offline exibiu a UI atualizada. |

Os quatro achados P1/P2 originais permanecem **FIXED**. A repetição dirigida do Registro 0051 confirmou novamente: bootstrap Motoboy sem exception; quatro controles de período registrados; capture e fallback manual sem câmera; 401 sem unhandled rejection; corrida da escolha local no Restaurante preservada; Motoboy sem controles administrativos; `<main>` desktop termina antes da bottom navigation e a navegação mobile mantém `position: fixed`.

### Matriz e resultado da exploração

Chromium `149.0.7827.155`, CDP `127.0.0.1:9222`; servidores estáticos loopback Restaurante `8788` e Motoboy `8789`. Matriz executada nos dois aplicativos: `360x800`, `393x873`, `412x915`, `768x1024`, `1366x768`, `1920x1080`.

- Restaurante: 9 áreas (`dashboard`, `orders`, `bikes`, `routes`, `reports`, `events`, `settings`, `integrationLab`, `admin`), mais diálogo vazio de criação de operação em cada viewport. Nenhum registro foi salvo. Navegação/overflow, estado sem dados, configurações, rotas/relatórios/eventos, formulário e modal foram exercitados. O laboratório visto segue explicitamente local/simulado; não exibiu integração conectada.
- Motoboy: `home`, `races`, `routesScreen`, `earnings`, `settings` em cada viewport, mais entrada “Nova corrida”/capture sem salvar. Card e nav não tiveram overflow. A home/capture funciona com ausência de câmera; a câmera ausente foi tratada como limitação esperada do browser.
- Em ambos: conta/login anônimo, recuperação e convite apenas abertos/inspecionados, modo local, estado vazio, labels, required/validity, navegação por teclado e retorno de foco dentro do diálogo foram examinados. Tab no último controle do painel foi contido no diálogo. Não se enviaram credenciais/tokens nem se criou usuário, tenant, Driver, Delivery, pedido ou provider.
- IndexedDB no perfil de QA: Restaurante `rota-moto-restaurante-local-v30` versão 6; Motoboy `RotaMotoDB` versão 7. Foram apenas lidos os nomes/versões; nenhum store foi limpo/substituído. Sem submissão de formulários.
- Console/network: zero exception JS e zero unhandled rejection nos dois apps. Restaurante: zero console error, HTTP ≥400 ou request failure inesperado na varredura. Motoboy: seis logs de diagnóstico `Camera NotFoundError` (um por abertura deliberada de capture sem dispositivo); nenhum uncaught error, HTTP failure ou rejeição. Um `ERR_INTERNET_DISCONNECTED` do request de navegação durante teste offline foi atendido pelo shell do service worker; `navigator.onLine` permaneceu `true` pela limitação da emulação CDP. API não é cacheada pelo contrato do SW.
- Backend local: `npm start` no Restaurante iniciou em `127.0.0.1:8787` com a configuração existente do runtime; `/health/live` e `/health/ready` retornaram 200. O readiness completou pela role de runtime e fez apenas leituras. O GET de sessão anônimo real retornou 401 `UNAUTHENTICATED`, esperado. Nenhuma escrita, migration, alteração de configuração/role/grant ou segredo acessado. API e launcher foram encerrados e as portas ficaram fechadas.

### Achado novo

**P3 — Motoboy: mensagem de expiração incorreta no estado anônimo.** Com a API runtime e PostgreSQL ready, o primeiro `GET /api/identity/session` sem cookie retornou 401 real; o cabeçalho da conta corretamente mostra “Sem sessão autenticada”, mas o formulário mostra “Sua sessão expirou. Entre novamente.”. Sem erro JS/rejeição. Provável origem: mapeamento `UNAUTHENTICATED` em `identity-ui.js` Motoboy, distinto da cópia corrigida no Restaurante. Não corrigido nesta rodada por não ser um dos dois P3 autorizados para correção. Evidência: `motoboy-entry-393x873.png` na pasta externa abaixo e verificação CDP com resposta HTTP real.

Não houve outro P0/P1/P2/P3 reproduzido na exploração sem dados/identidade. Os requests 401 de sessão anônima foram esperados, não classificados como defeito.

### Contagens e bloqueios

`F9_ROUND_2 = PASS_WITH_FINDINGS`; inventário corrente: **P0_OPEN=0, P1_OPEN=0, P2_OPEN=0, P3_OPEN=1, BLOCKED_EXTERNAL=8**. Os oito grupos permanecem os mesmos do Registro 0049: (1) fluxos administrativos/autenticados sem conta, membership/tenant/Driver de QA autorizados; (2) email de convite/recuperação; (3) MFA/armazenamento seguro; (4) câmera/GPS físicos/permissões; (5) storage de mídia; (6) iFood; (7) 99Food; (8) Keeta. Providers seguem não conectados; nenhum mock foi usado para afirmar disponibilidade.

Evidências e screenshots brutos fora do Git: `/data/data/com.termux/files/home/projetos/browser-tests/f9-round-2-2026-10-04/` e `/data/data/com.termux/files/home/projetos/browser-tests/f9-correction-round-2-2026-10-04/`. Exemplos: `restaurante-360x800-create-dialog.png`, `restaurante-393x873-dashboard.png`, `motoboy-360x800-home.png`, `motoboy-1366x768-home.png`, `motoboy-393x873-account.png`, `motoboy-capture-no-camera-393x873.png`, `restaurant-local-choice-after-delayed-401-393x873.png`, `report.json`.

F9 continua aberta; o inventário visual não substitui fluxos reais autenticados, end-to-end com Delivery autorizada, dispositivo físico, leitores de tela ou integrações externas.


## Atualização — Registro 0052: sessão anônima Motoboy e auditoria de pré-condições

O P3 novo de 0051 está **FIXED**. `restore()` distingue 401 sem sessão anterior de 401 depois de sessão autenticada, alinhado ao helper do Restaurante; o service worker Motoboy avançou a v40.8 e inclui o novo helper no shell. `npm test`, `node --check` e `git diff --check` passaram.

CDP Chromium 149 repetiu a entrada anônima nos viewports 360×800, 393×873 e 1366×768: “Sem sessão autenticada”, sem copy de sessão expirada, exception ou unhandled rejection. A repetição também confirmou que bootstrap/history/capture, captura sem câmera, controles de identidade, nav desktop, card de ganhos e corrida modo local do Restaurante continuam FIXED. Screenshots/relatório: `/data/data/com.termux/files/home/projetos/browser-tests/f9-correction-round-3-2026-10-04/`.

Inventário atualizado: P0 0 / P1 0 / P2 0 / P3 0. O `BLOCKED_EXTERNAL=8` de 0051 não descrevia corretamente todos os grupos: fixture autenticada (tenant, owner, membership, Driver e dados de domínio) é **B — pré-condição local controlável**. Permanecem **7 grupos C**: email real, MFA/verifier e secret storage, câmera/GPS físicos, blob remoto e protocolo/conta/credencial/homologação para cada provider iFood, 99Food e Keeta.

Auditoria read-only de código/docs/schema e `migrate.js status` (0001–0013 aplicadas): API de provisionamento de tenant existe, mas `authorizeProvisioner` não tem adapter operacional; convite depende de email e operações administrativas/MFA continuam fail-closed. Os testes existentes usam fakes e rollback, não criam sessão navegável persistente. Não existe fluxo de remoção integral segura para Company/User/audit/DeliveryEvent; fechar tenant/revogar membership conserva rastreabilidade e não equivale a apagar tudo. Portanto, **não é seguro provisionar e remover tenant E2E pela configuração/mecanismos atuais**. F9 segue aberta; primeiro projetar fixture QA isolada e seu lifecycle de limpeza, sem inserir fixture no PostgreSQL oficial nesta rodada. Ver [Registro 0052](REGISTROS/0052.md).
