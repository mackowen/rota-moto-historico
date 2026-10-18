# Matriz funcional — Administração global e endpoints 0255

| Funcionalidade | Backend / autorização | UI | Persistência | Evidência | Situação |
|---|---|---|---|---|---|
| Grant global independente | `platform_administrators`; sessão+MFA+grant ativo; audit log | Indicação separada do tenant | PostgreSQL E2E, migration 0048/0049 | Teste transacional de funções e HTTP unit | Funcional no backend; sem grant persistente |
| Bootstrap fundador one-shot | CLI local TTY, confirmação, email verificado, latch único | Não é endpoint web | PostgreSQL E2E | Teste sintético idempotente com rollback | Implementado; não executado |
| Listagem global de empresas | `/api/platform-admin/companies`; grant global | Página global condicional | PostgreSQL | API guard test; Browser apenas negação tenant | Parcial, fluxo positivo sem Browser |
| Gestão global de usuários e vínculos | `/api/platform-admin/users`, `/memberships` e ações suportadas; grant/MFA/CSRF/auditoria | Página global condicional | PostgreSQL | Unit + funções transacionais | Parcial, interação positiva sem Browser |
| Serviços/configurações globais | Sem capacidade operacional comprovada/implementada nesta campanha | Não concluído | Sem alteração | Não testado | Pendente |
| Marketplace orders | GET canônico; tenant + `orders.read`; runtime opcional | Busca por ação na área própria | Runtime/integração opcional | Browser sintético: 503 autorizado, 403 sem permissão, 401 expirado; nenhuma chamada no load | Corrigido; dependência de runtime externa/local |
| Registro de instalação sync | POST exige sessão, CSRF e `sync.push` | Cliente verifica permissão e informa indisponibilidade | Protocolo sync existente | Browser direto sem permissão: 403; guard cliente false | 403 confirmado legítimo; UX corrigida |
| Isolamento tenant | RLS/ACL tenant mantidos; política explícita global limitada | Cache não concede papel | PostgreSQL | E2E 54 tabelas, 39 tenant policies + 3 políticas globais, dois tenants | PASS |
