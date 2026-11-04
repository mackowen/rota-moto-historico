# Pendências — Equipe e permissões

| ID / gate | Estado | Evidência que falta |
|---|---|---|
| `RM-0256C-TEAM-RBAC` | PARTIAL | Browser autenticado com fixture autorizada para editar outro integrante, reler/recarregar e cobrir operações negadas/conflitantes; corrida concorrente não foi demonstrada nesta execução. |
| `RM-0256C-DRIVER-LINK-UI` | PARTIAL | Browser autenticado para controles de associação/revogação e persistência. Não alterar vínculos reais para teste. |
| `RM-0259-IDENTITY-INVITE-LIFECYCLE` | PARTIAL | Browser autenticado para criar, reenviar e revogar convite, refletir estados após reload e validar duplicidade/expiração; concorrência e integração real de email continuam critérios separados. |
| Validação visual do proprietário | PENDING | Conferir a seção publicada no Chrome Android, claro/escuro e viewport móvel. |
| Impacto Motoboy | PASS em regressão, sem mudança de código | Administração de memberships/roles pertence ao Restaurante; testes completos, assets e paridade passaram no Motoboy. Reavaliar se contratos forem alterados. |

Não foi criado banco, empresa, conta, vínculo, sessão privilegiada ou migration. G14 permanece FAIL; Campanha 0304 permanece aberta e Campanha 0305 não iniciada.
## Atualização vigente — 2026-11-02

A identidade qa-saneamento-0304-20261031@rotamoto.invalid e o perfil QA Configurações são fixtures sintéticas preexistentes, auditadas no escopo saneamento-0304, vinculadas a Chico e preservadas. O cenário transitório QA Convites e as memberships/tokens de teste existiram apenas na transação rollback-only. O ciclo interno de convites e as negativas de RBAC passaram; o SMTP real está BLOCKED por ausência de provedor, concorrência entre sessões separadas e link operacional Motoboy continuam PARTIAL. A mensagem de validade do convite e a invalidação dos tokens na revogação foram corrigidas. Consulte [a evidência autenticada](CONVITES-E-MAIL-RBAC-20261102.md). Esta atualização substitui a pendência antiga de “sem identidade autorizada” para o ciclo de convite, sem encerrar os IDs canônicos mais amplos.
