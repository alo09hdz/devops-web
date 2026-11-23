# Evidencias (completar con capturas y enlaces)

| # | Elemento | Evidencia (captura / enlace) |
|---|---|---|
| 1 | Ejecución automática del pipeline | |
| 2 | Jobs CI, Build, Deploy en verde | |
| 3 | Artefacto `dist-N` en Actions y `.zip` en Releases | |
| 4 | URL de staging | |
| 5 | Resultados de pruebas funcionales | |
| 6 | Versión validada (version.json en staging) | |
| 7 | Aprobación manual y release a producción | |
| 8 | Funcionamiento multiplataforma | |

## Problemas encontrados y soluciones
| Problema | Causa | Solución |
|---|---|---|
| `npm ci` falla sin `package-lock.json` | Falta el lockfile | Ejecutar `npm install` y versionar el lock |
| Staging muestra 404 tras el deploy | Pages no estaba configurado en `gh-pages` | Settings > Pages > Branch `gh-pages` / root |
| Smoke test falla en el primer intento | Retraso de propagación de Pages | Reintentos cada 15 s (hasta 3 min) |
| CSS/JS no cargan bajo `/staging/` | Rutas absolutas `/app.js` | Usar rutas relativas (cubierto por FUNC-05) |
| Deploy falla con 403 al publicar | Faltaba `permissions: contents: write` | Agregar permisos en el workflow |
