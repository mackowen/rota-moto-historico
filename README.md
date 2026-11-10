# Histórico de trabalho — Projetos RotaMoto

Este diretório mantém memória estruturada, local e fora dos repositórios dos aplicativos RotaMoto. Registra solicitações relevantes, contexto, análise, ações, verificações, decisões, pendências e o estado conhecido ao final de cada interação. Git e o conteúdo atual dos repositórios continuam sendo a fonte de verdade do código.

## Arquivos

- `INDICE.md`: índice cronológico dos registros, com número, data, projeto, tipo, assunto, resultado e caminho.
- `ESTADO_ATUAL.md`: retrato verificável dos dois projetos e da infraestrutura conhecida. Deve ser revisto quando o estado mudar.
- `DECISOES.md`: decisões técnicas e arquiteturais duráveis. Decisões substituídas permanecem no arquivo marcadas como `SUPERADA`.
- `PENDENCIAS.md`: itens ainda por fazer, organizados por prioridade; itens resolvidos são marcados como concluídos e vinculados ao registro que os resolveu.
- `REGISTROS/NNNN.md`: relato imutável de cada interação relevante. Nunca editar um registro anterior para representar uma nova interação; criar sempre o próximo número livre.
- `POLITICA_GIT_CAMPANHAS.md`: inventário, preservação, commits e publicação obrigatória do histórico nas campanhas futuras.

## Trabalho vigente

- Atualização 0309 (2026-11-10): [registro](REGISTROS/0309.md), [resumo](RESUMOS/0309.md), [evidências](EVIDENCIAS/0309/bootstrap-e2e-copy-2026-11-10.md). Página 8083 identificou `rotamoto_e2e` e agora copia o comando E2E próprio; CLI, guards, status HTTP e browser CDP passaram. Nenhuma autorização ou dado de bootstrap foi emitido.
- Atualização 0308 (2026-11-10): [registro](REGISTROS/0308.md), [resumo](RESUMOS/0308.md), [evidências](EVIDENCIAS/0308/reset-bancos-bootstrap-2026-11-10.md). Os bancos `rotamoto` e `rotamoto_e2e` foram limpos mantendo estrutura/migrations/RBAC e prontos para bootstrap inicial; APIs e latches verificados `ready`.
- Atualização 0307 (2026-11-09): [registro](REGISTROS/0307.md), [resumo](RESUMOS/0307.md), [evidências](EVIDENCIAS/0307/recuperacao-api-auditoria-2026-11-09.md). As APIs oficial/E2E voltaram e readiness passou nas quatro frentes. Runtime privado e chaves novas foram gerados dentro do repositório Restaurante em `.rotamoto-private/` (ignorado pelo Git); SMTP/marketplace não foram provisionados, QRs E2E antigos foram invalidados pela rotação, e auditoria autenticada/mapas reais permanecem PARTIAL.
- Diagnóstico inicial 0306 (2026-11-09), resolvido em runtime pelo 0307: [registro](REGISTROS/0306.md), [resumo](RESUMOS/0306.md), [evidências](EVIDENCIAS/0306/rotas-e-servicos-2026-11-09.md). Corrigiu upstream do Restaurante E2E 8788→8787 e documentou os arquivos privados ausentes antes da recuperação local.
- Auditoria geral 0305, solicitada em 2026-11-09: [registro](REGISTROS/0305.md), [resumo](RESUMOS/0305.md) e [evidências](EVIDENCIAS/0305/auditoria-2026-11-09.md). Estado PARTIAL; `npm test` completo, contrato compartilhado e paridade read-only oficial/E2E passaram. Sessão/browser autenticado, bootstrap operacional, tiles/GPS/rotas por ruas e Android físico continuam pendentes. Nenhum patch de app foi confirmado como necessário; banco oficial sem escrita.
- Campanha 0304 segue aberta e sem mudança nos gates anteriores: [registro cumulativo](REGISTROS/0304.md), [adendo desktop](REGISTROS/0304-ADENDO-DESKTOP.md), [resumo](RESUMOS/0304.md) e [gates/evidências](EVIDENCIAS/0304/). G14 continua FAIL conforme aprovação visual pendente.
- A auditoria 0305 não altera nem encerra pendências históricas de 0304 e campanhas anteriores.

