## Estado vigente — Campanha 0303 (2026-10-23)

0303 PARTIAL: correções locais de sticky header, layout busca/filtros e dismiss do painel aprovadas tecnicamente por Browser autenticado/MFA; screenshot visual pelo proprietário no Chrome Android segue pendente. QR seguro elegível continua bloqueado pela API ausente/404. A fixture foi limpa e o app não foi publicado/reiniciado. Próximo passo após esta entrega: aguardar conferência visual do proprietário; corrigir divergências que ele indicar antes de abrir outro escopo. Não iniciar 0304 automaticamente. Ver [REGISTRO 0303](REGISTROS/0303.md), [matriz](EVIDENCIAS/0303/matriz-funcional.md), [Browser](EVIDENCIAS/0303/capturas/browser-report.json).
---

## Estado histórico — Campanha 0302 (2026-10-23)

0302 PARTIAL; Lote 2 Pedidos/entregas V2 exercitado por Browser autenticado/MFA: criar, ACK/GET, editar/readback, reload, filtros e preview de impressão. QR endpoint de assinatura 404; scroll interno PC em 1280 px e aprovação visual humana pendentes. npm test Restaurante exit 0; E2E rollback/cleanup completos e zero resíduos. Próximo passo: proprietário conferir no Chrome Android e aprovar ou solicitar ajustes. Depois da aprovação, seguir para Lote 3 (Rotas/Motoboys); não iniciar campanha 0303 automaticamente. Ver [REGISTRO 0302](REGISTROS/0302.md), [matriz](EVIDENCIAS/0302/matriz-funcional.md), [Browser](EVIDENCIAS/0302/capturas/browser-report.json).

---

## Estado histórico — Campanha 0301 (2026-10-23)

0301 PARTIAL, checkpoint controlado do Lote 1. Browser autenticado/MFA passou filtros rápidos e preview de impressão da linha sintética; cache keys de app/design-system/styles e shell SW foram avançados; npm test Restaurante passou após alinhar expectations antigas. Restante das áreas pendente. Próxima ordem: completar Pedidos; Rotas e Motoboys; Gestão avançada; Gestão/Admin; auditoria final. Não iniciar 0302 automaticamente.

---

## Estado histórico — Campanha 0300 (2026-10-23)

0300 PARTIAL; não iniciar 0301 automaticamente. DashboardV2 promovido como Home oficial na branch local do Restaurante, handlers existentes e menu Mais acessível. Corrigido o render antes da restauração de sessão/Company. Browser/MFA confirmou escrita sintética por UI, ACK + GET canônico + reload, preview de impressão, QR elegível e 10 larguras × 2 temas; npm test Restaurante passou. 8083 serviu `app.js` idêntico ao workspace, sem reinício; isso não representa deploy. G1/G3/G4/G6/G7 PASS_SCOPE; G2/G5/G8 PARTIAL. Falta consistência da Order em todas as áreas/Motoboy, módulos cujo fixture respondeu 404, Android/impressão físicos e confirmação visual humana. Banco oficial e infraestrutura intocados. Ver [REGISTRO 0300](REGISTROS/0300.md), [evidências](EVIDENCIAS/0300/).

---

## Estado histórico — Campanha 0298 (2026-10-23)

0298 PARTIAL. Início e navegação global receberam tokens/estrutura adaptativa; Gate 1 foi concluído antes da alteração. Browser autenticado/CDP passou 20 viewport/tema e navegação subset (390/768/1280, 18 categorias Ajustes), sem overflow/JS; assets 8083 hash-match; suite Restaurante precisa registrar resultado final pós execução. Formulários e telas fora do subset permanecem sem aprovação; Gestão avançada separada como módulo próprio ainda não migrou. 0258 continua BLOCKED_AUTHORIZATION; ORS PENDING_EXTERNAL_CREDENTIAL; sem alterações/push dos aplicativos, Motoboy ou browser-tests. Ver [REGISTRO 0298](REGISTROS/0298.md) e [evidências](EVIDENCIAS/0298/).

Próximo trabalho recomendado (sem iniciar): (1) padronização responsiva por grupos de telas além de Início, (2) jornadas Browser funcionais por operação e formulário, (3) desenho isolado da rota Gestão avançada, (4) prova Android física após atualização operacional autorizada.

---

## Estado vigente — execução 0297

0297 PARTIAL, sem iniciar 0298 automaticamente. Entregues interface normal da corrida e Gestão avançada separada; device ID durável corrigido e edição Browser após reload atualizou a mesma Order/Delivery canônica. Browser autenticado comprovou preview/fluxo de impressão, QR elegível, ambos botões de distribuição, chegada Motoboy e reload, em 360/390/768 claro/escuro sem overflow no subset. `npm test` Restaurante passou após último ajuste; Motoboy não alterado. Falta injeção de IDs/caches obsoletos equivalente ao #1234, concorrência/replay/falhas 401/403/409/500/503/timeout, QR expiração/negação, workflows de Gestão avançada, Chrome Android físico e atualizar serviço servido. Fixture final `rotamoto_e2e` completa com `databaseCommitted=false`, cleanup COMPLETED e resíduos zero. 0258 permanece BLOCKED_AUTHORIZATION; ORS PENDING_EXTERNAL_CREDENTIAL. Ver [REGISTROS/0297](REGISTROS/0297.md), [matriz](EVIDENCIAS/0297/matriz-funcional.md), [report](EVIDENCIAS/0297/browser-report.json).

---

## Estado histórico — execução 0296

0296 PARTIAL, não iniciar 0297 automaticamente. Order manual sintético, ACK/readback, reload e preview Browser passaram; QR inelegível explicou o motivo; cancel dialog e cartões mobile 360/390/768 claro/escuro passaram no subset. Correção de lookup canônico e checagem tenant-aware foi feita, mas #1234 original não foi reproduzido. O erro inicial `403 CSRF_INVALID` no register installation foi seguido de retry autenticado 200; acompanhar se ocorrer fora da restauração E2E. Pendências objetivas: (1) reproduzir impressão/QR do pedido #1234 com cópia equivalente; (2) confirmar impressão/QR elegível e autorização tenant; (3) exercitar falhas/retry/concorrência de “Distribuir mais corridas” e chegada no Motoboy; (4) testar modal avançado, dados de data inválida e cancelamento canônico; (5) Chrome Android físico. Fixture final COMPLETED, databaseCommitted=false, resíduos zero; `npm test` Restaurante passou. Motoboy/browser-tests sem alterações. Ver [REGISTROS/0296](REGISTROS/0296.md) e [matriz](EVIDENCIAS/0296/matriz-funcional.md).

---

## Estado histórico — execução 0295

0295 PARTIAL; PASS_SCOPE sequencial cross-app após correção Motoboy. Distribuição Restaurante por dois botões com ACK/readback e estado sem elegíveis; Motoboy exibiu duas corridas na UI autenticada e reload. `SYNC_PACKET_IDENTITY_MISMATCH` corrigido reutilizando ID capturado no ciclo. Backup HTTP 404 era fallback do harness, runtime 503 `BACKUP_ADMIN_NOT_CONFIGURED`. Concorrência/replay/negativos e UI User/Membership/Role pendentes. Ver [REGISTROS/0295.md](REGISTROS/0295.md).

---

## Estado histórico — execução 0294

