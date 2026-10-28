# T3-03/T3-04 — Hashes HTTP

SHA-256 comparado em resposta com Accept-Encoding: identity. Referências src/href foram extraídas do index.html preservando query strings ?v=. Toda resposta referenciada foi HTTP 200 e comparada ao arquivo local.

| Aplicativo | Portas | URLs únicas | Comparações | Ausentes | Divergências |
|---|---|---:|---:|---:|---:|
| Restaurante | 8081, 8083 | 37 | 74 | 0 | 0 |
| Motoboy | 8082, 8084 | 34 | 68 | 0 | 0 |

Hashes centrais, iguais local/HTTP em ambas as portas de cada app:

| Aplicativo | Arquivo | SHA-256 |
|---|---|---|
| Restaurante | index.html | 38c8c07f401628583e5c0c07b46d1a19e50015cbaec373e9993228c7d7c3e7a7 |
| Restaurante | app.js | 83dfe807561c74fec51c6102678ed5acc3cd74a003526745bb6e01645a38c9ad |
| Restaurante | styles.css | 57642aa3b7dae69dfe79a928fc78338e128d33613357fc03f2c7d0449ca89073 |
| Restaurante | asset-manifest.js | b9c336fee1399fae52acda01553b428472faa218e560adb2246742da19ad4222 |
| Restaurante | sw.js | 988dd596f3e0dc80d82f846ca7e06ed236262d428df8cb46f7e841a1c23320bd |
| Motoboy | index.html | 9893eaa24f184545d5ad15927c1bc07db00a5202a086a0bceacff6b127f27996 |
| Motoboy | app.js | 1ac0726dae9faa900346c174178f66f50f59763b60007c68b9d5f2f817af26e9 |
| Motoboy | styles.css | 2e77d379c7c2b421836c028eda9295d195a2c00e56381c3e7c945a698252bf63 |
| Motoboy | asset-manifest.js | ba9b38c970a1fa3bbf0ba0b7fae53fc023ae2e6b7d4828bda21baba314527ad9 |
| Motoboy | service-worker.js | e61459dcf1e7122f2a8c56cdfd373cbd35c50e4c308339726ae0c533cd42f65f |

Manifest cache/build identifiers: Restaurante rotamoto-restaurante-shell-4545676f94f9ad6c; Motoboy rota-moto-9d0e836a70eafe47. Branch/HEAD estão em AMBIENTES.md. Baselines: Restaurante v5.50-ui-mobile-fix5 → 9ebb7098725200bdec82e79be1e9ea622fe20120; Motoboy v39.6-ui-mobile-fix2 → d5b8f463f9daec615fecf1b01ff7f61533fd1827. T3-03/T3-04 PASS. Isso prova igualdade com o servidor local, não estado de perfil pessoal ou host remoto.
