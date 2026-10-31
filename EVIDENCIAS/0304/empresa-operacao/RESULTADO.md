# Campanha 0304 — Empresa e Operação

Data: 2026-10-30  
Resultado: **PARTIAL** — implementação funcional nos checkouts; promoção à API/bancos persistentes e QA autenticado da interface continuam pendentes.

## Implementação

| Área | Alteração | Persistência e validação | Estado |
|---|---|---|---|
| Empresa | A tela carrega os dados canônicos automaticamente e substitui os salvamentos separados por **Salvar alterações**. O pino do mapa continua exigindo confirmação; essa confirmação vira rascunho até o salvamento da empresa. | `PUT /api/admin/company/settings` grava nome, telefone, fuso, regra de rotas e localização confirmada em uma atualização versionada; a interface relê `/api/admin/company`, compara os valores e só então confirma. Conflito 409 preserva o formulário e não expõe revisão ao usuário. | PARTIAL: fluxo HTTP/PostgreSQL autenticado, readback e 409 passaram no banco descartável; reload e nova sessão via UI ainda não foram validados. |
| Operação | Cobrança por KM, faixa ou entrega, mínimo, valores inativos, arredondamento e repasse recebem salvamento explícito no servidor. Valores locais antigos permanecem rascunho, sem migração automática. O cálculo efetivo não usa configuração exclusiva do aparelho. | API versionada `GET/PUT /api/admin/company/delivery-pricing`, validação no servidor, readback, conflito 409 e RLS FORCE por empresa. Se a tabela não existe (schema anterior a 0064), o DTO informa `available:false` e a UI desabilita o salvamento. Migration `0064_company_delivery_pricing` aplicada pelo runner oficial somente no banco descartável `rotamoto_e2e_lote1b_20261030_3e9a4c12`; teste transacional fez rollback dos fixtures. | PARTIAL: schema/API funcionam no descartável; `rotamoto` e `rotamoto_e2e` persistentes permanecem em 0061 e não receberam escrita. |
| Motoboy | O snapshot autenticado da empresa aceita regras canônicas de cobrança e as apresenta como informação compartilhada. Cálculo da taxa não foi duplicado; estimativas locais continuam identificadas como exclusivas do dispositivo. | Contrato compartilhado atualizado nos dois checkouts; paridade semântica e testes Motoboy passaram. | PASS técnico para contrato/consumidor informativo; dependente da publicação da API com 0064 para receber a configuração em ambiente persistente. |
| Publicação | `index.html` e `app.js` servidos por `8083` coincidem com o checkout. O painel de login apareceu em Chromium headless isolado após aguardar a inicialização. | SHA-256 `index.html`: `641584464b987ee326c8f87ff1cc16292c8b48d615ee57e3bc5faa653e3fdc50`; `app.js`: `5597f0c75702e1f06378cee26bff6d0ff5f882b5a8c634eacc4631c91f05a18e`. | PARTIAL: HTML/JS atualizados; API em `8787` está em processo antigo usando o banco persistente 0061. Não houve login autenticado pelo browser nem teste visual de gravação. |

## Arquivos de produção

Restaurante: `app.js`, `backend/admin/http.js`, `backend/admin/repository.js`, `backend/admin/service.js`, `backend/domain/sync-service.js`, `backend/postgres/migrations/0064_company_delivery_pricing.up.sql`, `CONTRACT.md`. O Motoboy alterou `app.js` e `CONTRACT.md` para validar e exibir o snapshot canônico sem duplicar cálculo.

## Testes e resultados