0294 PARTIAL. Integrações, Equipe/perfil sintético, Segurança local, Operação, Navegação e Origens exercitados conforme matriz; Backup no fixture retornou 404, posteriormente identificado em 0295 como fallback do harness sem handler. Nenhum defeito de persistência reproduzido nos campos locais testados; sem alteração de fonte de app. npm test Restaurante passou; E2E somente em rotamoto_e2e, rollback completo, databaseCommitted=false, resíduos zero. Campos não testados, negativos e novas sessões permanecem PARTIAL. RM-AUD19-02/10 e RM-AUD19-18 não fechados globalmente; demais ocorrências e pendências 0289 preservadas. Ver REGISTRO 0294.

---

## Estado histórico — execução 0293

0293 **PARTIAL**. Tema local Restaurante, subset de Aparência, Relatórios, Eventos, Navegação, Impressão e Origens passaram UI/reload; corrigido feedback de Salvar aparência perdido por render. RM-AUD19-01 PASS_SCOPE local; RM-AUD19-02/10 PARTIAL global; 03 cross-app pendente; 13 PASS_SCOPE limitado para toast Aparência acima da barra em 360/390/768 claro/escuro, sem fechar globalmente. Segurança por permissão/card indisponível; Integrações, Backup, Equipe e outras configurações pendentes. Ver [REGISTROS/0293](REGISTROS/0293.md). 0294 não iniciada.

## Histórico confirmado — execução 0292

A publicação histórica 0292 está em `origin/main`, SHA `07e387a1574b4057b1c6a12378c750ae6af326ec`, validada por leitura remota de registro, evidências e documentos cumulativos. 0292 permanece PARTIAL globalmente. Ver [REGISTROS/0292](REGISTROS/0292.md).

---

## Campanha 0291 — histórica; PARTIAL (2026-10-22)

Escopo RM-AUD19-02/03/10. Browser autenticado comprovou persistência canônica na UI de Route e perfil econômico/Frota: ACK + GET/readback, reload, falha 503 com rascunho preservado e retry; negativos 400/401/403/409; 360/390/768 claro/escuro sem overflow. Company foi escrita pelo helper API do fixture e sua projeção lida na UI, sem acionar o botão Salvar. Fixture `rotamoto_e2e` finalizou com `databaseCommitted=false`, cleanup COMPLETED e resíduos zero. Nenhum defeito do subset UI foi reproduzido e não houve alteração de código; o resultado não fecha os problemas globais. Restam os formulários gerais/autosave e Company, timezone pela UI, nova sessão, visualização Motoboy, coordenadas `null` comparativas e negativos adicionais (500/timeout/resposta incompleta/ACK perdido/clique duplo/reload durante operação). Pendências de distribuição 0289 mantidas. 0258 BLOCKED_AUTHORIZATION; ORS PENDING_EXTERNAL_CREDENTIAL. Ver [REGISTRO 0291](REGISTROS/0291.md) e [matriz funcional](EVIDENCIAS/0291/matriz-funcional.md). Não iniciar 0292.

---

## Campanha 0290 — PARTIAL (2026-10-22)

Escopo ativo: RM-AUD19-02, RM-AUD19-03 e RM-AUD19-10. Corrigido o caminho do timezone Company com revisão esperada, conflito e ACK + readback canônico. Suíte Restaurante integral passou. Gates remanescentes obrigatórios: Browser autenticado em Configurações; navegação, reload, nova aba e restauração; antes/depois; cenários 400/401/403/409/500/timeout/resposta incompleta/clique duplo/readback divergente/retry; viewports 360/390/768 claro/escuro; comparação canônica e visível Empresa–Logística–Frota–Motoboy com endereço sintético e coordenadas `null`; cleanup tenant-scoped se usar fixture. Revalidar distribuição e pendências de 0289 sem apagá-las. 0258 continua bloqueada por autorização; ORS aguarda credencial externa. **Não iniciar 0291 automaticamente.** Ver [REGISTRO 0290](REGISTROS/0290.md).

---

## Atualização vigente — 0289

0289 terminou **PARTIAL**. RM-AUD22-21 foi corrigido e validado no Browser autenticado 360/390/768 claro/escuro. RM-AUD22-22 comprovou os dois botões, ACK/readback e ausência de atribuição de Order já distribuído; regressão em memória após pull e elegibilidade de Orders foram corrigidas. `npm test` Restaurante passou; fixture `rotamoto_e2e` completou rollback sem resíduos. Permanecem por testar erro HTTP/sem permissão, clique duplo, concorrência simultânea, replay e apresentação no Motoboy. Não iniciar automaticamente a campanha seguinte. Preservar todos os demais IDs/aliases e as pendências de persistência/localização. Ver [REGISTRO 0289](REGISTROS/0289.md).

---

## Atualização histórica — 0287

0287 terminou **PARTIAL**, focada no Motoboy: sessão sintética autenticada, pull Company, abort/recovery IndexedDB, endereço sem coordenadas, rejeição de snapshots inválidos/obsoletos/estrangeiros e matriz visual 360/390/768 claro/escuro passaram no escopo descrito. `npm test` Motoboy passou; fixture `rotamoto_e2e` rollback concluído e resíduos zero. Permanecem pendentes segunda sessão Browser, falhas de sync/IndexedDB adicionais, duplicação e verificação cross-tenant backend explícita. No Restaurante permanecem timeout persistente, ACK/readback divergente, concorrência simultânea e isolamento adicional. Nenhum problema cumulativo foi encerrado. Ver [REGISTROS/0287.md](REGISTROS/0287.md). Próxima campanha não iniciada.

---

## Atualização vigente — 0286

0286 terminou **PARTIAL**. Reproduzida e corrigida corrida entre a gravação/readback local de settings e atualização de estado de sincronização, que abortava salvamento antes do PUT. Browser/CDP autenticado (fixture backend-issued, MFA verificada) comprovou PUT confirmado com ACK perdido, reload completo, readback canônico e reconciliação na revisão 1; retry não repetiu PUT. Clique duplo resultou em 1 PUT/revisão 1→2. Coordenadas permaneceram `null`. Regressões específicas passaram e cleanup fixture foi COMPLETED com `databaseCommitted=false` e zero resíduos. Falhas restantes, IndexedDB/Motoboy, concorrência simultânea, cross-tenant adicional e matriz visual seguem pendentes. Ver [REGISTRO 0286](REGISTROS/0286.md). A próxima campanha não foi iniciada.

## Atualização histórica da execução — 0285

0285 terminou **PARTIAL**. Sessão sintética emitida pelo backend com MFA autenticada via Browser/CDP; reload durante PUT pendente preservou o rascunho e não apresentou confirmação antes do readback. A causa exata do HTTP 401 original da 0284 permaneceu não determinada. Matriz negativa, IndexedDB, concorrência e segurança Browser ficaram pendentes. Fixture revertida sem resíduos; ver [REGISTRO 0285](REGISTROS/0285.md).

---

## Atualização vigente — 0284

0284 terminou **PARTIAL**. O runner CDP agora tem timeout/cancelamento de avaliação, correlação de reload pelo frame principal, autenticação observável e fechamento de Chromium/perfil temporário. Regressões unitárias e smoke com Chromium real passaram. A fixture funcional retornou 401 em `/api/identity/session` antes da tela de configurações; a matriz de persistência, IndexedDB, concorrência simultânea e tenant Browser não foi executada. Fixture reconciliada com `databaseCommitted=false`, cleanup COMPLETED e resíduos tenant-scoped zero. Sem alteração de apps. Próxima execução desta pendência deve reutilizar a sessão sintética autorizada via harness, confirmar API da sessão antes de interagir e então executar somente cenários negativos restantes. Ver [REGISTRO 0284](REGISTROS/0284.md). Não iniciar 0285 automaticamente.

