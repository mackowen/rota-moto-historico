# Regressões e preservação

- Início, Motoboys, Pedidos, Entregas e telas já padronizadas foram preservadas; nenhuma alteração de layout/hierarquia nessas telas, exceto a substituição funcional dos diálogos nativos listados em `DIALOGOS-INVENTARIO.md`.
- O CSS de identidade do Motoboy é próprio e foi mantido; a folha do Restaurante não foi aplicada ao Motoboy. O serviço comum de diálogo permanece em arquivos isolados.
- A suíte do Motoboy passou integralmente. A suíte do Restaurante inicialmente encontrou uma expectativa legada por `window.confirm`; o teste foi atualizado para exigir o diálogo customizado e a mesma fronteira de autorização, e a suíte completa final passou.
- `rotamoto` e `rotamoto_e2e` não foram consultados nem alterados; migrations 0061, founder, grants, MFA, CSRF, RLS e auditoria preservados.
- Nenhuma exclusão/renomeação/suspensão de empresa ou usuário foi executada; nenhuma operação financeira foi enviada.
