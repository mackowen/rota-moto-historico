# Matriz de defeitos T6-01 a T6-12

| ID | Causa confirmada / alteração | Teste e evidência | Estado |
|---|---|---|---|
| T6-01 | `identity-ui.css`: fact cards usavam `--surface-2`/`--surface-muted`, não definidos pelo produto; fallback claro era combinado com texto claro no escuro. Trocado pelos tokens existentes. | CDP com stylesheet real, modo claro/escuro, 5 larguras; mínimo medido 4,73:1/5,62:1. | PASS sintético; visual autenticado PARTIAL |
| T6-02 | Empresas: estrutura/DTO da T.5 preservada; estilos semânticos corrigidos. Origem dos nomes técnicos continua não comprovada. | Harness usa empresa sintética e não valida a lista real. | PARTIAL |
| T6-03 | Usuários: estado `platform_admin` continua separado de `founder_claimed`; erros tardios não são apresentados fora da aba conectada. | `test-platform-admin-ui`, suíte completa; conta real não consultada nesta parte. | PARTIAL |
| T6-04 | Vínculos: dados de outra seção não são reaproveitados; renderer usa apenas DTO próprio. Origem do vínculo continua ausente no DTO. | Teste contratual prévio + suíte; renderer autenticado não observado. | PARTIAL |
| T6-05 | Perfis: resposta/leitura de roles tardia só altera cartão conectado na aba `roles`; erro tardio não muda aviso global de outra seção. | invariantes em `test-platform-admin-ui`; teste de geração/cancelamento; sem sessão autenticada. | PARTIAL |
| T6-06 | Financeiro: formulário vivia dentro do loop de empresa. Extraído para um painel único; requisição é cancelada e conferida contra empresa, início/fim e geração. | fonte, contrato HTTP sintético e testes de request-state; consulta real não executada. | PARTIAL |
| T6-07 | Configuração da plataforma: renderer/tags da T.5 preservados; tokens agora cobrem o card inteiro. | harness sintético claro/escuro. Sem endpoint autenticado. | PARTIAL |
| T6-08 | Async: contador anterior foi substituído por controlador reutilizável com `AbortController`; cada nova seção cancela a anterior e só a geração ativa limpa `aria-busy`. | teste com promises fora de ordem, cancelamento e retorno ao request atual; suíte completa. | PASS técnico; erro real autenticado não coberto |
| T6-09 | Navegação dos seis módulos: grid largo substituído por botões compactos; no mobile rolam em uma linha, nos demais quebram em flex sem overflow. | CDP sintético: 320, 390, 768, 1024, 1440 px; claro/escuro. | PASS sintético |
| T6-10 | Atualizar lista: disabled/rótulo “Atualizando…” enquanto a geração atual carrega; não duplica refresh. | asserts da UI e suíte completa; clique na sessão real não disponível. | PARTIAL |
| T6-11 | Mensagem de backup: `BACKUP_ADMIN_NOT_CONFIGURED` vem do ramo `!backupAdminHttp`; esse handler depende de store/audit/process guard no servidor. A mensagem foi limitada ao endpoint administrativo e separada do backup Local-First. | inspeção de `server.js`, `app.js`, runbook 0228 e testes HTTP sintéticos; sem leitura autenticada da configuração de runtime. | PARTIAL |
| T6-12 | Paridade visual: tokens de seis modelos de seção e perfil medidos com CSS real; os componentes são representados por harness sintético, sem identidade real. | 10 medições Chromium e screenshots nesta pasta; hashes HTTP/local iguais após build. | PARTIAL; QA autenticado BLOCKED |

Nenhum grant, usuário, banco ou dado comercial foi alterado. Os estados acima não encerram pendências de Parte T.5 ou anteriores.
