# Parte R.1 — regularização do fundador no E2E

Data: 2026-10-28. Alvo: exclusivamente `rotamoto_e2e`; `rotamoto` não foi acessado.

## Pré-validações e concessão

| Requisito | Estado | Evidência sanitizada |
|---|---|---|
| Conexão e ledger | PASS | `current_database=rotamoto_e2e`, operador `rotamoto_migrator`; migrations 0001–0061 e checksums válidos. |
| Identidade autorizada | PASS | Uma correspondência normalizada, ativa e verificada; sem dados de identificação no relatório. |
| Autenticação/MFA recente | PASS | Uma sessão ativa elegível, um contexto empresarial único, MFA e atividade recentes. Nenhum código/token/senha foi coletado ou consultado. |
| Membership empresarial | PASS | Usando o `active_company_id` da sessão MFA recente como contexto tenant, consulta READ ONLY confirmou, sob RLS, uma membership ativa `owner` em empresa ativa. Role contém `company.manage`. |
| Prova de fundador | PASS | Registro de provisionamento corresponde ao digest da instalação concluída para essa identidade; membership atual confirmada sob o tenant da sessão. |
| Conflito de administração global | PASS | Nenhum administrador nem histórico anteriores; latch livre antes da operação. |
| Regularização oficial | PASS | Chamado `platform_admin_bootstrap_founder` como `rotamoto_migrator` em transação E2E, com tenant context derivado da sessão autenticada; sem escrita direta em tabelas de grants. |
| Persistência, latch e auditoria | PASS | Após commit e nova leitura, grant `founder_bootstrap` ativo, único administrador global, latch apontando para a identidade e exatamente um evento auditado `founder.created`. |
| Outros usuários/admins | PASS | A tabela de usuários tem uma identidade; o estado global tem exatamente um grant/admin ativo e é o alvo autorizado. |
| RLS/MFA/auditoria | PASS | RLS permaneceu forçado; role de operador não tem `BYPASSRLS`; nenhum fator MFA foi alterado. |

A operação foi feita dentro de transação. Se qualquer pré-condição ou asserção pós-grant tivesse falhado, `ON_ERROR_STOP` impediria o commit; o caminho executado confirmou as guardas antes do `COMMIT`.

## Permissões financeiras

A consulta de papel owner no contexto autenticado confirmou que `finance.read` e `finance.manage` estão ausentes; `company.manage` está presente. A aplicação oferece ação específica do owner em **Configurações → Perfis existentes → “Restaurar acessos financeiros do proprietário”**. Ela usa a sessão/MFA/CSRF normais e grava auditoria `owner.finance_permissions_restored`.

A confirmação do proprietário ainda é necessária para acionar essa ação na sessão da aplicação. A última leitura mostrou ambos os grants ainda ausentes e nenhum evento de restauração. Não houve grant direto, alteração do papel ou alteração de outra membership. Gate: **PARTIAL**, aguardando a ação do owner na UI. Pós-validação financeira também pendente.

O proprietário informou não localizar a configuração. A auditoria estática confirmou que `127.0.0.1:8083` serve o bundle atual e que a página contém o acionador. A navegação indicada é **Mais → Configurações → Equipe e permissões → (rolar) Perfis existentes → Proprietário**. O botão depende de `company.manage` na sessão e de grants ausentes. Sem inspeção autenticada da tela, o motivo de não aparecer/localizar permanece sem comprovação; não se declara validação visual.

## Console global e Browser QA

O grant e o estado global foram verificados por persistência no banco. Acesso HTTP/UI como Super ADM, atualização da sessão no browser e QA autenticado em móvel/desktop **não foram observados** nesta rodada: não há Browser host-managed compartilhado nem acesso ao cookie/session token do navegador autenticado. Nenhum token foi extraído. O proprietário deve abrir/atualizar **Configurações → Acesso administrativo global** na sessão atual; isso não substitui Browser QA em dois viewports. Gates de console e Browser QA: **BLOCKED** nesta ferramenta.

Não foram declarados PASS para navegação, layout, MFA HTTP real, revogação de sessão ou viewport. Testes sintéticos anteriores da Parte Q cobrem funções/API e são separados desta validação real.

## Divergência entre contratos

`CONTRACT.md` do Restaurante contém seis linhas adicionais em “Relatórios operacionais e financeiros”, introduzidas no commit Restaurante `74ac072` (Parte N), descrevendo `GET /api/logistics/analytics`, escopo company-history, coverage, nomes de integração e diagnóstico de `Order.money`. O `CONTRACT.md` do Motoboy teve edição posterior independente (`e546cde`) e não contém esse bloco. A diferença é documentação específica do relatório Restaurante, não uma mudança do schema compartilhado. Arquivos estavam limpos no Git; nenhum foi sincronizado ou alterado nesta Parte R.1. O teste de igualdade byte a byte é mais restritivo que esse conteúdo específico e continua falhando até uma decisão documental explícita entre os proprietários dos dois aplicativos.

## Testes e regressão

Quatro testes de cache/assets, após alinhamento de expectativas obsoletas com `sw.js` `v147`, `styles.css?v=0304.22` e `app.js?v=0304-reports-n.2`, passaram isoladamente: `test-dashboard-v2.js`, `test-printing-offline.js`, `test-dispatch-assignment.js`, `test-presence-qr-modal.js`.

`npm test` passa pelos testes de cache atualizados, mas termina em `tests/test-cross-app-contract-parity.js` porque os dois `CONTRACT.md` divergem. Nenhum teste de escrita E2E foi repetido após a concessão, pois os testes de bootstrap global assumem latch sem fundador e a conta real está agora global; não se alterou/resetou o banco para satisfazer fixtures. Validação de DB deste R.1 foi READ ONLY, exceto a única chamada autorizada ao mecanismo de regularização e sua auditoria.

## Resultado/continuidade

- Concessão global efetiva e auditada: **PASS**.
- Owner ativo e vínculo empresarial: **PASS**, comprovado sob RLS por sessão MFA recente.
- `finance.read` / `finance.manage`: **PARTIAL**, aguardando ação owner autenticada.
- Console global na UI, MFA HTTP, sessão atualizada/revogação e Browser QA móvel/desktop: **BLOCKED** por falta de navegador autenticado acessível ao runner.
- Divergência de `CONTRACT.md`: **PARTIAL**, origem delimitada e preservada, sem sincronização automática.
- Banco oficial `rotamoto`: **PASS preservação** — não conectado nem consultado.

Campanha 0304 continua aberta; G14 **FAIL**; backlog desde 0257 preservado; 0305 não iniciada. Nenhum banco, backup ou chave criado. Nenhum segredo ou dado pessoal foi gravado neste artefato.
