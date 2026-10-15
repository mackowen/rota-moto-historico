## Estado vigente — Campanha 0200

**0200 PARTIAL; prontidão para produção BLOCKED.** Regressões npm, contratos cross-app, PG logística, isolamento tenant, concorrência e métricas por role worker passaram. As UIs criaram Orders/Deliveries/Route com geodados; o Browser não comprovou cartografia visível nem avanço ao segundo stop. Offline com SW upgrade, negócio durante outage, financeiro e RETURN Browser não foram repetidos. Restore 0184 é apenas evidência histórica nesta campanha. Banco oficial intocado. Ver [REGISTROS/0200.md](REGISTROS/0200.md).

## Estado vigente — Campanha 0199

**0199 PARTIAL.** Foi implementada leitura agregada tenant-scoped das outboxes duráveis para os workers de marketplace e logística, em transação READ ONLY e sem IDs como labels. A consulta foi validada com roles PostgreSQL worker; `npm test` nos dois apps passou. Sem endpoint/exporter, alertas e métricas próprias de retry/lease/latência, o gate operacional continua parcial. Restaurante commit local `1f19237`. Ver [REGISTROS/0199.md](REGISTROS/0199.md).

## Estado vigente — Campanha 0198

**0198 PARTIAL.** Proxy isolado confirmou liveness 200 e readiness 200→503→200 sob indisponibilidade/recuperação do PostgreSQL E2E. Não houve Order/Delivery pendente nem replay transacional durante o outage; sincronização e outbox sob falha continuam sem comprovação. Evidência local em `browser-tests/evidencias/campanhas/0198/pg-health-recovery.json`. Ver [REGISTROS/0198.md](REGISTROS/0198.md).

## Estado vigente — Campanha 0197

**0197 PARTIAL.** A disputa real em `rotamoto_e2e` resultou em um único Driver atribuído; perdedor recebeu `REVISION_CONFLICT`, aceite não autorizado foi rejeitado e replay não duplicou o evento. Manifesto/schema ficaram retidos. A criação pela UI, disputa e execução/convergência no mesmo Browser run ainda não foram provadas. Ver [REGISTROS/0197.md](REGISTROS/0197.md).

## Estado vigente — Campanha 0196

**0196 PARTIAL.** A interface autenticada criou duas Orders, Deliveries e Route de duas paradas, com origem/destinos sintéticos e sem escrita direta em coordenadas. Correção expõe stops ordenados para marker hydration; unit, suites npm e logística PG passaram. Browser confirmou markers e request de geometria, mas captura visual enquadrada e avanço ao segundo stop mobile seguem pendentes. Commits locais Restaurante `543b9c1`, Motoboy `20ad846`. Produção permanece BLOCKED por dependências anteriores. Ver [REGISTROS/0196.md](REGISTROS/0196.md).

## Estado vigente — Campanha 0195

**0195 PARTIAL; prontidão para produção BLOCKED.** Duas entregas e Route passaram pela UI autenticada, financeiro reconciliado (13070 centavos Order, 725 Earning), ACK perdido/replay idempotente, suites dos apps e PG/RLS/worker passaram. Foi corrigida cotação worker sem `commandId`. Limites: mapa sem coordenadas, reload ainda online sem sessão, RETURN UI não reexecutado, outbox sob outage não coberto e métricas incompletas. Restore sintético 0184 até 0044 verificado por metadados; DR oficial, offsite, RPO/RTO, homologação externa e hardware pendentes. Ver [REGISTROS/0195.md](REGISTROS/0195.md).

## Estado vigente — Campanha 0194

**0194 PARTIAL.** Proxy loopback no caminho do runtime para `rotamoto_e2e` comprovou liveness 200 e readiness 200→503→200 durante falha/restauração de conexão. Não foram testados outbox pendente, replay ou operação com resultado incerto sob a mesma interrupção. Evidência local `browser-tests/evidencias/campanhas/0194/pg-outage.jsonl`; ver [REGISTROS/0194.md](REGISTROS/0194.md).

## Estado vigente — Campanha 0191

**0191 PARTIAL** no gate UI+concorrência: corrida de atribuição e de aceite passou com dois Drivers/sessões no PostgreSQL E2E; Browser separado criou pedidos, entregas e Route pela UI e convergiu nos dois apps. Os dois runners ainda não compartilharam a mesma Delivery. Restaurante commit local `e67d6dd`; ver [REGISTROS/0191.md](REGISTROS/0191.md).

## Estado vigente — Campanha 0190

**0190 PARTIAL.** Suítes npm dos dois apps, segurança/logística PostgreSQL e workers 99Food passaram nos cenários listados; Browser usa evidências 0186–0189. Sanitização de logs e teste de readiness foram fortalecidos. Métricas agregadas de workers, outage real no runtime e regressão Browser integral permanecem sem prova. Produção BLOCKED por DR, homologação e validações físicas/operacionais. Ver [REGISTROS/0190.md](REGISTROS/0190.md).

## Estado vigente — Campanha 0189

**0189 PASS** para lifecycle Leaflet, sessão/logout/reauth e CSRF em desktop e mobile; **PARTIAL** para tiles/markers, pois o dataset não contém coordenadas válidas. Corrigido timeout/500 no logout reutilizando a transação autenticada. Run `39112770-f6f6-4a36-b63c-8786bff54f22`; ver [REGISTROS/0189.md](REGISTROS/0189.md).

## Estado vigente — Campanha 0188

**0188 PARTIAL.** Duas sessões PostgreSQL passaram atribuição/Offline, FIFO, retries/leases, RETURN receipt, rollback e RLS tenant. Não houve disputa same-Delivery por dois perfis Rider independentes; modelo atribui pelo Restaurante. Fixture E2E retida, sem limpeza. Sem alterações de app. Ver [REGISTROS/0188.md](REGISTROS/0188.md).

## Estado vigente — Campanha 0187

**0187 PASS para o cenário financeiro positivo pela UI.** Order 13.070 centavos, taxa 725, Earning 725 por Delivery e snapshot `payout-snapshot-v1` conciliados entre PostgreSQL E2E, Restaurante e Motoboy. Corrigida a seleção de estado canônico em pedidos. Testes de entrada inválida pela interface não foram exauridos. Restaurante HEAD local `9597087`; sem push. Ver [REGISTROS/0187.md](REGISTROS/0187.md).

## Estado vigente — Campanha 0186

**0186 PASS no upgrade PWA autenticado.** SW v43.44/v43.45 real atravessou `waiting`, fechamento e reabertura; outbox IndexedDB permaneceu e convergiu em PostgreSQL sem duplicação. Sem mudanças de produto. A análise detectou que `navigator.onLine=true` não significou backend acessível; a probe autenticada falhou até reconexão. Ver [REGISTROS/0186.md](REGISTROS/0186.md).

## Estado vigente — Campanha 0185

**0185 PARTIAL; produção BLOCKED.** Suites completas `npm test` dos dois apps, PostgreSQL E2E de tenant/domínio/RETURN/concurrency e Browser autenticado de duas entregas passaram nos cenários executados. Restore real sintético PostgreSQL 18.6 até migration 0044 passou. Permanecem sem prova: update SW com outbox, conciliação financeira completa via UI, corrida de dois aceites pela mesma entrega, mapa/logout-CSRF em ciclos mobile e desktop, outage PostgreSQL, hardware e DR oficial. Ver [REGISTROS/0185.md](REGISTROS/0185.md).

## Estado vigente — Campanha 0184

**0184 PASS somente para restore sintético isolado; DR oficial BLOCKED.** Cluster PostgreSQL 18.6 descartável restaurou backup criptografado real até migration 0044, com ledger/checksums íntegros, linha sintética recuperada, 118 índices, 803 constraints e 38/38 tabelas com RLS/FORCE. Nenhum banco/backup/chave oficial foi acessado. Mídia canônica não compôs o set; offsite, custódia independente e RPO/RTO continuam pendentes. Restaurante commit local `1938f9c`. Ver [REGISTROS/0184.md](REGISTROS/0184.md).

## Estado vigente — Campanha 0183

**0183 PARTIAL.** O lifecycle Leaflet/MapLibre foi corrigido com descarte idempotente no unload e proteção contra callbacks/timers tardios; testes unitários e suite Restaurante passaram. A exceção não apareceu no Browser autenticado posterior, e o 403 CSRF não foi reproduzido nos registros de instalação. A matriz explícita de navegação repetida, sessão e viewports 390×844/desktop não foi executada integralmente. Restaurante commit `e083d52`. Ver [REGISTROS/0183.md](REGISTROS/0183.md).

## Estado vigente — Campanha 0182

**0182 PARTIAL.** PostgreSQL E2E confirmou Earning positivo de 1.250 centavos, regra `fees-v1`, referenciação da Delivery, cancelamento pré/pós-coleta, RETURN ao fim da rota e recebimento autorizado. Concorrência com duas sessões passou para claim/atribuição/receipt, sem duplicações. Falta disputa autenticada de dois motoboys pela mesma entrega e conciliação financeira ponta a ponta pela UI (Order total, fee, repasse e Earning). Ver [REGISTROS/0182.md](REGISTROS/0182.md).

## Estado vigente — Campanha 0181

**0181 PARTIAL.** E2E autenticado criou Orders/Deliveries/Route pela UI, concluiu uma entrega, perdeu conexão na outra, encerrou/reabriu o Chromium com o mesmo perfil e preservou outbox no IndexedDB. O backend ficou inalcançável embora navigator.onLine fosse true; após reconexão/reautenticação o estado convergiu. ACK perdido após commit não duplicou eventos. Upgrade real do Service Worker com outbox pendente ainda não foi testado. Ver [REGISTROS/0181.md](REGISTROS/0181.md).

## Estado atual — Campanha 0176: convergência Restaurante (2026-10-14)

**Resultado PASS para a convergência visual da jornada coberta; produção segue BLOCKED.** Uma Order foi criada na UI Restaurante, executada pelo Motoboy até Delivery `DELIVERED` v6 e, após reload + sync autenticado, apareceu na lista do Restaurante como `Finalizada`. IDs canônicos de Order/Delivery e projeções IndexedDB/PostgreSQL foram coerentes. A falha da 0172 era corrida e condição indevida do runner; nenhuma correção de produto foi necessária. Evidência: [REGISTROS/0176.md](REGISTROS/0176.md), [RESUMOS/0176.md](RESUMOS/0176.md), sumário local de fixture 0176.

A próxima dependência aberta é a 0177: Route canônica e duas paradas ordenadas pela interface. Offline/PWA, reconciliação financeira, concorrência das operações e RETURN ainda não foram aprovados. Backup/DR, validação física e homologação comercial continuam bloqueios independentes para produção.

## Estado anterior — Campanha 0169: observabilidade (2026-10-14)

**Resultado PARTIAL.** A API compartilhada adicionou métricas agregadas em memória para API/sync, sanitização de logs e máscara de IDs em caminhos. Liveness/readiness e correlação permanecem; readiness verifica o pool usado pelo servidor. Suites completas dos apps e testes HTTP/unidade passaram. Falha PostgreSQL real, filas/workers e alertas duráveis não foram exercitados. Ver [REGISTROS/0169.md](REGISTROS/0169.md).

## Estado anterior — Campanha 0168: backup e disaster recovery (2026-10-14)

**Resultado PARTIAL.** O backup versionado passou a incluir IDs/checksums do ledger no manifesto autenticado; inventário identifica cobertura antiga/divergente e ledger alterado durante captura bloqueia a publicação do conjunto. Testes usam fake dump/cliente e chave temporária. O recovery set real conhecido até 0041 não foi aberto; 0044 é a versão atual versionada. Sem chave/artefato autorizado não houve restore real, cópia independente, retenção/agendamento ou prova RPO/RTO. Banco oficial não acessado. Ver [REGISTROS/0168.md](REGISTROS/0168.md).

## Estado anterior — Campanha 0167: offline e recuperação (2026-10-14)

**Resultado PARTIAL.** Suites automatizadas dos dois apps passaram para persistência, replay e reconciliação. A falha PWA CDP ocorreu antes de a versão anterior do Service Worker alcançar `waiting`; nenhuma operação comercial autenticada foi recuperada após 503/ACK perdido. Assim, recuperação end-to-end e convergência bilateral seguem sem comprovação. O teste de sync autenticado depende do ciclo 0166. Ver [REGISTROS/0167.md](REGISTROS/0167.md) e [RESUMOS/0167.md](RESUMOS/0167.md).

## Estado anterior — Campanha 0166: ciclo completo de entrega (2026-10-14)

**Resultado PARTIAL.** `npm test` passou no Restaurante e Motoboy; PostgreSQL E2E de logística passou com rollback em `rotamoto_e2e`. Chromium/CDP em perfil descartável comprovou criação de pedido próprio pela UI apenas em IndexedDB local. A sessão era offline/anônima; não há prova de envio ao PostgreSQL, despacho, aceite, coleta, rota, chegada, conclusão ou convergência bilateral. Nenhum Order/Delivery/status foi pré-semeado. Nenhum acesso ao banco oficial ou alteração no Motoboy/Browser QA ocorreu.

Registro: [REGISTROS/0166.md](REGISTROS/0166.md); resumo: [RESUMOS/0166.md](RESUMOS/0166.md). Próxima campanha sequencial: 0167.

## Estado anterior — Preparatória 0165-P: PostgreSQL oficial e publicação Git (2026-10-14)

**Resultado: PASS para diagnóstico estrutural e publicação das branches; banco sem alterações.** A conexão read-only ao PostgreSQL 18.6 confirmou `rotamoto` com ledger consistente de 0001 a 0044 e checksums iguais às migrations versionadas. Não há migrations pendentes nem divergentes.

- Estrutura consultada: 47 tabelas, 118 índices válidos, zero constraints não validadas; 38 tabelas com RLS e FORCE, 38 policies. As roles verificadas não têm SUPERUSER, CREATEDB, CREATEROLE ou BYPASSRLS. `rotamoto_app` conectou em read-only. Não foram lidos registros de domínio nem alterados grants.
- `npm test` passou nos dois aplicativos; contrato cross-app e sintaxe dos JS alterados passaram. PostgreSQL E2E de logística, tenant/RLS e limiter 99Food passaram somente em `rotamoto_e2e`; fixtures com escrita ficaram manifestadas e retidas.
- Restaurante remoto `codex/setup-workflow`: `dfff2a7c41ec53024463a14dc365b193af807619` → `f3165f1cd113de10a10fb4817e728ae84fbabc1c`. Motoboy remoto `codex/setup-workflow`: `6cce24d71fb7bcfb8777cbc6c89c4a76278eb2e2` → `baf00f788edf08bf7f555fc155068a4c5b24ba4f`. Pushes normais, sem divergência ou force. Browser QA não foi alterado.
- RLS tem nove tabelas sem ativação no baseline, além das 38 com RLS/FORCE; não se alterou a política. A role `rotamoto_auditor` não conseguiu inventariar o schema, então catálogo/ledger foram lidos com `rotamoto_migrator` já configurada, sem ampliar privilégios.
- **Readiness é estrutural, não operacional/produção.** A confirmação de 0044 não atualiza a evidência do recovery set conhecido, que cobre somente até 0041. Backup/restore atual, cópia independente, retenção/agendamento, RPO/RTO, hardware e homologação continuam conforme pendências da Campanha 0165.

Registro: [REGISTROS/0165-P.md](REGISTROS/0165-P.md); resumo: [RESUMOS/0165-P.md](RESUMOS/0165-P.md). Resultado de continuidade da campanha principal 0165 permanece PARTIAL e `PRODUCTION_READINESS=BLOCKED`. Não iniciar 0166 automaticamente.

## Estado atual — Campanha 0165: estabilidade operacional e readiness (2026-10-14)

**Resultado: PARTIAL; `PRODUCTION_READINESS = BLOCKED`.** `npm test` completo passou no Restaurante e Motoboy. Browser/CDP autenticado comprovou cancelamento pós-coleta, RETURN ao fim da rota, handover do Motoboy, recebimento autorizado no Restaurante e retry após resposta 503 perdida. O runner preparou Order/Delivery/paradas antes da UI; ciclo próprio completo começando pela interface sem pré-semeadura não foi executado.

- PostgreSQL E2E exclusivamente em `rotamoto_e2e`: guardas, logística transacional, tenant/RLS, workers, rate limit 99Food e runtimes marketplace passaram. `status --e2e` confirmou 44 migrations, 0001–0044, checksums válidos; PostgreSQL 18.6 e 38 tabelas com RLS+FORCE. `rotamoto` não acessado.
- Browser: `../browser-tests/evidencias/campanhas/0165/return-receipt-01/`; seis screenshots 390×844, `summary.json` e `trace.jsonl`. `RETURNED/RECEIVED`, uma confirmação e nenhum comprovante fictício. Quatro 404 são rotas não registradas no harness, sem defeito do produto confirmado.
- Manifests desta execução ficaram retidos. Dois runners de provider geraram labels fixos antigos (`0160`/`0153`); manifests `e9b18d07-8c71-4954-8301-b2a5b3783958` e `ed52d3d1-26f2-4d15-adc8-5e2e4ec9593a` preservados sem edição.
- Suites financeiras de Order money/Earning passaram, mas reconciliação financeira cross-app integral não foi medida. iFood/Keeta/99Food foram somente sintéticos; sem credenciais, sandbox ou chamadas comerciais.
- Upgrade SW/outbox sintética 0164 é evidência anterior para os mesmos arquivos; em 0165 não se executou sync autenticado após reabertura. `adb devices` vazio; GPS/câmera/QR/impressão físicos sem teste.
- Recovery set 0154 de 317.563 bytes e dump incompleto 0153 de 313.236 bytes continuam presentes. Restore/verificação histórica cobre 0041; E2E atual em 0044. Nenhuma chave acessada, backup atual ou restore realizado. Cópia externa, custódia, retenção/agendamento e RPO/RTO sem prova.
- Processos PostgreSQL/nginx/PHP-FPM visíveis; alertas, health monitorado e suporte não exercitados. Telemetria térmica não respondeu e `/proc/loadavg` estava inacessível; não foi executada carga prolongada acima de 0164.
- Apps sem alterações/commits: Restaurante `f3165f1cd113de10a10fb4817e728ae84fbabc1c`, Motoboy `baf00f788edf08bf7f555fc155068a4c5b24ba4f`. Browser QA só evidências locais; histórico atualiza cinco documentos.

Gates: `RETURN_CANCELLATION`, `ACK_REPLAY_IDEMPOTENCY`, `TENANT_RLS_SECURITY` e `WORKER_RESILIENCE` PASS nos cenários executados; ciclo integral, offline, finanças, concorrência sustentada, PWA operacional, monitoramento e regressão cross-app PARTIAL; hardware Android, homologação provider, DR e produção BLOCKED. Detalhes em [REGISTROS/0165.md](REGISTROS/0165.md) e [PENDENCIAS.md](PENDENCIAS.md). Não iniciar 0166 automaticamente.

## Estado atual — Campanha 0164: performance, concorrência e PostgreSQL (2026-10-14)

**Resultado: PARTIAL.** Benchmarks sintéticos autenticados até dez clientes e regressões PostgreSQL/worker passaram em seus escopos. Não houve ganho de produto atribuível a uma alteração funcional; portanto, nenhuma otimização de aplicação/schema foi aplicada. O PostgreSQL oficial `rotamoto` não foi acessado.

- API E2E em `rotamoto_e2e`: duas fases de 57 requisições, dez sessões independentes em dois tenants e tiers 1/3/5/10; zero erros. No tier 10, p95 179,09 ms e 160,81 ms na repetição aquecida. Perfil, dataset e percentis em [REGISTROS/0164.md](REGISTROS/0164.md) e `../browser-tests/evidencias/campanhas/0164/a092c819-438d-4455-8088-e22d85698205/postgres-api-benchmark.json`. Rodadas curtas não provam carga sustentada.
- Plano PostgreSQL usou `domain_records_tenant_entity_updated_idx`, execução ~1 ms e estimativa 1/125 para tenant recém-criado; possível efeito de estatística pré-fixture permanece hipótese. Sem `ANALYZE`, DDL, migrations ou alteração de parâmetros.
- Worker/limiter concorrentes, tenant/RLS e suites completas dos dois apps passaram. Fixtures sintéticas manifestadas ficaram `RETAINED`, incluindo auditoria append-only; nenhum resíduo ou schema foi removido.
- Chromium/CDP: quatro viewports nos dois apps, sem overflow; sem erros de console ou HTTP inesperados. O bloqueio de Service Worker da 0163 foi reproduzido como falha de cabeçalho do runner (`no-store` em assets) e corrigido no Browser QA. Upgrade de ambos os workers preservou entrada sintética pendente em IndexedDB após reabertura. Não representa reconexão real com backend.
- IndexedDB bruto: 1.000 registros×5 em database novo no perfil Chromium isolado; leituras/escritas mensuradas, sem equivalência à lógica de outbox. UI com lista longa autenticada, estabilidade de memória, locks sob carga sustentada e offline real permanecem sem comprovação.
- Restaurante `codex/setup-workflow`: commit local `f3165f1cd113de10a10fb4817e728ae84fbabc1c` (benchmark/manifestos), sem push. Motoboy sem alteração, HEAD `baf00f788edf08bf7f555fc155068a4c5b24ba4f`. Browser QA sem commit/push. Histórico autorizado será publicado somente com os cinco documentos.
- Gates: `CONCURRENCY_10_CLIENTS`, `TENANT_ISOLATION`, `SYNC_IDEMPOTENCY` (cenários executados), `PWA_WORKER_ACTIVATION` e `PWA_UPGRADE_RECOVERY` (fixture sintética) PASS; API/PostgreSQL performance, reconexão offline, IndexedDB, UI, memória, regressão cross-app e integridade global PARTIAL.

Não declarar capacidade de produção. Próximas medições devem ampliar duração/rodadas e incluir locks, operações de escrita, sync/reconexão e interface autenticada com dados sintéticos. A Campanha 0165 não foi iniciada.

## Snapshot anterior — Campanha 0163: Android, PWA e acessibilidade (2026-10-14)

**Resultado: PARTIAL.** Corrigida a ausência de manifesto PWA no Restaurante; suites completas Restaurante/Motoboy e isolamento PostgreSQL E2E passaram. Chromium/CDP percorreu quatro viewports e navegação local; o pedido foi criado pela UI e ficou apenas no IndexedDB local. A atualização persistente dos Service Workers ficou BLOCKED, o ciclo bilateral completo não foi alcançado e não havia dispositivo Android conectado. Não há declaração WCAG integral nem prontidão de produção.

- Browser/CDP isolado: 360×800, 390×844, 412×915 e 1365×900, sem overflow; 10 destinos do Restaurante e seis abas do Motoboy ativos; nenhum erro de console ou HTTP inesperado. Capturas e runner em `../browser-tests/evidencias/campanhas/0163/9f73bda6-d3d0-4a29-9d9b-61702c3d9c18/` e `../browser-tests/campaign-0163-mobile-pwa.cjs`.
- Pedido local de UI `QA0163-2e1c6e83` salvo como `AGUARDANDO/CREATED`, `sync=local`. Stub de sessão respondeu 401; APIs indisponíveis responderam 503. Nenhuma etapa de atribuição, aceitação ou entrega foi iniciada no Motoboy.
- Restaurante agora declara manifesto PWA com ícones 192×192/512×512 e inclui os recursos no shell cache v43. Chromium leu manifesto/ícones (200); os workers antigos v42/v43.44 ficaram em `installing`, sem controlar a página. Não houve teste de outbox durante upgrade, instalação via prompt ou recuperação offline real.
- `npm test` completo passou nos dois apps; `test:e2e-tenant-isolation` passou em `rotamoto_e2e`, sem acesso a `rotamoto`. Manifesto fixture retida `a724e2f6-baad-40d1-a517-0354b530ff98` permanece intacta e tem metadado legado `campaign=0160`.
- Restaurante `codex/setup-workflow`: commit local `5667fc71cd523d93c9ca651ba709b28ed682d021`; Motoboy sem alteração, HEAD `baf00f788edf08bf7f555fc155068a4c5b24ba4f`; nenhum push nos aplicativos. Browser QA somente local.
- A checagem de controles foi heurística: zero botões sem nome e zero campos visíveis sem label; Tab moveu foco no Restaurante, mas permaneceu no `body` ao final da rota de Ajuda do Motoboy. Sem axe, contraste/leitor de tela, orientação landscape ou teclado virtual.
- `adb devices -l` sem dispositivos; nenhum teste físico GPS, câmera/QR, impressão, suspensão ou PWA Android. Sem alterações no Android.
- Gates: `NAVIGATION_UX` PASS no escopo; `POSTGRES_SECURITY` PASS em E2E; `MOBILE_RESPONSIVENESS`, `ACCESSIBILITY_WCAG`, `PWA_INSTALLATION`, `OFFLINE_RECOVERY`, `FULL_DELIVERY_BROWSER_E2E` e `CROSS_APP_REGRESSION` PARTIAL; `PWA_UPGRADE`, `ANDROID_GPS`, `ANDROID_CAMERA_QR`, `ANDROID_PRINTING`, `PHYSICAL_DEVICE_VALIDATION` BLOCKED.
- Restaurante: correção PWA/testes em commit local; Motoboy sem alterações/commit; Browser QA apenas runner/evidências sem push. Histórico publica somente os cinco documentos permitidos na branch autorizada.

Registro: [REGISTROS/0163.md](REGISTROS/0163.md); resumo: [RESUMOS/0163.md](RESUMOS/0163.md). Próxima campanha indicada: 0164; não iniciada.

## Registro anterior — Campanha 0162: auditoria SAST/SCA e segurança Full Stack (2026-10-14)

**Resultado: PARTIAL; nenhuma vulnerabilidade explorável foi confirmada nos cenários revisados.** `npm audit` reportou zero advisories nos dois lockfiles; as suites completas dos apps, PostgreSQL E2E autenticado e Browser/CDP bilateral passaram no escopo executado. SAST dedicado não estava instalado; o scanner manual foi direcionado e não substitui análise semântica integral. A prontidão de produção não foi aprovada.

- Restaurante `codex/setup-workflow`: SHA `8e944f9011aa91f333da6e0bfdfea0082e29e76d`, sem alterações nesta campanha. Motoboy `codex/setup-workflow`: SHA `baf00f788edf08bf7f555fc155068a4c5b24ba4f`, sem alterações. Histórico será publicado somente com os cinco documentos autorizados.
- Segurança PostgreSQL somente em `rotamoto_e2e`: consulta `BEGIN READ ONLY` mostrou 47 tabelas, 38 com RLS/FORCE e policy única; roles consultadas sem flags privilegiadas. O teste `test-domain-sync-postgres.js` concluiu tenant A/B, CSRF, sessão e RETURN com transação revertida. `rotamoto` não foi acessado.
- Browser/CDP `campaign-0149-tenant-security.cjs`, campanha etiquetada 0162, terminou PASS em viewport 390×844 nos dois apps: negativas de sessão/CSRF, race cross-tenant negada, recebimento autorizado e retry após 503 com um único evento. Manifesto `e472b65c-e906-4506-afed-057329f06f8a` está `RETAINED`; evidências locais em `../browser-tests/evidencias/campanhas/0162/security-fullstack-01/`. O runner não instrumentou erros de console; esse item não foi medido.
- Webhooks: verificações de assinatura/raw body e identificador de replay passaram em testes sintéticos locais. A paridade de runtime completa por provider e homologação externa não foram exercitadas. Nenhum segredo comercial, chave de backup ou dado do banco oficial foi acessado.
- Gates: SAST PARTIAL; SCA PASS; auth/session PASS; RBAC/tenant PASS; PostgreSQL RLS PASS em E2E; webhook provider PARTIAL; sync replay PASS; segredos PASS no conjunto examinado; regressões cross-app PASS; Browser security PASS no cenário; `SECURITY_READINESS` PARTIAL.
- Pendências P1: SAST local suportado/fixado em ARM64; ampliar DAST por endpoint/role; completar runtime de webhooks dos três providers com fixtures e manifestos. Permanecem onboarding/homologação externa, testes físicos Android/GPS/câmera e pendências de continuidade/backup.

