## Consolidação vigente — Campanha 0146 (2026-10-13)

Esta seção atualiza os itens de worker, concorrência, restart e outbox reexaminados em 0146. As matrizes anteriores permanecem preservadas; status antigo só é supersedido nos itens identificados abaixo.

**Contagem 0146 (7 itens): RESOLVED 3 · PARTIAL 2 · OPEN 1 · BLOCKED 1.**

| ID | Status / prioridade | Item e evidência | Dependência / próximo passo |
|---|---|---|---|
| 0146-R1 | **RESOLVED / P1** | Bootstrap do Restaurante não deve converter dados canônicos em mutações locais. Browser reproduziu republicação após reload; escrita de normalização IndexedDB foi corrigida e `serverOrderReplayCount=0` na evidência final. | Preservar teste de restart em futuras mudanças de normalização e migração IndexedDB. |
| 0146-R2 | **RESOLVED / P1** | Concorrência worker: dois backends PostgreSQL distintos disputaram a mesma operação; um claim/efeito sintético, sem duplicação. | Manter corrida determinística como regressão com roles E2E dedicadas. |
| 0146-R3 | **RESOLVED / P1** | Interrupção após início do efeito sintético: `SIGKILL`, lease expirado, `unknown_outcome`, `attempts=1`; recuperação não retransmitiu efeito incerto. Replay/eventos concorrentes preservaram inbox e projeção mais nova. | Continuar exigindo chave idempotente/consulta de resultado antes de qualquer repetição externa incerta. |
| 0146-P1 | **PARTIAL / P1** | Outbox local sobreviveu a offline simulado, 503 e reload; ACK deixou uma Order. Evidência cobre IndexedDB/Chromium e endpoints controlados, não rádio ou processo Android. | Testar em dispositivo Android a queda/restauração de rede, suspensão/força-parada e retomada com perfil persistente. |
| 0146-P2 | **PARTIAL / P2** | RETURN/custódia e separação Order/Delivery passaram nas suítes existentes; Browser final confirmou que Order externo desconhecido não ganha Delivery/QR. Não foi repetido fluxo bilateral completo nem matriz provider de cancelamento pré/pós-coleta nesta campanha. | Acrescentar cenários sintéticos somente para transições documentadas, preservando entregador custodiante, RETURN explícito e fulfillment plataforma. |
| 0146-O1 | **OPEN / P1** | Recuperação foi testada com worker Node morto e adapter sintético, mas não com interrupção do host/app Android durante atividade real; rede foi simulada por `navigator.onLine`/503. | Completar validação física em aparelho e registrar limites; não deduzir sucesso físico da simulação. |
| 0146-B1 | **BLOCKED / P1 externo** | Homologação de iFood/Keeta/99Food e efeitos remotos reais não executados. O worker exercitou estado incerto sem contatar provider; 99Food permanece sem contrato/onboarding registrado. | Usar sandbox e contratos/credenciais oficiais autorizados quando disponíveis. Nenhum endpoint ou regra foi presumido. |

**Segurança de dados:** somente `rotamoto_e2e` foi usado nos testes PostgreSQL; `rotamoto` não foi acessado, nenhuma migration foi executada e não houve deploy. A migration 0041 permanece documentada como **APPLIED** em [REGISTROS/0140.md](REGISTROS/0140.md), sem nova verificação nesta campanha. Detalhes em [REGISTROS/0146.md](REGISTROS/0146.md). Não iniciar Campanha 0147.

## Consolidação vigente — Campanha 0145 (2026-10-13)

Esta atualização supersede somente as evidências/itens de Orders externos, sua projeção de Delivery/QR e sync que foram reexaminados em 0145. As demais matrizes e registros permanecem preservados.

**Contagem 0145 (8 itens): RESOLVED 3 · PARTIAL 1 · OPEN 2 · BLOCKED 2.**

| ID | Status / prioridade | Item e evidência | Dependência / próximo passo |
|---|---|---|---|
| 0145-R1 | **RESOLVED / P1** | `marketplace-runtime` só aceita atualizar Order/cursor quando `occurredAt` é estritamente posterior; teste PostgreSQL comprovou que evento iFood CANCELLED empatado/antigo não reverte `PLACED`, enquanto evento posterior atualiza e publica uma vez. | Manter testes de precedência; validar sequências/timestamps específicos se contratos oficiais documentarem outro sinal confiável. Empate sem sequência permanece sem avanço até evento/reconciliação posterior. |
| 0145-R2 | **RESOLVED / P1** | Inicialização do Restaurante não sintetiza Delivery para Order externo desconhecido; sync não cria Delivery nessa condição e QR exige Delivery local + `fulfillment: merchant`. Browser verificou IndexedDB com zero Delivery associada e nenhum QR na linha iFood. Corrige a alegação não demonstrada do runner 0144. | Preservar Deliveries preexistentes; se houver resíduos locais históricos, não apagá-los sem decisão/migração segura. |
| 0145-R3 | **RESOLVED / P2 (sintético)** | Browser manteve duas Orders locais na lista durante offline simulado, reconectou sem multiplicar e recuperou um 503 deliberado no pull/retry. | Validar interrupção de rádio/suspensão Android e reenvio de uma nova operação local pendente com perfil persistente. |
| 0145-P1 | **PARTIAL / P1** | Sync/cache da lista remota passa Browser; a retransmissão de uma alteração local ainda pendente após offline/503 e reinício do navegador não foi executada neste E2E. | Adicionar alteração sintética permitida no fixture, verificar IndexedDB/outbox, ACK, retry e reinício sem resíduo no banco. |
| 0145-O1 | **OPEN / P1** | Ordenação igual/antiga foi testada sequencialmente; nenhum E2E fez duas sessões/worker processarem eventos do mesmo Order em paralelo ou caiu/reiniciou worker no ponto de concorrência. A query bloqueia a linha de `marketplace_order_versions` com `FOR UPDATE`. | E2E com dois workers dedicados, timestamps invertidos, atraso de adapter, timeout e crash/restart; validar uma projeção/cursor/outbox final. |
| 0145-O2 | **OPEN / P1** | A projeção de CANCELLED mais recente foi testada sinteticamente. Matriz de cancelamento de Order por iFood/Keeta antes/depois da coleta e interação com custódia/RETURN não foi comprovada por sandbox nesta campanha. | Testar apenas transições e comandos documentados em adapters fake determinísticos; homologar separadamente quando houver sandbox autorizado; nunca converter plataforma-delivery em Delivery própria automaticamente. |
| 0145-B1 | **BLOCKED / P2 (infra de teste)** | `npm run test:marketplace-worker-postgres` falhou no guard antes da conexão: `E2E_PROVIDER_WORKER_DATABASE_URL` não fornecida como role dedicada. | Disponibilizar URL/role E2E dedicada já autorizada; não substituir por `rotamoto_app` nem relaxar o guard. |
| 0145-B2 | **BLOCKED / P1 (externo)** | Nenhum provider comercial foi contatado. iFood/Keeta requerem sandbox/credenciais autorizados; 99Food continua sem contrato/API completa e onboarding registrado em 0144. | Obter contrato e credenciais oficiais e homologar por provider. Não inventar endpoint/evento nem bloquear o desenvolvimento local. |

**Resultado:** PARTIAL, sem defeito crítico restante reproduzido após correções. A campanha não acessou `rotamoto` e não executou migration; 0041 continua APPLIED conforme [REGISTROS/0140.md](REGISTROS/0140.md), sem revalidação do ledger oficial. Ver [REGISTROS/0145.md](REGISTROS/0145.md). Não iniciar Campanha 0146.

## Consolidação vigente — Campanha 0143 (2026-10-13)

Esta consolidação atualiza somente pedidos/integrations com evidência da Campanha 0143. A matriz 0141 abaixo permanece como fotografia íntegra dos demais grupos e só é supersedida onde esta seção cita o mesmo assunto.

**Contagem 0143 (5 itens): RESOLVED 2 · PARTIAL 0 · OPEN 1 · BLOCKED 2.**

| ID | Status / prioridade | Item e evidência | Dependência / próximo passo |
|---|---|---|---|
| 0143-R1 | **RESOLVED / P2** | Significado de “marketplace” confirmado no código: subsistema técnico para plataformas externas; não existe checkout, catálogo comercial ou marketplace próprio. `CONTRACT.md`, `backend/integrations/*`, `server.js` e UI confirmam fronteiras. | Manter nome e fronteira documentados; não criar produto próprio por inferência. |
| 0143-R2 | **RESOLVED / P2** | Integração iFood/Keeta atual: webhook/poll → inbox idempotente → `Order` em `domain_records`/`marketplace_order_versions` → comandos autenticados por tenant/permissão/CSRF. Testes unitários, PG E2E e Browser autenticado exercitaram listagem, adapter simulado e comando. 0041 continua documentada como APPLIED pelos registros anteriores; esta campanha não acessou o banco oficial. | Manter regressões, RLS e idempotência em mudanças futuras. |
| 0143-O1 | **OPEN / P1 de desenvolvimento** | A gestão externa é apresentada em “Pedidos de marketplace” dentro de Integrações, enquanto a lista principal usa IndexedDB/sync. O runtime cria o Order canônico mas não emite evento correspondente em `sync_outbox`, que abastece o sync. A chegada também não cria `Delivery`; por si só isso é correto para fulfillment da plataforma, mas deixa o fluxo de entrega própria sem decisão/projeção integrada. Não é um checkout ausente: é lacuna da unificação solicitada. | Adicionar publicação canônica idempotente e UI sem duplicações; definir payload mínimo/privacy e autoridade do estado; especificar como fulfillment `self-delivery` habilita Delivery do fluxo existente sem interferir em `platform delivery`. Cobrir replay, ordem, RLS, navegador e PG E2E antes de concluir. |
| 0143-B1 | **BLOCKED / P1 externo** | Homologação real não ocorreu: adapters usam fixtures. iFood/Keeta dependem de sandbox/credenciais autorizados; 99Food não tem contrato/API/onboarding oficial disponível nos registros/código. | Homologar cada provider separadamente quando houver acesso/documentação oficiais. Não bloquear implementação local de outbox/visualização por TLS, SMTP ou infraestrutura de produção. |
| 0143-B2 | **BLOCKED / P2 de teste** | `test:marketplace-worker-postgres` recusou antes de conectar, faltando URLs autenticadas de roles dedicados do worker/resolver. | Disponibilizar as credenciais/roles já aprovadas de E2E ou registrar que o teste não é viável; não relaxar guard/role. |

**Riscos prioritários:** a lista operacional do Restaurante ainda não agrega o Order externo e não há prova de transição externa→fluxo canônico de entrega própria. Não atribuir automaticamente driver; manter fulfillment pela plataforma separado. A homologação comercial segue sem evidência. Resultado desta campanha: **PARTIAL**; ver [REGISTROS/0143.md](REGISTROS/0143.md). A campanha posterior não foi iniciada.

## Consolidação vigente — Campanha 0141 (2026-10-13)

Esta matriz consolida o estado atual comprovável. Checkboxes antigos abaixo são fotografias das campanhas que os produziram; não devem ser lidos como estado atual quando registros posteriores os supersedem. Código e suítes foram inspecionados estaticamente nesta campanha; não foram executados testes que pudessem escrever em banco/dados.

**Contagem desta matriz (14 itens): RESOLVED 4 · PARTIAL 4 · OPEN 1 · BLOCKED 5.** Prioridade P1 = segurança/operação necessária antes de uso operacional ampliado; P2 = validação de fluxo/hardware; P3 = decisão ou acabamento de produto.

| ID | Status / prioridade | Item atual e evidência | Dependência / próximo passo |
|---|---|---|---|
| 0141-R1 | **RESOLVED** | Migration `0041_delivery_custody_return` **APPLIED** em `rotamoto`; ledger 0001–0041, checksum `c75063f833da16a8efdd2e8d448bf1c7c3aee7e360be8d9e1f12397d15251a9c`. Registro posterior da 0140 descreve runner transacional, preflight sem linhas operacionais e validações pós-migration. | Nenhuma reaplicação. Validar apenas por documentação nesta campanha. |
| 0141-R2 | **RESOLVED** | RETURN bilateral, replay/idempotência, ACK/outbox, reconciliação cross-app, FIFO e cenários concorrentes têm resultados E2E posteriores em 0126–0138; attempt 17 de 0137 concluiu fluxo Browser, restart e teardown normal. | Manter regressões existentes; as tentativas antigas PARTIAL continuam preservadas como histórico. |
| 0141-R3 | **RESOLVED** | Isolamento tenant/RLS de `domain_records`, DeliveryProof e mídia corrigido/validado em 0134/0138; antigo alarme era oracle que ignorava chave composta. A exposição histórica de `secret_ref` em 0078 foi corrigida pela migration 0019 e verificada em 0079. Não foi encontrada evidência atual de defeito crítico aberto nesses pontos. | Não inferir auditoria de segurança completa: manter revisão de segurança e grants em qualquer nova migration. |
| 0141-R4 | **RESOLVED** | Correções visuais específicas documentadas em 0140 passaram: painéis de Relatórios em quatro combinações; controles do mapa sem colisão; confirmação física de GPS/mapa registrada pelo operador. | O PASS é somente para os componentes/cenários indicados; ver itens parciais abaixo. |
| 0141-P1 | **PARTIAL / P2** | UI global: estados vazios e Relatórios cobertos em capturas mobile/desktop claro/escuro, mas não todas as telas, modais, estados condicionais nem matriz completa multiviewport. 0140 mantém parecer visual global PARCIAL. | Completar inventário visual e revisão humana de aceite. Browser QA permanece somente consulta nesta campanha. |
| 0141-P2 | **PARTIAL / P2** | GPS/mapa: centralização e controles foram confirmados; cenários de permissão/sinal foram simulados. Não há prova completa de sessão autenticada, localização real, rota operacional e pins canônicos no aparelho. | Validar em Android com permissão e operação autenticada, sem tratar coordenada sintética como evidência física. |
| 0141-P3 | **PARTIAL / P2** | Acessibilidade: medições amostrais de contraste em Relatórios (mínimos reportados 4,75:1 claro e 6,03:1 escuro) e navegação coberta em alguns fluxos; não existe auditoria integral WCAG/teclado documentada para ambos os aplicativos. | Executar auditoria completa em campanha autorizada, incluindo foco, teclado, contraste e leitores de tela aplicáveis. |
| 0141-P4 | **PARTIAL / P2** | Mídia `filesystem-v1`: fluxo e persistência foram exercitados em E2E/dev isolado, com tenant e restart; isso não comprova instalação permanente no host operacional nem cobertura de arquivos fora da raiz identificada no ambiente de desenvolvimento. | Configurar/identificar host e raiz reais e demonstrar persistência, permissões, autorização e recuperação coordenada. |
| 0141-O1 | **OPEN / P3** | Liquidação financeira/settlement não está implementada; contrato define Earning como cálculo canônico, sem afirmar pagamento. É lacuna de capacidade deliberada, não bug atual nem autorização para movimentar dinheiro. | Decisão de produto/financeira, regras, reconciliação e contrato antes de planejar implementação. |
| 0141-B1 | **BLOCKED / P1** | Integrações iFood, 99Food e Keeta: código/adapters e testes sintéticos existem; registros 0130/0140 não comprovam sandbox, credenciais autorizadas, chamadas reais ou homologação. Painéis de integração em 0140 mostraram API indisponível (404 no servidor temporário). | Acesso autorizado a sandbox/documentação/credenciais e ambiente; homologar cada provedor isoladamente. |
| 0141-B2 | **BLOCKED / P1** | Deployment/produção: não há smoke test no host operacional e o estado documentado segue `ON_PREM_PRODUCTION_READY=NO`/produção não aprovada. TLS/CA, domínio/proxy, SMTP, serviço, scheduler/alertas, segredos duráveis e observabilidade dependem de ambiente real. | Provisionamento e janela aprovados; executar checklist e smoke no alvo, sem presumir sucesso de testes locais. |
| 0141-B3 | **BLOCKED / P1** | Backup de produção: recovery set 0140 pré-migration foi verificado e o restore isolado está documentado, mas isso não comprova pipeline recorrente no host atual, raiz de mídia operacional, cópia externa independente da chave, RPO/RTO medidos e rehearsal periódico do alvo. | Definir responsáveis/política, configurar mídia e custódia de chave, executar backup+restore no alvo descartável e registrar RPO/RTO. |
| 0141-B4 | **BLOCKED / P2** | QR/câmera física: scanner e fluxo sintético/testes de contrato existem; Chromium sem câmera física não comprovou leitura real nem permissões no Android. | Aparelho Android e permissão de câmera disponíveis; testar leitura, cancelamento, falha e alternativa manual. |
| 0141-B5 | **BLOCKED / P1** | Operação de identidade: os registros mostram dependências externas para bootstrap do primeiro operador, email/recuperação e custódia operacional de MFA. Os fluxos falham fechados; não há evidência de provisionamento operacional completo no deployment. | Definir operador/provisionamento e disponibilizar SMTP/segredo MFA com custódia aprovada; validar recuperação sem enfraquecer fail-closed. |

