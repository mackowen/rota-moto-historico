# Registro 0304 — Adendo de navegação desktop e shell responsivo

**Data:** 2026-10-24. **Projeto:** Restaurante / campanha 0304. **Tipo:** correção, auditoria visual e histórico. **Estado:** PARTIAL; campanha aberta, sem PASS global; G14 FAIL por reprovação expressa do proprietário.

## Solicitação e preservação

O proprietário exigiu a conclusão do checkpoint anterior e, em seguida, o adendo de correção da navegação desktop e dos cabeçalhos. Em continuação, informou que o ícone “+” de Nova corrida não aparecia na Início mobile. Este adendo não substitui o objetivo original de Rotas V2, não encerra as pendências anteriores e não inicia a campanha 0305.

Foram preservados os registros originais, as três imagens de referência aprovadas e as evidências da reprovação visual. Nenhuma imagem de implementação foi promovida a referência.

## Causas e correções

- **Sidebar:** o renderer repetia visualmente o rótulo dos itens. O estado recolhido não tinha todas as regras de layout para centralizar ícones e retirar nomes/grupos do fluxo. `navButton()` agora emite um nome visual por item; sidebar usa nomes completos, navegação inferior usa os rótulos curtos aprovados e o nome acessível/tooltip é preservado. Toggle controla `aria-expanded`, acessibilidade e preferência local.
- **Cabeçalho Início:** usava estrutura própria e ficava sem o mesmo contexto de título/descrição de Pedidos. Agora usa renderer compartilhado de título, contexto, descrição e ações; saudação operacional continua sem repetir a descrição.
- **Pedidos desktop:** regra responsiva posterior escondia o painel de detalhes em larguras >=1180px. O painel passou a ser visível e vem antes dos indicadores.
- **Ícone Nova corrida mobile:** seletor que recortava texto acessível também recortava o span pai do ícone. O renderer põe `.dv2-icon` como irmão do rótulo; CSS mobile recorta apenas o texto. A captura de 390×844 mostra o glyph “+”.

## Evidências e testes

Chromium local via CDP, com emulação de viewports. Runner de shell: 72 combinações (Início/Pedidos/Rotas, claro/escuro, expandida/recolhida quando aplicável; 360×800, 390×844, 768×1024, 1024×768, 1280×800, 1440×900 e 1920×1080), zero duplicações/overflow documental. Home em 390px: ações 44×44px em x=238/286/334, gaps de 4px, margem direita 12px; ícone “+” 19×19px. Pedidos >=1280px: painel lateral de detalhes 285px nos dois temas. Runner de Rotas: 26 combinações e filtros 5/5 na fixture, sem reprovar geometria/controles.

Capturas, reports JSON e limites: [README de evidências](../EVIDENCIAS/0304/adendo-desktop/README.md), [report do shell](../EVIDENCIAS/0304/adendo-desktop/0304-shell-visual-report.json), [comparação Rotas](../EVIDENCIAS/0304/adendo-desktop/0304-intervencao-visual-comparison.json). As referências originais continuam em [EVIDENCIAS/0304/REFERENCIAS](../EVIDENCIAS/0304/REFERENCIAS/).

Tests de dashboard, shell renderer, cache do service worker, impressão offline, navegação e layout foram adicionados/ajustados; `npm test` foi executado após as alterações e seu resultado final é registrado no checkpoint de campanha e no resumo. Runner autenticado: login inicial `403 MFA_REQUIRED`; o desafio foi concluído, mas reload deixou `#app` oculto, sem `#main` ou `#routeMap`. Não foi contornada autenticação/MFA/RBAC. Não houve escrita no banco oficial. A UI autenticada, persistência, sync, conflito e RBAC ainda não foram comprovados. CDP não equivale a Chrome Android físico.

## Repositórios e publicação

Restaurante: branch local `codex/campaign-0304-rotas-v2`, commit local `f4f137820a4f1c70db64f5ad8e2ecf44078f366b` (`Fix campaign 0304 route and desktop navigation layout`), sem push; tag baseline intacta. Motoboy: branch/HEAD anteriores preservados, inalterado e sem push. Browser QA: branch `codex/campaign-0294-admin-settings`, commit local `d7164de7ada07faaa0e6fb0c72d6494a0ba2dbe6` contém apenas o runner novo; as 739 entradas alteradas e os caminhos não rastreados preexistentes foram preservados; sem push. Histórico: branch `codex/campaign-0303-ui-refinements`, HEAD anterior `3b988fee29f051458cfa3e2999e865d7b275401b`; antes do commit, `ls-remote` confirmou igualdade exata com a branch remota. O commit do histórico e resultado do push fast-forward serão registrados após verificação final.

## Gates e próximos passos

Navegação lateral: PASS no renderer/fixture. Cabeçalho comum: PARTIAL. Desktop: PARTIAL. Mobile: PARTIAL até Chrome Android e sessão real. Rotas: FAIL pela avaliação do proprietário. Jornada funcional/E2E: BLOCKED após desafio MFA seguido de shell ausente no reload. Segurança/integridade: PARTIAL, sem escritas oficiais e sem validação E2E tenant/RBAC. Avaliação visual final: permanece exclusivamente com o proprietário.

Manter todas as pendências antigas, inclusive as de campanha 0303/0303-A. Próximos passos: restabelecer harness E2E autorizado sem contornar MFA; validar criação/save/readback de rota, sincronização/conflito e RBAC com tenant sintético; comparar Rotas populada com cada referência; testar Chrome Android físico; obter aprovação expressa do proprietário. Não declarar PASS global, não publicar app/Motoboy e não iniciar 0305.