Registro detalhado: [REGISTROS/0162.md](REGISTROS/0162.md); resumo: [RESUMOS/0162.md](RESUMOS/0162.md). Não iniciar automaticamente Campanha 0163.

## Estado atual — Campanha 0161: modularização incremental (2026-10-14)

**Resultado: PARTIAL.** O módulo de sync do Restaurante recebeu uma extração pequena e testada: a validação de envelope/protocolo foi separada da coordenação transacional de `sync-service.js`. Exportações, protocolo v1, autoridade de escrita, RLS, transações, eventos e IndexedDB foram mantidos.

- **Antes/depois:** `sync-service.js` 1.021→962 linhas; novo `sync-validation.js` 72 linhas. O total de linhas cresceu 13 e não se afirma benefício por redução de tamanho. Um gráfico estático de 70 arquivos backend encontrou zero ciclos; `sync-validation.js` não tem imports e é usado apenas pelo serviço.
- **Caracterização:** teste isolado passou antes e depois da extração: limite/forma do envelope, IDs, device, coleções permitidas, credenciais, contagem, eventos e erros v1. Exportações públicas (`SyncError`, `validatePacket`, `ENTITY_ARRAYS`) continuam em `sync-service.js`.
- **Regressões:** `npm test` completo dos dois apps, `npm run test:sync`, paridade cross-app, guards, PostgreSQL tenant/RLS, domínio/sync e logística passaram. PostgreSQL somente `rotamoto_e2e`; `test-domain-sync-postgres` e logistics usaram transação revertida; fixtures comprometidas ficaram manifestadas/retidas.
- **Browser:** Chromium/CDP bilateral em 390×844 percorreu sync de eventos, RETURN e recebimento após HTTP 503. OperationResults confirmaram eventos `DeliveryEvent` como aceitos. Evidências locais em `../browser-tests/evidencias/campanhas/0161/sync-validation-browser/`; manifesto `eed0d20e-c4ee-4a0a-821a-4ce6d22a5d3f` retido.
- **Desempenho:** microbenchmark da função pura (3.000 chamadas, mediana de cinco) 95,60 ms antes e 96,26 ms depois. Sem ganho demonstrado; não representa latência da API.
- **Motoboy:** sem alterações. Seus módulos de execução, navegação, armazenamento e reconciliação existentes passaram. Extração do estado global/DOM de `app.js` foi adiada por falta de fronteira segura caracterizada.
- **Commits:** Restaurante local `8e944f9011aa91f333da6e0bfdfea0082e29e76d`, sem push. Motoboy sem commit, HEAD `baf00f788edf08bf7f555fc155068a4c5b24ba4f`. Browser QA sem publicação; preservou runners/evidências anteriores.
- **Gates:** arquitetura PARTIAL, contrato PASS, cross-app sync PASS, PostgreSQL security PASS, Browser PASS no fluxo exercitado, persistência offline PASS no escopo das suites, manutenção PARTIAL.

Riscos arquiteturais remanescentes: `app.js` de ambos os aplicativos continua grande; `sync-service.js` ainda combina autorização, validação de entidades, transações, eventos e projeções. A divisão desses fluxos foi adiada até haver testes de caracterização por responsabilidade. Registro completo em [REGISTROS/0161.md](REGISTROS/0161.md); resumo em [RESUMOS/0161.md](RESUMOS/0161.md). Não iniciar automaticamente Campanha 0162.

## Estado atual — Campanha 0160: revisão final e próximo ciclo (2026-10-14)

**Resultado: PARTIAL; prontidão para produção BLOCKED.** A suíte completa dos dois aplicativos passou. PostgreSQL E2E, runner de concorrência protegido e Browser cobriram segurança tenant, workers, providers sintéticos, RETURN bilateral, IndexedDB crash/restart e mapa local em desktop/mobile. O runner de concorrência que removia seu sandbox foi corrigido para manifestar e reter; o runner legado de rollback de migrations agora é bloqueado antes de conectar ao banco compartilhado.

- **Branches/HEAD iniciais:** Restaurante `codex/setup-workflow` `a3fb1131ce9e1a9c548d16974cb3a509e5d89bd5`; Motoboy `codex/setup-workflow` `baf00f788edf08bf7f555fc155068a4c5b24ba4f`; Histórico autorizado `8ba1ac8905db59aa4432b2d765eb54173cbb85f5`; Browser QA `eb5d082e2f1aa44fe5f56a79a80c82eac1179362`. Nenhum banco oficial foi acessado.
- **Runners:** disponibilidade/concorrência agora usa schema `campaign0160_<UUID>`, manifesto atômico antes da primeira gravação e retenção sem DROP; 65 checks passaram em duas sessões. Manifesto `13875be8-74ac-4573-8b47-5c0b6761d9f4`. `test:postgres-migrations` contém rollback/DELETE e foi bloqueado por guard antes de abrir conexão; requer banco descartável independente.
- **Fixtures e resíduo:** somente catálogos do schema `campaign0112_6017…` foram lidos em `rotamoto_e2e` read-only: 41 tabelas, 108 índices, 741 constraints, 33 tabelas RLS/FORCE, trigger append-only de auditoria habilitada. Origem não provada, conteúdo não consultado, schema preservado.
- **Browser:** retorno bilateral com HTTP 503/replay terminou RETURNED/RECEIVED, um evento de confirmação e zero provas fictícias. Outbox local sobreviveu reload/SIGKILL; mapa usou 9 tiles locais interceptados. O ciclo próprio de pedido completo por Browser e upgrade PWA com cache antigo não foram executados, portanto gates PARTIAL.
- **Cobertura:** matriz 0151–0160 mantém 1 RESOLVED, 9 PARTIAL, 0 OPEN no status de objetivo; riscos específicos continuam abertos. Backlog 0161–0165 está priorizado em [PENDENCIAS.md](PENDENCIAS.md).
- **Backup/continuidade:** conjunto conhecido é antigo (snapshot até 0041, apesar do schema 0044 descrito no registro 0154). Cópia externa, snapshot atual, custódia independente, agenda, retenção e RPO/RTO sem comprovação. A declaração de chave no Google Drive não foi verificada; não se presume que o backup esteja nesse destino.
- **Commits:** Restaurante tem alterações locais nos cinco runners de teste, sem push; Motoboy sem alterações; Browser QA com evidências locais preservadas, sem push. O histórico publica exclusivamente os cinco documentos autorizados desta campanha.

Gates completos, evidências reproduzíveis e limites em [REGISTROS/0160.md](REGISTROS/0160.md) e [RESUMOS/0160.md](RESUMOS/0160.md). Não iniciar automaticamente Campanha 0161.

## Estado atual — Campanha 0159: auditoria consolidada de regressão (2026-10-14)

**Resultado: PARTIAL; prontidão para produção não aprovada.** As suites completas dos dois aplicativos passaram. Os testes de PostgreSQL, Browser e adapters exercitaram isolamento, providers, 99Food e o ciclo bilateral de RETURN. Foram corrigidos um detalhe visual ilegível e um atalho de teste PostgreSQL sem URLs E2E.

- **Restaurante:** detalhe do pedido externo agora separa rótulos e valores; shell atualizou a folha offline (`styles.css?v=0159.1`, cache `v42`). `test:logistics-postgres` agora aponta somente para `rotamoto_e2e`. Commit local `a3fb1131ce9e1a9c548d16974cb3a509e5d89bd5`, sem push.
- **Motoboy:** suite completa passou; branch sem alterações, HEAD `baf00f788edf08bf7f555fc155068a4c5b24ba4f`. Browser confirmou RETURN concluído e mapa Leaflet com tiles locais sintéticos, não GPS físico.
- **PostgreSQL:** `rotamoto_e2e` read-only após testes: ledger 44/checksums 0001–0044 íntegros, latest 0044; 38/38 tabelas com RLS/FORCE; `audit_log` FORCE e trigger append-only ativos; roles consultadas sem atributos administrativos. Nenhum acesso ao `rotamoto`.
- **Browser:** CDP desktop/mobile; tenant A/B, CSRF/anônimo, lista local/externa, 503/retry e recebimento de RETURN; a rota de devolução foi inserida depois das duas entregas existentes e houve um evento de recebimento. Testes de mapa e outbox browser passam com recursos locais sintéticos. GPS, câmera, Android físico, tiles reais e todos os formulários/telas não foram validados.
- **Correção de preservação:** o runner `test:availability-concurrency-e2e` removeu por teardown seu schema sandbox recém-criado e dados sintéticos/audit desse sandbox, contra a restrição da campanha. Não repetimos. Uma consulta posterior encontrou um schema residual `campaign0112_6017…` de propriedade `rotamoto_migrator`, origem/conteúdo não verificados; ficou intacto. Este desvio impede declarar PASS total de preservação.
- **0158:** operador declarou guardar uma cópia da chave no Google Drive; não verificamos, acessamos ou expusemos chave alguma, nem presumimos que o recovery set esteja lá. Backup externo do artefato, snapshot atualizado, custódia, agenda e RPO/RTO continuam pendentes.
- **Matriz:** [PENDENCIAS.md](PENDENCIAS.md) mantém objetivos planejados e execução real separados. Matriz original: 1 RESOLVED, 8 PARTIAL, 1 OPEN. Campanhas complementares 0161–0165 preservadas. 0160 segue OPEN e não foi iniciada.

Evidências, IDs de fixtures, comandos, limites, incidente de teardown e recomendação de 0160 em [REGISTROS/0159.md](REGISTROS/0159.md) e [RESUMOS/0159.md](RESUMOS/0159.md). Histórico 0158 preservado logo abaixo; não declarar prontidão de produção.

## Estado atual — Campanha 0158: backup, restauração e continuidade (2026-10-14)

**Resultado: PARTIAL.** Um recovery set criptografado da Campanha 0154 foi autenticado e restaurado em cluster PostgreSQL 18.6 descartável. O snapshot contém migrations 0001–0041; a documentação 0154 registra avanço do schema até 0044. O banco oficial `rotamoto` não foi acessado nesta campanha e não se afirma sua versão atual. A recuperação isolada do snapshot foi comprovada; a recuperação de desastre atual e independente ainda não.

- **Backup e inventário:** `BACKUP_INTEGRITY PASS`. Um set completo foi inventariado, SHA-256/HMAC/AES-GCM/manifesto/mídia validados. O dump avulso de 0153 continua retido como incompleto. Foi implementado inventário read-only no Restaurante, sem rotina de exclusão ou limpeza.
- **Restore:** `ISOLATED_RESTORE PASS`. Restore em cluster isolado com PostgreSQL 18.6, migrations/checksums 0001–0041 correspondentes, RLS/FORCE e trigger append-only ativos, 0 constraints/índices inválidos. A operação medida durou 3,448 s entre eventos auditados, excluindo startup e retorno de serviço; não é RTO.
- **Segurança e bancos:** `rotamoto_e2e` exclusivamente para consultas e testes; ledger com 44 migrations, 38/38 tabelas RLS/FORCE e `audit_log` protegido. Nenhum DDL, backup/restore, escrita, privilégio, limpeza ou acesso ao oficial `rotamoto`. Roles operacionais e serviços preservados.
- **Continuidade:** runit mostrou PostgreSQL/nginx/PHP-FPM ativos e sshd down; nenhum serviço reiniciado. Não há agendamento de backup instalado. Chromium/CDP 390×844 provou que uma outbox sintética pendente em cada app sobrevive reload e encerramento SIGKILL/restart; Android force-stop, perda elétrica e recuperação de host não foram testados.
- **Gates:** backup, restore isolado, segurança do snapshot e cobertura da matriz PASS; serviço, IndexedDB/sync e automação PARTIAL; `DISASTER_RECOVERY_READINESS BLOCKED` por ausência de cópia off-device, custódia independente, objetivos RPO/RTO e snapshot atualizado.
- **Matriz 0151–0160:** atualizada em [PENDENCIAS.md](PENDENCIAS.md), separando objetivos originais das campanhas realmente executadas. 0159 regressão consolidada e 0160 revisão final permanecem OPEN; não foram classificadas como bloqueadas por falta de documentação. Campanhas complementares 0161–0165 mantidas.
- **Próximas ações prioritárias:** decidir destino/frequência/retenção/custódia; produzir e restaurar cópia atual após schema 0044 em campanha autorizada; definir e medir RPO/RTO; testar recuperação de app/serviços e Android físico.

Evidências, comandos, limites e procedimentos em [REGISTROS/0158.md](REGISTROS/0158.md) e [RESUMOS/0158.md](RESUMOS/0158.md). Restaurante teve alteração local de inventário/runbook; Motoboy não foi alterado; Browser QA contém apenas runner e evidências locais. Histórico autorizado será publicado com somente os cinco documentos da campanha. Não iniciar automaticamente Campanha 0159.

## Estado atual — Campanha 0156: API e mapa Motoboy (2026-10-14)

**Resultado: PARTIAL.** A causa do p95, a divergência do plano e o mapa vazio foram investigados. A API eliminou duas consultas redundantes e mostrou uma redução em uma rodada comparável, mas a latência variou muito entre fases no Termux. O mapa agora renderiza com Leaflet, tiles locais controlados e marcador nos viewports testados.

- **API:** 10 sessões independentes em dois tenants; pool 5. Comparação pré/pós-correção, 125 Orders/tenant: p95 497,31→352,45 ms; p99 504,63→362,03 ms; 24,40→33,50 req/s; 11→9 consultas/solicitação. Outro ensaio chegou a p95 567,68 ms; não há prova de desempenho sustentado. Elevar o pool a 10 removeu a espera pelo pool, mas não melhorou o p95 em relação ao pool 5 depois do aquecimento; limite de produção manteve-se 5.
- **Plano PostgreSQL:** com 250 Orders por tenant, estimativa 1/250 antes de ANALYZE e 209/250 depois. O índice tenant/entity existente executou em ~1,3 ms. Evidência aponta estatísticas atrasadas da fixture; nenhum índice ou schema foi modificado. Operações limitadas a rotamoto_e2e.
- **Mapa:** causa era vendor/leaflet/leaflet.js ausente do HTML, embora app.js exigisse window.L. Leaflet foi incluído e o cache offline avançado para v43.45. Chromium/CDP exibiu 9 tiles SVG locais, atribuição explicitamente marcada como sintética e marcador em 1365×900 e 390×844; sem overflow ou erros JS/HTTP. GPS físico e tiles do provider real não foram testados.
- **Regressões:** npm test Restaurante e Motoboy passaram; identidade HTTP/PG, sync/RETURN, isolamento RLS (47 tabelas, 38 políticas FORCE), Browser E2E de lista/filtro/mapa desktop/mobile passaram. Fixtures rotamoto_e2e foram identificadas e retidas, sem limpeza. Banco oficial não acessado.
- **Gates:** API_PROFILING PASS; API_CONCURRENCY PARTIAL; POSTGRES_QUERY_PLAN PASS; MOTOBOY_MAP_RENDER PASS; BROWSER_E2E PASS; SECURITY_REGRESSION PASS; PERFORMANCE_COMPARISON PARTIAL.

HEAD inicial: Restaurante 4aa0a7c; Motoboy b2d2233. HEAD final local: Restaurante cc0008f6479454aa82992f9ae5587de93262c7a8; Motoboy baf00f788edf08bf7f555fc155068a4c5b24ba4f. Ambos sem push. Histórico publicado por fast-forward em origin/codex/f9-browser-e2e-0057; Browser QA permanece local. Consulte REGISTROS/0156.md, RESUMOS/0156.md e evidências em ../browser-tests/evidencias/campanhas/0156/. Não iniciar Campanha 0157.

## Registro histórico — Campanha 0154: backup e finalização 99Food (2026-10-14)

**Resultado geral: PASS. Schema oficial de desenvolvimento `rotamoto`: 0044. `READY_FOR_EXTERNAL_HOMOLOGATION = YES` para iniciar homologação técnica externa; aceite comercial não executado.** A fotografia da 0153 foi atualizada sem apagar seu diagnóstico original.

- **Backup/restore:** `BACKUP_INTEGRITY PASS`, `ISOLATED_RESTORE PASS`. O dump incompleto da 0153 continua preservado e não foi restaurado. Novo recovery set `bcc5cb76-1c66-46db-911f-5a498967de65`, SHA-256 do payload PostgreSQL `a95b5321405104bef36046c7bfbdef58e032a0d43068c74b7dcddd76f353068a`, verificação HMAC/SHA e restore isolado aprovados. A role `rotamoto_backup` não alterou privilégios operacionais. Cópia offsite/agendamento e RPO/RTO ainda não definidos.
- **Migrations oficiais:** a role migradora confirmou ledger/checksums 0001–0041, incluindo 0041 `c75063f833da16a8efdd2e8d448bf1c7c3aee7e360be8d9e1f12397d15251a9c`; aplicou somente 0042 (`ad036400035b8c03cbb92d9254d07fd8681ced0c06fcf325cb1678c06cdac160`), 0043 (`35a9f9d297d6010c0704b487d85fb735ab96db0a0c8517385c4b31936be1b189`) e 0044 (`ac5f82463dd933657f4c4d921dc4dab2684437fe5e9163bf90c8750e55c28a95`). Resultado pós-migração: 0044, sem pendências; constraints/indexes validados; RLS/FORCE e grants mínimos conferidos; `audit_log` FORCE RLS e append-only preservados.
- **99Food:** rate limiter PostgreSQL app/loja/operação validado com dois workers/sessões, concorrência entre tenants, Retry-After e recuperação pelo estado persistido. Runtime, tokens protegidos/lease, webhook, inbox/outbox, lista unificada e comandos passaram nos testes sintéticos locais. Nenhum pedido comercial ou requisição externa foi executado.
- **Evidência:** `npm test` completo Restaurante e Motoboy; `npm run test:postgres` exclusivamente em `rotamoto_e2e`; testes 99Food protocol/runtime/rate-limit; Browser Chromium/CDP desktop e 390×844 mobile. `pg_amcheck` suplementar foi bloqueado por autenticação do CLI, mas backup autenticado e restauração real passaram.
- **Pendências:** onboarding 99Food (credencial, sandbox, whitelist, certificação e aceite comercial), homologação comercial iFood/Keeta, cópia offsite/custódia separada da chave e agendamento/RPO/RTO. Nenhuma delas invalida a recuperação isolada comprovada ou prontidão técnica interna.
- **Versionamento:** Restaurante local `df82a4f724ce5566a21203464f525ad61242a5ec`; Motoboy inalterado em `ded20e37dfc9c96b472bd4e1e5d5bd2ba5b037f0`; Browser QA sem commit/push em `eb5d082e2f1aa44fe5f56a79a80c82eac1179362`. Histórico publicado em `475e49037fd053bec16588ffaf51d112651b6596` na branch autorizada.

Evidências, IDs de fixtures, comandos, checksums, limitations e classificação por gate: [REGISTROS/0154.md](REGISTROS/0154.md). Matriz atualizada: [PENDENCIAS.md](PENDENCIAS.md), seção 0154. Não iniciar Campanha 0155.

## Registro histórico — Campanha 0152: contrato e integração 99Food (2026-10-14)

**Resultado: PARTIAL.** O portal oficial foi pesquisado; um adapter local do 99Food Protocol (Recommended) valida assinatura webhook, IDs Long, envelope, subconjunto dos estados/fulfillment e operações de pedido com transporte fake. A UI descreve precisamente o estado. Runtime/persistência 99Food permanece desabilitado; não declarar homologação nem prontidão externa.

- **Fontes oficiais:** páginas próprias do portal 99Food (webhook 1981, order detail 1983, assinatura 1925, token 1929/1931, limits 1923, requirements 1889/1891), perfil 99Food no Open Delivery e docs Open Delivery V1.7.0 estável/V2.0.0-rc; URLs e diferenças em [REGISTROS/0152.md](REGISTROS/0152.md) e `repos/rota-moto-restaurante/docs/integrations/99FOOD.md`.
- **Implementado local:** parser lossless Long, assinatura de requests/webhooks, normalização inicial de Order/status/fulfillment, detalhe, confirm/ready/delivered self-delivery/cancelamento/cancel-request/refund-request. `canonicalOrder` só recebeu branch 99Food. Nenhuma Delivery/QR/motoboy é gerada.
- **Runtime bloqueado internamente:** migration 0035, runtime e worker limitam provider a iFood/Keeta; handler 99Food permanece 503. 99Food não tem config de secret/app store, route, inbox/outbox, processamento, projeção ou comandos persistentes. Não fizemos migration/DDL.
- **Protocolos:** 99Food Protocol é escolhido para o adapter. Open Delivery é outra família, com OAuth e polling/ack; não foi misturada ou ativada sem confirmar qual foi provisionada à aplicação. Perfil de aderente lista Logistics “in development”; sem quote/dispatch/tracking público comprovado.
- **Testes:** `npm test` completo Restaurante e Motoboy PASS; teste novo de protocolo, integração/adapters existentes PASS. PostgreSQL runtime e worker E2E PASS em `rotamoto_e2e` para regressões atuais; não exercitam provider 99Food. Browser Chromium/CDP PASS para lista unificada + configurações mobile 390 px, Pedido externo sem Delivery/QR.
- **Fixtures:** manifests do runtime `12e9cbc0-4c5b-414d-aedb-0087fda9a25b` e worker `77bb502c-1df0-4499-a9e5-e73e0f837c32` são `RETAINED`: há fixtures sintéticas ainda no E2E, com inventário scoped e `audit_log=0`; IDs/contagens registrados. Não houve limpeza adicional. Manifest `57cc3737-8de4-4c88-8854-0cd293d5dd51` ficou `FAILED` sem conectar/escrever após guard por falta de `NODE_ENV=test`. Browser final rollback manifest `ae7331ef-22c2-4b57-b1dc-23b234720160` `COMPLETED`; falhas intermediárias preservadas.
- **Gates externos:** app credentials, store binding, seleção de protocolo, sandbox, whitelist/certificação e homologação 99Food permanecem **BLOCKED_EXTERNAL**. Nenhuma chamada real foi feita. iFood/Keeta também não foram homologados nesta campanha.
- **Publicação:** Restaurante `3be7e4940a79374fe19166216ec747626cbe1dbc` local, sem push; Motoboy sem commit; Browser QA HEAD `eb5d082e2f1aa44fe5f56a79a80c82eac1179362`, sem commit/push. Histórico publicado somente em `codex/f9-browser-e2e-0057`; SHA final registrado no resumo/índice.

`rotamoto` não foi acessado; nenhuma migration, DDL, deploy ou chamada comercial foi realizada. **READY_FOR_EXTERNAL_HOMOLOGATION: NO.** Pendências da trilha estão em [PENDENCIAS.md](PENDENCIAS.md), seção 0152; não iniciar Campanha 0153.

## Registro histórico — Campanha 0151: auditoria de segurança Full Stack (2026-10-14)

**Resultado: PARTIAL.** Nenhuma vulnerabilidade atual foi confirmada nos cenários exercitados. Testes unitários completos, SCA, PostgreSQL E2E e Browser E2E passaram nos escopos declarados; SAST dedicado não está instalado e inventário global de fixtures antigas permanece bloqueado por ACL.

- **PASS — unitários/regressões:** `npm test` completo em Restaurante e Motoboy; ambos exit code 0.
- **PASS — SCA:** `npm audit` Restaurante e Motoboy reportaram zero advisories conhecidos para os lockfiles consultados.
- **PASS — PostgreSQL E2E:** somente `rotamoto_e2e`: tenant isolation 46 tabelas/37 FORCE policies; isolamento de mídia; lifecycle rollback; guards e fixture manifest; least privilege de `secret_ref` e ACL do worker.
- **PASS — Browser/CDP:** E2E bilateral autenticado em 390×844; sessão inválida/anônima 401, CSRF 403, tentativa de B em RETURN conhecida de A 404 sem dados/mutação, confirmação concorrente/replay com evento único e recuperação após 503. Manifesto final `c5bffbe9-e749-45d3-969b-6ebb273e6436` (`campaign=0151`, `RETAINED`); evidência `browser-tests/evidencias/campanhas/0151/security-fullstack-04/`. Uma execução aprovada anterior ficou `unassigned` e também foi retida.
- **RESOLVED histórico — privilégio de segredo:** o alerta antigo `logistics_providers.secret_ref` foi mitigado pela migration 0019; o teste atual no E2E confirmou que runtime não lê nem altera `secret_ref`. Banco oficial não consultado.
- **PARTIAL — SAST e inventário:** revisão de padrões manual; sem semgrep/trivy/eslint. Inventário global e resíduos antigos sem IDs não verificáveis; nenhuma limpeza ocorreu e fixtures independentes permanecem retidas.
- **PARTIAL/BLOCKED de capacidade:** iFood/Keeta aguardam homologação oficial; 99Food aguarda contrato/onboarding; hardware físico e auditoria WCAG completa não foram exercitados.
- **DEFERRED para prontidão:** mídia/backup operacional, TLS/SMTP/host, RPO/RTO, multi-instância e settlement/analytics dependem de decisões/infraestrutura futuras e não bloqueiam desenvolvimento local.
- **Pendências:** [PENDENCIAS.md](PENDENCIAS.md), seção 0151, 20 itens: RESOLVED 8, PARTIAL 5, BLOCKED 3, DEFERRED 4.
- **Versões:** Restaurante `7c13ba5b2d0de745b486cd274770862bf6962488`; Motoboy `ded20e37dfc9c96b472bd4e1e5d5bd2ba5b037f0`; Browser QA HEAD `eb5d082e2f1aa44fe5f56a79a80c82eac1179362`, sem commit/push. Histórico será publicado somente em `codex/f9-browser-e2e-0057`.

O banco oficial `rotamoto` não foi acessado; migration 0041 continua **APPLIED conforme documentação da Campanha 0140**, sem revalidação nesta campanha. Nenhuma migration, DDL, deploy, chamada comercial ou limpeza de fixture foi executada. Detalhes: [REGISTROS/0151.md](REGISTROS/0151.md). Não iniciar Campanha 0152.

## Registro histórico — Campanha 0150: gerenciamento seguro de fixtures E2E (2026-10-14)

**Resultado: PARTIAL.** O lifecycle PostgreSQL E2E do Restaurante agora cria manifestos atômicos antes da conexão, registra tenants/usuários/sessões e entidades conhecidas sem segredos, separa IDs registrados de snapshots de banco, e inventaria somente tenants conhecidos com consultas `READ ONLY` sob RLS. `COMPLETED` só ocorre depois da verificação de rollback; commits de sessões independentes ficam `RETAINED`. O helper não apaga fixture commitada nem `audit_log`.

- **PASS — rollback/atomicidade:** suíte unitária e E2E de sessão única comprovaram fechamento normal e zero resíduo no tenant exclusivo. Guard de banco/role/host permaneceu ativo.
- **PASS — falha e recuperação:** falha pré-commit confirmou contagens zero. Processo filho encerrado abruptamente pós-commit foi marcado `INTERRUPTED`; uma retomada `inventory-only` consultou o tenant explicitamente e terminou `RETAINED`, com audit rows preservadas. Replay de recuperação não reaplica operações.
- **PASS — execução Browser multiempresa:** manifestou dois tenants antes do commit independente. A consulta scoped encontrou no tenant A 17 domain, 16 inbox, 29 outbox e 38 audit; B tinha zero nesses conjuntos. Evidência: `browser-tests/evidencias/campanhas/0149/tenant-security-f65424d5-f588-4046-8c80-0fd2bba8f0f8/` e run `bb8e0b27-2fe2-48c9-9817-1b17bb014498`.
- **PARTIAL — resíduos 0148–0149:** IDs preservados do Browser 0149 foram consultados; registros 0148 sem company ID e tentativas antigas sem IDs completos seguem não verificáveis. Nenhuma limpeza foi feita.
- **BLOCKED — inventário global:** `rotamoto_auditor` tem pgpass local, mas o catálogo em `rotamoto_e2e` mostra `CONNECT=false` e nenhuma permissão `SELECT`; `rotamoto_migrator` não tem `BYPASSRLS`. Não ampliamos privilégios nem inferimos banco vazio.
- **Versionamento:** Restaurante `7c13ba5b2d0de745b486cd274770862bf6962488` (commits locais `2d01894` e `7c13ba5`), sem push; Motoboy sem alteração; Browser QA sem push, artefatos anteriores preservados; histórico publica somente nesta branch autorizada.

