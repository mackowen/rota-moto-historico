# Identidade, MFA e RBAC

- Bootstrap first-install: teste HTTP real com banco vazio usou a rota oficial e autorização de uso único; segundo bootstrap não criou outro founder. Repetição/idempotência e conflito passaram.
- Fundador existente: cenário separado preservou a conta/latch/grant e negou segundo founder/owner indevido.
- MFA: login de fixtures sintéticas pelo fluxo normal no HTTP e no Chromium; não foram inseridas sessões privilegiadas diretamente no banco.
- RBAC positivo/negativo: Super ADM consultou escopo global permitido; administrador empresarial alterou somente o recurso permitido; usuário limitado recebeu negação; perfil owner protegido não sofreu mutação.
- CSRF: request inválido negado; retry legítimo após obtenção de CSRF concluiu logout.
- Concorrência: duas sessões autenticadas usaram a mesma revisão; a atualização válida recebeu 200, a obsoleta 409; readback confirmou somente o estado aceito.
- Isolamento: duas empresas de fixture; tentativas cross-tenant e acesso a dados fora de escopo foram negados sob RLS, sem bypass.

O founder persistente do banco `rotamoto_e2e` não foi autenticado, modificado nem usado como fixture. Os testes demonstram o contrato sintético em banco descartável, não a conta real ou todas as operações do catálogo RBAC. Nenhum MFA/RLS/CSRF/grant foi desabilitado.
