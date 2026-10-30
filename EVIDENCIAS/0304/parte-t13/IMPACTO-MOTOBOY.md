# Impacto no Motoboy — Parte T.13

O defeito de breakpoint existia no Motoboy. Portrait (`max-width:760px`) fixa o cabeçalho; tablet/desktop só ativa a área de rolagem interna quando a largura é maior que 760 px **e** a altura é pelo menos 520 px. Celular em landscape de 844×390 ou 915×412 caía entre esses dois modos e mantinha o cabeçalho sticky no fluxo externo.

Foi adicionada uma regra para landscape com 761–960 px de largura e até 520 px de altura. Ela fixa a topbar em 56 px, aplica safe-area no topo e reserva o espaço de cabeçalho e navegação no aplicativo. Não altera identidade, autenticação, vínculos, permissões, contratos, dados ou navegação operacional.

O Chromium confirmou antes/depois e rotação sem recarga. `npm test`, assets e diff-check passaram no Motoboy. A validação no Android físico permanece pendente.