## Atualização histórica da execução — 0283

0283 terminou **PARTIAL**. `npm test` Restaurante/Motoboy passou; API E2E confirmou stale revision 409, RBAC 401/403, rejeição de payload cross-tenant e rollback sem resíduos. Browser autenticado passou as falhas injetadas 400/401/403/409/500/503 no PUT Company com rascunho preservado; a conexão interrompida foi recuperada por nova tentativa e readback. Reload pendente, falhas persistentes de GET/ACK/timeout, concorrência simultânea, IndexedDB e testes visuais autenticados permanecem pendentes. Nenhum código de app foi alterado; problemas cumulativos permanecem nos estados anteriores. 0258 continua BLOCKED_AUTHORIZATION e ORS PENDING_EXTERNAL_CREDENTIAL. Ver [REGISTROS/0283.md](REGISTROS/0283.md). 0284 não iniciada.

## Atualização histórica da execução — 0282

0282 terminou **PARTIAL**. Corrigidos snapshot address-only no sync Restaurante e apresentação read-only da localização Company em Ajustes Motoboy. Browser/CDP autenticado comprovou login/MFA de fixture, navegação para Ajustes antes/depois do reload e em segunda sessão, PUT de endereço pela interface Restaurante com ACK/readback, sync pull e exibição no Motoboy; coordenadas permaneceram desconhecidas. Matriz visual autenticada dos dois apps em 360/390/768 e claro/escuro sem overflow detectado. `npm test` e regressões direcionadas passaram. Matriz HTTP/concorrência/tenant segue não comprovada. Cleanup: 18 manifests, 2 COMPLETED/16 falhas anteriores do runner, todos databaseCommitted=false e resíduos zero. Atualização cumulativa publicada em `origin/main`; ver [REGISTRO 0282](REGISTROS/0282.md). RM-AUD19-02/03/10 e aliases permanecem PARTIAL; 0258 BLOCKED_AUTHORIZATION; ORS PENDING_EXTERNAL_CREDENTIAL. Não iniciar 0283 automaticamente.

## Atualização da execução — 0279

0279 terminou **PARTIAL**. Corrigido o gate de salvamento Company no Restaurante: perfil e endereço agora exigem revisão atual, ACK compatível e GET readback canônico antes da confirmação; coordenadas derivam somente do readback. PostgreSQL E2E autenticado com Company sintética confirmou localização e snapshot `/sync/pull` para Motoboy, com rollback e resíduos tenant-scoped zero. `npm test` Restaurante passou. Browser/CDP anônimo cobriu carregamento e overflow em 360/390/768, claro/escuro; formulário autenticado, DOM comparativo e reload Browser não foram validados por falta de identidade sintética autorizada. RM-AUD19-02/03/10 e aliases continuam PARTIAL. Chrome Android físico PENDING_OWNER; ORS PENDING_EXTERNAL_CREDENTIAL; 0258 BLOCKED_AUTHORIZATION. Ver [REGISTROS/0279.md](REGISTROS/0279.md). 0280 não iniciada.

## Atualização da execução — 0273

0273 passou **PASS_SCOPE** para `RM-UI-ACCOUNT-TOPBAR`: causa estrutural corrigida; sessão autenticada abre a página existente de Conta e segurança, com retorno para Ajustes. Browser/CDP passou 5 viewports × 2 temas, toque/clique, teclado/foco e reload; `npm test` Restaurante passou. Android físico segue PENDING_OWNER. Os 19 RM-AUD19 permanecem inalterados, e o 502 de `autoNext` da 0272 permanece separado. Ver [REGISTROS/0273.md](REGISTROS/0273.md). 0258 continua BLOCKED_AUTHORIZATION; próxima campanha não iniciada.

---

## Atualização da execução — 0270

0270 terminou **PARTIAL**. Corrigida a preservação do rascunho de política de agrupamento quando Company responde conflito de revisão; ACK/readback canônico e reload passaram. Browser autenticado comprovou 33 caminhos Restaurant (390px, tema padrão), e dez fixtures transacionais concluídas com rollback/contagens zero. Os campos adicionais de Logística foram apenas lidos e as preferências do Motoboy não passaram Browser nesta execução; matrizes responsivas completas e Chrome Android físico seguem pendentes. `npm test` nos dois apps passou. RM-AUD19-02/10 e `RM-D1-SETTINGS-SAVE` permanecem PARTIAL. Recomendação posterior: Browser autenticado de configurações do Motoboy e lotes faltantes no Restaurante. 0258 permanece BLOCKED_AUTHORIZATION. Ver [REGISTROS/0270.md](REGISTROS/0270.md). Não iniciar 0271 automaticamente.

## Atualização de execução — 0262

0262 foi executada com **PARTIAL**. Causa comprovada: as páginas não retomavam sessão/sync quando voltavam ao primeiro plano com conexão mantida. Ambos os clientes agora revalidam sessão e agendam sync em visibilitychange/pageshow/online. Browser/CDP autenticado comprovou Company do Restaurante → sync/pull → cache IndexedDB/DOM read-only no Motoboy, revisão 3→4 e isolamento; 20 viewports/temas, três fluxos, três negações, nenhum JS/5xx. npm test de ambos e teste PostgreSQL domain/sync passaram. Fixture terminou COMPLETED, rollback e resíduos zero; runit e health restaurados. Offline durante POST, ACK perdido no Browser, conflito concorrente em conexões separadas e tombstones concorrentes não foram cobertos integralmente. RM-AUD19-01..19 permanecem; especialmente 02/03/10 e aliases de Company seguem PARTIAL. CDP não valida Chrome Android físico. Ver [REGISTROS/0262.md](REGISTROS/0262.md). 0263 não iniciada; 0258 permanece BLOCKED_AUTHORIZATION.

# Ordem de execução das campanhas RotaMoto

**Revisão:** 2026-10-22 · Última execução: 0287 PARTIAL · Fonte de rastreio: [Inventário único](INVENTARIO_UNICO_PROBLEMAS.md). Ordem documental; não autoriza alterações operacionais.

## Atualização da ordem — campanha 0278

0278 executou a etapa de adapter e testes locais, **PARTIAL**. ORS foi implementado por interface de provider sem chamada comercial; a credencial estava ausente. A geometria real, endpoint, Browser nos mapas e atualização operacional continuam dependentes de credencial/uso autorizado e de uma fixture canônica segura. ORS não publica perfil de motocicleta; adequação deve ser decidida antes da ativação operacional. OSRM continua compatível, mas implantação Termux 0277 permanece sem autorização. A próxima etapa não começa automaticamente; seguir a ordem/inventário vigente. Ver [REGISTROS/0278.md](REGISTROS/0278.md).

## Atualização da ordem — campanha 0277

0277 encerrou **BLOCKED** sem instalação: não há pacote/binário OSRM Termux, build upstream não validado em Android/Bionic e qualquer tentativa nativa requer alterações de pacotes e downloads/build. O provider existe e a fixture E2E já aceita injeção local; URL e serviços oficiais não foram alterados. Próximo gate para esta dependência: autorização explícita para ensaio de build Termux e PBF custom limitado, ou host Linux ARM64 isolado; antes de baixar, obter tamanho estimado/checksum e reservar disco/memória. Geometria real, endpoint E2E, mapas dos dois apps e atualizações operacionais continuam BLOCKED; a duração não é exposta pelo contrato atual e não deve virar ETA. 0258 segue BLOCKED_AUTHORIZATION; 0278 não iniciada. Ver [REGISTROS/0277.md](REGISTROS/0277.md).

