# Pendências e gates

- **T01 — PARTIAL**: atribuição usa binder único e DOM testado; validação Browser QA autenticada ainda ausente.
- **T02 — PARTIAL**: fluxos QR/impressão têm contratos/serviços testados; tamanho em dispositivo e impressão real do navegador em tela autenticada sem QA visual.
- **T03 — PARTIAL**: distribuição manual segue funcional e protegida, mas esta execução não comprova todos os estados visuais/autenticados; E2E PostgreSQL de despacho concorrente passou.
- **T04 — PARTIAL**: filtros de mapa DOM e acessibilidade testados; combinação com datasets reais em Browser QA e aparência visual pendentes.
- **T05 — BLOCKED/PARTIAL**: borda fantasma e modal de filtros com toque externo não tiveram causa reproduzível; não havia modal de filtro correspondente no fluxo inspecionado.
- **T06 — BLOCKED**: navegação visual nos viewports e safe-area requer Browser QA autenticado; testes de contrato automatizados passaram.
- **T07 — BLOCKED**: disponibilidade autenticada no Browser QA continua indisponível; sem alegação de aprovação visual.

O fluxo real de distribuição e a suíte completa não possuem falhas conhecidas nesta execução. G14 permanece **FAIL** até aprovação visual expressa do proprietário; Parte T.1 global permanece **PARTIAL**.