`rotamoto` não foi acessado; não houve migration, DDL, deploy ou cleanup. O detalhe e os IDs de execução estão em [REGISTROS/0150.md](REGISTROS/0150.md) e [RESUMOS/0150.md](RESUMOS/0150.md). Próximo foco sugerido: obter processo de leitura tenant-aware aprovado e avaliar resíduos antigos por dry-run. Não iniciar Campanha 0151.

## Registro histórico — Campanha 0149: segurança multiempresa e fixtures E2E (2026-10-14)

**Resultado: PARTIAL.** Nos caminhos exercitados, não foi encontrada falha de isolamento. Testes HTTP com A/B e Browser/CDP negaram leitura, confirmação e replay de RETURN por tenant B com UUID conhecido de A; retorno 404 sem dados, e estado/rota/eventos de A não mudaram. Uma corrida com sessões PostgreSQL independentes confirmou o 404 de B enquanto A executava recebimento autorizado. CSRF ausente/inválido: 403; sessão inválida/anônima: 401; ausência de `orders.manage`: 403. RLS/FORCE (46 tabelas/37 políticas) passou.

- **PASS — Browser bilateral:** Restaurante e Motoboy autenticados convergiram após recebimento; duplicação/retry pós-503 gerou um único evento, sem DeliveryProof fictício e sem overflow em 390 px.
- **PASS — fixtures rollback:** lifecycle de transação/savepoint passou e não deixou os registros da execução.
- **PARTIAL — inventário global:** Browser com sessões independentes requer commit e retenção para concorrência. Fixture identificada A: 17 registros, 29 outbox, 37 auditorias; B: 0 registros/outbox/audit. `audit_log` permanece append-only. Uma primeira tentativa interrompida pode ter deixado fixture adicional não enumerável; runtime/migrator aplicam RLS e não há credencial do role auditor. Nenhuma limpeza foi feita.
- **Versionamento:** Restaurante `5836cce5a109aec6b4329ddab2bf6fb0ad531962` (teste, local sem push); Motoboy sem alteração; Browser QA só acrescentou runner/evidências locais. Histórico publica somente na branch autorizada.
- `rotamoto` não foi consultado; 0041 permanece **APPLIED conforme documentação da 0140**. Nenhuma migration, DDL, deploy ou operação comercial.

Ver [REGISTROS/0149.md](REGISTROS/0149.md) e [RESUMOS/0149.md](RESUMOS/0149.md). Próximo passo: auditoria global somente após credencial/consulta de leitura tenant-aware autorizada e identificação da tentativa parcial. Não iniciar Campanha 0150.

## Registro histórico — Campanha 0148: recebimento de devoluções (2026-10-14)

**Resultado: PARTIAL.** O Motoboy registra entrega física sem encerrar custódia; a RETURN permanece `ARRIVED/AWAITING_RESTAURANT_RECEIPT`. O Restaurante agora identifica devoluções externas pendentes e mostra a ação autorizada de recebimento. Após confirmação, RETURN fica `RETURNED/RECEIVED`, custódia da entrega original fecha, a rota remove somente a RETURN e o Motoboy sincroniza “Devolução confirmada”.

- **PASS — ciclo e rota:** Browser/CDP e PostgreSQL E2E preservaram as duas paradas existentes, colocaram RETURN por último e encerraram apenas essa tarefa após confirmação Restaurante.
- **PASS — concorrência e resposta incerta:** duas sessões PostgreSQL concorrentes produziram uma mutação + um ACK idempotente. O proxy devolveu HTTP 503 após upstream commit; retry do Restaurante respondeu 200 sem novo `DELIVERY_RETURN_RECEIPT_CONFIRMED`.
- **PASS — autorização e regressões:** usuário sem `orders.manage` foi negado com 403; suites de tenant RLS geral e regressões dos dois aplicativos passaram. Não foi executado teste HTTP de confirmação por tenant diferente.
- **PASS — UI mobile:** Browser validou os dois aplicativos em 390×844, botão pendente do Restaurante, estado pendente do Motoboy e confirmação sincronizada; sem overflow horizontal. Não há assinatura/DeliveryProof inventada.
- **PARTIAL — retenção E2E:** o modo de sessões independentes commita fixture sintética no isolado `rotamoto_e2e`; seus audit entries são append-only e não são apagados. Uma tentativa anterior à correção da UI terminou sem confirmação e o teardown foi bloqueado pelo mesmo guard append-only; as evidências foram preservadas.
- **NOT RUN — físico/produção:** entrega real, rádio/suspensão Android e provider comercial não foram testados. `rotamoto` não foi acessado, migration/deploy não ocorreram; 0041 continua **APPLIED conforme documentação da 0140**, sem reconferência do ledger.
- **Versionamento:** Restaurante `d7f5609eb53521b24b565dd2143a15b95d34e91d`, local sem push; Motoboy sem alteração (`ded20e37dfc9c96b472bd4e1e5d5bd2ba5b037f0`); Browser QA branch/HEAD preservados com runner/evidência local; histórico publicará somente a branch autorizada.

Evidência final: `browser-tests/evidencias/campanhas/0148/return-receipt-ddb0af0d-98ad-447e-821e-f74da10b46c0/`. Ver [REGISTROS/0148.md](REGISTROS/0148.md). Próximo item: teste HTTP explícito de tenant incorreto; validação física fica condicionada a aparelho/processo assistido. Não iniciar Campanha 0149.

## Registro histórico — Campanha 0147: cancelamentos e devoluções (2026-10-13)

**Resultado: PARTIAL.** Os cenários locais de cancelamento, custódia, rota e sincronização passaram em testes unitários, PostgreSQL E2E e Chromium/CDP. Cancelar Delivery própria após coleta cria um único RETURN na mesma transação, mantém o motorista custodiante e acrescenta a devolução depois das demais paradas; cancelamentos antes da coleta não criam RETURN. Cancelamento comercial externo sem Delivery própria não fabrica Delivery, QR, atribuição ou devolução. Restaurante e Motoboy apresentam estados distintos; Motoboy executou o ciclo e ficou `ARRIVED`/`AWAITING_RESTAURANT_RECEIPT`, sem comprovante fictício.

Browser injetou um HTTP 503 no sync e observou retry com resposta 200; mobile 390×844 não teve overflow horizontal. Adapters/credenciais de iFood e Keeta reais, offline físico e confirmação física pelo Restaurante não foram exercitados. Não houve acesso ao banco `rotamoto`, migration, DDL ou deploy; 0041 continua documentada como **APPLIED** em [REGISTROS/0140.md](REGISTROS/0140.md). Ver [REGISTROS/0147.md](REGISTROS/0147.md). Não iniciar Campanha 0148.

## Registro histórico — Campanha 0146: resiliência e concorrência (2026-10-13)

**Resultado geral: PARTIAL.** Foi corrigido um defeito de sync no restart: a normalização inicial do Restaurante usava `put()` e podia transformar registros canônicos do servidor em alterações locais, reabrindo a publicação de Orders já sincronizadas. O bootstrap agora preserva origem, versão e estado canônico. Browser comprovou zero replay de Orders canônicas após reload.

- **PASS — workers concorrentes:** dois pools/sessões PostgreSQL independentes no E2E disputaram um comando; somente um worker obteve claim e invocou o adapter sintético. Resultado processado uma vez.
- **PASS — queda e resultado incerto:** worker filho foi encerrado com `SIGKILL` durante efeito sintético; após lease expirar, comando continuou `unknown_outcome`, `attempts=1`, sem retry cego. Fencing de worker obsoleto foi exercitado.
- **PASS — eventos concorrentes:** replay concorrente manteve uma linha inbox e uma consulta de detalhe; evento atrasado concorrente não substituiu o estado mais recente protegido por lock por Order.
- **PASS — outbox/restart:** Browser/CDP em `rotamoto_e2e` manteve packet local após offline simulado, dois 503 e reload; ACK removeu a fila e permaneceu uma Order local. Order externa continuou única, sem Delivery/QR indevidos.
- **PASS — regressões e isolamento:** `npm test` Restaurante/Motoboy; testes worker/runtime/logística PostgreSQL, concorrência/RETURN e tenant RLS passaram usando somente `rotamoto_e2e`.
- **PARTIAL — rede física:** offline do Browser, HTTP 503 e `SIGKILL` de processo Node são falhas controladas; rádio Android, suspensão/força-parada do app e reconexão física não foram testados.
- **BLOCKED — homologação externa:** nenhum iFood, Keeta ou 99Food comercial foi chamado. Suítes usam adapter sintético e não demonstram comportamento do provider.
- **Banco:** `rotamoto` não foi acessado nem modificado; nenhuma migration foi executada. 0041 segue **APPLIED** pela evidência de [REGISTROS/0140.md](REGISTROS/0140.md), sem revalidar ledger nesta campanha.
- **Versionamento:** Restaurante `580016e63dea151d8ec52a8e38e12a545c69a48d`, commit local sem push; Motoboy sem alterações (`6cce24d71fb7bcfb8777cbc6c89c4a76278eb2e2`); Browser QA branch/HEAD preservados, runner e evidências locais sem push. Histórico será publicado somente na branch autorizada.

Evidência Browser: `browser-tests/evidencias/campanhas/0146/worker-outbox-recovery-6c2871cc-98f0-4a97-8597-5326390e73d7/`. Ver [REGISTROS/0146.md](REGISTROS/0146.md). Próximas prioridades: Android com rede/suspensão reais; matriz documentada de cancelamento antes/depois da coleta; homologação provider quando autorizada. Não iniciar Campanha 0147.

## Registro histórico — Campanha 0145: robustez dos pedidos externos (2026-10-13)

**Resultado: PARTIAL.** Corrigidos dois defeitos comprovados: eventos externos empatados no timestamp não substituem arbitrariamente a projeção; Orders externos com fulfillment desconhecido não geram Delivery/QR local. A auditoria corrige uma lacuna na evidência da 0144: seu runner consultava QR sem escopar a linha e não detectou o botão de QR indevido.

- **PASS — ordenação testada:** evento sintético mais antigo ou empatado não reverte `PLACED`; cancelamento iFood estritamente mais novo é projetado e publicado uma vez na outbox. Não existe sequência monotônica provider-neutral comprovada para desempate; empate permanece sem promoção automática.
- **PASS — separação comercial/operacional:** canonicalização e sync deixam Order externo separado de Delivery enquanto o fulfillment for desconhecido; QR exige Delivery local e `fulfillment: merchant`. Orders próprios continuam com a projeção habitual. Browser confirmou zero Delivery associada no IndexedDB, nenhuma ação de QR no Order externo e duas Orders (própria + iFood) na lista.
- **PASS — recuperação sintética:** Browser/CDP manteve a lista offline; reconexão/replay preservou duas linhas; 503 único injetado em `/api/sync/pull` foi recuperado sem duplicação. Mobile 390 px: overflow 0. Isso não representa rádio/suspensão Android nem reenvio Browser de uma nova mutação local pendente.
- **PASS — suites:** `npm test` nos dois apps; Marketplace runtime PostgreSQL em `rotamoto_e2e`; logística PostgreSQL rollback; tenant RLS; Browser E2E final. RETURN/custódia permaneceu coberto pelas regressões unitárias existentes, sem repetir o fluxo bilateral completo nesta campanha.
- **BLOCKED — worker PostgreSQL:** `test:marketplace-worker-postgres` recusado antes da conexão por falta de `E2E_PROVIDER_WORKER_DATABASE_URL` dedicada. Nenhum fallback foi usado.
- **OPEN / P1 — concorrência:** dois workers/sessões com eventos fora de ordem e crash/restart durante processamento precisam de E2E concorrente; o teste de ordenação 0145 foi sequencial. A projeção segue protegida por `FOR UPDATE`.
- **OPEN / P1 — cancelamento externo:** testar cancelamentos iFood/Keeta antes e depois da coleta com estados e transições documentados, distinguindo fulfillment da plataforma e entrega própria; não houve homologação comercial.
- **PARTIAL / P1 — sync offline:** retry e retenção da lista remota passaram; retransmissão Browser de uma alteração local pendente após offline/503 e reinício continua sem prova nesta campanha.
- **Limite externo:** iFood/Keeta não foram chamados em sandbox comercial; 99Food permanece bloqueada por contrato/onboarding/credenciais, conforme 0144.
- **Banco:** `rotamoto` não foi acessado/modificado; nenhuma migration foi executada. Migration 0041 continua **APPLIED** segundo evidência documentada em [REGISTROS/0140.md](REGISTROS/0140.md), não reconferida em 0145. Escritas E2E foram restritas a fixtures transacionais em `rotamoto_e2e`.
- **Versionamento:** Restaurante branch `codex/setup-workflow`, commit local `7cb1d8a94ee2258185060b75479d2da109ab620b`, sem push; Motoboy sem alteração; Browser QA somente runner/evidência local, sem commit/push. Histórico publica esta consolidação somente na `codex/f9-browser-e2e-0057`.

Evidência Browser: `browser-tests/evidencias/campanhas/0145/external-order-resilience-3267787e-e63a-4dee-9e76-b775476a127e/`. Detalhes, limitações e sequência em [REGISTROS/0145.md](REGISTROS/0145.md) e [RESUMOS/0145.md](RESUMOS/0145.md). Não iniciar Campanha 0146.

## Registro histórico — Campanha 0144: pedidos unificados e integrações (2026-10-13)

**Resultado geral: PARTIAL.** A lacuna funcional da Campanha 0143 foi corrigida: Orders externos iFood/Keeta são publicados na outbox canônica e sincronizados à lista principal do Restaurante. Browser E2E autenticado em `rotamoto_e2e` confirmou um pedido próprio e um externo na mesma lista, origem/status visíveis e replay sem duplicação. Fulfillment desconhecido não cria Delivery/QR nem atribui motoboy. Ajustes passaram em 390 px sem overflow.

- **RESOLVED no escopo:** publicação transacional/idempotente da Order; reconciliação local por ID canônico ou identidade provider + externalId; proteção tenant/PII; estado externo e interno exibidos separadamente.
- **RESOLVED no escopo:** interface distingue origem local, conexões/diagnóstico, parceiros logísticos/entrega própria e simulações do Laboratório.
- **BLOCKED / P1 — 99Food real:** o portal público documenta capacidades gerais de pedidos, webhooks e sandbox, mas contrato técnico e credenciais dependem de onboarding/certificação; nenhum endpoint ou payload foi presumido.
- **OPEN / P2 — homologação iFood/Keeta:** validar cancelamentos, eventos fora de ordem e fulfillment real em sandboxes autorizados.
- **Testes:** `npm test` Restaurante; runtime/worker PostgreSQL Marketplace com roles configuradas; tenant RLS E2E; Browser Chromium/CDP; `git diff --check`: PASS. Motoboy permaneceu limpo.
- **Ambiente:** somente `rotamoto_e2e` recebeu fixtures transacionais. PostgreSQL oficial `rotamoto`, migrations e deploy não foram usados.
- **Versionamento:** Restaurante commit local `fe67448f5f92ac5bffaed2158a30c5e966b3cb67`, sem push; Motoboy sem alterações; Browser QA com runner/evidências locais sem commit; histórico limitado aos documentos desta campanha e push autorizado.

Ver [REGISTROS/0144.md](REGISTROS/0144.md) e [RESUMOS/0144.md](RESUMOS/0144.md). Próximo trabalho sugerido: onboarding/homologação 99Food quando houver acesso oficial, sem iniciar 0145.

## Histórico — Gestão unificada de pedidos — Campanha 0143 (2026-10-13)

- **Resultado PARTIAL.** RotaMoto não é um marketplace comercial: Order próprio é local-first; iFood/Keeta usam adapters, inbox/outbox de comandos, canonical Order e a área Integrações; 99Food segue bloqueada sem contrato/API e onboarding oficial.
- **Lacuna aberta P1:** `marketplace-runtime` grava e projeta Orders externos e a UI admin os mostra em “Pedidos de marketplace”, mas o runtime não publica evento na `sync_outbox`; a lista local principal depende de sync e não foi integrada. Não há criação de Delivery na ingestão. A próxima correção precisa preservar decisão/estado da plataforma e separar fulfillment próprio de fulfillment da plataforma, evitando persistir PII desnecessária ou atribuir motorista automaticamente.
- **Cobertura:** testes unitários do handler administrativo, Marketplace e worker sintético passaram; runtime PostgreSQL E2E confirmou projeção/idempotência/tenant e listOrders; Browser autenticado com handler real e iFood/Keeta fake renderizou ambos e enviou CONFIRM. Worker PostgreSQL não executou por ausência das URLs autenticadas dedicadas do resolver/worker; bloqueado antes de conexão.
- `npm test` Restaurante e Motoboy, `npm run check`, E2E guards e `git diff --check` passaram. E2E escreveu somente em `rotamoto_e2e` com fixture sintética; official `rotamoto` não foi acessado ou alterado. Migration 0041 permanece APPLIED conforme REGISTROS/0140; esta execução não revalidou o ledger oficial.
- **Versionamento:** Restaurante commit local `84491a67a0795678df68a3121368ddfb7eb1b6eb`, branch `codex/setup-workflow`, sem push; Motoboy inalterado; Browser QA recebeu runner/evidências locais sem commit; histórico publicou a presente consolidação somente na `codex/f9-browser-e2e-0057` (SHA confirmado na entrega).
- Próxima campanha recomendada: publicar Orders externos pela outbox/sync e exibi-los sem duplicação na lista principal, decidir compatibilidade de entrega própria por provider e manter plataforma delivery independente; depois homologar integrações com sandbox autorizado. Requisitos TLS/SMTP/RPO/RTO/infra de produção seguem fora do bloqueio de desenvolvimento. Não iniciar campanha seguinte.

## Auditoria funcional integrada — Campanha 0142 (2026-10-13)

- **Resultado PARTIAL; defeitos funcionais confirmados: 0.** Suites completas dos dois aplicativos, paridade contratual, tenant/RLS, autenticação/MFA, logística, mídia e concorrência E2E passaram. Browser autenticado percorreu pedido/entrega, despacho, rota, aceite/coleta/saída, cancelamento após coleta, RETURN, transporte 503, retry, handover e recebimento bilateral.
- A entrega original terminou `CANCELLED` com custódia `RECEIVED`; o RETURN terminou `RETURNED`/`RECEIVED`, com dez fatos, uma única devolução e outbox sem pendências após retry. Tenant distinto recebeu 404 para as consultas de custódia/receipt. Evidência: `browser-tests/evidencias/campanhas/0142/return-browser-attempt-01/return-flow-report.json` e `trace.jsonl`.
- 503 foi injetado deliberadamente; o runner terminou exit 0/Chromium exit 0. `npm test` dos dois apps, `test:e2e-tenant-isolation`, `test:e2e-lifecycle`, `test:e2e-proof-media-tenant`, `test:availability-concurrency-e2e` e `test-logistics-e2e-postgres.js` passaram. Uma primeira chamada logística sem URL E2E foi recusada pelo guard antes de conexão; a chamada corrigida usou somente `rotamoto_e2e` e rollback.
- `rotamoto` não foi conectado nem alterado. O alvo E2E foi verificado read-only antes/depois: `rotamoto_e2e`, role `rotamoto_migrator`, ledger até 0041 e checksum esperado. Os testes de concorrência criaram schema sandbox temporário e reportaram sua remoção. Um schema histórico `campaign0112_...` estava presente no snapshot final; sem snapshot inicial não se pode atribuir origem, então foi preservado sem inspeção de conteúdo nem alteração.
- O Browser mostrou 404 para `/api/admin/marketplace/orders` porque o fixture da campanha não registrou o handler Marketplace; o `server.js` real registra `createMarketplaceAdminHandler`. Houve também 403 de disponibilidade na sessão do proprietário sem vínculo Driver. Não são defeitos confirmados; são contexto/limite do harness. Não houve exceções de runtime, erros de console ou falha de screenshot no relatório.
- **Pendências de desenvolvimento:** fechar cobertura Browser do painel Marketplace com handler/adapter fake; validar sincronização sob perda real de conectividade em Android; validar GPS/câmera/QR fisicamente; settlement depende de decisão de produto. Não bloqueiam desenvolvimento local: TLS público, SMTP comercial, RPO/RTO e deployment/backup definitivos, que são exigências futuras de produção.
- Apps sem mudanças: Restaurante HEAD `968673e6a90a98591eef7cd735a35bdb52479819` (já estava um commit local à frente do origin); Motoboy HEAD `6cce24d71fb7bcfb8777cbc6c89c4a76278eb2e2`. Browser QA HEAD `eb5d082e2f1aa44fe5f56a79a80c82eac1179362`; evidências anteriores preservadas e novo diretório 0142 criado sem commit. PostgreSQL oficial, contratos, tags, baselines e `main` não foram alterados.
- Próxima proposta: **0143 — completar cobertura Browser das integrações Marketplace com handler real e adapter fake; cobrir estados do painel e falhas/retry sem credenciais externas.** Não iniciada.

## Estado consolidado — Campanha 0141 (2026-10-13)

- **Banco oficial `rotamoto`:** migration `0041_delivery_custody_return` está **APPLIED**, ledger 0001–0041, checksum `c75063f833da16a8efdd2e8d448bf1c7c3aee7e360be8d9e1f12397d15251a9c`. Esta campanha apenas conferiu os registros existentes; não conectou nem alterou PostgreSQL.
- **Aplicativos:** fluxos RETURN/sync/dispatch e isolamento tenant têm evidências E2E posteriores válidas. A exposição histórica de `secret_ref` foi corrigida na 0019 e checada em 0079. Não foi comprovado defeito crítico atual, mas esta auditoria documental não é pentest.
- **Prontidão operacional:** produção permanece NÃO APROVADA. Integrações reais (iFood/99Food/Keeta), deployment smoke, backup+restore recorrente de banco e mídia, política/custódia de chave e RPO/RTO aguardam ambiente e responsáveis. Bootstrap de operador/email/MFA também carece de prova operacional.
- **UI e hardware:** componentes corrigidos em 0140 passaram nos escopos capturados; revisão global de UI/WCAG continua parcial. GPS/mapa básico foi confirmado, mas localização real ligada a sessão/rota/pins não foi completamente validada. QR por câmera física continua sem prova em Android.
- **Funcionalidade:** settlement/liquidação financeira segue fora da capacidade implementada e exige decisão de produto; Earning não significa pagamento.
- Matriz vigente e classificação com evidências/dependências: [PENDENCIAS.md](PENDENCIAS.md). Resultado: 4 RESOLVED, 4 PARTIAL, 1 OPEN, 5 BLOCKED (14 itens consolidados).
- Nenhum teste foi executado nesta campanha; somente documentos, código/testes existentes e evidências registradas foram examinados. Apps, contratos, Browser QA, PostgreSQL, `main`, tags e baselines permaneceram intocados.
- Próxima sequência recomendada: 0142 deployment/backup/identidade operacional (gates de ambiente), 0143 homologação das integrações externas, 0144 validação física Android (GPS/QR) e acessibilidade/UI completa, 0145 decisão de settlement se priorizada. A ordem é proposta, não campanha iniciada.

## Atualização — reconciliação da Campanha 0140 / migration oficial 0041 (2026-10-13)

- O estado BLOCKED descrito no preflight de 0140 era válido naquele instante e permanece no registro como evidência histórica. Depois, os gates foram satisfeitos e a migration `0041_delivery_custody_return` foi aplicada ao oficial `rotamoto` via runner transacional; checksum `c75063f833da16a8efdd2e8d448bf1c7c3aee7e360be8d9e1f12397d15251a9c`, ledger final 0001–0041.
- `dfff2a7c41ec53024463a14dc365b193af807619` foi criado e publicado em `rota-moto-restaurante`/`codex/setup-workflow`, onde adicionou dois arquivos homônimos. O histórico já possuía ambos; a correção integrou os fatos à branch autorizada `codex/f9-browser-e2e-0057` sem substituir o conteúdo anterior nem alterar o commit do aplicativo.
- Contagens pré-migração foram feitas por role com `BYPASSRLS`; zero dados operacionais, proofs, upload intents e mídia. Recovery set atual verificado; validação de constraints, índice, RLS/FORCE e grants passou. Testes pertinentes passaram com E2E em `rotamoto_e2e`.
- Nesta atualização documental não houve operação PostgreSQL, alteração em apps, `main`, tags, baselines, Browser QA ou Campanha 0141. O parecer geral 0140 continua PARCIAL pelas pendências visuais/funcionais.
- Fonte de detalhe: [REGISTROS/0140.md](REGISTROS/0140.md) e [RESUMOS/0140.md](RESUMOS/0140.md).

## Atualização — Campanha 0135 — despacho e convergência (2026-10-10)

- Browser autenticado comprovou cadastro/edição/vínculo de Driver, presença com confirmação, modo manual padrão e opt-in automático. Repetição idempotente criou uma só Delivery; Tenant B recebeu 404 ao buscar Driver de A.
- Achado corrigido: evento de Delivery `ASSIGNED` na revisão 1 era descartado pela IndexedDB Restaurante como mesma revisão, embora o ACK atual confirmasse essa entidade. Reconciliador aplica tal evento apenas com ACK canônico correspondente; browser agora converge Restaurante, PostgreSQL e Motoboy.
- PostgreSQL E2E comprovou FIFO, elegibilidade, lease, interleavings offline, alocação concorrente distinta, retry e isolamento. RETURN offline com receipt bilateral encerrou Chromium exit 0. DeliveryProof/restart/retry passou.
- `npm test` dos dois apps e logistics/tenant-RLS/lifecycle passaram. Oficial `rotamoto` não foi conectado; migration oficial 0040 preservada. E2E 0040/0041, nenhuma migration nova. Security parity contra oficial BLOCKED sem URL read-only autorizada.
- Commits locais Restaurante `fbbb392`, Browser QA `d83d117`, Motoboy sem alteração. Nenhum app foi enviado. Ver [Registro 0135](REGISTROS/0135.md).

## Atualização — Registro 0134 — divergência RLS resolvida (2026-10-10)

- Causa da divergência: a asserção de 0133 filtrava somente `record_id`, embora a chave canônica de `domain_records` seja `(company_id, record_id)`, e interpretava qualquer `rowCount=1` como vazamento. O E2E reproduziu ID compartilhado tenant-scoped: B viu seu próprio `Driver`, não o `DeliveryProof` de A; a query exata de A sob B retornou zero.
- Três execuções independentes com `rotamoto_app` e `rotamoto_provider_worker` passaram; B não lê, altera, insere nem apaga dados de A. `rotamoto_provider_resolver` não tem grants de leitura dessas tabelas. Troca A→B, pool, Browser HTTP e `proof_media_upload_intents` passaram.
- RLS/ FORCE ativos em `domain_records` e `proof_media_upload_intents`; role operacional sem superuser/BYPASSRLS. Sem alteração de política ou código de produção.
- `npm test` ambos, tenant isolation, lifecycle, domain sync e contract parity: PASS. Oficial não conectado; paridade bloqueada sem URL read-only. E2E permanece em 0040/0041, sem migrations.
- Commits: Browser `0e0a164`, `1ce5657`; apps sem alteração. Ver [REGISTROS/0134.md](REGISTROS/0134.md).

## Atualização — Registro 0133 — segurança de mídia e regressões (2026-10-10)

- Browser/CDP comprovou mídia autenticada em `rotamoto_e2e`: hash idêntico, retry após falhas, reinício persistente, leitura do Restaurante e reenvio idempotente. Tenant A teve HTTP 200; visitante anônimo, Tenant B, IDs manipulados e usuário sem permissão tiveram 401/404/403 sem bytes.
- RETURN offline, handover e recebimento bilateral convergiram; `attempt-clean-02` registrou Chromium exit 0. O runner agora fecha página/targets via CDP e aguarda o processo.
- Uma nova asserção direta de RLS do registro de mídia divergiu e viu uma linha em contexto B; a tentativa anterior e a suite independente geral RLS passaram. Gate específico PARTIAL/ALTO até reprodução diagnóstica.
- `npm test` ambos, Browser 0120/0121/0122, tenant RLS, lifecycle, domain sync e guards passaram. Oficial `rotamoto` não conectado por falta de URL read-only; E2E 0040/0041 sem migrations.
- Commits locais Restaurante `18f4511`, Browser `f5700d0`, Motoboy sem mudança. Sem código de produção, deploy ou alteração de baseline. Ver [REGISTROS/0133.md](REGISTROS/0133.md).

