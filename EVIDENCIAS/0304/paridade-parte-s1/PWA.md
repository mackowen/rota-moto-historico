# PWA, assets e cache

Probe isolado em cópia temporária do conteúdo versionado de cada app (sem alterar fonte dos repositórios):

| App | Cache inicial | Cache após anexar comentário controlado ao `app.js` | Verificação |
|---|---|---|---|
| Restaurante | `rotamoto-restaurante-shell-5c84e10ad52acc2b` | `rotamoto-restaurante-shell-c10f2ce93a54b202` | `assets:check` detectou manifesto stale antes da regeneração; após `assets:sync`, check PASS |
| Motoboy | `rota-moto-25c48dc2a30b8b98` | `rota-moto-e8d0e98590bb66a9` | mesmo procedimento, check PASS |

Os diretórios temporários foram removidos após a verificação; os working trees não receberam o comentário de probe. Os testes `test-sw-atomic-install.js` e `test-service-worker-atomic-install.js` passaram: staging de shell, correspondência exata de URL, exclusão das APIs e retenção do cache antigo se asset obrigatório falha. Omissões de asset opcional foram tratadas pelo teste como offline opcional.

**PWA-01 PARTIAL**: hash/invalidação e rollback atômico têm prova de teste; ainda falta upgrade e navegação offline em browser real nos dois apps e comprovar atualização efetiva de instalação existente.
