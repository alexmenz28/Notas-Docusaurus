---
id: github-github-actions
title: GitHub — Actions
sidebar_label: GitHub Actions
slug: /github/github-actions

type: herramienta
category: github
tags:
  - ci-cd
  - automation
  - workflows
topics:
  - desarrollo-software
  - devops
nivel: intermedio
estado: en_revision
origen: notas-personales
keywords:
  - github actions
  - ci
  - cd
  - workflow
---

# GitHub — Actions

## Términos

- **GitHub Actions:** Sistema de CI/CD integrado en GitHub; ejecuta workflows (jobs) en respuesta a eventos (push, PR, schedule, etc.).
- **Workflow:** Archivo YAML (`.github/workflows/nombre.yml`) que define cuándo y qué se ejecuta.
- **Job:** Unidad de trabajo; uno o más jobs por workflow; pueden correr en paralelo o en secuencia.
- **Step:** Paso dentro de un job; ejecuta un script o usa una acción.
- **Action:** Unidad reutilizable (p. ej. checkout, setup Node, deploy); hay muchas en el marketplace.
- **Runner:** Máquina virtual (Linux, Windows, macOS) donde se ejecuta el job.

## Qué es

**GitHub Actions** es la plataforma de automatización de GitHub: defines workflows en YAML que se ejecutan en repos virtuales (runners) cuando ocurren eventos. Ejemplos: ejecutar tests en cada PR, build y deploy al hacer push a main, crear releases, enviar notificaciones.

## Para qué sirve

- **CI (Continuous Integration):** Tests automáticos en cada push o PR; bloquear merge si fallan.
- **CD (Continuous Deployment):** Desplegar a staging o producción tras merge en main.
- **Tareas programadas:** Ejecutar jobs (limpieza, reportes) a intervalos (cron).
- **Automatización:** Crear issues, enviar Slack, generar documentación, etc.

## Cómo se aplica

**Estructura mínima de un workflow:**

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
```

- `on:**` define el evento (push a main, PR a main).
- `jobs.test:**` un job llamado "test".
- `runs-on: ubuntu-latest:**` ejecuta en un runner Linux.
- `steps:**` checkout del repo, setup Node, ejecutar tests.

**Ejemplo: deploy a Vercel tras merge en main:**

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

Los secretos se configuran en Settings → Secrets and variables → Actions.

## Eventos comunes

| Evento | Cuándo se dispara |
|--------|-------------------|
| `push` | Al hacer push a una rama |
| `pull_request` | Al abrir o actualizar un PR |
| `workflow_dispatch` | Manual (botón "Run workflow") |
| `schedule` | Según cron (p. ej. `0 0 * * *` = medianoche diaria) |
| `release` | Al publicar un release |

## Relación con otras notas

- [Pull Requests](/docs/github/pull-requests): los checks de Actions aparecen en el PR; se pueden requerir para merge.
- [Despliegue](/docs/desarrollo-web/crear-aplicacion-web-diagramas): diagramas de pipeline y hosting.
