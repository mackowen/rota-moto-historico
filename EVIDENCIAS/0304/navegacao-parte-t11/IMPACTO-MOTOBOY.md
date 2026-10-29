# Impacto Restaurante × Motoboy

| Item | Restaurante | Motoboy |
|---|---|---|
| Navegação | removido `admin` como destino visual; alias legado continua roteando a Configurações → Sistema local | navegação existente conferida em teste de estrutura/responsividade; sem equivalente de Sistema local |
| Cabeçalhos | composição das páginas embutidas corrigida na fonte | topbar global + cabeçalhos internos específicos; não foi reproduzida duplicação global |
| CSS compartilhado | não houve edição CSS | nenhuma consequência de CSS compartilhado; revalidado `npm test`/assets |
| Autenticação/RBAC | permissões e módulos preservados; `admin` removido apenas da lista de destinos | nenhum RBAC ou autenticação alterado |
| Dados locais/sincronização | painel declara origem IndexedDB; contagem usa apenas entidades de negócio aguardando confirmação | estado Local-First e publicação não alterados |
| Responsividade | smoke Chromium público, 6 larguras e 2 temas, zero overflow; navegação real de Início, Entregas, Rotas, Ganhos, Ajustes e Ajuda em 390 px; Ganhos sem vínculo retorna à Home | smoke Chromium público, 6 larguras e 2 temas, zero overflow; navegação real de Início, Entregas, Rotas, Ganhos, Ajustes e Ajuda em 390 px; Ganhos sem vínculo retorna à Home |
| Regressões | suítes e testes direcionados em execução/resultado registrados em `TESTES.md` | `npm test` e `assets:check` PASS; nenhuma alteração de arquivo |

Motoboy mantém somente dados locais operacionais/preferências neste contexto de interface; identidade/autenticação de conta e vínculo operacional são resolvidos pelo serviço de sessão/API. Seu menu Ajustes contém painéis locais (rotas, dados, aparência, ganhos, idioma, entregas e motorista), sem um console administrativo de usuários/RBAC.
