# Pendências — Parte T.13

- **BLOCKED:** o relato original foi observado pelo proprietário no Chrome Android autenticado. Esta sessão só teve Chromium isolado; não foram usados perfis, cookies ou credenciais pessoais. O proprietário precisa confirmar no aparelho a estabilidade da topbar após a atualização.
- **PARTIAL:** a topbar do Restaurante não apresentou deslocamento no harness de CSS real em 390×844, 700×320, 844×390 e 915×412, nos dois temas. Sem sessão/dispositivo real, não é possível concluir que o problema autenticado relatado foi resolvido para o Restaurante; nenhuma mudança foi aplicada sem reprodução técnica.
- Se a topbar do Restaurante ainda se deslocar no aparelho após atualizar, registrar viewport/orientação e tela; comparar o `styles.css` servido (hash registrado em TESTES.md) e os valores de `getBoundingClientRect()` para localizar a divergência real.
- Backlog anterior desde 0257 permanece inalterado. G14 **FAIL**, Campanha 0304 aberta, 0305 não iniciada.
