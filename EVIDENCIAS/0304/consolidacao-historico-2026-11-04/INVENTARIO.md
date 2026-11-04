# Inventário e reconciliação documental — Campanha 0304

## Caminhos e identidade

- Origem duplicada: `/data/data/com.termux/files/home/projetos/codex-historico`.
- Destino oficial: `/data/data/com.termux/files/home/projetos/repos/rota-moto-historico`.
- A busca em `~/projetos` encontrou somente essa pasta `codex-historico`.
- Origem e destino têm o mesmo remoto GitHub (`mackowen/rota-moto-historico`); a origem era clone/branch divergente, não outro projeto. O topo contém somente estrutura documental RotaMoto. A pasta `evidencias/` minúscula também contém evidências RotaMoto da campanha 0263. Não há material de CondoOS Manager ou iDatabase Client.

## Estado inicial de Git após fetch (2026-11-04)

| Repositório | Branch local/HEAD | Branch remoto comparado | Situação local inicial | Baseline/observação |
|---|---|---|---|---|
| `rota-moto` | `codex/campaign-0304-account-security` / `9da9e6c` | `origin/main` / `64d2e13` | Limpo; 18 commits à frente, sem branch remoto de mesmo nome/upstream | `v39.6-ui-mobile-fix2` intacta em `79c527b` |
| `rota-moto-restaurante` | `codex/campaign-0304-browser-bootstrap` / `c97d007` | `origin/main` / `65a0239` | Limpo; 103 commits à frente, sem branch remoto de mesmo nome/upstream | `v5.50-ui-mobile-fix5` intacta em `9ebb709` |
| Histórico oficial | `main` / `cd92e40` | `origin/main` / `cd92e40` | Limpo, sincronizado | remoto `mackowen/rota-moto-historico` |
| Clone documental | `codex/campaign-0304-config-restaurante` / `bd66db9` | `origin/codex/campaign-0304-config-restaurante` / `bd66db9` | Branch sincronizado; 38 arquivos não rastreados; nenhum arquivo ignorado relevante | 39 pontas de branches locais são alcançáveis por 8 refs remotas; sem commit de branch local exclusivo |

Os remotos dos aplicativos são `mackowen/rota-moto` e `mackowen/rota-moto-restaurante`. O remoto do histórico, idêntico nos dois clones, é `mackowen/rota-moto-historico`. `node_modules/` é ignorado nos aplicativos; nenhum arquivo `.env`, dump, database, sessão, chave ou credencial está em diff/pending untracked. As branches atuais dos aplicativos são descendentes de `origin/main`, sem divergência/rewrite. A origem documental continha 39 branches locais; todas as pontas estão no conjunto de branches remoto consultado após `fetch`.

## Comparação do histórico

Árvore rastreada no início da reconciliação: destino `main` 2.244 paths; origem `HEAD` 2.087. Comparação por path/blob: 1.988 iguais, 8 paths divergentes, 91 exclusivos rastreados da origem e 248 exclusivos do destino. O merge preservou ambos os ancestrais, adicionou os paths de origem e uniu automaticamente os documentos que não conflitavam. Conflitos textuais foram limitados a `REGISTROS/0304.md` e `RESUMOS/0304.md`; todas as seções de ambos os lados foram preservadas e ordenadas por data. Nenhum arquivo foi escolhido silenciosamente por `ours` ou `theirs`.

Os 38 arquivos não rastreados da origem eram 37 evidências antigas do redesign de login (31 PNGs, quatro scripts CDP, dois JSONs) e uma captura operacional de Empresa/Operação. Os 37 artefatos de login foram incorporados em `EVIDENCIAS/0304/login-redesign-2026-10-25/` com README que identifica seu caráter histórico, campos vazios e não validade como UI atual. Revisão visual por amostragem confirmou campos de autenticação vazios; o identificador mostrado no mock de referência é um placeholder técnico malformado, não credencial. Scanner local de padrões em scripts/JSON/Markdown não encontrou e-mail, JWT, URL com senha ou atribuição literal de credencial. Os scripts não foram executados.

A captura de Empresa/Operação foi preservada fora do GitHub em `/data/data/com.termux/files/home/rotamoto-data/maintenance/0304-history-reconciliation-private-20261104/` (diretório 0700, arquivo 0600) porque pode revelar configuração comercial privada. O SHA-256 da cópia coincide com o original. Ela não foi publicada nem apagada antes da confirmação do restante da reconciliação.

## Aplicativos e validação pré-publicação

Suítes `npm test` integrais: Motoboy PASS e Restaurante PASS. Após a primeira execução, a inspeção `git diff --check` encontrou apenas uma linha vazia final excedente em quatro migrations do Restaurante (0060, 0061, 0068 up/down). Foi feita alteração exclusivamente de whitespace, sem mudar SQL, num commit local separado; diff-check da branch passou. A segunda execução integral terminou com exit 0 nos dois apps. Nenhum dado real ou serviço foi tocado. Histórico dos apps contém exclusivamente arquivos dos respectivos aplicativos/contratos.

## Integração/publicação

Relatório de commits, resolução final dos links, SHAs remotos e confirmação de arquivos está em `RESULTADO.md`; a atualização é concluída após os pushes e a validação de leitura no GitHub.
