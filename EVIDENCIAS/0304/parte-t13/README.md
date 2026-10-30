# Campanha 0304 — Parte T.13

**Resultado: PARTIAL, com correção implementada.** O código Motoboy tinha um intervalo entre os breakpoints móvel e desktop: a largura CSS em landscape (844–915 px) já escapava de `max-width:760px`, mas a altura (390–412 px) não ativava o layout desktop de altura fixa (`min-height:520px`). Nessa combinação o cabeçalho ficava no modo `position:sticky`, embora a página ainda usasse o fluxo/rolagem do viewport. Foi adicionada regra específica para landscape curto de 761–960 px: a topbar usa o mesmo posicionamento fixo de 56 px do celular portrait, com reserva no fluxo para a altura do cabeçalho e safe areas. Sem `vh` nem dependência da alteração da altura visual da barra do Chrome.

No Restaurante não foi reproduzido o mesmo desvio: seu CSS de tablet/celular usa `position:sticky` em toda a faixa até 1100 px. No harness com o CSS de produção, em 844×390 e 915×412, o topo medido permaneceu em `y=0` no início, depois de 1/100 px e no meio da rolagem. Nenhuma alteração foi aplicada ali para evitar uma mudança de layout sem causa comprovada. A verificação não representa uma sessão autenticada no Android; a confirmação final do relato do proprietário permanece pendente.

## Gates

| Gate | Estado | Evidência |
|---|---|---|
| T13-UI-01 — causa raiz | PASS | breakpoint mobile/desktop do Motoboy e estilo computado antes/depois descritos em [TESTES](TESTES.md) |
| T13-UI-02 — landscape horizontal | PARTIAL | Motoboy fixado e medido em CDP; topbar do Restaurante não teve deslocamento sintético, mas a confirmação do Android que originou o relato segue pendente |
| T13-UI-03 — portrait sem regressão | PASS em Chromium/CDP emulação | 390×844 continua `fixed`, 56 px; demais estilos sem mudança |
| T13-UI-04 — modais e navegação | PASS de regressão automatizada; Android real pendente | suíte completa; a regra só altera CSS do cabeçalho em landscape curto |
| T13-MOTO-01 — impacto Motoboy | PASS | causa existia no Motoboy e foi corrigida; suíte completa passou |
| T13-QA-01 — testes e browser | PARTIAL | testes automatizados e harness real Chromium PASS; sem sessão autenticada/dispositivo físico |
| T13-DEPLOY-01 — publicação E2E | PASS | 8084 serve CSS com SHA-256 idêntico ao checkout; 8083 também coincide |

As capturas e medições são de harness de componentes/CSS com conteúdo sintético, não da tela autenticada. Detalhes e pendências em [TESTES](TESTES.md), [impacto Motoboy](IMPACTO-MOTOBOY.md) e [PENDENCIAS](PENDENCIAS.md).

Commit local Motoboy: `b421acf` (`fix: pin header on short landscape screens`). Restaurante sem alterações. Nenhum push dos aplicativos.

G14 permanece **FAIL** até aprovação visual expressa do proprietário. Campanha 0304 aberta; Campanha 0305 não iniciada. Nenhum banco, migration, conta, sessão ou permissão foi alterado.
