# Login — correção do layout desktop e Chrome Android — 2026-10-25

## Causa raiz

O painel usava `@media (max-width: 980px)` para mudar a composição de duas colunas para uma. O Chrome Android em “Versão para computador” apresenta com frequência viewport CSS de 980 px; por isso entrava no layout empilhado, mesmo havendo largura útil para apresentação e formulário lado a lado. No estado anterior, a coluna de conteúdo também tinha altura máxima e `overflow:auto`; junto ao alinhamento central podia produzir rolagem interna e deslocar a origem dos elementos quando o conteúdo excedia a área.

O breakpoint de empilhamento foi reduzido para 860 px, abaixo do qual a largura disponível não comporta os dois painéis sem compressão. Em desktop, o grid usa uma única linha automática, itens alinhados no início, a coluna de conteúdo cresce com os seus elementos e o scroll fica no painel/documento principal. O painel promocional compacto e as regras mobile existentes foram preservados.

## Comparação controlada em 980×720

`dark-980-before-breakpoint-reproduction.png` reproduz no browser o breakpoint anterior de 980 px; não é captura do proprietário. `dark-980-after.png` é o CSS atual servido em 8083.

| Estado | Apresentação | Formulário | Composição | Scroll |
|---|---|---|---|---|
| Regra anterior reproduzida | x=24, y=22, 932×375,5 px | x=230, y=415,5, 520×519,6 px | Empilhada; gap vertical 18 px | Painel 1140/720 px; formulário chegava abaixo do viewport |
| Regra atual | x=24, y=22, 482,11×676 px | x=545,30, y=22, 410,70×537,05 px | Duas colunas; gap horizontal 39,19 px | Documento/painel rola 764/720 px; formulário `overflowY=visible`, sem scroll próprio |

Capturas: [antes — reprodução controlada](dark-980-before-breakpoint-reproduction.png), [depois — modo desktop Android emulado](dark-980-after.png), [PC 1280 escuro](dark-pc-1280.png), [tablet retrato escuro](dark-tablet-portrait.png), [celular escuro](dark-phone-390.png). As outras capturas claro/escuro incluem viewports 320–1920 px.

## Validação

O runner CDP mediu 33 estados: 15 larguras/orientações × 2 temas, mais rolagem ao fim, mostrar/ocultar senha e submissão vazia. A 980 px CSS, ambos os temas renderizaram lado a lado; a 768 px retrato o layout empilha com gap de 18 px. PC 1280/1440/1920 e tablet paisagem 1024 ficaram em duas colunas. Em celular o painel promocional permaneceu oculto e o formulário prioritário foi preservado. Não ocorreu overflow horizontal nem exceção JavaScript. A submissão sem campos válidos foi barrada pelo navegador e nenhum POST de login foi enviado.

O 401 de `/api/identity/session` é esperado porque o runner não tinha sessão. Login com credenciais, MFA, recuperação e convite não foram executados. A validação foi Chromium/CDP emulado, incluindo viewport CSS 980×720 com emulação mobile; não foi um dispositivo Chrome Android físico.

A referência inicial aprovada foi localizada como `reference-login-owner.png` no pacote anterior (SHA-256 `032d90517dc283f7c1b89d7c46cae75c974cd743321abd84de71358ef16f0573`). As capturas recentes de reprovação descritas pelo proprietário não estavam acessíveis como arquivos; a imagem “antes” aqui é uma reprodução do breakpoint anterior. Não declarar comparação pixel a pixel com a captura recente. G14 segue FAIL até a aprovação visual expressa do proprietário.
