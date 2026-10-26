# Campanha 0304 — Parte F: pagamentos e razão financeiro

Data: 2026-10-26. Continuação do commit Restaurante `672b970e73a2709ed467a93289e4a736c206d22c`, branch `codex/campaign-0304-visual-consolidated`.

## Auditoria de fontes

- `Order.money` completo continua sendo a fonte de valor comercial registrado. Esta parte não altera esse cálculo.
- `Order.payments` e metadados de integração não comprovam liquidação; estados vindos do payload do pedido não são usados para reconhecer recebimentos.
- O comando 99Food `CONFIRM_CASH_PAYMENT` é comando remoto específico da plataforma, não confirmação financeira genérica.
- Não foi encontrado callback/webhook de pagamento autenticado que possa alimentar um razão financeiro comum. Nenhuma integração de pagamento fictícia foi criada.
- O Restaurante não tinha fluxo financeiro manual nem entidade de recebimento canônica. O modelo `Earning` é a obrigação calculada para uma entrega concluída, não pagamento de repasse.
- A Parte F adiciona permissão RBAC `finance.read`/`finance.manage`; `finance.manage` exige MFA segundo a política de permissões sensíveis. A confirmação manual é explicitamente `operator_declaration`, incluindo operador autenticado e horário do servidor, e não é liquidação bancária independente.
- Motoboy, seus payloads e ownership de `Earning` não foram alterados. O Restaurante grava somente a liquidação referenciada a um Earning canônico pertencente à empresa.

## Modelo e regras

`rotamoto.financial_events` é o razão imutável. Cada evento tem `event_id` e `idempotency_key` UUID, empresa, referências Order/Delivery/Earning/evento relacionado, tipo, valor em minor units, moeda, meio quando aplicável, referência, motivo, origem, usuário ator, horário declarado e horário de inserção. Atualização/exclusão é barrada por trigger; estorno/ajuste/liquidação são fatos compensatórios referenciados.

| Fonte/evento | Evento gravado | Regra / indicador |
|---|---|---|
| `Order.money` completo | Nenhum novo lançamento de venda | KPI comercial existente da Parte E: bruto, desconto e total após desconto; valor de pedido não é caixa |
| Declaração autorizada de recebimento manual | `PAYMENT_CONFIRMED` | Valor positivo, moeda igual à Order, Order não cancelada, saldo acumulado não supera `totalMinor`; somado como recebimento declarado |
| Estorno manual autorizado | `REFUND` | Referencia pagamento do mesmo pedido/moeda; valor positivo; estornos acumulados limitados ao pagamento original |
| Correção manual autorizada | `ADJUSTMENT` | Valor assinado não nulo, evento de origem do mesmo pedido/moeda e motivo obrigatório; separado do recebimento |
| `Earning` canônico | Sem liquidação presumida | Base do devido conforme cálculo existente; não é pagamento |
| Declaração autorizada de pagamento de repasse | `PAYOUT_SETTLED` | Referencia Earning canônico; pagamentos parciais aceitos até seu valor; é declaração, não confirmação bancária |
| Entrega, cancelamento, devolução ou reentrega | Nenhum recebimento implícito | Estado logístico nunca liquida pagamento; reentrega não cria evento financeiro |

Valores de evento usam centavos inteiros (ou unidade mínima segundo escala ISO da moeda). Transações bloqueiam Order/Earning; chaves de evento/idempotência usam advisory lock. Estornos também usam lock por pagamento original. Filtros de leitura usam timestamp UTC `occurred_at`, além de empresa, pedido, Earning e tipo. O agregado de Relatórios usa data local do evento no fuso da empresa; faturamento registrado segue `Order.createdAt`/competência operacional já documentada na Parte E.

A implementação serializa por linha/lock no PostgreSQL. O fixture E2E compartilha uma única conexão transacional via savepoints; o harness foi corrigido para serializar o acesso à conexão. Assim, sobreposição de requisições e readback foram testados, mas uma corrida real com conexões PostgreSQL independentes ainda precisa de fixture dedicado.

## Persistência, API e interface

- IndexedDB schema v7 adiciona `financialEvents` e `financeOutbox`. A fila local conserva a declaração criada offline, mas ela só entra no razão e nos indicadores depois da confirmação HTTP do servidor.
- Falhas de rede/servidor e HTTP 429 mantêm a operação pendente e agendam retry após 5 s; 4xx de regra/validação são preservados como rejeitados para revisão.
- `POST /api/finance/events`: autenticação por sessão, CSRF, origin, MFA/RBAC, validação estrita e transação tenant-scoped. Respostas repetidas idênticas retornam o mesmo fato; payload divergente com chave repetida é conflito. Rejeições 4xx são preservadas como rejeitadas; 5xx/rede continuam pendentes para retry.
- `GET /api/finance/events`: leitura autorizada e tenant-scoped, filtros ISO UTC, no-store e limite explícito de 500. A cobertura informa truncamento; a lista de eventos manuais não afirma cobertura externa completa.
- Relatórios V2 consome somente eventos do servidor da empresa ativa. Mostra recebimentos confirmados como declarações manuais, estornos, ajustes e liquidações de repasse quando presentes. Quando nenhum razão foi carregado, descreve esse estado e não presume zero. Bruto, descontos, recebimentos e logística ficam separados.
- A interface possui formulário para declaração de recebimento manual no detalhe do pedido. A API suporta estorno, ajuste e liquidação parcial de Earning; ainda não há formulários de interface para estes três comandos na Parte F.

