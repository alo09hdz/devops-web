# DevOps Web — Pendientes (PWA multiplataforma)

Sistema web (HTML/CSS/JS, sin dependencias) instalable como app en Windows, macOS, Linux, Android e iOS, con pipeline CI/CD en GitHub Actions.

## Estructura
```
.github/workflows/deploy.yml   Pipeline CI/CD
src/                           Código fuente (PWA)
tests/                         Pruebas unitarias y funcionales
scripts/                       build.js, serve.js, smoke.js
docs/                          Evidencias y documentación DevOps
```

## Ejecutar local
```bash
npm ci
npm test
npm start        # http://localhost:8080
```

## Ramas (GitFlow simplificado)
| Rama | Propósito | Pipeline |
|---|---|---|
| `main` | Producción (protegida) | CI + build + deploy a producción con aprobación manual + release |
| `develop` | Integración / pruebas | CI + build + deploy automático a `/staging` + smoke test |
| `feature/*` | Trabajo individual | Pull Request hacia `develop` ejecuta CI |

Flujo: `feature/x` → PR → `develop` (staging) → validar → PR → `main` (producción).

## Proceso de CD implementado
1. Push o PR dispara el workflow.
2. **CI**: `npm test` en matriz (Ubuntu, Windows, macOS × Node 20 y 22).
3. **Build**: `npm run build` genera `dist/` con `version.json` (commit, run, fecha) y un `.zip` versionado, subido como artefacto.
4. **Staging**: push a `develop` publica el artefacto en `https://<usuario>.github.io/<repo>/staging/` y ejecuta un smoke test que confirma que el commit desplegado es el esperado.
5. **Producción**: push a `main` espera la aprobación del ambiente `production`, publica en la raíz del sitio, repite el smoke test y crea un GitHub Release con el `.zip` validado.
