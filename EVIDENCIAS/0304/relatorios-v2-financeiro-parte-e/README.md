# Relatórios V2 — evidência financeira Parte E

Data: 2026-10-26. Restaurante source: `codex/campaign-0304-visual-consolidated`, início no commit Parte D `598b9cc695583703766397341b4827e5c0c80d65`.

## Definição do valor

Fonte: `Order.money` somente quando `kind=canonical_complete`, moeda ISO válida e componentes não negativos em minor units/inteiros seguros. Para cada Order não cancelada do filtro: bruto registrado = subtotal de itens + taxa de entrega + taxa de serviço + outras taxas; desconto = `discountMinor`; valor após desconto = `totalMinor`. Soma sem arredondamento, separada por moeda. Data da série: `Order.createdAt` no fuso da empresa (`America/Sao_Paulo` conforme configuração). Canceladas são excluídas dos totais e cobertas no contador de canceladas. Pedidos sem composição completa continuam no denominador e não são zerados. IDs únicos de Order evitam multiplicação por reentrega/devolução.

Isso não é caixa recebido, receita liquidada ou contas a receber. `Order.payments` não tem contrato/estado canônico validado; `Earning` informa repasse devido, não pago; não foi encontrada razão de estornos/ajustes nem custo real completo de logística. Estes campos ficam explicitamente indisponíveis. Não foram adicionados API, migration ou livro financeiro paralelo.

## Renderer e medições

Renderer usa `analytics.js` e `analytics-view.js` reais no Chromium/CDP, com fixture financeira isolada (sem usuário, API ou banco). Fixture controlada: bruto R$ 168,00 de duas Orders elegíveis, descontos R$ 10,00, total após desconto R$ 158,00; uma Order cancelada excluída. Inclui devolução/reentrega ligadas a pedido existente para verificar que não duplicam o valor. O pagamento com formato não canônico não é contado como recebido.

| Viewport/tema | Bounding rect relatório | Largura documento | Overflow |
|---|---|---:|---|
| 390×844 claro | x=12, width=366 | scroll/client 390/390 | Não |
| 390×844 escuro | x=12, width=366 | scroll/client 390/390 | Não |
| 1440×900 claro | x=43,19, width=1353,63 | scroll/client 1440/1440 | Não |
| 1440×900 escuro | x=43,19, width=1353,63 | scroll/client 1440/1440 | Não |

Console/renderer errors: zero. KPI fixture exibido R$ 168,00 com nota de cobertura e distinção de recebimento. Screenshots são sintéticas e não demonstram dados de produção ou composição completa do dashboard; o caso 390 px está na categoria Financeiro, onde só existe o KPI financeiro correspondente.

Arquivos: `390x844-claro.png`, `390x844-escuro.png`, `1440x900-claro.png`, `1440x900-escuro.png`, `medicoes-dom.json`.

## Testes e gates

- `npm run test:analytics`: PASS.
- `node tests/test-order-money.js`, `node tests/test-earning-lifecycle.js`, `node tests/test-sync-contract.js`: PASS.
- `test-domain-sync-postgres.js` em `rotamoto_e2e`: PASS; compara independentemente Order.money lido via API, valida tenant isolation, replay/idempotência e cleanup (`databaseCommitted=false`, zero resíduos).
- `node --check` arquivos JS/SW alterados e `git diff --check`: PASS.
- `npm test`: PASS, exit 0; suíte completa encerrada nesta Parte E.
- PostgreSQL oficial: BLOCKED por credencial autorizada `rotamoto_auditor` indisponível. Nenhuma escrita oficial.
- Recebimentos, estornos, repasses pagos, margem logística e divulgação oficial: BLOCKED pela fonte canônica/credencial pendente.
- Resultado financeiro geral: PARTIAL; G14 continua FAIL até aprovação visual explícita.