**Riscos prioritários:** antes de operação com usuários/dados reais, fechar B2/B3/B5 e homologar B1. B4 e P2 são bloqueios de validação física, não falhas comprovadas do scanner/GPS. Nenhum defeito crítico ativo foi reproduzido nesta auditoria documental; isso não substitui pentest nem readiness operacional.

Fonte detalhada: [REGISTROS/0141.md](REGISTROS/0141.md). Migration: [REGISTROS/0140.md](REGISTROS/0140.md) e [RESUMOS/0140.md](RESUMOS/0140.md).

## Atualização — Campanha 0135

- [x] **Dispatch Browser:** cadastro/vínculo, presença confirmada, manual padrão, opt-in, atribuição única, replay idempotente e convergência dos dois apps comprovados; FIFO e concorrência comprovadas em PostgreSQL E2E. Ver [REGISTROS/0135.md](REGISTROS/0135.md).
- [ ] **BLOCKED — paridade com oficial:** não existe URL read-only autorizada disponível; banco oficial não foi acessado.
- [ ] **Ambiente operacional:** storage de mídia, câmera/QR físico, homologação de integrações e deployment smoke continuam fora da prova E2E; sem declaração de prontidão para produção.

Ver [Registro 0135](REGISTROS/0135.md). Não iniciar Campanha 0136.

## Atualização — Registro 0134 — RLS multi-tenant

- [x] **RLS `domain_records`/DeliveryProof:** oracle diagnóstico corrigido em 0134 para avaliar chave composta e identidade de entidade; três execuções por roles operacionais, Browser HTTP e testes cross-tenant passaram.
- [ ] **BLOCKED — paridade oficial:** `MIGRATOR_DATABASE_URL` read-only autorizada não estava disponível; fornecer somente a URL aprovada para comparação. Banco oficial não foi acessado.
- [ ] **BLOCKED — storage operacional:** permissões, persistência e backup de `filesystem-v1` em host real ainda não foram validados; evidência é E2E isolada.

Ver [Registro 0134](REGISTROS/0134.md). Campanha 0135 está registrada; não iniciar Campanha 0136.

## Atualização — Registro 0133 — pendências de mídia e RLS

- [x] **RLS específico de `DeliveryProof`:** causa do alerta esclarecida no Registro 0134; asserção antiga ignorava chave composta/tenant. O conteúdo exato da linha da tentativa b8 não foi gravado e permanece impossível de identificar retrospectivamente.
- [ ] **BLOCKED — paridade oficial:** fornecer URL autorizada estritamente read-only; esta campanha não conectou ao banco oficial.
- [ ] **BLOCKED — storage operacional:** confirmar permissões, persistência e backup de `filesystem-v1` no host de homologação/produção. Evidência atual cobre somente diretório isolado E2E.
- [x] RETURN bilateral e teardown normal do Chromium (exit 0) comprovados em Browser novo. Regressões críticas 0120/0121/0122 passaram.

Ver [Registro 0133](REGISTROS/0133.md). Sem readiness de produção e sem iniciar outra campanha.

## Atualização — Registro 0132 — comprovantes de entrega

- [x] **MÉDIO — persistência local de comprovante:** Motoboy corrigido para passar `DeliveryProof` pela transação local e testar regressão.
- [x] **MÉDIO — ACK de mídia separado do ACK dos metadados:** upload precede inclusão canônica; falha mantém a prova na outbox local; retry idempotente validado por Browser/PG.
- [ ] **BLOCKED — tenant cross-login no Browser:** RLS de dois tenants passou no E2E; falta repetir GET da mídia com uma sessão autenticada de empresa distinta.
- [ ] **BLOCKED — paridade de segurança oficial:** `test:e2e-security` requer URL oficial read-only, indisponível; não acessar/configurar sem requisito fornecido.
- [ ] **BLOCKED — storage operacional:** confirmar configuração/autorização do provider `filesystem-v1` em homologação/produção; campanha provou somente `rotamoto_e2e`.
- [ ] **PARTIAL — teardown Browser RETURN:** cenário completo registrou handover e recebimento bilateral no E2E, mas o runner não encerrou após gravar o relatório; repetir verificação de teardown/rollback limpo.

Ver [Registro 0132](REGISTROS/0132.md). Nenhuma prontidão de produção foi declarada.

## Atualização — Registro 0131 — correção visual concluída

- [x] **MÉDIO — painel de presença Motoboy:** causa corrigida no CSS; status legível em 360/390/768/1366 px, sem overflow, controles contidos e não sobrepostos. Browser autenticado cobriu Online, Offline, presença pendente/confirmada, teclado, check-in, confirmação Restaurante, QR scanner e saída.
- [ ] **BLOCKED — leitura QR por câmera física:** o botão abre o scanner; Chromium headless não tem câmera física. Validar leitura real em dispositivo com permissão de câmera quando disponível.
- [ ] Permanecem os riscos de 0130 sem relação com a correção visual: media storage real, homologação de iFood/99Food/Keeta, GPS/câmera física, WCAG integral e deployment smoke. Não representam regressão desta campanha.

Ver [Registro 0131](REGISTROS/0131.md). Correção responsiva encerrada; não iniciar campanha seguinte sem solicitação.

## Atualização — Registro 0130 — riscos e cobertura restantes

- [x] **MÉDIO — visual Motoboy:** painel de presença corrigido e revalidado em Browser nos quatro viewports pela Campanha 0131; ver [REGISTROS/0131.md](REGISTROS/0131.md).
- [x] **MÉDIO — prova de entrega E2E:** upload/consulta autenticados, persistência IndexedDB, restart e recuperação por falhas passaram nas campanhas 0132/0135; storage operacional/backup ainda precisa de validação no host alvo.
- [x] **MÉDIO — dispatch Browser:** Campanha 0135 comprovou cadastro/vínculo, presença confirmada, manual padrão, opt-in automático, atribuição única, replay idempotente e convergência cross-app. Browser com um Driver elegível; FIFO/múltiplos candidatos e interleavings cobertos em sessões PostgreSQL independentes. Ver [REGISTROS/0135.md](REGISTROS/0135.md).
- [ ] Homologar iFood/99Food/Keeta com sandbox/credenciais autorizados; testes desta campanha foram sintéticos. Verificar QR/câmera/GPS físicos em Android.
- [ ] Rodar contraste WCAG/teclado integral e deployment smoke em ambiente operacional autorizado. Nenhuma prontidão para produção foi declarada.
- Earning é cálculo canônico, não liquidação; settlement permanece fora da funcionalidade implementada. Oficial 0040 read-only; E2E 0041.

Ver [Registro 0130](REGISTROS/0130.md).

## Atualização — Registro 0129 — gate de ACK/restart fechado

- [x] A lacuna de ACK parcial HTTP + IndexedDB real e reinício que deixara o Registro 0128 PARTIAL foi fechada nos dois apps com Chromium real, perfil persistente e PostgreSQL `rotamoto_e2e`.
- [x] ACK inválidos preservam pacote/operações; ACK completo permite replay idempotente. Route concorrente converge; evento concorrente Motoboy foi provado persistido localmente após reload.
- [x] Corrigida ordenação de ACCEPTED/PICKED_UP offline via `expectedVersion`; Browser/PG confirmou sequência canônica.
- Nenhuma alteração no banco oficial (0040 read-only); E2E em 0041. Limites de ambiente e cobertura estão descritos no [Registro 0129](REGISTROS/0129.md).

## Atualização — Registro 0126 (2026-10-10)

- [x] **Campanha 0126 — Browser RETURN completo:** attempt-38 completou fluxo offline, reconexão, handover e recebimento bilateral com PostgreSQL e Motoboy convergidos.
- [x] **Campanha 0126 — regressões 0120/0121/0122:** passaram em tentativas isoladas attempt-02.
- [x] **Campanha 0126 — concorrência do recibo RETURN:** duas sessões autenticadas e transações PostgreSQL independentes; chave igual produziu replay idempotente e um fato; chaves distintas produziram uma confirmação e conflito de revisão ou duplicata convergente, também com um fato.
- Escopo mais amplo ainda não coberto por esses gates: payload divergente/replay de criação RETURN, reorganização concorrente e todas as combinações RELEASE/INCIDENT offline. Banco oficial permaneceu read-only em 0040; E2E 0041.

Ver [Registro 0126](REGISTROS/0126.md). A auditoria solicitada 0127 está registrada abaixo.

## Atualização — Registro 0127 — achados a acompanhar

- [x] **MÉDIO — ACK completo:** validação bijetiva de packetId/tenant/device/operação/entidade/ID antes de persistir ACK; remoção do pacote após commit.
- [x] **MÉDIO — concorrência:** semântica de no-op/revisão assertada; três repetições com sessões independentes passaram.
- [x] **BAIXO — proveniência:** runners gravam campaign/runId/orderNo atuais; nenhuma evidência antiga editada.
- [x] **BAIXO — tela RETURN:** RETURN recebido não exibe espera de sync nem valor financeiro inventado.
- [x] **BAIXO — migrations test:** inventário 0039–0041, 46 tabelas, RLS/grants/constraints conferidos no E2E.

Ver [Registro 0127](REGISTROS/0127.md) e [Registro 0128](REGISTROS/0128.md). A lacuna de ACK parcial HTTP com IndexedDB e reinício real foi fechada pela 0129; ver [REGISTRO 0129](REGISTROS/0129.md).

## Atualização — Registro 0124 (2026-10-10)

- [ ] **OPEN — Browser RETURN completo:** runner autenticado confirmou criação/apêndice no PostgreSQL, mas trava ao abrir/validar reorganização da rota; diagnosticar CDP, console, rede e navegação com perfil novo, então completar execução, arrival, handover e recebimento bilateral Browser.
- [ ] **OPEN — concorrência RETURN independente:** criar testes com sessões PostgreSQL independentes para criação idempotente/concorrente, reorganização, confirmação simultânea, replay e payload divergente. O harness atual do teste de domínio serializa em um único cliente.
- [ ] **OPEN — offline RETURN e decisões:** testar RETURN/RELEASE/INCIDENT e divergências de custódia ponta a ponta online/offline, preservando fatos não confirmados.
- [ ] **OPEN — migration oficial:** `rotamoto` permanece 0040; 0041/0042 somente com autorização. E2E permanece 0041; nenhuma 0042 preparada.

Ver [Registro 0124](REGISTROS/0124.md). Não iniciar Campanha 0125 sem solicitação.

## Atualização — Registro 0123 (2026-10-10)

- [ ] **OPEN — Browser RETURN completo:** executar com novo fixture autenticado o fluxo criar/atribuir, aceitar/coletar, cancelar após coleta, decidir RETURN, criar na rota, reordenar na UI, registrar start/arrival/handover no Motoboy e confirmar recebimento no Restaurante; validar refresh/reabertura, IndexedDB/outbox/inbox e PostgreSQL. O teste transacional HTTP/PG não substitui Browser.
- [ ] **OPEN — regressão 0121:** investigar travamento CDP após a confirmação da presença e antes da criação/sync de Order/Delivery. A tentativa parcial e capturas estão em `browser-tests/evidencias/campanhas/0123/regressao-0121/`; repetir em perfil/porta novos.
- [ ] **OPEN — concorrência RETURN:** usar sessões PostgreSQL independentes para dois operadores criarem RETURN/confirmarem receipt e para reorganização concorrente; cobrir payload divergente, replay e revisão antiga.
- [ ] **OPEN — offline RETURN e divergência:** Browser C–J, release/incident, chegada e handover offline, receipt por outra sessão e convergência após revisões da rota; não aplicar eventos rejeitados retroativamente.
- [ ] **OPEN — migration oficial:** `rotamoto` permanece em 0040. Não aplicar 0041/0042 sem autorização expressa. `rotamoto_e2e` permanece em 0041; não há 0042 preparada.

Ver [Registro 0123](REGISTROS/0123.md). Não iniciar Campanha 0124 sem solicitação.

## Atualização — Registro 0078 (2026-10-06) — BLOQUEIO DE SEGURANÇA

