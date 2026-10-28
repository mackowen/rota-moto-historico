# Testes do sistema de diálogos

O componente cria `<dialog role="dialog" aria-modal="true">`, título e descrição acessíveis, foco inicial, restauração ao fechar, validação de input e estado loading. Cancelamento/backdrop/Escape são configuráveis. A ação assíncrona mantém o modal aberto e bloqueia confirmação duplicada; falha da operação conserva o diálogo e apresenta erro.

`tests/test-dialog-service-contract.js` passou nos dois apps. Um harness externo descartável em `~/projetos/browser-tests/.temporarias/t5-dialog-qa.cjs` acionou o componente real no Chromium/CDP 155, renderização por software, em 320×700, 390×844, 768×1024, 1024×768 e 1440×900. Foram verificados retângulo dentro da viewport, largura do documento sem overflow, role/aria-modal, foco inicial em Cancelar, botão Confirmar desabilitado enquanto `onConfirm` pendia, fechamento após sucesso e retorno do foco ao acionador. O harness confirmou o valor persistido sintético.

Não foi navegação autenticada nem cobertura de todas as variantes de diálogos. Falhas do componente em integração com sessões protegidas, leitura por leitor de tela, modo escuro no produto e teclado físico real permanecem pendentes. As mensagens da suíte CDP são evidência de componente sintético, não aprovação visual do proprietário.