## Atualização da ordem — campanha 0276

0276 terminou **PARTIAL**. O mapa Restaurante agora repete a consulta de geometria quando a sessão sincronizada é restaurada; Motoboy não renderiza a geometria integral antiga quando a sequência operacional diverge. Browser/CDP autenticado verificou os endpoints reais, origem Company desconhecida, custom com retorno ligado/desligado, marcadores/retry sem linha falsa, providers e limpeza econômica com ACK/readback/reload. O motor respondeu `ROUTE_GEOMETRY_PROVIDER_NOT_CONFIGURED`; OSRM não está instalado/configurado no runtime. Não se declara rota viária nem atualização pós-evento concluída. `npm test` dos apps, testes focados, rollback e resíduos zero passaram; runit/readiness restaurados. RM-AUD19-02/03/10 e aliases permanecem PARTIAL; Android físico PENDING_OWNER; 0258 BLOCKED_AUTHORIZATION. Ver [REGISTROS/0276.md](REGISTROS/0276.md). 0277 não iniciada.

## Atualização da ordem — campanha 0275

0275 terminou **PARTIAL**. Corrigido no Restaurante o caminho que, após PUT aceito e falha do GET readback, podia descartar o formulário e informar sucesso sem confirmação. Browser autenticado usou handlers reais e comprovou Route e perfil econômico por ACK/readback/retry/reload, separação de origem custom e Company, comparador usando custo/política e negativos 400/401/403/409. `npm test` Restaurante passou; 360/390/768 em claro/escuro sem overflow no DOM observado; fixture revertida com resíduos zero e readiness restaurado. Geometria operacional de Route não foi calculada devido a snapshots de coordenadas ausentes na fixture; providers, ação de limpar perfil, rede geral, matriz restante e Chrome Android físico seguem pendentes. RM-AUD19-02/03/10 e aliases continuam PARTIAL; 0258 permanece BLOCKED_AUTHORIZATION. Ver [REGISTROS/0275.md](REGISTROS/0275.md) e [evidências](EVIDENCIAS/0275/). 0276 não iniciada.

---

## Atualização da campanha 0274 — runner E2E e autoNext

## Atualização da ordem — campanha 0269

0269 foi executada como regressão prioritária e terminou **PARTIAL**. `npm test` dos dois aplicativos passou e Browser/CDP autenticado revalidou somente Company/localização e negação RBAC no subset descrito em [REGISTROS/0269.md](REGISTROS/0269.md). Não houve novo defeito de aplicativo reproduzido; nenhum ID foi encerrado e nenhuma alteração de código foi feita. Próxima recomendação, ainda não iniciada: campanha delimitada de matriz restante RM-AUD19-02/10 por fonte/categoria, com drafts/retry/erros e sessão retomada Browser, sem repetir cenários já comprovados. Chrome Android físico depende do proprietário; 0258 continua BLOCKED_AUTHORIZATION.

## Princípios de sequenciamento

- Fechar primeiro causas compartilhadas e documentação de aceite; adiar UX não relacionada até a matriz de gravação e fonte de verdade estar definida.
- Fazer trabalho independente sem esperar por credenciais externas, mas manter o subitem externo `BLOCKED_*`.
- Contratos atuais governam Company/local settings, membership↔Driver, Order/Delivery, estados/ACK e admin global. Não inventar comportamento API para preencher lacuna de produto.
- Toda implementação usa ramo próprio, preserva baselines/trabalho existente, testes sintéticos reversíveis, e nunca banco oficial por padrão.
- Campanha só encerra item com evidência específica, não por documentação ou `npm test` isolado. Ver regra obrigatória no inventário.

## Sequência recomendada