## Atualização — Registro 0132 — comprovantes e media storage (2026-10-10)

- Corrigida persistência de `DeliveryProof` no comando do Motoboy e dependência entre ACK dos metadados e persistência do binário; mídia só vira canônica após `storageRef` confirmado.
- Browser Chromium/IndexedDB real comprovou 429, restart no mesmo perfil, retomada HTTP 201, GET autenticado no Restaurante, hash idêntico e reenvio idempotente; 503, malformado, desconexão, timeout, offline e limites de mídia preservaram a cópia local.
- RETURN Browser E2E registrou reorganização, handover offline e confirmação bilateral em PostgreSQL/IndexedDB; o relatório final foi criado sem falhas de browser, mas o runner ficou preso no teardown e foi interrompido, portanto este subgate permanece PARTIAL.
- `npm test` ambos, lifecycle/media PostgreSQL E2E, domain sync, tenant RLS, Browser offline/cancelamento e verificações de sintaxe passaram.
- Oficial `rotamoto` não acessado; migration 0040 preservada. E2E `rotamoto_e2e` usa 0041. Nenhuma migration/deploy/publicação.
- Paridade que exige URL read-only oficial BLOCKED; cross-login Browser tenant e storage no ambiente de produção continuam pendentes. Estado geral PARTIAL; ver [Registro 0132](REGISTROS/0132.md).

## Atualização — Registro 0131 — painel de presença responsivo (2026-10-10)

- Corrigida a causa do texto comprimido no Motoboy: painel passou a separar status/ajuda das ações e a ocupar a largura do dashboard desktop.
- Browser autenticado verificou 360/390/768/1366 px em quatro estados, check-in → confirmação Restaurante/PG → saída, QR scanner e foco por teclado; sem overflow, overlap ou erro JS.
- `npm test`, guards de apresentação, cross-app parity e concorrência/presença PostgreSQL E2E passaram. Scanner abriu; câmera/leitura física não testada.
- Motoboy `53eb436`; sem alteração Restaurante, `main`, tag ou baseline. Oficial read-only 0040; E2E 0041; sem migration ou deploy.
- Ver matriz, imagens e limitações em [REGISTROS/0131.md](REGISTROS/0131.md).

## Atualização — Registro 0130 — auditoria funcional e integração (2026-10-10)

- Resultado global PARTIAL. Fluxos Order/Delivery/Route/RETURN, sync, identidade/tenant e RLS passaram na cobertura nova; apps tecnicamente consistentes nos fluxos testados.
- Achado visual MÉDIO reproduzido no Motoboy: painel de presença comprime texto de status/ajuda em 768 px e desktop. Sem alteração automática de código; causa e screenshots em [REGISTROS/0130.md](REGISTROS/0130.md).
- Evidências Browser 0130: outbox/viewport, RETURN bilateral e regressões 0120/0121/0122. `npm test` nos dois apps e PostgreSQL E2E/RLS/security passaram.
- Oficial `rotamoto` somente leitura em 0040; `rotamoto_e2e` em 0041. Sem migration, deploy ou publicação de app; não declarado production-ready.
- Commits: Browser QA `eb12fea`; Restaurante `95b85ae` e Motoboy `1f66ae0` sem alteração. Histórico será publicado apenas por fast-forward na branch autorizada.

## Atualização — Registro 0129 — outbox durável validada (2026-10-10)

- ACKs inválidos via HTTP real mantiveram operações e pacote na IndexedDB dos dois apps; Chromium foi encerrado/reaberto com o mesmo perfil e pacote reenvia com o mesmo packetId.
- ACK completo permitiu recuperação idempotente sem inbox/eventos duplicados. Route reordenada e edição concorrente convergiram; Motoboy passou a serializar eventos offline com expectedVersion.
- Browser RETURN bilateral, regressões 0120/0121/0122, npm test dos dois apps, contracts/domain sync, logistics/lifecycle/identity, concorrência (3 repetições), RLS e parity passaram. Ver matriz e limites em [REGISTROS/0129.md](REGISTROS/0129.md).
- Migration oficial permanece 0040 e foi consultada somente em read-only; E2E permanece 0041. Nenhuma migration, deploy ou publicação de app.
- Commits locais: Motoboy `1f66ae0`, Browser QA `a2862f8`; Restaurante sem mudança em `95b85ae`. Histórico publicado apenas na branch autorizada por fast-forward.

## Atualização — Registro 0124 (2026-10-10)

- Campanha 0124 PARTIAL: correção de revisão obsoleta no cancelamento do Restaurante; Browser 0120/0121/0122 passou em evidências exclusivas.
- Browser RETURN comprovou criação vinculada e append PostgreSQL, mas travou na UI de reordenação; receipt bilateral Browser e concorrência RETURN independente não comprovados.
- PostgreSQL oficial preservado read-only em 0040; `rotamoto_e2e` em 0041; nenhuma 0042.
- Restaurante `0f2710f`, Browser QA `10dd943`, Motoboy sem alteração; apps não publicados. Histórico 0124 requer publicação fast-forward na branch autorizada.

## Atualização — Registro 0123 / estabilização do fluxo RETURN (2026-10-10)

- Contratos de Restaurante/Motoboy agora definem os fatos da RETURN e o estado `AWAITING_RESTAURANT_RECEIPT`; receipt só é final com confirmação autorizada do Restaurante.
- API/PG E2E cobre criação única e idempotente, apêndice de rota, reordenação sem mover parada em execução, revisão antiga, eventos próprios e receipt final. Corrigido INSERT de `delivery_fulfillments` incompatível com grants por coluna, sem alterar grants.
- Divergência offline preserva evento não confirmado e aceita resolução operacional explícita. Apps têm ações RETURN dedicadas; retorno normal de cliente segue bloqueado.
- `npm test` dos dois apps, domain/logistics/lifecycle/tenant/availability/identity E2E e security parity version-aware passaram. Oficial `rotamoto` somente leitura em 0040; E2E `rotamoto_e2e` em 0041; nenhuma 0042 criada.
- Browser 0120 e 0122 passaram em evidência isolada. Regressão 0121 parou antes da criação da Delivery; Browser do ciclo completo de RETURN não foi concluído. Ver gates/causa em [REGISTROS/0123.md](REGISTROS/0123.md).
- Commits locais: Restaurante `cb89c9f`, Motoboy `891e7ef`, Browser QA `b6551b6`; apps não publicados. Preservação das evidências prévias passou.

## Atualização — Registro 0080 / impressão de comandas (2026-10-06)

- Impressão browser-native no Restaurante: configurações locais por dispositivo, manual e modo automático com fila deduplicada e confirmação humana, preview, layout térmico/normal e QR `rm-delivery.v1` opcional autenticado. Sem print silencioso, cópia configurável ou adapter físico.
- Shell offline same-origin versionado inclui os módulos de impressão e nunca cacheia `/api/*`. Testes automatizados offline do service worker passaram; CDP não conseguiu atestar `navigator.onLine=false`, então browser offline e impressão física permanecem NOT_TESTABLE.
- Restaurante @ `851ef485287db5b912a561aa5563a9a1ed95ce88`; Motoboy inalterado @ `2709d6e0bde3f28056eaf0c7781fd081fd52c3f`. `npm test` ambos, guards, cross-app, audits zero, node checks e diff-check passaram. PostgreSQL oficial confirmado read-only em 0019/19, sem migration ou escrita.
- Nenhum bloqueio interno da campanha. `ON_PREM_PRODUCTION_READY` permanece fora do escopo e NÃO declarado: deployment e smoke do Registro 0069 ainda precisam de configuração/prova no host alvo.

## Atualização — Registro 0079 / 0019 aplicada e validada (2026-10-06)

- O operador corrigiu autenticação local via pgpass. Prova SQL real como `rotamoto_app` no E2E e no oficial retorna negação PostgreSQL `42501` para `logistics_providers.secret_ref`; stdout foi descartado, nenhum valor foi consultado/exposto.
- Recovery set novo pré-0019 `85ffe940-9be1-42cd-8fc9-6bcff9090b10`, 155.810 bytes, SHA-256 `e7099c11aa1d2809849a3740fc1e57f4a9c0885315f9728d31676d12ff03fdc1`, verify PASS; backup 0078 anterior preservado.
- Migration 0019 aplicada ao oficial pelo runner. Ledger final 19; 25 tabelas, 17 RLS/FORCE, 17 policies. Runtime sem SELECT de tabela nem SELECT/UPDATE de `secret_ref`; colunas operacionais autorizadas continuam acessíveis. Nenhuma contagem preexistente mudou; quatro tabelas recentes vazias.
- Security parity oficial↔E2E, 19 checksums, `npm test` dos dois apps, testes PostgreSQL logistics/territorial/guards, regressão cross-app e secret privilege, audit (zero), readiness real, node checks e diff-check: PASS. Detalhes e diferenças operacionais explicadas em [Registro 0079](REGISTROS/0079.md).
- Restaurante `codex/setup-workflow` @ `63476a759cb47cb82673d4632313264a83fb407a`; Motoboy @ `2709d6e0bde3f28056eaf0cd7781fd081fd52c3f`. Sem push. `ON_PREM_PRODUCTION_READY = NO`; restam somente configuração/provisionamento e smoke operacional do Registro 0069. Nenhum CRITICAL de `secret_ref` permanece.

## Atualização — Registro 0078 / migration oficial bloqueada por grant de secret_ref (2026-10-06)

- PostgreSQL oficial `rotamoto` em 127.0.0.1:5432/18.6, ledger 15→18. `0016_company_timezone`, `0017_logistics_fulfillment` e `0018_delivery_geo_snapshots` aplicadas pelo runner oficial, após backup pré-migration cifrado/verificado. 0016 checkpoint passou; contagens preexistentes não mudaram; novas tabelas vazias.
- Pós-condição encontrou `rotamoto_app` com SELECT efetivo em `logistics_providers.secret_ref` devido ao grant table-level da 0017. Contraria o least privilege do Registro 0076. Não foi feito REVOKE, migration corretiva, rollback nem readiness/teste final. Não implantar/liberar antes de correção aditiva aprovada e validação.
- Backup ID `85c11e6c-8aaf-4e5b-b91c-8925a064359b`, 99.977 bytes, SHA-256 `5afe2e7e904fdcf914f7eb50d9cdecdfdd12d90866f5c95b230bf85e3a7aed84`; zero blobs, conforme zero referências canônicas. Chave protegida não foi lida/exibida.
- Restaurante @ `14cad0d55508c5f197a87ef3a00fb85177ac7064` (runner checkpoint local); Motoboy inalterado @ `2709d6e0bde3f28056eaf0cd7781fd081fd52c3f`. Sem push. Ver [Registro 0078](REGISTROS/0078.md).

## Atualização — Registro 0077 / analytics territorial (2026-10-06)

- Restaurante `codex/setup-workflow` @ `17014f60fed7f4912c55de0ac3a95a8eb2de5443`; Motoboy inalterado @ `2709d6e0bde3f28056eaf0cd7781fd081fd52c3f`. Sem push; `main`, tags e baselines preservadas.
- Migration aditiva 0018 cria snapshot canônico tenant-scoped de destino; apenas coordenadas confirmadas manualmente têm fluxo ativo. GPS individual, endereço textual e coordenadas locais sem proveniência não viram destino nem alimentam geocoding implícito.
- Relatório territorial usa geohash5 (~5 km), supressão mínima k=5, bandas/subgrupos limitados, agregação server-side e ausência de PII/pontos individuais no payload ao browser. Inclui cobertura, status, fonte comercial, tipo, Driver e dimensões internal/external/provider.
- `npm test`, `test:territorial-postgres` e `test:logistics-postgres` em `rotamoto_e2e` com rollback, guards E2E, `npm audit --omit=dev` (zero), sintaxe e diff-check: PASS. Browser autenticado NOT_TESTABLE sem sessão/CDP disponível.
- `rotamoto` não recebeu escrita; a 0018 permanece pendente de deployment autorizado e readiness continua fail-closed. `ON_PREM_PRODUCTION_READY = NO`; gates de deployment 0068/0069 seguem separados. Rentabilidade/SLA/geocoding completo e comparação automática provider seguem abertos por falta de dados/modelos.

Ver [Registro 0077](REGISTROS/0077.md).

## Atualização — Registro 0076 / fundação de fulfillment híbrido (2026-10-06)

- Restaurante `codex/setup-workflow` @ `4b943b1160d68b2fcab127efb37608aa09268519` (commits `672ba8f`, `4b943b1`); Motoboy inalterado @ `2709d6e0bde3f28056eaf0cd7781fd081fd52c3f`. Sem push; branches protegidas, tags e baselines preservadas.
- Migration aditiva 0017 adiciona providers, allocations e dispatch attempts tenant-scoped com RLS/FORCE, FKs, constraints e grants de coluna mínimos. Aplicada/testada somente em `rotamoto_e2e`; banco oficial permanece sem escrita e ainda requer migrations 0016/0017 antes de readiness.
- Operação manual híbrida disponível no Restaurante: frota própria com Driver canônico, partner/marketplace externo sem Driver, solicitação manual idempotente, referência/status/custos conhecidos e fallback versionado/auditado. `Order.source` e `Route` mantêm semântica atual. Motoboy e contrato v1 não mudaram; Delivery externa conserva `driverId=null`.
- `npm test` ambos apps, PostgreSQL E2E service/tenant transaction com rollback, guards, `npm audit --omit=dev` (zero), `node --check` e `git diff --check`: PASS. Browser E2E UI NOT_TESTABLE sem sessão/CDP autenticado. APIs logísticas reais de marketplace seguem fora de escopo.
- Ver [Registro 0076](REGISTROS/0076.md). ON_PREM_PRODUCTION_READY não foi fechado: ainda depende do rollout de migrations e dos gates de deployment dos Registros 0068/0069.

## Atualização — Registro 0075 / timezone e dinheiro do Order (2026-10-06)

- Restaurante `codex/setup-workflow` @ `90f7a03c3ab42674dbe663d6ff87b205428b703e`; Motoboy @ `2709d6e0bde3f28056eaf0cd7781fd081fd52c3f`. Commits locais separados; main, tags e baselines preservadas; sem push.
- Contrato v1 agora define `Company.timeZone` IANA opcional/anulável e `Order.money` aditivo em minor units, moeda, proveniência e completude. Migration 0016 cria a coluna `companies.time_zone`, mas não foi aplicada; nenhum banco/dado/ACL foi alterado.
- Configuração Company protegida por sessão, MFA/RBAC/CSRF/auditoria; analytics usa datas civis do timezone e trata DST, ou oculta hora/dia se não configurado. Dados legados permanecem sem reinterpretação; total ambíguo não entra em ticket/faturamento e moeda ausente não vira BRL fora de canais locais comprovados.
- `npm test` de ambos apps, testes dirigidos, node check e diff check passaram. Browser E2E visual NOT_TESTABLE: servidor/CDP e sessão autorizada ausentes. ON_PREM_PRODUCTION_READY não reavaliado. Ver [Registro 0075](REGISTROS/0075.md).

## Atualização — Registro 0074 / analytics baseline Restaurante (2026-10-06)

- Restaurante `codex/setup-workflow` @ `8a2b5907260cd9501f91fc79694016fd2ecb1b02`; Motoboy @ `bc3d9ced58694606d1252ca97e4dcf54562505ec` sem alteração. Main/tags/baselines preservadas; sem push.
- Semântica de relatórios centralizada e coberta por testes. Taxa de entrega não é ticket/faturamento de produtos; Earning é repasse; distâncias estimada/real e duração por etapa distinguíveis; denominadores/coberturas indicados; CSV protegido contra formula injection.
- Timezone de Company ausente, portanto volume horário/diário não é exibido; ticket comercial genérico só pode usar `amountMinor` por moeda e não é chamado de faturamento de produtos. Heatmap, SLA e rentabilidade seguem sem dados/modelos suficientes. Nenhuma migration/DB/API ou Motoboy alterados.
- `npm test`, analytics específico, `node --check` e `git diff --check` passaram. Browser/CDP carregou app/módulos sem exceções, porém E2E interativo ficou NOT_TESTABLE porque o perfil temporário não tem sessão autenticada e o painel permanece inert; auth/RBAC não foram contornados.
- ON_PREM_PRODUCTION_READY não reavaliado nesta campanha; estado anterior de deployment dos Registros 0068/0069 não foi reaberto. Ver [Registro 0074](REGISTROS/0074.md).

## Atualização — Registro 0073 / OCR Motoboy local e offline (2026-10-05)

- Motoboy `codex/setup-workflow` @ `bc3d9ced58694606d1252ca97e4dcf54562505ec`; Restaurante `codex/setup-workflow` @ `a48ab2532ca3bc9a31ccaaffdc482be0c84906b6` sem alteração. Baselines e `main` preservadas; sem push.
- OCR agora usa pipeline modular Tesseract.js/modelo português self-hosted, cache PWA, normalização PT-BR, candidatos e confidence por campo, limites de imagem e revisão obrigatória antes de salvar. Corpus sintético 14 layouts e Browser E2E Chromium offline passaram; 72 valores anotados corretos e nenhum falso preenchimento nos campos avaliados.
- Fotos, texto OCR e evidências permanecem locais e voláteis; câmera física/qualidade com fotos reais Android não testadas. Não houve alteração do contrato/sync/DB/migrations nem do Restaurante. Ver [Registro 0073](REGISTROS/0073.md).

## Atualização — Registro 0068 / recovery PostgreSQL + mídia não vazio encerrado (2026-10-05)

- Rehearsal real em databases exclusivos `rotamoto_disposable_0068_source` e `rotamoto_disposable_0068_restore`: lifecycle HTTP criou DeliveryProof filesystem canônica e blob real; recovery set cifrado/autenticado foi verificado e restaurado. ID `7f45a0c3-fe9a-40b2-b776-4b514bfe70cf`; SHA-256 dump cifrado `c7678cf206695e64bc3cb118569e9918017c838f6e00523b3b598c438d3d7d59`; 1 blob `image/png`, 9 bytes, hash `843ac23b1736b4487ec81cf7c07ddd9bb46ae5b7818c2c3843d99d62fa75f3c9`.
- Estrutura origem↔restore aprovada: migrations 15/15, 21 relações/contagens, 284 constraints, 58 indexes, 13 policies, 13 RLS e FORCE RLS. Tenant/Delivery/storageRef/MIME/tamanho/hash e conteúdo por SHA-256 coincidiram. Testes adversariais reais falharam fechados. Teardown dos DBs pelo operador e limpeza filesystem completos; grants temporários revogados; zero resíduos.
- Restaurante `codex/setup-workflow` @ `52829738bc7acaf7cc6e75eb12d4973921a4e3dc`; sem push. Motoboy sem alteração. `npm test`, guards E2E, security parity READ ONLY, audit, sintaxe e diff-check passaram.
- Gate **“recovery PostgreSQL + mídia não vazio”: ENCERRADO**. `ON_PREM_PRODUCTION_READY = NO`: ainda faltam volumes/chaves duráveis e cópia offline, scheduler/monitoramento, smoke real de PostgreSQL TLS/CA/proxy + SMTP/PUBLIC_BASE_URL + keystore/filesystem/readiness e RPO/RTO/decisões operacionais. `CLOUD_READY = NO`; validar providers e restore cloud no deployment escolhido. Hardlink físico NOT_TESTABLE em Android/Termux.

Ver [Registro 0068](REGISTROS/0068.md).

## Atualização — Registro 0067 / teardown E2E retido por auditoria imutável (2026-10-05)

Grant temporário de backup em `rotamoto_e2e` foi validado e integralmente revogado. Lifecycle autenticado criou DeliveryProof/blob; os dados funcionais e o diretório do blob foram removidos. O trigger append-only reteve 15 eventos de auditoria e FK mantém Company/User âncora. Não foi comprovado recovery set/restore não vazio; nenhuma auditoria foi alterada. Gate **ABERTO**, `ON_PREM_PRODUCTION_READY = NO`. Ver [Registro 0067](REGISTROS/0067.md).

## Atualização — Registro 0066 / grants removidos; autenticação impede recovery (2026-10-05)

O escopo temporário DBA em `rotamoto_e2e` foi confirmado por catálogo (CONNECT, USAGE, SELECT nas 21 relações; sem escrita/CREATE/TEMP) e depois integralmente revogado por `rotamoto_migrator`; pós-validação encontrou zero grants residuais. `rotamoto_backup` não autenticou via pgpass para `rotamoto_e2e` (`no password supplied`), então nenhuma fixture, backup ou restore foi iniciado. Restaurante permanece limpo em `40c9702feca4ab066bcaf73b9429dac60f341538`. Gate não vazio **ABERTO**; `ON_PREM_PRODUCTION_READY = NO`. Ver [Registro 0066](REGISTROS/0066.md).

## Atualização — Registro 0065 / recovery não vazio bloqueado (2026-10-05)

Preflight somente leitura confirmou `rotamoto_backup` sem CONNECT/USAGE em `rotamoto_e2e`. O lifecycle E2E aprovado sempre reverte a transação externa e remove o filesystem temporário, portanto `pg_dump` independente não enxerga a DeliveryProof. Nenhuma fixture, ACL, migration ou dado foi alterado. Gate “recovery PostgreSQL + mídia não vazio” **ABERTO**; `ON_PREM_PRODUCTION_READY = NO`. Ver [Registro 0065](REGISTROS/0065.md).

## Atualização — Registro 0060 / núcleo self-hosted (2026-10-05)

- Restaurante `codex/setup-workflow` @ `9b5fe50f3df976d2913e9408948d96ec840392e3`; Motoboy @ `9a1adfc445a0eb3d4bea83f1a15b701d804a8848`; histórico `codex/f9-browser-e2e-0057` @ `21437fa95b8def9c7452c531fba70f7f26823611`. Sem push; main/tags/baselines intactas. Registro 0060 é a única nova peça canônica desta rodada.
- Migration aditiva `0015_proof_media_upload_intents` aplicada em `rotamoto` e `rotamoto_e2e`; security parity passou em 15 checksums. Nenhuma fixture em `rotamoto`. Divergência material ao 0059: ledger estava ausente no banco operacional local; runner aplicou 0001–0015, e consultas read-only confirmam `companies=0`, `domain_records=0`.
- DeliveryProof upload/sync agora usa intent tenant-scoped e advisory lock compartilhado; GC dry-run por padrão, mínimo 45 dias, checagem de referência canônica e intent. Motoboy vincula upload ao ID local, mantendo assinatura/retry/offline.
- CLI separado de operador: status de storage/SMTP/secrets/backup/URL; secret stdin write-only; auditoria local. Keystore tem rotação staged, cópia segura e rollback. Backup PostgreSQL custom é stream AES-256-GCM, manifesto HMAC/checksum, retenção e restore limitado a `rotamoto_disposable_*`.
- PASS: `npm test` ambos, E2E lifecycle/guards/security, 15 checksums, node checks, diff check; `npm audit --omit=dev` ambos com zero vulnerabilidades. Browser/CDP não disponível nesta sessão; Chromium Android/Termux tinha falhado com exit 134 no Registro 0059. Backup+restore real não executado: `rotamoto_backup`/`rotamoto_restore`/target descartável inexistentes e precisam DBA. Não executar `npm run test:postgres`, pois grava em `rotamoto`.
- OPEN: snapshot/restore de mídia no backup, retenção de intents abandonadas, decisão/medição RPO/RTO, deployment real TLS/CA/SMTP/keys. BLOCKED: DBA role/alvo e restore rehearsal real. SELF-HOSTED: PG/API/email/MFA FUNCTIONAL; Restaurante/Motoboy PARTIAL sem browser; storage FUNCTIONAL no fluxo de prova/GC mas mídia ausente do backup; secrets PARTIAL; backup/restore BLOCKED. ON_PREM_PRODUCTION_READY=NO; CLOUD_READY=NO.
- Ver [Registro 0060](REGISTROS/0060.md) e [Registro 0059](REGISTROS/0059.md).

## Atualização — Registro 0059 / Integração self-hosted (2026-10-05)

- Restaurante `codex/setup-workflow` @ `a7762124197d3b1668e2be701c1dc3697a5a46cd`; Motoboy `codex/setup-workflow` @ `7d02b44b139bb8170b8909f6513c0ac280588ef4`; histórico em `codex/f9-browser-e2e-0057`, Registro 0059 salvo em `8ff99a12b9fbc9de07934aad0cdf93c04386a587`. Nenhum push; branches principais, tags e baselines intactas.
- Migration `0014_native_totp_lifecycle` aditiva aplicada em `rotamoto` e `rotamoto_e2e`; ledger 14/14. 0001–0013 intactas. Nenhuma fixture/teste escreveu em `rotamoto`.
- DeliveryProof filesystem autenticado integrado a Motoboy/sync, metadata canônica, hash, leitura protegida e UI de status; MFA TOTP nativo, recovery codes por digest, replay/rate limit/auditoria e UI nos dois apps; SMTP integrado a convite/recovery, links corretos e harness local SMTP test-only.
- `npm test` ambos; E2E lifecycle rollback, guards, security parity (14 checksums), migration status, `node --check`, `git diff --check` e `npm audit --omit=dev` ambos passaram. Auditorias: 0 vulnerabilidades.
- Browser E2E novo não concluiu: servidor temporário respondeu 404 na raiz e Chromium Termux encerrou com 134/inotify antes de segunda execução. Não houve correção no produto por causa desse runtime. Legacy `npm run test:postgres` omitido porque writes fixture em `rotamoto`; lifecycle seguro usou `rotamoto_e2e`.
- SELF-HOSTED CORE: PostgreSQL/API/Restaurante/Motoboy/email/MFA FUNCTIONAL; storage/secrets PARTIAL; backup/restore BLOCKED. Falta cleanup de blobs órfãos, superfície de configuração administrativa instalação/tenant, rotação do keystore e backup/restore PG criptografado com papel autorizado compatível com RLS forced.
- On-prem production-ready: NÃO. Cloud-ready: NÃO. iFood/99Food/Keeta, GPS/câmera físicos e providers remotos seguem externos/inerentes ou opcionais conforme Registro 0059. Ver [Registro 0059](REGISTROS/0059.md).

## Atualização — Registro 0057 / Browser E2E autenticado F9 (2026-10-05)

- Restaurante `codex/setup-workflow` @ `f6f99a41c5edbab04ef2994c6bbe3889f355ddba`; Motoboy `codex/setup-workflow` @ `268c716144a7b740b38ae732e3ebd6a4a438a28e`; histórico na branch `codex/f9-browser-e2e-0057`. Nenhum push; `main`, tags e baselines preservadas.
- Campanha CDP autenticada usou somente lifecycle test-only e `rotamoto_e2e`, com rollback/consulta tenant-scoped sem resíduo. `rotamoto` somente READ ONLY; fingerprint catálogo/ledger antes/depois idêntico: `0ce3aa0ae64db6398f54840d0894917c249cd76a0581b2f7f8e64aecd46303c9`.
- PASS: MFA/sessão/CSRF, CRUD Order/Delivery, vínculo de Driver, Route multi-stop, relatórios/eventos, ciclo Restaurante→PostgreSQL→Motoboy→PostgreSQL→Restaurante até DELIVERED, FAILED/RETURNED, retry offline, escopo tenant/Driver, API sem cache e sem secrets em browser storage, ledger negado e 8 viewports sem overflow. Nenhum finding ou erro JS/console na rodada final.
- FIXED: push duplicado de registros canônicos importados entre instalações, preservando UUID canônico por resolução tenant/type e `baseVersion`; além de regressões concretas de CSRF/sessão, transação multi-store, submit Route e lock assíncrono de ação Motoboy. Contratos e regressões atualizados nos apps.
- Sem bug interno aberto. O browser de reatribuição/fato atrasado com segunda identidade não cabe na fixture atual de um Driver e permanece NOT_TESTABLE_WITH_CURRENT_CAPABILITY; as suítes de API/sync cobrem as proteções. BLOCKED_EXTERNAL: email/recovery real, armazenamento operacional de segredo MFA, hardware câmera/GPS, blob remoto e iFood/99Food/Keeta. Sem teste ou aprovação desses serviços.
- `npm test` dos dois apps, guards/lifecycle E2E, checks de sintaxe e diff passaram. F9 local autenticada pode ser encerrada para capacidades disponíveis; F9 global fica condicionada ao critério de aceite externo. Ver [Registro 0057](REGISTROS/0057.md).

