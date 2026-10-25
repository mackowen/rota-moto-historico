# Motoboys V2 — refinamento de contraste e navegação (2026-10-25)

## Estado e escopo

Intervenção sobre a branch local do Restaurante `codex/campaign-0304-visual-consolidated`, entrada `ba4158363fce37df5e4bd45122fc889cd7233ea6`, concluída no commit local `2efa6af8ee5ace38179b42a30675d1f0a6a29aba`. Não houve push do aplicativo. O repositório Motoboy não foi alterado. Browser QA preserva o HEAD `57cb7745828e24d50502bec89061d2ceb59e0200` e suas alterações locais anteriores.

As referências aprovadas identificadas na intervenção Motoboys V2 anterior permanecem registradas em `../motoboys-v2-2026-10-25/README.md`, com hashes dos originais. Não foram localizadas novas capturas da reprovação mais recente nesta rodada; portanto, as capturas abaixo documentam o resultado técnico e não alegam comparação direta com imagens ausentes. As capturas são sintéticas, sem sessão, dispatch ou dados operacionais reais.

## Causas e correções

1. **Lista e detalhes apareciam juntos no celular:** `mobile-detail` era aplicado a `.bikes-v2-workspace`, mas as regras de apresentação selecionavam `.bikes-v2.mobile-detail`. A classe foi movida para o elemento raiz da aba. No modo estreito, a lista aparece sozinha inicialmente; selecionar uma pessoa oculta a lista e mostra detalhes; voltar restaura a lista. O botão de retorno agora é compacto (“← Equipe”), acessível e oculto no modo de duas colunas.
2. **Ícones de estados vazios e indicadores tinham contraste discreto:** os vazios usam tokens semânticos `--info` e `--info-soft`, tamanho/traço explícitos e borda. Indicadores foram compactados e os estados continuam identificados por rótulo/descrição, além da cor. Os estados lease online, presença/check-in, execução e elegibilidade seguem separados.
3. **Cartões de indicadores e resumo eram altos no celular:** padding, gaps, tamanho de ícones e descrições foram reduzidos; indicadores mantêm grade de duas colunas e quatro métricas. O resumo usa duas colunas em telas estreitas para não quebrar “Não elegível”. Ajuda de fila/localização foi encurtada, sem remover informação operacional essencial.
4. **Cache:** CSS passou a `styles.css?v=0304.11`, aplicação a `app.js?v=0304.16` e shell do service worker a `v118`. As asserções de cache que ainda esperavam URLs anteriores foram atualizadas.

Nenhuma alteração foi feita ao fluxo `openAssignment()`, contratos, MFA, RBAC, persistência, sync ou banco. A ação de despacho não foi exercitada em Browser autenticado.

## Medições CDP e contraste

`geometry.json` contém 19 medições de viewport/estado mais o resultado de interação. A matriz cobre 320×720, 360×800, 390×844, 430×932, tablet 768×1024 e 1024×768/1366, e desktop 1280×800, 1440×900 e 1920×1080; inclui temas claro/escuro e desktop com sidebar recolhida. O documento não teve overflow horizontal. Em 390×844, a área útil da aba foi 366 px, cada cartão de indicador mediu 179,5×64,2 px, a navegação inferior ficou em y=778–844 e os painéis tiveram `overflowY=visible` (`scrollHeight=clientHeight`).

Razões calculadas dos estilos computados, usando luminância relativa WCAG:

| Tema / elemento | Foreground | Fundo | Contraste | Critério gráfico 3:1 |
|---|---|---|---:|---|
| Escuro — ícone essencial de estado vazio/indicador | `rgb(139,188,255)` | `rgb(28,52,82)` | 6,46:1 | PASS |
| Claro — ícone essencial de estado vazio/indicador | `rgb(36,94,168)` | `rgb(233,242,255)` | 5,74:1 | PASS |
| Escuro — ícone verde de operação | `--success` / `--success-soft` | Tokens do tema | 3,87:1 | PASS |
| Escuro — texto secundário sobre superfície | tokens computados | tokens computados | 10,96:1 | PASS |
| Escuro — aviso / fundo semântico | tokens computados | tokens computados | 7,13:1 | PASS |
| Escuro — erro / fundo semântico | tokens computados | tokens computados | 6,71:1 | PASS |

Estados de presença e elegibilidade têm rótulos visíveis (Online, Em entrega, Disponível, Ausente/sem check-in, Não elegível); a cor não é o único sinal.

