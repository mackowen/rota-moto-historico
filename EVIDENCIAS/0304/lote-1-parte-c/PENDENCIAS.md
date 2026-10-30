# Pendências — Parte C

- **P0 geral:** 51 dos 52 itens iniciais continuam sem critério canônico integral encerrado. A correção LC-MOTO-SETTINGS-QUEUE-01 é um subdefeito dentro de persistência; `RM-D1-SETTINGS-SAVE` continua PARTIAL até cobrir critérios restantes.
- **Configurações Restaurante:** round-trip individual de endereço, logística, segurança, aparência, integrações, backup, frota e demais campos permanece pendente.
- **Configurações Motoboy:** round-trip de aparência autenticado não foi comprovado porque a navegação para Ajustes no harness não ativou a tela; testar idioma, mapa, disponibilidade, entregas e escopo por campo.
- **Equipe/RBAC:** ciclos completos de convite, associação, CRUD de perfil e alterações por duas sessões não foram executados integralmente nesta parte.
- **Super ADM:** testes de contrato/regressão passaram; homologação de todas as operações administrativas/financeiras permanece aberta.
- **Browser:** QA Parte B é sintético autenticado e limitado. Na Parte C login/MFA e sessão após reload passaram, mas o harness não ativou Ajustes e não provou o round-trip visual. Chrome Android físico depende do proprietário.
- **Migrations:** 0062/0063 continuam apenas no banco descartável; promoção exige gate separado.

Campanha 0304 continua aberta; G14 permanece FAIL; 0305 e Lotes 2–6 não iniciados.
