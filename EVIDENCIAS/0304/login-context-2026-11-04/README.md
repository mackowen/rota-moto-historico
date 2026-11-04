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

## Incidente de login oficial — 2026-11-04

Diagnóstico read-only: o frontend servido em 8083/8084 corresponde ao código atualizado (hashes do `identity-ui.js` registrados no JSON). A API oficial em 8788 está respondendo. A consulta anônima `GET /identity/session` devolveu o esperado `401 UNAUTHENTICATED`; o status público de Bootstrap diz `complete`, mas esse indicador é amplo e não garante a migration 0071.

O processo `rotamoto-api-official` já estava em execução há cerca de 5h50 quando consultado. Os arquivos do backend no root configurado foram modificados depois do início do processo. Nos logs do mesmo serviço há três POSTs `/api/identity/login` com `400 INVALID_INPUT` em 02:14:15, 02:14:32 e 02:15:02 e um `401 INVALID_CREDENTIALS` em 02:14:48. Logs não guardam corpo, email, identidade ou ID de tentativa que permita atribuir cada registro diretamente ao proprietário; não foram lidos dados privados para associá-los.

O código anterior (`791f494`) valida a senha e, depois, exige `companyId` UUID; ausente, `validateUuid(undefined)` lança `INVALID_INPUT` antes de consultar membership ou verificar MFA. Portanto, os 400 são compatíveis com o contrato antigo do backend, e o formulário novo fica preso ao contexto técnico removido. O 401 isolado não pode ser atribuído e permanece indistinguível entre email/senha inválidos, conta não autorizada ou outra tentativa. Não se concluiu que falta vínculo. Nenhuma sessão é criada pelo caminho 400.

O ledger oficial confirma a última migration como `0070_founder_mfa_audit_actor_kind`; `0071_identity_login_company_options` e sua função estão ausentes. Isso é um segundo bloqueio: reiniciar o processo sozinho carregaria código que chama uma função inexistente e converteria o login em falha interna. As tabelas de membership/empresa/perfis verificadas mantêm RLS e FORCE RLS; a consulta foi READ ONLY e rollback. O registro global `platform_administrators` tem RLS desativado e runtime somente leitura; nenhuma linha foi consultada nem essa política foi alterada, mantendo a revisão dentro do gate anterior.

Correção local: ambos formulários distinguem o `400 INVALID_INPUT` sem código MFA e orientam o operador a atualizar o serviço, sem sugerir troca de senha e sem adicionar tenant id. Browser QA de perfis limpos simulou exatamente o 400 em ambos apps, mobile/tablet/desktop (12 cenários), com zero overflow/exceções; não fez autenticação, consulta externa ou escrita. `npm test` completo passou nos dois apps; teste PostgreSQL descartável de múltiplos vínculos/não enumeração/troca/logout passou com rollback.

**Causa classificada:** backend oficial em memória desatualizado + migration oficial 0071 ausente. Frontend transmite corretamente o novo contrato; a mensagem genérica era uma lacuna de feedback. MFA e vínculo do proprietário não foram a causa demonstrada. A migration é aditiva e seu down remove função/policies, mas não foram validados backup/janela de manutenção nem liberado o gate de segurança; por instrução, não foi aplicada, e o processo API não foi reiniciado. Login oficial permanece **BLOCKED**, não validado. Nenhuma senha/token foi lido, nenhuma tentativa real foi feita por esta execução.

Commits locais de UX: Restaurante `c97d007`; Motoboy `9da9e6c`. Evidência técnica sanitizada: [`runtime-compatibility-diagnostic.json`](runtime-compatibility-diagnostic.json). Sem push dos aplicativos; somente o histórico pode ser publicado.