- [ ] **CRITICAL/BLOCKED:** `rotamoto_app` tem SELECT efetivo na coluna `logistics_providers.secret_ref` pela permissão de tabela concedida na 0017. Não fazer grant/revoke manual nem rollback improvisado. Projetar migration aditiva corretiva e testar grants/RLS antes de liberar providers.
- [x] Backup coordenado pré-migration foi cifrado/verificado e preservado; ledger oficial está em 0018. A 0018 foi aplicada antes de o defeito do checkpoint 0017 ser percebido; não há correção automática aplicada.
- [ ] Depois da correção aprovada: validar catálogo completo 0018, readiness, `npm test` dos dois apps, testes PostgreSQL E2E, guards, audit, sintaxe/diff. Nenhuma dessas suítes finais foi executada nesta campanha após o gate falhar.

Ver [Registro 0078](REGISTROS/0078.md). Em qualquer continuação, começar por estado read-only; não reaplicar migrations nem tocar no backup/chave.

## Atualização — Registro 0077 (2026-10-06)

- [x] Heatmap histórico territorial implementado com snapshot de destino manual, RLS/FORCE, agregação por célula, limiar k=5, cobertura e filtros tenant-scoped. Não promove GPS/endereços/coords locais e não usa geocoding durante renderização.
- [ ] **OPEN — rollout:** aplicar migrations autorizadas 0016–0018 no deployment pretendido e confirmar readiness; o banco oficial não foi alterado nesta campanha.
- [ ] Coletar snapshots canônicos de destino por fluxo controlado para criar cobertura real; não inventar coordenadas. Geocoding gerenciado e mapa administrativo de bairros não foram implementados.
- [ ] Browser E2E autenticado do relatório: NOT_TESTABLE sem sessão/CDP disponível.
- [ ] Rentabilidade territorial requer receita e custos completos; SLA territorial requer deadline/promisedAt confiável; comparação provider preço/ETA requer dados/adapters comprovados.

Ver [Registro 0077](REGISTROS/0077.md). Os gates gerais de deployment on-prem dos Registros 0068/0069 permanecem pendentes e não foram reabertos.

## Atualização — Registro 0076 (2026-10-06)

- [x] Fundação tenant-scoped de provider/fulfillment/dispatch manual, RLS/FORCE, isolamento e fallback testados em PostgreSQL E2E transacional; commit local Restaurante `4b943b1`, sem push.
- [ ] **OPEN — rollout do schema:** aplicar migrations 0016 e 0017 no deployment oficial pelo fluxo autorizado e confirmar health/readiness. Nenhuma migration oficial foi executada nesta campanha.
- [ ] **OPEN — alocações legadas:** revisar entregas já atribuídas antes da 0017; não existe backfill automático de fulfillment histórico. Operação/reatribuição suportada cria projeção interna.
- [ ] **OPEN — automação logística:** integrar protocolos reais e fluxos de quote/dispatch/cancel/tracking/reconciliação somente após documentação, credenciais e homologação dos providers; acrescentar guardas/autorizações de eventos externos.
- [ ] Continuam separados os gates on-prem dos Registros 0068/0069: paths/chaves duráveis e cópia offline, scheduler/monitoramento, smoke real TLS/CA/proxy/SMTP/URL/keystore/filesystem/readiness e medição/decisão RPO/RTO/retenção.
- [ ] Browser E2E autenticado da tela de providers/fulfillment ficou NOT_TESTABLE nesta sessão; executar no próximo harness com sessão autorizada.

## Atualização — Registro 0073 (2026-10-05)

- OCR multi-layout local/offline implementado e verificado com corpus sintético e Chromium offline. Não há bloqueio interno de código identificado nesta campanha.
- [ ] Validar OCR/câmera em Android físico com comandas reais anonimizadas, registrar métricas por campo e ajustar thresholds/aliases somente a partir dessa evidência. Não inferir qualidade de produção do corpus sintético.
- O gate recovery PostgreSQL+mídia não vazio listado em registros anteriores foi encerrado pelo Registro 0068; as entradas históricas abaixo não representam estado atual desse gate.

Ver [Registro 0073](REGISTROS/0073.md).

## Atualização — Registro 0067 (2026-10-05)

- [ ] **OPEN — recovery não vazio + teardown:** o lifecycle autenticado criou a prova, mas o trigger append-only impediu apagar 15 audit rows; Company/User permanecem pelas FKs. Não remover/alterar auditoria nem enfraquecer o trigger. Definir procedimento E2E que mantenha fixture transacional visível ao snapshot/pg_dump e reverta integralmente, ou reset isolado aprovado para `rotamoto_e2e`.
- [ ] Recovery-set `rotamoto_e2e`→restore descartável não ficou comprovado nesta tentativa; não há ID/checksum aprovado para registrar.
- [ ] Paths/chave duráveis e cópia offline; scheduler/monitoramento; smoke TLS/CA/proxy, SMTP/PUBLIC_BASE_URL, keystore/readiness; medir RPO/RTO e decidir retenção/offsite conforme Registro 0064.

Ver [Registro 0067](REGISTROS/0067.md).

## Atualização — Registro 0066 (2026-10-05)

- [ ] **OPEN — rehearsal não vazio:** `rotamoto_backup` não autenticou em `rotamoto_e2e` via pgpass. O grant temporário mínimo foi comprovado e revogado; nenhum fixture/backup/restore foi executado. Prosseguir somente com mecanismo de autenticação já autorizado para essa entrada, sem criar/copiar credenciais ou trocar de role.
- [ ] Demais gates de deployment do Registro 0064: paths/chave duráveis e cópia offline; scheduler/monitoramento; smoke TLS/CA/proxy, SMTP/PUBLIC_BASE_URL, keystore/readiness; medição RPO/RTO e decisão operacional de retenção/offsite.

Ver [Registro 0066](REGISTROS/0066.md).

## Atualização — Registro 0065 (2026-10-05)

- [ ] **OPEN — recovery não vazio PostgreSQL + mídia:** `rotamoto_backup` não tem CONNECT/USAGE em `rotamoto_e2e`; o lifecycle aprovado reverte a fixture antes que `pg_dump` independente possa capturá-la. Não conceder permissões nem deixar fixture persistente sem procedimento test-only autorizado.
- [ ] Configurar paths/chave duráveis e cópia offline protegida; instalar/monitorar scheduler; executar smoke de deployment (TLS/CA/proxy, SMTP/PUBLIC_BASE_URL, keystore/readiness); medir RPO/RTO e decidir retenção/offsite operacionalmente.

Detalhes em [Registro 0065](REGISTROS/0065.md).

## Atualização — Registro 0060 (2026-10-05)

- [x] Garbage collection filesystem com dry-run, grace mínimo 45d, confirmação canônica incluindo tombstones, intents persistentes e isolamento RLS tenant; upload/sync/GC compartilham lock. Intent sem sync não expira para preservar Motoboy offline; blobs abandonados podem reter espaço.
- [x] Superfície local do operador com status sanitizado e secret write-only via stdin; filesystem config/env separado de tenant; auditoria local 0600 com actorRef. Não há settings tenant autorizando paths, keys, banco ou config global.
- [x] CLI de rotação do keystore cobre exatamente inventário local manifesto, recriptografa/valida em stage, backup privado e rollback; falhas intermediárias testadas.
- [x] Pipeline operacional de backup PostgreSQL implementado: pg_dump custom, AES-256-GCM, chave externa ao banco, manifest HMAC/checksum, retenção, verificação TOC e restore explicitamente limitado a database descartável. Nenhuma opção aceita `rotamoto`.
- [ ] Cópia e restore seguros do volume de mídia/provas dentro do conjunto de backup ainda ausentes.
- [ ] Provisionar `rotamoto_backup` e `rotamoto_restore` pelo DBA e criar target `rotamoto_disposable_*`; executar dump/restore rehearsal real e validar owners, grants, RLS/FORCE, policies, checksum/manifesto e operação canônica. Não conceder BYPASSRLS ao runtime.
- [ ] Definir e medir RPO/RTO, prazo legal/operacional de retenção e janela de expiração para upload intents abandonadas; configurar deploy TLS/CA/SMTP/keys/audit/scheduler.
- [ ] Browser E2E MFA/DeliveryProof offline retry não verificável: nenhum browser/CDP host-managed exposto nesta sessão; Chromium Termux encerrou com 134/inotify na tentativa anterior.
- Não executar `npm run test:postgres` legado enquanto suas fixtures escreverem em `rotamoto`. Usar `rotamoto_e2e` com lifecycle rollback e security parity.
- Observação: `rotamoto` local estava sem migration ledger apesar da afirmação em 0059; 0001–0015 aplicadas, e queries read-only mostram zero `companies` e `domain_records`. Nenhuma fixture/dado tenant foi criado. Ver [Registro 0060](REGISTROS/0060.md).

## F9 — Atualização do Registro 0057: campanha autenticada executada

- [x] Browser E2E local autenticado integrado ao lifecycle rollback-scoped em `rotamoto_e2e`; ciclo Order→Delivery→Motoboy→reconciliação, FAILED, RETURNED e retry após offline passaram.
- [x] Segurança: MFA/sessão/CSRF, tenant e Driver server-side, ausência de API cache, ausência de secrets em localStorage/IndexedDB e ledger negado ao runtime passaram. Oito combinações dos quatro viewports não tiveram overflow. Nenhum bug interno P0/P1/P2/P3 aberto.
- [x] Regressão de identidade de sync corrigida: UUID canônico de Order/Delivery importado em nova instalação resolve ao mesmo registro, com alias tenant/type e `baseVersion`; sem duplicação. Commits: Restaurante `f6f99a4`, Motoboy `268c716`.
- [ ] Reatribuição e fato atrasado com duas identidades permanecem NOT_TESTABLE_WITH_CURRENT_CAPABILITY pela fixture de um Driver; suítes de serviço cobrem autorização/reconciliação. Sem bug interno aberto.
- **F9 local:** campanha das capacidades disponíveis aprovada. **F9 global:** depende de decidir se aceite inclui grupos externos ainda não verificáveis: email/recovery real; armazenamento operacional do segredo MFA; câmera/GPS físicos; blob remoto; iFood, 99Food e Keeta. Nenhum foi simulado como aprovado.
- Guardas, paridade e lifecycle E2E; `npm test` nos dois apps; node checks e diff-check passaram. `rotamoto` somente READ ONLY; fingerprint catálogo/ledger antes/depois `0ce3aa0ae64db6398f54840d0894917c249cd76a0581b2f7f8e64aecd46303c9`; rollback sem resíduo. Evidências em `~/projetos/browser-tests/f9-authenticated-2026-10-05-round-{61,62,63,64}/`. Ver [Registro 0057](REGISTROS/0057.md).

## F9 — Atualização Registro 0052 (2026-10-04)

- [x] **P3 Motoboy — resolvido:** 401 na primeira visita sem sessão autenticada não afirma que sessão expirou; uma sessão anteriormente autenticada conserva mensagem de expiração. Helper segue a mesma regra do Restaurante. Regressão automatizada, cache SW v40.8 e CDP nos três viewports passaram.
- P1/P2 e dois P3 anteriores seguem FIXED. Inventário aberto: P0 0 / P1 0 / P2 0 / P3 0. F9 segue aberta.
- Reclassificação de 0051: o grupo identidade/tenant/Driver é **B — fixture/provisionamento controlável**, não `BLOCKED_EXTERNAL`. Permanecem sete grupos C: email, MFA/armazenamento seguro, câmera/GPS físicos, blob remoto, iFood, 99Food, Keeta.
- **Pré-condição local antes de E2E autenticado:** lifecycle de fixture QA isolada. O endpoint de primeiro tenant exige `authorizeProvisioner` não configurado; email/MFA falham fechado; não há limpeza integral de Company/User/audit. Não provisionar fixture na configuração oficial atual.
- Próxima etapa: especificar ambiente de teste isolado e limpeza/auditáveis antes de qualquer criação; enquanto isso prosseguir com suites rollback e browser anônimo/local. Detalhes A/B/C no [Registro 0052](REGISTROS/0052.md).

# Pendências

## Atualização — Registro 0080 (2026-10-06)

- [x] Impressão por browser no Restaurante implementada: configuração local, modo manual e fila automática com preview/confirmação, deduplicação, layout isolado e QR seguro opcional. Nenhuma migration.
- [ ] Validar impressão em impressora/browser físico e confirmar variações do diálogo e cópias no deployment alvo. O provider browser não promete silent print; bridge/ESC-POS segue futuro e fora desta campanha.
- [ ] Browser offline real ficou NOT_TESTABLE porque CDP reportou `navigator.onLine=true`; manter evidência automatizada de cache do shell e exclusão das APIs.
- Gates de deployment on-prem continuam conforme Registro 0069; esta campanha não altera `ON_PREM_PRODUCTION_READY`.

## PostgreSQL oficial — Registro 0079

- [x] Migration 0019 aplicada pelo runner oficial após recovery set prévio cifrado/verificado.
- [x] `rotamoto_app` não possui SELECT amplo em `logistics_providers`, nem SELECT/UPDATE de `secret_ref`; tentativa SQL real no oficial negada com SQLSTATE 42501. Projection das colunas operacionais permitida.
- [x] Paridade catalogal de segurança, 19 checksums, contagens e readiness passaram; nenhuma contagem de tabela preexistente mudou. Suites, audits, guards, node checks e diff-check passaram.
- [ ] **OPEN — deployment 0069:** configurar volumes e permissões permanentes, keystore e chave de backup duráveis/offline, SMTP/base URL, serviço Node/runit, domínio/TLS/proxy/CA, scheduler/alertas e smoke no host alvo; decidir retenção, cópia offsite, RPO/RTO. `ON_PREM_PRODUCTION_READY = NO`.

## Self-hosted readiness — Registro 0059 (2026-10-05)

