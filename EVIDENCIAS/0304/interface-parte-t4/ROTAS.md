# Rotas — T4-11/T4-12

**Estado: PARTIAL; sem nova alteração de Rotas.**

A Parte T.2 já identificou o renderer real e registrou os controles visíveis: quatro filtros de camadas (Todos, Entregas, Motoboys, Rotas) e `Ajustar`, que enquadra/ajusta a visualização. Esses controles não são comprovadamente os cinco filtros avançados mencionados no relato. Não foi encontrado motivo para criar um modal novo sem validação da interface autenticada.

Os testes de contrato de cartografia e ciclo de vida do mapa passaram na suíte completa. A auditoria T.4 não teve sessão autenticada nem corrida operacional disponível para comparar filtro, lista, mapa e detalhes em dados reais. A borda fantasma e o painel/modal relatados não foram reproduzidos no renderer estático já registrado em T.2; permanecem pendentes de confirmação visual do proprietário.

Nenhuma rota/corrida fictícia foi criada. Não houve alteração de dados, regra de negócio, mapa ou schema. Consulte também [BROWSER-QA.md](BROWSER-QA.md) e [PENDENCIAS.md](PENDENCIAS.md).
