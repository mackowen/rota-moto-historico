# Contratos de API — T7-02

Endpoints lidos no código: GET `/api/platform-admin/users` e GET `/api/platform-admin/memberships`; ambos exigem sessão, MFA recente e Super ADM ativo no middleware. O serviço PostgreSQL retorna envelope `{items, requestId}`.

DTO de usuário em migration: `id`, `email`, `email_verified`, `disabled`, `created_at`, `company_count`, `platform_admin`. A interface consome o subconjunto explicitamente necessário e aceita snake_case/camelCase. DTO de vínculo: `id`, `company_id`, `company_name`, `user_id`, `email`, `status`, `role_name`, `has_driver_link`.

**Causa raiz comprovada:** `loadPlatformAdmin()` criava `companies=raw.map(platformCompany)` antes de selecionar o presenter da seção. Um usuário ou vínculo corretamente retornado não contém `name/status` de empresa e era recusado como `INVALID_RESPONSE`. Agora os DTOs são normalizados somente pelo presenter próprio de cada seção. Nenhum campo foi tornado opcional para mascarar resposta inválida.

`test-platform-admin-http.js` exercita o handler com respostas sintéticas contendo os campos reais em snake_case; `test-platform-admin-ui.js` impede regressão da ramificação. Ambos PASS. O CDP sem sessão obteve 401 nos dois endpoints; por isso a conferência de dados reais fica BLOCKED, não PASS.
