# Correção visual Relatórios V2 — Parte B

**Data:** 2026-10-26. **Aplicativo:** Restaurante, branch `codex/campaign-0304-visual-consolidated`, continuação do commit Parte A `de615411372fb792f44033a17dc56fd37f616f20`. O Motoboy permaneceu limpo e não foi alterado. Nenhuma escrita/migração no PostgreSQL oficial.

## Causas e correções

- **Eixos pequenos:** o CSS antigo usava fonte `0.75rem`, computada como 10,5 px sob a escala global do painel, e o seletor responsivo ainda mirava `.report-chart-xlabel`, que o renderer já não produz. Os seletores ativos `.report-chart-xaxis` e `.report-chart-yaxis span` agora especificam 12 px. Datas/horas selecionam no máximo seis marcas uniformes; os valores e pontos da série continuam sendo os dados do analytics. Barras não ficam artificialmente largas em séries pequenas; amostras de teclado recebem foco e rótulo acessível.
- **Cartões altos:** descrições longas tinham apresentação permanente. Agora aparecem resumidas e a explicação completa permanece em disclosure acessível; cancelamentos e falhas foram agrupados sem remover as contagens. Títulos/resumos das oito seções foram compactados, mantendo detalhes técnicos/exportação.
- **Receita:** estado de fonte financeira ausente era alto porque a explicação completa ficava sempre visível. Agora é compacto com explicação sob demanda; valor segue indisponível.
- **Território:** estado inicial/erro não diferenciava com concisão ausência, limiar, rede, sessão ou permissão. O renderer agora distingue essas causas; retry aparece somente para falha recuperável. Dados agregados e cobertura completa permanecem em disclosure; o formulário manual deixou de ser a ação principal do dashboard.

## Evidências

- Capturas da fixture do renderer de produção com CSS/JS locais: diretório [`chromium/`](chromium/), 14 viewports e temas claro/escuro, oito capturas das seções técnicas e `report.json` com medidas/erros/estrutura.
- Capturas territoriais isoladas em [`territorial-states/`](territorial-states/), incluindo sem dados, amostra insuficiente, mapa agregado, acesso negado e sessão expirada; `results.json` registra retry e resposta atrasada.
- Comparação antes/depois e medidas em [`matriz-antes-depois.md`](matriz-antes-depois.md). Capturas anteriores e esboços originais estão na [evidência Parte A](../relatorios-v2-correcao-p0-2026-10-26/README.md).
- Hashes do Nginx `127.0.0.1:8083` coincidiram com `styles.css`, `analytics-view.js` e `logistics-ui.js` do worktree após as versões `0304.20`, `0254.9` e `0254.5`.

## Testes e classificação

- `npm test`: PASS integral (exit 0), após alinhar asserts do shell/cache às novas versões dos arquivos.
- `npm run test:analytics`: PASS; inclui casos de renderer 0/1/5/20, eixos, vazios e fonte financeira indisponível.
- Territory renderer/CDP isolado: 7 verificações PASS para sem dados, insuficiente, mapa agregado, proibido, sessão, retry e descarte de resposta antiga.
- Chromium/CDP de renderer: 20 verificações estruturais/de navegação, 28 combinações de 14 viewports × dois temas, sem overflow, exceção JS ou resposta HTTP de erro. Medições em [`chromium/report.json`](chromium/report.json). As capturas são fixture visual sintética e não E2E autenticado.
- `node --check` em JS modificado e `sw.js`; `git diff --check`: PASS.
- E2E autenticado, permissões/tenant em navegação real e atualização após sincronização: **BLOCKED** nesta intervenção; a infraestrutura usada foi renderer/fixture local, sem credenciais de sessão disponíveis. Chrome Android físico: **BLOCKED**; emulação Chromium/CDP não substitui dispositivo real.

## Gates desta Parte B

| Gate | Estado | Evidência/limite |
|---|---|---|
| Legibilidade e geometria dos gráficos | PASS técnico | DOM 12 px, marcas regulares e contagem de barras testada em fixtures. |
| Cartões compactos, oito seções | PASS técnico | DOM medido nos oito painéis; todas as oito continuam navegáveis. |
| Indisponibilidade financeira/territorial | PASS renderer | Estados separados, retry controlado e sem valor fabricado. |
| Responsividade técnica/themes | PASS no Chromium emulado | 28 viewport/tema, zero overflow/erro; fixture não representa dados reais. |
| Testes de regressão automatizados | PASS | `npm test` completo. |
| Acessibilidade instrumental completa | PARTIAL | Markup semântico, detalhes e barras focáveis/rótulos; não houve auditoria externa de contraste com leitor de tela. |
| E2E autenticado | BLOCKED | Sem sessão autenticada nesta rodada. |
| Chrome Android físico | BLOCKED | Captura é CDP/headless emulado. |
| Fidelidade visual/aprovação do proprietário | PARTIAL / G14 FAIL | Esboços consultados e composição comparada; aprovação humana definitiva pendente. |

A campanha 0304 permanece aberta e PARTIAL. G14 permanece FAIL até aprovação expressa do proprietário. Nenhum push dos aplicativos; Campanha 0305 não iniciada.