## Atualização — Registro 0056 / gate e lifecycle E2E (2026-10-05)

- Restaurante `codex/setup-workflow` @ `9d5b8ecca988eec18f4fcee3b2a2779270475547` (27 commits à frente do upstream antes desta atualização); Motoboy `codex/setup-workflow` @ `422c3edd7f5b05f13943733ec184dfc4edcf22d4`; histórico `main` @ `e0aa51b36ce1522619a3688bb2d65683fbff798d`. Commit local de implementação no Restaurante; sem push.
- Gate read-only 0055 repetido e aprovado: grants efetivos de runtime, PUBLIC, ownership de objetos, RLS/FORCE, policies, ledger e checksums 0001–0013 equivalentes. Owner de database difere com runtime sem ownership/CREATE/membership/SET ROLE e lifecycle funcional comprovando o modelo.
- Fixture test-only usa somente `rotamoto_e2e`; guards rejeitam alvo inseguro pré-conexão e identificam endereço/role após conectar. Owner provisionado por serviço, MFA/CSRF exigidos, Driver/Order/Delivery por serviços e sync, vínculo existente via endpoint. Rollback externo + consulta read-only tenant-scoped confirmaram zero resíduo. `rotamoto` ficou restrito à auditoria read-only.
- Passaram `npm run test:e2e-guards`, `npm run test:e2e-security`, `npm run test:e2e-lifecycle`, `npm test` e `git diff --check`. Fingerprint oficial de catálogo/ledger antes/depois do lifecycle idêntico: `c50f8de9bf4d6d4a88d0f56f56640b7793c51bfc6d9bf43d507306949b62e6e6`. Sem campaign Browser F9, providers reais ou alteração de migrations; F9 permanece aberta. A pré-condição de privilégios do E2E está liberada. Próximo passo: usar o lifecycle nas fixtures da campanha Browser F9 em `rotamoto_e2e`. Ver [Registro 0056](REGISTROS/0056.md) e [DEC-0007](DECISOES.md).

## Atualização — Registro 0055 / auditoria de privilégios E2E (2026-10-04)

- Restaurante `codex/setup-workflow` @ `df5e980c8072912281f47499fa1071acb9d14918`; Motoboy `codex/setup-workflow` @ `422c3edd7f5b05f13943733ec184dfc4edcf22d4`; histórico `main` @ `e0aa51b36ce1522619a3688bb2d65683fbff798d`. Os registros 0054/0055 agora estão apenas no repositório canônico; cópias não rastreadas removidas de Restaurante `docs/`. Nenhum commit corretivo foi necessário, sem push.
- Migrations 0001–0013 aplicadas no `rotamoto_e2e` e ledger confirmado. Após `REVOKE TEMPORARY ... FROM PUBLIC`, CONNECT/CREATE/TEMP de runtime/migrator estão conforme a matriz fornecida.
- Comparação dos catálogos em transações `READ ONLY`: equivalência reprovada. Divergem owner da database (oficial `u0_a436`, E2E `rotamoto_migrator`), `rotamoto_app` sem USAGE no schema E2E e grants ausentes em `audit_log`, `companies`, `credentials`, `identity_tokens`, `memberships`, `permissions`, `provisioning_requests`, `recovery_tokens`, `roles`, `sessions` e `users`. `PUBLIC` ainda tem CONNECT na database E2E e EXECUTE nas quatro funções do schema; tais ACLs não existem no oficial. Detalhes no [Registro 0055](REGISTROS/0055.md).
- RLS/FORCE, 12 policies, owners de schema/objetos e acesso negado de `rotamoto_app` ao ledger coincidem. Nenhum dado/schema/grant foi alterado nesta comparação. **Não iniciar fixtures/runtime/browser E2E** até avaliação administrativa e nova validação read-only. F9 aberta; não continuar além deste gate.

## Atualização — Registro 0054 / migrations na database E2E (2026-10-04)

- O modo de migration `--e2e` exige `NODE_ENV=test`, alvo exato separado, `up/status` somente e validação pré-conexão; os guardas passaram. `rotamoto_e2e` foi criada administrativamente e recebeu 0001–0013 sem modificar migrations nem tocar dados/schema de `rotamoto`.
- `status --e2e` confirmou as 13 migrations; o schema tem 12 policies e RLS/FORCE esperado. A divergência TEMP inicial foi corrigida administrativamente depois, conforme Registro 0055. Sem fixtures/browser ou bypass. Ver [Registro 0054](REGISTROS/0054.md).

## Atualização — Registro 0053 / viabilidade do E2E autenticado (2026-10-04)

- Restaurante `codex/setup-workflow` @ `63f50026cfddfc6139771a3040a9f9f00107586c`; Motoboy `codex/setup-workflow` @ `422c3edd7f5b05f13943733ec184dfc4edcf22d4`. Árvores limpas, main/tags/baselines preservadas; nenhum push ou commit de app.
- PostgreSQL oficial `127.0.0.1:5432/rotamoto` 18.6 consultado apenas por pgpass e transações read-only: runtime/migrator sem `CREATEDB`, superuser, `CREATEROLE` ou `BYPASSRLS`; database QA inexistente. Runner de migrations restringe `/rotamoto`. Sem database descartável criada ou privilégios administrativos novos, não foi possível construir o harness seguro nem executar smoke autenticado.
- Fingerprint antes/depois do banco oficial igual: OID 16389, 13 migrations, digest do ledger `5d41e67f362c2cbf87c1ec8ce204b1cd`, 12 tabelas com RLS forçada, 0 databases `rotamoto_e2e%`. Nenhum dado/role/grant/schema/configuração alterado. Portas QA temporárias fechadas.
- F9 aberta: P0/P1/P2/P3 = 0; sete grupos externos de 0052 inalterados. O impedimento do E2E autenticado é local e administrativo. Ver [Registro 0053](REGISTROS/0053.md).

## Atualização — Registro 0052 / F9 sessão e pré-condições E2E (2026-10-04)

- Motoboy: `codex/setup-workflow` @ `422c3edd7f5b05f13943733ec184dfc4edcf22d4`, árvore limpa; `main` `aad1c6c07499e4fdf5c931ce5ce9e92cde3f7478`; baseline peel `79c527b59d32d8b55236c62042acb868166ed4ad` intacta. Primeiro 401 anônimo não mostra mensagem de expiração; 401 com sessão anterior ainda informa expiração. Service worker v40.8 contém o helper.
- Restaurante: sem alteração, `codex/setup-workflow` @ `63f50026cfddfc6139771a3040a9f9f00107586c`, árvore limpa; main e baseline peel `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` intactas.
- `npm test` Motoboy, `node --check` nos JS alterados e `git diff --check` passaram. CDP 360×800/393×873/1366×768 corrigiu P3 e revalidou P1/P2 + P3 anteriores; sem exceções/rejeições/falhas de request inesperadas.
- Auditoria read-only: status migrations 0001–0013 aplicado. Provisionamento de primeiro owner não é operacional (adapter `authorizeProvisioner` ausente); email/MFA fail-closed. Não há mecanismo de remoção integral de fixture mantendo audit/fatos. E2E autenticado requer desenho de fixture QA isolada, não usar o tenant/banco oficial sob a configuração atual.
- Contagem: P0/P1/P2/P3 abertos = 0. `BLOCKED_EXTERNAL` reavaliado de 8 para 7 grupos reais (email, MFA/secret storage, hardware GPS/câmera, blob e 3 providers); fixture de identidade/Driver é categoria B, não externa. F9 continua aberta. Sem push/fixture/alteração PostgreSQL. Ver [Registro 0052](REGISTROS/0052.md). Histórico terá commit separado.

## Atualização — Registro 0051 / QA ampliado F9 (2026-10-04)

- Restaurante: `codex/setup-workflow` @ `63f50026cfddfc6139771a3040a9f9f00107586c`, árvore limpa; `main` `8fcd9f0ffffe37047a79834161cc1f791f20d76f`; baseline peel `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` intacta.
- Motoboy: `codex/setup-workflow` @ `69b1e76595ae4a4f6aee8021685761d03f034d91`, árvore limpa; `main` `aad1c6c07499e4fdf5c931ce5ce9e92cde3f7478`; baseline peel `79c527b59d32d8b55236c62042acb868166ed4ad` intacta. Sem push.
- Os dois P3 originais do Registro 0049 estão corrigidos. QA ampliado em 360×800, 393×873, 412×915, 768×1024, 1366×768 e 1920×1080; sem overflow horizontal, exceções JS ou unhandled rejections. P0/P1/P2 abertos = 0; novo P3 Motoboy: texto “Sua sessão expirou” em 401 anônimo embora o status seja “Sem sessão autenticada”.
- Browser usou somente perfis Chromium temporários, sem criação de usuário/tenant/Driver/Delivery ou credencial. IndexedDB observado: Restaurante `rota-moto-restaurante-local-v30` v6 e Motoboy `RotaMotoDB` v7; nenhum store foi limpo ou substituído. Formulários/modais foram abertos, sem salvar dados.
- API local iniciada em loopback com runtime para health/readiness e GET de sessão anônimo: live/ready 200, sessão 401 esperado. Nenhuma operação de escrita/administração/schema; API, servidores 8788/8789 e Chromium/CDP encerrados, portas fechadas. PostgreSQL oficial não foi alterado.
- Testes: `npm test` nos dois apps; `node --check` JS alterados; `git diff --check`; matriz e foco teclado CDP. iFood/99Food/Keeta, login real, email/MFA, GPS/câmera física e storage permanecem BLOCKED_EXTERNAL conforme capacidades já documentadas; F9 segue aberta.
- Commits: Motoboy `69b1e76595ae4a4f6aee8021685761d03f034d91`; Restaurante `63f50026cfddfc6139771a3040a9f9f00107586c`. Relatório/screenshot brutos fora do Git em `~/projetos/browser-tests/f9-round-2-2026-10-04/`.

## Atualização — Registro 0050 / F9 correção dirigida P1/P2 (2026-10-04)

- Motoboy: `codex/setup-workflow` @ `09bcf745965486e545649d875a03e77df01825d3`, árvore limpa; main `aad1c6c07499e4fdf5c931ce5ce9e92cde3f7478` e baseline `79c527b59d32d8b55236c62042acb868166ed4ad` intactas.
- Restaurante: `codex/setup-workflow` @ `996144b51cb36d0d19fbbc13a352c430b8915aef`, árvore limpa; main `8fcd9f0ffffe37047a79834161cc1f791f20d76f` e baseline `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` intactas.
- Corrigidos os quatro achados P1/P2 do Registro 0049; um follow-up também impede que 401 obsoleto de `/identity/session` expire identidade posterior. `npm test` e CDP dirigido passaram. Sem push, PostgreSQL/schema/administração ou dados de QA persistidos.
- P3 não alterados. F9 continua aberta. Evidências, contagens e detalhes em [Registro 0050](REGISTROS/0050.md).

## Atualização — Registro 0047 / F8 preparação operacional (2026-10-04)

- Restaurante: `codex/setup-workflow` @ `22a06c248b3e9baa9c2ad047f9155d18921151f7`, árvore limpa; `main` `8fcd9f0ffffe37047a79834161cc1f791f20d76f`; baseline `v5.50-ui-mobile-fix5^{}` `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` intactos.
- Motoboy: `codex/setup-workflow` @ `3e0f42b1129930a8d69d5a979b5da14149089fa7`, árvore limpa; `main` `aad1c6c07499e4fdf5c931ce5ce9e92cde3f7478`; baseline `v39.6-ui-mobile-fix2^{}` `79c527b59d32d8b55236c62042acb868166ed4ad` intactos. Nenhum push.
- F8: config production fail-closed, proxy/Host/origin/IP trust delimitados, security headers, timeouts/pool, readiness de schema, shutdown drenado e documentação de deploy/backup/restore/retention. Não houve migration nem alteração no PostgreSQL oficial.
- Motoboy: SW v40.5 limita cache a URLs exatas same-origin de shell, exclui API, espera abas existentes antes de ativar novo shell e não altera IndexedDB. Restaurante não possui SW próprio.
- `npm test` nos dois apps passou; testes focados runtime/security/readiness (PG oficial via rotamoto_app), migration status (0001–0013 via rotamoto_migrator), lifecycle, runbooks, PWA, checks JS e `git diff --check` passaram. Nenhum backup/restore/deploy/nginx foi executado.
- Classificação F8 **B — preparação operacional local concluída com bloqueios externos isolados**. Termux/nginx/PostgreSQL local não é produção. Registro detalha pendências de TLS/domínio, provider de secrets/KMS, DB/host de produção, RPO/RTO, retention, restore isolado e operadores.
- Commits: Restaurante `22a06c248b3e9baa9c2ad047f9155d18921151f7`; Motoboy `3e0f42b1129930a8d69d5a979b5da14149089fa7`. Próxima macrofase é F9, não iniciada.

## Atualização — Registro 0046 / F4 integrações externas (2026-10-04)

- Restaurante `codex/setup-workflow` HEAD `0ace64884a9f546368909073e60dbe5a8b363647`, árvore limpa; commit anterior `3e84fad04eb877b466a6757a4fedf2db8e0f66c8`. `main` preservada em `8fcd9f0ffffe37047a79834161cc1f791f20d76f`; baseline `v5.50-ui-mobile-fix5` preservada em `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- iFood, 99Food e Keeta não têm integração externa real comprovada. Adapters/handlers antigos continham protocolo não verificado; labs eram sintéticos. Fronteiras agora falham fechado, API admin mostra estado tenant-scoped sem secrets, rotas provider respondem 503 e laboratório iFood fica só em memória sem criar Orders.
- Nenhuma migration ou mudança no PostgreSQL oficial/grants/RLS. Testes focados de integração/segurança/readiness, identidade UI/auditoria, `node --check` e `git diff --check` passaram; sem Browser QA, npm test amplo, test:postgres ou push.
- F4 classificada **B — infraestrutura local concluída; dependências externas isoladas**. Detalhes e classificação individual em [Registro 0046](REGISTROS/0046.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).
- Motoboy não alterado: `codex/setup-workflow` HEAD `2c82d094ef8a2f04aa436507a36682b4f36e95fc`, árvore limpa; main/baseline intactas. Próxima macrofase indicada pelo plano é F8, não iniciada; F9 pendente.

## Atualização — Registro 0045 / F7 UI/UX (2026-10-04)

- Restaurante: `codex/setup-workflow` @ `3e84fad04eb877b466a6757a4fedf2db8e0f66c8`, árvore limpa. Motoboy: `codex/setup-workflow` @ `2c82d094ef8a2f04aa436507a36682b4f36e95fc`, árvore limpa. Cada app tem commits separados de consolidação da UI e escopo das configurações; nenhum push.
- Conta autenticada/offline agora fica no header e usa diálogo modal acessível com foco controlado e fundo inerte. Restaurante ganhou UI administrativa para Membership↔Driver via endpoints existentes; Motoboy recebeu semântica correta de navegação/filtros, feedback anunciável e modais acessíveis.
- Safe areas/teclado virtual foram tratados; tokens/estilos de identidade consolidados, regras CSS mortas removidas e contraste do acento verde Motoboy ajustado. As telas de configuração informam que as preferências são locais e separam estimativas locais de Earning canônico. Nenhum domínio, sync, IndexedDB, contrato, PostgreSQL ou regra de negócio foi alterado.
- `npm test` passou nos dois apps; testes focados de identidade/sync, `node --check` e `git diff --check` passaram. A primeira execução detectou uma expectativa antiga de versão de assets no teste Motoboy; a expectativa foi alinhada aos arquivos já existentes (`sync-reconciliation`/`execution-workflow` v2 e app v40.2) e a suíte passou.
- F7 classificada **B — implementação concluída / Browser QA pendente para F9**. Sem Browser QA, screenshots, CDP ou dispositivos físicos nesta execução. Nenhuma alteração em `main` ou baseline: Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`, Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad`.
- Ver [Registro 0045](REGISTROS/0045.md), [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md) e [PENDENCIAS.md](PENDENCIAS.md).

## Atualização — Registro 0043 / F6 Motoboy (2026-10-04)

- Motoboy: branch `codex/setup-workflow`, HEAD `d92e5915ca94dba80c37d234cac14634deadcd4f`, árvore limpa. Implementados ciclo de execução de DeliveryEvent, fluxo offline/outbox, GPS/assinatura local fail-closed, arquivo de tentativas na reentrega, reconciliação de Route/Earning, estado de sync, atualização das projeções e exclusão de `/api/` do cache PWA.
- Restaurante: branch `codex/setup-workflow`, HEAD `86e0185f66aa8e9342b6582ad8a38bd91dc9957d`, árvore limpa. Backend agora projeta `DELIVERY_ACCEPTED` e `DELIVERY_PICKED_UP`, preservando timestamps canônicos. Shared contract docs/scripts estão idênticos.
- F6 classificada **C — parcial** por lacuna de segurança: não existe vínculo canônico server-side User/Membership↔Driver, então o backend não prova atribuição individual nas operações/pull Motoboy. Não inferido por email/cliente. Provas remotas também dependem de storage provider; Browser QA permanece para F9.
- Testes: `npm test` Motoboy passou; `tests/test-domain-sync-postgres.js` passou contra PostgreSQL oficial via pgpass; node --check e git diff --check nos arquivos alterados passaram. Nenhuma migration/administração PostgreSQL, Browser QA, push ou mudança em main/tags/baselines.
- Baselines: Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad`; Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`. `main` preservada nos dois repositórios.
- Ver [Registro 0043](REGISTROS/0043.md), [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md) e [PENDENCIAS.md](PENDENCIAS.md).

## Atualização — Registro 0042 / F5 Restaurante (2026-10-04)

- F5 está **implementada** (classificação B: Browser QA integrado fica para F9). Restaurante permanece em `codex/setup-workflow`, HEAD `104b552273059c1848dc2ca3f7b5df2d45b1c016`; a árvore está limpa após os commits `b85b57a5c661324f705022055e323c1c310a212c` e `104b552273059c1848dc2ca3f7b5df2d45b1c016`. `main` continua `8fcd9f0ffffe37047a79834161cc1f791f20d76f`; baseline `v5.50-ui-mobile-fix5` continua em `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- Fluxos cobertos: criação/edição de pedidos; Delivery, atribuição/troca/cancelamento/reentrega; eventos/provas; Route com `deliveryIds` ordenáveis e sem relação inversa; cadastro Driver separado de GPS; ganhos/relatórios em unidades monetárias inteiras; indicadores de conclusão por `completedAt`; backup com aviso plaintext e merge sem sobrescrever; projeções sync canônicas e estado/rejeição visível.
- Corrigidos status executivos rebaixados por sync, exclusão física que quebrava Order/histórico, GPS editável no cadastro Driver, `driverId`/Earning ausentes na atribuição, falta de ID estável em pedidos legados e redelivery impossível no enforcement do servidor. A reentrega só é aceita depois de `DELIVERED`, `FAILED` ou `RETURNED` e gera audit_log via actor da sessão; `DELIVERY_RETURNED` agora atualiza a projeção canônica.
- Aplicativo: commit `b85b57a5c661324f705022055e323c1c310a212c` (`feat(restaurante): complete local-first operating flows`). Arquivos: `app.js`, `restaurant-operations.js`, `backend/domain/sync-service.js`, `index.html`, `styles.css`, `package.json`, `tests/test-restaurant-operations.js`, `tests/test-domain-sync-postgres.js`, `tests/test-sync-flows.js`. Nenhuma migration foi necessária; PostgreSQL oficial não teve alteração administrativa.
- Testes finais: Restaurante `npm test` e `npm run test:sync` passaram; teste PostgreSQL dirigido passou com `DATABASE_URL` runtime `rotamoto_app` e `MIGRATOR_DATABASE_URL` `rotamoto_migrator` via pgpass, sem senha na URL. Fixture transacional foi revertida; sem dados sintéticos residuais. `node --check` dos JS alterados e `git diff --check` passaram. Sem Browser QA.
- Motoboy permaneceu sem alteração: `codex/setup-workflow`, HEAD `3634b3da045500a1dbb84cb82bd967f03b332167`. Baseline do Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad` intacta. Nenhum push, F4/F6/F7/F8/F9 ou mudança em `main` iniciada.
- Próxima fase recomendada no plano: F6 Motoboy. Bloqueios F3 externos continuam conforme Registro 0041; importação de pedidos reais depende de F4; browser integrado de F5 fica para F9.
- Ver [Registro 0042](REGISTROS/0042.md), [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md) e [PENDENCIAS.md](PENDENCIAS.md).

# Estado Atual dos Projetos

Estado inspecionado em 2026-10-04, com atualizações registradas cronologicamente abaixo. Este documento resume somente fatos verificáveis nos checkouts locais; não presume estado de produção ou de serviços remotos. Atualização mais recente: Registro 0072.

## Atualização — Registro 0072 / QR seguro de Delivery (2026-10-05)

Restaurante `codex/setup-workflow` @ `a48ab2532ca3bc9a31ccaaffdc482be0c84906b6`; Motoboy `codex/setup-workflow` @ `2a1ec2a7cf4d90476cd38bcd1d6f3801c0503d6a`. O QR antigo com PII deixou de ser emitido; emissão autenticada no backend usa token Ed25519 versionado, tenant-bound, com revisão/expiração e chave privada no keystore. Motoboy valida assinatura/tenant/Delivery/Driver/revisão/estado, revalida online, suporta snapshot offline com aviso e exige confirmação antes de abrir. Decoder jsQR é local e incluído no shell offline. Não houve migration nem mudança do contrato/sync v1. `npm test` passou nos dois, assim como testes QR, `node --check` e `git diff --check`. Browser E2E e câmera física não foram testados: sem harness/browser host-managed aprovado disponível. A chave do deployment precisa ser provisionada/configurada pelo operador antes da emissão real. Baselines, main e tags preservadas; sem push. Ver [Registro 0072](REGISTROS/0072.md).

## Atualização — Registro 0071 / paridade do contrato v1 (2026-10-05)

Restaurante `codex/setup-workflow` @ `6fb45c0aee3d2d21c029d349f6fddc16dd4aff25`; Motoboy `codex/setup-workflow` @ `ffe2d66081a1845eebd61def4608fd7bf0d92816`. Regressão semântica cross-app adicionada aos `npm test` dos dois apps. Motoboy agora permite `baseVersion` opcional e positivo nas mesmas entidades que Restaurante; servidor continua removendo esse metadado antes de persistir canonical payload. Protocol/schema v1, IndexedDB e contrato documental não mudaram. `npm test`, node checks e diff check passaram. Sem PostgreSQL/migrations/fixtures/Browser E2E ou push; baselines preservadas. QR/OCR/analytics/frota híbrida/impressão não foram implementados. Ver [Registro 0071](REGISTROS/0071.md).

## Atualização — Registro 0070 / auditoria funcional cross-app (2026-10-05)

Auditoria e desenho somente leitura para frota híbrida, analytics, QR/scanner,
OCR e impressão. Os apps permanecem sem alterações. O contrato narrativo é igual,
mas há drift em `contract.js` nos campos `baseVersion`. O QR atual inclui PII e
deve ser substituído por payload opaco assinado antes de uso operacional mais
amplo. Frota logística externa, heatmap histórico, scanner, OCR independente de
layout e impressão estão ausentes ou parciais; migrations aditivas provavelmente
são necessárias para frota híbrida, SLA/custos/região e impressão centralizada.
Plano incremental e impactos completos em [Registro 0070](REGISTROS/0070.md).
O gate de recovery não vazio do 0068 permanece encerrado; o deployment 0069 não
foi reaberto. `ON_PREM_PRODUCTION_READY = NO`. Próxima ordem recomendada:
paridade contratual, QR seguro/scanner, OCR offline extensível, baseline de
analytics, fundação de provider manual, analytics geo/provider e impressão.

## Atualização — Registro 0049 / QA visual inicial F9 (2026-10-04)

- F9 começou com QA visual/renderizado e exploratório nos dois apps via Chromium 149/CDP, servidores loopback 8788/8789 e API local 8787. Matriz de 360×800, 393×873, 412×915, 768×1024, 1366×768 e 1920×1080; navegação, estados vazios, identidade anônima, modal Restaurante, modo offline/PWA e console/rede foram inspecionados.
- Resultado `F9_INITIAL_QA = PASS_WITH_FINDINGS`: P0 0, P1 2, P2 2, P3 2, BLOCKED_EXTERNAL 8. P1: Motoboy tem exceção durante setup e a captura “Nova corrida” falha; Restaurante pode ficar `#app.inert` após escolher modo local antes da resposta assíncrona de sessão. P2: boot de identity-ui Motoboy falha ao acessar controles removidos e bottom navigation Motoboy sobrepõe conteúdo no desktop. P3: estado sync quebra a hierarquia do card de ganhos Motoboy; Restaurante mostra mensagem de sessão expirada na primeira sessão anônima.
- Histórico visual: topbar/alinhamento, navegação horizontal mobile Restaurante, empty state do mapa, overflow horizontal de documento e modal/foco do Restaurante não apresentaram os defeitos históricos; bottom nav desktop do Motoboy foi reproduzida. Sem tabelas preenchidas/dados reais para validar conteúdo largo.
- Sem credenciais/tenant/conta real, sessão/Driver/Delivery de teste, envio de recovery/invite, MFA, hardware de câmera/GPS ou storage provider; capacidades de integração iFood/99Food/Keeta continuam BLOCKED_EXTERNAL. Sem contorno. Sem alteração de apps, PostgreSQL, config de Termux/nginx, main, tags ou baselines; nenhum push.
- Ambiente, passos, arquivos prováveis, evidências/screenshot, console/rede e classificação de cada achado: [F9_QA_INICIAL.md](F9_QA_INICIAL.md). Capturas/relatório brutos permanecem fora dos repos em `~/projetos/browser-tests/f9-initial-qa-2026-10-04/`.
- HEADs permanecem Restaurante `22a06c248b3e9baa9c2ad047f9155d18921151f7` e Motoboy `3e0f42b1129930a8d69d5a979b5da14149089fa7`; branches `codex/setup-workflow`; main e baselines mantidas. Só o repositório de histórico será commitado nesta execução.

## Atualização — Registro 0048 / reconciliação pré-F9 (2026-10-04)