| Ordem | Campanha | Escopo e itens do inventário | Pré-requisitos e trabalho permitido | Gate / saída |
|---:|---|---|---|---|
| 0 | Reconciliação atual | `RM-D1-AUDIT19-INDEX`, `RM-HISTORY-LEGACY-OPEN`; este conjunto documental | Lista numerada das 19 foi fornecida pelo proprietário e ligada aos IDs RM-AUD19-01..19; preservar capturas e critérios de aceite para cada item. Os IDs históricos e lacunas de evidência continuam vigentes. | Inventário versionado; estados e origem ligados. Sem código ou operação. |
| 1 | **0256-D3/D4 — auditoria e finalização de salvamento** | `RM-D1-SETTINGS-SAVE`, `RM-AUD19-02`, `RM-AUD19-10` | D3 corrigiu serialização/readback local; D4 corrigiu reconnect do runner e comprovou subset. API ausente no fixture segue bloqueada. Não substituir campos sem evidência por mocks; preservar outros 17 IDs. | D4 permanece PARTIAL: executar matriz ainda ausente por configuração, negativos rede/HTTP/RBAC/revisão/rascunho e persistência na fonte canônica. Só após relatório final por campo seguir gates da sequência. Ver REGISTROS/0256-D4.md. |
| 2 | **0256-E — sistema local, backup e recuperação** | `RM-0256E-BACKUP-RECOVERY`, `RM-0256C-BACKUP-CONTENTION`, aliases 0227–0239, `RM-0234-DR-EXTERNAL` | **Executada; PARTIAL.** Testes focados passaram e recovery set foi restaurado apenas em cluster descartável. Runtime `BACKUP_ADMIN_NOT_CONFIGURED`; Browser E2E autenticado reversível indisponível no harness atual; `npm test` do Restaurante parou no gate Help Center. Sem ativação operacional. | Manter bloqueios de offsite/custódia/RPO/RTO e Browser; revalidar corrida após reparo independente do gate integral. Ver REGISTROS/0256-E.md. Restore/migration oficial proibidos. |
| 3 | **0256-F — regressão visual e E2E de campanhas 0256** | `RM-D1-UX-CLARITY`, `RM-D1-MOBILE-FEEDBACK`, B/B1, C/D, `RM-0267-REPORTS-REGRESSION`, `RM-0263-RUNTIME-RELEASE` (preparação) | **Executada; PARTIAL.** `npm test` dos dois apps passou; Browser/CDP sintético percorreu abas/cards em 5 larguras × 2 temas, corrigiu exceção MFA por DOM detached e confirmou rollback. 404 fila/analytics na fixture, backup 503 e ciclos persist/reload/expiração/admin incompletos continuam registrados. Sem validação Chrome físico. | Não declarar regressão integral PASS. RM-AUD19 e dependências continuam no inventário. Completar evidências faltantes em campanha futura; 0257 não iniciada. Ver `REGISTROS/0256-F.md`. |
| 4 | **0257 — administração global (E2E sintético)** | `RM-0255-GLOBAL-UI`, `RM-0257-GLOBAL-ADMIN-E2E`, `RM-D1-ADMIN-AUDIT`, pré-requisitos de `RM-0258-GLOBAL-GATE` | **Executada; PARTIAL.** Catálogo confirmado em 0255/contratos/migrations. HTTP/PG testaram grant temporário de founder, leitura e disable/enable; Browser autenticado provou tenant-admin negado em cinco viewports/dois temas. Grant/ações globais positivos na UI não foram exercitados; a fixture segura não consegue materializar o grant migrator dentro da mesma transação app. `audit_log` runtime sem SELECT. | Manter 0257 PARTIAL até que UI positiva tenha Browser autenticado global transacional; filtros/detalhes/grants/serviços e leitura de auditoria estão ausentes. Erros: 401/403 testados; revisão esperada não existe (campo recusado 400), sem 409. Zero resíduos/readiness 200. Ver [REGISTROS/0257.md](REGISTROS/0257.md). |
| 5 | **0258 — gate de fundador/privilégios e eventual migration oficial** | `RM-0255-FOUNDER`, `RM-0258-GLOBAL-GATE`, `RM-0234-OFFICIAL-SCHEMA`, admin-audit se requer privilege/schema | Só começa após 0257 E2E e evidência histórica independente da identidade founder. Exigir desenho, ameaça/least privilege, diff e up/down migration, rollback, backup/restore verificado, ambiente/alvo inequívoco e aprovação explícita do proprietário para cada ação persistente. | Gates sequenciais G0 identidade → G1 modelo → G2 migration/rollback revistos → G3 recovery → G4 aprovação explícita → G5 teste E2E. Se qualquer gate falhar, permanecer BLOCKED; não conectar/escrever no oficial, migrar, conceder GRANT ou executar bootstrap. |
| 6 | **0259 — identidades, convites e vínculos empresariais** | `RM-0234-IDENTITY-EXTERNAL`, `RM-0256C-DRIVER-LINK-UI`, `RM-0247-DRIVER-AUTHZ`, `RM-0252-TEAM-IDENTITY`, `RM-0259-IDENTITY-INVITE-LIFECYCLE` | **Executada; PARTIAL.** `test:identity-http`, `npm test` nos dois apps e Browser autenticado/CDP passaram. Sink de email local e fixture PostgreSQL transacional. | UI/API provaram convite, aceite, login, ausência de acesso sem Driver, vínculo autorizado same-tenant, acesso e revogação; API/PG cobriu expiry/revoke/resend/token rotation/duplicado ativo. 11 fluxos, 36 viewport checks, 4 negações, zero JS/5xx; manifesto `f02caef8-4df0-4175-af7d-9d28fc5776bc` COMPLETED, sem commit DB e zero resíduos; runit readiness 200 após restauração. Ver [REGISTROS/0259.md](REGISTROS/0259.md). |
| 7 | **0260 — equipe, permissões e acesso Motoboy** | `RM-0256C-TEAM-RBAC`, `RM-0256C-DRIVER-LINK-UI`, `RM-0247-DRIVER-AUTHZ`, `RM-D1-EDIT-OWNER`, `RM-AUD19-18/19` | **Executada; PARTIAL.** Perfil/membership e Driver por contrato foram testados; nome/email canônicos de User sem endpoint. Browser 12 fluxos/36 viewport checks/4 negações, zero JS/5xx; teste PostgreSQL comprovou mudança de role/status, revogação de sessão, reativação, Driver editado com ACK/readback, revisão velha (`REVISION_CONFLICT`) e identidade existente reutilizada em tenant adicional. Vínculo same-tenant, unlink e tenant-admin restrito passaram no Browser. | Manter PARTIAL até cobrir concorrência real de convite/aceite/link e reenvio/revogação pela UI após reload. Driver cross-tenant retorna 404; edição exige `sync.push`; status distingue cadastro de disponibilidade. Nenhuma alteração real. Não iniciar 0261 automaticamente. Ver [REGISTROS/0260.md](REGISTROS/0260.md). |
| 8 | **0261 — persistência Company e localização** | `RM-D1-LOCATION-CONSISTENCY`, `RM-0252-COMPANY-PERSIST`, aliases 0250-COMPANY-PERSISTENCE / 0247-COMPANY-PERSISTENCE, RM-AUD19-02/03/10 | **Executada; PARTIAL.** Correção na hidratação da tela sincroniza readouts/mapa com Company canônica; ACK + GET readback rigorosos. Browser autenticado comprovou Company Profile, DOM Empresa/Logística, custom origin independente, reload/segunda sessão e 400/403/409. `npm test` ambos; sem JS/5xx. Clique/confirmar UI do mapa passou com readback; faltam cobertura integral dos campos, erros de rede/draft/retry, Motoboy sync/pull e validação física. Ver REGISTROS/0261.md e `browser-tests/evidencias/campanhas/0261/report.json`. | Não encerrar aliases nem RM-AUD19-02/03/10; preservar desconhecido e origem custom. 0258 permanece BLOCKED_AUTHORIZATION. |
| 9 | **0262 — sync entre abas/dispositivos/offline** | `RM-0253-CROSS-TAB-SYNC`, `RM-0252-CROSS-TAB-SYNC`, `RM-0251-SYNC-STATUS`, aliases 0250-SYNC-ACK | **Executada; PARTIAL.** Foreground corrigido; Company pull/readback/IndexedDB/DOM Motoboy confirmado; duas apps, 20 viewports/temas; suites passaram. | Ainda exige Browser offline/retry, ACK perdido, conflito concorrente real, tombstone e outbox persistente em restart. Ver REGISTROS/0262.md. |
| 10 | **0263 — runtime permanente, estabilidade e E2E** | `RM-0263-RUNTIME-RELEASE`, `RM-0256-RUNIT-BROWSER`, aliases 0251/0252/0254 runit | **Executada; PARTIAL.** Topologia e serviços auditados; Browser/CDP anônimo no runtime permanente, rede offline/recovery, viewport/tema, e restart do serviço E2E isolado/restaurado. Testes autenticados transacionais de identidade/sync passaram. | Browser autenticado diretamente no processo permanente segue pendente por falta de identidade sintética de duração descartável; suíte migration/rollback recusada pelo guard de banco protegido. Manter 0258 `BLOCKED_AUTHORIZATION`; ver REGISTROS/0263.md. |
| 11 | **0264 — jornada operacional integrada** | `RM-0264-OPS-FLOW`; 0211–0220 racing, RETURN, finance, worker aliases | Executada com PARTIAL. Browser transacional passou cadastro/elegibilidade/dispatch e cancelamento pós-coleta com retorno; PG transacional passou receipt, replay, conflito e isolamento. Nenhum fixture persistente. | Antes do aceite: Browser journey integral aceite/coleta/entrega/proof/receipt com ACK e rollback; corrida de despacho/receipt em conexões independentes; sanar/reexecutar gate `npm test` Restaurante (erro TLS de fixture de backup fora do escopo). Ver REGISTROS/0264.md. |
| 12 | **0265 — experiência admin de providers** | `RM-0265-PROVIDER-UI`, `RM-0256D-MARKETPLACES`, 0252-PROVIDER-ACTIONS, RM-AUD19-06/09/17 | **Executada; PARTIAL.** Browser autenticado confirmou três estados sem conexão, tabs isoladas, origem/executor separados, simulação 99Food em memória e layouts 360–1440 claro/escuro sem overflow/JS/5xx. Corrigidos rótulos/códigos técnicos da mensagem de erro. `npm test` ambos passou; falha ASN1 de backup 0264 não reproduzida. | `RM-0265-PROVIDER-UI` permanece PARTIAL: sem lifecycle de conta/orderRow comercial positivo ou erro via Browser, credenciais/sandbox/homologação não autorizadas. RM-AUD19-06/09 `PASS_SCOPE` somente às superfícies testadas; 17 continua PARTIAL_EXTERNAL. 0266 é próxima campanha, mas depende de onboarding/credenciais e autorização por provider; não iniciar automaticamente. Ver REGISTROS/0265.md. |
| 13 | **0266 — validação dos provedores e preparação para homologação** | `RM-0266-COMMERCIAL`, `RM-0256-EXTERNAL-PROVIDERS`, 0256-D-EXTERNAL-HOMOLOGATION | **Executada; PARTIAL / BLOCKED_EXTERNAL_DEPENDENCY.** `npm test` dos dois apps, unitários, PostgreSQL de marketplace/worker/99Food/segredos e Browser/CDP autenticado em fixture transacional passaram no escopo local. Nenhum provedor conectou a sandbox; checklist oficial individual criado. Quatro runners PG deixam fixture `RETAINED`; linhas exatas desta execução foram limpas depois e contagem tenant-scoped voltou a zero, mas isso não é rollback automático. | Manter `RM-0266-COMMERCIAL` PARTIAL e homologação bloqueada até onboarding, credenciais/sandbox e aprovação externa por provedor. Sem `READY_FOR_SANDBOX`/`PRODUCTION_READY`; 0258 permanece `BLOCKED_AUTHORIZATION`; 0267 não iniciada. Ver [REGISTROS/0266.md](REGISTROS/0266.md). |
| 14 | **0267 — relatórios e regressão funcional** | `RM-0267-REPORTS-REGRESSION`, `RM-D1-REPORTS-VISUAL`, RM-AUD19-13 e aliases 0252/0253 | **Executada; PARTIAL.** Corrigida a agregação de várias Deliveries por Order e deduplicação de aliases. `npm test` dos dois apps, analytics e suites PostgreSQL territorial/logística transacionais passaram; Browser autenticado em 5 larguras × 2 temas, dados/vazio, filtros e CSV; 36 capturas publicadas. | Indicadores Orders/finanças continuam no nível Order; devoluções/reentregas contam como operações sem gerar nova cobrança/earning; export CSV sem duplicidade, fórmula ou PII. Readback/frescor de Orders/Earnings canônicos, negativos 403/409/tenant, Chrome Android físico e UX global seguem pendentes. 0258 permanece BLOCKED_AUTHORIZATION. Ver REGISTROS/0267.md; à época, 0268 ainda não iniciada. |
| 15 | **0268 — validação operacional do proprietário / DR físico** | `RM-0268-OWNER-ANDROID`, `RM-0234-DR-EXTERNAL`, `RM-0242-ANDROID-PHYSICAL`, `RM-0255-OWNER` | **Executada; PARTIAL.** Checklists Android e DR publicados. `adb devices` sem aparelho; suites Motoboy PASS e Restaurante conforme resultado final no registro. Readiness somente leitura; nenhuma ação destrutiva ou operacional. | Proprietário executa [checklist Android](CHECKLISTS/CHECKLIST_ANDROID_0268.md); validação física permanece PENDING_OWNER. Offsite, chave/custódia, alvo independente, RPO/RTO e serviço administrativo de backup exigem autorização/decisão separadas. Ver [REGISTROS/0268.md](REGISTROS/0268.md). 0258 continua BLOCKED_AUTHORIZATION; não iniciar outra campanha automaticamente. |
| 16 | **0269 — consolidação e correção de pendências prioritárias** | RM-AUD19-01..19; `RM-D1-SETTINGS-SAVE`, `RM-D1-AUTH-RESUME`, `RM-D1-LOCATION-CONSISTENCY` | **Executada; PARTIAL.** npm test integral de ambos os apps passou. Browser autenticado transacional revalidou Company/location, ACK/readback, origem customizada, reload/segunda sessão, RBAC, 5 viewports × 2 temas. Nenhuma falha nova reproduzida; nenhum item fechado; sem patch de app especulativo. | Próximo passo recomendado (não iniciado): matriz remanescente RM-AUD19-02/10 por fonte e cenários de erro/draft/retry, e sessão Browser; manter todos os 19 IDs e PENDING_OWNER físico. 0258 continua bloqueada. Ver [REGISTROS/0269.md](REGISTROS/0269.md). |
| 17 | **0271 — correção funcional de configurações do Motoboy** | RM-AUD19-02/10; `RM-D1-SETTINGS-SAVE` | **Executada; PARTIAL.** Tema, autosave de taxa e meta diária passaram falha sintética, draft/rerender, retry e readback IndexedDB no Browser autenticado. `npm test` Motoboy passou; sem overflow em 360/390/768 claro/escuro. | Não fechar RM-AUD19-02/10: matriz de outros controles, erros HTTP/RBAC/revisão e validação física permanecem. 0258 BLOCKED_AUTHORIZATION. Ver [REGISTROS/0271.md](REGISTROS/0271.md). 0272 não iniciada. |
| 18 | **0272 — navegação, mapa e alertas Motoboy** | Controles Motoboy de provedor de navegação, avanço/reordenação, endereço, mapa e alertas; RM-AUD19-02/10 mantêm estados globais | **Executada; PARTIAL.** Corrigidos provedor forçado no foco, autoNext inerte e alertas sem rechecagem foreground. Browser autenticado validou subset; operação com entrega sintética foi bloqueada por 502 no endpoint da fixture. Mapa vazio sem GPS passou; reordenação e telas restantes foram revisadas sem necessidade de mudança. | Preservar RM-AUD19-02/10 como PARTIAL; a limitação Browser do autoNext/502 foi resolvida em 0274. Validar GPS/permissões/apps externos no Android físico permanece pendente. P1 `RM-UI-ACCOUNT-TOPBAR` não pertence a 0272. Ver [REGISTROS/0272.md](REGISTROS/0272.md); commits locais Motoboy `ef91ceeb32f9d8361445b03c176d87987f2602da` e `e0386b1b502fe9b23d86b6516f9ff4e57590c858`. 0273 não iniciada. |
| 19 | **0273 — navegação da conta pela barra superior do Restaurante** | `RM-UI-ACCOUNT-TOPBAR` | Executada; **PASS_SCOPE** no Browser/CDP; PENDING_OWNER físico. | Causa corrigida: marcador delegado ausente e destino autenticado ajustado à página dedicada; toque/clique, retorno a Ajustes, reload, teclado/foco passaram em 5 larguras × 2 temas. 19 RM-AUD19 preservados. | Evidência: [REGISTROS/0273.md](REGISTROS/0273.md) e [capturas/relatório](EVIDENCIAS/0273/). Chrome Android físico permanece gate do proprietário; 0258 BLOCKED_AUTHORIZATION. |
| 20 | **0274 — HTTP 502 e autoNext operacional** | runner `browser-tests`; limitação 0272 de Browser operacional | Executada; **PASS_SCOPE** para causa do 502, endpoint e cenários A/B/C/D; PENDING_OWNER físico. | Teardown foi corrigido para fechar Chromium antes do rollback/API e sincronizar com bootstrap/readback. `POST /api/sync/installations/motoboy` real 200; autoNext ligado/desligado, rota encerrada e erro de armazenamento passaram com ACK/readback e zero resíduos. Nenhum código de app alterado. | [REGISTROS/0274.md](REGISTROS/0274.md), [JSON e capturas](EVIDENCIAS/0274/); commits locais Browser `f31284a`, `317ff09`, `62dbef7`; histórico 0274 a publicar. 19 RM-AUD19 preservados; 0258 BLOCKED_AUTHORIZATION. |
| 21 | **0277 — viabilidade OSRM Termux e implantação E2E** | `RM-0277-OSRM-TERMUX`, `RM-D1-LOCATION-CONSISTENCY`, geometria dos mapas Restaurante/Motoboy | **Executada; BLOCKED.** Diagnóstico ARM64/Termux, toolchain, recursos, package catalog e adapter concluído; nenhum pacote, dado, build ou serviço instalado/iniciado. | Prosseguir somente com autorização para ensaio nativo limitado e PBF custom verificado, ou ambiente Linux ARM64 isolado. Exigir provider OSRM real, endpoint, dois mapas, duração semanticamente separada de ETA e cleanup. Ver [REGISTROS/0277.md](REGISTROS/0277.md). Não iniciar 0278 automaticamente. |
| 22 | **0278 — API de roteamento OpenStreetMap** | `RM-0278-OSM-ROUTING`, RM-0277-OSRM-TERMUX, `RM-D1-LOCATION-CONSISTENCY` | **Executada; PARTIAL.** Factory OSRM/ORS e adaptador ORS testados localmente; sem credencial real/chamada externa. Mapas e atualização canônica ainda não comprovados. | Só concluir com provider autorizado real, geometria validada no backend e em ambos mapas, mutações Route canônicas/ACK-readback e E2E reversível; profile moto e autorização comercial/dados externos precisam resolver. Ver [REGISTROS/0278.md](REGISTROS/0278.md). Nenhuma campanha subsequente iniciada. |

