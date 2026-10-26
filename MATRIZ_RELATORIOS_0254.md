# Matriz funcional — Relatórios 0254

| Funcionalidade | Fonte/cálculo | Aplicativo/UI | Autorização | Persistência | Situação/teste |
|---|---|---|---|---|---|
| Visão operacional e pedidos | `RotaMotoAnalytics.aggregate` em `analytics.js` | Restaurante, seção 1/2 | Sessão e permissões atuais de relatórios | IndexedDB local; confirmação remota não inferida | Funcional; fixture Browser autenticada e teste unitário. |
| Desempenho e etapas | Agregação canônica de pedidos/entregas | Restaurante, seção 2 | Igual às permissões existentes | Dados agregados sem escrita | Funcional; amostra e estado vazio. |
| Motoboys e capacidade | Snapshot e serviço canônico de logística | Restaurante, seção 3 | Endpoint de relatório autenticado/tenant-scoped | PostgreSQL E2E lido via serviço | Funcional; resposta HTTP real e vazio honesto. |
| Custos, frota própria/externo e repasses | `logistics/intelligence/analytics` sem recálculo no renderer | Restaurante, seção 4 | Endpoint existente | Valores com moeda/cobertura canônicas | Funcional; resposta HTTP 200 e estado vazio. |
| Recomendações, ETA e decisão | Serviço canônico `decision-quality` | Restaurante, seção 5/6 | Endpoint existente | Snapshots e coberturas do serviço | Funcional; teste de serviço/HTTP e UI autenticada. |
| Origem/retorno de rotas | `logistics/route-settings` | Restaurante, seção 5 | Leitura autenticada | PostgreSQL, read-only nesta campanha | Funcional; HTTP 200. |
| Cobertura territorial e regiões | Serviço de analytics territorial | Restaurante, seção 7 | Tenant-scoped, somente IDs canônicos | PostgreSQL E2E; sem mutação | Funcional; HTTP 200; entrega local sem ID canônico não requisitada. |
| Filtros e navegação | Período e seletores existentes preservados | Restaurante, navegação de seções | UI autenticada | Estado de interface | Exercitados no Chromium em viewport 390. |
| Exportação CSV | Relatório agregado canônico e serializer existente | Restaurante, seção 8 | Sessão/permissão existente | Download local | Browser confirmou cabeçalhos/linha; tratamento de falha e revogação URL testados em código. |
| Apresentação responsiva | Dados das fontes acima, sem agregações novas | Restaurante, oito seções | Não altera autorização | Sem persistência extra | 360/390/768/1024/1440, claro/escuro; sample/empty; sem overflow. |

## Limite de evidência

O Browser usou sessão sintética autenticada com MFA confirmado e fixture transacional E2E com rollback. Handlers HTTP reais de relatórios consultaram PostgreSQL E2E; durante essa captura a instância runit foi suspensa e restaurada em seguida. Não foram inseridos dados logísticos persistentes para fabricar gráficos. Ver [REGISTRO 0254](REGISTROS/0254.md) para comandos, gates e commits.

## Atualização Relatórios V2 — 0304, 2026-10-26

| Item V2 | Fonte/semântica | Estado da implementação | Evidência desta execução |
|---|---|---|---|
| Filtro data civil + empresa/motoboy | `Order.createdAt`, fuso IANA da empresa; ID canônico enviado ao endpoint territorial | Implementado no renderer/consulta; sem E2E com sessão real | `test-analytics`, `test-territorial-analytics`, territorial HTTP; browser real/auth BLOCKED |
| KPI Entregas | Deliveries distintos por Order no recorte; legado sem Delivery conta uma vez | Implementado; RETURN/REDELIVERY contam individualmente | Fixture 1 Order/2 Deliveries e reconciliação com as séries; PASS |
| KPI sucesso | Concluídas ÷ estados reconhecidos | Implementado; desconhecidos fora do denominador | `test-analytics`; PASS |
| KPI tempo médio | Atribuição→conclusão em concluídas com timestamps válidos | Implementado em minutos; ausentes/invertidos/futuros excluídos | `test-analytics`; PASS |
| Faturamento por dia | Sem ledger oficial de receita/ajuste/estorno encontrado | Indisponível exibido, sem inferir de total de Orders nem Earnings | Estado vazio contextual; pendência Parte 2/decisão financeira |
| Gráficos de entrega por dia/hora/status | Séries derivadas de Deliveries e coorte `Order.createdAt` | Implementados; horas exigem fuso; status soma KPI de operações | Cálculo controlado + CDP; PASS cálculo / PARTIAL E2E |
| Rankings clientes/endereço/motoboys | Dados de pedidos entregues localmente; ordenação estável; visão geral minimizada | Implementado; escopo local do usuário; serviço territorial conserva escopo tenant | Testes analytics/territorial; browser autenticado BLOCKED |
| Mapa | Serviço territorial existente, consulta somente leitura e geodados autorizados | UI ligada; sem consulta real autenticada na rodada | Territorial HTTP unitário PASS, browser integrado BLOCKED |
| Visual e viewport | Renderer/CSS reais, shell preservado; 13 viewports × 2 temas | 26 casos, 0 overflow/exceção/resposta HTTP inválida; sem pixel score/humano | Capturas e DOM em `EVIDENCIAS/0304/relatorios-v2-2026-10-26`; PARTIAL |

Limite desta atualização: ao contrário das sessões autenticadas documentadas para 0254, o browser da rodada 0304 não obteve sessão autorizada. A fixture CDP valida renderer/layout somente; não reutilizar a evidência antiga como prova dos fluxos atuais. G14 permanece FAIL.
