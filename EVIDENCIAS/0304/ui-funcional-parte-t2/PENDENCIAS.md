# Pendências T2

- **T2-01 PASS:** mapa de componentes/caminho real documentado.
- **T2-02 PARTIAL:** os cinco elementos atuais são quatro filtros de camada + Ajustar; não foi encontrada evidência de outro grupo de cinco filtros aprovados.
- **T2-03 PARTIAL:** borda fantasma não reproduzida; a faixa atual computa borda superior 0, sombra none e pseudo-elementos none.
- **T2-04 PARTIAL:** modal/painel avançado não existe no código atual; falta identificar qual interface histórica o proprietário relata.
- **T2-05 PASS para layout harness; PARTIAL integrado:** layout foi medido em estados vazio e preenchido sintético; mapa operacional autenticado não foi executado.
- **T2-06 PARTIAL:** endpoint e contrato de geometria são confirmados pelos testes; sem sessão, rede de roteamento real não foi exercitada. Tema do mapa não foi visualmente confirmado com tiles.
- **T2-07 PASS no harness; PARTIAL Android real:** sticky/scroll medidos; safe-area física/orientação não emuladas.
- **T2-08 PARTIAL:** suíte cobre contratos de navegação; telas autenticadas das demais abas não foram visualmente medidas.
- **T2-09 PARTIAL:** conflito de sidebar corrigido para tablet Rotas; navegação real de todos os perfis/Android ainda precisa de QA.
- **T2-10 BLOCKED:** navegação pós-login autenticada não foi exercitada por falta de sessão de browser utilizável.
- **T2-11 PASS limitado:** Chromium por software + CDP estável; ambiente emitiu avisos não fatais de DBus/NetworkManager.
- **T2-12 BLOCKED:** `qa-profile` locked e sem CDP persistente; sem sessão autorizada disponível.
- **T2-13 PARTIAL:** matriz completa de Rotas no harness; matriz visual de todas as telas e Motoboy autenticado pendente.
- **T2-14 PARTIAL:** testes DOM reais de rota/filtros/seleção e testes nav existentes passaram; abertura/fechamento de filtro avançado não se aplica à implementação atual.

G14 permanece **FAIL** até aprovação visual do proprietário. Parte T.2 e Campanha 0304 ficam abertas; backlog desde 0257 intacto; 0305 não iniciada.
