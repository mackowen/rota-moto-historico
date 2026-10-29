# Campanha 0304 — Parte T.11

**Resultado geral: PARTIAL.** Foram corrigidos no checkout do Restaurante o destino de navegação duplicado de Sistema local, a composição de cabeçalhos em subpáginas e a classificação da contagem de sincronização. Motoboy foi auditado e não exigiu alteração.

## Causas e correções

- `layout()` consumia `MODULES` diretamente. `admin` é necessário como capacidade local, mas era renderizado como destino independente em Mais/sidebar. Agora `navigationModules()` filtra `admin` apenas das rotas visíveis; `MODULES` e as permissões permanecem intactos. `goTab('admin')` continua aceitando links antigos e os encaminha a Configurações → Sistema local.
- `settings()` sempre compunha o cabeçalho `Ajustes`; Sistema local também compõe `Sistema local`. Um helper de composição omite o cabeçalho externo nas páginas embutidas que são donas do próprio título. Foi aplicado também a Super ADM, Laboratório de integrações e páginas embutidas equivalentes para evitar o mesmo padrão duplicado.
- A rota antiga `admin` restaurada por histórico agora normaliza para `settings/system-admin`. `goTab()` grava a seção de destino no history state; retorno/avanço preserva a rota pretendida.
- Sistema local usa o estado hidratado do IndexedDB `rota-moto-restaurante-local-v30`. Identidades e RBAC empresariais vêm de endpoints de sessão/administração no servidor e não são esses registros locais. O texto do painel explica a separação.
- “A sincronizar” antes somava registros locais não sincronizáveis (usuários, perfis, logs e eventos) e não cobria todas as entidades de negócio. A contagem agora reutiliza a mesma projeção usada por `getSyncStatus()` para pedidos, entregas, motoboys, rotas e ganhos que aguardam confirmação. Eventos/logs e contas locais não são tratados como pacotes sincronizáveis.

## Matriz de telas e cabeçalhos

| Aplicativo / tela | Cabeçalho esperado no código | Resultado estático | QA de navegador |
|---|---|---|---|
| Restaurante — Início, Pedidos, Motoboys, Rotas, Relatórios, Eventos, Ajuda | cabeçalho próprio ou renderer de página único | sem mudança | tela protegida: BLOCKED |
| Restaurante — Configurações (raiz) | `Ajustes` e nota de escopo | um cabeçalho | tela protegida: BLOCKED |
| Restaurante — Sistema local | botão voltar + cabeçalho `Sistema local`; sem `Ajustes` externo duplicado | corrigido por composição | tela protegida: BLOCKED |
| Restaurante — Equipe, Motoboys e Integrações empresariais | cabeçalho próprio do mount administrativo, sem título `Ajustes` duplicado | coberto pelo helper | tela protegida: BLOCKED |
| Restaurante — Super ADM Global | cabeçalho próprio global | helper evita cabeçalho externo | sessão global: BLOCKED |
| Restaurante — Backup, Segurança, Dados, Empresa, Operação, Logística, Impressão, Origens, Aparência, Relatórios, Navegação, Eventos, Auditoria | cabeçalho compartilhado de Ajustes, cabeçalhos internos de cards não removidos | inspeção estática; sem duplicação de H1 adicionada | tela protegida: BLOCKED |
| Restaurante — Laboratório avançado | cabeçalho próprio | helper evita duplicação | tela protegida: BLOCKED |
| Motoboy — Início, QR, Captura, Formulário, Entregas, Rotas, Mapa, Detalhes, Conclusão, Ganhos, Ajustes, Ajuda | topbar global do produto + `.pageHead` apenas nas páginas internas que o exigem | sem defeito equivalente comprovado; código inalterado | fluxo público local inspecionado; conta autenticada não usada |
| Motoboy — Ajustes: rotas, dados, aparência, ganhos, idioma, entregas, motorista | acordeões/painéis sob um único screen de Ajustes | sem cabeçalho de página adicional global | navegação protegida parcial |

A topbar global do Motoboy identifica o produto; não é uma segunda topbar de página. Cabeçalhos de detalhes e conclusão são específicos da tela e foram preservados.

## Browser e publicação

CDP Chromium isolado carregou `8083` e `8084` sem usar perfil pessoal. Em 320, 390, 412, 768, 1024 e 1440 px, nos modos claro/escuro, as páginas públicas observadas tiveram largura do documento igual à viewport e nenhum overflow horizontal. Restaurante apresentou o fluxo de entrada, portanto Configurações/Sistema local e todos os fluxos protegidos não foram autenticados. O teste registrou sondagens de sessão 401 esperadas sem sessão; não são tratadas como aprovação de API autenticada. O processo Chromium registrou avisos de GPU do runtime, embora tenha concluído as medições. No smoke Moto, Início, Entregas, Rotas, Ajustes e Ajuda navegaram no viewport 390 px; Ganhos sem vínculo/sessão válida retornou à Home.

Hashes locais/HTTP de `index.html`, `app.js` e `asset-manifest.js` coincidiram nos hosts 8083/8084; APIs 8787/8788 responderam readiness HTTP 200. O smoke navegou de fato nas abas públicas do Motoboy; na aba Ganhos sem vínculo autenticado, o app retornou à Home. Detalhes e medições em `TESTES.md`.

## Estado

G14 permanece **FAIL**. Campanha 0304 segue aberta; Campanha 0305 não iniciada. Backlog anterior preservado. Nenhum banco, conta, grant, MFA, RLS ou dado foi alterado.
