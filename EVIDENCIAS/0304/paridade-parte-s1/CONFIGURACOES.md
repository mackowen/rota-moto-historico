# Auditoria de Configurações

## Restaurante

O catálogo de página vem de `settings()` em `app.js`; há categorias gerais fixas e páginas condicionais por permissões/sessão.

| ID | Categoria/página | Origem e persistência identificada | Confirmação/feedback e limite |
|---|---|---|---|
| CFG-R-01 | Empresa / Geral | `GET /api/admin/company`, `PUT /api/admin/company`, `/api/admin/company/location`; versionamento otimista/readback por `company-settings-persistence.js` | salva no servidor com CSRF e versão; testes `test-company-settings*` PASS. Sem browser autenticado/readback real nesta rodada. |
| CFG-R-02 | Operação | settings local IndexedDB e configurações company-owned do despacho | local autosave; contrato da empresa usa server/readback. Testes de company/restaurant operations PASS; inventário campo a campo incompleto. |
| CFG-R-03 | Logística | `/api/logistics/intelligence/settings`, `/api/logistics/route-settings` | `PUT` autenticado + resposta; teste de validação/tenant `test-route-origin-settings.js` PASS. UI real BLOCKED. |
| CFG-R-04 | Impressão | preferências locais do dispositivo (`TicketRenderer`) | auto/local save; testes de impressão PASS. Persistência após reload real BLOCKED. |
| CFG-R-05 | Origens de pedidos | configuração local de nomes/disponibilidade | autosave local; credenciais de marketplace geridas em tela empresarial separada. Não mistura valor local com segredo do provedor. |
| CFG-R-06 | Aparência | tema/cor/densidade local | autosave com feedback; `test-appearance-settings.js` PASS. |
| CFG-R-07 | Relatórios | preferências de visualização locais; dados consultados por APIs scoped | filtros não mudam regra financeira; testes analytics PASS. |
| CFG-R-08 | Navegação | atalhos persistidos no aparelho | mudança direta/autosave; teste de navegação PASS. |
| CFG-R-09 | Eventos/notificações | preferências locais | autosave; cobertura de reload autenticado não executada. |
| CFG-R-10 | Conta e segurança | mount `identity-ui.js`; endpoints de identidade, MFA e sessão | operação de segurança exige sessão/CSRF/MFA conforme rota; UI autenticada BLOCKED. |
| CFG-R-11 | Dados locais | exportação/importação IndexedDB | confirmação prévia e preview; testes backup/local PASS. |
| CFG-R-12 | Backup e recuperação | `/api/admin/backup` e executor privado | MFA/CSRF/auditoria; solicitação de restauração tem fluxo explícito. API e testes de controle PASS; ação real não executada. |
| CFG-R-13 | Equipe e permissões | mount de identidade/admin empresarial | depende de `company.manage`, API scoped e CSRF; teste sintético cobre guardas, persistência real BLOCKED. |
| CFG-R-14 | Motoboys / Integrações | admin empresarial e módulos isolados de provider | endpoints autenticados; sem segredo no cliente. Homologação real bloqueada por sessão/sandbox externa. |
| CFG-R-15 | Super ADM Global | endpoint `/api/platform-admin/settings` e rotas `/api/platform-admin/*` | separado de RBAC empresarial e com MFA/auditoria; positivo com sessão real BLOCKED. |
| CFG-R-16 | Sistema local / Auditoria / Laboratório | IndexedDB, ferramentas locais, testes sintéticos | não concede permissões do servidor; testes estáticos PASS. |

## Motoboy

`index.html` define sete acordeões: Motoboy, Ganhos, Entregas, Rotas e navegação, Atendimento do restaurante, Dados e backup, Idioma. `renderSettings()` preenche os campos; `saveSettings` salva o rascunho principal e `saveAppearanceSetting` salva preferências de aparência/idioma automaticamente.

| ID | Categoria | Escopo observado | Salvamento e validação |
|---|---|---|---|
| CFG-M-01 | Motoboy | perfil/identificação e regras locais; nome e perfil de empresa tornam-se somente leitura com sessão integrada | botão geral Salvar; campos company-owned disabled. |
| CFG-M-02 | Ganhos | referências do aparelho e meta diária própria separada de valores canônicos | meta Driver persiste por chave própria; validação numérica e limites. |
| CFG-M-03 | Entregas | taxa mínima, custo/km, faixas, cobrança de retorno e simulação | formulário valida faixa crescente e limite; ação Salvar e feedback de erro/sucesso. |
| CFG-M-04 | Rotas e navegação | GPS, distância, provider externo, alertas, ordenação | settings locais; navegação externa validada por contratos. |
| CFG-M-05 | Atendimento do restaurante | contato/notas; cadastro corporativo lido do Restaurante quando integrado | dados de empresa não editáveis no aparelho autenticado. |
| CFG-M-06 | Dados e backup | exportação/recuperação local | confirmação e validações conforme módulo de backup. |
| CFG-M-07 | Idioma | português, espanhol, inglês | autosave de aparência/idioma com mensagem de recuperação. |

## Estado do gate

Os testes de contratos e componentes de persistência passaram. **CFG-01 permanece PARTIAL**: falta executar, com conta autenticada autorizada, cada controle editável/salvar/cancelar/readback e estados de negação/MFA/CSRF/conflito; falta comparação automatizada exaustiva entre todos os grants de backend e cada estado exibido por perfil.