## Atualização da execução — 0271

0271 foi executada com **PARTIAL**. Três caminhos do Motoboy passaram Browser/CDP autenticado sob falha de armazenamento, retenção de rascunho após rerender, retry/readback e viewports 360/390/768 nos dois temas. `npm test` do Motoboy passou. O restante das configurações e os estados globais RM-AUD19-02/10 continuam PARTIAL; validação física é PENDING_OWNER. Ver [REGISTROS/0271.md](REGISTROS/0271.md). 0272 foi executada; 0273 foi executada; 0274 executada; 0275 não iniciada automaticamente.

## Execução concluída — 0256-D2

O registro [0256-D2](REGISTROS/0256-D2.md) é **PARTIAL**: correções comprovadas para toast móvel e QR de impressão sintético; demais itens permanecem conforme sua própria matriz. Commits locais Restaurante `cd5b35f7`, Browser Tests `7cc401b`; sem push dos repositórios de aplicação/teste. `npm test` e E2E fixture não encerram a auditoria completa. Nenhuma campanha posterior foi adiantada. A ordem segue com 0256-E e 0256-F antes de 0257; edição canônica de usuário/Driver e auditoria administrativa dependem das capacidades/autorizações indicadas na matriz.

## Dependências que não devem ser antecipadas

1. **Contrato incompleto ou comportamento não identificado:** ocorrência de edição (owner/users/profiles/Drivers) precisa de passos/capturas e autorização esperada; D2 começa com diagnóstico e implementa somente o suporte contratual já existente.
2. **Migration/privilégio:** leitura administrativa do audit log e identidade global. 0257 pode desenhar/testar em `rotamoto_e2e`; qualquer alteração de schema/grant persistente fica atrás de 0258 e autorização explícita.
3. **Integrações externas:** onboarding, documentação e credenciais oficiais por marketplace. Nenhuma conta externa deve ser conectada durante 0256-D2 ou 0257.
4. **Hardware:** QR/ impressão, Chrome Android real, teclado, GPS/câmera e suspensão não são atestados por CDP; manter `PENDING_OWNER` até evidência do aparelho.
5. **Backup/DR:** só targets disposable para teste. Custódia, destination offsite e recuperação oficial dependem de aprovação, não entram automaticamente em 0256-E.