## Histórico, estado, decisões e pendências

O registro é a narrativa de uma interação específica. O estado atual é uma síntese do que se verificou mais recentemente e pode mudar. Decisões guardam escolhas duráveis e seus motivos, inclusive escolhas depois superadas. Pendências acompanham trabalho futuro e seu ciclo de vida. Nenhum desses documentos substitui o código, os dados ou o histórico Git.

## Quando registrar

Registre interações relacionadas a RotaMoto que possam afetar arquitetura, código, segurança, dados, sincronização, infraestrutura, testes, workflow ou decisões do projeto. Isso inclui análises, investigações, auditorias, planejamento e decisões sem alteração de código. Perguntas extremamente simples e sem impacto podem ficar sem registro. Não registre apenas o resultado: documente o problema, o pedido, a investigação, alternativas pertinentes, decisão, ações, verificações e o que falta.

## Formato dos registros

Cada registro deve usar o modelo completo abaixo (adapte apenas títulos específicos quando a configuração inicial pedir outro formato):

1. Título `# Registro NNNN — Título`.
2. Metadados: data, projeto, tipo, assunto, branch, commit inicial, commit final e status.
3. Solicitação do usuário, preservando o significado e, quando possível, o texto integral.
4. Contexto relevante e análise realizada.
5. Ações realizadas e arquivos consultados.
6. Arquivos alterados, com caminho, mudança e motivo; se nenhum, declarar isso explicitamente.
7. Testes com comando, ambiente, resultado e falhas/correções; não basta dizer “passou”.
8. Commits (hash, mensagem e finalidade) e push; declarar explicitamente quando não houve.
9. Decisões, pendências, riscos, próximo passo e estado após a interação.

Tipos sugeridos: ANÁLISE, IMPLEMENTAÇÃO, CORREÇÃO, AUDITORIA, TESTE, CONFIGURAÇÃO, ARQUITETURA, DECISÃO, INVESTIGAÇÃO, DOCUMENTAÇÃO e OUTRO. O índice pode incluir tipos adicionais necessários.

## Fluxo para recuperar e continuar o trabalho

Antes de uma nova tarefa RotaMoto, consulte este README e o índice; leia os registros relacionados e, quando pertinentes, `ESTADO_ATUAL.md`, `DECISOES.md` e `PENDENCIAS.md`. Confira o repositório atual quando fatos de código ou Git forem necessários: um registro antigo não prevalece sobre o estado real. Determine o próximo número inspecionando os arquivos existentes em `REGISTROS/`; não reutilize números. Ao concluir uma tarefa relevante, crie o registro, atualize o índice e atualize estado, decisões e pendências se aplicável. Faça uma verificação de consistência antes de responder. Mantenha a resposta normal ao usuário e informe brevemente `Histórico atualizado: Registro NNNN.`

Registre branch, estado Git inicial/final, commits e push sempre que a interação envolver Git. Registre comandos e somente saídas relevantes para reproduzir conclusões. Em testes de browser, inclua navegador/mecanismo, URL, fluxo, evidências e erros relevantes, quando aplicável. Em correções, inclua sintoma, causa raiz, correção, arquivos e verificações. Em arquitetura, inclua problema, contexto, alternativas, decisão, justificativa, impactos, consequências e questões pendentes.

## Segurança

Nunca grave senhas, tokens, API keys, secrets, cookies, credenciais, certificados privados ou dados pessoais desnecessários. Substitua qualquer informação sensível por `[REDACTED]`. Mantenha o histórico local e fora dos repositórios dos aplicativos. Não crie commits apenas para atualizar este histórico.

Campanhas também devem seguir `POLITICA_GIT_CAMPANHAS.md`: publicar somente o histórico, integrar sem sobrescrita, verificar o SHA remoto e confirmar os registros na branch padrão antes de declarar publicação concluída.