- [ ] **P1 — Storage:** implementar coleta tenant-safe de arquivos sem prova canônica referenciando-os, com período de graça; cobrir resposta HTTP perdida e falha de sync. Upload/read e persistência canônica já operam; storage segue PARTIAL até cleanup seguro.
- [ ] **P1 — Backup/restore PostgreSQL:** falta papel/procedimento autorizado que leia o conjunto completo sem desabilitar RLS forced ou elevar runtime; depois integrar pg_dump criptografado, manifesto/checksum, retenção, verificação e restore em alvo descartável. Estado BLOCKED, não executar DDL/role admin sem a autorização operacional necessária.
- [ ] **P1 — Configuração de instalação:** criar superfície separada de operador com status sanitizado para storage, SMTP, backup, keystore/provider e URL base; operações de secrets write-only/audited. Tenant não pode alterar opções globais.
- [ ] **P1 — Keystore:** ferramenta CLI segura de rotação transacional com backup temporário, rollback, arquivos 0600 e procedimento de recuperação. Atualmente só provisioning e uso criptografado.
- [ ] **P2 — Browser:** repetir CDP E2E de MFA, links SMTP e DeliveryProof offline/retry quando Chromium do Termux/CDP ficar disponível; rodada 0059 parou em 404 do harness estático e encerramento Chromium 134.
- [ ] **P2 — Cloud:** validar deploy com TLS/proxy/PostgreSQL gerenciado, providers remotos S3/MinIO, KMS/Vault e backup offsite criptografado. Providers remotos são opcionais para on-prem filesystem; necessários conforme topologia cloud escolhida.
- [ ] **External inherent:** protocolos/contas/homologação iFood, 99Food e Keeta; GPS/câmera físicos e permissões de dispositivos.
- [x] MFA TOTP/recovery nativo e fluxo SMTP de convite/recovery integrado; delivery proof filesystem e authorization tenant/Driver/CSRF integrados. Migration 0014 aplicada; lifecycle E2E rollback e security parity em 14 migrations passaram.

## F9 QA inicial — Registro 0049 (2026-10-04)

- [x] **P1 Restaurante — resolvido no Registro 0050:** leitura de sessão obsoleta não reverte escolha local; 401 atrasado preserva app não-inert, e Conta reabre para nova autenticação.
- [x] **P1 Motoboy — resolvido no Registro 0050:** seletores de período corrigidos para coleção; bootstrap e handlers concluem, capture/manual funcionam sem câmera.
- [x] **P2 Motoboy — resolvido no Registro 0050:** controles admin opcionais são guardados; 401 inicial encerra em estado não autenticado sem unhandled rejection.
- [x] **P2 Motoboy — resolvido no Registro 0050:** main rolável ocupa área separada da navegação desktop; bottom nav mobile segue fixa.
- [x] **P3 Motoboy — corrigido no Registro 0051:** valor sem Earning canônico agora usa `—`, com explicação de sync fora da grade numérica; shell offline avançado para v40.7.
- [x] **P3 Restaurante — corrigido no Registro 0051:** 401 no primeiro restore anônimo não exibe “Sua sessão expirou”; uma sessão anterior efetivamente autenticada continua recebendo aviso de expiração.
- [x] **P3 Motoboy — corrigido no Registro 0052:** o `GET /api/identity/session` real 401 exibia copy de expiração sem sessão anterior; corrigido no Registro 0052 e revalidado em três viewports.
- Fluxos externos/sem dados ainda não testados: login/logout administrativo com conta autorizada; email de convite/recovery; MFA seguro; Driver/Delivery canônicos; câmera/GPS em hardware; blob storage; iFood, 99Food e Keeta. Não criar credenciais/dados para destravar.
- `F9_INITIAL_QA = PASS_WITH_FINDINGS` preserva a contagem de entrada do 0049 (P0 0/P1 2/P2 2/P3 2/BLOCKED_EXTERNAL 8). Estado corrente após 0052: `P0_OPEN=0`, `P1_OPEN=0`, `P2_OPEN=0`, `P3_OPEN=0`, `BLOCKED_EXTERNAL=7`; fixture autenticada permanece como pré-condição B, e F9 permanece aberta. A matriz em seis viewports não encontrou overflow horizontal; a bottom nav desktop havia sido reproduzida e foi corrigida no 0050. Ver [F9_QA_INICIAL.md](F9_QA_INICIAL.md), [Registro 0049](REGISTROS/0049.md) e [Registro 0051](REGISTROS/0051.md).

## Reconciliação pré-F9 — Registro 0048 (2026-10-04)

- F1–F8 reconciliadas contra contratos, código atual, testes e PostgreSQL: F1 B, F2 A, F3 B, F4 B, F5 B, F6 B, F7 B, F8 B. **Não há pendência interna estrutural bloqueando a F9. READY_FOR_F9 = YES.**
- Itens marcados como abertos em seções históricas abaixo representam o estado na data daqueles registros. Em especial, o vínculo User/Membership↔Driver do 0043 foi resolvido pelo 0044; login/RBAC listado antes de 0041, rotas/provas/backup anteriores a F1 e adapters externos não verificados anteriores a 0046 não são backlog interno atual.
- Antes/durante F9: Browser QA real nos fluxos integrados e IndexedDB; documentar limitações de Chromium/Termux e evidências. Isso é validação planejada, não defeito de implementação.
- Bloqueios externos isolados: protocolos, contas e homologação iFood/99Food/Keeta; primeiro owner/operator auditável; provider email; MFA com armazenamento seguro; blob storage; domínio/TLS/host/PostgreSQL de produção; decisão de retenção/RPO/RTO e restore em alvo isolado. Nenhum foi simulado ou declarado disponível.
- Validação desta reconciliação: `npm test` nos dois apps; `npm run test:postgres` Restaurante; `migrate.js status` (0001–0013 aplicadas); `node --check` JS nos dois apps; `git diff --check`; igualdade byte a byte de `CONTRACT.md`, `contract.js` e `backup-format.js`. Nenhuma migration foi executada nem dado/role/configuração foi alterado. Ver [Registro 0048](REGISTROS/0048.md).

## Atualização — Registro 0047 / F8 operação (2026-10-04)

- [x] Configuração development/test/production com defaults locais somente fora de produção; startup production fail-closed para DB runtime/TLS/CA/secret provider, HTTPS origins, Host e proxy confiável.
- [x] Backend loopback, headers seguros, limites/timeouts/pool, readiness de schema compatível sem migration automática, request ID/log JSON sanitizado e shutdown SIGTERM/SIGINT com drain.
- [x] Runbooks versionados de deploy/rollback, PostgreSQL e IndexedDB backup/restore, retenção; nginx apenas exemplo não instalado.
- [x] Service worker Motoboy cacheia somente assets same-origin exatos, nunca API, usa ativação aguardando abas antigas e não apaga IndexedDB; contrato estático testado.
- [ ] Produção ainda depende de domínio/TLS, host e PostgreSQL de produção, secret provider/KMS/CA, email/MFA, operadores/distribuição; executar deploy e restore em alvo isolado com RPO/RTO aprovado.
- [ ] Definir retenção legal/operacional para GPS, proofs, PII, audit/logs, inbox/outbox, aliases e backups; não foi inventado TTL.
- F8 classificada **B — preparação local concluída com dependências externas isoladas**. Nenhuma configuração real do Termux/nginx/PostgreSQL mudou. Ver [Registro 0047](REGISTROS/0047.md).

## Atualização — Registro 0046 / F4 integrações (2026-10-04)

- [x] Registry provider-neutral bloqueado por padrão; estados administrativos nunca inferem conexão por cadastro/credencial declarada.
- [x] Rotas legadas de iFood/99Food/Keeta e serviços de 99Food/Keeta desativados fail-closed; nenhum polling automático ou verificação presumida de webhook.
- [x] Catálogo administrativo protegido por sessão, tenant/RLS e `integrations.manage`; não expõe `secret_ref`, credenciais ou payload.
- [x] UI distingue origem local, simulador de laboratório e provider não conectado; pedidos sintéticos iFood ficam em memória e não alteram Orders/IndexedDB.
- [ ] Implementar os protocolos reais somente após documentação oficial aplicável, credenciais/conta e homologação por provider. KMS/secret manager, autenticidade webhook e armazenamento/retention de payload também precisam de suporte operacional.
- F4 classificada **B — infraestrutura/implementação local concluída com dependências externas claramente isoladas**. Sem migration; sem Browser QA ou push. Ver [Registro 0046](REGISTROS/0046.md).


## Atualização — Registro 0045 / F7 UI/UX (2026-10-04)

- [x] Consolidação estática de navegação, conta/sessão e diálogos acessíveis nos dois apps; foco por teclado, Escape/Tab, retorno de foco e fundo inerte.
- [x] Restaurante: administração visual de vínculo Membership↔Driver por API existente, labels de busca/filtros e estilos de identidade responsivos.
- [x] Motoboy: estados de navegação/filtros semanticamente corretos, toast acessível, modal de execução e layout com safe-area/teclado virtual.
- [x] Ajuste de contraste do acento verde e remoção de regras CSS obsoletas/ineficazes; suítes `npm test` dos dois apps passaram.
- [x] As configurações agora informam o escopo local deste aparelho; o Motoboy esclarece que custos/metas são estimativas e Earning canônico vem do Restaurante.
- [ ] Validação visual renderizada e em dispositivos assistivos permanece para F9; não houve Browser QA, screenshots ou CDP conforme escopo.
- F7 classificada **B — implementação concluída / Browser QA pendente para F9**. Commits dos apps: Restaurante `69e3492e6ace36c781425baaeba199a208eb451e` e `3e84fad04eb877b466a6757a4fedf2db8e0f66c8`; Motoboy `7e41182e55f365c368e3ca730ddb7e9231b337a5` e `2c82d094ef8a2f04aa436507a36682b4f36e95fc`. Ver [Registro 0045](REGISTROS/0045.md).

## Atualização — Registro 0044 / F6 Motoboy (2026-10-04)

- [x] Vínculo canônico User/Membership↔Driver: migration `0013_membership_driver_binding`, FK composta tenant/type, unicidade por Driver, RLS/FORCE mantida e rollback protegido contra perda de vínculo/notificação.
- [x] API administrativa PUT/DELETE para associar/desassociar; RBAC `company.manage`, CSRF, MFA, validação de tenant/Driver/membership, idempotência e auditoria.
- [x] Sessão resolve `driverId` server-side. Instalação, push/pull Motoboy e leituras não administrativas sem Driver ficam bloqueados/escopados. `source.app`, `actor` e hints de `driverId` não autorizam.
- [x] Reatribuição envia notificação mínima ao Driver anterior; fatos aceitos não são removidos; push atrasado de evento/localização/prova é rejeitado e conflito local preservado. Operações locais offline continuam possíveis.
- [x] Testes relacionados de migration, integridade/grants/RLS, membership, MFA/CSRF, sessão, pull/push, ownership, reatribuição e Motoboy foram executados; fixtures transacionais revertidas. Sem Browser QA.
- [ ] Provider de blob para envio real de DeliveryProof; acesso a GPS/câmera físicos permanece dependente de hardware/permissões; Browser QA integrado permanece em F9. Esses itens não mantêm F6 parcial.
- F6 classificada **B — implementação concluída / Browser QA pendente para F9**. Baselines e `main` preservadas; sem push. Ver [Registro 0044](REGISTROS/0044.md).

## Atualização — Registro 0043 / F6 Motoboy (2026-10-04)

- [x] Ciclo local de execução `ACCEPTED/PICKED_UP/OUT_FOR_DELIVERY/ARRIVED/DELIVERED/FAILED/RETURNED`, motivos, eventos/outbox idempotentes e preservação offline.
- [x] Pull de Delivery/Order/Route/Earning atualiza stores e telas depois de commit; revisões stale não regridem cache; reentrega arquiva tentativa anterior.
- [x] GPS real validado/throttled e persistido localmente; assinatura PNG limitada/hash fica explicitamente local até provider seguro; Motoboy não publica Earning.
- [x] API sync projetando eventos de aceite/coleta; Service Worker não armazena resposta `/api/`. `npm test` Motoboy e PostgreSQL dirigido passaram.
- [ ] **F6 bloqueada para conclusão segura:** modelar vínculo canônico autenticado User/Membership↔Driver e limitar server-side o pull/push às Deliveries do próprio motorista. `driverId`, `actor` e `source.app` vindos do cliente não são autoridade.
- [ ] Provider de blob para envio de prova/foto; permissões/hardware GPS/câmera real; Browser QA somente em F9. Ver [Registro 0043](REGISTROS/0043.md).

## Atualização — Registro 0042 / F5 Restaurante (2026-10-04)

- [x] Pedidos locais: criar/editar/validar e persistir Order+Delivery+Earning numa transação; IDs canônicos e projeções não substituem fatos de execução.
- [x] Entregas: atribuição/change de motorista com transição permitida e `driverId`; cancelamento mantém Order/Delivery e histórico; estados Motoboy, eventos e provas aparecem no detalhe; rejected/conflict ficam observáveis via syncState.
- [x] Reentrega: UI solicita somente a partir de `DELIVERED`, `FAILED` ou `RETURNED`; servidor mapeia `DELIVERY_RETURNED`, aplica a transição de contrato, audita com actor da sessão e permite reatribuição posterior.
- [x] Rotas: gestão por `Route.deliveryIds`, ordenação de paradas, prevenção de associação duplicada/entre empresas e preservação de membros históricos terminalizados.
- [x] Motoristas: administração de nome/telefone/status sem editar GPS/presença de execução; atribuição usa Driver ID.
- [x] Earnings/relatórios: registros usam `amountMinor`, moeda, componentes e regra; repasse em relatório soma inteiros; indicadores de conclusão usam horário de conclusão.
- [x] Backup/restore existente foi conectado à área de dados com aviso de JSON plaintext sensível e merge seguro sem sobrescrever registros/outbox/conflitos atuais.
- [x] Sync constrói Order/Driver/Delivery/Route em shape do contrato, preserva status canônico de execução ao enviar edição comercial e não depende de geocoding para montar pacote.
- [x] Testes: `npm test`, `npm run test:sync`, teste PostgreSQL dirigido `tests/test-domain-sync-postgres.js`, syntax checks e `git diff --check` passaram. Sem alteração de schema/migration; sem Browser QA.
- [ ] Browser QA integrado F5 fica em F9 e não mantém F5 aberta.
- F5 classificada **B — implementação concluída / Browser QA pendente**. Próximo bloco planejado: F6. Ver [Registro 0042](REGISTROS/0042.md).

## Histórico de pendências anteriores

## Atualização — Registro 0041 / F3 Identidade (2026-10-04)

- [x] Política de lifecycle User/Membership/Role/Permission; grants de permission subset; sem autoelevação; último owner protegido com serialização transacional; tenant e actor derivados no servidor; auditoria.
- [x] APIs de role e membership e convite administrativo protegidas por sessão, CSRF, permission keys e MFA exigida; signup público inexistente.
- [x] Migração aditiva `0012_identity_rbac_lifecycle` aplicada; runtime/migrator, RLS/FORCE e grants mínimos preservados.
- [x] Restaurante e Motoboy: login, logout, restore/expiração, recuperação, convite, MFA fail-closed, troca de tenant e estados de UI; pós-login dispara sync best-effort sem bloquear operação local offline.
- [x] Administração no Restaurante para empresa ativa, memberships/status, roles/permissões, convites e metadados suportados de integrações; controles limitados por permission key. Profiles locais identificados como locais.
- [x] Testes finais `npm test` nos dois apps, `npm run test:postgres` no Restaurante, `node --check` dos JS modificados e `git diff --check` passaram.
- [ ] Provisionamento do primeiro owner requer operador autorizado e ato administrativo auditável. Não foi criado operador ou conta real.
- [ ] MFA operacional requer adapter/verificador e armazenamento seguro de segredo/chave; challenge permanece fail-closed, sem modo de desenvolvimento que reduza a proteção.
- [ ] Envio real de convite/recuperação requer provider de email e domínio/configuração operacional; sem envio real ou exposição de token bruto.
- [ ] Browser QA dos formulários, cookies, redirects e layout fica para F9; não executado conforme escopo.
- F3 classificada **PARCIAL** apenas pelas dependências externas acima. Próximo bloco: F5; não iniciar F4 neste registro. Ver [Registro 0041](REGISTROS/0041.md).

