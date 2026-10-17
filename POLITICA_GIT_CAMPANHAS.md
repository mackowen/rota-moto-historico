# Política Git e publicação de campanhas RotaMoto

Esta política complementa as instruções locais compartilhadas em `~/projetos/AGENTS.md`.

## Antes de cada campanha

- Ler o último registro, `ESTADO_ATUAL.md`, `PENDENCIAS.md`, `INDICE.md` e procedimentos aplicáveis.
- Confirmar os caminhos reais e identidade dos remotos Restaurante, Motoboy e Histórico.
- Registrar branch, upstream, status staged/unstaged/untracked, tags protegidas e commits locais/remotos divergentes antes de mudar qualquer coisa.
- Preservar todo trabalho existente. É proibido usar `reset --hard`, `clean -fd`, force push ou excluir branches com commits exclusivos.

## Entrega

1. Implementar apenas o escopo solicitado e executar verificações apropriadas, registrando saídas e limites reais.
2. Criar o próximo registro numerado e resumo; atualizar índice, estado e pendências.
3. Inspecionar o diff e impedir que segredos, PII desnecessária, arquivos `.env`, backups, bancos, recovery envelopes, chaves ou evidências privadas entrem no Git.
4. Comitar alterações verificadas nos repositórios de aplicação localmente quando necessário; nunca fazer push desses repositórios sem autorização específica.
5. Buscar o remoto do histórico, integrar mudanças sem sobrescrita e publicar somente esse repositório.
6. Verificar o SHA publicado por nova consulta remota e confirmar que o registro está presente na branch padrão configurada do GitHub. A configuração da branch padrão não deve ser trocada.
7. Fornecer links diretos dos registros publicados e informar o resultado real do push.

Uma campanha só pode ser declarada publicada após confirmação do SHA e do arquivo no remoto. Push bloqueado, conteúdo ausente na branch padrão ou integração insegura deve ser registrado como pendência, nunca como PASS.
