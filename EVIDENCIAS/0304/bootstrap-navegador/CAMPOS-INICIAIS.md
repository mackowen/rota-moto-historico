# Campos e sugestões iniciais

Os valores abaixo são escolhas do operador; o assistente não preenche taxa, endereço, coordenadas ou telefone. Fuso e política também começam sem seleção. A configuração de preço é opcional e permanece pendente se não for explicitamente feita.

| Campo | Valor inicial | Validação | Destino canônico | Consumidor/limite |
|---|---|---|---|---|
| Nome empresarial | Obrigatório, informado pelo operador | Texto não vazio, até 160 bytes | `rotamoto.companies.name` | Identidade/tenant |
| Telefone de suporte | Opcional, vazio | Até 40 bytes; controles rejeitados | `companies.support_phone` | Contato empresarial |
| Fuso horário | Sem valor pré-selecionado; opções IANA no assistente | Validado por runtime Intl no contrato | `companies.time_zone` | Horários/cálculos empresariais |
| Agrupamento de rotas | Sem valor pré-selecionado; uma das duas opções existentes | `nearest_extension` ou `nearest_origin_round_robin` | `companies.route_grouping_policy` | Organização de rotas; não ativa distribuição automática |
| Endereço operacional | Opcional, vazio | Até 500 bytes; deve ser confirmado se informado | `companies.operational_address` | Contexto de empresa |
| Latitude/longitude | Opcional; ambos ausentes por padrão | Pares completos, limites geográficos e checkbox de confirmação | `companies.operational_latitude/longitude`, provenance/version | Localização canônica; nenhuma geolocalização presumida |
| Modelo de taxa | Não configurado por padrão | `perKm`, `range` ou `perDelivery` | `company_delivery_pricing.settings` | Cálculo compartilhado; só grava se o proprietário optar |
| Taxa mínima, por km, fixa, faixas, arredondamento, repasse | Sem valor comercial sugerido | Valores monetários até R$ 1.000.000 com precisão de centavos; faixa até 10.000 km, máximo 32 faixas; percentual 0–100; modelo ativo exige valor positivo | Mesmo objeto JSON versionado de preços | Cobrança do cliente/repasse conforme contrato; não remuneração histórica nem custo operacional |

Não são gravados neste bootstrap: horário de funcionamento, modalidades de atendimento, raio, tempo de preparo, entrega própria, distribuição automática, provedor externo de rota/mapa e integração de marketplace. São pendências de configuração posterior, sem falso estado “ativo”. A interface não inventa integração iFood/Keeta/99Food.

`deliveryPricing` é lido por `backend/admin/repository.js` e pelo projeto/sync service do Restaurante; contrato compartilhado com Motoboy é protegido por `test-cross-app-contract-parity.js`. Nesta execução, o Motoboy não teve alteração de código e não ocorreu jornada real bilateral. Não se afirma que a primeira instalação ou os valores iniciais foram persistidos nesta execução.