- `node tests/test-company-settings.js`: PASS — salvamento único, validação, localização confirmada e mapeamento 409.
- `node tests/test-company-delivery-pricing.js`: PASS — validações, contrato versionado, RLS e ausência de backfill local.
- Cobertura do DTO pré-0064: PASS — erro PostgreSQL `42P01` retorna capacidade indisponível; não anuncia uma gravação suportada.
- `node tests/test-cross-app-contract-parity.js`: PASS.
- `node tests/test-identity-http-postgres.js` com o guard `ROTAMOTO_DISPOSABLE_CAMPAIGN=0304B`: PASS — bootstrap/MFA legítimos do harness, gravação HTTP autenticada de Empresa/Operação, readback, conflito, faixa inválida 400, CSRF ausente 403 e rollback.
- `node tests/test-postgres-migration-targets.js` e `node tests/test-backup-inventory.js`: PASS após reconhecer a migration aditiva 0064 no ledger de código.
- `npm test` Motoboy: PASS; `npm run assets:check` Motoboy: PASS.
- `npm run assets:check` Restaurante: PASS após `npm run assets:sync`.
- `npm test` Restaurante: PASS após atualizar contratos de regressão afetados pela migration aditiva e pelo salvamento único de localização; `npm test` Motoboy: PASS.
- Browser QA: carregamento público do formulário de autenticação conferido em Chromium isolado. A resposta 401 de `/api/identity/session` é o estado esperado sem sessão. **Não é QA autenticado nem validação visual dos formulários protegidos.**
- `npm run assets:check` nos dois aplicativos: PASS; os manifests foram atualizados pelo script oficial.
- `git diff --check` e `node --check` dos módulos backend/frontend alterados: PASS.

## Segurança e bancos

Nenhum dado foi migrado do IndexedDB. Nenhuma alteração foi feita em `rotamoto`, `rotamoto_e2e`, fundador, MFA, grants, CSRF ou RLS. O único banco escrito foi o descartável indicado acima, com teste autenticado transacional e rollback; a migration 0064 permanece aplicada apenas nesse descartável.

## Pendências

1. Reexecutar a suíte completa do Restaurante após as correções das duas asserções históricas de migration e cartografia.
2. Aplicar 0064 aos bancos persistentes somente após backup recuperável, gates de checksum/compatibilidade e procedimento de promoção autorizado já definido para o ambiente; até lá, a API atualmente ativa não oferece o novo endpoint/salvamento operacional.
3. Publicar/reiniciar a API E2E em momento controlado depois da promoção do schema; não foi interrompido o processo 8787 ativo.
4. Executar Browser QA autenticado por fixture para todos os campos, reload e nova sessão em 390×844, 844×390, 768×1024 e 1440×900, claro/escuro.
5. Confirmar visualmente no Chrome Android do proprietário. G14 permanece FAIL.

## Git

Commits locais: Restaurante `a49c9d1` (`feat: persist company and delivery pricing settings`) e `c7c2530` (`fix: handle pricing schema before migration 0064`); Motoboy `88b9266` (`feat: consume canonical company pricing snapshot`). A correção adicional detecta a ausência da tabela antes de consultá-la, retornando `available:false` em schema anterior à 0064. `npm test` integral do Restaurante terminou com código 0 após essa correção. Evidência publicada no histórico por `e8fe378` (push confirmado). Nenhum push de aplicativo foi feito.

## Continuação corretiva — migração, API e Browser QA (2026-10-30)

**Resultado permanece PARTIAL.** Não foi aplicada migration a banco persistente e não foi reiniciado o processo 8787. O runner mostrou `rotamoto` e `rotamoto_e2e` em 0061, com 0062–0064 pendentes; os checksums dos três arquivos continuam `b4a581bb506e636e14a940df9fb628889a048aae7549b6bd6f0d5dd7ea5e03c1`, `dbba647e0688637ecd5713f4282706701bce7685da12d50298eb8797d54cf923` e `5ce7c684217797538ee5ac36fa996a7aab69b75b7ab1108080da96de40c0c1e3`. O banco descartável `rotamoto_e2e_lote1b_20261030_3e9a4c12` está em 0064. A sequência 0062→0063→0064 não foi promovida: o inventário de backup está incompleto, não há backup/key configurados, não foi possível comprovar recuperação e o runbook de separação de papéis requer credencial DBA que não está disponível. Os gates de integridade, recuperação e autorização da política local não foram satisfeitos; nenhuma proteção foi contornada.

