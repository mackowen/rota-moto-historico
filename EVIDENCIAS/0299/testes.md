# Testes e evidências — campanha 0299

- `node --check app.js`: PASS.
- `node --check dashboard-v2.js`: PASS.
- `node tests/test-dashboard-v2.js`: PASS (escaping, datas indisponíveis, ações desativadas, saída, isolamento/RBAC e breakpoints).
- `node tests/test-dashboard-semantics.js`: PASS (analytics e semântica atual preservada).
- `node tests/test-visual-shell-cache.js`: PASS após atualizar chaves 0299 e assets da POC.
- `node tests/test-printing-offline.js`: PASS após incluir assets no shell offline.
- `node tests/test-dispatch-assignment.js`: PASS após atualizar o cache busting do app.
- Browser Chromium/CDP: URL preview sem sessão não renderizou a POC; sessão backend-issued com `mfaVerified=true` e Company ativa abriu; sair voltou ao Início atual.
- Capturas nos tamanhos 320, 360, 390, 430, 600, 768, 1024, 1280, 1440 e 1920 px; claro/escuro em 320–430 e escuro nos tamanhos maiores. 1024×768 e 768×1024 cobrem paisagem/retrato de tablet.
- Browser report: zero exceções JS e zero erros de assets estáticos. Ver `browser-report.json`.
- Fixture E2E `rotamoto_e2e`: `databaseCommitted=false`, `cleanup=COMPLETED`, `tenantScopedResiduals=0`.
- Conteúdo das capturas preenchidas é sintético de apresentação e foi aplicado ao DOM/componente pelo runner; nenhuma entidade foi criada ou persistida.
- Runner usa Chromium instalado e CDP. Capturas são complementadas por asserções de autenticação, MFA, rota, layout, overflow e retorno à tela atual.

## Não executado

- Operações mutáveis, impressão física, QR e submissão de nova corrida: preview read-only. A criação encaminha ao fluxo existente; print/QR ficam desabilitados.
- Persistência de negócio, sync concorrente, identidade sem permissão e cross-app Motoboy: fora do escopo da POC isolada.
- Aprovação visual humana e Chrome Android físico: pendentes.
- Resultado da suíte integral `npm test` está no REGISTRO 0299.
