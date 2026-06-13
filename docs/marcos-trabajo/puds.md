---
id: puds
title: Proceso Unificado de Desarrollo de Software (PUDS)
sidebar_label: PUDS
slug: /marcos-trabajo/puds

type: marco_trabajo
category: marcos_trabajo
tags:
  - proceso-unificado
  - RUP
  - gestion-proyectos
topics:
  - desarrollo-software
  - gestion-proyectos
nivel: intermedio
estado: en_revision
origen: notas-personales
keywords:
  - proceso unificado
  - unified process
  - rup
---

# Proceso Unificado de Desarrollo de Software (PUDS)

## Términos

- **PUDS:** Proceso Unificado de Desarrollo de Software. **RUP:** Rational Unified Process (metodología comercial muy ligada al proceso unificado en los años 2000; hoy se usa más como referencia histórica, aunque las ideas de fases e iteraciones siguen siendo útiles). **UML:** Unified Modeling Language, notación para modelos (diagramas de casos de uso, clases, etc.).

## Qué es

El Proceso Unificado es un proceso de ingeniería de software **iterativo e incremental**, habitualmente asociado a UML y RUP. Se organiza en **fases** (Inicio, Elaboración, Construcción, Transición) y **disciplinas** (requisitos, análisis, diseño, implementación, pruebas, despliegue), con foco en riesgo y arquitectura desde el principio.

## Para qué sirve

Sirve para **gestionar proyectos grandes o con alto riesgo** donde conviene fijar alcance y arquitectura antes de construir todo: en Inicio y Elaboración se validan requisitos y se estabiliza el diseño; en Construcción y Transición se desarrolla y entrega. Es útil cuando el cliente o el dominio exigen trazabilidad y documentación (p. ej. casos de uso, modelos UML).

## Cómo se reconoce y cómo aplicarlo

Se reconoce por la organización en fases (Inception, Elaboration, Construction, Transition), iteraciones dentro de cada fase, uso de casos de uso y diagramas UML, y por dedicar tiempo explícito a arquitectura y riesgos al inicio. Para aplicarlo: adapta las fases a la duración del proyecto, define hitos por fase, trabaja por iteraciones que entreguen casos de uso completos y ajusta el peso de cada disciplina según la fase.

## Fases principales

- **Inicio (Inception)**
  - Se define el alcance del sistema y el caso de negocio.
  - Se identifican actores y casos de uso de alto nivel.
- **Elaboración (Elaboration)**
  - Se refina la arquitectura.
  - Se aborda el mayor riesgo técnico y de requisitos.
- **Construcción (Construction)**
  - Se desarrolla la mayor parte de la funcionalidad.
  - Se realizan iteraciones que agregan casos de uso completos.
- **Transición (Transition)**
  - Se prepara el despliegue al entorno de producción.
  - Se realizan pruebas de aceptación y ajustes finales.

## Ciclo iterativo

En cada fase se realizan iteraciones que incluyen actividades de:

- Requisitos
- Análisis y diseño
- Implementación
- Pruebas
- Despliegue

La diferencia entre fases está en **el peso relativo** de cada actividad y los objetivos de negocio/técnicos en ese periodo.

