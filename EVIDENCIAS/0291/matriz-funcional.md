# Campanha 0291 — matriz funcional (execução parcial)

Browser Chromium/CDP autenticado por cookie HttpOnly emitido pelo fixture, sessão verificada com MFA e permissões de Company. Runner adaptado em `/data/data/com.termux/files/usr/tmp/campaign-0291-repro.cjs`, baseado no runner funcional de logística 0275. Banco `rotamoto_e2e`; fixture `7b51c964-7517-40fa-900c-22175dffaa3a`; `databaseCommitted=false`, cleanup `COMPLETED`, resíduos tenant-scoped zero. Nenhum registro foi persistido fora da transação de fixture.

| Seção | Campo/ação exercitada | Mecanismo esperado | Defeito reproduzido / causa raiz | Correção nesta campanha | Browser / readback / reload | Nova sessão | Estado |
|---|---|---|---|---|---|---|---|
| Empresa / Configurações | Endereço operacional sintético; coordenadas confirmadas pelo operador | PUT Company com revisão, ACK + GET canônico | A fixture publicou a Company via helper E2E (não pelo botão da UI); UI apenas leu/renderizou a projeção | Nenhuma alteração | HTTP 200, revisão 1, ACK + GET via fixture; DOM de Logística mostra endereço/coordenadas sintéticos | Não executada | PARTIAL — leitura/projeção confirmada; formulário não testado |
| Logística | Origem/retorno customizados | Submit explícito, revisão, GET/readback e retry | Readback 503 injetado; rascunho preservado e nenhum sucesso falso. Causa do 503 foi injeção controlada do runner | Nenhuma alteração de produto; retry do fluxo existente comprovado | Retry/readback revisão 2 e reload mantiveram valores | Não executada | PASS no subset |
| Frota | Perfil econômico e política de custo | PUT/ACK + GET/readback | Readback 503 injetado; rascunho preservado, sem falso sucesso | Nenhuma alteração de produto; retry/readback comprovado | Configuração confirmada e após reload `R$ 5,50`, política `prefer_internal` | Não executada | PASS no subset |
| Ajustes gerais — aparência, relatórios, eventos, navegação, impressão, pedidos e integração | Campos editáveis das categorias restantes | Autosave local e/ou ação própria conforme matriz 0290 | Não exercitados nesta corrida | Nenhuma | Sem resultado | Não executada | BLOCKED — fora do runner executado |
| Empresa — nome/telefone e fuso | Campos de publicação explícita | PUT revisionado + GET/readback | Não exercitados nesta corrida | Nenhuma | Sem resultado; testes unitários/npm não substituem Browser | Não executada | BLOCKED — fora do runner executado |
| Empresa → Motoboy | Company snapshot, endereço e coordenadas `null` | Sync/pull e projeção read-only | Não exercitado em nova sessão Motoboy | Nenhuma | Runner observou sync Restaurante, mas não abriu/app Motoboy para comparação | Não executada | BLOCKED |

## Campos individuais não exercitados

As linhas abaixo vêm da matriz estática 0290. Cada controle é listado individualmente para evitar aprovação por agrupamento. **BLOCKED** significa “não percorrido pelo Browser 0291”, não defeito confirmado nem capacidade inexistente.

