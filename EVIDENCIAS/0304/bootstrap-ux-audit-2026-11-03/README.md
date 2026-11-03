# Auditoria UX/UI — Bootstrap Restaurante (0304)

**Classificação: PARTIAL. Nota visual: 4,4/5.** As divergências de interface comprovadas foram corrigidas e repetidas em Chromium/CDP. A fidelidade a paleta, tipografia e componentes foi comparada com o Design System e as capturas aprovadas do Restaurante. A validação física em Chrome Android, teclado virtual e áreas seguras de dispositivo real continua pendente; por isso, não classifico o resultado geral como PASS.

## Referências comparadas

- `design-system.css`: tokens de canvas/superfície, texto, acento, foco, sombra, raio e fonte compartilhados com o painel.
- Captura aprovada do shell: [`reference-approved-home-1440-light.png`](reference-approved-home-1440-light.png) (origem no Restaurante: `EVIDENCIAS/0304/adendo-desktop/0304-shell-inicio-1440x900-light-expanded.png`, SHA-256 `aaae3689790a851baae0af0fad768947a0aaf6a6c46be5c0ff8512225dd403af`). Capturas publicadas de celular também estão em [`adendo-desktop`](../adendo-desktop/).
- A nova interface mantém a apresentação standalone apropriada à primeira instalação; não replica sidebar ou navegação inferior do painel autenticado. Logo, família tipográfica, tokens, superfícies, foco e controles seguem o padrão aprovado.

## Divergências corrigidas

1. **Inputs fora da grade:** o Bootstrap standalone não herdava `box-sizing` do shell do painel. Antes, inputs tinham 66 px de altura e excediam em até 26 px a coluna útil a 320 px; na grade desktop os controles vizinhos encostavam. A regra foi corrigida no escopo do Bootstrap e os inputs/selects usam o token de 44 px. Na verificação final, 0 controles fora do cartão e 0 overflow horizontal nos 126 estados da matriz. Capturas comparativas: [`before-06-phone-compact-light.png`](before-06-phone-compact-light.png), [`06-phone-compact-light-smtp-open.png`](06-phone-compact-light-smtp-open.png) e [`06-phone-compact-light-local-only.png`](06-phone-compact-light-local-only.png). O baseline visual “before” foi reconstruído no Chromium com a geometria anterior (`content-box`), sem tocar o servidor ou dados.
2. **SMTP excessivo no modo local:** ao selecionar `local-only`, a configuração SMTP externa opcional permanecia totalmente aberta. Agora fica recolhida, com disclosure acessível, e pode ser expandida para configurar/testar o provedor; o fluxo externo continua aberto por padrão. Foram capturados os dois estados por tema e viewport.
3. **Texto repetido no cabeçalho:** a explicação global repetia conteúdo de cada etapa. Foi reduzida sem remover a informação de ativação e MFA.
4. **Raio do cartão:** desktop usava 20 px, contra 16 px nos cartões aprovados do painel. Alinhado a 16 px em todos os tamanhos.
5. **Contraste auxiliar:** texto muted `#64748b` sobre superfícies claras `#edf2f8`/`#e9f2ff` media 4,23:1/4,22:1. Os contextos pequenos em superfícies suaves agora usam o token secundário, com 6,73:1/6,72:1. O tema escuro mantém contraste superior a 7:1 nos contextos conferidos. O acento primário com texto branco mede 5,17:1.
6. **Foco entre etapas:** o foco se perdia quando o conteúdo era substituído. A região de etapa agora recebe nome acessível e foco programático após avançar/voltar. O teste CDP confirmou o foco em todas as transições percorridas.
7. **Revisão e modo local:** a revisão agora declara se o titular recebe link local de uso único ou convite público por e-mail. A etapa final local deixou de dizer que enviaria convite externo ou exibir alerta falso de bloqueio. O aviso de sucesso ficou conciso; a orientação detalhada permanece no conteúdo de handoff.

## Matriz de etapas e dispositivos

A ordem renderizada é: Diagnóstico; Administrador fundador; Dados do restaurante; Operação; Entregas e logística; E-mail e notificações; Revisão; Finalização. Os oito estados foram capturados em claro/escuro nos sete viewports definidos pelo proprietário: 112 capturas. A etapa SMTP também foi capturada aberta (configuração externa) e recolhida (modo local) em cada combinação: mais 14 capturas. Total da matriz principal: 126 imagens.