O serviço E2E da API está saudável em `/health` (200), mas o processo ativo é anterior ao checkout atualizado. Probes sem credenciais retornaram GET Empresa 401 (rota protegida), PUT Empresa 404 e GET/PUT de cobrança 404. Isso confirma que a API atualizada não está publicada em 8787. A porta 8083 responde 200 e serve o `app.js` atualizado, SHA-256 `d08ab60adad9c5245818ae1feb23c84c755c7291949abf8bceebd7d75a919eb6`; nenhuma sessão ou operação ativa foi interrompida.

Browser QA autenticado sintético: fixture legítima criou conta e fator MFA somente no banco descartável; Chromium isolado abriu a UI real em 8083 e direcionou as chamadas API ao handler atual ligado ao schema 0064. Na seção Empresa, o teste alterou nome, telefone, fuso e política, observou PUT 200 e GET 200 de confirmação, e releu os quatro valores no DTO canônico. A captura mostra os dados e o toast de sucesso após o ACK: [Empresa salva — 1440×900, tema claro](evidencias-browser/empresa-salva-authenticated-1440x900-light.png). A fixture faz rollback ao terminar. Este ensaio comprova somente Empresa; não comprova nova sessão, validação visual nos outros viewports/tema escuro nem a tela Operação completa.

O harness de Operação foi ajustado para aguardar o readback inteiro e evitar alternar modelos durante uma gravação pendente. Tentativas posteriores do Chromium ficaram sem resposta/atingiram timeout durante o bootstrap autenticado; a suíte não produziu uma execução integral de Operação com reload. O teste backend/PostgreSQL transacional e as suítes de contrato continuam aprovados, mas isso não substitui o Browser QA por campo. O browser não capturou evidência de Operação e não se declara PASS autenticado para essa tela.

Foi corrigida uma janela de edição concorrente em Operação: durante o PUT e o readback, controles de modelo, repasse, valores e faixas agora ficam desabilitados; ao terminar, recuperam o estado disabled/autorização anterior. Teste direcionado `tests/test-company-delivery-pricing.js`, suítes completas `npm test` nos dois aplicativos, assets nos dois, contrato compartilhado e `git diff --check` passaram. O estado global permanece PARTIAL: API publicada, migração persistente, QA de Operação e round-trip de todos os campos ainda pendentes. Os bancos persistentes permaneceram em 0061; a transação descartável foi encerrada sem sessão de teste remanescente.

Alteração funcional desta continuação: Restaurante `app.js`, `tests/test-company-delivery-pricing.js` e manifesto de assets gerado (`asset-manifest.js`, `index.html`). Motoboy não alterado. Commit local Restaurante: `3c42266` (`fix: lock pricing controls while saving`); nenhum commit/push Motoboy. O histórico desta continuação será publicado separadamente; nenhum push de aplicativo foi executado.

## Correção pontual da aba Operação — 2026-10-31

**Resultado: PARTIAL; causa do erro genérico corrigida no checkout, confirmação autenticada pós-correção pendente por rate limit legítimo.**

### Causa reproduzida e correção

Em Chromium/CDP isolado, com a identidade sintética legítima (login/MFA) e Chico Restaurante no `rotamoto_e2e`, o formulário inicialmente mostrava `perKm` selecionado e valor `0` embora o GET canônico retornasse `model=perDelivery`, `fixedFee=10`, `perKm=2.37`, revisão 17. O carregamento tardio atualizava o estado JavaScript, mas não reconstruía a tela antes de habilitar os controles. A correção já feita nesta continuação impede edição enquanto o GET canônico está pendente, limpa o marcador de empresa carregada antes de nova tentativa e renderiza Operação com os valores canônicos antes de reabilitar seus controles.

A reprodução da mensagem genérica mostrou também sua causa direta: a UI enviava o PUT e recebia HTTP 200; o readback também respondia 200. No caminho de sucesso, `saveCompanyDeliveryPricing()` gravava o objeto válido em `state.settings.deliveryPricingCanonical`, mas em seguida tentava executar `state.deliveryPricingCanonical.version`. Essa propriedade não existe, lançando `TypeError` após a persistência, entrando no `catch` genérico e afirmando incorretamente que não salvou. Removi a atribuição inválida redundante. Agora a revisão canônica, o estado e o draft são atualizados pelo objeto existente antes do feedback.

