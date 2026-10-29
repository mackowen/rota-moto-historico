# Parte T.7 — Super ADM Global

**Resultado: PARTIAL.** A correção de contrato, estados assíncronos, navegação e compactação foi implementada no Restaurante. O código da empresa informado anteriormente já estava no contexto e não foi solicitado novamente nem usado em evidência.

O defeito determinístico de Usuários/Vínculos foi corrigido: o carregador aplicava o presenter de Empresas a todas as listas antes de ramificar por seção. A interface agora valida cada DTO conforme seu endpoint. Requisições administrativas têm timeout operacional de 20 s com abort real e mensagem recuperável. A seção Perfis contém seletor de empresas intencional para escolher o contexto dos perfis; esse conteúdo não é resíduo de outra seção.

- T7-01: PASS técnico; teste de timeout/abort/cancelamento e regressão completa.
- T7-02: PARTIAL; DTO/HTTP sintéticos válidos e correção aplicada. Endpoints E2E reais retornaram 401 sem sessão autorizada.
- T7-03: PASS técnico; resultados são limpos e respostas obsoletas descartadas; seletor de empresa em Perfis é conteúdo auxiliar intencional.
- T7-04: PASS técnico em código e harness.
- T7-05: PASS sintético em 320/390 px; navegação nativa por botões, hint móvel e scroll da opção ativa.
- T7-06: PASS sintético; espaçamentos compactados.
- T7-07: PARTIAL; padrões técnicos foram rebaixados visualmente e contextualizados como origem não confirmada; a origem real exige sessão.
- T7-08: PASS sintético; cartões e políticas compactados sem reduzir os checkboxes.

QA autenticado permanece BLOCKED. G14 FAIL, Campanha 0304 aberta e 0305 não iniciada. Banco oficial não acessado.
