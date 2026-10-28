# T3-05/T3-06 — Cache e atualização

## Causa e correção

Sem Cache-Control, HTML, manifests e worker podiam ser reusados por validade heurística, compatível com a hipótese de navegador mostrar um shell antigo. Isso não prova que era a única causa. Os quatro virtual hosts agora exigem revalidação nesses recursos. Nenhum cache, LocalStorage, IndexedDB ou sessão foi limpo.

## Ensaio

Browser público com perfis novos confirmou tela de entrada, ausência de overflow e instalação do worker. O harness de troca de build usou os workers reais e assets/manifesto sintéticos em perfil temporário, mas Runtime.evaluate excedeu 12 s nos dois apps antes de concluir as asserções de update. Perfis foram encerrados e removidos. Ciclo de update/ativação/offline/falha de instalação fica NOT PROVEN / PARTIAL.

Os testes automatizados de instalação atômica passaram e verificam preservação da versão anterior após falha. Não substituem update browser. skipWaiting não é usado, para a nova versão aguardar liberação dos clientes. Nenhuma configuração Android/GPU ou perfil qa-profile/pessoal foi alterado.
