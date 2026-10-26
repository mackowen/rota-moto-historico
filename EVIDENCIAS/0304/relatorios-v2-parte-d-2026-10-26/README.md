# Relatórios V2 — Parte D: auditoria da integração de dados

Data: 2026-10-26. Restaurante branch `codex/campaign-0304-visual-consolidated`; base Parte C `5e88a253c6e274d77a38ccea637757f894010d28`.

## Resultado e limite de produção

O Executivo agrega projeções canônicas locais do IndexedDB, conforme arquitetura local-first; não consulta diretamente o PostgreSQL para o relatório geral/financeiro. O selo anterior “Dados locais” também tinha falso negativo: dependia de `transport=connected` e `lastReceivedAt`, embora o ciclo de sucesso não persistisse o primeiro campo e a inicialização rebaixasse o transporte a `pending`. Isso não provava indisponibilidade, divergência ou ausência de dados no PostgreSQL.

Corrigido para mostrar situação fundamentada. A nota acessível sempre diz que os cálculos usam a cópia local. “Confirmado” exige push + pull completos, sessão ativa, transporte conectado, tenant ativo correspondente e nenhuma operação pendente/conflito/rejeição. Estados distintos: Não verificado, Confirmado, Atenção, Offline, Sessão encerrada, Sem permissão, Servidor indisponível e Atualizando. A confirmação não equivale a consulta em tempo real do banco.

**Auditoria do PostgreSQL oficial: BLOCKED.** A conexão autorizada `rotamoto_auditor` falhou porque não há senha disponível (`fe_sendauth: no password supplied`). Nenhuma credencial alternativa foi tentada. Sem contagens, comparação de linhas ou inferência de completude/atraso/divergência. Health/readiness da API retornou 200. Sem sessão, `/api/sync/pull` e `/api/domain/orders` retornaram 401, esperado. Nenhuma escrita, migration ou operação oficial foi realizada.

## Fluxos identificados

```text
Restaurante: domínio → IndexedDB → outbox local → POST /api/sync/push
  → autenticação/RBAC/tenant + sync_inbox/idempotência → domain_records PostgreSQL
  → ACK reconciliado localmente → GET /api/sync/pull (cursor/páginas)
  → projeção IndexedDB → RotaMotoAnalytics.aggregate → Relatórios

Motoboy: eventos append-only no IndexedDB/outbox → push autenticado
  → validação de empresa/atribuição/revisão → projeção + outbox do servidor
  → pull Restaurante → eventos/projeções locais → relatório

Mapa: exceção online, /api/analytics/territorial → delivery_geo_snapshots;
coordenadas explicitamente confirmadas, autorização e supressão de grupos pequenos/PII.
```

| Entidade | Criação/ownership e id | Persistência/sync | Leitura, conflito e idempotência |
|---|---|---|---|
| Order | Restaurante, UUID canônico estável | IndexedDB `orders` → packet outbox → `/api/sync/push` → `domain_records`; `local_id_maps` associa ids local/canônico | API `/api/domain/orders` autenticada; dashboard usa projeção local após ACK/pull. Inbox deduplica packetId+digest; conflito por baseVersion, sem last-write-wins. |
| Delivery | Criada/planejada pelo Restaurante; id compartilhado. Motoboy não é dono do registro | IndexedDB `deliveries` → packet; execução chega por eventos | Relatório usa projeção local; tenant, permissão e revisão são validados. |
| DeliveryEvent | Imutável; eventos de Order pelo Restaurante e execução pelo Motoboy; `eventId` estável | IndexedDB `deliveryEvents`/outbox → API, outbox servidor e pull paginado | Deduplicação por id do evento/operação; valida vínculo, atribuição e transição. |
| Driver | Cadastro canônico do Restaurante | IndexedDB `bikes` → packet → domínio `Driver` | Leitura por empresa/permissão; Motoboy recebe projeção autorizada. Ranking sem foto inventada. |
| Route | Planejada pelo Restaurante; UUID estável | IndexedDB `routes` → packet/domain record | Projeção por empresa/atribuição; revisão protege conflitos. Fonte local reutilizada nos relatórios. |
| Earning | Calculada/escrita pelo Restaurante após Delivery concluída | IndexedDB `earnings` → packet/push → `domain_records` | Valor calculado/repassável; não prova quitação nem faturamento. Motoboy é leitura conforme permissão. |
| LocationPoint / DeliveryProof | Propriedade de execução/localização do Motoboy | Stores/outbox local do app Motoboy → sync autenticado | Servidor valida empresa, atribuição, dispositivo e permissão; não vira automaticamente mapa público. |
| Packet/eventos sync | Dispositivo e tenant ativos | Outbox IndexedDB → API; `sync_inbox`, `sync_outbox`, `domain_records`; ACK local | packetId+digest/eventId e cursor; `company_id`, RBAC/RLS. E2E descartável validou isolamento. |

