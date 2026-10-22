# Campanha 0291 — matriz funcional (execução parcial)

Browser Chromium/CDP autenticado por cookie HttpOnly emitido pelo fixture, sessão verificada com MFA e permissões de Company. Runner adaptado em `/data/data/com.termux/files/usr/tmp/campaign-0291-repro.cjs`, baseado no runner funcional de logística 0275. Banco `rotamoto_e2e`; fixture `7b51c964-7517-40fa-900c-22175dffaa3a`; `databaseCommitted=false`, cleanup `COMPLETED`, resíduos tenant-scoped zero. Nenhum registro foi persistido fora da transação de fixture.

| Seção | Campo/ação exercitada | Mecanismo esperado | Defeito reproduzido / causa raiz | Correção nesta campanha | Browser / readback / reload | Nova sessão | Estado |
|---|---|---|---|---|---|---|---|
| Empresa / Configurações | Endereço operacional sintético; coordenadas confirmadas pelo operador | PUT Company com revisão, ACK + GET canônico | Não reproduzido no subset | Nenhuma alteração | HTTP 200, revisão 1, ACK + GET; DOM mostra endereço e coordenadas da fixture; sem coordenadas inventadas | Não executada | PASS no subset |
| Logística | Origem/retorno customizados | Submit explícito, revisão, GET/readback e retry | Readback 503 injetado; rascunho preservado e nenhum sucesso falso. Causa do 503 foi injeção controlada do runner | Nenhuma alteração de produto; retry do fluxo existente comprovado | Retry/readback revisão 2 e reload mantiveram valores | Não executada | PASS no subset |
| Frota | Perfil econômico e política de custo | PUT/ACK + GET/readback | Readback 503 injetado; rascunho preservado, sem falso sucesso | Nenhuma alteração de produto; retry/readback comprovado | Configuração confirmada e após reload `R$ 5,50`, política `prefer_internal` | Não executada | PASS no subset |
| Ajustes gerais — aparência, relatórios, eventos, navegação, impressão, pedidos e integração | Campos editáveis das categorias restantes | Autosave local e/ou ação própria conforme matriz 0290 | Não exercitados nesta corrida | Nenhuma | Sem resultado | Não executada | BLOCKED — fora do runner executado |
| Empresa — nome/telefone e fuso | Campos de publicação explícita | PUT revisionado + GET/readback | Não exercitados nesta corrida | Nenhuma | Sem resultado; testes unitários/npm não substituem Browser | Não executada | BLOCKED — fora do runner executado |
| Empresa → Motoboy | Company snapshot, endereço e coordenadas `null` | Sync/pull e projeção read-only | Não exercitado em nova sessão Motoboy | Nenhuma | Runner observou sync Restaurante, mas não abriu/app Motoboy para comparação | Não executada | BLOCKED |

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
