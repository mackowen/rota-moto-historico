# Pendências e estado do lote

## P0 Lote 1

- Antes: 52 itens (25 PARTIAL, 18 BLOCKED, 9 PENDING), zero PASS.
- Agora: 52 itens; 1 PASS específico, 24 PARTIAL, 18 BLOCKED, 9 PENDING. **51 permanecem não PASS.**
- Único item encerrado: `LEGACY-0304-E2E-AUTH`, limitado à prontidão/reload do browser e navegação autenticada Home↔Rotas com sessão válida. Nenhum outro P0 foi reclassificado.

## Ainda aberto

- Configurações: somente um fluxo empresarial de escrita/readback/reload foi exercitado; inventário completo de campos, autosave, drafts, offline e login em nova sessão pendente.
- Identidade/RBAC: convite completo (aceite/expiração/cancelamento/reenvio), criação/edição de perfil completa, associação/revogação em todas as telas e catálogo inteiro pendentes.
- Concorrência: uma edição de configuração foi validada com 200/409 entre sessões; operações concorrentes restantes pendentes.
- Motoboy: autenticação, MFA, vínculo canônico, reload e logout comprovados; preferências com escrita/releitura e toda jornada operacional não cobertas.
- Integração: este lote valida identidade/sessão e sync pull/driver binding em escopo limitado; ciclo de pedido/dispatch/aceite/coleta/entrega pertence ao Lote 2 e não foi iniciado.
- PostgreSQL persistente: `rotamoto` e `rotamoto_e2e` seguem 0061; migrations 0062/0063 estão apenas no DB descartável 0304B. Promoção para persistentes não foi executada, pois esta execução não modificou os schemas persistentes e não incluiu procedimento de recuperação para essa promoção. A paridade persistente permanece pendente; não tocar em founder/grants.
- Browser: apenas 390×844 claro no Chromium isolado; Android físico, múltiplos viewports/temas e todos os painéis continuam sem prova nesta parte.
- Dependências externas/históricas de SMTP, recuperação de chaves, restore/offsite e homologação comercial continuam abertas conforme o backlog fonte.

Estado global do Lote 1: PARTIAL. Não iniciar Lotes 2–6 ou 0305. G14 permanece FAIL.
