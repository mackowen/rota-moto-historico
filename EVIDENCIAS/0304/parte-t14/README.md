# Campanha 0304 — Parte T.14

**Resultado técnico: PASS; validação autenticada no Android: pendente.** O deslocamento foi reproduzido no cabeçalho real gerado por `RotaMotoDashboardV2.render`, com a pilha completa de CSS de produção e shell/sidebar. A regra tablet aplicava `padding-top:22px` a `.main` também em celulares landscape de 600–1023 px; a topbar sticky começava abaixo desse espaço e o consumia ao rolar.

A correção em `design-system.css` restringe `padding-top:0` a landscape de 600–1023 px e até 520 px de altura. O grid/sidebar tablet e o `sticky` permanecem. Não foi necessário `fixed`, JavaScript nem alteração no Motoboy.

## Gates

| Gate | Estado | Evidência |
|---|---|---|
| T14-ROOT-01 | PASS | Antes: y=22 em 700×320, 844×390, 915×412; padding computed 22 px. Aos 1/10/40 px: y=21/12/0. |
| T14-UI-01 | PASS | Nos três landscapes curtos, y=0 no início, após 1/10/40/100 px, meio da página e retorno. |
| T14-UI-02 | PASS | `position:sticky; top:0`; y=0 em todos os checkpoints corrigidos. |
| T14-UI-03 | PASS | Portrait 390×844 permaneceu y=0/57 px; 768×1024, 1024×768 e 1440×900 tiveram geometria idêntica antes/depois. |
| T14-UI-04 | PARTIAL | Sidebar/navegação no harness e testes automatizados passaram; inspeção autenticada dos modais no Android não repetida. |
| T14-MOTO-01 | PASS | Sem alteração no Motoboy; HEAD `b421acf` (T.13 aprovada), testes completos/assets passaram. |
| T14-QA-01 | PARTIAL | CDP isolado, dois temas e sete viewports passaram; confirmação do Chrome Android autenticado pendente. |
| T14-DEPLOY-01 | PASS | 8083 serviu CSS com SHA-256 igual ao checkout; 8084 permaneceu 200; APIs 8787/8788 `/health` 200/live. |

G14 **FAIL** até aprovação visual expressa. Campanha 0304 aberta; 0305 não iniciada. Nenhum banco, migration, sessão, MFA, RBAC ou dado foi alterado.

Commit local do Restaurante: `01e912b` (`fix: remove landscape topbar spacer`). Motoboy permaneceu em `b421acf`; nenhum repositório de aplicativo recebeu push. O histórico é o único repositório a publicar.

Medições: [`medicoes-antes.json`](medicoes-antes.json), [`medicoes-depois.json`](medicoes-depois.json). Capturas sintéticas em [`capturas/`](capturas/). Detalhes em [TESTES](TESTES.md), [IMPACTO-MOTOBOY](IMPACTO-MOTOBOY.md), [PENDENCIAS](PENDENCIAS.md).
