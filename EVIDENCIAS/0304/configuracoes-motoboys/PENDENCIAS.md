# Pendências preservadas

- **Concorrência de vínculo em sessões independentes — PARTIAL.** Duplicidade e recusa de vínculo ativo/inativo passaram; a disputa simultânea entre duas sessões independentes não foi ensaiada nesta execução.
- **Aprovação visual do proprietário — PENDING.** Chromium/CDP sintético passou em claro/escuro e três tamanhos; não equivale ao Chrome Android físico.
- `RM-0256C-DRIVER-LINK-UI` continua **PARTIAL** no backlog global até prova de concorrência separada e validação visual solicitada. Os fluxos associados exercitados nesta parte passaram.
- `RM-0256C-TEAM-RBAC` continua **PARTIAL** para o escopo amplo de edição de equipe/perfis, concorrência e isolamento cross-tenant; o teste `403` desta parte cobre somente autorização de associação de Driver.
- `RM-0259-IDENTITY-INVITE-LIFECYCLE` permanece no estado documentado: SMTP real externo não configurado e concorrência do ciclo de convites pendente.
- Nenhum banco ou empresa extra foi criado. `rotamoto` não foi alterado; todas as fixtures de `rotamoto_e2e` foram revertidas.
