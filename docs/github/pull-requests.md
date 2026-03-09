---
id: github-pull-requests
title: GitHub — Pull Requests
sidebar_label: Pull Requests
slug: /github/pull-requests

type: herramienta
category: github
tags:
  - pull-request
  - code-review
  - merge
topics:
  - desarrollo-software
  - colaboracion
nivel: basico
estado: en_revision
origen: notas-personales
keywords:
  - pull request
  - PR
  - merge
  - code review
---

# GitHub — Pull Requests

## Términos

- **Pull Request (PR):** Propuesta para integrar cambios de una rama en otra (normalmente feature → main). Incluye diff, descripción, revisión y comentarios.
- **Merge:** Integrar los commits de una rama en otra; el PR puede cerrarse con merge (merge commit, squash o rebase).
- **Code review:** Revisión del código por otros antes de aprobar el merge; comentarios en líneas específicas, aprobación o solicitud de cambios.
- **Reviewer:** Persona asignada para revisar el PR.
- **Squash:** Fusionar todos los commits del PR en uno solo al hacer merge; historial más limpio.

## Qué es

Un **Pull Request** es una solicitud en GitHub para “fusionar” una rama en otra. Muestra el diff (cambios), permite comentar, aprobar o pedir cambios y, al final, hacer merge. Es el estándar para integrar código en equipos: nadie escribe directamente en main; todo pasa por PR y revisión.

## Para qué sirve

- **Revisión de código:** Otros revisan el código antes de integrarlo; se detectan bugs, mejoras y se comparte conocimiento.
- **Discusión:** Comentarios en líneas específicas; preguntas sobre el diseño o la implementación.
- **Integración controlada:** Merge solo cuando se aprueba; el historial queda documentado (quién, qué, cuándo).
- **CI/CD:** GitHub Actions puede ejecutar tests en cada PR; el merge se bloquea si fallan.

## Cómo se aplica

**Crear un PR:**

1. Sube tu rama: `git push origin feature/mi-cambio`
2. En GitHub aparece el botón "Compare & pull request" (o crea el PR desde la pestaña Pull requests).
3. Elige base (main) y compare (tu rama).
4. Describe qué hace el cambio y por qué.
5. Asigna revisores si aplica.
6. Espera a que pasen los checks (Actions) y a la aprobación.

**Revisar un PR:**

- Abre el PR; revisa el diff.
- Comenta en líneas concretas (clic en el número de línea).
- Aprueba o solicita cambios.
- El autor puede responder y hacer nuevos commits.

**Hacer merge:**

- Opciones: Merge commit (mantiene historial), Squash (un commit), Rebase (commits lineales).
- El merge se hace desde la web o con `git merge` en local si tienes permisos.

## Configuración de ramas protegidas

En Settings → Branches puedes proteger `main` (o la rama principal):

- Requerir PR antes de merge.
- Requerir aprobaciones.
- Requerir que pasen los checks (Actions).
- Evitar push directo; todo debe pasar por PR.

## Relación con otras notas

- [Ramas y commits](/docs/github/ramas-y-commits): crear ramas y subir cambios.
- [GitHub Actions](/docs/github/github-actions): tests y checks automáticos en PRs.
