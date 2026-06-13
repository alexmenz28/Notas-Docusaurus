---
id: scrum
title: Scrum
sidebar_label: Scrum
slug: /marcos-trabajo/scrum

type: marco_trabajo
category: marcos_trabajo
tags:
  - agile
  - gestion-proyectos
  - equipos
topics:
  - desarrollo-software
  - producto
nivel: intermedio
estado: en_revision
origen: notas-personales
keywords:
  - scrum
  - marco de trabajo agil
  - sprints
---

# Scrum

## Términos

- **PO:** Product Owner. **SM:** Scrum Master. **Sprint:** iteración de tiempo fijo (p. ej. 2 semanas) en la que se entrega un incremento. **Backlog:** lista priorizada de trabajo (Product Backlog = todo el producto; Sprint Backlog = lo elegido para el sprint).

## Qué es

Scrum es un marco de trabajo ágil para gestionar productos complejos mediante iteraciones cortas llamadas *sprints*. Define **roles** (Product Owner, Scrum Master y Developers), **eventos** (planning, daily, review, retrospectiva) y **artefactos** (backlogs, incremento) para inspeccionar y adaptar producto y proceso en ciclos cortos. La *Scrum Guide* (2020) habla del **Scrum Team** como unidad formada por esas tres figuras; antes se usaba mucho el término *Development Team* para el grupo que construye el incremento.

## Para qué sirve

Sirve para **entregar valor de forma incremental** y **reducir riesgo**: en lugar de planificar todo al inicio, priorizas, entregas en sprints y ajustas según feedback. Facilita la colaboración con negocio (PO) y que el equipo se auto-organice y mejore (retrospectivas).

## Cómo se reconoce y cómo aplicarlo

Se reconoce por la presencia de sprints de duración fija, reuniones típicas (planning, daily, review, retro), un Product Backlog priorizado y un incremento entregable al final de cada sprint. Para aplicarlo: define duración de sprint y roles, mantén un backlog priorizado, celebra los eventos con el equipo y usa el incremento y la retro para mejorar en el siguiente ciclo.

## Roles

- **Product Owner (PO)**: maximiza el valor del producto, prioriza el *Product Backlog*.
- **Scrum Master (SM)**: facilita el marco de Scrum, elimina impedimentos, ayuda al equipo a mejorar.
- **Developers (desarrolladores):** personas del Scrum Team que crean cada incremento usable; se comprometen con el trabajo del sprint y la *Definition of Done*.

## Eventos

- **Sprint**: iteración fija (por ejemplo, 2 semanas) en la que se entrega un incremento usable.
- **Sprint Planning**: se define el objetivo del sprint y qué trabajo se hará.
- **Daily Scrum**: reunión diaria corta para sincronizar al equipo.
- **Sprint Review**: se inspecciona el incremento con *stakeholders*.
- **Sprint Retrospective**: el equipo revisa cómo trabajó y decide mejoras.

## Artefactos

- **Product Backlog**: lista priorizada de todo lo que podría hacerse en el producto.
- **Sprint Backlog**: subconjunto del Product Backlog seleccionado para el sprint.
- **Incremento:** conjunto de ítems del *Product Backlog* completados de forma que cumplen la *Definition of Done*, en un estado usable y alineado con el *Product Goal*. Suele entenderse como el producto en un estado entregable al cierre del sprint (y acumulando valor respecto a incrementos anteriores cuando el producto ya estaba en producción).

## Ejemplo sencillo de Sprint

1. El PO prioriza historias de usuario en el Product Backlog.
2. En la Sprint Planning, el equipo selecciona historias y define el **objetivo de sprint**.
3. Cada día, en la Daily, el equipo revisa progreso y ajusta el plan.
4. Al final:
   - En la Sprint Review se muestra el incremento funcionando.
   - En la Retro se acuerdan 1–2 acciones concretas de mejora para el siguiente sprint.

## Ejemplo de historia de usuario

```markdown
Como usuario autenticado
Quiero ver un listado de mis tareas pendientes
Para poder organizar mi trabajo diario
```

Posibles criterios de aceptación:

- Se muestran solo las tareas del usuario autenticado.
- Puedo marcar tareas como completadas.
- El listado se recarga sin recargar toda la página.

