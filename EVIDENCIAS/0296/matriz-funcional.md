# Campanha 0296 — matriz funcional exercitada

Escopo executado em Chromium/CDP com sessão Restaurante emitida pelo backend E2E após MFA sintética verificada. Fixture final: `8b57d073-e38f-48e7-9efc-98e5d7afabc1`, `rotamoto_e2e`, `databaseCommitted=false`, cleanup concluído e contagens tenant-scoped zeradas. O pedido real #1234 não foi consultado nem modificado.

| Área/campo | Interação e persistência | ACK/readback | Navegação/reload | Nova sessão | Resultado / limite |
|---|---|---|---|---|---|
| Pedido manual — número `0296-MANUAL-SYNTH` | Criado pelo formulário real | Order recebeu ACK `accepted`, identidade canônica e revisão 1; Delivery inicial também recebeu ACK | Navegação para Entregas e reload mantiveram o pedido no IndexedDB e na lista | Restauração após reload na mesma sessão; aba/sessão independente não executada | **PASS_SCOPE** para criação, sincronização, reload e apresentação |
| Pedido manual — cliente, telefone, endereço e observação | Valores sintéticos válidos inseridos pela UI | Incluídos no Order canônico | Conteúdo conferido na prévia da comanda após reload | Não executada em sessão independente | **PASS_SCOPE** para o conteúdo exercitado; outros campos não cobertos |
| Imprimir pela listagem | Botão real abriu a prévia de comanda após reload | Prévia contém pedido, cliente, telefone, endereço, observação, status e taxa | Confirmada após navegação e reload | Não executada em sessão independente | **PARTIAL** — geração da prévia passou; botão final de impressão e impressora física não confirmados |
| QR seguro, Delivery `CREATED` | Botão real abriu o modal | Nenhuma emissão solicitada para status não elegível; endpoint seguro permanece como fonte da assinatura | Sem alteração do pedido | Não aplicável ao status `CREATED` nesta sessão | **PASS_SCOPE** para feedback de elegibilidade; emissão para `ASSIGNED`/em execução não exercitada |
| Cancelar entrega | Botão real abriu formulário modal acessível com motivo obrigatório, “Cancelar operação” e “Confirmar cancelamento” | Operação cancelada pelo usuário no modal; nenhuma chamada de cancelamento foi enviada | Não houve alteração canônica | Não executada | **PASS_SCOPE** somente para confirmação e cancelamento do diálogo; execução canônica não foi acionada |
| Cartão de pedido — cabeçalho, cliente/endereço, origem, motoboy, taxa, distância e ações | Browser autenticado em 360, 390 e 768 px, tema claro/escuro | Não altera persistência | Visível na lista após reload | A mesma sessão restaurada | **PASS_SCOPE** visual nos seis pares; sem overflow, cliente/endereço em linha própria e ações dentro do viewport |
| Modal QR — estado não elegível | Browser autenticado nos mesmos seis pares | Nenhuma chamada de emissão para `CREATED` | Mensagem e ação Fechar visíveis | Não executada | **PASS_SCOPE** visual e feedback; estado elegível pendente |
| Data inválida no histórico | Guarda `dateFmt`/`dayFmt` exercitada por regressão de código | Sem escrita | Não foi injetada uma linha histórica com data inválida no Browser | Não executada | **PARTIAL** — fallback implementado; cenário de dados inválidos real não reproduzido |
| Distribuir mais corridas após falha de disponibilidade | Handler atualizado para exigir leitura vigente e apresentar “Disponibilidade não confirmada” com retry | Nenhuma corrida atribuída neste caminho | Não executado no Browser nesta campanha | Não executada | **PARTIAL** — regressão automatizada/static; falha HTTP e sucesso cross-app não repetidos |
| Cross-tenant e pedido real #1234 | Sem consulta ou mutação ao pedido real; não foi montada segunda empresa nesta execução | Proteções server-side existentes mantidas; resolução local não substitui autorização | Não executado | Não executada | **PARTIAL** — incidente e isolamento entre duas identidades não reproduzidos nesta campanha |
| Chrome Android físico e impressão física | Não disponível neste ambiente; Chromium headless via CDP | Não aplicável | Não executado | Não executado | **BLOCKED_BY_DEVICE**; não declarado como PASS |

## Capturas

- `manual-order-print.png`: prévia com o conteúdo canônico do pedido sintético.
- `order-card-{360,390,768}-{light,dark}.png`: cartões da listagem.
- `qr-ineligible-{360,390,768}-{light,dark}.png`: estado QR antes da atribuição.
- `browser-report.json`, `browser-trace-sanitized.jsonl` e `fixture-cleanup.json`: resultado, requests/ACKs sem credenciais e limpeza E2E.

O trace inclui uma resposta `403 CSRF_INVALID` do primeiro registro de instalação, antes de a restauração da sessão estabelecer o token CSRF; a repetição autenticada retornou `200` e o ciclo ACK/readback passou. Nenhum token CSRF está no trace.
