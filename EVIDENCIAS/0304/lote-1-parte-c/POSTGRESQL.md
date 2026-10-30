# PostgreSQL — Parte C

Nenhuma escrita persistente, migration ou alteração de serviço PostgreSQL foi executada nesta parte. O Browser fez uma edição sintética de Company Profile em fixture descartável transacional, revertida pelo lifecycle no cleanup.

| Banco | Estado | Operações nesta parte |
|---|---|---|
| `rotamoto` | Persistente; preservado | Nenhuma |
| `rotamoto_e2e` | Persistente; preservado | Nenhuma |
| `rotamoto_e2e_lote1b_20261030_3e9a4c12` | Descartável Parte B, ledger 0001–0063 | Company Profile sintético escrito/readback; revisão antiga recebeu 409; fixture transacional revertida no cleanup |

Migrations 0062/0063 continuam somente no descartável. Nenhuma promoção foi tentada.
