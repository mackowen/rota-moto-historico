# Pendências restantes — Lote 1

1. 52 itens P0 triados: 25 PARTIAL, 18 BLOCKED, 9 PENDING; zero atendido integralmente neste ciclo.
2. Obter sessão legítima de teste com MFA para QA do console e da persistência via interface. A atual execução não tinha sessão ativa; não reutilizar credenciais/cookies pessoais nem contornar MFA.
3. E2E atual tem founder global latch/grant, mas não tem empresa/membership (0/0). Diagnosticar de forma autorizada antes de qualquer alteração do founder; não inferir que o grant global equivale a owner empresarial.
4. Executar primeiro-bootstrap em ambiente realmente vazio e isolado. O teste foi mantido fora do E2E persistente para preservar o fundador.
5. Executar `test-postgres-migrations.js` somente quando existir alvo descartável autorizado; a suíte recusa o E2E persistente. Nenhuma database foi criada nesta execução.
6. QA authenticated no Chrome com sessões reais positivas e negativas, readback e reload/new-session de todas as categorias de Configurações.
7. Verificar no plano do lote as operações de e-mail externo/recuperação, keystore, hardware Android e confirmação física do proprietário; os testes locais não comprovam esses serviços.
8. Testar alteração de settings em sessão autenticada nova: a sessão E2E atual não está ativa, e os fluxos sintéticos não substituem essa validação.
9. Manter backlog canônico e contagens sem redução: nenhum critério de P0 foi fechado.

Campanha 0304 aberta; G14 geral FAIL; 0305 não iniciada; lotes 2–6 não iniciados.
