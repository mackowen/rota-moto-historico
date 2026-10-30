# Identidade, sessão, MFA e RBAC

- `rotamoto_e2e`: leitura agregada confirmou founder latch íntegro e exatamente um grant global ativo pertencente ao usuário latched. Nenhum identificador pessoal foi registrado.
- O E2E tinha zero sessões não expiradas, zero sessão com MFA recente, zero membership e zero empresa. Assim, não foi possível testar acesso real autenticado ao Super ADM nem confirmar vínculo empresarial do founder. Isso foi mantido como lacuna; nenhum grant, usuário ou vínculo foi alterado.
- `test-identity-postgres.js` e `test-identity-http-postgres.js` passaram em fluxos sintéticos com rollback, cobrindo credencial, sessão, MFA, recuperação, CSRF, convites, autorização e tenant. A ramificação de first-install não foi executada porque há fundador persistente.
- `test:e2e-platform-admin` preservou o estado global e passou nos testes negativos de autorização; teste positivo MFA-autenticado permaneceu não executado. `test:e2e-tenant-isolation` passou.
- Nenhuma sessão privilegiada foi falsificada; nenhum MFA, CSRF, RLS, latch ou grant foi enfraquecido.
