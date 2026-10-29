# Campanha 0304 — Parte T.9

**Resultado geral: PARTIAL.** A densidade visual e a adaptação responsiva do Super ADM foram corrigidas no código do Restaurante e verificadas com testes completos e harness Chromium isolado. A tela autenticada real e a aprovação do proprietário continuam fora do harness; G14 segue FAIL.

## Alterações

- `identity-ui.js`: cartões de empresa agora mostram nome, estado e quantidade de vínculos em um único bloco compacto; origem/nome técnico ficam em detalhe recolhível, sem alterar registros. Botões de operação e de consulta ficam agrupados. Editor de permissões apresenta cada item como linha de seleção e move a descrição para um disclosure “Descrição”; estado, checkbox, categoria, dirty state, cancelar, salvar, proteção do Proprietário e confirmação de alterações pendentes foram preservados.
- `identity-ui.css`: o bloco do Super ADM foi consolidado em torno dos tokens `--space-*`, `--control-h`, cores semânticas e raios já existentes. Foram retiradas regras repetidas do próprio bloco. A navegação usa faixa horizontal apenas em celular; tablet organiza em três colunas e desktop em seis. Todos os alvos de ação permanecem com pelo menos 44 px. O estado `[hidden]` de empresa/perfil da T.8 continua garantido.
- `tests/test-platform-admin-ui.js`: asserções agora verificam linhas de permissão, detalhe técnico recolhível, linha de vínculos, navegação por viewport e uso da escala de espaçamento.
- `index.html` e `asset-manifest.js`: referências regeneradas pelo mecanismo oficial após alteração de assets.

## Antes/depois

Antes: a quantidade de vínculos era outro card; nome técnico e explicação ocupavam espaço sempre visível; cada permissão tinha sua própria caixa com descrição repetida; a navegação estava em uma faixa expansível somente em celular e flexível em outros tamanhos.

Depois: o cabeçalho e quantidade ficam em uma unidade compacta; identificador e descrição abrem sob demanda; as permissões são agrupadas por domínio em linhas com checkbox, estado e descrição opcional; a navegação muda para grade em tablet/desktop e mantém scroll horizontal no celular.

A captura `super-admin-light-320-collapsed-synthetic.png` evidencia o estado compacto inicial. As demais capturas e medidas são harness sintético com estilos atuais servidos por 8083, não conteúdo real autenticado.

## Gates T9

| Item | Estado | Evidência |
|---|---|---|
| T9-01 — cards de empresas | PASS sintético | estrutura/estilo compactos e captura em 320 px; código preserva todos os registros e metadados |
| T9-02 — espaçamento | PASS técnico/sintético | escala de tokens e medidas por viewport em `browser-measurements.json` |
| T9-03 — permissões | PARTIAL | linhas agrupadas e descrição sob demanda; save/cancel/owner foram preservados e testes de contrato passaram, mas não foi feito salvamento autenticado real |
| T9-04 — identificação técnica | PASS sintético | nome neutro, origem não confirmada e identificador real em `<details>`; sem alteração no banco |
| T9-05 — seis seções | PASS sintético | 12 combinações viewport/tema sem overflow; nav responsiva e dica móvel |
| T9-06 — textos repetidos | PASS técnico | explicação de escopo condensada, distinção entre grants do perfil e sessão mantida |
| T9-07 — botões e ações | PASS técnico | alvos mínimos 44 px; ações existentes e confirmação personalizada mantidas; testes completos passaram |

## Limites

O Chrome Android autenticado não estava disponível para o Codex. Não foram usados cookies, tokens, senhas ou MFA; não houve alteração de empresa, perfil ou permissão. Ver pendências em [PENDENCIAS.md](PENDENCIAS.md).