## Interação observada

O Chromium/CDP carregou CSS real e renderer/handlers extraídos do código atual, com fixture local isolada de 20 motoboys. A sequência de interação comprovou: lista sem painel de detalhes → seleção → lista `display:none` e detalhes `display:grid`, com retorno visível → troca à aba Localização → botão de retorno → lista visível e detalhes `display:none`, mantendo o motoboy selecionado. Não houve exceções JavaScript; zero overflow horizontal.

A tentativa CDP de mover a rolagem antes da seleção não produziu `window.scrollY` diferente de zero neste fixture, apesar de haver conteúdo maior que o viewport. Assim, a preservação **exata de posição de rolagem** permanece PARTIAL e requer validação em página real/Chrome Android. O scroll container não foi alterado com hack para satisfazer o fixture. A navegação/troca de painéis foi comprovada; E2E autenticado, sessão MFA, cadastro, menu, filtros operacionais, dispatch, sync e RBAC não foram comprovados por esta fixture.

## Capturas e hashes

| Arquivo | SHA-256 |
|---|---|
| `mobile-list-dark.png` | `f85ee6a4cbf1ee25d1cc5277517c19226e78682dde273272c788bac1fd4f410f` |
| `mobile-detail-dark.png` | `9874d948b41b836961b0c8f6d01e3b4fed9ebee9269125268d1bac25b50b28ee` |
| `mobile-location-dark.png` | `7e36294f9def7faa151c641fb01f013442549402b05cd9ff5c8b8db62d3c1ca2` |
| `mobile-list-light.png` | `8e3f69a2bf4d4c0b2931d1da9da1994f6f95ebfb402487e3712604655afd4e838` |
| `mobile-detail-light.png` | `7d00ab16d29148ae2f1a60e49f1e9591d50b3f007971c6081857a70bd2e85027` |
| `tablet-list-light.png` | `3d5835f164ba47933be4f8be75741e558e9fd75d94f804383869be10128c69df` |
| `tablet-detail-dark.png` | `e506fe79971c887977968109097a40a8125a8c04391264dd4417762c5e4435c5` |
| `desktop-detail-light.png` | `8dd7d9094a2c8b81731d1da9da1994f6f95ebfb402487e3712604655afd4e838` |
| `desktop-detail-dark-collapsed.png` | `feb1ebcafc7883df1c9a7e2c58f45f135a078d4508518daf1f1ec6dc7bd644f7` |
| `geometry.json` | `72a9076f35bd37de0a3c587589d849c0387fa6fce0fecbdc2c2b130f00ad73e8` |

## Testes e gates desta intervenção

- `npm test` Restaurante: **PASS**, exit 0, suíte completa. Inclui renderer Motoboys, contratos de navegação, cache/service worker, dispatch guard, sincronização e regressões.
- `node --check app.js`, `node --check sw.js`, `git diff --check`: **PASS**.
- Chromium/CDP fixture sintética: **PASS técnico** para visibilidade lista/detalhes, troca de abas, retorno, contrastes de ícone e ausência de overflow; restauração não-zero da posição de rolagem **PARTIAL**.
- E2E autenticado/MFA, despacho real, sync, CRUD/RBAC e validação física no Chrome Android: **BLOCKED/não executados nesta intervenção**.
- Banco oficial `rotamoto`: sem escrita. Motoboy app: sem alteração. Sem limpeza de IndexedDB ou serviços oficiais.

| Critério | Estado |
|---|---|
| Ícones de estados vazios e indicadores contrastantes | PASS técnico |
| Indicadores e painéis móveis compactados | PASS técnico / revisão visual humana pendente |
| Celular: lista isolada → detalhes → voltar | PASS técnico (fixture CDP) |
| Tablet/PC responsivos e sem overflow | PASS técnico (fixture CDP) |
| Restauração de posição de rolagem após voltar | PARTIAL; CDP fixture não gerou scroll não-zero |
| Regressão automatizada Restaurante | PASS |
| Chrome Android físico / comparação com nova captura do proprietário | BLOCKED/PENDING |
| E2E autenticado, cadastro/dispatch/sync/RBAC | BLOCKED; fixture não prova operação |
| G14 — aprovação visual | **FAIL**; somente o proprietário aprova |

Campanha 0304 permanece PARTIAL e aberta; backlog anterior preservado; 0305 não iniciada.