| Seção | Campo | Mecanismo listado em 0290 | Browser / reload / nova sessão / canônico | Estado 0291 |
|---|---|---|---|---|
| Empresa | Nome | Botão publicar perfil → PUT revisionado + GET/readback | UI não exercitada; sem reload/sessão | BLOCKED |
| Empresa | Telefone de suporte | Botão publicar perfil → PUT revisionado + GET/readback | UI não exercitada; sem reload/sessão | BLOCKED |
| Empresa | Endereço operacional | Botão Salvar configurações gerais → PUT + GET/readback | API de fixture publicou; Browser somente leu projeção em Logística. Formulário/salvar UI não testado | BLOCKED |
| Empresa | Latitude/longitude | Ação Confirmar localização → PUT + GET/readback | Coordenadas foram seedadas via fixture, não confirmadas pela UI; `null` não exercitado | BLOCKED |
| Empresa | Fuso horário | Botão Salvar fuso → PUT `expectedVersion` + GET/readback | API/unit tests prévios existem; UI 0291 não exercitada | BLOCKED |
| Operação / taxas | Modelo de taxa | Autosave IndexedDB serializado + readback | Não exercitado | BLOCKED |
| Operação / taxas | Taxa mínima | Autosave IndexedDB serializado + readback | Não exercitado | BLOCKED |
| Operação / taxas | Valor por km | Autosave IndexedDB serializado + readback | Não exercitado | BLOCKED |
| Operação / taxas | Taxa fixa | Autosave IndexedDB serializado + readback | Não exercitado | BLOCKED |
| Operação / taxas | Arredondamento e incremento | Autosave IndexedDB serializado + readback | Não exercitado | BLOCKED |
| Operação / taxas | Faixas de distância (limites/valores) | Ações de adicionar/excluir e autosave IndexedDB | Não exercitado | BLOCKED |
| Operação / repasse | Modo de repasse | Autosave IndexedDB serializado + readback | Não exercitado | BLOCKED |
| Operação / repasse | Percentual do motoboy | Autosave IndexedDB serializado + readback | Não exercitado | BLOCKED |
| Operação / rotas | Política de agrupamento Company | Publicação por alteração, revisão, ACK/readback | Não exercitado | BLOCKED |
| Operação / rotas | Organização da rota | Autosave IndexedDB serializado + readback | Não exercitado | BLOCKED |
| Operação / rotas | Alternância manual | Autosave IndexedDB serializado + readback | Não exercitado | BLOCKED |
| Impressão | Impressão habilitada | Autosave IndexedDB | Não exercitado | BLOCKED |
| Impressão | Modo de impressão | Autosave IndexedDB | Não exercitado | BLOCKED |
| Impressão | QR da comanda | Autosave IndexedDB | Não exercitado | BLOCKED |
| Impressão | Testar comanda / imprimir pedido | Ação imediata do navegador | Não exercitado; não requer Salvar | BLOCKED |
| Pedidos / origens | Nome de origem | Autosave IndexedDB | Não exercitado | BLOCKED |
| Pedidos / origens | Origem ativa | Autosave IndexedDB | Não exercitado | BLOCKED |
| Pedidos / origens | IDs/mapeamento de estados | Autosave IndexedDB | Não exercitado | BLOCKED |
| Integrações | Preferências iFood | Autosave local; conexão/sync são ações próprias | Não exercitado | BLOCKED |
| Integrações | Preferências 99 Food | Autosave local; conexão/sync são ações próprias | Não exercitado | BLOCKED |
| Integrações | Preferências Keeta | Autosave local; conexão/sync são ações próprias | Não exercitado | BLOCKED |
| Aparência | Tema | Autosave IndexedDB e botão confirmação existente | Não exercitado | BLOCKED |
| Aparência | Cor de destaque | Autosave IndexedDB e botão confirmação existente | Não exercitado | BLOCKED |
| Aparência | Idioma | Autosave IndexedDB e botão confirmação existente | Não exercitado | BLOCKED |
| Relatórios | Período padrão | Autosave IndexedDB | Não exercitado | BLOCKED |
| Relatórios | Gráficos padrão | Autosave IndexedDB | Não exercitado | BLOCKED |
| Navegação | Cada atalho disponível | Autosave IndexedDB | Não exercitado | BLOCKED |
| Eventos | Eventos de sucesso | Autosave IndexedDB | Não exercitado | BLOCKED |
| Eventos | Eventos automáticos | Autosave IndexedDB | Não exercitado | BLOCKED |
| Eventos | Eventos de erro | Autosave IndexedDB | Não exercitado | BLOCKED |
| Segurança local | Retenção de logs | Autosave IndexedDB; não altera retenção server-side | Não exercitado | BLOCKED |
| Segurança local | Histórico por cliente/endereço | Autosave IndexedDB | Não exercitado | BLOCKED |
| Backup servidor | Frequência | Submit `/admin/backup` + leitura posterior | Não exercitado | BLOCKED |
| Backup servidor | Hora | Submit `/admin/backup` + leitura posterior | Não exercitado | BLOCKED |
| Backup servidor | Retenção | Submit `/admin/backup` + leitura posterior | Não exercitado | BLOCKED |
| Backup servidor | Destino | Submit `/admin/backup` + leitura posterior | Não exercitado | BLOCKED |
| Backup servidor | Metas/quotas | Submit `/admin/backup` + leitura posterior | Não exercitado | BLOCKED |
| Equipe | Usuários/convites | APIs de identidade/Company, permissões e MFA conforme ação | Não exercitado | BLOCKED |
| Equipe | Perfis empresariais | API Company com permissão específica | Não exercitado | BLOCKED |
| Dados locais | Exportar/importar/apagar | Ações imediatas com confirmação/preview | Não exercitado; não requer Salvar | BLOCKED |

## Browser e falhas cobertas

- Viewports 360, 390 e 768 px, claro/escuro: zero overflow horizontal.
- Sessão sintética MFA verificada; chamadas de configuração do subset retornaram 200; sem exceções JavaScript e sem HTTP 5xx inesperado.
- Negativos da API de Logística: coordenadas inválidas 400; override de tenant 400; permissão insuficiente 403; sem sessão 401; revisão concorrente obsoleta 409.
- Injeção de falha 503 em readback Route e analytics: draft preservado e retry exercitado.
- A campanha não executou HTTP 500, timeout, resposta incompleta, ACK perdido, clique duplo, reload durante salvamento, nova sessão independente, readback divergente ou permissão insuficiente pela UI. Esses cenários permanecem pendentes.

## Arquivos

- [Relatório sanitizado do Browser](logistics-browser-report.json)
- [Screenshot pós-salvamento em 390 px](logistics-fleet-saved-390.png)
- `npm test` Restaurante completo: exit 0 nesta branch; relatório de execução no registro 0291.

Este resultado é limitado aos formulários Logística/Frota/localização explicitamente percorridos. Não prova RM-AUD19-02/10 global nem consistência visual da Company no Motoboy.
