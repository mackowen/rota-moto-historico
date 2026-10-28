# Cache Android / Service Worker — T4-02/T4-03

## Host real 8083

Em Chromium 155.0.8059.79 arm64, headless com SwiftShader e perfil temporário isolado, o Restaurante foi carregado diretamente de `http://127.0.0.1:8083/`. O worker registrou escopo `http://127.0.0.1:8083/`, instalou cache `rotamoto-restaurante-shell-4545676f94f9ad6c`, passou a controlar a página após reload e a recarga manteve controle/cache. Medidas: 320×700 → largura HTML 320; 390×844 → largura HTML 390. Sem exceção JavaScript ou falha de rede reportada nessa captura pública.

## Atualização controlada em proxy descartável

O proxy de ensaio encaminhou assets reais de 8083 e variou somente o manifesto/HTML em memória; nenhuma alteração foi escrita no app. Chrome usou outro perfil descartável, nos mesmos flags de software:

- V1 instalou e controlou a página; reload foi controlado.
- V2 instalou novo cache enquanto a página V1 permanecia aberta; o worker ficou `waiting=installed`; cache V1 continuou presente.
- Ao fechar e reabrir o browser com o perfil descartável, V2 ativou, a cache anterior foi removida e o HTML carregou os query IDs V2. Um sentinel sintético no `localStorage` persistiu somente nesse perfil temporário.
- V3 recebeu 503 num asset obrigatório durante instalação; V2 permaneceu ativa e a cache V3 não foi publicada.

## Offline e recuperação

**PARTIAL.** A pré-verificação encontrou `index.html`, CSS e JS V2 no cache e a página ainda tinha controller. Após simular indisponibilidade do proxy e reload, Chromium retornou documento vazio/sem controller; o fetch de asset reportou 503. Ao voltar online, o documento carregou, mas a verificação desta etapa ainda não observou controle pelo worker. Isso não prova falha do Chrome Android nem permite atribuir causa ao código de produção; a navegação offline/retorno online fica pendente. Não foi feita correção especulativa em `sw.js`.

## Perfil Android pessoal

**BLOCKED, intocado.** Não há acesso autorizado ao Chrome pessoal neste ambiente. Não foram removidos cookies, sessões, LocalStorage, IndexedDB nem service workers. Instruções não destrutivas em [ACAO-PROPRIETARIO.md](ACAO-PROPRIETARIO.md).

## Revalidação após commits

Depois dos commits locais, nova comparação SHA-256 dos arquivos alterados/operacionais no `8083` bateu com o checkout: `index.html`, `app.js`, `styles.css`, `design-system.css`, `asset-manifest.js` e `sw.js` retornaram HTTP 200/MATCH. Um perfil temporário recém-criado confirmou novamente controle após reload em 390×844, sem erro de console/rede; cache ativo observado `rotamoto-restaurante-shell-bbb300abdbe7692f`. Isso confirma a versão servida atual; não resolve a observação offline anterior nem representa Chrome Android pessoal.