| Etapa | Cobertura e observação | Resultado |
|---|---|---|
| 1. Diagnóstico | Requisitos legíveis, estados ready, indisponível e erro de API; retentativa disponível no erro recuperável. | PASS Chromium |
| 2. Administrador fundador | E-mail e proof em grupo lógico; nenhuma senha é pedida nesta etapa. | PASS Chromium |
| 3. Dados do restaurante | Nome, telefone e localização opcionais agrupados; sem localização automática. | PASS Chromium |
| 4. Operação | Selects de fuso/política, texto explicativo e configurações posteriores pendentes. | PASS Chromium |
| 5. Entregas/logística | Estado sem preços e formulário por faixas com duas faixas e percentual; 6 capturas adicionais 320/768/1440 nos dois temas. | PASS Chromium |
| 6. E-mail/notificações | SMTP externo expandido e local-only recolhido; disclosure pode ser aberto. Estado loading/success/error testado com endpoints interceptados. | PASS Chromium |
| 7. Revisão | Dados sintéticos e método de ativação explícito; CTA e revisão não se sobrepõem. | PASS Chromium |
| 8. Finalização | Modo local descreve handoff e MFA, sem alegar envio de e-mail. | PASS Chromium |
| Handoff do titular | Resposta de provisionamento sintética interceptada antes do backend; link mesma origem, fragmento local de uso único e MFA obrigatório. Sem gravação. | PASS Chromium isolado |

| Perfil | Resolução | Temas e estados percorridos | Resultado |
|---|---:|---|---|
| Celular compacto | 320×720 | Claro/escuro, 8 etapas; SMTP aberto e local recolhido | PASS |
| Celular padrão | 390×844 | Claro/escuro, 8 etapas; SMTP aberto e local recolhido | PASS |
| Celular grande | 430×932 | Claro/escuro, 8 etapas; SMTP aberto e local recolhido | PASS |
| Celular landscape | 844×390 | Claro/escuro, 8 etapas; scroll natural até ações | PASS |
| Tablet retrato | 768×1024 | Claro/escuro, 8 etapas e faixa logística | PASS |
| Tablet paisagem | 1024×768 | Claro/escuro, 8 etapas; scroll natural em formulários longos | PASS |
| Desktop | 1440×900 | Claro/escuro, 8 etapas e faixa logística | PASS |

Matriz detalhada, medidas DOM, labels, cores e nomes dos arquivos: [`audit.json`](audit.json). Formulário logístico por faixas: [`pricing-variants.json`](pricing-variants.json). Estados de erro/sucesso, retomada e SMTP: [`states.json`](states.json). Handoff local sintético: [`handoff-state.json`](handoff-state.json). Teclado/foco: [`keyboard.json`](keyboard.json).

## Acessibilidade, funcional e limites

- Controles de formulário têm 44 px; 0 controles fora da borda interna dos cartões; 0 overflow horizontal; 0 erros de console e 0 respostas HTTP 4xx/5xx no Browser QA.
- A ordem Tab alcançou “Continuar” a 320×720 com `:focus-visible`; foco de etapa foi confirmado ao avançar e voltar; o rascunho sintético do restaurante permaneceu ao voltar.
- Textos de status são `aria-live`; a etapa tem nome acessível pelo título atual; sem modal ou navegação fixa que cubra mensagens/ações.
- A etapa SMTP aberta é longa em alturas reduzidas e requer scroll. No modo local, a seção opcional recolhida reduz a página. As ações permanecem no fluxo normal do documento, sem `position: fixed`.
- Chromium headless/CDP não exibe o teclado virtual Android nem reproduz recorte físico de notch/safe area. `viewport-fit=cover` e `env(safe-area-inset-*)` existem no CSS, mas exigem confirmação física no Chrome Android.
- Os estados SMTP foram interceptados pelo CDP com valores `.invalid`: nenhum envio externo, persistência ou POST de instalação alcançou o backend. Handoff foi apenas resposta sintética interceptada. A instalação real permanece intacta.

## Testes

- `npm test` — PASS após as alterações de JS; os refinamentos finais seguintes foram CSS-only e passaram Browser QA completo, `assets:check`, `node --check` e `git diff --check`.
- `npm run test:smtp-bootstrap` — PASS.
- `npm run test:bootstrap-local-only-disposable` — PASS; cluster descartável encerrado.
- Browser QA publicado: 126 estados; 6 variantes logísticas; uma tela de handoff local sintético; 0 POST de provisionamento real. Provedor SMTP não contatado.
- `/bootstrap.html`, CSS e JS carregados de `http://127.0.0.1:8083`; API oficial/E2E e readiness continuaram HTTP 200. Os serviços e bancos não foram modificados.
- Commit Restaurante, local e sem push: `589c75bd4da88498051ff3bdbb88e0dcbc0dd81e` (`fix(restaurante): refine bootstrap visual consistency`).

**Nota visual: 4,4/5.** A avaliação confirma consistência visual e correção dos desalinhamentos medidos. O desconto é por ausência de prova em dispositivo físico, teclado virtual e safe areas reais, além do scroll extenso necessário para editar todos os campos SMTP em celular quando a seção fica aberta. **Classificação geral PARTIAL; G14 continua FAIL**, conforme a decisão anterior do proprietário. A interface não altera migrations 0067–0070, SMTP, local-only, autenticação, MFA, RBAC, RLS ou fluxos de instalação.