## Atualização — Registro 0040 / F2 (2026-10-04)

- [x] Inventário e documentação versionada da API v1 do Restaurante em `docs/API-v1.md`, com métodos, autenticação, permission keys, entradas, saídas, erros e idempotência.
- [x] Health liveness/readiness, request ID, logs estruturados sem payload, respostas de erro estáveis, rate limit e consultas autenticadas/paginadas por entidade com tenant/RLS/RBAC.
- [x] Administração de leitura para company, memberships, roles/permissions e status de integrações sem secrets. Operações de domínio mutáveis permanecem nos casos de uso do sync Local-First.
- [x] Migration `0011_runtime_integration_read`: runtime recebeu somente SELECT em integrations/external_accounts; RLS/FORCE mantida, sem DDL/escrita runtime.
- [x] Testes HTTP/PostgreSQL de permissões, tenant, cursor/IDs, métodos, estado readiness, grants e migration rollback/reapply; `npm test`, `npm run test:postgres`, checks JS e `git diff --check` passaram.
- [ ] Mutação de memberships/roles e convite genérico entram em F3 após fechar lifecycle, proteção contra escalada e UX; provisionamento do primeiro owner continua fail-closed sem adapter operacional. Isso não bloqueia as operações de domínio v1 cobertas em F2.
- [ ] Browser QA das novas superfícies e dos clientes permanece para F9; não foi executado nesta etapa.
- F2 classificada **concluída para operações internas v1 definidas**. Próximo bloco recomendado: F3, sem iniciar nesta execução. Ver [Registro 0040](REGISTROS/0040.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).

## Atualização — Registro 0039 / F1 (2026-10-04)

- [x] F1 concluída como implementação. Classificação B: Browser QA/IndexedDB real segue no checkpoint F9 e não mantém a F1 aberta.
- [x] Schemas canônicos compartilhados, Route→Delivery, Earning seguro em minor units, modelo de mídia/storageRef, migrations PostgreSQL 0009–0010 e backup Local-First v1 com merge transacional não sobrescrevente.
- [x] Migrações IndexedDB explícitas do Registro 0038 permanecem sem bump; nenhuma estrutura local nova foi necessária.
- [ ] Blob storage real/cifrado e backup cifrado aguardam provider e decisão de chave/UX. Retenção de GPS/PII/provas/audit aguarda política produto/legal. Estes itens são capacidades bloqueadas independentes, não impedem F1.
- Ver [Registro 0039](REGISTROS/0039.md), [MODELO_DADOS.md](MODELO_DADOS.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).

## Registro 0038 — estado histórico da F1 antes da conclusão

- [x] F1.1: matriz versionada das entidades/campos conhecidos, authority, local/PG/API/sync, IDs/revisões/relações, constraints/índices, offline, legado, sensibilidade e retenção criada em [MODELO_DADOS.md](MODELO_DADOS.md).
- [x] Revisão read-only das migrations PostgreSQL 0001–0008 e schema instalado; `migrate.js status` confirmou todas aplicadas. Decidido manter entidades de domínio em JSONB até campos/consultas estarem definidos; sem migration PG nova.
- [x] Registry de migrations IndexedDB aditivas implementado: Restaurante 4→6 e Motoboy 5→7; adiciona índices secundários não únicos e marcador versionado sem regravar registros; paths de eventos/logs corrigidos em novas migrations aditivas; aborta upgrade em erro.
- [x] Testes dirigidos dos registries, bootstrap/upgrade de versões anteriores simulado, sentinel local preservado, lifecycle Motoboy; syntax checks e `git diff --check` passaram.
- [x] Os schemas, relação, moeda, mídia e backup/merge foram implementados no Registro 0039; ver a matriz vigente em MODELO_DADOS.md.
- [x] Export/import v1 cobre todas as stores; colisões são preservadas e operações pendentes/conflitos/tombstones não são sobrescritos.
- [x] F1.2 foi implementada no Registro 0039: schemas, Route→Delivery, Earning minor units, mídia referenciada, migrations 0009–0010 e backup/restore v1 seguro.
- [ ] Validar upgrade/import no Chromium real no checkpoint F9; não é pendência de implementação F1.
- Contrato e migrations/banco mudaram no Registro 0039; main, tags e baselines permaneceram intactas. Ver [Registro 0038](REGISTROS/0038.md), [Registro 0039](REGISTROS/0039.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).

## Plano mestre — Registro 0037 (2026-10-04)

Use [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md) como fonte de verdade e não duplique trabalho concluído em 0033–0036.

- [x] F1.1: matriz versionada de entidades/campos/autoridade e decisão JSONB/relacional criada; registry IndexedDB e upgrades aditivos base implementados no Registro 0038.
- [x] F1.2: schemas, Route→Delivery, Earning, mídia, backup/merge e migrations aditivas concluídos no Registro 0039.
- [ ] Validar o upgrade/import em IndexedDB real no checkpoint F9; F1 não fica aberta por essa validação.
- [x] F2: API v1 interna definida e implementada para identidade, domínio read, sync write, administração de leitura, health/readiness, RBAC/RLS e erros/logs; migration/grants e documentação concluídos no Registro 0040.
- [x] F3: implementação local de clientes/telas e APIs de identidade concluída no 0041; permanecem apenas o primeiro operador/owner, MFA operacional segura, email real e Browser QA em F9 conforme bloqueios externos registrados.
- [x] F5 Restaurante: fluxos administrativos/operacionais registrados no 0042.
- [x] F6 Motoboy: vínculo User/Membership↔Driver e enforcement server-side concluídos no Registro 0044; Browser QA continua em F9. Provider de blob e hardware/permissões físicos são dependências de capacidade, não bloqueios da implementação F6.
- [x] F4: registry/catalog e bloqueio local seguro concluídos no Registro 0046. [ ] Adapters reais, fila/inbox, ingestão e configuração operativa continuam condicionados a documentação oficial, credenciais/contas, homologação e secret manager por provider.
- [x] F7: implementação estática concluída no Registro 0045; Browser QA/renderização permanece para F9.
- [x] F8: preparação local de runtime/proxy/shutdown, logs/readiness, backup/restore e runbooks concluída no Registro 0047; [ ] deploy real, provider TLS/secrets, RPO/RTO e restore isolado aguardam infraestrutura/operador.
- [ ] F9: QA integrado CDP desktop/tablet/mobile e hardening depois das fases anteriores.
- Route→Delivery foi decidido e implementado em F1/Registro 0039. Retenção legal/operacional de localização/provas permanece pendente, sem prazo inventado.
- [ ] Provider de email, primeiro operador/owner, MFA seguro, contas/documentação de fornecedores e ambiente de produção são bloqueios externos apenas para as capacidades correspondentes; continuar trabalho independente local.

O inventário estático de IndexedDB não leu dados reais; não rodar Browser QA nem reimplementar sync/reconciliação 0034–0036 nesta etapa de planejamento. Ver [Registro 0037](REGISTROS/0037.md).

## Atualização — Registro 0036 (2026-10-04)

- [x] Pull canônico reconciliado às projeções IndexedDB dos dois apps, com validação de tenant/ID/revisão, preservação de alterações pendentes e tombstones explícitos.
- [x] ACK por operação integrado aos clientes; accepted/duplicate confirmam canonical ID/revisão; rejected/conflict preservam dados/estado e evitam retry infinito da mesma versão.
- [x] Outbox/inbox/syncState têm ciclo de vida, status observável, retry transitório, single-flight/Web Locks e compactação conservadora documentada.
- [x] Bootstrap de sessão existente, retomada CSRF, sync após gravação local/retorno de conectividade/manual; operação local permanece independente de rede.
- [ ] Implementar login visual/sessão nos dois clientes com estado fail-closed; ativação do primeiro owner permanece dependente de operador e MFA seguro.
- [x] Route→Delivery foi formalizada em F1/Registro 0039 por `Route.deliveryIds`, sem relação inversa redundante.
- [ ] QA end-to-end via Chromium/CDP permanece para checkpoint posterior, conforme solicitação de não executar Browser QA nesta etapa.
- [ ] Email real, domínio/TLS e serviços/credenciais de fornecedores externos continuam pendências externas independentes.
- Ver [Registro 0036](REGISTROS/0036.md), DEC-0006 e commits Motoboy `1eb7e6a`/`6a1574f`, Restaurante `de53138`/`df562f7`.

## Atualização — Registro 0035 (2026-10-04)

- [x] Formalizar ownership de Order, Earning, Delivery, DeliveryEvent, LocationPoint, DeliveryProof, Route, Driver e Company em DEC-0006 e manter `CONTRACT.md`/`contract.js` sincronizados.
- [x] Vincular instalação sync à sessão/usuário/tenant e app key escolhida por endpoint server-side; não confiar em `source.app`.
- [x] ACK inequívoco por operação (`accepted`, `duplicate`, `rejected`, `conflict`), canonical ID/revision/código; revisão e transições explícitas sem LWW; retry de packet/event idempotente.
- [x] Corrigir divergência de Earning: Restaurante calcula/escreve canonical Earning; Motoboy não publica Earning.
- [x] Integrar os dois clientes aos endpoints de instalação/push/pull preservando IndexedDB e operação offline, outbox retry, ACK no `syncState`, aliases/revisões e cursor/cache em transações.
- [x] Migration aditiva 0008 aplicada e testada; migrations 0001–0007 permaneceram intactas.
- [x] Pull guardava snapshots/eventos antes de haver reconciliação automática; estratégia de merge que preserva edições pendentes foi implementada no Registro 0036. Não reimplementar; cobrir regressões em QA final.
- [x] Route→Delivery e seus campos/regras de membership foram formalizados e implementados em F1/Registro 0039.
- [ ] Email real, HTTPS/domínio de implantação e eventuais segredos/provedores externos continuam dependências externas; não bloqueiam os fluxos locais/offline nem o backend de sync loopback.
- Ver [Registro 0035](REGISTROS/0035.md), DEC-0006 e commits Restaurante `78e10f2`, Motoboy `d88aeea`.

## Atualização — Registro 0033 (2026-10-03)

- [x] PostgreSQL role split concluído e validado: database sob ownership DBA, schema/objetos sob `rotamoto_migrator`, runtime `rotamoto_app` sem CREATE/TEMP/DDL nem acesso ao ledger; RLS/FORCE e append-only confirmados.
- [x] Runner e configuração separados: `DATABASE_URL` só para runtime `rotamoto_app`; `MIGRATOR_DATABASE_URL` apenas para migrations, com validação de role/destino e senha fora da URL.
- [x] `npm run test:postgres`, teste da configuração de segurança, `migrate.js status` como migrator e smoke HTTP como runtime passaram. Nenhum dado sintético ficou persistido.
- [ ] Fase 2 operacional depende de adapter de operador/prova de titularidade, provider de email, HTTPS/domínio e MFA com KMS/secret manager. Não provisionar tenant/owner real antes disso.
- [ ] Fases posteriores de integração humana, secrets, sync e import/export dependem da identidade operacional e do contrato/rollout Local-First. Não foi identificado bloco independente seguro nesta execução sem antecipar essas dependências ou inventar semântica/permissões.
- Ver [Registro 0033](REGISTROS/0033.md) e commit Restaurante `c96907bc46165ec8ff2f7dda721bdc6b8160b0a2`.

## Atualização — Registro 0032 (2026-10-03)

- [x] Diagnóstico read-only de owners, grants, schemas/tabelas/sequences, funções/triggers, policies/RLS, default privileges, memberships e database ACL concluído.
- [x] Script/runbook, checkpoint completo validado e execução manual do split concluídos; queries pós-flight confirmadas no Registro 0033.
- [x] Runner e suíte PostgreSQL separados entre conexão de migrations/DDL e conexão runtime/RLS.
- Ver [Registro 0032](REGISTROS/0032.md) e `rota-moto-restaurante/backend/postgres/admin/role-split-runbook.md`.

## Atualização — Registro 0031 (2026-10-03)

- [x] Bloqueio administrativo resolvido após checkpoint íntegro e operação manual; conclusão verificável no Registro 0033.
- Ver [Registro 0031](REGISTROS/0031.md). Nenhuma alteração foi feita no banco ou nos aplicativos nesta execução.

## Atualização — Registro 0030 (2026-10-03)

- [x] Auditoria da estrutura base, constraints, FKs, índices, RLS e migration runner concluída. Migration `0004_foundation_integrity_constraints` aplicada; fecha integridade do actor de auditoria, ordem de expiração da sessão e timestamp de publicação da outbox.
- [x] Migration runner testado para checksums, detecção de migration ausente, reexecução concorrente/idempotente, rollback transacional, down fail-closed e clean install em schema temporário rollback.
- [x] Bloqueio estrutural de ownership/runtime foi resolvido e validado após a operação DBA manual no Registro 0033.
- [x] Owner/migrator e runtime estão separados; migration runner/status e testes específicos usam credenciais/roles distintas.
- Conclusão do Registro 0030 foi superada: a separação de privilégios está pronta, mas API permanece loopback e fases operacionais ainda aguardam dependências descritas no Registro 0033.
- Ver [Registro 0030](REGISTROS/0030.md) para diagnóstico, migration, testes, commits e limites.

## Atualização — Registro 0029 (2026-10-03)

