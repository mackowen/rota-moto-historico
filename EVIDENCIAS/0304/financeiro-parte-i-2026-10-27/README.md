# Campanha 0304 — Parte I: E2E financeiro autenticado

Data: 2026-10-27 (UTC)

Base Restaurante: `7b3ea730b792050edf22bf79840988bade260fa2`.

## Diagnóstico do timeout

O harness aguardava `[data-detail="…"]`, seletor da tela anterior. A lista atual de Pedidos V2 expõe `[data-orders-open="…"]`; o pedido sintético estava persistido e sincronizado. Logo, a espera indefinida era falha do seletor/harness, não falha da interface nem da API. A execução posterior abriu o pedido e completou o fluxo autenticado.

O teste também reutilizava o ID do Order financeiro como Order relacionado a uma Delivery de devolução cancelada. A reconciliação logística alterava a projeção visual desse pedido. O fixture agora usa um Order separado e verifica que o Order financeiro permanece `CREATED`. Por fim, o campo manual aceita reais: enviar `1000` representava R$ 1.000,00, excedendo o saldo; o teste foi corrigido para R$ 10,00 (1.000 centavos). O código de produção, razão financeira, `Order.money`, RLS, MFA, RBAC e sincronização não foram alterados.

## Fluxo autenticado no navegador

Executado em Chromium/CDP com usuário e empresa sintéticos, API local e PostgreSQL isolado `rotamoto_e2e`:

- Login, bootstrap local-first, push/pull e localização do pedido sintético.
- Confirmação cancelada preservou o formulário; referência duplicada recebeu HTTP 409 e erro visível sem perder dados.
- Recebimento manual declarado de R$ 10,00, estorno parcial de R$ 1,00, ajuste compensatório de -R$ 1,00 e liquidação parcial de R$ 5,00.
- Falha de rede simulada manteve o evento pendente na outbox local; após reconexão, o evento foi aceito pelo servidor e reconciliado. O esperado `loadingFailed` foi classificado como bloqueio de rede do CDP.
- Sessão inválida retornou à tela de login; HTTP 401 de sessão foi esperado. Erros de navegador inesperados: zero.
- Leitura de volta autenticada do PostgreSQL confirmou referências de recebimento, estorno, ajuste, recebimento após recuperação de rede e liquidação contra o Earning canônico. Cleanup removeu todos os fixtures; resíduos: zero.
- API validou autorização/RBAC, CSRF, MFA/sessão, tenant isolation, idempotência, estados, conflitos e retries no mesmo E2E.

Resultado do relatório Executivo: bruto de pedido registrado R$ 115,00 (composição comercial), pagamentos declarados confirmados no razão R$ 100,00, estornos R$ 16,00, líquido após estornos R$ 84,00 e ajustes -R$ 2,00 separados. O relatório operacional distinguiu bruto, desconto, total após desconto, pagamento, estorno, ajuste e repasse; cobertura manteve explícito um pedido sem composição completa. A seleção de um único dia foi aplicada. Exportação CSV continha os eventos confirmados em centavos (incluindo recebimento, estorno e ajuste). Nenhum estado de entrega foi tratado como pagamento.

O teste passou em 320, 390, 430, 768, 980 e 1440 px nos temas claro e escuro para o relatório, sem overflow horizontal; modais financeiros permaneceram dentro do viewport e sem overflow interno. O foco entrou no diálogo e Tab permaneceu nele. Durante a medição do modal, o conteúdo da lista de pedidos sob o overlay ultrapassou o viewport em celular estreito (quick filters da Orders V2), embora o modal cobrisse esse conteúdo e coubesse. É uma limitação responsiva preexistente da tela subjacente; registrada sem alterar escopo/layout aprovado. Capturas do Operacional em 390/1440 e claro/escuro estão nesta pasta.

## Prova independente de concorrência

`tests/test-finance-concurrency-postgres.js` executado contra `rotamoto_e2e` usando dois PIDs/conexões independentes. Corridas de recebimentos por referência, excesso de pagamento, estorno, repasse, retry do mesmo identificador e ajustes: 7 lançamentos coerentes, conflitos/rejeições esperados e cleanup concluído com zero resíduos.

## Comandos e resultados

- E2E autenticado HTTP + navegador + PostgreSQL: PASS; saída `PostgreSQL canonical domain and sync API tests: OK`, `cleanup: COMPLETED`, zero resíduos.
- Concorrência PostgreSQL, duas conexões: PASS; `cleanup: COMPLETED`, zero resíduos.
- `npm test`: PASS, exit 0.
- `node --check tests/test-domain-sync-postgres.js`, `git diff --check`: PASS.
- Chrome Android físico: BLOCKED (não verificado neste ambiente).
- PostgreSQL oficial `rotamoto`: não acessado nem alterado. Migrations 0052–0055 não promovidas. Auditoria oficial permanece BLOCKED sem `rotamoto_auditor`.
- Aprovação visual do proprietário G14: FAIL/pending, conforme gate obrigatório; capturas não equivalem a aprovação.

## Commits

- Restaurante local: `4fcb095bae2f7f2803668207a488ccae391d20a6`.
- Histórico (fast-forward publicado): `81ffa64000c53c7a16249a2ceef63d278e839743`.
- Motoboy: sem alteração; browser-tests permaneceu com estado preexistente preservado.

## Capturas

- `operacional-390-light.png`
- `operacional-390-dark.png`
- `operacional-1440-light.png`
- `operacional-1440-dark.png`
