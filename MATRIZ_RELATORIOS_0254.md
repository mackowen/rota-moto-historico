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
