# Cópias e recuperação: estado da integração

## Camadas distintas

1. **Scripts locais/Termux:** o repositório contém operações de backup (`backup:create`, `backup:verify`, `backup:inventory`, `backup:executor`) e seus controles. A mensagem vista no aplicativo não consulta nem prova o estado desses scripts.
2. **Backup PostgreSQL e recuperação:** executor separado, chave/cofre e recovery sets pertencem à operação server-side. Nenhum backup, chave, restore, rotação ou exclusão foi executado nesta Parte T.6.
3. **Central administrativa na UI:** `/api/admin/backup` só é montado se o servidor constrói `backupAdminHttp`. Em `server.js`, isso depende de `backupControlStore`, que requer diretório de controle, logger de auditoria e validação do processo web. Se ausente, o servidor retorna 503 `BACKUP_ADMIN_NOT_CONFIGURED`.
4. **Integração frontend/API:** `app.js` mapeava esse código para “O serviço ... ainda não foi configurado neste ambiente.” A origem do texto está comprovada no código. A tela agora especifica que a central administrativa do servidor não está conectada a esta API e informa que isso não verifica os artefatos locais. Também separa o export Local-First em Ajustes → Dados locais.

Os testes HTTP sintéticos de backup passaram. Não foi feita consulta autenticada ao endpoint no runtime E2E, nem leitura de variáveis de ambiente/segredos; por isso a configuração atual do processo 8787 permanece não confirmada. Nenhuma funcionalidade de recuperação foi simulada.