- [x] API HTTP local de identidade no Restaurante: login/logout/sessão, seleção tenant, recuperação/consumo, aceitação de convite/verificação e endpoint administrativo protegido por adapter. Não há signup público.
- [x] Middleware HTTP: cookie opaco `__Host-`, CSRF/origem, contexto tenant por sessão, permission key/RLS, payload limitado e validado, rate limit por IP/endpoint, erros e logs seguros. Servidor permanece loopback.
- [x] Compatibilidade de Argon2id resolvida para o requisito do servidor Node >=18 com `argon2` 0.45.1; compilação local Termux validada. Auditoria npm reportou zero vulnerabilidades.
- [x] Testes HTTP/RLS com fixtures sintéticas em transação revertida; nenhum tenant/usuário sintético permaneceu no PostgreSQL oficial.
- [ ] Configurar adapter operacional de operador privilegiado/prova de titularidade. A rota de provisionamento falha fechada sem ele; teste fake não é credencial real.
- [ ] Configurar provider real de email, domínio/HTTPS e MFA/TOTP com KMS/secret manager. Owners permanecem obrigados a MFA e não concluem login até existir esse fluxo.
- [ ] Integrar UI/frontend aos endpoints em origem segura; nenhum browser flow de identidade existe ainda. Browser QA visual não aplicável até essa integração.
- [ ] Rate limit atual é memória por processo/socket; antes de operação atrás de proxy ou múltiplas instâncias, definir proxy confiável para IP e storage compartilhado sem confiar em headers arbitrários.
- [ ] Continuam pendentes: convites de membros, rotas humanas de iFood/Keeta/99Food, caller/worker e webhooks autenticados, sync Local-First autenticado, import/export por tenant e fases restantes DEC-0002.
- Ver [Registro 0029](REGISTROS/0029.md) para endpoints, decisões de segurança, testes, Argon2, commit e limitações.

## Atualização — Registro 0028 (2026-10-03)

- [x] Base técnica local da Fase 2 no Restaurante: provisionamento transacional/idempotente de owner, role/permissões versionadas, UUIDv7, auditoria, convite/verificação de email por token digest e recuperação por token digest.
- [x] Primitivas internas de Argon2id, bloqueio de tentativas, sessão opaca, CSRF, idle/absolute expiry, revogação, troca de tenant validada por membership, RBAC e transação RLS; testes com provider fake e dados PostgreSQL revertidos.
- [x] Migrations `0002_identity_provisioning_tokens` e `0003_provisioning_membership_constraint` aplicadas ao PostgreSQL oficial; FKs impedem request cujo user e empresa não formam a mesma membership.
- [ ] Instalar adapter operacional confiável para prova de titularidade/autorizar provisionador e entregar `actorRef` auditável; não há tenant ou owner real criado.
- [ ] Configurar email provider, domínio/origem HTTPS e fluxo operacional. A interface existe e falha fechada sem provider; nenhum envio real foi feito.
- [ ] Implementar MFA/TOTP com KMS/secret manager. Owners são gravados com MFA obrigatório e autenticação bloqueada até essa etapa.
- [ ] Integrar serviços a uma API HTTP: rotas login/logout/recuperação/provisionamento, validação e erros padronizados, rate limit por IP, middleware CSRF, cookies HTTPS e autorização. Nenhuma rota foi montada.
- [ ] Identidade requer `crypto.argon2` (Node >=24.7, API release-candidate); decidir/validar runtime de produção ou adotar implementação Argon2id suportada antes de deploy. O serviço de integração legado ainda declara Node >=18.
- [ ] Convites de membros existentes e integração da identidade aos apps não foram conectados. Sync/autorização, providers e rollout continuam após as dependências acima.
- `npm audit --omit=dev --offline` Restaurante retornou zero; consulta online ao registry falhou por DNS. Audit online do Motoboy retornou zero. QA por browser não se aplica enquanto não há endpoint/fluxo visual de identidade.
- Ver [Registro 0028](REGISTROS/0028.md) para commits, testes, schema, auditoria e limites.

## Atualização — Registro 0027 (2026-10-03)

- O P1 do Registro 0019 segue resolvido pelo Registro 0026: comandos/escritas Motoboy compartilham Web Lock e relêem IndexedDB antes do snapshot.
- Fase 1 DEC-0002 agora concluída no PostgreSQL de desenvolvimento oficial via `.pgpass`; migrations, tabelas, checksum e RLS default-deny testados. Nenhuma conta/tenant foi provisionada.
- [ ] Confirmar Web Locks na matriz real de navegadores de produção. O projeto não declara essa matriz; Chromium 149 foi testado, e gravações falham explicitamente sem lock.
- A Fase 2 depende de processo de prova de titularidade/provisionamento do primeiro owner e serviço de email verificado, inexistentes. Fases 3–6 aguardam essa identidade operacional.
- Ver [Registro 0027](REGISTROS/0027.md) para estado cruzado, QA, Fase 1, commits e limites; o histórico anterior do P1 está em [Registro 0026](REGISTROS/0026.md).

## QA de navegador — Registro 0022 (2026-10-03)

- [x] Teste de captura Motoboy concluído com câmera sintética: Chromium headless sem câmera física falha com `NotFoundError`, mas dispositivo virtual 640×480 gerou imagem no fluxo de captura. Teste em hardware real segue para validação de campo.
- [x] Chegada, assinatura e finalização Motoboy validadas com geolocalização CDP; estado `done` e assinatura PNG sobreviveram ao reload. Teste em GPS físico não disponível nesta sessão.
- Fluxos dos dois apps passaram em desktop/tablet/mobile, backup/import e conteúdo não confiável; sem HTTP local 4xx/5xx nem overflow horizontal da página. Detalhes anteriores em [Registro 0022](REGISTROS/0022.md), repetição em [Registro 0027](REGISTROS/0027.md).

## Alta prioridade — antes de expor operações ou dados reais fora do host local

- [ ] Manter o serviço Node em loopback até existir autenticação humana e autorização tenant server-side. Proteção atual: Registro 0009; não remover sem concluir as fases 1–3.
- [x] PostgreSQL 18.6 oficial acessível em `127.0.0.1:5432`, banco `rotamoto`, usuário `rotamoto_app` por `.pgpass`; Fase 1 versionada aplicada. [ ] Secret manager/KMS, backup/restore e rotação de chaves continuam sem infraestrutura.
- [x] Fase 1: schema/migrations para User, Credential, RecoveryToken, Company, Membership, Session, Role/Permission, Integration, ExternalAccount, audit log, canonical ID map e inbox/outbox persistentes.
- [ ] Implementar processo operacional auditável de criação de tenant/owner com prova de titularidade, convite de uso único e verificação/entrega de email.
- [x] Implementar primitives internas de Argon2id PHC, verificação de convite/email, recuperação single-use, lockout de credencial, sessão digest, CSRF digest, idle/absolute expiry, revogação e camada HTTP local (Registros 0028–0029). MFA e integração de frontend seguem abertas.
- [x] Implementar role owner com catálogo inicial server-side versionado, permission check no serviço e troca de empresa validada por membership/RLS (Registro 0028). Catálogo completo por rota/recurso e convite de membros seguem abertos.
- [x] Montar sessão/API local com cookie opaco, CSRF em mutações, rate limit e API de sessão no listener loopback (Registro 0029). [ ] Configurar HTTPS/domínio/proxy seguro antes de qualquer exposição externa.
- [ ] Atualizar rotas iFood, Keeta e 99Food: sessão humana para ações de operador; caller de worker escopado; webhooks com autenticação/replay/deduplicação persistentes; vínculos merchant/shop/store confirmados; secrets no secret manager. CORS permanece apenas política de navegador.
- [x] Implementar contexto tenant de identidade por sessão, constraints e RLS default-deny com teste de bypass/negação cross-tenant (Registros 0027–0029). [ ] Aplicar autorização equivalente às futuras rotas de negócio e sync.
- [ ] Implementar mapeamento/reconciliação dos IDs locais por instalação e migração de `company_local` sem colisão nem fusão entre empresas; manter IDs de Order/Delivery relacionados.
- [ ] Migrar sync/offline com autorização no servidor, idempotência persistente, validação de revision/tombstone, conflitos explícitos e política de reautenticação; nunca aceitar identidade/permissão do payload local.
- [ ] Restringir import/export autenticado a dados operacionais permitidos; rejeitar entidades de acesso e segredos; validar tenant/schema/tamanho/referências e auditar conflito/resultado.
- [x] Suites sintéticas de credenciais, sessão/CSRF, RBAC, tenant/RLS, recovery, convite, rate limit e API HTTP passam (Registro 0029). [ ] Continuam pendentes replay/webhooks, offline, import/migração e validação de rollout.

## Ordem de execução

1. Fase 0 loopback e Fase 1 schema/migrations concluídas.
2. Próxima: completar a operação da Fase 2 com adapter auditável de operador, email, MFA/KMS e onboarding real; não criar dados/usuários reais até isso existir.
3. Depois: conectar frontend em HTTPS e migrar rotas humanas para sessão/permission checks; avançar integrações/webhooks/workers, Local-First sync/import/export e rollout na ordem DEC-0002.

As decisões arquiteturais permanecem em `DECISOES.md` (DEC-0002). O listener continua em loopback. Não expor backend com dados reais antes das fases 2–6 e dos itens operacionais bloqueadores acima. IndexedDB continua como persistência local/offline; PostgreSQL é a camada canônica do servidor.

## Reconciliação do plano — Registro 0020 (2026-10-03)

DEC-0002 continua definindo oficialmente a Fase 1: schema e migrations PostgreSQL de identidade, tenant/membership, sessão, roles/permissões, integrações/contas externas e mapeamento de IDs. O roadmap técnico posterior de persistência do Restaurante complementa o planejamento de persistência local-first e evolução para sincronização; não substitui essa Fase 1. Nenhum item da Fase 1 foi implementado na execução do Registro 0020.

## Histórico resolvido

- Registro 0006: corpo HTTP acima de 1 MiB recebe 413.
- Registro 0007: gravação principal do estado Motoboy é atômica.
- Registro 0008: estado, evento operacional e outbox Motoboy são persistidos na mesma transação; `npm test` padrão do Motoboy executa a suíte.
- Registro 0009: serviço de integrações Restaurante recusa inicialização em host não-loopback enquanto não houver autenticação humana/tenant. Isso reduz exposição acidental, mas não substitui autenticação das rotas locais.
- Registro 0010: renderização do Restaurante não reflete status desconhecido fornecido por backup ou integração como HTML; fallback seguro e teste contra markup malicioso adicionados.
- Registro 0026: snapshots gerados por abas Motoboy diferentes já não se sobrescrevem silenciosamente; a atualização é rebaseada nos dados persistidos sob Web Lock.

## Revisão do Registro 0009 — 2026-10-01

As pendências foram convertidas em fases de implementação sob DEC-0002. A barreira de loopback foi implementada no Restaurante. Nenhuma fase dependente de PostgreSQL, KMS/secret manager ou email foi marcada como concluída; não expor operações ou dados reais externamente antes de implementar autenticação e autorização tenant server-side. Consulte o Registro 0009.


## Revisão do Registro 0011 — 2026-10-01

Corrigida a precedência incorreta entre uma entrega e um tombstone mais antigo no mesmo pacote recebido pelo Restaurante. Segue como próximo passo técnico recomendado acrescentar testes executáveis de falha/recuperação para recebimentos multi-store. As pendências de backend/identidade acima continuam abertas.

## Revisão do Registro 0012 — 2026-10-01

O Restaurante agora confirma se o `packetId` já foi recebido dentro da transação que grava domínio e recibo, prevenindo reaplicação concorrente do mesmo pacote. A cobertura atual verifica a estrutura do fluxo por teste automatizado de sincronização; um teste executável com IndexedDB simulado para abortos/recuperação de transações multi-store continua como possível próximo passo. As pendências de backend/identidade, tenant e infraestrutura permanecem abertas.

## Revisão do Registro 0013 — 2026-10-01

O Motoboy agora recupera a abertura do IndexedDB após erro, fecha conexões em `versionchange` e trata abertura bloqueada sem vazar uma conexão que conclua tardiamente. Foi acrescentado teste isolado do ciclo de vida da conexão. Permanecem abertas as pendências de backend/identidade, tenant e infraestrutura; testes de abortos reais de transações multi-store seguem como possível trabalho futuro.

## Revisão do Registro 0014 — 2026-10-01

Corrigida a exclusão parcial do histórico no Motoboy: tombstones, corridas, projeções, eventos, outbox e demais stores afetados agora participam de uma transação, e a UI só atualiza após `oncomplete`. Próxima lacuna técnica específica desta frente: exercitar abort/falha/retentativa das transações multi-store do Motoboy e do recebimento no Restaurante com IndexedDB simulado leve ou em runtime que o forneça. O ambiente atual não tem IndexedDB nem simulador; os testes desta etapa confirmam estruturalmente a ordem e o escopo transacional. Pendências de backend/identidade, tenant e infraestrutura seguem abertas.

## Revisão do Registro 0015 — 2026-10-01

Concluída a lacuna de teste da fronteira de recebimento: o Motoboy agora grava projeções atualizadas e recibo atomicamente e publica a memória só após commit; testes nos dois projetos verificam erro e abort após writes staged, rollback de stores, ausência de atualização em memória/UI, retry e idempotência. A arquitetura global ainda não tem uma fronteira geral entre comando de negócio e estado mutável: `persistOnly` persiste a projeção atual e não desfaz por si só mutações antecipadas feitas por seus chamadores. Próximo ponto técnico concreto: introduzir uma fronteira de comando para as operações gerais Motoboy que hoje mutam `state` antes de `persistOnly`, começando pelos fluxos de corrida e ajustes, com rollback de memória sem sobrescrever operações concorrentes. Para validação nativa de IndexedDB, executar esses mesmos invariantes em runtime que o forneça; os testes locais atuais modelam somente commit/erro/abort na fronteira de transação. Pendências de identidade, tenant e infraestrutura permanecem abertas.


## Revisão do Registro 0016

A fila de snapshots protege os comandos de corrida migrados. Continua pendente completar a fronteira para salvamento/autosave de ajustes, tema/idioma/fechamento diário, exclusão com tombstone atômico e outros mutadores de rota/GPS que persistem após alteração global. Testes de IndexedDB nativo permanecem limitados ao runtime apropriado.


## Revisão do Registro 0017

Resolvida a exclusão de corrida fora da fronteira: corrida/projeção e tombstone agora confirmam juntos via `commitRiderCommand`, e replay de exclusão de ID ausente é no-op. Os ajustes foram tratados no Registro 0018. Mutadores gerais de rota/GPS que persistem após alteração global permanecem fora desta sequência de escopo restrito. QA Chromium concluiu sem SIGKILL; o stderr de desligamento mencionou GPU após QA, sem falha durante o fluxo.

## Revisão do Registro 0018

Autosave/salvamento de settings, tema/idioma e fechamento diário agora serializam snapshots via `commitRiderCommand`; falha de persistência preserva o estado ativo. Cobertura estrutural passou, junto à suíte padrão. Ainda não foi validada transação IndexedDB nativa neste registro. Mutadores gerais de rota/GPS não foram migrados; permanecem como trabalho técnico separado. Nenhuma decisão arquitetural nova foi necessária.


