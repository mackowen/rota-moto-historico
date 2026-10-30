# Plano mestre de execução — Campanha 0304 / Parte T.15

**Esta entrega é documental. Nenhum lote foi iniciado; nenhum app, banco, serviço ou publicação foi alterado.** G14 geral FAIL; Campanha 0304 aberta; 0305 não iniciada.

> Esse parágrafo registra o estado original na Parte T.15. A execução do Lote 1 começou posteriormente, conforme as atualizações de execução ao final deste plano.

## Totais derivados

| Métrica | Total | Método |
|---|---:|---|
| Tokens identificadores únicos | 1541 | Regex documentada; 706 arquivos Markdown. Inclui IDs que não são defeitos. |
| IDs de linhas em PENDENCIAS.md | 465 | Distintos pelo primeiro campo; estado mais recente por chave. |
| Reconciliação das 465 chaves | 370 abertas individualizadas; 84 PASS/resolvido históricos; 11 aliases; 0 sem correspondência. | Todos estão no crosswalk; estado histórico não é revalidação atual. |
| IDs canônicos operacionais | 411 | 41 linhas vigentes (agregado legado excluído) + 370 IDs fonte abertos individualizados. |
| Pendências canônicas (não PASS) | 410 | PARTIAL/BLOCKED/FAIL/PENDING. PASS_SCOPE foi normalizado para PARTIAL. |
| IDs indexados com correspondência operacional | 544 | Exato/canônico/alias literal/registro individualizado. |
| Tokens sem correspondência operacional inequívoca | 997 | Cada um recebe categoria/justificativa na matriz; inclui campanhas, gates, subtestes e tokens em triagem, não contados como defeitos automaticamente. |
| Tokens em triagem sem equivalência segura | 501 | Preservados com fontes para classificação futura; não inferidos como PASS/FAIL ou defeitos separados. |
| Prioridades | P0=101, P1=229, P2=75, P3=6 | Todas as linhas operacionais; inclui PASS. |
| Estados | PENDING=93, PARTIAL=207, FAIL=0, BLOCKED=110, PASS=1 | Normalização conservadora. |
| Abertos com dependência externa identificada | 61 | Busca de marcadores literais nos campos; pode sobrepor-se a owner. |
| Abertos que exigem validação do proprietário | 27 | Marcador explícito de aparelho/aprovação em fonte. |
| IDs fonte de pendência | 465 | Todos com linha/correspondência no crosswalk: 370 individualizados abertos, 84 PASS/resolvido históricos e 11 aliases. |
| Alias literal associado a item vigente | 48 | Correspondências literais identificadas no inventário; além dos 11 IDs fonte mapeados a linhas canônicas. |
| PASS específico na matriz operacional | 1 | Evidência limitada ao critério registrado, não é aprovação global. |
| Escopos aprovados pelo proprietário | 3 | T.12, T.13 Motoboy e T.14 Restaurante, restritos ao escopo declarado. |
| IDs com PASS/resolvido histórico | 84 | Preservados no crosswalk; não revalidados nesta etapa. |




| Lote | Canônicos totais | Não PASS |
|---|---:|---:|
| 1 — Persistência, identidade e segurança | 121 | 120 |
| 2 — Operação Restaurante ↔ Motoboy | 91 | 91 |
| 3 — Corridas, QR, impressão e logística | 30 | 30 |
| 4 — Modernização visual | 55 | 55 |
| 5 — Infraestrutura e integrações | 72 | 72 |
| 6 — Homologação final | 42 | 42 |

Contagens por lote são as do `BACKLOG_CONSOLIDADO.md`/`MATRIZ_DEPENDENCIAS.md`. Dependências owner/external podem se sobrepor. Casos sem evidência atual não são convertidos em FAIL. Critério ausente em item LEGACY continua PENDING para definição antes da implementação.

## Sequência recomendada

1. **Lote 1 — Persistência, identidade e segurança.** Primeiro pela dependência de autorização, escopo tenant e readback. Esta recomendação não inicia o lote nesta parte.
2. **Lote 2 — Operação Restaurante ↔ Motoboy**, depois dos gates de identidade/autorização relevantes.
3. **Lote 3 — Corridas, QR, impressão e logística**, sobre estados canônicos e providers disponíveis; continuar fail-closed se indisponíveis.
4. **Lote 4 — Modernização visual**, por módulos e em paralelo com lotes funcionais quando não houver conflito de arquivos.
5. **Lote 5 — Infraestrutura e integrações**: inspeções de leitura podem ocorrer em paralelo; mudanças externas/DB precisam de gates próprios.
6. **Lote 6 — Homologação final**, com regressão relevante, validação do proprietário e G14.

## Aprovações confirmadas pelo proprietário

