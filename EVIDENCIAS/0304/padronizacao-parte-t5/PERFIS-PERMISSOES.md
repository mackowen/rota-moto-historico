# Perfis e permissões — ADM-09–ADM-16

O catálogo exibido é o retornado por `permission_catalog`; grants referenciam exclusivamente chaves desse catálogo. Um DTO que omite chave concedida ou contém catálogo vazio/duplicado falha fechado com mensagem de resposta incompatível. As opções são agrupadas pelo domínio da chave, recebem descrição legível, estado “Concedida neste perfil”/“Não concedida neste perfil” e ficam ligadas ao perfil e à empresa consultados.

O perfil `owner` e qualquer perfil marcado `protected` têm fieldset desabilitado e explicação visual. A barreira final continua no SQL/API; a interface não altera o papel owner nem modifica perfil real para teste. Super ADM é apresentado fora do escopo do RBAC empresarial. O endpoint não fornece concessões herdadas/temporárias nem origem efetiva de permissão por sessão; a tela não as inventa e explica esse limite.

Perfis delegáveis possuem estado de alterações pendentes, Cancelar e Salvar. `finance.manage` seleciona `finance.read` conforme dependência já exigida pelo backend. Antes do PATCH, a tela relê o perfil e compara as permissões atuais com a versão carregada; após PATCH, relê novamente e só confirma quando o conjunto persistido coincide. CSRF, MFA, auditoria e proteção owner permanecem ativos.

**Limitação ADM-16:** o contrato atual não possui revision/ETag nem compare-and-swap no endpoint. O preflight reduz atualização sobre dado já obsoleto e a releitura detecta divergência posterior, mas uma corrida entre preflight e PATCH só pode ser eliminada pelo backend com revisão transacional. Não foi introduzida uma revisão fictícia nem alterado o endpoint nesta parte. Esse item permanece PARTIAL.

A suíte HTTP sintética cobre RBAC/MFA/CSRF e asserções existentes. Sem sessão real, não foi executado o ida-e-volta autenticado no console, nem uma tentativa real acima do nível do operador.