## Revisão do Registro 0019

Corrigidos: transação parcial de normalização inicial; publicação prematura em cálculo de distâncias/ordem e GPS; importação de backup antes da persistência; exclusão/limpeza sem coordenação com a fila e backup; recebimento que não retinha tombstone e podia reaplicar entrega antiga; escape de IDs/assinatura em HTML.

Pendente P1: a fila `commitRiderCommand` é local à instância JavaScript. Duas abas simultâneas podem calcular snapshots independentes e uma gravação posterior pode substituir a mais recente; esta rodada não introduziu lock/CAS entre abas para evitar ampliar a arquitetura sem cobertura de runtime. Também não há teste com IndexedDB nativo neste runtime.

Limitação existente: atualização de `localStorage` após commit continua best-effort; falha de quota/escrita é registrada no console, mantendo IndexedDB como estado principal. Browser QA não executado.
## Atualização Registro 0058 — fundações self-hosted

- [x] Fundamentos no Restaurante: filesystem object store (UUID, limites, tipo/hash/integridade, atomicidade), keystore AES-GCM escopado, SMTP TLS adapter, TOTP/recovery primitives, writer de backup filesystem e documentação de deployment.
- [ ] **OPEN P1 — DeliveryProof:** ligar upload/leitura autenticados a CSRF, tenant e Driver server-side; persistir metadata PostgreSQL/RLS e testar lifecycle/remoção de órfãos.
- [ ] **OPEN P1 — MFA:** implementar enrollment, confirmação, seed server-side criptografado, contador replay persistente, rate-limit/auditoria e recovery codes one-time sem criar bypass; manter MFA administrativo fail-closed até lá.
- [ ] **OPEN P1 — Email/config:** completar templates/URLs web de convite/recovery, administração status-only e separação visível instalação vs tenant; testar SMTP em ambiente autorizado sem retornar segredos.
- [ ] **OPEN P1 — Secrets:** runbook/ferramenta de rotação segura da master key e validação operacional de permissões/backup offline.
- [ ] **OPEN P1 — Backup:** integração `pg_dump`, criptografia, agenda/retention, checksum/manifest e restore ensaiado em DB descartável; remota opcional.
- [ ] **OPEN P1 — Paridade/PG:** repetir PostgreSQL suite e auditoria read-only com URLs provisionadas; `npm run test:e2e-security` e `npm run test:postgres` não conectaram por falta das URLs.
- iFood/99Food/Keeta seguem BLOCKED_EXTERNAL; câmera/GPS dependem de dispositivo. F9 aprovada no 0057 não foi reaberta. Ver [Registro 0058](REGISTROS/0058.md).

## Atualização — Registro 0063

Fechado: rehearsal real pg_dump → artefato cifrado/manifesto → verificação → restore PostgreSQL descartável, incluindo comparação do ledger, estrutura, RLS/FORCE, policies, ownership e contagens.

Continuam OPEN para fechar ON_PREM_PRODUCTION_READY: (1) backup/restore coordenado filesystem DeliveryProof + PostgreSQL, com checksums/manifesto e validação canônica de referências; (2) provisioning/preflight/smoke completo em instalação limpa, incluindo permissões, keystore, SMTP, TLS/CA/proxy e scheduler; (3) retenção e decisão operacional de offsite/RPO/RTO com medição. Não são requisitos legais presumidos. Browser E2E não foi executado nesta rodada por escopo. Detalhes/evidências em [Registro 0063](REGISTROS/0063.md).

## Atualização — Registro 0064

Fechado no código e no ensaio: backup set indivisível lógico DB+mídia, cifra/HMAC/checksum, snapshot lock compartilhado por upload/sync/GC, restore staging para alvos descartáveis, validação por referência, retenção como diretório completo, status de operador e runbooks cron/timer.

OPEN para ON_PREM_PRODUCTION_READY: (1) rehearsal com ao menos uma DeliveryProof canônica não vazia em database test-only autorizado; o `rotamoto` real tinha zero referências, e `rotamoto_e2e` não recebeu grant de backup; (2) paths de mídia/backup persistentes e backup key durável com cópia offline protegida; (3) instalar cron/systemd/runit e alertas de falha/idade/espaço; (4) smoke de deployment real para TLS/CA/proxy, SMTP/PUBLIC_BASE_URL, keystore, scheduler e readiness; (5) medir RPO/RTO no deployment e decidir retenção/offsite operacionalmente. Retenção default 30d não é obrigação legal. Hardlink físico ficou NOT_TESTABLE por restrição Android/Termux. Detalhes no [Registro 0064](REGISTROS/0064.md).
## Atualização — Registro 0068 (2026-10-05)

- [x] **FECHADO — recovery PostgreSQL + mídia não vazio:** rehearsal real nos databases descartáveis 0068 com uma DeliveryProof filesystem canônica; conjunto cifrado/autenticado, verify, restore DB+filesystem, validação origem↔restore, teardown integral, grants revogados e resíduos ausentes. Ver [Registro 0068](REGISTROS/0068.md).
- [ ] **OPEN — deployment on-prem:** provisionar volumes/paths duráveis e permissões; manter chave de backup fora do DB com cópia offline protegida; instalar/monitorar cron/timer; executar smoke no host com PostgreSQL TLS/CA/proxy, SMTP, PUBLIC_BASE_URL, keystore, filesystem e health/readiness; medir RPO/RTO e decidir retenção operacional.
- [ ] **OPEN — cloud-ready separado:** escolher e validar no deployment cloud storage/secret/backup provider, cópia offsite e restore. Não é requisito para filesystem local on-prem.
- iFood/99Food/Keeta e hardware GPS/câmera permanecem externos/inerentes; não bloqueiam o core self-hosted.

## Atualização Registro 0069 — deployment Termux inspecionado

- [ ] **NEEDS_CONFIGURATION — volumes:** escolher paths persistentes separados para `ROTAMOTO_MEDIA_DIRECTORY`, `ROTAMOTO_BACKUP_DIRECTORY`, `ROTAMOTO_SECRET_STORE_DIRECTORY` e arquivos de key; provisionar ownership/permissões privadas fora do checkout/webroot e espaço/alertas. Não usar shared Android storage para segredos/backups sensíveis.
- [ ] **NEEDS_CONFIGURATION — serviço e rede:** instalar serviço Node supervisionado e ambiente privado; configurar `DATABASE_URL` de runtime, keystore/ref DB, `PUBLIC_BASE_URL`, origins/hosts e proxy TLS; provisionar domínio/certificado/cadeia e CA TLS PostgreSQL conforme topologia; executar readiness e smoke autenticado.
- [ ] **BLOCKED_EXTERNAL / NEEDS_CONFIGURATION — SMTP:** operador precisa prover relay/host/conta/credencial, guardar a credencial no keystore, configurar SMTP e validar TLS/entrega para convite/recovery.
- [ ] **NEEDS_CONFIGURATION — backup:** criar chave de backup permanente fora do DB, guardar cópia offline protegida separadamente, configurar role/url pgpass no serviço operacional, agendar `backup:create`/verify, retenção e alertas. O recovery set não vazio permanece comprovado pelo 0068.
- [ ] **NEEDS_OPERATOR_DECISION — operação:** definir frequência/RPO, medir restore/RTO no host destino, aprovar retenção com responsável legal/operacional e decidir necessidade/destino de offsite. Defaults de 30 dias e grace 45d são parâmetros técnicos, não obrigação legal.
- **Sem código impeditivo identificado no inventário.** PHP-FPM não se aplica à API Node; cloud providers não são requisitos on-prem; iFood/99Food/Keeta e hardware físico não bloqueiam o core.

## Atualização Registro 0067 (2026-10-05)
# Pendências funcionais — Registro 0074 (2026-10-06)

- [x] Definir e testar a semântica dos relatórios existentes, cobertura e export CSV; remover o uso de “Ticket geral” baseado na taxa de entrega.
- [ ] Configurar timezone IANA canônico por Company antes de publicar distribuição por hora/dia.
- [ ] Definir composição semântica de `Order.amountMinor` (produtos, taxa, descontos/impostos) e garantir cobertura por origem antes de publicar faturamento/ticket de produtos.
- [ ] Heatmap aguarda coordenadas históricas/proveniência, dimensão região/célula, política de retenção e agregação com privacidade.
- [ ] SLA aguarda `promisedAt`/deadline e política versionada de serviço; não inferir atraso sem promessa.
- [ ] Rentabilidade/custo/km aguarda receita comercial desagregada e custos atribuíveis de frota própria e fornecedores; Earning isolado é somente repasse.
- [ ] Frota híbrida aguarda LogisticsProvider, allocation/attempts, quote/ETA/custo e política de reconciliação; providers reais seguem campanhas futuras.
- [ ] E2E visual autenticado dos relatórios aguarda uma sessão de teste autorizada disponível ao Browser harness; nenhuma credencial foi usada nesta campanha.

## Self-hosted readiness — Registro 0059 (estado histórico; recovery atualizado em 0068/0069)


## Atualização — Pendências após Registro 0075

- [x] Implementar modelo opcional/anulável `Company.timeZone` IANA e usar timezone civil em agregações horárias/diárias. **Ação do operador:** aplicar migration aditiva 0016 pelo processo de deployment e configurar um timezone válido por Company; sem valor, as séries ficam indisponíveis.
- [x] Definir `Order.money` com componentes comprovados, minor units, moeda, proveniência e completude; não converter registros antigos.
- [ ] Mapear e validar componentes monetários canônicos por origem real à medida que adapters forem habilitados. Até então, total/ticket cobre somente Orders com total e moeda explícitos; não publicar faturamento para conjunto parcial/legado.
- [ ] Heatmap: adicionar coordenadas/proveniência e agregação espacial com regras de privacidade.
- [ ] SLA: adicionar prazo prometido/regra versionada e política de estados.
- [ ] Rentabilidade: obter receita completa e custos integrais atribuíveis; repasse Earning é insuficiente.
- [ ] Frota híbrida: modelar providers, attempts/alocações, quote/ETA/custo e reconciliação antes das integrações.
- Browser E2E autenticado de timezone/relatórios permanece NOT_TESTABLE até existir sessão de QA autorizada e CDP ativo.

Ver [Registro 0075](REGISTROS/0075.md).

## Campanha 0121 — gates parciais

- [ ] Política de negócio para cancelamento após coleta: definir retorno/custódia e eventual reentrega; nenhuma regra financeira foi presumida.
- [ ] Fechar cancelamento offline: definir/revisar conflitos explícitos dos fatos rejeitados; testar cenário sem ações locais e interleavings independentes (aceite, coleta, saída, conclusão, reentrega).
- [ ] Browser E2E FIFO com dois motoboys e Browser proof offline/recovery, inclusive comportamento para Delivery cancelada.
- [ ] Testar consumo simultâneo HTTP de identity token/provisioning por sessões independentes, e conflitos de packetId/revisões base em sessões PostgreSQL independentes.
- [ ] Concluir publicação do histórico após revisão do diff e verificação de ancestralidade/segredos.

## Campanha 0122 — gates parciais

- [ ] Implementar contrato e ações Motoboy para chegada e entrega física da mercadoria RETURN; transicionar custódia no servidor somente por evento autenticado do Driver atribuído.
- [ ] Testar no PG/Browser decisões RETURN/RELEASE/INCIDENT, idempotência concorrente, autorização, estado e receipt por dois operadores; completar sincronização offline dos cenários C–G.
- [ ] Testar criação única de RETURN, vínculo à Order original sem duplicação financeira, fim de rota, reordenação manual concorrente e convergência enquanto Motoboy está offline.
- [ ] Validar cancelamento independente antes da coleta e política operacional de divergência quando coleta offline chega após cancelamento; definir critérios de resolução de conflitos.
- [ ] Rodar Browser E2E das regressões 0120/0121 e dois Motoboys FIFO na campanha de encerramento; integração externa permanece limitada ao contrato existente.
- [ ] Revisar e autorizar separadamente a aplicação da migration 0041 em `rotamoto`; não aplicar sem autorização. Repetir security parity após alinhamento de ledger.
- [ ] Fast-forward e publicar apenas o histórico 0122 na branch `codex/f9-browser-e2e-0057` após fetch, ancestry, fast-forward e scan de segredos.

Ver [Registro 0122](REGISTROS/0122.md).
## Atualização — Registro 0125 (2026-10-10)

- [x] Divergência Route dirty/pacote/payload corrigida e confirmada por ACKs canônicos; evidência em `browser-tests/evidencias/campanhas/0126/return-flow/attempt-38/`.
- [x] Regressões Browser 0120, 0121 e 0122 reexecutadas com evidências 0126 isoladas.
- [x] Ciclo RETURN Browser chegou ao recebimento bilateral e à convergência no PostgreSQL e no Motoboy.
- [x] Offline RETURN, rate limit HTTP 429, retry/backoff e concorrência independente de sync/disponibilidade exercitados com resultados registrados.
- [x] Corrida específica de duas confirmações RETURN executada em sessões PostgreSQL/HTTP independentes em 0126; chave igual/distinta preservou uma confirmação/fato por delivery e isolamento tenant. Ver [Registro 0126](REGISTROS/0126.md).

## Atualização — Registro 0126 (2026-10-10)

