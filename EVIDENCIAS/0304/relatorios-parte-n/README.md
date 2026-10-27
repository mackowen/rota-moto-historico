# Campanha 0304 — Parte N: relatórios logísticos e financeiros

Data: 2026-10-27. Banco oficial `rotamoto`: consultas de diagnóstico somente leitura. Nenhuma migration, alteração de dados, credencial, role, permissão ou política foi aplicada. `rotamoto_e2e` foi usado pelos testes pertinentes; as fixtures de integração foram executadas em transação revertida, com verificação de zero registros residuais da empresa sintética. Nenhum banco foi criado.

## Resultado por condição

| Condição | Diagnóstico comprovado | Estado |
|---|---|---|
| “Sem entregas logísticas registradas” / `internal_fleet` zerado | O endpoint de indicadores operacionais agrega histórico PostgreSQL por empresa e ignora os filtros de período/status/origem exibidos no topo. A linha de integração é derivada de comandos e cotações, portanto contadores zero não demonstram ausência de entregas. O contrato não separava entregas canônicas, concluídas, entregas sem alocação e pedidos sem entrega. Foi adicionado `coverage` explícito; a interface agora diz “Sem alocações logísticas registradas”, mostra a cobertura e identifica “Frota própria”, preservando o código interno. Dados oficiais por empresa não puderam ser lidos pelo papel auditor disponível; não é possível concluir se a ausência atual é legítima ou se há atraso de sincronização. | **PARCIAL** — correção de código/contrato testada; estado de dados da empresa pendente de sessão/consulta autorizada. |
| “Acesso aos registros financeiros indisponível” | O frontend podia encerrar a consulta antes de qualquer HTTP quando a sessão não informasse `finance.read`; estados client-side, `403 FORBIDDEN` e `MFA_REQUIRED` eram agrupados. A tentativa autorizada de login no E2E recebeu HTTP 403 `MFA_REQUIRED`; nenhum endpoint financeiro foi chamado nessa sessão. Não se alterou MFA, RBAC ou RLS. | **PARCIAL / BLOCKED** — rótulos e diagnósticos foram separados e testados; causa efetiva da conta/role real permanece bloqueada por autenticação MFA. |
| “0 de 1” pedidos com composição monetária completa | O cálculo exige `Order.money` canônico válido: seis componentes em unidades menores, total consistente, moeda ISO e proveniência reconhecida. Valores legados isolados (`amountMinor`/`value`) ou uma taxa manual parcial não provam composição comercial completa. Foi adicionado diagnóstico agregado de motivos e campos ausentes/inválidos sem preencher valores nem alterar o cálculo. O pedido real não pôde ser lido para identificar seus campos. | **PARCIAL / BLOCKED** — contrato e fixtures verificam o motivo; a composição do pedido real depende da sessão autorizada. |

## Evidências e validações

- `logistics-browser-regression.json`: Browser QA com o módulo real do Restaurante e quatro respostas controladas em memória. Cobriu histórico/sem alocação, frota própria sem expor `internal_fleet`, 403 de permissão, falha de rede e resposta inválida. Quatro requisições GET ao endpoint logístico; zero exceções JavaScript.
- `npm run test:analytics`: PASS.
- `npm run test:logistics`: PASS, incluindo teste de escopo read-only/company-scoped do novo contrato de cobertura.
- `node tests/test-order-money.js`: PASS, composição completa, parcial, moeda/proveniência inválida e limites numéricos.
- `node tests/test-visual-shell-cache.js`, `node tests/test-sw-atomic-install.js`, `node tests/test-identity-ui.js`: PASS.
- `tests/test-domain-sync-postgres.js` em `rotamoto_e2e`: PASS, incluindo RBAC, ledger, navegador com usuário sintético, filtros, exportação, estados de conexão/sessão e layouts móveis/desktop. Tudo transacional e revertido; residual zero.
- Pré-voo read-only de `rotamoto`: ledger 0001–0055 e checksums corretos; o papel auditor não tem leitura das tabelas tenant de pedidos, entregas, sessões e eventos financeiros. Não se usou papel alternativo para contornar essa restrição.
- A autenticação real E2E permanece pendente de um código MFA atual. A captura temporária que incluiu o formulário foi removida e não integra a evidência. Nenhum valor de login, chave, sessão, pedido ou evento financeiro foi publicado.

## Continuidade

API e contrato modificados localmente no branch próprio `codex/campaign-0304-relatorios-n`; nenhuma migration reaplicada. Aplicativos não publicados. G14 permanece **FAIL**, Campanha 0304 aberta, backlog desde 0257 preservado e 0305 não iniciada. A reprodução real da conta, a causa definitiva dos dados da empresa e a verificação ponta a ponta estão pendentes.

Commit local do Restaurante: `74ac072` (`codex/campaign-0304-relatorios-n`), sem push de aplicativo. A branch técnica estava limpa após o commit.

Revisão final acrescentou a mensagem específica de falha de conexão financeira (`NETWORK_ERROR`), distinta de offline, `403` e `MFA_REQUIRED`, com teste de ciclo de erro/retry. A suíte Browser + PostgreSQL em `rotamoto_e2e` foi repetida após essa mudança e passou com rollback/residual zero. Commits locais do Restaurante: `74ac072` e `af29d21`; sem publicação de aplicativo.
