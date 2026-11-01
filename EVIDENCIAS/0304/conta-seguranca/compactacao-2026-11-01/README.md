# Conta e segurança — refinamento visual compacto

**Data:** 2026-11-01. **Resultado:** PASS técnico na matriz autenticada sintética; confirmação visual do proprietário ainda pendente. Esta entrega preserva os modais e fluxos funcionais existentes. Não altera API, autenticação, MFA, banco ou contratos.

## Mudança

Substituída a coluna de cartões altos por um resumo compacto da conta, dois grupos de configurações (`Segurança` e `Empresas e acesso`) e uma ação de encerramento de sessão visualmente separada. Cada opção é um botão nativo que ocupa a linha, com ícone, nome, estado curto e indicador de navegação. Os seis acionadores continuam usando os mesmos handlers e painéis/dialogs já aprovados. Em tablet/desktop os grupos usam duas colunas; em celular permanecem em uma coluna.

Arquivos de produção alterados nos dois apps: `identity-ui.js`, `identity-ui.css`, `index.html` e `asset-manifest.js`. Teste de contrato atualizado em `tests/test-identity-ui.js`.

## Medidas comparativas

As alturas são `scrollHeight` do elemento de visão geral, obtidas com sessão sintética autenticada em Chromium/CDP. O comparativo principal usa a mesma medida antes/depois:

| App | 390×844 antes | Depois | Redução | Visão geral depois em 768×1024 | Em 1440×900 |
|---|---:|---:|---:|---:|---:|
| Restaurante | 1.227 px | 563 px | 54,1% | 481 px | 423 px |
| Motoboy | 1.267 px | 580 px | 54,2% | 423 px | 423 px |

Na viewport móvel, as seis linhas de ação têm 54 px de altura; tablet/desktop usam pelo menos 58 px. Não houve overflow horizontal. O menor contraste de texto auxiliar medido foi 4,7588:1 (Restaurante claro), acima do mínimo AA 4,5:1; títulos medidos ficaram acima de 13:1 nos dois temas. A ação de sessão conserva cor semântica de perigo.

## Evidência visual

Capturas `before` e `after` foram feitas com identidade sintética (`example.invalid`), sem códigos, segredos MFA ou dados pessoais. QA utilizou perfil Chromium isolado e fixture com rollback.

| App | Antes, 390×844 claro | Depois 390×844 | Depois 768×1024 | Depois 1440×900 |
|---|---|---|---|---|
| Restaurante | [antes](before/restaurante/overview-390x844-light.png) | [claro](after/restaurante/account-overview-390x844-light.png) · [escuro](after/restaurante/account-overview-390x844-dark.png) | [claro](after/restaurante/account-overview-768x1024-light.png) · [escuro](after/restaurante/account-overview-768x1024-dark.png) | [claro](after/restaurante/account-overview-1440x900-light.png) · [escuro](after/restaurante/account-overview-1440x900-dark.png) |
| Motoboy | [antes](before/motoboy/overview-390x844-light.png) | [claro](after/motoboy/account-overview-390x844-light.png) · [escuro](after/motoboy/account-overview-390x844-dark.png) | [claro](after/motoboy/account-overview-768x1024-light.png) · [escuro](after/motoboy/account-overview-768x1024-dark.png) | [claro](after/motoboy/account-overview-1440x900-light.png) · [escuro](after/motoboy/account-overview-1440x900-dark.png) |

## Validação

- Browser QA autenticado sintético: todas as seis linhas ativadas por teclado; os seis painéis existentes abriram/fecharam; sem erro JavaScript, overflow horizontal ou controle encoberto. Matrizes 390×844, 768×1024 e 1440×900, claro/escuro, nos dois aplicativos.
- Regressão funcional autenticada: senha inválida preserva rascunho; alteração válida confirma após ACK; fluxos anteriores de MFA, códigos, empresas, convites e logout foram exercitados; fixture revertida. Os testes completos também passaram nos dois apps.
- HTTP 8083/8084: `identity-ui.js`, `identity-ui.css` e `asset-manifest.js` servidos com HTTP 200 e SHA-256 idêntico ao checkout. O servidor estático já servia os arquivos atualizados; não foi preciso reiniciar processo.
- `npm test`, `npm run assets:check`, `node tests/test-identity-ui.js` e `git diff --check`: PASS nos dois apps.

Commits locais: Restaurante `adb4394`; Motoboy `cfbe8fe`. Nenhum push de aplicativo.

Hashes SHA-256 atuais; cada resposta `curl -fsS` retornou HTTP 200:

| Host | Arquivo | Checkout e HTTP SHA-256 | Resultado |
|---|---|---|---|
| 8083 | `index.html` | `9c5d58e9bc1d97bfda1bd696d0ddf223df37b1d8a4152d3815ddcea3b2a44bf3` | MATCH |
| 8083 | `identity-ui.js` | `54a1fd91881f34d61bc6b3a1f8e72bed0fdf49c3eb67872272f4d4648f15b25d` | MATCH |
| 8083 | `identity-ui.css` | `b31db7c12275ad310f3e880e1339367d36b85431cc8be2a94c6ea78ae6635216` | MATCH |
| 8083 | `asset-manifest.js` | `f8e82893a1583e7fe40edef37fc22bc2dedb9e8d01725107ccc545e4c2b2f3a1` | MATCH |
| 8084 | `index.html` | `a01545187f34ef224cddb53ab68943631d7da9692dac11c7aea814f2cd374308` | MATCH |
| 8084 | `identity-ui.js` | `bac14492f5357f65e15f13d998e3d4782e98e5f839453c4aedc92625636bf0f8` | MATCH |
| 8084 | `identity-ui.css` | `b3b0f45c46a04c4d777d5aa012dd1152f3e8e5d8c4070619179727d745ac601d` | MATCH |
| 8084 | `asset-manifest.js` | `613c03129947eada7ddc8b0b8f415813997323c2d8132285d108a873651b838c` | MATCH |

## Limites

As capturas e medidas são de Browser QA sintético autenticado, não do Chrome Android pessoal. O proprietário ainda precisa confirmar a nova densidade visual no aparelho. A aprovação funcional anterior permanece preservada; esta alteração não fecha IDs abrangentes do backlog nem altera G14. Campanha 0304 permanece aberta; 0305 não iniciada.