- [x] **PASS — concorrência específica RETURN:** duas sessões independentes testaram chaves iguais e distintas; replay idempotente, uma confirmação/fato e conflito por revisão ou duplicata convergente. Evidência em [Registro 0126](REGISTROS/0126.md).
- [x] Histórico 0126 publicado somente em `codex/f9-browser-e2e-0057`, por fast-forward após fetch, ancestralidade, revisão final e scan de segredos. [Relatório publicado](https://github.com/mackowen/rota-moto-historico/blob/codex/f9-browser-e2e-0057/REGISTROS/0126.md).

0127 e 0128 encerradas e registradas. Não iniciar a Campanha 0129 sem nova solicitação.

## Atualização — Campanha 0136

- [x] **PASS — multimotoboy Browser:** três sessões autenticadas/perfis independentes; pedidos sincronizados juntos em packet único, três Drivers distintos FIFO, ciclo até DELIVERED e retorno à fila após lease/check-in. Evidência em `multidriver-attempt-18/`.
- [x] **PASS — recuperação de dispatch:** 429/503/timeout/desconexão mantiveram o mesmo packetId na outbox IndexedDB; ACK após recuperação convergiu sem duplicação. Nenhum reinício real do Browser foi necessário para este critério de reconexão.
- [x] **PASS — teardown RETURN:** runner repetido em `return-attempt-01/`; recebimento bilateral e exit code 0/signal null via CDP graceful close, sem kill manual.
- [x] **PASS — DeliveryProof e RLS E2E:** regressão nova em `deliveryproof-attempt-01/` e `npm run test:e2e-tenant-isolation` concluíram com PASS.
- [ ] **PARTIAL — escopo não exercitado:** corrida de criação por três sessões Restaurante simultâneas e reinício do Chromium enquanto o packet de despacho ainda está pendente não foram testados nesta continuação; não são alegados como prova.
- [ ] **BLOCKED — paridade de segurança do oficial:** falta URL/autorização de conexão estritamente read-only; nenhuma tentativa de acesso foi feita.
- [x] Concorrência PostgreSQL/FIFO/revisão/lease/idempotência repetida três vezes em schema isolado `rotamoto_e2e`; sem lock residual ou duplicidade observada.

Ver [REGISTROS/0136.md](REGISTROS/0136.md). Não iniciar 0137.


## Campanha 0137 — pendências abertas

- [x] **PASS:** Browser attempt 17 fechou o fluxo transacional com sessões Restaurante independentes, PIDs/XIDs distintos, waits reais, ACK/FIFO/replay, convergência após reinício e teardown normal. O hang attempt 14 ficou isolado ao pós-fluxo do harness; a await exata não foi registrada. Ver `REGISTROS/0137.md`.
- [x] **PASS:** comparar PostgreSQL oficial × E2E sob READ ONLY; ledger 0040 confirmado pela role auditora e estrutura/RLS aditiva E2E 0041 conferida.

Ver [Registro 0137](REGISTROS/0137.md). A 0138 foi iniciada por solicitação; não iniciar 0139 automaticamente.

## Campanha 0138 — pendência operacional

- [x] Browser transacional 0138: duas sessões Restaurante, transações PostgreSQL independentes, FIFO, ACK/replay, recuperação offline/reinício real e teardown normal comprovados em attempt 02.
- [x] Auditoria read-only oficial repetida com `rotamoto_auditor`; ledger 0040 e paridade de metadados comuns/checksums comparados ao E2E 0041.
- [x] **PASS — restore local e ensaio 0041 no clone:** recovery set existente verificado, restore completado no `rotamoto_disposable_0138_20261011_41770017`, contagens/catálogos comparados e migration exata ensaiada; RETURN/idempotência e tenant RLS passaram no DB/role. Clone limpo após fixtures.
- [ ] **PARTIAL — cobertura de mídia histórica:** `~/rotamoto-data/media` está vazio e não identifica a raiz operacional. A nova raiz de desenvolvimento foi validada separadamente; cobertura fora dela permanece sem prova. Recuperação técnica da cópia Drive passou depois, mas custódia independente da frase segue pendente.
- [ ] **PARTIAL — paridade integral:** restore aplica `--no-owner --no-acl`; grants runtime precisam ser provisionados no alvo antes de tráfego. Na comparação final, um CHECK diferiu apenas por parênteses redundantes no deparse; não se declara identidade byte a byte.
- [ ] **BLOCKED / não executado — jornada RETURN HTTP/Browser e promoção:** 0041 não foi aplicada ao oficial por instrução desta execução; oficial segue 0040, E2E 0041. Nenhuma escrita oficial.
- [ ] Cobrir isoladamente o helper de limpeza da fixture independente antes de depender dele em teardown com tenants persistidos.

Ver [REGISTROS/0138.md](REGISTROS/0138.md). Não iniciar Campanha 0139 automaticamente.

## Atualização — Continuação RETURN 0138

- [x] **PASS — E2E retorno:** cancelamento após pickup, RETURN único e vinculado, route reordenada/restaurada ao fim, offline/reconexão, ACK/replay, receipt bilateral e isolamento tenant demonstrados em Browser/HTTP/PostgreSQL em attempt-05.
- [x] Corrigida reconciliação do Motoboy para fatos de Delivery versionados que seguem a revisão canônica; scheduler volta a verificar eventos pendentes depois de cada sync concluído. `npm test` ambos apps passou.
- [ ] **PARTIAL — recovery global:** raiz histórica completa de mídia e cópia independente da chave continuam sem prova; divergências de ownership/ACL e textual schema do restore seguem registradas.
- [ ] **OPEN — promoção 0041:** oficial `rotamoto` permanece read-only na 0040; não promover sem gates de recuperação/paridade, janela e execução autorizada. E2E continua na 0041.

Ver [Registro 0138](REGISTROS/0138.md). Não iniciar Campanha 0139.

## Auditoria final de prontidão 0138 — 2026-10-11

- [x] **PASS — núcleo técnico 0041:** checksum, ensaio no clone restaurado, constraints, índice único, RLS/FORCE, grants runtime e RETURN/idempotência verificados; Browser attempt-05 permanece válido.
- [ ] **BLOCKED — prontidão de promoção:** raiz histórica de mídia operacional não identificada/cobertura incompleta; cópia protegida independente da chave não comprovada. A chave local não é recovery independente.
- [ ] **PARTIAL — janela/risco operacional:** `ALTER TABLE`/índice exigem lock; snapshot sem waits não reserva janela; duração da migration no clone não foi registrada. Confirmar timeout, duração representativa, janela e abort criteria.
- [ ] **PARTIAL — rollback após uso:** `0041.down.sql` elimina recibos e não é seguro se houver RETURN persistido; definir forward-fix ou restore coordenado antes de operação.
- [ ] Decisão final da auditoria: **NOT READY**; oficial permanece read-only em 0040, E2E em 0041. Não executar promoção sem fechar todos os gates e autorização/janela específicas.

Ver [REGISTROS/0138.md](REGISTROS/0138.md). Não iniciar Campanha 0139.

## Continuação — chave de recuperação e cópia Drive 0138

- [x] Localizada a chave existente (32 bytes, 0600) sem exibir conteúdo; Node/OpenSSL bundled fornece AES-256-GCM e Downloads está acessível.
- [x] **PASS reportado pelo operador — recovery Drive:** cópia baixada conferida por SHA-256 e execução reportou autenticação AES-GCM, igualdade com a chave original e remoção do plaintext.
- [ ] **PARTIAL — custódia da frase-senha:** guarda independente da frase ainda depende de comprovação do operador; não presumida.

Ver [REGISTROS/0138.md](REGISTROS/0138.md). Não iniciar Campanha 0139.


## Fechamento de desenvolvimento — Campanha 0138 — 2026-10-11

- [x] **COMPLETE — desenvolvimento local:** runtime filesystem-v1 isolado, HTTP/tenant, persistência após reinício, recovery set DB+mídia restaurado em cluster descartável e ensaio rollback-only 0041 comprovados.
- [x] **PASS reportado — recuperação criptográfica:** operador confirmou recovery da cópia baixada; SHA/GCM/igualdade/remoção de plaintext.
- [ ] **PARTIAL — custódia independente da frase-senha:** depende do operador; não presumida.
- [ ] **BLOCKED — raiz/cobertura de mídia fora do desenvolvimento:** sem API operacional/configuração ou leitura autorizada das referências atuais; não classificar o diretório local vazio como storage completo.
- [ ] **NOT READY — promoção oficial:** proibida nesta execução; oficial segue 0040 read-only. Clone restaurado usa `--no-acl` e requer grants explicitamente provisionados antes de tráfego.
- [x] Nenhuma migration oficial, deploy, alteração de baselines ou push de aplicativos; não iniciar 0139.

Ver [REGISTROS/0138.md](REGISTROS/0138.md) e [RESUMOS/0138.md](RESUMOS/0138.md).

## Campanha 0139 — pendências remanescentes

- [ ] **PARTIAL — mapa vetorial escuro:** validar em Chromium de teste com WebGL2 funcional; manter atribuições do provedor. O ambiente atual ficou no fallback OSM raster claro.
- [ ] **BLOCKED — sessão autenticada e vínculo:** fornecer API de teste com identidade real autorizada e fixture tenant-safe; nenhum vínculo foi simulado.
- [ ] **BLOCKED — GPS físico e rota/pins canônicos:** validar em dispositivo/emulador autorizado com rota E2E; o harness não injeta coordenadas nem dados operacionais.
- [ ] Aceite estético final depende do operador; capturas antes/depois e matrizes estão em `browser-tests/evidencias/campanhas/0139/controlled-harness/`.

Ver [REGISTROS/0139.md](REGISTROS/0139.md). Não iniciar Campanha 0140.

## Campanha 0140

- [x] **PASS — migration oficial 0041:** aplicada em `rotamoto` após gates de identidade, checksum, ausência de dados com auditor `BYPASSRLS`, recovery e mídia; runner transacional. Ledger final 0001–0041, checksum `c75063f833da16a8efdd2e8d448bf1c7c3aee7e360be8d9e1f12397d15251a9c`. Ver atualização posterior em [REGISTROS/0140.md](REGISTROS/0140.md).

- [ ] **PARTIAL — mapa vetorial escuro:** testar com WebGL2 habilitado; Chromium Termux usou tiles raster claros.
- [ ] **PARTIAL — pins reais no mapa:** repetir com sessão/rota autorizada e coordenadas E2E; na matriz visual o contador de marcadores foi zero.
- [ ] **BLOCKED — GPS físico e câmera/QR ao vivo:** precisa de dispositivo/emulador com sensores e permissões reais.
- [ ] **PARTIAL — toque no link da Ajuda:** menu/tela Ajuda abriram por toque; link foi comprovado por clique nativo DOM porque eventos CDP não alcançaram o link de modo confiável.
- [ ] Revisão estética final pelo operador; capturas representativas em `browser-tests/evidencias/campanhas/0140/revisao/`.

Ver [REGISTROS/0140.md](REGISTROS/0140.md). Não iniciar Campanha 0141.

## Atualização vigente — Campanha 0142 (2026-10-13)

**Auditoria funcional integrada: PARTIAL; defeitos de produto confirmados: 0.** Os fluxos testados passaram em suítes automatizadas e Browser E2E no banco isolado. Os limites de hardware e de homologação externa permanecem, sem serem classificados como falhas de aplicação. Esta atualização complementa a matriz 0141 abaixo, que permanece intacta como fotografia anterior.

### Desenvolvimento e cobertura

- **RESOLVED no escopo testado:** identidade/MFA/tenant; isolamento RLS de duas empresas; criação/sync de Order/Delivery pela UI; despacho, rota/reordenação, transições do Motoboy, cancelamento após coleta, RETURN offline com 503 injetado, recuperação/outbox, handover e recibo bilateral. Ver [REGISTROS/0142.md](REGISTROS/0142.md).
- **RESOLVED no escopo testado:** `DeliveryProof`/filesystem-v1 autenticado; tenant proprietário lê os bytes e tenant distinto recebe 404 sem alteração do objeto. QR assinado/contrato passou na suíte unitária, mas leitura de câmera não foi testada.
- **OPEN / P2 — cobertura Browser de integrações:** o fixture `campaign-0140-return-e2e.cjs` não registra `createMarketplaceAdminHandler`; por isso a inicialização da UI recebe 404 em `/api/admin/marketplace/orders`. O servidor real registra o handler (`server.js`); não é defeito do produto demonstrado. Completar o fixture com adapter fake para testar estados do painel sem credenciais/serviços comerciais.
- **PARTIAL / P2 — experiência física:** nenhum aparelho Android foi usado. GPS real, permissões/sinal e leitura QR por câmera continuam sem validação física. A interface no Browser exibiu endereço/localização indisponível porque o fixture não tinha coordenadas reais; isso não é classificado como defeito.
- **PARTIAL / P2 — modo offline:** teste Browser injeta HTTP 503 no POST de sync; a outbox foi preservada e convergiu após retry. Isso valida falha/retry de transporte, não perda real de rede por rádio nem suspensão do Android.
- **OPEN / P3 — settlement:** liquidação financeira continua funcionalidade não implementada e requer decisão de produto; não é regressão nem requisito para validar os fluxos testados.

### Ambiente e produção

- Integrações iFood/99Food/Keeta foram exercitadas por testes de contrato/adapters locais; chamadas reais/sandbox continuam pendentes. Isso não impede evolução de código com adapters fake em ambiente de desenvolvimento.
- TLS público, SMTP comercial, RPO/RTO, deployment definitivo e rotina de backup de produção não foram avaliados nesta campanha e **não bloqueiam correções/desenvolvimento local**. São gates para implantação/uso operacional futuro.
- Pós-testes foi visto no `rotamoto_e2e` o schema `campaign0112_6017eee712694ccc98084ce3da5da803`. A suíte de disponibilidade informou que seu schema temporário foi removido; como não foi feito inventário de schemas antes da campanha, a origem do schema 0112 não pode ser atribuída. Não foi lido, alterado nem removido. Investigar somente por leitura antes de qualquer limpeza futura.

## Campanha 0144 — pedidos unificados e integrações (2026-10-13)

- [x] **RESOLVED — publicação de Orders externos:** iFood/Keeta publicam `CANONICAL_RECORD_UPSERTED` na outbox na mesma transação da projeção; Restaurante puxa e exibe Order na lista principal. Browser comprovou um pedido próprio e um externo juntos; replay manteve duas linhas sem duplicar. Origem e estado do provider estão visíveis.
- [x] **RESOLVED — fulfillment sem atribuição automática:** pedido externo com modo desconhecido não cria `Delivery`, QR ou atribuição de motoboy; detalhe exige confirmação do modo. Entrega própria segue o fluxo de Logistics e comandos externos seguem em Integrações.
- [x] **RESOLVED — fronteiras da interface:** origem local em Ajustes; configuração/conexão/diagnóstico em Integrações; parceiros na seção Logística; dados sintéticos no Laboratório. Browser mobile 390 px sem overflow.
- [ ] **BLOCKED / P1 — adapter 99Food:** o portal público descreve API de pedidos, webhooks e sandbox, mas contrato técnico, credenciais e certificação requerem onboarding. Não inventar endpoints/payloads. Dependência: acesso autorizado do parceiro e homologação externa. [Portal 99Food](https://developer-food.99app.com/).
- [ ] **OPEN / P2 — homologação externa iFood/Keeta:** confirmar efeitos reais de cancelamento, estados fora de ordem e fulfillment em sandboxes autorizados; esta campanha usa adapters/fakes determinísticos, sem chamadas comerciais.
- [x] **RESOLVED — regressão de teste documental:** `test-ifood.js` passou a verificar as mensagens atuais de capability pública e isolamento do Laboratório.

Ver [REGISTROS/0144.md](REGISTROS/0144.md) e [RESUMOS/0144.md](RESUMOS/0144.md). Nenhuma migration, alteração no banco oficial ou deployment.

## Atualização — Campanha 0135