## Migrations

1. `0052_financial_ledger`: permissões, tabela, RLS forçada, trigger imutável, índices e grants mínimos.
2. `0053_financial_event_time_independence`: remove o `CHECK` que comparava horário do evento com relógio do banco. Os dois timestamps permanecem registrados. O primeiro E2E mostrou que relógios independentes podem tornar essa comparação inválida.
3. `0054_adjustment_event_reference`: permite referência obrigatória em `ADJUSTMENT`; o primeiro E2E encontrou uma condição de CHECK herdada que contradizia a semântica do ajuste.

Aplicadas somente ao PostgreSQL `rotamoto_e2e` isolado. O comando E2E restringe rollback; `0052.down` ainda exige ledger vazio por segurança. Scripts down de `0053`/`0054` estão versionados, mas rollback não foi executado. Nenhuma migration foi aplicada no banco oficial.

## Testes e resultados

- `npm test`: PASS, suíte Restaurante completa; inclui analytics/view, schema IndexedDB, guards de migração, segurança e paridade de contrato entre aplicativos.
- `tests/test-domain-sync-postgres.js` em `rotamoto_e2e`: PASS autenticado via HTTP. Exercita pagamento parcial/múltiplo, replay idempotente, conflito de idempotência, overflow/moeda inválida, sessão inválida, falta de permissão, CSRF, sobreposição de chamadas pelo adaptador single-client, excesso do saldo, estorno parcial/duplicado/excessivo, ajuste, isolamento por empresa e liquidações parciais/excessivas de Earning.
- Expectativa independente no E2E: `Order.money` de R$ 105,00 após R$ 10,00 de desconto; serviço rejeita valores recebidos acima do total. Eventos financeiros readback conferem os tipos/valores esperados. Fixture encerrou com `databaseCommitted=false`, cleanup `COMPLETED`, resíduos zero.
- Migrations: `up --e2e` aplicou 0052–0054; status do banco isolado confirma a cadeia. Guardas estáticos e `git diff --check`: PASS. Corrida PostgreSQL multi-connection: BLOCKED pelo fixture single-client; não declarada como PASS.
- Chromium/CDP no shell servido, sem sessão: 390×844, 768×1024 e 1440×900 sem overflow; sem exceções JavaScript ou HTTP inesperado. `GET /api/identity/session` respondeu 401 esperado. A tela financeira autenticada não foi exercitada pelo navegador; testes de renderer e de integração cobrem seus contratos, sem equivaler a QA browser autenticado.
- A API do aplicativo iniciada localmente não subiu porque a configuração runtime de teste do servidor estava incompleta. O E2E HTTP autenticado usa os handlers da API e PostgreSQL reais em processo de teste.
- Não foi possível comprovar callbacks externos, cobertura completa de meios de pagamento, API em servidor operante configurado, offline/retry de falha API no navegador autenticado, cancelamento/estorno posterior por política externa, nem visualização de liquidação na produção.

## Reconciliação oficial posterior

BLOCKED até acesso autorizado de `rotamoto_auditor`. Depois da liberação, executar somente leitura e registrar consultas/resultado: (1) `rotamoto.schema_migrations` para checksums 0052–0054; (2) contagens/somas por empresa/moeda/tipo em `financial_events`; (3) vínculos de Order/Earning/evento relacionado na mesma empresa; (4) comparação de pagamentos menos estornos contra `Order.money.components.totalMinor`; (5) repasses liquidados contra `Earning.amountMinor`; (6) duplicidade de `event_id`/`idempotency_key` e divergências. Nenhuma dessas consultas foi executada no banco `rotamoto` nesta parte.

## Gates e promoção

- Migrações/razão no E2E: PASS.
- Persistência autenticada, RBAC, transação, idempotência e tenant isolation: PASS nos casos exercitados; corrida real multi-connection pendente.
- Integração de pagamento externa, cobertura total, liquidação bancária independente e UI de estorno/ajuste/repasse: BLOCKED/PARTIAL por ausência de fonte/fluxo comprovável.
- PostgreSQL oficial, promoção e reconciliação oficial: BLOCKED pela credencial indisponível `rotamoto_auditor`; não redefinir nem substituir.
- Browser financeiro autenticado: BLOCKED por ausência de sessão autorizada. Aprovação visual/G14 permanece **FAIL**.
- Resultado da Parte F: **PARTIAL**. Campanha 0304 aberta; 0305 não iniciada.

Promoção futura exige revisão do diff e migrações, acesso auditor autorizado, aprovação da promoção por gate próprio, backup/rollback documentado, janela e operador autorizados, migração oficial separadamente aprovada, reconciliação oficial pós-migração, testes autenticados em produção e evidências. Nenhuma dessas etapas foi iniciada.

## Commits

Restaurante: `45bcd9d9a2d449c38af015529982c9bb19d3a57b` (`feat(0304): add canonical finance event ledger`), local na branch `codex/campaign-0304-visual-consolidated`. Motoboy não foi alterado. Este registro será publicado apenas por fast-forward seguro.