### Evidência funcional observada

Antes da correção do `TypeError`, a UI real autenticada em 390×844 enviou dois salvamentos consecutivos em inicializações isoladas do Chromium: `fixedFee` 10→11 (PUT 200, resposta versionada e GET/readback 200), depois `minFee` 0→1 (PUT 200 e readback 200). A segunda inicialização autenticada abriu o formulário com `fixedFee=11`, comprovando que o primeiro valor persistiu após fechar/reabrir o cliente e uma nova sessão. Esses salvamentos reproduziram a falsa mensagem de erro pós-ACK; portanto não contam como validação final da interface corrigida.

Depois da alteração do `TypeError`, uma nova tentativa de login pelo harness recebeu HTTP 429 no limitador legítimo de login (janela configurada em 15 minutos). Não reiniciei a API nem limpei o limitador para contornar MFA/rate limit. Assim, não foi possível observar uma nova confirmação visual autenticada depois do patch. A leitura PostgreSQL autorizada, transacional e sem escrita confirmou que Chico está restaurado à configuração anterior: versão 30, `model=perDelivery`, `perKm=2.37`, `fixedFee=10`, `minFee=0`, `round=false`, `roundTo=1`, `ranges=[]`, repasse integral. Nenhuma alteração foi feita em `rotamoto`.

### Testes, publicação e estado

- PASS: `node --check app.js`.
- PASS: `node tests/test-company-delivery-pricing.js`, com regressão para o caminho de estado canônico.
- PASS: `node tests/test-cross-app-contract-parity.js`.
- PASS: PostgreSQL `tests/test-company-delivery-pricing-postgres.js` com papel de aplicação/RLS; update/readback, conflito obsoleto e rollback transacional.
- PASS: `npm run assets:check` e `git diff --check`.
- PASS: API 8787 `/health` HTTP 200; o serviço atualizado já estava ativo e não exigiu reinício.
- PASS: Restaurante 8083 serviu o `app.js` corrigido HTTP 200, SHA-256 `f634abfbb7e96c94b8ff617607f232ffdbb5de43f349d4379cd757ef00f0488f`; o `index.html` aponta para `app.js?v=f634abfbb7e96c94`.
- PARTIAL: Browser QA autenticado pós-patch, erro de rede/409 mostrado na tela e reload após a correção — login temporariamente limitado a 429. O QA autenticado pré-patch reproduziu o defeito e comprovou o PUT/readback.
- PARTIAL: `npm test` completo terminou com `BACKUP_CONTROL_LOCK_UNSAFE` em `tests/test-backup-control.js`; a falha é externa ao fluxo de cobrança. Os testes direcionados acima passaram.

Arquivos de produção alterados nesta correção: Restaurante `app.js`. Regressão: `tests/test-company-delivery-pricing.js`. Artefatos gerados pelo sincronizador: `asset-manifest.js` e `index.html`. API/backend, schema e Motoboy não foram alterados. Banco persistente E2E permaneceu com Chico e configurações restauradas; não houve migration ou alteração no banco oficial. Commit local Restaurante: `1f58773` (`fix: confirm company delivery pricing saves`). Nenhum push de aplicativo foi feito.

Gates desta correção: causa raiz **PASS**; correção no checkout e hash servido **PASS**; testes direcionados/PostgreSQL **PASS**; persistência sequencial pela UI **PARTIAL** (observada pré-patch e restaurada; pós-patch depende do desbloqueio natural do rate limit); conflito HTTP 409 **PASS** no teste PostgreSQL; preservação visual de draft em conflito pós-patch **PARTIAL**; Browser QA autenticado pós-patch **BLOCKED temporariamente por 429**. Não marcar Operação como aprovada até uma execução autenticada pós-patch; campanha 0304/G14 continuam abertos.
