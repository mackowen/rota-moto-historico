# Checklist de backup e recuperação — 0268

Este checklist separa testes históricos em ambiente sintético de prontidão operacional. Status inicial usa `PASS_SCOPE` apenas para a evidência histórica delimitada; status global de DR é `PARTIAL`, com dependências `BLOCKED_AUTHORIZATION`/`PENDING_OWNER`. Não usar um backup de produção nem selecionar como destino banco existente.

| Verificação | Evidência/ação segura | Estado atual | O que falta / critério de encerramento |
|---|---|---|---|
| Exportação local versus backup integral | 0256-E documentou exportação Local-First/IndexedDB como artefato local sensível, que não equivale a cópia integral PostgreSQL | PASS_SCOPE histórico | Confirmar escopo na documentação entregue ao operador; não presumir cobertura do servidor |
| Formato e integridade | Testes sintéticos prévios validaram manifesto, versão, hash e formato do recovery set | PASS_SCOPE histórico | Executar teste com o artefato e versão designados em campanha autorizada |
| Criptografia do recovery set | Testes sintéticos prévios validaram proteção criptográfica e falha fechada | PASS_SCOPE histórico | Não acessar/chamar chaves reais; custodiante comprova processo sem enviar chave |
| Versão/schema | Manifesto registra versões e inventário de schema em testes prévios | PASS_SCOPE histórico | Comparar fonte autorizada com schema do alvo de recuperação descartável |
| Cobertura de PostgreSQL e mídia | Testes documentais/sintéticos anteriores; backup local do app não cobre sozinho PostgreSQL | PARTIAL | Operador confirma inventário de mídia/DB e prova de recuperação do conjunto completo |
| Proteção e custódia de chaves | Nenhuma chave real foi lida ou alterada nesta campanha | BLOCKED_AUTHORIZATION | Designar custodiante e cerimônia de acesso aprovada; segredo permanece fora de tickets/chat/histórico |
| Retenção | Há testes de configuração/guardas; retenção real de cópias não foi inspecionada nem executada | PARTIAL | Política aprovada e evidência de retenção, sem apagar cópias nesta fase |
| Cópia externa/offsite | Não comprovada nas evidências 0256-E/0267 | BLOCKED_AUTHORIZATION | Proprietário autoriza destino externo, controles, região, acesso e procedimento de exclusão/retensão |
| Restore descartável | 0256-E registrou integridade e restauração em banco descartável; não houve restore nesta campanha | PASS_SCOPE histórico | Repetir em alvo identificado como descartável e autorizado; comprovar leitura funcional e não tocar em `rotamoto`/`rotamoto_e2e` existentes |
| Restore independente/outro equipamento | Não comprovado em equipamento/host independente | BLOCKED_AUTHORIZATION | Disponibilizar host e alvo descartável autorizados; registrar identidade do alvo e aprovação prévia |
| `BACKUP_ADMIN_NOT_CONFIGURED` | Registro 0256-E reporta serviço administrativo não configurado/indisponível (503); campanha atual não reconfigurou serviço | BLOCKED_AUTHORIZATION | Provisionamento exige autorização específica e dono operacional; não tratar UI de indisponibilidade como sucesso |
| RPO | Não definido/medido | PENDING_OWNER | Proprietário aprova RPO e medição real com timestamps/fontes verificáveis |
| RTO | Não definido/medido | PENDING_OWNER | Proprietário aprova RTO e mede restauração completa em ambiente compatível |
| Monitoramento e recuperação de falha | Testes sintéticos anteriores de locks, interrupção e integridade; estado de produção não alterado | PASS_SCOPE / PARTIAL operacional | Prova operacional com alertas, operador e janela autorizados |
| Incidentes históricos | 0266 deixou quatro manifests de fixtures `RETAINED`, com limpeza posterior específica; limpeza não foi rollback automático. OpenSSL/ASN1 de 0264 não se reproduziu depois e causa permanece desconhecida | PARTIAL histórico | Tratar `RETAINED` como ressalva de lifecycle; manter teste ASN1 ativo e registrar se reproduzir |

## Procedimento para futura autorização

1. Abrir autorização separada especificando operador, janela, artefato, host e alvo descartável. Nunca autorizar restauração sobre `rotamoto`, `rotamoto_e2e` existente ou servidor oficial.
2. Definir RPO/RTO, proprietário do dado, mídia incluída, custodiante de chaves e destino externo. Manter segredos no cofre aprovado; não copiar chaves para o agente, issue, log ou captura.
3. Antes de qualquer leitura/restauração, demonstrar por identificador e configuração que o destino foi recém-criado para descarte, sem dados preexistentes; se houver dúvida, parar.
4. Validar manifesto/hash/versão, restaurar apenas nesse destino, verificar dados/isolamento e medir tempo. Registrar logs sanitizados e cleanup de artefatos temporários.
5. Confirmar limpeza do alvo descartável e readiness dos serviços afetados. Não remover cópias existentes para “testar retenção”.

**Não há autorização nesta campanha para habilitar backup de produção, acessar chaves, criar destino externo, restaurar banco ou mudar serviços permanentes.**
