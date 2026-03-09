---
id: github-ramas-y-commits
title: GitHub — Ramas y commits
sidebar_label: Ramas y commits
slug: /github/ramas-y-commits

type: herramienta
category: github
tags:
  - git
  - ramas
  - commits
  - push
  - pull
topics:
  - desarrollo-software
nivel: basico
estado: en_revision
origen: notas-personales
keywords:
  - branch
  - commit
  - push
  - pull
---

# GitHub — Ramas y commits

## Términos

- **Commit:** Punto de guardado en el historial; incluye mensaje, autor, fecha y los cambios (diff) respecto al commit anterior.
- **Rama (branch):** Línea de desarrollo paralela; permite aislar cambios (feature, fix) sin tocar la rama principal.
- **main / master:** Rama principal por defecto; muchos proyectos usan `main` como rama estable.
- **Push:** Enviar commits locales al repositorio remoto (GitHub).
- **Pull:** Traer commits del remoto a tu rama local; `git pull` = fetch + merge.
- **Merge:** Integrar los cambios de una rama en otra (p. ej. feature → main).

## Qué es

- **Commit:** Un snapshot de los cambios que has añadido al staging con `git add`. Cada commit tiene un hash único (SHA) y forma parte del historial.
- **Rama:** Una rama es un puntero móvil a un commit; puedes crear ramas para features, bugs o experimentos y fusionarlas después con `merge` o `rebase`.

## Para qué sirve

- **Commits:** Guardar progreso de forma incremental; mensajes claros ayudan a entender el historial y a hacer rollback si hace falta.
- **Ramas:** Trabajar en paralelo sin romper la rama principal; facilitar code review (PR por rama) y releases.
- **Push:** Subir tu trabajo a GitHub para que otros lo vean o para abrir un PR.
- **Pull:** Mantener tu rama local actualizada con los cambios del remoto (otros desarrolladores, CI, etc.).

## Cómo se aplica

**Flujo básico:**

```bash
# Crear rama y cambiar a ella
git checkout -b feature/nueva-funcion

# Hacer cambios, añadir y commitear
git add .
git commit -m "feat: añadir nueva función"

# Subir la rama al remoto
git push -u origin feature/nueva-funcion
```

**Actualizar tu rama con main:**

```bash
git checkout main
git pull origin main
git checkout feature/nueva-funcion
git merge main
```

**Buenas prácticas de commits:**

- Mensajes claros y descriptivos: `feat: añadir login`, `fix: corregir cálculo de total`, `docs: actualizar README`.
- Commits atómicos: un cambio lógico por commit.

## Comandos principales

| Comando | Qué hace |
|---------|----------|
| `git status` | Ver estado de archivos (modificados, staged, etc.) |
| `git add <archivo>` | Añadir archivos al staging |
| `git commit -m "mensaje"` | Crear commit con los cambios staged |
| `git branch` | Listar ramas |
| `git checkout -b nombre` | Crear y cambiar a nueva rama |
| `git push origin rama` | Subir rama al remoto |
| `git pull origin rama` | Traer y fusionar cambios del remoto |

## Relación con otras notas

- [Repositorios](/docs/github/repositorios): clone, fork, remotes.
- [Pull Requests](/docs/github/pull-requests): proponer merge de ramas en GitHub.
