# Motoboys V2 — evidências técnicas (2026-10-25)

## Estado e método

Intervenção local da Campanha 0304, iniciada no Restaurante `89b3753b1a508e22a5b55ee926af1118d251ab7c`, branch `codex/campaign-0304-visual-consolidated`. Implementação em `9199fc7b835173d2ebfc44b0b349eeafb71ada1c`; refinamento do estado vazio e fixtures em `bef730d188fe7f03893768f2607a29309d0182fa`; distinção explícita entre lease/presença/elegibilidade em `2fe4b2bd6a6431df7764a3e44792c97610da8160`; fixture sem dado de contato em `ba4158363fce37df5e4bd45122fc889cd7233ea6`. HEAD local Restaurante: `ba4158363fce37df5e4bd45122fc889cd7233ea6`. Sem push dos aplicativos.

As seis referências visuais foram abertas e identificadas. Os originais continuam em `/storage/emulated/0/Download`; não foram alterados nem copiados ao histórico. SHA-256 e dimensões:

| Referência | Dimensões | SHA-256 |
|---|---:|---|
| `aba-motoboy-pc-claro.png` | 1672×941 | `c4ad801db0584fb15e9de8fc84605e21567c9ff4f7044684c738b3af47e9a762` |
| `aba-motoboy-pc-escuro.png` | 1672×941 | `fbc98401aca9b92359e7dc2ae42fcf591d246108f3b9f0031464aa62ec61c2c0` |
| `aba-motoboy-tablet-claro.png` | 1447×1087 | `009632518450c13523188585ab333f80e66f6175e1a2cc9bf0f2271688749a52` |
| `aba-motoboy-tablet-escuro.png` | 1447×1087 | `29362829079b6a05c876c074a0879e9d4fa06fb92c46ec16c24c026a29cfb2c9` |
| `aba-motoboy-celular.png` | 1536×1024 | `3b7f9ee483a543a2a9c5a732b6fec6ddc5ba110f46bcbd57eca804dbffc7d32f` |
| `aba-motoboys.png` (composição dos seis dispositivos/temas) | 1536×1024 | `fad570e163e650327a0dfcb8405de703065e895a8c3118cf168c5e805e6acc95` |

O renderer `bikes()` foi executado com fixtures sintéticas isoladas. Chromium headless/CDP usou os CSS servidos em `127.0.0.1:8083`; os SHA-256 de `app.js` e `styles.css` servidos coincidiram com o working tree (`app.js`: `966537a01abd42ca91bd62c4db2c5e39d3fa94e23a66bbf6d4962a2615012185`; `styles.css`: `ce67c3ee0b3e0aa434557a64b3eae11f5d4bcc15712440eea85965855e2dcb17`). As capturas CDP são fixtures, não telas de sessão autenticada nem validação operacional real. As fixtures não contêm telefones, nomes pessoais, ganhos ou dados de clientes.

## Matriz de correspondência visual

| Região | Referência aprovada | Implementação/medida | Avaliação e diferença |
|---|---|---|---|
| PC claro/escuro | Cabeçalho único, quatro indicadores compactos, equipe à esquerda e detalhes/ação à direita | Mesma hierarquia; colunas com mínimo de 360/380 px e gap 16 px quando cabem | Estrutura correspondente; dados/metas financeiros demonstrativos da referência foram omitidos por não serem fonte confirmada. Capturas 1672×941 em claro/escuro. |
| Tablet claro/escuro | Equipe e detalhes em áreas legíveis, indicadores compactos | Layout deriva da largura útil após sidebar; 768/820 e 1024 com sidebar aberta ficam empilhados; 1024 com sidebar recolhida oferece duas colunas (427,8 px cada) | Adaptação respeita largura real e leitura; não comprime duas colunas em tablet retrato. Comparação visual final continua com o proprietário. |
| Celular claro/escuro | A referência composta mostra lista e detalhes lado a lado | A especificação textual exige fluxo mobile de lista → detalhes com “Voltar à equipe”; implementado esse fluxo em coluna única. Indicadores em grade 2×2 | Diferença estrutural intencional para atender navegação utilizável prevista no pedido. Requer inspeção/aprovação do proprietário; sem alegação de equivalência pixel a pixel. |
| Perfil | Referências usam círculos com iniciais | Iniciais determinísticas por identidade local; sem imagem, upload ou serviço de avatar | Correspondente à regra sem fotos. |
| Valores de exemplo | Referências contêm contagens, ganhos, percentuais, pessoas e corridas de demonstração | Renderizador usa estado real disponível; sem disponibilidade/presença confirmada exibe `—` e explicação. Nenhum valor financeiro fixo foi reproduzido | Dados de demonstração não foram transformados em fatos operacionais. |
| Estado sem seleção | Lista e painel de detalhe | Sem motoboy selecionado, a lista ocupa a região de trabalho e o painel redundante é omitido; filtro vazio retorna ao fluxo de lista | Correção feita após a primeira captura CDP revelar dois vazios redundantes. |

## Medidas CDP

`geometry.json` contém 92 combinações: dez larguras (320, 360, 390, 430, 768, 820, 1024, 1280, 1440, 1920), alturas celulares/tablet/desktop, temas claro/escuro e sidebar aberta/recolhida quando aplicável. Em todas: sem overflow horizontal. O `overflowY` do workspace permaneceu `visible`; a rolagem fica no documento. Essa medição geométrica lê a seção/painéis e não mede gutters do cabeçalho.

Larguras representativas do conteúdo efetivo / colunas / gap, tema claro, sidebar aberta:

