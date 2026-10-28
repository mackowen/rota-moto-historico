# Distribuição de corridas

## Defeito e causa

Em Restaurante `app.js`, `bindQueueControls()` instalava também um listener em `[data-bikeassign]`, enquanto o binder global em `bind()` definia `onclick` para o mesmo controle. O mecanismo `assignmentLoading` evitava duas operações simultâneas, mas a ativação real entrava duas vezes no fluxo de abrir seleção. Os controles do card de motoboy, fila canônica e histórico de corridas precisam manter o identificador do entregador selecionado.

## Correção

- `app.js`: adicionado `bindBikeAssignmentButton()` e `bindBikeAssignmentButtons()` como ligação compartilhada, com trava de clique, preservação de `driverId`, fechamento do modal de histórico antes de abrir o fluxo e restauração do controle.
- `bindQueueControls()` deixou de registrar um segundo listener para atribuição.
- `tests/test-dispatch-assignment.js`: monta botões DOM simulados ligados ao binder de produção e aciona card, fila e histórico; verifica driver enviado, modal fechado antes de abrir, clique repetido ignorado, ausência do segundo binding e falha/timeout com feedback e reativação do botão.

## Validação real

- `node tests/test-dispatch-assignment.js`: PASS.
- `node tests/test-orders-v2-cards.js`: PASS; também verifica estados elegíveis, lease de disponibilidade, espera pela sincronização e leitura canônica.
- `ROTAMOTO_E2E_CAMPAIGN=0304 npm run test:availability-concurrency-e2e`: PASS. O E2E exercitou locks em duas sessões PostgreSQL, FIFO, despacho manual/automático, interleavings offline, corrida concorrente (um vencedor e conflito no perdedor), retries idempotentes, aceitação e RLS/rollback.

## Estado e limite

A entrada real de distribuição está testada no DOM e a operação de serviço foi testada em E2E PostgreSQL. Não foi realizada sessão autenticada de navegador. Os schemas de fixture foram retidos pelo runner; não houve limpeza. O estado do clique não comprova Browser QA visual autenticado.
