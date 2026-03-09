---
id: github-issues-y-proyectos
title: GitHub — Issues y proyectos
sidebar_label: Issues y proyectos
slug: /github/issues-y-proyectos

type: herramienta
category: github
tags:
  - issues
  - proyectos
  - labels
  - milestones
topics:
  - desarrollo-software
  - gestion-proyectos
nivel: basico
estado: en_revision
origen: notas-personales
keywords:
  - issues
  - projects
  - labels
  - milestones
---

# GitHub — Issues y proyectos

## Términos

- **Issue:** Elemento de seguimiento: bug, feature, tarea o pregunta. Tiene título, descripción, estado (abierto/cerrado), asignados y etiquetas.
- **Label (etiqueta):** Categoría para etiquetar issues (p. ej. `bug`, `enhancement`, `documentation`).
- **Milestone (hito):** Agrupación de issues con fecha objetivo (p. ej. "v1.0", "Sprint 2024-01").
- **Proyecto (Projects):** Tablero (Kanban) o lista para organizar issues y PRs; columnas como "To Do", "In Progress", "Done".
- **Assignees:** Personas asignadas a un issue o PR.

## Qué es

- **Issues:** Sistema de tickets para bugs, mejoras y tareas. Cada issue puede estar abierto o cerrado; se puede vincular a PRs (cerrar issue con "Closes #123" en el PR).
- **Proyectos:** Tableros visuales (v2 o v3) para organizar issues y PRs; columnas personalizables, filtros por label, asignado, etc.

## Para qué sirve

- **Issues:** Registrar qué hay que hacer; discutir bugs; priorizar con labels y milestones.
- **Labels:** Filtrar y buscar (p. ej. todos los `bug`); automatizar workflows (p. ej. asignar según label).
- **Milestones:** Agrupar trabajo por versión o sprint; ver progreso hacia un objetivo.
- **Proyectos:** Vista visual del backlog; mover issues entre columnas según estado (To Do → In Progress → Done).

## Cómo se aplica

**Crear issue:**

1. En el repo: Issues → New issue.
2. Título claro y breve.
3. Descripción: qué hace falta, pasos para reproducir (bug), criterios de aceptación.
4. Labels: `bug`, `enhancement`, `documentation`, etc.
5. Asignar y opcionalmente añadir a un milestone.

**Crear proyecto:**

1. En el repo: Projects → New project.
2. Elegir plantilla (Kanban, Table) o empezar vacío.
3. Añadir issues desde el panel o conectar el proyecto al repo.

**Cerrar issue desde un PR:**

En el mensaje del PR o en un commit:

```
Closes #42
```

o `Fixes #42` — al hacer merge del PR, el issue #42 se cierra automáticamente.

## Labels y milestones recomendados

- **Labels:** `bug`, `enhancement`, `documentation`, `good first issue`, `help wanted`, `priority: high`, `priority: low`.
- **Milestones:** Versiones de producto (v1.0, v2.0) o sprints si el equipo los usa.

## Relación con otras notas

- [Pull Requests](/docs/github/pull-requests): vincular PRs con issues (Closes #).
- [Scrum](/docs/marcos-trabajo/scrum): los issues pueden usarse como backlog de sprint.