| Aprovação | Escopo PASS | Proteção |
|---|---|---|
| T.12 | Botão Voltar, remoção dos títulos duplicados, modais de convite/perfil | Regressão somente; não reabrir sem nova evidência. |
| T.13 | Topbar horizontal Motoboy | Aprovada no Chrome Android; regressão somente. |
| T.14 | Topbar horizontal Restaurante | Aprovada no Chrome Android; regressão somente. |

Três aprovações humanas limitadas, fora do backlog aberto; não encerram revisão visual global. G14 permanece FAIL.

## Regras de execução

- Trabalhar um fluxo por execução sempre que possível: implementar, testar e validar no mesmo ciclo.
- Registrar antes/depois por ID, incluindo não exercitados e bloqueados.
- Nunca inferir persistência a partir de sucesso visual; exigir readback adequado.
- Não usar testes sintéticos como evidência de conta real; não contornar MFA/RLS/CSRF.
- Não aplicar mudanças em banco oficial, privilégios ou integrations sem autorização e gate correspondentes.
- Não iniciar automaticamente qualquer lote após a T.15.

## Fontes e lacunas

Veja `BACKLOG_CONSOLIDADO.md`, `MATRIZ_RASTREABILIDADE.md`, `MATRIZ_DEPENDENCIAS.md` e `CRITERIOS_HOMOLOGACAO.md`. Os documentos fonte continuam preservados. O agregado histórico `RM-HISTORY-LEGACY-OPEN` não é contado como uma única pendência: IDs com linhas foram individualizados; intervalos sem fonte própria ficam apontados como lacuna, não recebem descrição inventada.


## Atualização de execução do Lote 1 — 2026-10-30

Triagem dos 52 itens P0 atribuídos ao lote: 25 PARTIAL, 18 BLOCKED e 9 PENDING; nenhum critério P0 foi encerrado nesta execução. A matriz inclui todos os IDs e a evidência relacionada. O teste PostgreSQL de lifecycle tinha expectativa obsoleta (`availability` em vez do DTO `records[]`); corrigido e validado por execução E2E com rollback. Isso corrige o harness, não reduz por si só um P0 funcional. Nenhuma migration foi criada/aplicada; `rotamoto_e2e` e `rotamoto` mantêm ledger/checksums em 0061. Ver [evidência Lote 1](EVIDENCIAS/0304/lote-1/README.md).


## Atualização de execução — Lote 1 Parte B (2026-10-30)

O plano documental T.15 foi seguido por execução técnica parcial. Estado atual derivado de `BACKLOG_CONSOLIDADO.md`: 411 IDs canônicos, 409 não PASS e 2 PASS de critério limitado; estados: PARTIAL=206, BLOCKED=110, PENDING=93, PASS=2, FAIL=0; prioridades totais P0=101, P1=229, P2=75, P3=6 (P0: 1 PASS, 36 PARTIAL, 49 BLOCKED, 15 PENDING). Entre os 52 P0 do Lote 1, 1 PASS, 24 PARTIAL, 18 BLOCKED e 9 PENDING; 51 continuam não PASS. O PASS é `LEGACY-0304-E2E-AUTH`, restrito a prontidão/reload/browser autenticado Home↔Rotas.

Banco descartável 0304B concluiu migrations 0063 e testes autenticados; persistentes `rotamoto` e `rotamoto_e2e` não foram escritos e continuam em 0061. Não promover 0062/0063 como se houvesse paridade. Browser QA sintético MFA nos dois aplicativos passou em escopo 390×844 claro; Android físico e demais superfícies permanecem pendentes. Lote 1 PARTIAL; Lotes 2–6 não iniciados; G14 FAIL; 0305 não iniciada. Evidências: `EVIDENCIAS/0304/lote-1-parte-b/`.

## Atualização de execução — Lote 1 Parte C (2026-10-30)

Implementada correção Motoboy para autosave concorrente de Configurações: preferência de aparência que vencia enquanto outra escrita estava ocupada agora é adiada e retomada, com draft mantido até ACK. Teste de regressão específico e `npm test`/assets passaram nos dois aplicativos. Restaurante sem alteração de produção. Browser Parte C: Company Profile Restaurante passou ACK/readback/409/reload em fixture transacional; Motoboy login/MFA e sessão/reload passaram, mas navegação para Ajustes bloqueou a persistência visual. Nenhum P0 canônico fechado; 52 totais, 1 PASS anterior e 51 não PASS. Nenhuma escrita persistente nem migration. Motoboy commits locais `80c1278` e `1fa85cd`; histórico será publicado em commit documental. G14 FAIL; Lotes 2–6 e 0305 não iniciados. Evidências: `EVIDENCIAS/0304/lote-1-parte-c/`.