| Viewport | Conteúdo útil | Lista | Detalhes | Gap | Layout |
|---:|---:|---:|---:|---:|---|
| 320 | 296 | 296 | 296 | 0 | lista ou detalhes mobile, uma coluna |
| 390 | 366 | 366 | 366 | 0 | lista ou detalhes mobile, uma coluna |
| 430 | 406 | 406 | 406 | 0 | lista ou detalhes mobile, uma coluna |
| 768 | 458,9 | 458,9 | 458,9 | 0 | empilhado após sidebar |
| 820 | 507,8 | 507,8 | 507,8 | 0 | empilhado após sidebar |
| 1024 | 691,6 | 691,6 | 691,6 | 0 | empilhado com sidebar aberta |
| 1024, sidebar recolhida | 871,6 | 427,8 | 427,8 | 16 | duas colunas |
| 1280 | 932,2 | 458,1 | 458,1 | 16 | duas colunas |
| 1440 | 1082,6 | 533,3 | 533,3 | 16 | duas colunas |
| 1920 | 1504 | 744 | 744 | 16 | duas colunas, max-width do shell |

As capturas representativas `motoboys-<largura>x<altura>-...` usam `RotaMotoDashboardV2.renderHeader()` real (logo, sino, ação de criação) e CSS do servidor 8083, além do renderer sintético de Motoboys. Incluem celular lista/detalhes em ambos os temas, tablet retrato/paisagem e PC em ambos os temas. Os arquivos `motoboys-<largura>x<altura>-...-count-<n>.png` registram 0, 1, 5 e 20 motoboys sintéticos. Os nomes legados `motoboys-<largura>-<altura>-...png` preservam as primeiras capturas da matriz, com shell/cabeçalho simplificados, inclusive o antes da correção do vazio redundante. Todos os `.png` são fixtures, nunca uma sessão autenticada; `screenshots.sha256` contém seus hashes.

## Arquitetura e segurança funcional

A implementação reaproveita os fluxos já existentes de `addBike()`/`editBike()`, `openBikeRaces()` e `openAssignment()`. A seleção de atribuição aceita identidade Driver local ou canônica. O acesso ao fluxo de despacho agora verifica também a permissão do módulo Pedidos; a confirmação segue o fluxo oficial existente, incluindo consulta server-side, elegibilidade, confirmação, sincronização e readback. O teste de regressão garante o guard e a seleção canônica. Nenhum serviço, endpoint, tabela ou contrato foi criado.

A fila/presença e os contratos compartilhados foram consultados nos dois aplicativos. Driver permanece entidade do domínio; `DeliveryEvent` é append-only/idempotente e `LocationPoint` continua sob responsabilidade de execução do Motoboy. Lease/eligibilidade é distinta de localização: GPS ausente não é inferido nem usado para confirmar presença. Não foram inseridas coordenadas, telemetria, ganhos ou taxas fictícias. Nenhuma escrita ou migration PostgreSQL foi executada; banco oficial permanece intocado.

## Testes

- `npm test` do Restaurante: **PASS, exit 0** após as três etapas, incluindo `test-motoboys-v2-view.js` e regressões de shell, despacho e impressão offline. O teste ainda verifica lease Online sem check-in e Online aguardando elegibilidade como estados distintos.
- `node --check app.js`, `node --check sw.js`, `git diff --check`: **PASS**.
- Testes de renderizador com 0/1/5/20 motoboys: **PASS**; sem fotos, sem ganhos/percentuais de referência fixos, estados desconhecidos distintos e fluxo de despacho protegido.
- Chromium/CDP fixture: 92 geometrias + capturas descritas acima, **PASS técnico de layout** (zero overflow, medidas consistentes). Isso não cobre handlers autenticados.
- E2E autenticado de cadastro, edição, filtros reais, despacho, sincronização, concorrência e RBAC: **BLOCKED** nesta rodada. Havia site 8083 acessível, mas não havia usuário/tenant MFA sintético autorizado nem ambiente de escrita E2E isolado disponibilizado no contexto; nenhuma autenticação foi simulada e nenhum banco foi escrito.
- Motoboy app: sem alterações; não se reivindica teste E2E Motoboy desta intervenção.

## Arquivos e gates

Restaurante alterado: `app.js`, `styles.css`, `index.html`, `sw.js`, `package.json`, `tests/test-motoboys-v2-view.js` e expectativas de cache em `tests/test-dashboard-v2.js`, `tests/test-dispatch-assignment.js`, `tests/test-printing-offline.js`, `tests/test-visual-shell-cache.js`.

| Gate local | Estado |
|---|---|
| Referências identificadas e abertas | PASS |
| Renderer responsivo e dados 0/1/5/20 | PASS técnico |
| Celular claro/escuro | PARTIAL — captura sintética; adaptação list/detail difere da composição de duas colunas desenhada |
| Tablet claro/escuro | PARTIAL — geometria comprovada; aprovação visual pendente |
| PC claro/escuro | PARTIAL — geometria/capturas; aprovação visual pendente |
| Cadastro/edição/busca/filtro/interação em sessão real | BLOCKED — E2E autenticado não disponível |
| Despacho operacional e sincronização entre apps | BLOCKED — não exercitados nesta rodada |
| Regressão automatizada | PASS — `npm test` completo |
| G14 — fidelidade/aprovação visual | **FAIL** — reprovação visual prévia permanece até aprovação expressa do proprietário |

Não há PASS global. Campanha 0304 permanece PARTIAL/aberta; pendências antigas não foram fechadas.