## Atualização obrigatória no fechamento de campanha

Cada registro deve incluir tabela comparativa de todos os IDs tocados: `RESOLVIDO + evidência`, `REMANESCENTE`, `BLOQUEADO + dependência`, `REGRESSÃO` e `NÃO TESTADO`. Atualizar [inventário](INVENTARIO_UNICO_PROBLEMAS.md), [backlog](BACKLOG_MESTRE.md) e estado atual, preservando IDs e linhas antigas. Publicar apenas histórico conforme política de repositórios.


## Atualização de execução — 0256-D3

A campanha D3 trata somente `RM-AUD19-02`, `RM-AUD19-10` e `RM-D1-SETTINGS-SAVE`, com estado PARTIAL e matriz por fonte de dados em [REGISTROS/0256-D3.md](REGISTROS/0256-D3.md). Os demais itens da auditoria não mudam de estado. A ordem subsequente preserva 0256-E, 0256-F, 0257 e os gates/dependências 0258–0268.

## Atualização de execução — 0256-D4

D4 segue PARTIAL: diagnóstico confirmou falha no lifecycle do CDP, correção de reconexão e prova Browser autenticada para o subset detalhado no registro. O runner ampliado foi interrompido sem relatório final; não fecha `RM-AUD19-02/10`. Próximo passo de salvamento é completar somente a matriz remanescente e negativos da D4, sem iniciar campanha dependente nem remover 0256-E/F e 0257–0268.

## Atualização de execução — 0256-D5

D5 completou ciclos autenticados e reversíveis para Operação (fixo/arredondamento/repasse), cor de destaque, impressão, atalhos, 12 valores de origens, localização Company e criação/readback de perfil e usuário locais. Testou erros Company 401/403/400/409 e perda de rede. A política de agrupamento de rotas não confirmou gravação pela UI; APIs de Logística responderam 200 sob handler real, mas não tiveram escrita/readback; portanto `RM-AUD19-02/10` permanecem PARTIAL. O backup continua desabilitado no runtime (503) e fixture (fallback 404), sem ser ativado. O ponto exato em que D4 parou não está registrado; evidência não autoriza atribuir causa ao aplicativo. Ver [REGISTROS/0256-D5.md](REGISTROS/0256-D5.md).

Não iniciar automaticamente 0256-E nem outra campanha. Próxima decisão de sequência permanece no roadmap: antes de avançar os gates, completar a matriz de gravação de agrupamento/Logística e dirty state; preservar 0256-E/F e 0257–0268 com dependências existentes.


## Atualização de execução — 0256-D6

D6 comprovou e corrigiu a causa de agrupamento de rotas: a leitura canônica de Company não ocorria na primeira abertura de Operação, deixando o seletor desabilitado/sem revisão. O PUT via UI passou. Os handlers de produção de Logística passaram alteração, readback, revisão conflitante e validação em fixture E2E; a localização de Company coincidiu com a origem de estabelecimento na leitura canônica. A exibição das coordenadas no DOM de ambas as páginas, reload por formulário, nova sessão e estados visuais de erro/draft/retry ainda não foram provados; RM-AUD19-02/10 e 03 permanecem PARTIAL. Registro e limites em [REGISTROS/0256-D6.md](REGISTROS/0256-D6.md). Não iniciar automaticamente 0256-E/F ou outra campanha; roadmap e dependências 0256-E/F e 0257–0268 permanecem como antes.

## Atualização de execução — 0256-E

0256-E concluiu com **PARTIAL**: Local-First foi distinguido de backup PostgreSQL; testes focados de backup e uma restauração em cluster efêmero passaram; a corrida de lock não foi reproduzida. O teste integral do Restaurante parou antes do escopo de backup devido a versão stale em `test-help-center.js`; Motoboy `npm test` passou. O endpoint administrativo permanente retorna `BACKUP_ADMIN_NOT_CONFIGURED`; não foi habilitado. O runner Browser autenticado disponível retém fixtures em `rotamoto_e2e`, então não foi executado. Custódia, offsite, RPO/RTO, recuperação em outro host e UI autenticada continuam bloqueios. Registro: [REGISTROS/0256-E.md](REGISTROS/0256-E.md). Não iniciar 0256-F ou outra campanha automaticamente; a ordem continua preservada, com 0256-F e 0257–0268 sem alteração de escopo.


