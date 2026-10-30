# Lacunas documentais — Parte T.15

1. O agregado histórico 0141–0239 contém intervalos e referências sem linha individual facilmente identificável. Tokens encontrados foram mantidos na matriz; não se inventaram descrições/estados para números sem fonte.
2. Documentos históricos contêm checkpoints sucessivos; este snapshot usa a linha vigente do inventário para os seus 42 itens e a ocorrência mais recente por chave em PENDENCIAS.md para itens ainda não mapeados.
3. Gates, campanhas, requisitos e subtestes são rastreados, mas não contados como defeitos por si só.
4. Marcadores de dependência externa e owner são extraídos deterministicamente dos campos; precisam confirmação humana no início de cada lote. Contagens podem sobrepor-se.
5. Nenhum banco, API, serviço ou UI foi revalidado nesta etapa; os estados são documentais.
6. Critério ausente em linha LEGACY deve ser definido antes da implementação e jamais resulta em PASS.
7. T.12–T.14 estão aprovadas no escopo informado; não equivalem à aprovação visual global.

A reconciliação do ledger identificou 465 chaves de pendências: 370 itens abertos individualizados, 84 estados históricos PASS/resolvido, 11 aliases mapeados e zero chave sem correspondência. Dos demais tokens da varredura, 501 permanecem classificados para triagem sem serem tratados como defeitos automaticamente.
