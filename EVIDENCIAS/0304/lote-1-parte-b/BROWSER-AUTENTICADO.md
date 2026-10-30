# Browser QA autenticado

## Método

Chromium/CDP em perfil temporário isolado, 390×844, tema claro. O harness carregou o checkout atual dos dois aplicativos por proxy temporário e chamou handlers/serviços reais ligados à fixture PostgreSQL descartável. Login e MFA foram concluídos por fluxos de aplicação com identidades sintéticas; não houve cópia de sessão pessoal. O harness não usou os nginx 8083/8084 como origem e não é confirmação física Android.

Relatório sanitizado: [`browser/browser-qa-authenticated.json`](browser/browser-qa-authenticated.json). Capturas: Restaurante autenticado, Super ADM, Equipe, Configurações com persistência e Motoboy autenticado. `restaurante-configuracoes-persistencia-falha.png` é uma captura diagnóstica de asserção obsoleta do harness, não uma falha final do produto.

## Jornadas que passaram

- Restaurante: login + MFA, sessão, Home → Rotas → Home com sessão 200 após cada navegação, Configurações/Company Profile, alteração de nome sintético, ACK, readback canônico e reload; gravação com revisão antiga rejeitada em 409; Super ADM e Equipe carregados. Lista administrativa verificou Empresas, Usuários, Vínculos e Configuração da plataforma. Não se afirma cobertura visual completa dos seis painéis: Perfis/Permissões e Resumo financeiro não foram percorridos como telas completas.
- Motoboy: login + MFA, vínculo Driver canônico autorizado, consulta de disponibilidade/fila, reload preservando sessão e identidade, logout pela UI (204) e consulta de sessão posterior (401).
- Sem erros de console. Erros 401 de consultas em voo ocorreram somente depois do logout; um 403 do primeiro POST de logout acionou retry CSRF, concluído com 204. Ambos são registrados para não ocultar a sequência.
- Capturas são evidência de UI com fixture sintética autenticada; não provam identidade, dados ou experiência do proprietário.

## Limites

Um viewport/tema foi executado; cobertura responsiva multi-viewport/tema e Chrome Android físico não fazem parte deste PASS. A navegação administrativa completa, convites e CRUD integral de usuários/perfis permanecem pendentes. O browser não visitou os hosts publicados 8083/8084 nesta campanha.
