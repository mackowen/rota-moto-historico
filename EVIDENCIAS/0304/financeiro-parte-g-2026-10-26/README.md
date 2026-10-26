# Campanha 0304 — Parte G — 2026-10-26

## Escopo e base

Continuação do commit Restaurante `45bcd9d9a2d449c38af015529982c9bb19d3a57b`; commit local Parte G `46d1c4d` (`feat(0304): add financial actions and concurrency guards`). Não houve alteração em `Order.money`, layout estrutural de Relatórios V2, Motoboy ou banco oficial. Migração 0055 e testes foram executados somente em `rotamoto_e2e`. Nenhuma operação financeira real foi criada.

## Interface implementada

- Detalhe de pedido: declarações de recebimento existentes, seleção do pagamento original e ações de estorno e ajuste.
- Earning associado à entrega: mostra valor calculado no Earning local, liquidações declaradas no razão e saldo sem liquidação declarada; permite pagamento parcial somente quando há Earning canônico. O endpoint valida o devido novamente no servidor.
- Modais mostram moeda, valor, origem manual, estado pendente do servidor, referência/motivo e confirmação explícita. Envio duplica-se não por clique: botão fica bloqueado durante a requisição, chave idempotente é única e referência repetida é recusada no servidor.
- 4xx preserva o formulário e apresenta mensagem específica. Eventos offline permanecem pendentes e não são apresentados como liquidados.
- Regras de saldo continuam autoritativas no servidor, sob `finance.manage`, sessão/MFA e tenant ativo.
- Exportação CSV separa composição comercial de recebimentos, estornos e ajustes confirmados; se o razão não foi consultado, mantém os campos indisponíveis. Exportação não concede autorização financeira adicional; acesso segue as permissões de relatório e a sessão existente.

Limitação: a lista de recebimentos/estornos/ajustes é limitada aos eventos carregados (API limita a 500); estado de truncamento é apresentado em Relatórios. A UI mostra Earning disponível localmente e liquidações carregadas do servidor; a declaração manual é auditável, mas não é comprovação bancária independente. MFA e RBAC são validados pela API existente; o navegador autenticado não foi exercitado por ausência de credenciais E2E autorizadas.

## Integridade e concorrência

Adicionada migration `0055_financial_reference_uniqueness` (up/down) com índice único parcial para referências normalizadas por empresa, tipo e Order/Earning. Serviço serializa chaves de referência por advisory lock e retorna conflito HTTP 409. Os bloqueios de Order/Earning e pagamento referenciado, transação e validações de saldo existentes são preservados.

Teste novo `tests/test-finance-concurrency-postgres.js` abre duas conexões `rotamoto_app` independentes e confirma PIDs distintos e sobreposição real. Casos simultâneos: referência de recebimento com case/whitespace diferente (1 evento + 1 conflito), recebimentos além do saldo (1 sucesso + 1 recusa), estornos além do pagamento original (1 + 1), repasses além do Earning (1 + 1), retry do mesmo evento/idempotency key (1 insert + 1 duplicado) e dois ajustes legítimos (ambos persistidos). Totais/eventos readback conferidos; cleanup de eventos, domínio e tenant descartável: zero resíduos.

Resultado observado: pagamentos `3` eventos, estorno `751` minor units, repasse liquidado `6000`, ajustes `-300`, sete eventos totais no fixture. Migração 0055 consta aplicada em E2E. Nenhum gate oficial foi acessado.

## Testes, gates e pendências

- Concorrência PostgreSQL de duas conexões: PASS. PIDs do run: `13295`, `13296`; cleanup PASS, resíduos 0.
- Unitários de analytics e renderer: PASS após atualizar contrato do CSV; a primeira execução apontou assertion antiga, corrigida para os campos explícitos novos.
- `npm test` suíte Restaurante completa: PASS, execução final encerrada com exit 0; inclui analytics, view, cache/service worker, segurança, contrato cross-app, billing e regressões Restaurante/Motoboy.
- Integração HTTP/PostgreSQL autenticada `tests/test-domain-sync-postgres.js`: BLOCKED antes dos casos financeiros. O fixture atual tentou inserir usuário sintético por `rotamoto_app` e recebeu `42501` (RLS); nenhum relaxamento de policy ou substituição pelo migrator foi feito.
- Regressão Motoboy/contrato compartilhado: não executada, pois nenhum arquivo/contrato Motoboy foi alterado; paridade cross-app permanece na suíte Restaurante.
- Browser E2E autenticado em celulares/tablet/desktop, claros/escuros, teclado, modais e erros: BLOCKED; não há credencial E2E autorizada fornecida. CDP sem sessão/fixture não seria tratado como E2E autenticado e não foi usado para alegar validação financeira.
- Fontes externas de pagamento e confirmação bancária independente: BLOCKED/inexistentes no escopo; declarações são identificadas como manuais.
- PostgreSQL oficial, reconciliação e promoção: BLOCKED pela falta de credencial autorizada `rotamoto_auditor`; nenhuma tentativa de contorno, leitura ou escrita ocorreu.
- G14: FAIL (aprovação visual expressa ausente). Campanha 0304 aberta; 0305 não iniciada.

## Checklist de promoção futura — não executado

1. Obter acesso aprovado do papel `rotamoto_auditor`; consultar somente leitura checksums 0052–0055, contagens por empresa/moeda/tipo, duplicidade de referências, vínculos Order/Earning e saldos/reconciliações.
2. Aprovar plano de promoção, janela, operador, versão e gate; validar checksum e compatibilidade da migration 0055 com dados existentes.
3. Produzir e verificar backup restaurável antes de qualquer migration; registrar integridade e retenção.
4. Revisar migrations e rollback: 0052 exige razão vazia para down; 0053–0055 têm downs versionados; executar rollback somente em ensaio E2E aprovado, nunca aplicar aqui.
5. Promover em execução separada, autorizada e monitorada; validar migration ledger, constraints, RLS, grants, contagens e reconciliação pós-migration; documentar rollback praticável.
6. Nenhum pagamento, estorno ou repasse real deve ser registrado como teste.

