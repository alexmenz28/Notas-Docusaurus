---
id: historias-usuario
title: Historias de Usuario
sidebar_label: Historias de Usuario
slug: /practicas-agiles/historias-usuario

type: practica_agil
category: practicas_agiles
tags:
  - requisitos
  - agile
  - producto
topics:
  - analisis-requisitos
  - gestion-proyectos
nivel: basico
estado: en_revision
origen: notas-personales
keywords:
  - historias de usuario
  - user stories
---

# Historias de Usuario

## Términos

- **Historia de usuario:** descripción breve de una necesidad desde el punto de vista del usuario o **stakeholder** (interesado en el producto). **Criterios de aceptación:** condiciones que deben cumplirse para dar la historia por terminada.

## Qué son

Una historia de usuario describe una necesidad desde el punto de vista del **usuario o stakeholder**, normalmente con una plantilla sencilla (Como… Quiero… Para…).

## Para qué sirven

Sirven para **comunicar requisitos** en lenguaje de negocio, **priorizar** por valor y **dividir** el trabajo en unidades pequeñas y entregables. Los criterios de aceptación reducen ambigüedad y sirven de base para pruebas y definición de “hecho”.

## Cómo se aplican

Se escriben en el backlog (p. ej. Product Backlog en Scrum); se refinan y priorizan con el PO; se seleccionan para una iteración o sprint y se descomponen en tareas si hace falta. Cada historia debe ser completable en un ciclo y testeable con sus criterios de aceptación. A continuación: plantilla y ejemplos.

## Plantilla típica

```markdown
Como <tipo de usuario>
Quiero <objetivo o acción>
Para <beneficio o por qué>
```

Ejemplo:

```markdown
Como usuario autenticado
Quiero ver un listado de mis tareas pendientes
Para poder organizar mi trabajo diario
```

## Criterios de aceptación

Los criterios de aceptación aclaran los **límites** de la historia y cómo sabremos que está terminada.

Ejemplo para la historia anterior:

- Solo se muestran las tareas del usuario autenticado.
- Puedo marcar tareas como completadas.
- El listado se actualiza sin recargar toda la página.

## Características de buenas historias (INVEST)

- **I**ndependiente
- **N**egociable
- **V**aliosa
- **E**stimable
- **S**mall (pequeña)
- **T**estable

