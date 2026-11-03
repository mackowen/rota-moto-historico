# Matriz de fidelidade visual — Bootstrap RotaMoto (0304)

Referências de aprovação: tokens e controles de `design-system.css`; captura shell Restaurante [`reference-approved-home-1440-light.png`](reference-approved-home-1440-light.png); evidências de shell aprovadas em `EVIDENCIAS/0304/adendo-desktop/`. O Bootstrap é um fluxo standalone e não deve replicar sidebar ou bottom-nav do painel. Espera-se a mesma marca, tipografia, paleta, superfícies, controles, foco e qualidade responsiva.

| Critério | Referência aprovada | Antes da auditoria | Depois da correção | Evidência/limite |
|---|---|---|---|---|
| Marca e hierarquia | Marca RotaMoto, títulos claros, contexto breve | Identidade presente, mas o texto introdutório repetia o resumo de cada passo | Texto geral encurtado; o passo fornece seu próprio contexto | Capturas 01–08; conteúdo sintético |
| Tipografia/paleta | `--font-ui`, tokens semânticos de tema | Tokens corretos | Tokens preservados; tema claro/escuro testado | `audit.json`; sem troca global de paleta |
| Superfícies/raios | Cartão aprovado de 16 px; sombra discreta | Cartão Bootstrap desktop de 20 px | 16 px em todas as larguras | Baseline aprovado e capturas após |
| Inputs/selects | Controles de 44 px, limites consistentes | `content-box`: inputs 66 px e largura acima da coluna | `border-box`, altura explícita 44 px | `before-06-*`, `06-*-smtp-open`, auditoria das 7 resoluções |
| Texto em superfícies suaves | Contraste legível nos dois temas | Muted em superfícies claras: 4,22–4,23:1 | Secundário: 6,72–6,73:1; dark acima de 7:1 nos elementos medidos | Razões calculadas dos tokens usados no CSS |
| Progresso | Etapas e posição atual compreensíveis | 8 pontos, rótulos escondidos no mobile; contagem também apresenta a etapa atual | Mantido, com etapa atual nomeada no contador e em atributos acessíveis | 14 combinações (7×2), todas as etapas |
| SMTP externo/local | Campos claros e grupos coesos | Configuração opcional toda aberta também no local-only | SMTP aberto no modo externo; disclosure recolhido no modo local, expansível | 14 pares de capturas SMTP |
| Revisão | Resumo suficiente antes da ação irreversível | Não explicitava método de ativação | Declara convite público ou link local sem e-mail | Passo 7 em `audit.json` |
| Finalização | Orientação pós-instalação/MFA | Copy de convite externo também no local-only, com alerta falso | Copy local orienta handoff de uma máquina e MFA obrigatório | Passo 8 e `handoff-state.json` |
| Alinhamento/foco | Componentes acessíveis e sem sobreposição | Foco se perdia em render de etapa; number input vazio maior | Região focada e nomeada; todos os controles 44 px | 126 screenshots + variante logística por faixa |
| Navegação/scroll | Ações e status não encobertos | Tela longa sem nav fixa | Scroll nativo; ações não fixas nem encobertas | Landscape 844×390 e tablet 1024×768 |

## Cobertura por viewport e tema

| Viewport | Claro | Escuro | Imagens principais | Overflow | Controles fora do cartão |
|---:|---|---|---:|---:|---:|
| 320×720 | 8 etapas (SMTP externo aberto) + modo local | 8 etapas (SMTP externo aberto) + modo local | 18 | 0 | 0 |
| 390×844 | 8 etapas (SMTP externo aberto) + modo local | 8 etapas (SMTP externo aberto) + modo local | 18 | 0 | 0 |
| 430×932 | 8 etapas (SMTP externo aberto) + modo local | 8 etapas (SMTP externo aberto) + modo local | 18 | 0 | 0 |
| 844×390 | 8 etapas (SMTP externo aberto) + modo local | 8 etapas (SMTP externo aberto) + modo local | 18 | 0 | 0 |
| 768×1024 | 8 etapas (SMTP externo aberto) + modo local | 8 etapas (SMTP externo aberto) + modo local | 18 | 0 | 0 |
| 1024×768 | 8 etapas (SMTP externo aberto) + modo local | 8 etapas (SMTP externo aberto) + modo local | 18 | 0 | 0 |
| 1440×900 | 8 etapas (SMTP externo aberto) + modo local | 8 etapas (SMTP externo aberto) + modo local | 18 | 0 | 0 |

São 126 screenshots principais: 8 etapas por combinação (112) e um screenshot adicional SMTP aberto/recolhido por combinação (14). Há ainda seis capturas da configuração por faixas, uma tela sintética de handoff e dois comparativos “before geometry”. O Browser QA não enviou solicitações reais de provisionamento; os dados da empresa eram `.invalid` sintéticos em memória.

## Estados de fluxo

| Estado | Resultado | Método |
|---|---|---|
| Diagnóstico pronto | Avança | Endpoint oficial publicado |
| Instalação indisponível | Bloqueia ações e orienta acesso normal | Resposta fixture interceptada |
| API inacessível | Mensagem de erro sanitizada e ação de retentativa | Falha de fetch interceptada |
| SMTP em andamento | Mensagem “Conectando…” e botão “Testando…” | Atraso sintético interceptado |
| SMTP falhou | Erro sanitizado visível; senha é apagada do campo para nova digitação | Resposta 503 interceptada |
| SMTP aceito, sem URL HTTPS | Mostra sucesso de transporte, mantém convite externo bloqueado | Resposta sintética; não contata SMTP |
| Retorno entre etapas | Nome da empresa permanece; foco volta à região | Navegação UI sintética |
| Handoff local | Link same-origin, token hash de uso único, MFA descrito | Provision endpoint interceptado antes do backend |

## Divergências ainda abertas

- Chrome Android físico, teclado virtual, notch/safe area e rotação de tela em aparelho real ainda não foram verificados. CSS inclui `viewport-fit=cover` e áreas seguras do navegador.
- Com SMTP externo expandido, o formulário exige scroll em celular e na orientação landscape baixa; nenhuma ação fica fixa sobre o conteúdo.
- Nota visual 4,4/5, **PARTIAL**. A conclusão pelo proprietário com dados reais não foi iniciada. G14 permanece FAIL.
