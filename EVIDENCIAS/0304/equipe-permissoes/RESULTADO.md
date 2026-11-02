# Equipe e permissões — Campanha 0304

Data: 2026-11-01. Resultado geral: **PARTIAL**.

## Alterações

No Restaurante, `identity-ui.js` reorganiza a administração em resumo da equipe e seções separadas para Integrantes, Convites e Perfis e permissões. Os detalhes de membros e perfis ficam recolhidos até serem abertos. Estados de conta e vínculo são apresentados separadamente. Convites expirados são distinguidos dos pendentes com token válido; `backend/admin/repository.js` inclui somente `invitationExpiresAt` no DTO da membership, filtrado pelo usuário e empresa ativos, sem retornar token ou credencial. `identity-ui.css` compacta as linhas e preserva controles acessíveis. `admin-form-dialog.js` mantém o descarte de alterações no mesmo diálogo e restaura o foco.

As ações de função, vínculo e convite exigem ACK válido e releitura do servidor antes de comunicar sucesso. As opções continuam limitadas pelas permissões delegáveis do operador; perfis protegidos e o acesso administrativo próprio continuam bloqueados para edição indevida. A autoridade final permanece no backend.

## Causa reproduzida

A página montava convites dentro da área de Motoboys, sem seção própria, e os detalhes de membros/perfis eram apresentados em cartões expansivos altos. Depois que o diálogo movia formulários para fora de seus elementos `<form>`, a busca do botão de envio e a associação pelo atributo `form` não eram tratadas em todos os estados de carga. O atributo `hidden` dos botões também podia ser sobreposto pelo `display:flex` da regra de ações, deixando controles visíveis atrás da confirmação de descarte.

## Evidência e limites

- Testes direcionados de UI, diálogo e DTO passaram; detalhes em [TESTES.md](TESTES.md).
- A shell publicada em 8083 abriu em Chromium/CDP temporário a 390×844, sem exceção JS ou overflow; o único 401 observado foi a consulta de sessão anônima esperada. Esse ensaio **não é autenticado** e não comprova operações protegidas da Equipe.
- Não foi disponibilizada uma identidade de QA autorizada para Chico Restaurante. O Browser QA autenticado de convite, vínculo e perfil fica **BLOCKED**; não foram injetados tokens/sessões, usados perfis pessoais, criadas empresas ou alterados bancos.
- Não há capturas autenticadas desta tela; a aprovação visual final depende do proprietário no Chrome Android.

## Publicação e Git

Commit local Restaurante: `60e780c` (`feat: organize team and permission administration`). Motoboy não recebeu alterações. Nenhum push de aplicativo.

Os hashes HTTP e readiness foram comparados com o checkout atualizado; consulte [TESTES.md](TESTES.md). O serviço E2E da API 8787 foi reiniciado de forma controlada para carregar o repositório atualizado. Bancos, migrations, empresas, founder, MFA e grants não foram alterados.

Os IDs canônicos `RM-0256C-TEAM-RBAC`, `RM-0256C-DRIVER-LINK-UI` e `RM-0259-IDENTITY-INVITE-LIFECYCLE` continuam **PARTIAL**. Esta execução acrescenta cobertura de componente/DTO, mas não substitui Browser QA autenticado nem encerra os critérios de concorrência e ciclo de convite.
## Adendo corretivo — ciclo autenticado de convites, e-mail e permissões (2026-11-02)

A afirmação anterior de ausência de identidade de QA é histórica e foi substituída pela execução autenticada registrada em [CONVITES-E-MAIL-RBAC-20261102.md](CONVITES-E-MAIL-RBAC-20261102.md). Foi reutilizada a fixture auditada qa-saneamento-0304-20261031@rotamoto.invalid, vinculada a Chico Restaurante, sem criar empresa ou identidade persistente. Chromium/CDP 390×844 passou por criação e readback de perfil limitado, negativas de RBAC, convite, reload, reenvio, revogação, expiração, aceitação e rejeição de replay; o banco voltou ao estado anterior por rollback.

O runtime não tem provedor SMTP/API: o fluxo sem provedor respondeu 503 e preservou o rascunho; as 5 mensagens capturadas foram exclusivamente pelo sink sintético. Portanto, criação/aceitação interna recebeu PASS no escopo executado, mas entrega real de e-mail permanece BLOCKED. Concorrência entre sessões DB independentes e associação operacional no Motoboy não foram exercitadas; os três IDs canônicos continuam PARTIAL. Correções locais no Restaurante: 97c84ae; nenhum código do Motoboy alterado. API 8787 reiniciada controladamente; readiness e hashes HTTP conferidos. G14 permanece FAIL.