- Restaurante: `codex/setup-workflow` @ `22a06c248b3e9baa9c2ad047f9155d18921151f7`; árvore limpa após auditoria. `main` `8fcd9f0ffffe37047a79834161cc1f791f20d76f`; baseline `v5.50-ui-mobile-fix5^{}` `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- Motoboy: `codex/setup-workflow` @ `3e0f42b1129930a8d69d5a979b5da14149089fa7`; árvore limpa após auditoria. `main` `aad1c6c07499e4fdf5c931ce5ce9e92cde3f7478`; baseline `v39.6-ui-mobile-fix2^{}` `79c527b59d32d8b55236c62042acb868166ed4ad`.
- Contratos compartilhados `CONTRACT.md`, `contract.js` e `backup-format.js` são byte a byte idênticos. PostgreSQL oficial consultado sem DDL: migration status 0001–0013 aplicadas; suíte PostgreSQL passou com runtime/migrator por URLs sem senha e pgpass.
- `npm test` passou nos dois aplicativos; `node --check` passou para os arquivos JavaScript dos dois apps; `git diff --check` passou. iFood/99Food/Keeta permanecem fail-closed; nenhuma conectividade real inferida.
- Foram corrigidas descrições contraditórias antigas no plano/matriz: login/admin ainda listados como ausentes, Route→Delivery descrito como aberto, versões IndexedDB/migrations e backups apontados como anteriores, e providers antigos descritos como adapters ativos. Nenhum defeito de código concreto foi reproduzido; nenhuma alteração de app ou banco foi necessária.
- Classificação pré-F9: F1 B; F2 A; F3 B; F4 B; F5 B; F6 B; F7 B; F8 B. Pendências externas não impedem QA integrado local.
- **READY_FOR_F9 = YES.** Não existe pendência interna estrutural identificada que deva ser corrigida antes do Browser QA. F9 não foi iniciada nesta execução; sem browser/CDP/screenshots, sem push, sem alteração de main/tag/baseline ou configuração administrativa.

## Atualização — Registro 0044 / vínculo canônico User↔Driver (2026-10-04)

- Restaurante: `codex/setup-workflow` @ `ec0fc333ea2373c5ac6207fee7b3727a6da1c5ad`. Motoboy: `codex/setup-workflow` @ `f8f3e2e251bc54111e0f445c40cf18780dc9ccbb`. Histórico será commitado ao final; sem push.
- Migration `0013_membership_driver_binding` aplicada no PostgreSQL oficial `18.6`, `127.0.0.1:5432/rotamoto`, via `rotamoto_migrator`; conexão runtime permaneceu em `rotamoto_app`/pgpass. Não houve alteração de role/configuração administrativa.
- Membership guarda vínculo opcional único ao Driver canônico do mesmo tenant. API administrativa protegida por RBAC, CSRF, MFA e auditoria. Sessão retorna o Driver resolvido no servidor; não há inferência por dados do cliente.
- Sync Motoboy exige vínculo server-side; pull/domínio respeitam o Driver e push valida sob lock atribuição corrente de DeliveryEvent/LocationPoint/DeliveryProof. Reatribuição preserva fatos e notifica minimamente o Driver anterior; fatos atrasados ficam rejeitados/conflict no cliente, sem perder modo offline.
- Testes focados de migration/status, constraints/FKs/grants/RLS e API/sync PostgreSQL passaram; testes Motoboy de workflow/reconciliação, syntax checks e `git diff --check` passaram. Sem Browser QA, suites amplas ou fixtures persistidas.
- F6 classificada **B — implementação concluída / Browser QA pendente em F9**. Restam provider de blob e permissões/hardware físicos como capacidades externas, sem bloquear implementação. Não iniciadas F4/F7/F8/F9. Baselines e main intactas; sem push.

## Atualização — Registro 0041 / F3 (2026-10-04)

- F3 implementada localmente até o limite seguro, classificada **PARCIAL** somente por dependências operacionais externas: primeiro owner/operator auditável, MFA enrollment/verificação com armazenamento seguro de chave e entrega real de convite/recuperação por email. Não existe signup público nem bypass MFA. Browser QA foi deliberadamente adiado para F9 e não mantém a implementação F3 aberta.
- Restaurante adicionou lifecycle administrativo de roles/memberships/convites, subset permission grants, proteção transacional do último owner e prevenção de autoelevação; alterações auditadas. Migration aditiva `0012_identity_rbac_lifecycle` aplicada pelo migrator oficial. APIs de criação/atualização de role, mudança de membership e convite usam sessão, CSRF, tenant da sessão, MFA exigida e erros sanitizados.
- Ambos os clientes agora têm login/logout, restauração e expiração de sessão, troca de tenant validada, recuperação/aceitação de convite, challenge MFA fail-closed, estados de loading/erro e sincronização best-effort após autenticação. Senha, session token, CSRF e tokens de recuperação/convite não são persistidos em IndexedDB/localStorage. O Motoboy diferencia modo local/offline de sessão autenticada; a UI do Restaurante expõe administração conforme permission keys e mantém profiles locais explicitamente separados.
- Corrigidos: POST de roles sombreado por GET; MFA ausente no fluxo de convite; último owner podia ser rebaixado em corrida; ausência das telas/clientes de identidade; assets/scripts duplicados/quebrados no Motoboy; campo oculto visível por CSS. Implementados testes de UI/API e sincronizados `identity-ui.js`/`.css`.
- PostgreSQL oficial `18.6`, `127.0.0.1:5432/rotamoto`, migrations 0001–0012 aplicadas; runtime continua `rotamoto_app`, DDL via `rotamoto_migrator`, RLS/FORCE preservada. Nenhuma role/configuração administrativa foi alterada nesta execução.
- Testes de fechamento: `npm test` nos dois apps e `npm run test:postgres` no Restaurante passaram; `node --check` nos JS modificados e `git diff --check` passaram. Sem Browser QA, sem push, sem dados sintéticos persistentes.
- Restaurante: branch `codex/setup-workflow`, HEAD `03634a6199cdc6b94440c55367f652f66df6e68f`; commits F3 `5a814d8` e `03634a6`. Motoboy: branch `codex/setup-workflow`, HEAD `3634b3da045500a1dbb84cb82bd967f03b332167`; commit F3 `3634b3d`. `main` preservada; tags/baselines permanecem Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad`.
- Ver [Registro 0041](REGISTROS/0041.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md). Próxima fase recomendada: F5. F4 não foi iniciada.

## Atualização — Registro 0040 (2026-10-04)

- F2 concluída para as operações internas v1 definidas: Restaurante adicionou consulta tenant-scoped para Order, Delivery, Route, Driver, DeliveryEvent, LocationPoint, DeliveryProof e Earning; leitura administrativa de Company, memberships, roles/permissões e metadados de integrações; health/readiness PostgreSQL; erros/request IDs/logs estruturados e documentação `rota-moto-restaurante/docs/API-v1.md` no app.
- Todas as leituras derivam tenant da sessão e verificam permission key; RLS/FORCE permanece defesa adicional. Não foi criado CRUD de domínio paralelo ao sync. As mutações de domínio seguem nos serviços/use cases de sync com ACK por operação. A API administrativa não revela `secret_ref` ou credenciais.
- Migration `0011_runtime_integration_read` concedeu somente SELECT em `integrations` e `external_accounts` a `rotamoto_app`; sem grants de escrita ou alteração de 0001–0010. Aplicada com `rotamoto_migrator`; status confirmou 0001–0011. PostgreSQL oficial continua 18.6 em `127.0.0.1:5432/rotamoto`.
- Testes: `npm test` e `npm run test:postgres` Restaurante passaram contra a instância oficial; cobrem migração/rollback/reapply, RLS, privilégios, endpoints, tenant, RBAC, sessão, sync e readiness. `node --check` em todos os JS alterados e `git diff --check` passaram. Sem Browser QA; sem dados sintéticos persistidos.
- Restaurante: `codex/setup-workflow`, HEAD `3cd0476e24feec8834028165da23a42d7b94db0e`, commits `3c5cd4b` e `3cd0476`, árvore limpa. CORS atende somente `ALLOWED_ORIGIN`, com preflight e CSRF; testes específicos de origem aceita/negada passaram. Motoboy sem alteração, branch `codex/setup-workflow`, HEAD permanece `f1ac938ca2fde6150e5f24b94b8125d466e19e24`, árvore limpa.
- Baselines intactas: Restaurante tag peel `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; Motoboy tag peel `79c527b59d32d8b55236c62042acb868166ed4ad`. `main` dos dois apps não alterada; nenhum push.
- Mutação de memberships/roles e convites genéricos requer política de lifecycle/RBAC da F3; primeiro operador/email/MFA continuam fail-closed. Integrações reais/deploy permanecem F4/F8. F2 não fica aberta por essas fases. Ver [Registro 0040](REGISTROS/0040.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).

## Atualização — Registro 0039 (2026-10-04)

- F1 implementada e encerrada na classificação **B: implementação concluída / Browser QA pendente para F9**. O plano não mantém F1 aberta por QA real posterior; F2 não foi iniciada.
- Restaurante: `codex/setup-workflow`, HEAD `f837268222b351145116690c6cee7649b9a09c78`, árvore limpa; commits F1 `40f712f` e `f837268`. Motoboy: `codex/setup-workflow`, HEAD `f1ac938ca2fde6150e5f24b94b8125d466e19e24`, árvore limpa; commits F1 `89deced` e `f1ac938`.
- Baselines preservadas: Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`. `main` dos apps não foi alterada; sem push.
- Contrato `CONTRACT.md`/`contract.js` byte a byte idêntico nos apps. Schemas canônicos v1 atualizados; Route→Delivery representa 0..N por `Route.deliveryIds`, sem campo inverso; o backend valida tenant/existência/tombstone, exclusividade de Route ativa, serializa concorrência e audita alterações.
- Earning usa `amountMinor` inteiro seguro, moeda explícita, componentes tipados e `rule`/`ruleVersion` opcionais; Restaurante calcula/escreve e Motoboy apenas consome. Provas usam metadata + storageRef/SHA-256, PNG/JPEG até 8 MiB; adapter de blob falha fechado enquanto não configurado e Data URL permanece somente local/legado.
- Backup Local-First v1 exporta todas as stores, remove campos de credenciais/sessão/CSRF/MFA/tokens/secrets e limita Data URL legado a PNG/JPEG de 8 MiB. Restore pede confirmação e faz merge atômico apenas de chaves ausentes, preservando colisões, outbox, conflitos e tombstones. Corrigido no Motoboy o export não implementado e o restore antigo que substituía os dados correntes.
- IndexedDB não precisou de novo store/índice ou bump: registry do Registro 0038 permanece nas versões Restaurante 6 e Motoboy 7. PostgreSQL oficial 18.6 (`127.0.0.1:5432/rotamoto`) aplicou migrations 0009–0010 via `rotamoto_migrator`; `migrate.js status` confirmou 0001–0010. Não houve alteração de role/configuração PostgreSQL.
- Testes: `npm test` passou em ambos; `npm run test:postgres` passou (migrations/RLS, identidade/HTTP e domínio/sync). Após adicionar `ruleVersion`, testes de schema nos dois apps e teste PostgreSQL de domínio/sync passaram novamente; `node --check` e `git diff --check` passaram. Sem Browser QA e sem dados sintéticos persistidos.
- Registro detalhado: [Registro 0039](REGISTROS/0039.md). Plano e pendências atualizados; sem nova decisão arquitetural além das decisões de domínio aprovadas nesta tarefa.

## Atualização — Registro 0038 (2026-10-04)

- F1.1 concluída: [MODELO_DADOS.md](MODELO_DADOS.md) mapeia entidades, campos conhecidos/desconhecidos, authority CRUD/tombstone, IndexedDB, PostgreSQL/API/sync, IDs/revisões/relations/constraints/indexes, offline/conflict/legacy, sensibilidade e retenção.
- Restaurante: `codex/setup-workflow`, HEAD `3efe7c3c8bb866d8c028a91ada00d03efa346914` (base `09f0c8c` + correção `3efe7c3`); DB_VERSION 4→6 com registry explícito e índices secundários não únicos.
- Motoboy: `codex/setup-workflow`, HEAD `a99356e1472e94b958c63bbebe985d3505bc4fa7` (base `f852b6d` + correção `a99356e`); DB_VERSION 5→7 com registry, índices e atualização do cache/service worker. Os upgrades não regravam/apagam registros; marker fica em meta e erro aborta versionchange transaction.
- PostgreSQL oficial 18.6 verificado read-only/status via `rotamoto_migrator`; migrations 0001–0008 aplicadas. Nenhum dado/schema/role foi alterado. Nenhuma migration PostgreSQL nova; domínio permanece JSONB enquanto campos/consultas não justificarem normalização. CONTRACT/contract.js permaneceram idênticos nos dois repos.
- Testes dirigidos: migration registry em ambos; lifecycle storage Motoboy; `node --check` dos JS/testes/service worker alterados; validação package JSON e `git diff --check` passaram. Sem `npm test` amplo, `test:postgres` amplo ou Browser QA. Banco local real/browser não foi aberto.
- F1 está **parcial**, não concluída: além de Route→Delivery, schema de algumas entidades e retenção, exports atuais são parciais e restore seguro de estado sync precisa semântica/testes. Próximo bloco permanece F1.2, sem iniciar F2. Ver [Registro 0038](REGISTROS/0038.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).

## Atualização — Registro 0037 (2026-10-04)

- Foi criado [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md) como fonte de verdade para concluir os dois aplicativos. Reconcilia DEC-0002–0006, Registros 0001–0036, contrato, código, IndexedDB estático, migrations 0001–0008, catálogo PostgreSQL read-only, API, integrações e UI.
- Restaurante: `codex/setup-workflow` @ `df562f7fd26fb93a2f3c857234987fa1d34800c9`, árvore limpa; baseline `v5.50-ui-mobile-fix5` peel `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`. Motoboy: `codex/setup-workflow` @ `6a1574f6a72e5ed87b0b8cbf16a3c90533d68b22`, árvore limpa; baseline `v39.6-ui-mobile-fix2` peel `79c527b59d32d8b55236c62042acb868166ed4ad`.
- PostgreSQL oficial 18.6 em `127.0.0.1:5432/rotamoto`; migrations 0001–0008 aplicadas. Catálogo read-only: 20 tabelas, 12 tenant-scoped com RLS ENABLE/FORCE, 50 índices, 258 constraints catalogadas. Nenhuma alteração no banco.
- Nenhuma alteração nos aplicativos, `main`, tags ou baselines. Sem Browser QA, QA end-to-end ou suites amplas. Sync/reconciliação 0034–0036 foi aceito como concluído, sem reimplementação.
- Ordem planejada: F1 modelo de dados; F2 backend/API; F3 identidade; F5/F6 fluxos dos apps; F4 integrações em paralelo; F7 UX; F8 produção; F9 QA final. Primeiro bloco recomendado: matriz por entidade/campo entre CONTRACT, IndexedDB dos dois apps, PostgreSQL/API e fixtures legadas, antes de migrations.
- Ver [Registro 0037](REGISTROS/0037.md). Commit somente no histórico; sem push.

## Atualização — Registro 0036 (2026-10-04)

- Restaurante: `codex/setup-workflow`, commit `df562f7fd26fb93a2f3c857234987fa1d34800c9` após `de53138cf68a4abba42530158fb793064e85069f`; sync agora reconcilia pull canônico em Inbox e projeções IndexedDB, preservando conflitos/edições locais.
- Motoboy: `codex/setup-workflow`, commit `6a1574f6a72e5ed87b0b8cbf16a3c90533d68b22` após `1eb7e6ae2a1fea31dd7e10e72c52892cd1ce5fae`; Delivery atribuída, Order, eventos, provas, pontos e earnings recebidos são associados às projeções/cache sem duplicar eventos ou substituir execução pendente.
- ACK por operação diferencia accepted/duplicate/rejected/conflict; IDs/revisões canônicos e estado são persistidos. Outbox mantém retry de rede e não repete automaticamente a mesma rejeição/conflito. Sync calcula status, restaura sessão existente, renova CSRF em caso de concorrência entre abas, serializa e continua paginação limitada.
- `npm test` passou nos dois apps; `npm run test:postgres` passou no Restaurante contra PostgreSQL oficial (migrations/RLS, identidade/CSRF/tenant e sync canônico). Syntax checks e `git diff --check` passaram também após correção de paginação. Sem Browser QA, conforme solicitado.
- Sem login visual/owner operacional enquanto MFA e identidade operacional não existirem; contrato ainda não define vínculo Route→Delivery; QA end-to-end via CDP fica para etapa posterior. Email, domínio/TLS e integrações externas permanecem dependências externas.
- `main` e baselines permanecem inalteradas; sem push. Detalhes no [Registro 0036](REGISTROS/0036.md).

## Atualização — Registro 0035 (2026-10-04)

- Restaurante: branch `codex/setup-workflow`, commit `78e10f2217edc053e2d0193b1b297d7e7fc16bd3`; árvore limpa. Migration 0008 associa instalação sync à identidade que a registrou. Serviço impõe ownership por entidade/campo, revisão canônica e ACK por operação; `source.app` não seleciona autoridade.
- Motoboy: branch `codex/setup-workflow`, commit `d88aeea9cbfedfa2e7e0e46e2437fec39155e5f2`; árvore limpa. Transporte Local-First envia fatos de execução/localização/provas, sem publicar Delivery, Earning ou dados administrativos como canônicos.
- `CONTRACT.md` e `contract.js` estão sincronizados. Restaurante escreve Order/Earning/Route/Driver e planejamento/cancelamento de Delivery; Motoboy escreve eventos de execução, LocationPoint e DeliveryProof. `DeliveryEvent` é imutável/idempotente. ACK individual distingue accepted/duplicate/rejected/conflict; retry usa IDs/revisões, sem LWW.
- Ambos preservam IndexedDB/outbox/inbox/syncState e operação offline. ACK só é aplicado após resposta; pull é keyset e cacheado sem sobrescrever projeções locais. Login/CSRF existem como helpers de sync, mas não há fluxo visual de login; merge de snapshots ao modelo da UI ainda requer reconciliação que preserve alterações pendentes. Sem Browser QA.
- `npm test` passou em ambos; `npm run test:postgres` passou no Restaurante contra PostgreSQL oficial; migration status confirma 0001–0008. Sintaxe JS e `git diff --check` passaram. Nenhum dado sintético persistiu.
- `main` permanece Restaurante `8fcd9f0ffffe37047a79834161cc1f791f20d76f` e Motoboy `aad1c6c07499e4fdf5c931ce5ce9e92cde3f7478`; baselines preservadas em `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e `79c527b59d32d8b55236c62042acb868166ed4ad`. Sem push. Detalhes em [Registro 0035](REGISTROS/0035.md).

## Atualização — Registro 0034 (2026-10-03)

- Restaurante: `codex/setup-workflow`, commit `e3e0656` (`feat(sync): add canonical tenant domain API`), árvore limpa após commit. Migrations `0005`–`0007` aplicadas pelo migrator no PostgreSQL oficial; `migrate.js status` confirma 0001–0007 aplicadas.
- Schema inclui `sync_installations` e `domain_records` canônicos, relações/aliases tenant-scoped, idempotência por pacote/evento, FK/checks/índices, RLS ENABLE/FORCE e grants runtime mínimos. API loopback `POST /api/sync/push` e `GET /api/sync/pull` usa sessão/RBAC `sync.push`/`sync.pull`, CSRF e tenant derivado server-side.
- `npm run test:postgres` e `npm test` Restaurante passaram; `npm test` Motoboy passou; checks de sintaxe e `git diff --check` passaram. Fixtures do novo teste PostgreSQL foram revertidas; nenhum dado sintético permaneceu. Sem Browser QA.
- Motoboy não foi alterado: branch `codex/setup-workflow`, HEAD `c0e019d607a0e713f308447e4581ef60e09ddf6e`, árvore limpa.
- PostgreSQL confirmado: 18.6, `rotamoto_app` em database `rotamoto`; `rotamoto_migrator` executou migrations. Nenhuma alteração administrativa de roles/ownership/grants foi feita nesta execução.
- Restaurante `main` preservada em `8fcd9f0ffffe37047a79834161cc1f791f20d76f`; baseline `v5.50-ui-mobile-fix5` em `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`. Motoboy `main` preservada em `aad1c6c07499e4fdf5c931ce5ce9e92cde3f7478`; baseline `v39.6-ui-mobile-fix2` em `79c527b59d32d8b55236c62042acb868166ed4ad`. Nenhuma tag/branch protegida ou contrato foi alterado; sem push.
- Limites: os apps ainda não chamam a API; ownership por campo de Delivery e ack/retention não estão definidos; `Earning` diverge entre o dono financeiro no contrato e o pacote Motoboy; source.app é metadado cliente. Detalhes e próximos passos em [Registro 0034](REGISTROS/0034.md).

## Atualização — Registro 0033 (2026-10-03)

- Restaurante: `codex/setup-workflow`, HEAD `c96907bc46165ec8ff2f7dda721bdc6b8160b0a2`, árvore limpa; commit `fix(db): enforce dedicated migration role`. `main` permanece `8fcd9f0ffffe37047a79834161cc1f791f20d76f`; baseline `v5.50-ui-mobile-fix5` continua no SHA `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- O checkpoint completo foi validado e o script administrativo do Registro 0032 foi executado manualmente com sucesso pelo operador DBA. Não foram usados `u0_a436`, sua senha ou `.pgpass` por esta execução; conexões foram somente como `rotamoto_app`/`rotamoto_migrator` via mecanismo existente.
- Catálogo PostgreSQL 18.6 confirma: database `rotamoto` owned pela role DBA de emergência; schema, 18 tabelas e duas funções owned por `rotamoto_migrator`; ambas roles LOGIN sem SUPERUSER/CREATEDB/CREATEROLE/BYPASSRLS. Runtime tem CONNECT/USAGE e DML explícito, sem CREATE/TEMP/DDL, sem `schema_migrations`, sem DELETE/TRUNCATE e sem UPDATE/DELETE de auditoria. Migrator pode criar objetos e ler o ledger.
- Dez policies tenant permanecem com RLS ENABLE/FORCE. Trigger append-only de `audit_log` rejeitou UPDATE e DELETE; runtime default-deny e cross-tenant também passaram. ACL padrão global foi ajustada para que funções futuras do migrator não recebam EXECUTE de PUBLIC.
- Runner usa `MIGRATOR_DATABASE_URL` e confere role/destino/conexão; servidor usa `DATABASE_URL` como `rotamoto_app`, valida loopback e faz preflight de `current_user`. `npm run test:postgres`, `node tests/test-server-security.js`, `migrate.js status`, smoke HTTP (health 200 e login sintético 401 esperado), `node --check` dos JS alterados e `git diff --check` passaram. Suites reverteram fixtures; nenhuma conta/tenant de teste foi mantida. Não foi executada bateria ampla nem Browser QA.
- Motoboy permaneceu sem alteração em `codex/setup-workflow`, HEAD `c0e019d607a0e713f308447e4581ef60e09ddf6e`, árvore limpa; baseline permanece `79c527b59d32d8b55236c62042acb868166ed4ad`. Sem push.
- Após revisar DEC-0002 e pendências, nenhum bloco subsequente foi implementado: owner real depende de adapter/prova de titularidade, email e MFA/KMS; integrações e sync/import dependem dessas capacidades e do contrato/rollout Local-First. Serviço permanece loopback. Ver [Registro 0033](REGISTROS/0033.md).

## Atualização — Registro 0032 (2026-10-03)

- Restaurante: preparação versionada para split DBA/migrator/runtime commitada como `70e42e0` em `codex/setup-workflow`. Inclui script SQL administrativo ainda não executado, runbook de backup/execução manual/validação/rollback e ajuste documental; nenhuma migration foi alterada.
- Auditoria PostgreSQL foi somente leitura via `rotamoto_app`: database/schema/18 tabelas ainda pertencem ao runtime; duas funções e trigger; nenhuma sequence/default ACL customizado; dez tabelas continuam RLS `FORCE`. `u0_a436` aparece como superuser nos catálogos, mas não foi autenticado nem teve senha solicitada/lida.
- Script atribui database ao DBA, objetos de `rotamoto` ao futuro `rotamoto_migrator`, e grants DML específicos ao HTTP `rotamoto_app`. Script não executado: checkpoint completo, configuração segura da senha do migrator e verificações pós-split continuam pendentes.
- `node --check backend/postgres/migrate.js` e `git diff --check` passaram; sem testes amplos/browser. O harness `test:postgres` ainda mistura conexão migration e runtime. Motoboy não mudou; baselines e `main` intactas. Ver [Registro 0032](REGISTROS/0032.md).

## Atualização — Registro 0031 (2026-10-03)

- Restaurante e Motoboy permanecem limpos em `codex/setup-workflow`, nos HEADs `7403ab9736775f078c7ec40c7a9312d1c03d94c9` e `c0e019d607a0e713f308447e4581ef60e09ddf6e`. Nenhum commit de aplicativo foi criado.
- PostgreSQL oficial 18.6 em `127.0.0.1:5432/rotamoto` aceita conexão por `.pgpass` somente como `rotamoto_app`. Essa role não é superuser, não cria roles, não faz bypass de RLS, mas é owner do database/schema/tabelas e tem `CREATE` no database/schema.
- Não há credencial DBA disponível no `.pgpass`. O dump completo foi bloqueado por RLS forced em `audit_log`; o artefato parcial foi marcado `.incomplete`. Dump somente de schema foi validado, mas não constitui checkpoint de dados.
- Nenhuma role/grant/ownership, migration, configuração PostgreSQL, código, main ou baseline foi alterada. `migrate.js status` e conexão Node da aplicação passaram; separação de privilégios permanece bloqueada até acesso DBA seguro e checkpoint completo. Detalhes no [Registro 0031](REGISTROS/0031.md).

## Atualização — Registro 0030 (2026-10-03)

- Restaurante: `codex/setup-workflow`, HEAD `7403ab9736775f078c7ec40c7a9312d1c03d94c9`, árvore limpa após commit. Migration `0004_foundation_integrity_constraints` aplicada ao PostgreSQL oficial; nenhuma migration anterior foi editada.
- Validação cobriu 17 tabelas de domínio, 25 FKs, 10 tabelas RLS forçadas, checksums, migrations ausentes, lock concorrente, reexecução idempotente, rollback de DDL e clean install em schema temporário revertido. `npm run test:postgres`, `npm test`, syntax checks e `git diff --check` passaram.
- PostgreSQL 18.6 continuou em `127.0.0.1:5432`/`rotamoto`, conexão `rotamoto_app` via `.pgpass`; nenhuma role, privilégio, ownership ou configuração foi alterada. Nenhum dado sintético permaneceu.
- Lacuna crítica: `rotamoto_app` é proprietário do database, schema e das tabelas; owner pode mudar policies/triggers e RLS. Separação entre runtime e migration/owner requer operação administrativa de ownership/grants, não permitida nesta etapa. Portanto a fundação não está pronta para exposição nem para fases operacionais que dependam dessa fronteira.
- Motoboy permaneceu limpo em `codex/setup-workflow`, HEAD `c0e019d607a0e713f308447e4581ef60e09ddf6e`. Baselines e `main` dos aplicativos permaneceram intactas; sem push.

## Atualização — Registro 0029 (2026-10-03)

- Restaurante: branch `codex/setup-workflow`, HEAD `014c286c1957c77a687d4bcfb0d0f1a666b408ad`, árvore limpa após commit. API HTTP de identidade montada no servidor loopback; endpoints e controles estão detalhados no [Registro 0029](REGISTROS/0029.md).
- A camada HTTP conecta-se ao PostgreSQL oficial 18.6 em `127.0.0.1:5432`, banco `rotamoto`, usuário `rotamoto_app`, usando `.pgpass`. Fixtures sintéticas foram revertidas; queries posteriores confirmaram zero tenants/usuários de teste persistidos.
- Argon2id usa `argon2` 0.45.1 compatível com Node >=18; addon compilado no Termux. `npm test`, `npm run test:postgres`, HTTP direcionado, `npm audit --omit=dev`, sintaxe JS e `git diff --check` passaram. Smoke do servidor: health 200 e sessão anônima 401.
- Motoboy permaneceu sem alteração em `codex/setup-workflow`, HEAD `c0e019d607a0e713f308447e4581ef60e09ddf6e`. Baseline Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e `main` `8fcd9f0ffffe37047a79834161cc1f791f20d76f` intactos; sem push.
- Provisionamento real continua fechado sem adapter de operador, prova de titularidade, email, HTTPS e MFA/KMS. Não há UI/browser flow integrado; sessão de owner permanece bloqueada por MFA obrigatória. O rate limit é local por processo/socket; proxy/múltiplas instâncias exigem configuração explícita antes do deploy.

## Atualização — Registro 0028 (2026-10-03)

