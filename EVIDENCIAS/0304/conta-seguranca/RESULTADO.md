# Conta e segurança — Campanha 0304

**Resultado do escopo implementado: PASS em Browser QA sintético autenticado.** A varredura preventiva de todas as seções de Configurações e a homologação no Chrome Android físico não fazem parte do que foi comprovado; a Campanha 0304 continua aberta, G14 permanece FAIL e 0305 não foi iniciada.

## Correções

- Restaurante e Motoboy usam fluxos de conta com confirmação real do backend: senha atual obrigatória, validação da nova senha, preservação dos campos em rejeição e feedback após ACK.
- Troca de senha serializa a operação da identidade e encerra as demais sessões sem invalidar a sessão usada para confirmar a mudança. MFA atual continua necessário.
- A substituição de MFA exige reautenticação com senha e TOTP atual; o segredo ativo não é retornado novamente. O novo fator permanece pendente até confirmação do código.
- Cancelamento de enrollment limpa o estado pendente sem alterar o fator ativo.
- O fluxo de recuperação usa o mecanismo disponível no ambiente sintético e um sink de email de teste; não se declara entrega por SMTP real.
- A corrida de leitura da sessão foi corrigida: invalidação de login/logout/MFA avança a geração, impede que uma resposta antiga sobrescreva o estado novo e preserva o single-flight apenas para a geração corrente.
- Corrigida a reanexação da página Conta e segurança após logout/login no Restaurante. A substituição do conteúdo do app ao encerrar uma sessão antes deixava a página desconectada; o login subsequente falhava ao consultar controles inexistentes.

## Validação

Browser QA via Chromium/CDP isolado executou autenticação real contra a API E2E com identidade sintética vinculada a Chico Restaurante. Na interface do Restaurante: leitura da identidade; senha atual inválida rejeitada (HTTP 400) com rascunho preservado; duas trocas de senha aceitas (HTTP 200), com reload entre elas; substituição de autenticador revalidada, enrollment e confirmação; logout (204); solicitação de recuperação (202) e consumo do token sintético (204); novo login com senha recuperada e TOTP novo, sessão MFA verificada e página de Conta reaberta. Nenhuma chave MFA ativa foi exibida ou copiada da sessão.

No Motoboy: identidade e vínculo de entregador lidos; senha atual inválida rejeitada (400); duas trocas aceitas (200), reload, logout (204) e novo login/MFA; vínculo e estado de conta permaneceram corretos. Requisições funcionais de disponibilidade, fila e sincronização responderam 200.

Capturas de ambas as interfaces, com identidade sintética `example.invalid` e dados de fixture:

| Aplicativo | 390×844 | 768×1024 | 1440×900 |
|---|---|---|---|
| Restaurante claro | [imagem](screenshots/restaurante/account-security-390x844-light.png) | [imagem](screenshots/restaurante/account-security-768x1024-light.png) | [imagem](screenshots/restaurante/account-security-1440x900-light.png) |
| Restaurante escuro | [imagem](screenshots/restaurante/account-security-390x844-dark.png) | [imagem](screenshots/restaurante/account-security-768x1024-dark.png) | [imagem](screenshots/restaurante/account-security-1440x900-dark.png) |
| Motoboy claro | [imagem](screenshots/motoboy/account-security-390x844-light.png) | [imagem](screenshots/motoboy/account-security-768x1024-light.png) | [imagem](screenshots/motoboy/account-security-1440x900-light.png) |
| Motoboy escuro | [imagem](screenshots/motoboy/account-security-390x844-dark.png) | [imagem](screenshots/motoboy/account-security-768x1024-dark.png) | [imagem](screenshots/motoboy/account-security-1440x900-dark.png) |

Sem overflow horizontal ou exceções JavaScript na matriz executada. As capturas não são evidência do Chrome Android pessoal.

## Testes e integridade

- `npm test` completo: PASS nos dois aplicativos.
- `npm run assets:check`: PASS nos dois aplicativos.
- Teste HTTP/PostgreSQL de identidade: PASS sob roles de aplicação, sessão, CSRF, tenant/RLS, MFA, permissões, convites, rate/error cases e transação reversível. O ramo de bootstrap vazio foi **NÃO EXECUTADO** para preservar o fundador existente.
- Testes focados de UI, sessão/race, identidade e sintaxe: PASS.
- `git diff --check`: PASS nos dois aplicativos.
- Nenhuma migration, escrita persistente em banco, troca de credencial real ou alteração em fundador foi executada. Fixtures sintéticas foram revertidas.

## Escopo ainda aberto

- Não houve inspeção Browser autenticada campo a campo das demais seções (Equipe, Integrações, Super ADM, Backup, Sistema Local e Laboratório Avançado); as suítes completas são regressão, não aprovação individual dessas telas.
- Expiração real da sessão e entrega de email fora do sink sintético não foram homologadas.
- Chrome Android físico aguarda validação do proprietário.
- Os serviços fixos 8083/8084 não foram substituídos nem reiniciados; Browser QA usou proxy isolado com os checkouts atuais e API E2E. A publicação destes commits nesses hosts não foi executada.
- `RM-D1-SETTINGS-SAVE`, `RM-D1-MFA-STATE` e `RM-0256B-ACCOUNT` permanecem PARTIAL no backlog global; os fluxos específicos desta execução não fecham seus critérios históricos completos.

## Commits locais dos aplicativos

- Restaurante: `3279c2b` — `feat(identity): complete account security flows`.
- Motoboy: `0552668` — `feat(identity): secure account and session flows`.
- Nenhum push foi feito nos repositórios dos aplicativos.
