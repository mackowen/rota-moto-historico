# Pendências e bloqueios

IDs herdados não são encerrados nesta lista. Ver `CHECKPOINT-INICIAL.md`, `PENDENCIAS.md`, `BACKLOG_MESTRE.md` e registros por campanha para a lista autoritativa desde 0257.

1. **DB-01 / bootstrap positivo** — requer ambiente validamente vazio separado ou mecanismo oficial que não altere o E2E persistente; provar first claim/idempotência sem remover fundador.
2. **Membership empresarial do fundador** — leitura normal depende de contexto autenticado de empresa; leitura sem contexto foi bloqueada por RLS e não será contornada.
3. **Super ADM positivo** — sessão autenticada com MFA recente necessária para testar console, escopo multiempresa, financeiro, readback e revogação.
4. **DB-02** — principal está em 0055, E2E em 0061; depende DB-01 PASS. Migrations pendentes não aplicadas.
5. **Configurações/RBAC** — exercitar todos os campos, cancelamento/draft, save, feedback, reload, conflito otimista, tentativa de grant superior, CSRF inválido e MFA no browser autenticado.
6. **Browser UI-01** — percorrer todas as rotas, subpainéis e modais em 320/390/768/1024/1440, claro/escuro, scroll integral, estados vazio/erro/offline e preservar screenshots de antes/depois.
7. **Integração INT-01** — testar ciclo completo em duas sessões autorizadas, incluindo despacho, aceite, rota múltipla/reorder, coleta, conclusão, offline/reconnect e concorrência cross-app.
8. **PWA-01** — browser real comprovar atualização de instalação anterior e uso offline em cada app; testes atuais são harness de SW e probe temporário.
9. **Regressão RLS** — executar full data-plane test em ambiente que permita fixtures com rollback efetivo, sem deixar tenants sintéticos permanentes; o schema-only read-only atual não substitui cobertura de dados.
10. **G14** — manter FAIL até aprovação visual expressa do proprietário. 0304 aberta; 0305 não iniciada.
