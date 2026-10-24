# Consolidação do histórico da Campanha 0304

**Data:** 2026-10-24. **Estado:** histórico consolidado por fast-forward; Campanha 0304 continua PARTIAL e aberta. **G14:** FAIL, aprovação visual pendente exclusivamente do proprietário.

## Auditoria e integração

- Histórico: branch de trabalho `codex/campaign-0303-ui-refinements` em `8c220222d1f67229d39f4d18008fb46a24cea879`; branch oficial `main` remota em `fe1e4e25dcf2937e8eb904edbe32e40a7640152b` antes da integração. Os seis commits de campanha eram descendentes de `origin/main` (`0 6` em `rev-list --left-right --count`), sem divergência.
- A branch local `main`, inicialmente em `a051be9`, foi avançada com `git merge --ff-only codex/campaign-0303-ui-refinements` para `8c220222d1f67229d39f4d18008fb46a24cea879`. Nenhum commit foi reescrito ou descartado; a branch de campanha foi preservada.
- Os repositórios Restaurante e Motoboy foram auditados e tiveram suas referências `origin` atualizadas por `git fetch`, sem mudar branches ou worktrees. Restaurante permanece em `codex/campaign-0304-rotas-v2` (`65a0239e20dbcc6d2283ec6fc62aa9cfbb0d1025`), sem push; Motoboy permanece em `codex/campaign-0295-backup-team-dispatch` (`64d2e13d8e455f48b20b32b396e9c49ba7553e0b`), sem alteração. Baselines dos dois aplicativos preservadas.
- Browser QA foi somente inspecionado; seu worktree já continha alterações e arquivos não rastreados preexistentes, preservados sem alterações. Nenhum remoto/publicação foi usado nele.

## Inventário de branches e divergências fora do alvo

Fetch foi executado sem `--prune` no histórico, Restaurante e Motoboy. No histórico havia 32 branches locais e 6 referências remotas; várias branches locais não têm upstream configurado. `codex/campaign-0281-history-location` é um ponteiro antigo 55 commits atrás de `origin/main`, sem commits exclusivos; foi preservado. A branch alvo `codex/campaign-0303-ui-refinements` coincide com seu remoto em `8c220222d1f67229d39f4d18008fb46a24cea879`.

Restaurante tinha 78 branches locais e 3 referências remotas. A branch ativa `codex/campaign-0304-rotas-v2` permanece no commit local `65a0239e20dbcc6d2283ec6fc62aa9cfbb0d1025` e não tem branch remota de mesmo nome. A branch local `codex/setup-workflow` está 20 commits à frente de `origin/codex/setup-workflow` (local `142d972f180c0d5688190e4d49d85c915108588d`, remoto `f3165f1cd113de10a10fb4817e728ae84fbabc1c`). Motoboy tinha 33 branches locais e 3 referências remotas; `codex/setup-workflow` está 3 commits à frente do remoto (local `08801eda48eaca8b4762e4322638195a37da31fd`, remoto `baf00f788edf08bf7f555fc155068a4c5b24ba4f`). Em ambos, a branch ativa não possui correspondente remoto. Esses commits e refs foram preservados; nenhum push de app foi feito.

Browser QA não tem remoto configurado e seu worktree contém 1.026 entradas modificadas/não rastreadas preexistentes, mantidas intactas. Branches sem upstream não foram comparadas a um destino presumido. A publicação desta campanha não resolve nem publica essas divergências; qualquer organização futura deve ser tratada separadamente e com decisão explícita, sem descarte ou reescrita.

## Integridade documental e publicação

`REGISTROS/0304.md`, `REGISTROS/0304-ADENDO-DESKTOP.md`, `RESUMOS/0304.md`, `EVIDENCIAS/0304/`, o índice, o estado atual e o inventário estão incluídos em `main`. Os registros e evidências anteriores foram preservados. `git diff --check` não encontrou erros de whitespace nos commits consolidados. A inspeção de padrões de credenciais e de extensões sensíveis nas evidências 0304 não encontrou ocorrências suspeitas; não houve impressão de valores secretos.

O avanço autorizado é somente `codex-historico/main` → `origin/main`, por fast-forward e sem `--force`. SHA consolidado antes deste registro: `8c220222d1f67229d39f4d18008fb46a24cea879`. A verificação do SHA publicado deve ser reportada junto da entrega; nenhum push de aplicação, Motoboy ou Browser QA é autorizado ou realizado.

## Situação da campanha

Esta consolidação publica documentação e evidências para auditoria externa; não aprova a implementação. G14 permanece **FAIL**; validação visual do proprietário, E2E operacional autenticado, persistência/readback de planejamento, sync, concorrência e RBAC permanecem pendentes ou bloqueados conforme as matrizes 0304. A Campanha 0304 continua aberta. Não iniciar 0305.
