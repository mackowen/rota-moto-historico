# Investigação da rota de Backup — 0295

- Frontend `app.js`: `backupAdminRequest('/admin/backup')` usa `syncUrl('/api', path)` e solicita `/api/admin/backup`.
- Backend `server.js`: monta `createBackupAdminHttpHandler`; a rota `/api/admin/backup` GET é reconhecida como `status` quando o store existe. Quando o store não está configurado, o servidor devolve HTTP 503 `BACKUP_ADMIN_NOT_CONFIGURED`.
- E2E autenticado ativo em `127.0.0.1:8787`: GET sem sessão respondeu HTTP 503 com código `BACKUP_ADMIN_NOT_CONFIGURED`, confirmando route dispatch e ausência de configuração no runtime.
- Fixture transacional usada pela UI em 0294 não instala handler de Backup; o host fixture responde 404 quando nenhum handler reconhece o caminho. Isso explica a observação 404 sem inferir defeito na API/rota do produto.
- Nenhum write de Backup, restore, destino, segredo ou backup real foi executado. Capacidade administrativa permanece bloqueada neste runtime; nenhum endpoint foi inventado.