Inventário baseado no contrato, migrations, serviços e testes; não significa leitura dos dados reais. Contagens/tabelas efetivas oficiais continuam dependentes de acesso autorizado.

## Matriz financeira — preparação, sem implementação na Parte D

| Indicador | Fonte atual | Semântica/disponibilidade | Lacuna |
|---|---|---|---|
| Valor comercial do pedido | `Order.money.components`, `totalMinor`, moeda/proveniência/completude; legado explícito | Valor do pedido, não liquidação | Cobertura por canal desigual; definir inclusão/cancelamento e conciliação. |
| Taxa de entrega | `Order.deliveryFee`/componentes e compatibilidade legada | Cobrança; não repasse nem necessariamente receita reconhecida | Confirmar origem, tributação e regra por canal. |
| Descontos | `Order.money.discountMinor` se explícito; payload variável | Desconto, não pagamento | Normalizar custeio e ajuste financeiro canônico. |
| Cancelamento/estorno/chargeback | Estado/eventos e comandos de plataforma | Estado operacional, sem razão contábil universal comprovada | Falta razão canônica com valor, moeda, origem, timestamp e idempotência. |
| Pagamentos | `Order.payments`/metadados dos provedores | Parcial por canal; sem fato geral de liquidação confirmado | Fonte oficial e conciliação requeridas para faturamento recebido. |
| Earning/repasses | `Earning.amountMinor`, moeda/componentes; cálculo Restaurante após conclusão | Valor calculado devido, não comprovante de pagamento | Separar de receita; falta evento oficial de liquidação. |
| Custos logísticos | Estimativas/valores de fulfillment e cotações | Custo/estimativa, não receita | Preservar estados estimado/observado e cobertura. |
| Faturamento diário | Nenhuma fonte oficial consolidada localizada | Indisponível honestamente | Fonte oficial e razão de ajustes/reembolsos aprovadas; reservado à Parte E. |

Não houve migration ou mudança de regra financeira.

## Implementação e arquivos

- `app.js`: confirmação tenant-bound somente após push e pull completos; paginação incompleta não avança timestamp. Sessão restaurada volta a não verificado. Falhas distinguem offline/sessão/servidor. Reutiliza metadata e `syncState` existentes.
- `analytics-view.js`: helper puro e badge compacto; nota acessível identifica IndexedDB como fonte.
- `index.html`, `sw.js`: cache versionado para servir os módulos novos.
- Testes: analytics-view, dashboard-v2, dispatch-assignment, identity-ui, presence-qr-modal, printing-offline, sw-atomic-install e visual-shell-cache.

## Evidências e gates

- `npm test` integral Restaurante: PASS, exit 0 após atualização tenant-bound.
- `npm run test:analytics`, `npm run test:sync`, renderer/cache/SW/feedback dirigidos: PASS.
- `node --check` app.js, analytics-view.js, sw.js e teste; `git diff --check`: PASS.
- `node tests/test-domain-sync-postgres.js`: PASS contra `rotamoto_e2e`, incluindo isolamento, revisões, handover, receipt idempotente e cancelamento/replay; transação revertida, zero resíduos. É integração autenticada descartável, não produção nem browser E2E.
- Nginx 8083 serviu hashes do worktree: app.js `b45b6c6b7a2500a91c8faedc33f06db021c52bdf816715656487a3e6de81fe9d`; analytics-view.js `a2a7ec35f4baccef71a7d3e6160781d43f417295bdf82c88c04c7b60d642434d`.
- PostgreSQL oficial/paridade: BLOCKED por senha ausente do papel autorizado; browser E2E autenticado/Android físico: BLOCKED por sessão/dispositivo.

| Gate | Estado | Justificativa |
|---|---|---|
| Origem local e estados de sync | PASS técnico | Cobertura de sessão, tenant divergente, confirmação, pendência, offline e erro. |
| API/sync PostgreSQL isolado | PASS | E2E descartável, transação revertida sem resíduo. |
| Contratos, ownership e idempotência | PASS em contrato/E2E | Contrato, serviços e E2E cross-tenant. |
| Dados/paridade PostgreSQL oficial | BLOCKED | `rotamoto_auditor` sem senha; nenhuma credencial alternativa. |
| Suíte/sintaxe/diff | PASS | `npm test`, node checks e diff check. |
| Faturamento oficial | PARTIAL/BLOCKED | Liquidação/razão de ajustes não comprovadas; Parte E pendente. |
| Browser autenticado/Android físico | BLOCKED | Sessão e dispositivo ausentes nesta execução. |
| G14 | **FAIL** | Aprovação visual explícita pendente. |

Campanha 0304 permanece aberta/PARTIAL; Parte E e 0305 não iniciadas. Nenhuma mudança oficial no banco ou ownership.
