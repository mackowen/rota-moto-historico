# Pendências e classificação ADM-01–ADM-21

Os estados PASS abaixo descrevem correções e contratos técnicos efetivamente testados; não elevam a navegação autenticada a PASS.

| ADM | Requisito/resultado | Estado | Próxima ação |
|---|---|---|---|
| ADM-01 | Mapear DTOs `snake_case` e aliases `camelCase` do console | PASS técnico | Confirmar contra sessão autorizada |
| ADM-02 | Ausência não vira zero; resposta inválida/indisponível falha com contexto | PASS técnico | Exercitar falha de API autenticada |
| ADM-03 | Estados de empresa/vínculo traduzidos sem código técnico cru | PASS técnico | Inspecionar todas as variantes reais |
| ADM-04 | Distinguir empresas `Synthetic`/`__campaign_` sem ocultar nem presumir origem | PARTIAL | Inspecionar tenant/origem por endpoint autorizado; não renomear registros |
| ADM-05 | Cards/ações de empresa, motivo e readback | PARTIAL | Browser autenticado; não suspender empresa real no QA |
| ADM-06 | Email verificado, conta ativa e número de vínculos | PASS técnico | Verificação visual autenticada |
| ADM-07 | Privilégio global efetivo separado de `founder_claimed` | PASS técnico | Reconfirmar conta fundadora apenas por contexto autorizado |
| ADM-08 | Vínculos legíveis, papel, empresa, escopo e estado | PARTIAL | Backend não fornece origem; confirmar integração autenticada |
| ADM-09 | Catálogo/grants validados e sem chave fora do catálogo | PASS técnico | Comparar catálogo completo por sessão Super ADM |
| ADM-10 | Permissões agrupadas por domínio com descrição | PASS técnico | Avaliar visualmente em mobile/desktop |
| ADM-11 | Estados concedida/não concedida e origem direta explícita | PARTIAL | API não informa inherited/deny provenance; ampliar contrato com gates próprios |
| ADM-12 | Não inventar grants herdados/temporários | PASS técnico | Permanecer até endpoint expor semântica efetiva |
| ADM-13 | Owner protegido no front e pelo backend | PASS sintético | Não editar owner real; sessão visual pendente |
| ADM-14 | Dirty state, cancelar, salvar e mensagem de dependência financeira | PASS técnico | Repetir ida-e-volta autenticada no E2E sem alterar perfil protegido |
| ADM-15 | MFA/CSRF/auditoria e escopo preservados pela rota oficial | PASS sintético | Teste real protegido ainda requer sessão elegível |
| ADM-16 | Conflito: preflight e reread detectam divergência | PARTIAL | Backend não tem revision/CAS; fechar janela de corrida em mudança separada e compatível |
| ADM-17 | Resumo financeiro um tenant e período por consulta | PASS técnico | Consulta real autorizada pendente |
| ADM-18 | Eventos/valores e indicação de que não confirmam liquidação | PARTIAL | Validar estados vazio/erro/valores somente em sessão permitida |
| ADM-19 | Políticas safe settings traduzidas, deployment-managed e não editáveis | PASS técnico | Visual autenticado pendente |
| ADM-20 | Substituição de diálogos nativos de aplicação nos dois apps | PASS técnico + CDP | QA de cada fluxo autenticado e leitor de tela pendentes |
| ADM-21 | Auditoria visual total, tema claro/escuro e console global autenticado | BLOCKED | Fornecer sessão de browser legitimamente autenticada ou observação do proprietário; não usar perfil pessoal |

Também permanecem pendentes: validação de tela física no Chrome Android; origem de registros técnicos via endpoint autorizado; estados herdados/negados não fornecidos pelo DTO; conflito atômico com revision/CAS; inventário visual/authenticated completo de cada tela; aprovação expressa do proprietário/G14. Backlog desde 0257 permanece integralmente preservado.
