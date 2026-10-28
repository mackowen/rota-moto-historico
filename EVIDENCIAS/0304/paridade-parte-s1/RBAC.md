# RBAC e administração

- O Restaurante separa o perfil empresarial (`permissions` scoped por empresa) do flag `platformAdmin`; as categorias globais aparecem em rota separada, não como grant delegável do editor local.
- `company.manage` habilita as telas empresariais de equipe, motoboys e integrações. O editor protegido do owner e o catálogo completo são cobertos por testes de UI/HTTP em contexto sintético.
- APIs protegidas exigem sessão; mutações verificam CSRF e as rotas sensíveis podem exigir MFA recente. RLS continua FORCE; nenhum bypass foi usado.
- `test-identity-http-postgres.js`: PASS para sessão, CSRF, tenant/RLS, recuperação MFA, grants/permissões e convite em fixtures revertidas. A parte bootstrap persistente verifica segundo bootstrap negado e estado do fundador inalterado.
- `test-platform-admin-postgres-e2e.js`: PASS nas negativas de leitura global/financeira sem contexto; PARTIAL na operação positiva MFA do Super ADM por falta de sessão real. Fundador/grant preservados.
- `test-integrated-founder-bootstrap-postgres.js` e `...service-postgres.js`: PARTIAL no branch persistente, sem reset. Primeiro bootstrap e replay positivo continuam cobertos apenas no caminho isolado de instalação vazia, não executável neste E2E.
- Não se realizou concessão ou revogação de permissão real.

**CFG-01 / console global: PARTIAL.** Falta sessão autenticada em browser e operador autorizado para provar edição/delegação, MFA, auditoria e readback ponta a ponta.