## Atualização de execução — 0261

0261 foi executada com **PARTIAL**. A evidência real cobre backend canônico, confirmação sintética do mapa e DOM em Chromium/CDP; não cobre o uso físico Android nem todas as configurações da matriz D3–D6. RM-AUD19-02, 03 e 10 e os aliases Company permanecem PARTIAL. O Motoboy permanece consumidor somente leitura conforme contrato, sem prova nova do pull nesta campanha. 0262 segue a próxima campanha do roadmap, mas não foi iniciada automaticamente. Não liberar 0258.

## Atualização de execução — 0263

0263 encerrou **PARTIAL**. Topologia runit/nginx/APIs/PostgreSQL foi conferida; Browser/CDP anônimo no runtime permanente cobriu ambos os frontends, cinco larguras e dois temas, erro/recovery de rede, isolamento do shell e login, sem overflow, JS exceptions ou 5xx. Um ciclo down/up foi limitado ao serviço E2E `rotamoto-api-e2e` e restaurado com readiness e dependência PostgreSQL prontos. `npm test` dos dois apps, teste sync, identity HTTP E2E transacional e domínio/sync PostgreSQL passaram com rollback. Browser autenticado diretamente contra runtime permanente permanece BLOCKED por falta de identidade sintética não persistente nesse processo. A tentativa de `npm run test:postgres` sem `NODE_ENV=test` foi recusada antes de conexão; o guard também exige banco descartável para migrations DOWN/cleanup, indisponível nesta execução. Nenhum contorno. RM-0263-RUNTIME-RELEASE e RM-AUD19-07/12 continuam PARTIAL; todos os 19 itens e lacunas 0261/0262 foram preservados. 0258 segue BLOCKED_AUTHORIZATION; 0264 não foi iniciada. Ver [REGISTROS/0263.md](REGISTROS/0263.md).

## Atualização de execução — 0264

0264 foi executada com **PARTIAL**. Browser/CDP autenticado e transacional passou cadastro/elegibilidade/dispatch, ACK/replay, isolamento e matriz de 20 viewports/temas. Outro Browser autenticado cobriu Order de origem iFood executada pela frota própria, cancelamento após coleta, retry após 503, RETURN no fim da rota e handover no Motoboy. PostgreSQL transacional passou receipt, replay, conflito de revisão, RBAC/CSRF/tenant e preservação das demais paradas. `npm run test:logistics`, `npm run test:sync`, `test:logistics-postgres` e domínio/sync passaram; `npm test` Motoboy passou. `npm test` Restaurante falhou no certificado TLS do teste de backup e ficou aberto até interrupção. Não foi executado o Browser 0148 porque retém fixture fora de transação. Falta concorrência real e jornada Browser única de aceite/coleta/entrega/proof/receipt; 0258 continua bloqueada e 0265 não foi iniciada. Ver [REGISTROS/0264.md](REGISTROS/0264.md).


## Atualização da execução — 0280

0280 executada com **PARTIAL**. Identidade E2E sintética autenticada por fixture existente, sessões API-issued, MFA e rollback em `rotamoto_e2e`; nenhuma escrita oficial. Perfil Company salvo e lido de volta. Corrigida a geocodificação automática no save geral. A interface Browser não emitiu PUT de localização; sync ao Motoboy, matriz HTTP/concorrência e matriz visual seguem pendentes. Regressões direcionadas e `npm test` dos dois aplicativos passaram. Cleanup comprovado com `databaseCommitted=false` e contagens tenant-scoped zero. Manter IDs e estados globais, 0258 BLOCKED_AUTHORIZATION e ORS PENDING_EXTERNAL_CREDENTIAL. Ver REGISTROS/0280.md. Não iniciar 0281 automaticamente.


## Atualização da execução — 0281

0281 executada com **PARTIAL**. Histórico recuperado por fast-forward seguro: `origin/main` passou a conter 0280 em `ff35fa3f96c42b8c06f8206c013185fb3469108a`; leitura remota validou o registro, evidências, estado e inventário. O PUT não observado em 0280 decorreu de evento CDP incompleto no runner; clique efetivo executou formulário, PUT/ACK/readback e endereço sem coordenadas. Confirmação manual gerou localização canônica; sync e IndexedDB Motoboy após reload confirmados. A tela renderizada de Ajustes Motoboy e matrizes visuais/HTTP/concorrência/tenant seguem pendentes. `npm test` de ambos passou. Fixtures isoladas: 14 rollbacks, databaseCommitted=false e resíduos tenant-scoped zero; manifests FAILED nas verificações Browser posteriores. Sem escrita oficial. IDs globais preservados; 0258 BLOCKED_AUTHORIZATION, ORS PENDING_EXTERNAL_CREDENTIAL. Não iniciar 0282. Ver REGISTROS/0281.md.
## Execução 0285 — autenticação E2E e recuperação Browser

**PARTIAL.** Sessão HttpOnly emitida pelo backend E2E autenticou Chromium, MFA verificada, reload manteve sessão. Foi reproduzida e corrigida a perda de endereço quando reload ocorre com PUT pendente; DOM/IndexedDB preservaram o rascunho e backend permaneceu no endereço anterior sem ACK/falso sucesso. Regressões, `npm test` Restaurante e testes CDP passaram; cleanup `rotamoto_e2e` COMPLETED, databaseCommitted=false, resíduos zero. O 401 de 0284 e o caminho UI login/MFA não foram diagnosticados de forma conclusiva. Cenários de falhas persistentes, IndexedDB, concorrência, isolamento, visual integral autenticado e Motoboy seguem pendentes. Manter RM-AUD19-02/03/10, RM-D1-SETTINGS-SAVE, RM-D1-LOCATION-CONSISTENCY e RM-D1-AUTH-RESUME PARTIAL; manter 0258 BLOCKED_AUTHORIZATION e ORS PENDING_EXTERNAL_CREDENTIAL. Próxima campanha não iniciada. Ver [REGISTRO 0285](REGISTROS/0285.md).


## Execução 0292

0292 **PARTIAL**. Corrigidos defeitos funcionais de feedback Company e projeção Logística com coordenadas null. Nome, telefone, fuso e endereço salvaram por UI com confirmação canônica; navegação/reload/aba, retry 503, valor inválido e clique duplo validados. `npm test` Restaurante passou; fixture rollback e resíduos zero. Formulários restantes, Motoboy, coordenadas válidas e falhas adicionais sem comprovação. RM-AUD19-02/03/10 seguem PARTIAL; não iniciar 0293. [Registro](REGISTROS/0292.md).
## Atualização — 0299

0299 concluiu como **PARTIAL / PENDING_USER_APPROVAL**. A prévia isolada do Início v2 foi validada em Browser autenticado nos viewports registrados, sem overflow, com acesso RBAC e saída para o Início atual. A imagem de referência foi obtida da pasta Downloads. A versão existente permanece preservada. A avaliação visual do proprietário é o próximo gate; não integrar a POC nem iniciar 0300 antes da decisão humana. Ver [REGISTROS/0299.md](REGISTROS/0299.md) e [evidências](EVIDENCIAS/0299/).
