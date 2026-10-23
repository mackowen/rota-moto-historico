# Comparação visual com a referência aprovada

A referência do proprietário foi encontrada em `/sdcard/Download/file_00000000bd9c820eba9e8f8de941d4ca.png`, preservada como `referencia-aprovada.png` (1536×1024; celular escuro/claro, tablet e computador escuros). Capturas da POC estão em `capturas/`; comparativo com a tela anterior em [EVIDÊNCIAS 0298](../0298/capturas/).

| Critério | Resultado observado | Severidade | Evidência |
|---|---|---|---|
| Ordem das seções | Marca/estado, saudação, KPIs, fila e análise seguem a hierarquia; faixa preview adiciona saída. | Baixa | referência + 390/1440 |
| Proporção | KPIs 2×2 no celular; cartões independentes; tabela/painéis no computador. | Baixa | 320/768/1440 |
| Densidade | Campos operacionais preservados; pictogramas são glifos simples e menos fiéis. | Média | 390/1440 |
| Indicadores | Números grandes e cartões uniformes, com contraste semelhante. | Baixa | 390/1440 |
| Tipografia | Hierarquia consistente; cliente e endereço quebram sem verticalização. | Baixa | 320/1440 |
| Ações | Abrir corrida primário; print e QR com área 44×44 e desativados no modo leitura. | Média | 390/1440 |
| Navegação | Barra de cinco destinos no celular; sidebar compacta de 600 a 800 px e completa no desktop. | Baixa | 390/600/768/1440 |
| Espaçamento | Intervalos e cartões próximos da referência; rolagem do shell preservada. | Baixa | capturas phone |
| Paleta | Tema claro/escuro usa cores aprovadas, com separadores e texto legível. | Baixa | capturas dark/light |
| Responsividade | Sem overflow horizontal do documento/módulo nos tamanhos capturados; cards estreitos e tabela a partir de 768 px. | Baixa | `browser-report.json` |

## Divergências para avaliação humana

1. A faixa “Prévia visual · leitura” e a saída não existem na referência; mantêm a comparação reversível.
2. Glifos simples não reproduzem fielmente os pictogramas desenhados.
3. A referência tem mais espaço no topo e busca desktop; a POC mantém shell atual e cabeçalho mais enxuto.
4. O painel usa barras e lista para as métricas fornecidas pelo analytics atual, sem a rosca da referência.
5. Print/QR estão desativados na POC, enquanto a referência os mostra ativos; não foram habilitados para evitar efeitos colaterais.
6. Nomes e números dos screenshots preenchidos são exemplos sintéticos; dados da visualização autenticada vêm do tenant corrente.

**Gate visual: PENDING_USER_APPROVAL.** Esta comparação registra diferenças e não declara fidelidade final.
