# Auditoria pós-ativação e isolamento — 2026-11-04

## Classificação

**Campanha: PARTIAL. Segurança de cache: FAIL reproduzido no código anterior; correção PASS em branch local e Browser sintético. Promoção operacional: BLOCKED até publicação e revalidação no dispositivo do proprietário.** G14 continua FAIL e o backlog anterior permanece inalterado.

## Proveniência dos registros observados

- O histórico registra limpeza anterior de `rotamoto` e `rotamoto_e2e` antes da primeira instalação. Essa limpeza não foi repetida nesta auditoria.
- No PostgreSQL oficial atual, consultado como `rotamoto_app` em contexto de sessão/tenant e respeitando RLS, existe uma empresa e vínculo ativo do fundador; não há `domain_records`, `delivery_fulfillments` nem `driver_availability` visíveis nesse tenant. `rotamoto_e2e` permanece sem dados de negócio.
- A consulta de catálogo confirmou 43/43 relações com RLS e FORCE RLS no banco oficial e políticas instaladas. A matriz tenant negativa foi executada em base descartável 0304B (catálogo até migration 0063): dados sintéticos de dois tenants não atravessaram RLS; fixtures foram removidas e ausência verificada.
- Os dois aplicativos carregam dados operacionais locais de IndexedDB. Antes da correção, os caminhos de restauração autenticada aceitavam registros locais sem exigir correspondência exata do tenant; Motoboy também não exigia correspondência do vínculo do motorista. Service workers só armazenam o shell estático e excluem `/api/`. O defeito comprovado é, portanto, uma origem local persistida plausível e reproduzível. A origem dos dois registros específicos não foi diretamente observada no perfil/dispositivo original; não se apagou o cache para preservar essa evidência.

## Contrato de acesso global

O administrador global autenticado com MFA pode consultar metadados de empresas, usuários e vínculos, configurações seguras e agregados financeiros por empresa, além de operações administrativas limitadas e auditadas (por exemplo, status da empresa/usuário e permissões). As rotas não autorizam leitura operacional global de pedidos, entregas, endereços ou rotas; essas tabelas continuam tenant-scoped por RLS. A listagem global de memberships retorna zero no estado examinado: há uma inconsistência na função de listagem, aparentemente relacionada à visibilidade de `roles` sob FORCE RLS. É falha de disponibilidade/visibilidade administrativa, não prova de vazamento, e segue pendente.

## Correções locais

- Restaurante: filtro fail-closed da projeção em memória por empresa antes do primeiro render; registros legados sem tenant permanecem locais e não são atribuídos ao tenant atual. O filtro não limpa nem altera as linhas do IndexedDB. Falhas de restauração agora produzem estado visível em vez de shell vazio.
- Motoboy: filtro da projeção em memória por empresa e motorista antes do render; registros sem vínculo correspondente não são mostrados nem alterados pelo caminho de sessão sem motorista. O filtro não limpa nem altera as linhas do IndexedDB. A interface mostra explicitamente “Ativação do Motoboy pendente”.
- Bootstrap pós-login agora mantém o shell oculto durante restauração; no Motoboy, o antigo invólucro inativo usava `visibility:hidden` e deixava uma superfície vazia no layout. O commit anterior `ab0e7f0` troca isso por ocultação efetiva e mantém o gate explícito do vínculo.
- Ativação de convite agora agenda notificação transacional mínima após a ativação já confirmada, sem senha, token ou MFA. Falha de entrega não reverte ativação; o token de convite consumido impede duplicação em retry/login. A configuração SMTP local pode enviar a notificação sem URL pública de convite.

## Gates e limites

| Área | Estado | Evidência |
|---|---|---|
| Integridade da limpeza anterior | PARTIAL | Procedimento/histórico consultados; estado atual lido sem limpeza; origem exata das duas linhas locais depende do dispositivo original. |
| Isolamento PostgreSQL | PASS (base descartável) | RLS/FORCE RLS; fixtures de dois tenants; leitura/escrita cruzada negada; fixtures removidas. Banco oficial consultado somente em leitura. |
| Autorização backend | PARTIAL | Rotas operacionais e RLS respeitam tenant; acesso global é limitado, mas listagem global de memberships falha fechada e precisa correção/revalidação. |
| Isolamento frontend/cache | FAIL histórico; PASS local | Regressões unitárias e Browser sintético provaram filtragem entre tenant A/B e motorista; aplicação ainda não publicada no runtime do proprietário. |
| Pós-ativação | PARTIAL | Gate do motorista e regressões validam estado pendente; o perfil/dispositivo original não foi limpo nem inspecionado diretamente. |
| Notificação de ativação | PARTIAL | Transporte SMTP fake local validou mensagem mínima e ausência de token/link. Teste HTTP PostgreSQL não completou: base 0304B está no schema 0063 e o serviço respondeu 503 antes da pré-condição esperada (403). A incompatibilidade de schema é limitação plausível, não causa confirmada; não migramos a base. Nenhum e-mail real foi enviado. |
| Superadministrador | PARTIAL | MFA exigido e dados operacionais não são globalmente expostos por RLS; endpoint de memberships não lista o vínculo ativo, defeito pendente. |

Testes: `npm test` Restaurante e Motoboy; `assets:check`; `node tests/test-dashboard-v2.js`; `node tests/test-smtp-mail-provider.js`; RLS E2E em 0304B; Browser CDP com IndexedDB e API sintéticos (tenant A, tenant B, vínculo ausente); todos passaram, exceto o limite explícito do teste HTTP acima. Browser report e capturas anexos usam somente fixtures sintéticas. O teste HTTP falhou na pré-condição de autorização (503 vs 403); nenhum e-mail saiu e a transação de integração não foi aprovada. Não se afirma validação end-to-end da notificação.

Arquivos alterados somente em branches locais de Restaurante e Motoboy. Nenhuma migration, escrita no banco oficial, limpeza de cache, reassociação, envio real, instalação ou alteração de credencial foi realizada.
