# Verificações documentais

- Lidas 42 linhas identificadas, sendo 41 operacionais e um agregado decomposto.
- Extraídos 465 IDs distintos de linhas de PENDENCIAS.md, usando a última ocorrência de cada chave.
- Varredura ampla: 1541 tokens únicos em 706 arquivos Markdown; inclui IDs que não são defeitos.
- Backlog: 411 IDs canônicos, 410 não PASS; contagens derivadas das linhas geradas.
- T.12–T.14 registradas como aprovações limitadas fornecidas pelo proprietário.
- Nenhum teste de aplicação, Browser QA, PostgreSQL, API ou serviço executado; escopo é somente documental.
- `git diff --check`: PASS nos arquivos modificados.
- Links relativos dos novos artefatos e da seção T.15 em REGISTROS/RESUMOS: PASS.
- Unicidade: 411 IDs canônicos, sem duplicatas; todos os 410 itens não PASS têm lote e critério não vazio.
- Rastreabilidade: 465/465 IDs fonte aparecem mapeados; o agregado `RM-HISTORY-LEGACY-OPEN` está classificado como decomposto, sem contagem dupla.

Limite: estados usam o inventário vigente e, para IDs ainda não mapeados, a última linha fonte de PENDENCIAS.md. Correspondência semântica incerta permanece individualizada como LEGACY ou triagem; não se inventou encerramento.
