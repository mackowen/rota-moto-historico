# Campanha 0304 — Lote 1

**Resultado: PARTIAL.** Foram triados 52 itens P0 do Lote 1: 25 PARTIAL, 18 BLOCKED e 9 PENDING. Nenhum P0 teve seu critério integral comprovado nesta execução; os estados e quantidades do backlog não foram reduzidos.

Uma falha reproduzida no teste de ciclo PostgreSQL era uma expectativa obsoleta do DTO: o teste lia `availability`, mas o endpoint devolve `records[]`. O harness agora localiza o registro pelo Driver da fixture e continua verificando `effectiveStatus`, revisão, concorrência e persistência. A suíte de ciclo passou após a correção. Nenhum código de produção foi alterado. Commit local Restaurante: `43dd82b`; Motoboy não alterado.

Ledgers de `rotamoto_e2e` e `rotamoto` foram verificados pelo runner oficial em 0061 com checksums correspondentes. Nenhuma migration foi criada ou aplicada. O fundador E2E foi preservado: a leitura confirmou um usuário, um grant global ativo correspondente ao latch, sem sessões válidas e sem membership/empresa. Não houve alteração da identidade.

- [Matriz P0 do lote](MATRIZ-EXECUCAO.md)
- [Testes](TESTES.md)
- [Persistência](PERSISTENCIA.md)
- [Identidade e RBAC](IDENTIDADE-RBAC.md)
- [PostgreSQL](POSTGRESQL.md)
- [Browser QA](BROWSER-QA.md)
- [Pendências](PENDENCIAS.md)

G14 geral **FAIL**; Campanha 0304 aberta; Campanha 0305 não iniciada. Lotes 2–6 não iniciados.

## Gates do Lote 1

| Gate | Estado | Evidência/limite |
|---|---|---|
| G1 — integridade dos repositórios | PASS | Apps iniciaram limpos; baselines/tags existentes e intactas; mudança local isolada no teste Restaurante; Browser QA histórico preexistente não foi alterado. |
| G2 — persistência real | PARTIAL | Readback/revision e sync PostgreSQL sintético passaram; não houve readback autenticado de todas as telas/categorias em sessão nova. |
| G3 — identidade e sessão | PARTIAL | Testes PostgreSQL/HTTP de sessão e lifecycle passaram com fixtures rollback; sessão real do fundador indisponível. |
| G4 — MFA e segurança | PARTIAL | TOTP/CSRF/recuperação sintéticos e guardas passaram; nenhum acesso positivo com a sessão real do Super ADM foi executado. |
| G5 — RBAC e isolamento tenant | PARTIAL | RLS/tenant E2E e testes RBAC passaram; console global positivo com sessão MFA não foi exercitado. |
| G6 — concorrência e conflitos | PARTIAL | Revisions 409, idempotência e sessões da fixture foram validadas; conflito real de duas sessões sobre cada configuração não foi coberto. |
| G7 — integração Restaurante/Motoboy | PARTIAL | Contrato compartilhado e sync canônico passaram; jornada Browser autenticada bilateral não executada. |
| G8 — PostgreSQL/migrations | PARTIAL | Checksums de ambos os ledgers 0061 passaram; suíte de rollback foi bloqueada pelo guard para o DB persistente; sem migrations novas. |
| G9 — Browser QA autenticado | BLOCKED | Chromium isolado testou telas públicas; não havia sessão E2E ativa, e MFA não foi contornado. |
| G10 — regressão dos dois apps | PASS | `npm test` final e `assets:check` passaram nos dois repositórios. |
| G11 — rastreabilidade documental | PASS | 52 P0 do Lote 1 listados e ligados a evidências; estados anteriores preservados. |
| G12 — integridade dos dados de desenvolvimento | PASS | Founder/grant/latch preservados; lifecycle e sync rollback limparam resíduos; ambos ledgers continuaram em 0061. |

Lote 1 permanece **PARTIAL**: nenhum dos 52 critérios P0 foi completamente encerrado. Resultado detalhado por gate em [TESTES](TESTES.md) e [pendências](PENDENCIAS.md).