- Restaurante: branch `codex/setup-workflow`, HEAD final `5c6e9b4fc64bfad62d7011c14135fa273ae80788`; commits `f521431310a0bc29c4a21f6b9f1d354ff3c7e875` (serviços de identidade) e `5c6e9b4fc64bfad62d7011c14135fa273ae80788` (cobertura de expiração de sessão); árvore limpa.
- PostgreSQL oficial 18.6/`rotamoto` em `127.0.0.1:5432`, usuário `rotamoto_app` por `.pgpass` modo 600; migrations 0001–0003 aplicadas. Testes transacionais foram revertidos; tabelas de tenant, conta, token, sessão e auditoria sem registros sintéticos persistidos.
- Provisionamento, Argon2id, convite/verificação, recovery, sessão/CSRF, RBAC e contexto RLS estão implementados como serviços internos e passaram testes. Não existe endpoint/API conectado; autorização real de provisionador, email/HTTPS e MFA/KMS faltam. Identidade requer Node >=24.7 por `crypto.argon2` release-candidate; o serviço existente declara Node >=18.
- `npm test`, `npm run test:postgres`, syntax checks, `git diff --check` passaram nos apps. Motoboy permaneceu sem mudança. Audit: Restaurante offline zero vulnerabilidades (online sem DNS); Motoboy online zero.
- Baselines e `main` não mudaram; sem push. Detalhes em [Registro 0028](REGISTROS/0028.md).

## Atualização — Registro 0027 (2026-10-03)

- Restaurante: commit `a82160037e4538525e398db70d25aef4165e1c38` em `codex/setup-workflow`; schema/migration DEC-0002 Fase 1 aplicado no PostgreSQL oficial 18.6 em `127.0.0.1:5432`, banco `rotamoto`, usuário `rotamoto_app` via `.pgpass`. Não foram criadas contas/tenants ou endpoints de login/API.
- Motoboy permaneceu sem alterações nesta execução em `codex/setup-workflow`, HEAD `c0e019d607a0e713f308447e4581ef60e09ddf6e`. O Restaurante está em `codex/setup-workflow`, HEAD final `a82160037e4538525e398db70d25aef4165e1c38`.
- `npm test` passou nos dois; PostgreSQL migration/RLS, sintaxe JS, `git diff --check`, `npm audit` e Browser QA desktop/tablet/mobile passaram. Captura sintética de câmera e finalização Motoboy com assinatura sobreviveram ao reload. Varredura não encontrou novo bug de aplicação.
- Baselines continuam Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad`; `main` inalterada; sem push. Fase 2 depende de prova operacional de titularidade e serviço de email; KMS/secret manager e demais fases também permanecem pendentes. Veja [Registro 0027](REGISTROS/0027.md).

## Atualização — Registro 0026 (2026-10-03)

- Motoboy: correção da concorrência entre abas commitada como `c0e019d607a0e713f308447e4581ef60e09ddf6e` em `codex/setup-workflow`; HEAD final `c0e019d607a0e713f308447e4581ef60e09ddf6e`, árvore limpa. Web Lock exclusivo protege snapshot persistido/rebase dos comandos; dois ajustes concorrentes sobreviveram ao reload em Chromium/CDP.
- `npm test`, `node --check app.js` e `git diff --check` passaram no Motoboy. `npm test` e `git diff --check` passaram no Restaurante, que permaneceu sem alteração em `3b12dec0923c779a4745d1a834c2bbf6b40b1f2f`.
- Baselines Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad` e Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e os respectivos `main` não foram alterados. Sem push. Suporte Web Locks nos browsers-alvo e pendências DEC-0002/câmera/GPS continuam abertas. [Registro 0026](REGISTROS/0026.md).

## Atualização — Registro 0025 (2026-10-03)

- Branches locais `codex/qa-functional-2026-10-03` removidas dos dois aplicativos após confirmar que todo o conteúdo estava preservado em `codex/setup-workflow`. No Restaurante, o commit QA `36b05e8` tem patch/tree idênticos ao cherry-pick `3b12dec`; no Motoboy, ambas as branches apontavam para `b57afc2`.
- Branches remotas QA não existiam. Estado final limpo em `codex/setup-workflow`: Motoboy HEAD `b57afc2ae5c82ad0ae65a4857c59e95581ed809d`; Restaurante HEAD `3b12dec0923c779a4745d1a834c2bbf6b40b1f2f`.
- Baselines Motoboy `79c527b59d32d8b55236c62042acb868166ed4ad` e Restaurante `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e os respectivos `main` não foram alterados. Sem push. Detalhes: [Registro 0025](REGISTROS/0025.md).

## Atualização — Registro 0024 (2026-10-03)

- A tag anotada Motoboy `v39.6-ui-mobile-fix2` tem ref/tag object `d5b8f463f9daec615fecf1b01ff7f61533fd1827`; seu commit após peel, que é o SHA real da baseline, é `79c527b59d32d8b55236c62042acb868166ed4ad`.
- O checkout estava limpo na branch `codex/qa-functional-2026-10-03`. A verificação foi somente leitura; nenhum arquivo, branch ou tag do aplicativo foi alterado. Ver [Registro 0024](REGISTROS/0024.md).

## Atualização — Registro 0023 (2026-10-03)

- Correção de QA Restaurante `36b05e830ceb9c36e964207ecc83ac4731f4a572` consolidada por cherry-pick em `codex/setup-workflow`; HEAD final `3b12dec0923c779a4745d1a834c2bbf6b40b1f2f`. Cherry-pick sem conflito; `npm test`, `node --check app.js` e `git diff --check` passaram.
- Baseline `v5.50-ui-mobile-fix5` continua no commit `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` (ref anotada `9ebb7098725200bdec82e79be1e9ea622fe20120`). `main` e tags não foram alteradas; sem push. Detalhes: [Registro 0023](REGISTROS/0023.md).

## Atualização — Registro 0022 (2026-10-03)

- QA Chromium/CDP nos dois apps em desktop, tablet e mobile. Restaurante corrigido para exibir integralmente ações/QR da tabela completa e manter o título do modal acima do cabeçalho fixo. Motoboy não exigiu mudança.
- Commit Restaurante `36b05e830ceb9c36e964207ecc83ac4731f4a572`, branch `codex/qa-functional-2026-10-03`; sem push. Motoboy permaneceu limpo em `b57afc2ae5c82ad0ae65a4857c59e95581ed809d` na branch `codex/qa-functional-2026-10-03`.
- `npm test`, `node --check app.js` e `git diff --check` passaram nos dois repositórios. Regressão de fluxos corrigidos repetida via CDP.
- Baselines `v5.50-ui-mobile-fix5` e `v39.6-ui-mobile-fix2` permanecem inalteradas e ancestrais dos respectivos HEADs. Câmera não existe no runtime Chromium; validação de finalização/assinatura Motoboy dependente de GPS não pôde ser concluída de modo confiável. Ver [Registro 0022](REGISTROS/0022.md).

## Atualização — Registro 0021 (2026-10-03)

- A infraestrutura compartilhada `~/projetos/browser-tests/run-qa-infra.sh` foi criada e commitada no workspace de browser testing como `8a2d463`.
- Diagnóstico inicial identificou Chromium/CDP e servidores locais ausentes. A execução validada usa Chromium `149.0.7827.155`, CDP em `127.0.0.1:9222`, Restaurante em `8788` e Motoboy em `8789`, com `--disable-gpu` para contornar instabilidade de GPU no Termux/Android.
- Navegação real via CDP confirmou acesso aos dois aplicativos. Chromium/CDP e servidores temporários foram encerrados corretamente após o uso.
- Nenhum aplicativo ou baseline foi alterado. A limitação de Chromium/GPU no Termux/Android permanece; consulte o [Registro 0021](REGISTROS/0021.md).

## Atualização — Registro 0020 (2026-10-03)

- Histórico mais recente: Registro 0020. Validação somente leitura dos aplicativos; nenhum arquivo de aplicação foi alterado.
- Restaurante: branch `codex/setup-workflow`, HEAD `b1ef1bcc47e8294cc15dbc83e4f5f63add14d231`, worktree limpo. Baseline `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`, ancestral do HEAD.
- Motoboy: branch `codex/setup-workflow`, HEAD `b57afc2ae5c82ad0ae65a4857c59e95581ed809d`, worktree limpo. Baseline `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`, ancestral do HEAD.
- `npm test` passou nos dois aplicativos. Browser QA bloqueado: CDP em `127.0.0.1:9222` retornou `ECONNREFUSED`.
- Nenhuma implementação da Fase 1 foi realizada. Segundo DEC-0002, ela cobre schema/migrations PostgreSQL para identidade, tenant, sessão, roles/permissões, integrações e mapeamento de IDs. O roadmap posterior de persistência do Restaurante é complementar e não substitui essa definição.

## Identidade e autorização do backend futuro

- O Restaurante ainda não tem autenticação real, credenciais de usuário, sessões ou membership no backend. `users`, `profiles`, `companies`, permissões e `currentUserId` são estado local no IndexedDB e não são autoridade de segurança.
- O contrato compartilhado atual é Local-First e orientado a dados de domínio; esta análise não o alterou. Recomendações ainda não foram aprovadas como decisões de implementação.
- Registro 0004 contém análise e fontes consultadas; decisões pendentes sobre onboarding, credenciais, permissões, integração, IDs e offline estão em `PENDENCIAS.md`.

## RotaMoto Motoboy

- **Baseline:** tag `v39.6-ui-mobile-fix2`, commit `79c527b59d32d8b55236c62042acb868166ed4ad`; tag preservada.
- **Branch atual:** `codex/setup-workflow`.
- **Último commit:** `4b4fd6acf137134b38ed6d37c992c7aee2199c6a` — `fix(settings): serialize transactional settings updates` (Registro 0018).
- **Situação do worktree:** limpo após Registro 0018.
- **Funcionalidades relevantes:** README descreve finalização de corrida protegida por assinatura do cliente, slider de confirmação, persistência da assinatura/horário e validação de distância/GPS. `AGENTS.md` descreve aplicativo web do entregador e estratégia local-first com IndexedDB.
- **Pendências conhecidas:** nenhuma listada em `PENDENCIAS.md` nem encontrada nas seções consultadas dos documentos do projeto; não é afirmação de ausência absoluta de trabalho futuro.
- **Testes disponíveis:** `npm test` executa contratos/fluxos de sync, ciclo de vida de storage, persistência de pacotes, comandos e exclusão; passou no Registro 0018. `tests/test-command-persistence.js` verifica estruturalmente commit/erro/fila dos comandos locais.
- **Infraestrutura de browser testing:** instruções documentam Chromium/CDP e workspace compartilhado. Situação corrente detalhada em “Infraestrutura”.

## RotaMoto Restaurante

- **Baseline:** tag `v5.50-ui-mobile-fix5`, commit `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; HEAD está seis commits à frente. Tag não alterada. (O Registro 0001 tinha referência abreviada incorreta; este hash foi conferido diretamente na tag.)
- **Branch atual:** `codex/setup-workflow`.
- **Último commit conhecido:** `133da3d0bc9ec953e4175e5bbb40a89abb5cd2ba` — `fix(server): return 413 for oversized request bodies` (2026-10-01).
- **Situação do worktree:** limpo após Registro 0006; nenhum arquivo staged, unstaged ou não rastreado.
- **Funcionalidades relevantes:** README descreve painel de restaurante, origens de pedidos e laboratório local-first para integrações incluindo iFood, 99Food e Keeta; `AGENTS.md` documenta contrato de dados e integrações desacopladas.
- **Pendências conhecidas:** nenhuma listada em `PENDENCIAS.md` nem encontrada nas seções consultadas dos documentos do projeto; não é afirmação de ausência absoluta de trabalho futuro.
- **Testes disponíveis:** scripts `npm test` (auditoria, integrações, segurança do servidor, sync, billing e iFood), `npm run test:sync` (contrato e fluxos de sync) e `npm run check` (sintaxe do `server.js`). Arquivos listados em `tests/`: audit, integrations, server-security, sync-adversarial, sync-contract e sync-flows. Também existem `test-billing.js` e `test-ifood.js` referenciados pelo script. Nada foi executado nesta leitura.
- **Infraestrutura de browser testing:** instruções documentam Chromium/CDP e workspace compartilhado. Situação corrente detalhada em “Infraestrutura”.

## Infraestrutura

- **Termux:** caminhos observados estão sob `/data/data/com.termux/files/home`; versão não verificada.
- **Node/npm:** Node `v26.4.0`, npm `11.20.0` no ambiente desta leitura. Restaurante declara requisito Node `>=18`.
- **Browser testing compartilhado:** `~/projetos/browser-tests` existe; pacote declara `chrome-remote-interface ^0.34.0`, resolvível em `node_modules`. `scripts/` existe, sem arquivos. O `package.json` do workspace tem somente script `test` sem testes configurados.
- **Chromium:** `$PREFIX/lib/chromium/chrome` existe e é executável; `--version` informou `Chromium 149.0.7827.155`.
- **CDP em localhost:9222:** nenhum processo Chromium com porta de depuração foi encontrado; consulta a `http://127.0.0.1:9222/json/version` falhou com conexão recusada (HTTP 000). Portanto, binário e cliente estão instalados, mas não havia sessão CDP ativa. Nenhum browser testing foi executado.
- **PHP / PostgreSQL / Nginx / SSH:** situação não verificada.
- **Codex:** utilizado nesta interação; versão/runtime não inspecionado.
- **Demais componentes:** não verificados; não presumir instalação, execução ou configuração ativa.

## Auditoria Git — Registro 0005

- Restaurante: `codex/setup-workflow`, HEAD `133da3d0bc9ec953e4175e5bbb40a89abb5cd2ba`, sete commits após `v5.50-ui-mobile-fix5`; worktree limpo.
- Motoboy: `codex/setup-workflow`, HEAD `6ccd8b9059c6fa5bc4ac7165c762a5f094ee750e`, quatro commits após `v39.6-ui-mobile-fix2`; worktree limpo.
- Registro 0006: auditoria funcional/de sync/segurança encontrou defeito médio no limite de 1 MiB do corpo HTTP do Restaurante; fix commitado e coberto por teste. Suíte completa e `node --check server.js` passaram. Testes do Motoboy e `node --check app.js` passaram. Nenhum browser test foi necessário para a mudança backend.
- As tags baselines continuam apontando para os commits `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc` e `79c527b59d32d8b55236c62042acb868166ed4ad`; worktrees limpos e nenhum push realizado.

## Atualização — Registro 0007

- Motoboy: branch `codex/setup-workflow`, HEAD `ec668b19265e70c9f039956668a36355f040a472` (`fix(storage): persist rider state atomically`), worktree limpo. Persistência de `races`, `deliveries` e `meta.settings` agora é atômica numa transação multi-store; falhas do IndexedDB propagam ao chamador.
- Restaurante: sem alterações; branch `codex/setup-workflow`, HEAD `133da3d0bc9ec953e4175e5bbb40a89abb5cd2ba`, worktree limpo.
- Baselines verificadas sem alteração: Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`.
- Registro 0007 executou testes de sync e sintaxe no Motoboy e a suíte completa/check no Restaurante; nenhum browser QA. Nenhum push.

## Atualização — Registro 0008

- Histórico mais recente: Registro 0008.
- Motoboy: branch `codex/setup-workflow`, HEAD `b150b73f4f97fc8dd4ca88be9a750be2a5e453b8` (`fix(sync): persist rider events with state atomically`), worktree limpo. A transação que salva corrida e projeção agora também salva `deliveryEvents` e `outbox` nas transições operacionais; falhas do IndexedDB propagam e restauram o estado em memória. `npm test` executa os três testes de sync existentes.
- Restaurante: sem alterações; branch `codex/setup-workflow`, HEAD `133da3d0bc9ec953e4175e5bbb40a89abb5cd2ba`, worktree limpo. Suíte e check passaram.
- Baselines preservadas: Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`; Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- Nenhum push; browser QA e chamadas reais a provedores externos não foram realizados.

## Atualização — Registro 0009

- Histórico mais recente: Registro 0009. DEC-0002 adota a arquitetura de identidade/tenant e o plano faseado. As pendências agora são implementação dependente de PostgreSQL, secret manager/KMS e entrega de email.
- Restaurante: branch `codex/setup-workflow`, HEAD `3a0ed99c0a1db9b50d19711f0fed2502be4360a2` (`fix(security): restrict unauthenticated service to loopback`), worktree limpo. O servidor recusa inicialização com HOST não-loopback enquanto não existe autenticação humana/tenant.
- Motoboy: sem alteração nesta etapa; branch `codex/setup-workflow`, HEAD `b150b73f4f97fc8dd4ca88be9a750be2a5e453b8`, worktree limpo.
- Baselines permanecem inalteradas: Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`.
- Testes dos dois projetos e `git diff --check` passaram. Nenhum push, browser QA ou chamada real a provedor externo.

## Atualização — Registro 0010

- Motoboy: branch `codex/setup-workflow`, HEAD `b150b73f4f97fc8dd4ca88be9a750be2a5e453b8`; sem alterações nesta etapa.
- Restaurante: branch `codex/setup-workflow`, HEAD `af711d39064c0e487e07f187720408434104ff80` (`fix(security): reject untrusted delivery status markup`), worktree limpo.
- Corrigido XSS armazenado: status desconhecido vindo de backup/import ou dados de integração não é mais devolvido como HTML; recebe rótulo fixo. Incluído teste de segurança com payload de markup.
- Baselines confirmadas sem alteração: Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`; Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- `npm test` nos dois apps, `npm run check` do Restaurante, verificações `node --check` e `git diff --check` passaram. Browser QA não executado conforme solicitado. Nenhum push.


## Atualização — Registro 0011

- Restaurante: branch `codex/setup-workflow`, HEAD `92ddb8df9a060446c098fb0edc0c0d121c5d6369` (`fix(sync): compare tombstones against staged deliveries`), worktree limpo. O recebimento agora compara tombstones também com gravações já preparadas no pacote, evitando que exclusão mais antiga vença entrega mais recente.
- Motoboy: branch `codex/setup-workflow`, HEAD `b150b73f4f97fc8dd4ca88be9a750be2a5e453b8`, worktree limpo; sem alteração nesta etapa.
- Baselines continuam preservadas: Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`.
- Testes completos dos dois apps, `npm run check` do Restaurante e verificações de sintaxe/diff passaram. Nenhum browser QA ou chamada externa. Push: NÃO.

## Atualização — Registro 0012

- Restaurante: branch `codex/setup-workflow`, HEAD `381ab17a8b9e430fb0bd485037eaf53213c0cbb7` (`fix(sync): make packet receipt idempotent in transaction`), worktree limpo. A checagem final de `syncReceipts` agora ocorre dentro da mesma transação readwrite que grava o conteúdo do pacote; chamadas concorrentes com o mesmo `packetId` não reaplicam o pacote.
- Motoboy: sem alteração nesta etapa; branch `codex/setup-workflow`, HEAD `b150b73f4f97fc8dd4ca88be9a750be2a5e453b8`, worktree limpo.
- Baselines preservadas e ancestrais dos HEADs: Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`; Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`.
- `npm test` nos dois aplicativos, `npm run check` do Restaurante, verificações de sintaxe e `git diff --check` passaram. Browser QA não executado conforme solicitado. Push: NÃO.

## Atualização — Registro 0013

- Motoboy: branch `codex/setup-workflow`, HEAD `50b9dff` (`fix(storage): recover IndexedDB connection lifecycle`), worktree limpo. `openDB()` agora limpa a Promise cacheada ao falhar, trata abertura bloqueada, fecha a conexão em `versionchange` e fecha uma conexão que abra após a falha por bloqueio. Suite dedicada cobre retry, troca de versão, bloqueio e sucesso tardio.
- Restaurante: sem alteração; branch `codex/setup-workflow`, HEAD `381ab17a8b9e430fb0bd485037eaf53213c0cbb7`, worktree limpo.
- Baselines inalteradas: Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`; Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- Testes completos dos dois aplicativos, `npm run check` do Restaurante, verificações de sintaxe, `git diff --check` e estados Git finais passaram. Nenhum browser QA ou push.

## Atualização — Registro 0014

