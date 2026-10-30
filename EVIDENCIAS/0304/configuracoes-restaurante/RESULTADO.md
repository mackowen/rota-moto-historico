# Configurações do Restaurante — execução direta

Data: 2026-10-30. Escopo: persistência, feedback de gravação e posição das notificações nas Configurações do Restaurante.

## Resultado por seção

| Seção | Problema encontrado | Correção implementada | Salvamento testado | Reload testado | Resultado |
|---|---|---|---|---|---|
| Empresa / Dados gerais | O status de sucesso era renderizado antes de `render()` e sumia; o texto podia sugerir confirmação sem ACK do servidor. | Manter o status após renderização; diferenciar endereço salvo localmente de dados confirmados pelo servidor. | Telefone, fuso horário e endereço: HTTP 200 e readback canônico; revisão obsoleta retornou 409. | Sim, valores lidos novamente após reload autenticado. | PASS para os campos exercitados; matriz de todos os campos ainda parcial. |
| Operação | Preferências locais sem estado de gravação recuperável após falha. | Exibir estado local, erro persistente e botão de retry que repete a gravação real no IndexedDB. | `delivery.perKm` recebeu ACK; falha injetada em `IDBObjectStore.put` não mostrou sucesso falso, manteve o rascunho e retry gravou. | Sim. | PASS para o campo exercitado; demais campos da categoria não foram individualmente percorridos. |
| Logística | Harness de fixture respondia 404 às rotas canônicas; não exercitava o handler real. | Montar no servidor de teste os serviços e handlers oficiais de Logística. Nenhuma API de produção foi substituída. | Configuração de origem/retorno e política econômica gravadas e lidas da API/PostgreSQL descartável. | Sim, fluxo autenticado reaberto e dados gerais relidos; gravações logísticas confirmadas por readback HTTP. | PASS para os controles exercitados. |
| Impressão | Feedback de autosave não tinha confirmação/retry visível por seção. | Feedback local compartilhado com retry em erro. | Preferência `enabled` gravada no IndexedDB. | Sim. | PASS para o controle exercitado. |
| Origens de pedidos | Autosave local sem recuperação visível em falha. | Feedback local e retry real. | Estado ativo de uma origem alterado e ACK do IndexedDB verificado. | Sim. | PASS para o controle exercitado; demais origens não percorridas individualmente. |
| Aparência | A gravação podia falhar sem caminho de retry claro. | Feedback de estado e retry compartilhado preservados após re-renderização. | Tema alterado pela UI e salvo localmente. | Sim. | PASS para tema; QA claro/escuro executado. |
| Relatórios | Autosave local sem estado de recuperação uniforme. | Feedback local e retry compartilhado. | Período padrão alterado e ACK do IndexedDB verificado. | Sim. | PASS para o controle exercitado. |
| Navegação | Preferências de atalhos sem retry visível quando a gravação local falha. | Feedback local e retry compartilhado. | Atalho alterado e ACK do IndexedDB verificado. | Sim. | PASS para o controle exercitado. |
| Eventos e notificações | Uma falha de gravação podia deixar o usuário sem confirmação ou retry. | Feedback persistente; retry reaplica `saveSettings` ao IndexedDB e mantém os dados digitados até sucesso. | Preferência de evento alterada; falha injetada e retry bem-sucedido. | Sim. | PASS para o controle exercitado. |
| Auditoria administrativa local | Feedback de autosave não estava padronizado com as demais preferências locais. | Feedback de salvamento local e retry compartilhado. | Retenção local alterada e ACK do IndexedDB verificado. | Sim. | PASS para o controle exercitado. |
| Conta e segurança | Fluxo usa o módulo de identidade/servidor, não o autosave de preferências. | Sem mudança de contrato ou autenticação nesta execução. | Não alterado nesta campanha. | Não aplicável. | PARTIAL; fluxos de conta não foram reexercitados aqui. |
| Equipe, Motoboys, Integrações e Super ADM | São módulos administrativos de servidor, com contratos próprios; não são preferências locais comuns. | Sem alteração de RBAC ou desses módulos. | Não alterado nesta campanha. | Não aplicável. | PARTIAL; fora da correção específica de feedback/autosave. |
| Dados locais | Importação/exportação são ações, não campos editáveis de configuração. | Sem mudança. | Não aplicável. | Não aplicável. | NOT_APPLICABLE para botão Salvar. |
| Backup e recuperação | A disponibilidade depende da configuração do serviço administrativo. | Nenhuma capacidade foi simulada nem ativada. | Não alterado. | Não aplicável. | PENDENTE conforme configuração do ambiente. |

## Causa e alterações

- `app.js`: estados de salvamento local por seção permanecem após `render()`, e a ação de retry chama a gravação IndexedDB existente. Em Dados gerais, o resultado agora é renderizado antes de atualizar o elemento de status recriado; sucesso remoto só é anunciado após ACK válido.
- `styles.css`: feedback de salvamento usa tokens semânticos, quebra em telas estreitas e botão de retry com alvo mínimo de 44 px.
- `tests/test-settings-autosave-feedback.js`: regressões para feedback pós-render, retry conectado à gravação real, erro sem sucesso falso e confirmação de Dados gerais somente com confirmação do servidor.
- `tests/e2e-support/fixture-lifecycle.js`: fixture autenticada passou a montar os handlers oficiais de Logística, eliminando o 404 do harness.
- `package.json`, `asset-manifest.js`, `index.html`: teste incluído na suíte e manifesto/build sincronizados.

## Evidências e validação

- Browser QA autenticado com MFA sintético, banco descartável `rotamoto_e2e_lote1b_20261030_3e9a4c12`, transação isolada com rollback; os bancos persistentes não foram usados para escrita.
- Telefone de suporte, fuso horário e endereço: resposta 200, readback canônico e reload.
- Edição com revisão obsoleta: HTTP 409, sem sucesso falso.
- Logística: configuração de retorno e perfil econômico gravados por UI e lidos pela API oficial montada no fixture.
- Preferências locais: ACK do IndexedDB, reload e readback para um controle de cada seção exercitada; falha injetada manteve o rascunho e retry persistiu.
- Viewports autenticados: 390×844, 844×390, 768×1024 e 1440×900, claro e escuro. `document.documentElement.scrollWidth <= innerWidth` em todas as 8 combinações. Toasts permaneceram dentro da viewport; testes automatizados específicos de toast confirmaram posicionamento sobre a navegação inferior.
- `npm test`: PASS (suíte completa do Restaurante).
- `npm run assets:check`: PASS.
- `node --check app.js`, `node --check tests/e2e-support/fixture-lifecycle.js`, testes direcionados e `git diff --check`: PASS.
- HTTP: Restaurante `8083` respondeu 200; API E2E `8787/health` respondeu 200. SHA-256 do `app.js` local e servido por `8083` coincidiu: `6c0c9da5e31116a694dbdcc4264649631c20eedd7616399313134893e36e4507`.
- Motoboy não foi modificado: nenhum componente ou contrato compartilhado foi alterado.

## Limites

Esta execução testou controles representativos por seção, não todos os campos editáveis individualmente. Conta, Equipe, Motoboys, Integrações externas e Backup dependem de fluxos/serviços próprios e não foram declarados aprovados aqui. Não houve verificação física no Chrome Android. A campanha 0304 permanece aberta e G14 permanece FAIL até aprovação visual geral do proprietário.

## Commits

- Restaurante: `fa88447` (`fix: recover local settings saves and server feedback`).
- Histórico: preencher após commit e publicação deste registro.
