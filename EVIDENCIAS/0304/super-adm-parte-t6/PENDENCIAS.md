# Pendências T.6

1. **BLOCKED — console autenticado:** abrir QA com sessão autorizada já disponível no navegador de teste, sem senha/código automatizados, e conferir seis seções em tema claro/escuro e mobile/desktop.
2. **PARTIAL — contraste/renderizadores:** confirmar com dados reais do endpoint os estados e textos exatos; a correção comprovada até aqui é do CSS/token com fixtures visuais.
3. **BLOCKED — resumo financeiro:** executar a consulta real e trocar empresa/período durante resposta quando houver sessão; observar erro/timeout e readback.
4. **PARTIAL — backup runtime:** consultar o estado do servidor pelo fluxo autorizado para confirmar se o processo E2E efetivamente retorna `BACKUP_ADMIN_NOT_CONFIGURED`; não inferir presença/ausência de scripts locais pelo texto da tela.
5. **PARTIAL — edição RBAC:** a edição/readback real e conflito transacional sem CAS seguem como T5; nenhuma permissão foi alterada.
6. Confirmar a aparência no Chrome Android do proprietário após atualizar a versão, sem limpar dados/cache e sem tocar no perfil pessoal via CDP.

G14 permanece FAIL até aprovação visual expressa. Campanha 0304 aberta; 0305 não iniciada.
