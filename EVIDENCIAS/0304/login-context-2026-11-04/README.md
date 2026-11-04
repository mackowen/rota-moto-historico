# Login por e-mail e seleção de empresa — Campanha 0304

## Resultado

O adendo de UX/autenticação foi validado tecnicamente em branch local, mas não altera a classificação global da Campanha 0304: **PARTIAL; promoção operacional continua BLOCKED** pelos gates de isolamento e ativação já registrados. A seleção após login e o escopo das opções são PASS dentro dos testes executados; não há declaração de segurança global nem de publicação dos apps.

## Causa e correção

Restaurante e Motoboy exigiam `companyId` no formulário de login e podiam repor o valor de `localStorage.rotaMoto.activeCompanyHint`. Apagar dados do navegador removia o identificador necessário para iniciar a sessão. O backend agora aceita e-mail/senha (e MFA quando requerido), verifica primeiro a credencial, resolve vínculos ativos no banco, retorna opções somente após credencial válida e mantém a mesma resposta pública genérica para email inexistente e senha incorreta. O cliente não envia código/tenant no login nem usa hint local como autorização.

Um vínculo ativo é selecionado automaticamente. Múltiplos vínculos produzem seletor por nome; nomes repetidos recebem um sufixo curto derivado do ID apenas para desambiguação. A seleção operacional é validada por `/identity/tenant`. Superadministradores recebem contexto administrativo explícito e a UI mantém o shell operacional fechado até escolherem uma empresa já autorizada. Troca de sessão/logout limpa o contexto em memória e hints antigos. O contrato de sessão atual continua compatível com identificador legado explícito, que o servidor verifica contra membership.

A migration aditiva `0071_identity_login_company_options` foi aplicada somente ao banco descartável 0304B dos testes. PostgreSQL oficial, keystore, credenciais e dados de instalação não foram modificados. Nenhum e-mail foi enviado e não houve escrita persistente de fixtures (a suíte termina em `ROLLBACK`).

## Evidências

- `browser-qa.json`: perfil Chromium temporário novo; 6 fluxos (Restaurante/Motoboy em 390/768/1440 px), sem código no formulário, duas empresas de mesmo nome distinguidas por código curto, troca enviada ao servidor simulado, nenhum hint de tenant salvo e zero exceções JS. APIs de identidade foram simuladas; demais APIs retornaram 503 sintético. Sem autenticação real, mutação, envio externo ou dados de usuário.
- Capturas sintéticas: telas de login e seleção de empresa nos dois apps, viewport compacto 390 px.
- Teste `tests/test-identity-login-context-postgres.js`: executado no banco isolado 0304B com usuários/empresas sintéticos. Cobriu seleção automática de uma empresa, dois vínculos no mesmo usuário/email, falha de login indistinguível para conta desconhecida, ausência de opções antes de senha válida, escolha e troca autorizadas, rejeição de tenant estranho e invalidação após logout. Fixtures transacionais revertidas.
- Suites completas `npm test`: Restaurante PASS e Motoboy PASS, com asset check. Testes direcionados de migration e UI também PASS.

## Limites e classificação

| Gate | Estado | Escopo comprovado |
|---|---|---|
| Login sem código em storage limpo | PASS técnico | Perfil Chromium novo e backend simulado; sem teste em dispositivo do proprietário |
| Opções por vínculo / email compartilhado | PASS técnico | Banco descartável, leitura autenticada após senha e rollback |
| Não enumeração | PASS técnico | HTTP 401 e payload genérico idênticos para senha incorreta e email não cadastrado; sem opções |
| Troca/expiração de sessão | PASS técnico | Escolha autenticada, tenant alheio 403, logout seguido de sessão 401 |
| Contexto administrativo global | PARTIAL | Gate do shell e escolha explícita verificados em código; sem Browser QA de superadmin autenticado |
| Isolamento multi-tenant total | PARTIAL/BLOCKED | Mantém os gates de RLS/backend/frontend e G14 anteriores; branches locais não foram promovidas |
| Compatibilidade e persistência em oficial | PARTIAL | Migration aditiva e contrato legado mantido; oficial não migrado nem alterado |

## Commits e publicação

- Restaurante: `f85d5bc` (`feat(identity): resolve company context after email login`), branch `codex/campaign-0304-browser-bootstrap`, commit local.
- Motoboy: `3bcd9cb` (`feat(identity): choose company after email login`), branch `codex/campaign-0304-account-security`, commit local.
- Push desta atualização permitido somente neste repositório de histórico. Nenhum push de aplicativo.

G14 e backlog permanecem preservados. Campanha 0304 continua aberta e não se inicia 0305.