- Motoboy: branch `codex/setup-workflow`, HEAD `c81d18b8614976b4b4353f4c7ee08174e8dd18a2` (`fix(storage): clear rider history atomically`), worktree limpo. Exclusão do histórico grava tombstones e limpa corridas, projeções e stores relacionados na mesma transação; memória/UI muda após o commit.
- Restaurante: branch `codex/setup-workflow`, HEAD `381ab17a8b9e430fb0bd485037eaf53213c0cbb7`, sem alteração e worktree limpo.
- Baselines preservadas: Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`; Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- Testes completos dos dois aplicativos, verificações de sintaxe relevantes e `git diff --check` passaram. Cobertura da garantia nova é estrutural, pois o ambiente Node não oferece IndexedDB nem simulador instalado. Nenhum browser QA ou push.

## Atualização — Registro 0015

- Histórico mais recente: Registro 0015. Branch `codex/setup-workflow` nos dois projetos; worktrees limpos após commits.
- Motoboy: HEAD `9b0a5acd5e9cad0055a946c92587ac12041ebcc9` (`fix(sync): apply rider packets atomically`). Recebimento de pacotes do Restaurante prepara `nextRaces`, grava projeções alteradas e recibo na mesma transação `races`/`deliveries`/`inbox`, e só atualiza memória/UI após `oncomplete`. Repetição consulta o recibo dentro da transação. `persistOnly` segue gravando `races`, projeções, settings e opcionalmente evento/outbox numa transação, mas chamadores gerais ainda mutam estado global antes de persistir.
- Restaurante: HEAD `b1ef1bcc47e8294cc15dbc83e4f5f63add14d231` (`test(sync): cover tombstone rollback on receipt`), após também `b721257e36af7c09038278c25b58562ca197c288` (`test(sync): exercise transactional packet recovery`). Recebimento existente já prepara staged writes e confirma domínio, tombstones, recibo e settings numa transação; memória e eventos de sucesso são publicados depois do commit. A cobertura executável inclui tombstone no rollback/retry/replay.
- Baselines verificadas como ancestrais dos HEADs e inalteradas: Motoboy `v39.6-ui-mobile-fix2` → `79c527b59d32d8b55236c62042acb868166ed4ad`; Restaurante `v5.50-ui-mobile-fix5` → `a5b81fed1b9eccfa18fa7f454e9e71813f52ffcc`.
- Suítes `npm test` de ambos, `npm run check` do Restaurante, `node --check` dos JS relevantes e `git diff --check` passaram. Os novos testes usam transação fake isolada nos testes e exercitam erro/abort depois de enfileirar gravações, rollback, retry e pacote repetido.
- Limitação: Node neste ambiente não oferece IndexedDB; os testes não provam escalonamento/browser, quota, upgrade bloqueado nem detalhes de abort nativos. Nenhum browser QA, chamada externa ou push foi realizado.


## Atualização — Registro 0016

- Motoboy: fronteira `commitRiderCommand` serializa comandos migrados e persiste snapshot antes de publicar estado/render. Cadastro/edição, iniciar, chegada, finalizar, problema, cancelamento e recálculo de taxas migrados. Teste estrutural cobre sucesso, falha e concorrência.
- Pendências remanescentes desta frente: ajustes gerais ainda mutam `state.settings` antes de persistir; exclusão de corrida grava tombstone separadamente; outros mutadores de rota/GPS seguem usando persistência sobre estado global já alterado.
- `node --check app.js`, `npm test` e `git diff --check` passaram. Runtime sem IndexedDB nativo; sem browser QA e sem push. HEAD `46844e1a6d4ee00b4fe86b939d08123d574a72e9` (`fix(race): serialize transactional race commands`); worktree limpo.


## Atualização — Registro 0017

- Motoboy: HEAD `9faa45fcb6f5ece8810f45ce8749dd679d873af1` (`fix(race): make deletion and tombstone atomic`), branch `codex/setup-workflow`, worktree limpo. Exclusão serializada agora confirma races/deliveries/settings e tombstone em transação única; backup/estado/UI só avançam após commit. A edição enfileirada após delete não recria a corrida.
- QA Chromium 149.0.7827.155 via CDP, viewport mobile 412×915: criação, edição, início, exclusão, leitura IndexedDB e reload controlado pelo service worker passaram; sem erro JS/IndexedDB ou HTTP local 4xx/5xx. QA browser concluído sem SIGKILL durante este registro. Mensagens de GPU fatal ocorreram no stderr somente ao encerrar Chromium voluntariamente após QA.
- `node --check app.js`, `node --check service-worker.js`, testes direcionados, `npm test` e `git diff --check` passaram. Sem push. Ajustes/autosave e outros mutadores continuam pendentes.


## Atualização — Registro 0018

- Motoboy: HEAD `4b4fd6acf137134b38ed6d37c992c7aee2199c6a` na branch `codex/setup-workflow`; worktree limpo. Baseline `v39.6-ui-mobile-fix2` (`79c527b59d32d8b55236c62042acb868166ed4ad`) preservada.
- Autosave e salvamento manual de ajustes, tema/idioma e fechamento diário usam `commitRiderCommand` através de `commitSettingsCommand`; os valores são aplicados ao snapshot enfileirado e a memória/UI só são publicadas após `persistOnly` confirmar. Recalculo de taxas usa as configurações candidatas. Falha mantém configuração anterior e restaura os controles; tiers permanecem rascunho até salvamento/autosave.
- `node --check app.js`, `node tests/test-command-persistence.js`, `npm test` e `git diff --check` passaram. Teste de persistência é estrutural; IndexedDB nativo não foi exercitado. Browser QA não executado conforme escopo. Nenhum push.


## Atualização — Registro 0019

- Varredura consolidada no Motoboy encontrou falhas de persistência em normalização inicial, distâncias/ordem de rota, GPS, importação e limpeza; também tombstones recebidos que não eram retidos e HTML que não escapava IDs/assinaturas importados. Correções usam a fila/snapshot e transações existentes.
- HEAD final `b57afc2ae5c82ad0ae65a4857c59e95581ed809d` (`fix(motoboy): consolidate remaining technical issues`); baseline `v39.6-ui-mobile-fix2` preservada; Restaurante sem alteração.
- `node --check app.js`, `npm test` e `git diff --check` passaram. Browser QA não executado. Uma limitação de concorrência entre abas independentes permanece documentada no Registro 0019.
## Atualização — Registro 0058 / fundação self-hosted (2026-10-05)

- Restaurante `codex/setup-workflow` @ `9a3c3a5`; Motoboy `codex/setup-workflow` @ `268c716144a7b740b38ae732e3ebd6a4a438a28e`. Sem push/main/tag/baseline.
- PASS: keystore local AES-GCM com scopes, primitives storage local/hash/limits, SMTP TLS adapter, primitives TOTP/recovery, backup writer filesystem e guia on-prem/VPS. Node >=24.7.
- OPEN interno: ligar upload/reading de mídia com auth/CSRF/RBAC/RLS e metadata PG; enrollment MFA com persistência/anti-replay/rate limit/auditoria/recovery; templates/URLs SMTP; UI de status/separação de configuração; backup criptografado/agenda/restore/retention/remote; rotação de master key. Recursos não integrados permanecem fail-closed.
- Sem migration ou mudança em PostgreSQL; nenhum write em `rotamoto`; lifecycle E2E com rollback passou. Browser não reaberto por ausência de mudança visual/regressão.
- `npm test` nos dois apps, guards/lifecycle, node checks, diff-check e audit passaram. Paridade PostgreSQL read-only e integration PG geral não conectaram devido URLs de auditoria ausentes.
- SMTP: self-host adapter disponível, integração final pendente. MFA: primitives nativas, enrollment pendente. DeliveryProof: store filesystem primitivo, API pendente. Backup: writer local, política/restore pendentes. Hardware câmera/GPS; iFood/99Food/Keeta externos.
- Não considerar production-ready on-prem ou cloud-ready até fechar os itens OPEN. Ver [Registro 0058](REGISTROS/0058.md).

## Atualização — Registro 0063 (2026-10-05)

Rehearsal real do backup PostgreSQL encerrado com PASS: backup `d5cf784a-027a-482f-a062-5d7d99506e7e` (SHA-256 `156bc40f195f3ebbdcff3d7b403e421f2ce11d85cbbcb563a52c61c012546470`) verificado e restaurado em `rotamoto_disposable_rehearsal`. Comparação read-only confirmou 21 relações, ledger 0001–0015, 13/13 RLS/FORCE, 13 policies e completude estrutural/contagens. `rotamoto` e `rotamoto_e2e` permaneceram intocados. Rehearsal de banco encerrado; instalação on-prem ainda **não** production-ready por falta de backup coordenado de mídia e smoke/provisioning operacional. Ver [Registro 0063](REGISTROS/0063.md).

## Atualização — Registro 0064 (2026-10-05)

Recovery coordenado PostgreSQL+DeliveryProof/filesystem implementado. Rehearsal real PASS em `rotamoto_disposable_rehearsal` com conjunto `2d72d436-9eee-4bed-b03c-61c653e2f54c`; 21 relações, migrations 0001–0015, 13/13 RLS/FORCE e 13 policies coincidiram. A origem tinha zero referências de mídia, portanto o componente de mídia real restaurou zero blobs; fixture de arquivo não foi gravada em `rotamoto`. `npm test`, E2E guards, audit e checks finais passaram. ON_PREM_PRODUCTION_READY permanece **NO**: falta ensaio não vazio em DB test-only autorizado, instalar paths/chave persistentes e cron/monitoramento, e passar smoke TLS/CA/proxy/SMTP/URL/readiness no host de deployment. Ver [Registro 0064](REGISTROS/0064.md).
## Atualização — Registro 0069 / inventário operacional Termux (2026-10-05)

- Inspeção read-only: PostgreSQL está ativo em loopback com data dir privado `0700`; TLS local está desligado. nginx ativo é default HTTP `localhost:8080` para conteúdo estático, sem proxy TLS para API; PHP-FPM é independente do Node e não aplicável. Serviço Node RotaMoto não estava ativo e readiness em 8787 indisponível.
- `npm run operator` reporta storage, SMTP, secrets/keystore, backup, chave e URL pública `not_configured`. Não há volumes convencionais de mídia/backup/keystore nem job recorrente comprovado. Configuração pgpass foi identificada somente por metadata `0600`; conteúdo nunca lido. Autenticação SQL `u0_a436` não estava disponível via mecanismo não interativo desta sessão e não foi contornada.
- FIXED: runbooks reconciliados com Registro 0068 e rotação atual do keystore; exemplo nginx passou a permitir upload de prova de 8 MiB com margem multipart. `npm test`, `npm audit --omit=dev` (0), node check e diff-check PASS.
- Restaurante `codex/setup-workflow` @ `c04bcdb3757a27ecd853c23ce7003431caad2ad4`; Motoboy `codex/setup-workflow` @ `9a1adfc445a0eb3d4bea83f1a15b701d804a8848`. Sem alteração de banco/ACL/migration/fixture; sem push.
- **ON_PREM_PRODUCTION_READY = NO.** Gates e ações do operador estão detalhados em [Registro 0069](REGISTROS/0069.md); recuperação 0068 continua encerrada e não foi repetida.

## Atualização — Registro 0068 / recovery PostgreSQL + mídia não vazio encerrado (2026-10-05)


## Atualização — Campanha 0121 (2026-10-09)

Cancelamento offline validado em Browser E2E com PostgreSQL E2E: estado canônico CANCELLED prevaleceu sobre três eventos atrasados, rejeitados como INVALID_TRANSITION e retidos para auditoria; sem pendências de retry, mas três conflitos seguem para revisão. Regressão 0120 Browser e `npm test` de ambos os apps passaram. Gates FIFO Browser multi-motoboy, concorrência completa de cancelamento, prova Browser e consumo pré-tenant simultâneo permanecem parciais; ver [Registro 0121](REGISTROS/0121.md). Oficial `rotamoto` permaneceu read-only. Política pós-coleta requer decisão operacional explícita.

## Atualização — Campanha 0122 (2026-10-09)

Implementação parcial de custódia/cancelamento/RETURN. Browser E2E autenticado comprovou cancelamento pelo Restaurante enquanto Motoboy estava offline após aceite/coleta/saída locais: PostgreSQL CANCELLED; três eventos locais preservados como conflitos, duas divergências auditadas; pending=0, conflicts=3; ambos os apps convergiram e refresh manteve CANCELLED. Migration 0041 foi aplicada somente no `rotamoto_e2e`; `rotamoto` permaneceu somente leitura na 0040. Serviço/UI de retorno foram preparados, mas a confirmação de entrega física pelo Motoboy ainda não existe; criação/posicionamento/recebimento não têm E2E. npm test dos dois apps, logistics/domain-sync PostgreSQL, tenant RLS, availability concurrency, lifecycle, identity HTTP e Browser do cenário acima passaram. Security parity read-only identificou diferença esperada 0040 oficial vs 0041 E2E. Incidente de preservação envolvendo dois PNG e WAL de perfil 0121 está documentado em [Registro 0122](REGISTROS/0122.md); execução final usou isolamento 0122.
## Atualização — Registro 0125 (2026-10-10)

- Campanha 0125 PARTIAL: corrigidos vínculo canônico Order↔Delivery no editor RETURN, contexto tenant da sessão e falsa asserção do runner sobre rejeições acumuladas.
- Browser autenticado comprovou coleta, cancelamento, decisão/criação RETURN e submissão da nova ordem; sync após reorganização ficou pendente e recebeu pull HTTP 429 sem ACK Route. Não comprovados append canônico final da rota, execução/receipt e convergência final.
- Route dirty e `buildPacket()` continham a edição, mas os POSTs `/sync/push` observados após submit tinham `routes: []`; pendência permaneceu e pull recebeu 429. Próxima ação: rastrear a seleção/reutilização de `queued.packet` no `performServerSync`, correlacionar packetId/snapshot/ACK e corrigir a divergência antes de repetir Browser.
- `npm test` dos dois apps, domain/logistics/lifecycle/tenant/availability/identity E2E e security parity READ ONLY passaram. Regressões Browser 0120/0121/0122 e concorrência RETURN específica não foram reexecutadas.
- Oficial `rotamoto` read-only em 0040; E2E `rotamoto_e2e` em 0041. Restaurante `c01b056`, Browser QA `435d615`/`96086de`, Motoboy sem alteração; apps não publicados.

## Atualização — Registro 0126 (2026-10-10)

- Campanha retomada dos diffs locais e evidências existentes, sem reiniciar do zero. A divergência Route dirty→pacote→payload foi corrigida; attempt-38 comprovou payload com ordem RETURN, ACKs aceitos nas revisões canônicas 4–6 e convergência PostgreSQL/Motoboy.
- Browser RETURN chegou à confirmação bilateral após execução offline; custódia original/RETURN terminou `RECEIVED`, uma RETURN vinculada, Motoboy sem pendências/conflitos. Regressões Browser 0120/0121/0122 passaram em tentativas isoladas.
- `npm test` em ambos apps, PostgreSQL sync/RETURN (incluindo HTTP 429), concorrência E2E independente, security parity read-only e checks JavaScript passaram. Na retomada, duas sessões HTTP/PostgreSQL confirmaram RETURN em corrida com chave igual e distinta; persistiu um único fato e o perdedor recebeu 409 por revisão antiga ou convergiu como duplicata.
- Banco oficial ficou read-only em migration 0040; `rotamoto_e2e` em 0041. Sem migration nova, deploy ou publicação de app. Todos os gates 0126 PASS; histórico publicado por fast-forward após inspeção.
- Ver [Registro 0126](REGISTROS/0126.md) e [Resumo 0126](RESUMOS/0126.md).

## Atualização — Auditoria 0127 (2026-10-10)

- Auditoria independente concluiu PARTIAL. Os apps seguem nos HEADs Restaurante `823b6d5` e Motoboy `290b044`; nenhum código de app foi alterado.
- RETURN bilateral, Route com ACK canônico, regressão 0120, npm test dos dois apps, segurança/RLS e paridade PostgreSQL 0040/0041 foram confirmados com evidências novas/execuções independentes.
- Não atribuir PASS irrestrito à concorrência: primeira execução falhou numa asserção dependente da ordem, segunda passou. Relatórios novos 0121/0122 carregam campanha 0124; teste de inventário de migrations tem baseline obsoleta (40 vs 46 tabelas).
- Revisão encontrou risco MÉDIO: ACK parcial/incompleto pode ser aceito e a outbox removida. Código permanece intacto; ver propostas e matriz em [Registro 0127](REGISTROS/0127.md).
- Banco oficial `rotamoto` verificado somente leitura em migration 0040; `rotamoto_e2e` em 0041. Não houve deploy nem publicação de aplicativos.

## Atualização — Campanha 0128 (2026-10-10)

- Correções dos achados 0127 registradas em [Registro 0128](REGISTROS/0128.md): ACK completo/identidade nos dois apps, versionamento local, Retry-After, concorrência determinística, inventário/RLS de migrations, proveniência dos runners e texto de ganho RETURN.
- `npm test` nos dois apps e suites PostgreSQL domain/identity/migrations, logistics, lifecycle, tenant RLS, security parity e privilégios passaram. Concurrency E2E passou em três execuções independentes.
- Browser RETURN attempt-03: 16 etapas, offline/reconexão, reorganização e receipt bilateral; 0120/0121/0122 passaram em novas execuções. Uma tentativa intermediária detectou `syncRetryAttempt` sem declaração; correção Motoboy `fc145d6` e repetição Browser passaram.
- Gate global: PARTIAL; ACK parcial coberto em helper/contrato e modelo de retomada, mas falta fault injection HTTP com IndexedDB real e reinício durante a resposta.
- Restaurante `95b85ae`; Motoboy `f12886a`/`fc145d6`; runners Browser `11c5b49`. Banco oficial read-only 0040; E2E 0041; nenhum deploy/publicação de app.
- Branch autorizada `codex/f9-browser-e2e-0057`; baselines/main/tags preservadas. Não iniciar 0129.
- Ver [Registro 0128](REGISTROS/0128.md) e [Resumo 0128](RESUMOS/0128.md).

## Atualização — Campanha 0136 — continuação multimotoboy (2026-10-10)

- Resultado **PASS para o critério da continuação**: três sessões Motoboy autenticadas em perfis independentes; três atribuições distintas FIFO via packet de pedidos da UI; aceite, coleta, saída, chegada, conclusão e retorno à fila comprovados em IndexedDB/PostgreSQL.
- Dispatch 429/503/timeout/desconexão manteve o mesmo packetId durável e convergiu após recuperação sem perda/duplicação. Reenvio foi idempotente; Tenant B recebeu 404 para Driver de Tenant A.
- RETURN bilateral concluiu e teardown autônomo encerrou Chromium por CDP com exit 0. DeliveryProof local preservado em falhas e retry confirmou prova única.
- `npm test` dos dois apps, PostgreSQL concurrency 3/3, tenant RLS E2E, `node --check` e `git diff --check`: PASS.
- Limite declarado: pedidos foram enviados juntos em um packet; criação e progressão das ações foram sequenciadas na UI. Não foi feito restart real do Chromium com packet pendente. Concurrency de alocação tem provas PG independentes.
- Apps sem mudanças; nenhum acesso ao oficial, migration nova ou deploy. Oficial 0040; E2E 0041. Comparação read-only oficial permanece BLOCKED sem URL autorizada.
- Evidências novas em `browser-tests/evidencias/campanhas/0136/continuacao/`. Ver [REGISTROS/0136.md](REGISTROS/0136.md) e [RESUMOS/0136.md](RESUMOS/0136.md); não iniciar 0137.


## Atualização — Campanha 0137 (2026-10-11)

- [x] Browser Chromium comprovou três Drivers, FIFO, atribuições distintas, falhas HTTP e recuperação do mesmo packet após fechamento/reabertura real do perfil.
- [x] RETURN bilateral/teardown, DeliveryProof E2E, npm apps, PostgreSQL domain/lifecycle/RLS e concorrência independente 3/3 passaram em `rotamoto_e2e`.
- [x] **PASS — concorrência PostgreSQL independente:** requests de attempts Browser 10–13 correlacionados a PIDs/XIDs distintos; suite E2E independente 65 checkpoints, cinco transações bloqueadas, FIFO/idempotência/RLS, exit 0 e sem lock residual.
- [x] **PASS — Browser transacional completo:** attempt 17 comprovou duas sessões Restaurante, PIDs/XIDs independentes com waits de lock, ACK 200, FIFO por ordem canônica, replay/inbox idempotente, outbox após falhas/reinício real e convergência; cinco Chromiums encerraram com exit 0. Attempts 10–16 preservadas e classificadas no registro.
- [x] **PASS — paridade oficial:** nova comparação sob `BEGIN READ ONLY`; auditor confirmou `0040_restaurant_driver_queue`, catálogos/RLS base equivalentes e estrutura aditiva E2E 0041. Sem DDL/DML/migration ou alteração administrativa no oficial.

Ver [Registro 0137](REGISTROS/0137.md). Não iniciar Campanha 0138.

## Atualização — Campanha 0139 (2026-10-11)

- [x] **PASS — auditoria visual controlada:** baseline dos HEADs `bc5b380`/`1c9463a`; depois 16 estados (360/390/768/1366, claro/escuro), sem overflow, com alternância dinâmica, zoom e atribuição cartográfica.
- [x] **PASS — navegação:** destinos testados por touch/click Browser em mobile e desktop; “Mais” abriu/fechou no mobile e selecionou seus destinos.
- [x] **PASS — GPS sem vínculo:** permissão negada, permissão permitida sem posição física, ausência de conta e rede offline testadas; nenhuma localização simulada e ações oficiais bloqueadas.
- [ ] **PARTIAL — cartografia escura:** Chromium não suportou WebGL2; o fallback OpenStreetMap raster permaneceu claro. Revalidar em runtime de teste WebGL2 compatível.
- [ ] **BLOCKED — sessão/vínculo positivo, GPS físico e rota/pins canônicos:** API autenticada e dados operacionais não foram fornecidos; não houve simulação.
- Resultado global **PARTIAL**; aceite estético final depende do operador. Commits: Restaurante `3dac86b`, Motoboy `122208d`, Browser QA `2828555`/`0acb957`.
- PostgreSQL, migrations, Nginx, deploy, baselines, tags e `main` não foram alterados.

Ver [REGISTROS/0139.md](REGISTROS/0139.md) e [RESUMOS/0139.md](RESUMOS/0139.md). Não iniciar Campanha 0140.

## Campanha 0140 — estado final

- Aplicações e Browser QA receberam commits locais na branch de trabalho; sem push desses três repositórios.
- Suítes completas dos dois apps e Browser QA aprovadas. Matriz visual controlada e RETURN E2E registrados; operação autenticada só foi afirmada no runner RETURN usando `rotamoto_e2e`.
- Gates globais técnicos PARTIAL por WebGL2 indisponível no Chromium, ausência de GPS/câmera físicos e link Ajuda avaliado por clique DOM, não toque físico. Revisão estética ainda depende do operador.
- PostgreSQL oficial não conectado; E2E não modificado; nenhuma migration/deploy.
- Ver [REGISTROS/0140.md](REGISTROS/0140.md) e [RESUMOS/0140.md](RESUMOS/0140.md). Não iniciar 0141.
## Registro histórico — Campanha 0153: runtime 99Food e migration oficial (2026-10-14)

**Resultado geral: PARTIAL. `OFFICIAL_DEV_DB_MIGRATION = BLOCKED`; `READY_FOR_EXTERNAL_HOMOLOGATION = NO`.** A integração técnica foi ligada e aprovada em `rotamoto_e2e` com migrations 0042–0043. O banco oficial não foi consultado nem alterado: o backup prévio falhou em `audit_log` sob FORCE RLS com a role migradora. O estado/versão oficial é desconhecido nesta execução.

- **E2E:** ledger 0001–0043 íntegro; 0041 checksum preservado; 0042 checksum `ad036400035b8c03cbb92d9254d07fd8681ced0c06fcf325cb1678c06cdac160`; 0043 checksum `35a9f9d297d6010c0704b487d85fb735ab96db0a0c8517385c4b31936be1b189`. RLS/FORCE e grants mínimos validados.
- **Aplicativos:** runtime 99Food server-side com assinatura/raw-body, inbox/outbox, Order canônico, worker/comandos e UX unificada. Pedidos da plataforma não criam Delivery/QR/atribuição local.
- **Testes:** suites completas Restaurante/Motoboy, PostgreSQL migrations/identity/sync/RETURN, runtime/worker e 99Food PG E2E passaram; Chromium/CDP confirmou pedido local + 99Food, ação CONFIRM enfileirada, configurações e mobile 390 px sem overflow.
- **Pendência interna:** rate limit oficial de chamadas comuns ainda não é distribuído por conta/app entre processos; manter o tráfego externo desabilitado até implementação/teste.
- **Backup falho:** `/data/data/com.termux/files/home/projetos/backups/campanha-0153/rotamoto-20261014.dump`, 313236 bytes, modo 0600; cópia interrompida ao ler `audit_log`, não verificada e imprópria para restore. Nenhuma policy, trigger ou role foi alterada. Requer backup consistente autorizado com leitura de todas as tabelas auditáveis sob os controles existentes.
- **Oficial:** nenhuma consulta de ledger, migration ou smoke test após a falha do backup. Aplicativos sem push; Restaurante apenas commit local; histórico publicado somente na branch autorizada.

Ver [REGISTROS/0153.md](REGISTROS/0153.md) e [RESUMOS/0153.md](RESUMOS/0153.md). Não iniciar Campanha 0154.

## Registro histórico — Campanha 0155: performance e concorrência (2026-10-14)

Esta atualização registra as medições atuais sem remover fotografias históricas. Estado geral **PARTIAL**: ganho local no cálculo de sync comprovado; API curta até dez clientes concluiu sem erros, mas p95/p99 requerem perfilamento; mapa não renderizou no browser offline.

- **RESOLVED — busca de status de sync Motoboy:** substituída busca linear repetida por índice Map e leituras IndexedDB paralelas. Em dez conjuntos virtuais × 500 fatos/statuses, p50 foi 36,058→15,448 ms (2,33×), cinco rodadas; teste unitário e suites passaram.
- **PARTIAL — API/PostgreSQL:** somente `rotamoto_e2e`, 250 Orders sintéticos retidos por manifesto, 48/48 respostas sem erro e 22,13 req/s agregadas a 10 clientes. p95 510,43 ms/p99 541,69 ms. Plano usou o índice tenant existente, 250 linhas e 1,446 ms; sem justificativa para novo índice ou schema.
- **PARTIAL — Browser listas/mobile:** Restaurante com 250 Orders: lista 240 ms, filtro 59 ms; sem overflow desktop/mobile ou erros inesperados. Motoboy sem overflow, mas sem Leaflet container/canvas no painel do mapa. Capturas/traces/manifests em `browser-tests/evidencias/campanhas/0155/performance-run-05/`.
- **PASS no escopo executado — regressões:** `npm test` dos dois apps e suites PostgreSQL runtime/worker/99Food, tenant isolation (47 tabelas/38 policies), disponibilidade concorrente e logística passaram exclusivamente no E2E.
- **OPEN / P2 — API p95:** perfilar autenticação, pool, consulta e serialização com execuções repetidas e sessões/tenants distintos. Ensaio curto local não define SLO/capacidade de produção.
- **OPEN / P2 — mapa Browser:** investigar a ausência de container/canvas sem correção especulativa e repetir CDP.
- **OPEN / P2 — estimativa do plano:** a estimativa foi 1 linha contra 250 reais; apurar se estatísticas da fixture nova explicam a diferença, sem `ANALYZE`/DDL nesta campanha.
- **PARTIAL — escala física:** hardware/rede móvel sustentados, suspensão Android, GPS/câmera e integrações comerciais não foram testados.

Commits locais: Motoboy `b2d2233`, Restaurante `4aa0a7c`; sem push. Browser QA recebeu runner/evidências locais. O oficial `rotamoto` não foi acessado. Detalhes em [REGISTROS/0155.md](REGISTROS/0155.md) e [RESUMOS/0155.md](RESUMOS/0155.md). Nenhuma Campanha 0156 iniciada.


## Campanha 0171 — infraestrutura Browser autenticada

Estado atual: **PASS no gate de infraestrutura autenticada**. O runtime real, login UI, chamadas autorizadas e leitura cross-app do mesmo Driver foram comprovados com sessões persistidas exclusivamente em `rotamoto_e2e`. O harness anterior foi ajustado após 404 de handler de fixture. A jornada de entrega continua por executar e não foi declarada PASS. Ver [REGISTROS/0171.md](REGISTROS/0171.md).


## Campanha 0172 — jornada autenticada

Estado **PARTIAL**. A jornada UI criou Order e Delivery no E2E, percorreu aceitação, coleta, saída, chegada e confirmação. A entrega e os cinco eventos estão canônicos; a finalização não foi localizada na lista do Restaurante e não há Route canônica. Detalhes: [REGISTROS/0172.md](REGISTROS/0172.md).


## Campanha 0173 — offline e recuperação

Estado **BLOCKED** para fault injection Browser sobre a jornada autenticada, devido à confirmação cross-app pendente da 0172. Testes locais de outbox, storage, sync e Service Worker passaram como parte de `npm test`, sem equivaler aos cenários de falha solicitados. Nenhum perfil PWA persistente ou fixture foi limpo. Ver [REGISTROS/0173.md](REGISTROS/0173.md).


## Campanha 0174 — concorrência E2E

Estado **PARTIAL**. Duas sessões e dois tenants foram usados no teste PostgreSQL; locks, leases, RLS/FORCE, idempotência, RETURN e isolamento passaram no escopo do suite. Manifesto/schema sandbox 0174 retido. Testes concorrentes de Orders/Routes e reconciliação financeira permanecem pendentes. Ver [REGISTROS/0174.md](REGISTROS/0174.md).


## Campanha 0175 — estado vigente do lote 0171–0175

Resultado **PARTIAL**. Infraestrutura autenticada 0171 PASS; 0172 chegou a `DELIVERED` no E2E mas a verificação de tela final Restaurante e Route ficaram pendentes; fault injection Browser 0173 ficou bloqueada; 0174 aprovou concorrência/RLS em disponibilidade e RETURN, com limites. `npm test` de ambos e testes PG logística/territorial/concorrência passaram. Banco oficial intocado. Ver [REGISTROS/0175.md](REGISTROS/0175.md).
## Estado vigente — Campanha 0177

**0177 PASS no planejamento e execução de duas entregas próprias.** A Route foi criada pela UI do Restaurante com duas paradas ordenadas; Motoboy concluiu ambas; PostgreSQL E2E confirmou eventos, comprovantes e Earnings relacionados; lista do Restaurante mostrou estado final sincronizado.

Pendências que seguem vigentes: 0178 fault injection/offline e outbox após reabertura; 0179 valores financeiros não nulos, concorrência e RETURN; 0180 restauração isolada somente com artefato sintético autorizado. Earnings do 0177 tinham valor zero. A exceção de mapa MapLibre/Leaflet observada no Browser precisa ser diagnosticada. Nenhum acesso ao banco oficial.

Detalhes em [REGISTROS/0177.md](REGISTROS/0177.md).
## Estado vigente — Campanha 0178

**0178 PARTIAL.** ACK perdido depois de commit foi idempotente; operação `ARRIVED` permaneceu no IndexedDB/outbox durante offline e recarga; após reconectar/reautenticar, os dois apps convergiram. Chromium reportou online após reload, portanto reabertura ainda offline não passou; timeout, encerramento do processo e atualização do SW não foram exercitados. Um erro transitório `CSRF_INVALID` foi rejeitado, seguido por sync bem-sucedido. Mapa do Restaurante continua com exceção Browser sem correção nesta execução.

Ver [REGISTROS/0178.md](REGISTROS/0178.md). Próximo bloco: valores financeiros não nulos, concorrência e RETURN; recuperação e observabilidade para 0180.
## Estado vigente — Campanha 0179

**0179 PARTIAL.** RETURN bilateral pós-coleta passou no Browser autenticado: cancelamento comercial, retorno operacional ao final da rota, handover físico, confirmação pelo Restaurante, retry após 503 e custódia `RECEIVED`, com evento único e sem proof fictício. O teste utilizou fixture logística preparada. Ganho positivo foi validado apenas por unidade (840 centavos a partir de 8,40 BRL); disputa concorrente de aceite e reconciliação monetária Browser/PostgreSQL não foram demonstradas.

Ver [REGISTROS/0179.md](REGISTROS/0179.md). A consolidação 0180 permanece limitada a testes sintéticos de backup e aos mecanismos de observabilidade exercitados no runtime E2E; sem acesso ao recovery set real ou banco oficial.
## Estado vigente — Campanha 0180

**0180 PARTIAL; prontidão de produção BLOCKED.** Aplicativos, suites PG de logística/tenant, testes sanitizados de métricas/lifecycle e Browser de jornada/RETURN passaram no escopo documentado. O teste de recovery set foi sintético e mockado. A última restauração real registrada é da 0158 e cobre ledger até 0041, enquanto a 0154 documenta schema 0044. Nenhum artefato/chave de backup ou banco oficial foi acessado nesta campanha. Backup atual/offsite, agendamento, retenção operacional, RPO/RTO, alertas e restore vigente seguem sem validação.

Riscos atuais: mapa Restaurante ainda gera exceção MapLibre/Leaflet; uma chamada de instalação de sync recebeu 403 `CSRF_INVALID` transitório durante reautenticação; a reabertura do PWA não manteve rede offline. Ver [REGISTROS/0180.md](REGISTROS/0180.md).
## Estado vigente — Campanha 0192

**0192 PARTIAL.** Browser autenticado confirmou Route de duas paradas criada pela UI e lifecycle Leaflet em 1280×900 e 390×844, sem erros JS/CSRF. Os dois mapas tinham zero marcadores porque a jornada não confirmou coordenadas de destino; geometria viária e tiles externos não foram comprovados. Sem alterações de app. Run `6895ee89-5a62-4804-8cc8-d31f95d41ad8`; ver [REGISTROS/0192.md](REGISTROS/0192.md).
## Estado vigente — Campanha 0193

**0193 PARTIAL.** Workers agora agregam ciclos work/idle/error e duração com dimensões fixas e sem IDs de negócio; testes unitários e E2E Marketplace/99Food passaram. O log do worker publica snapshot periódico local. Métricas de profundidade/estado/retries/lease, coleta entre processos e alertas seguem pendentes. Commits Restaurante locais `3ae8918`, `21fba39`; ver [REGISTROS/0193.md](REGISTROS/0193.md).
## Estado vigente — Campanha 0201

**0201 PASS para renderização cartográfica desktop/mobile; PARTIAL para interação explicitamente verificada com a segunda parada.** Corrigido SVG Leaflet reduzido por CSS global e estabilizado o enquadramento após carregar geometria. Browser autenticado criou duas Orders/Deliveries e Route pela UI, concluiu as entregas e confirmou estado no Restaurante. Fixtures raster/rota eram loopback sintéticas; sem validação de provedor externo. Evidência e SHAs em [REGISTROS/0201.md](REGISTROS/0201.md). Banco oficial não acessado.
## Estado vigente — Campanha 0202

**0202 PARTIAL.** PostgreSQL E2E comprovou disputa concorrente, um único Driver atribuído, conflito no perdedor, aceite restrito, um evento canônico e replay idempotente. A disputa de duas sessões e a execução do vencedor não foram integradas a um mesmo Browser run autenticado. Ver [REGISTROS/0202.md](REGISTROS/0202.md). Banco oficial não acessado.
## Estado vigente — Campanha 0203

**0203 PASS no outage integrado executado; PARTIAL para ACK perdido exatamente após commit.** Proxy isolado deixou o browser online e runtime sem PostgreSQL; outbox persistiu, estado não avançou durante a falha e convergiu a `ARRIVED` com um evento após recuperar. Corrigido encerramento Node ao perder socket PostgreSQL emprestado e callback MapLibre em mapa removido. Ver [REGISTROS/0203.md](REGISTROS/0203.md). Banco oficial intocado.
## Estado vigente — Campanha 0204

**0204 PARTIAL.** Endpoint de filas tenant-scoped autenticado mede status, idade, retries, lease expirada e p95; Browser comprovou 401/200/403 e payload sem IDs. Worker E2E e testes completos passaram. Snapshot PostgreSQL Browser mostrou filas vazias. Sem heartbeat durável, disponibilidade é `unknown`; recovery counters e alertas sustentados permanecem pendentes. Ver [REGISTROS/0204.md](REGISTROS/0204.md).
