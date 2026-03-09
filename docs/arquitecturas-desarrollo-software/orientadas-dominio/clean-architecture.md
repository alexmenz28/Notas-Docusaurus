---
id: arquitectura-clean
title: Clean Architecture
sidebar_label: Clean Architecture
slug: /arquitecturas-desarrollo-software/orientadas-dominio/clean-architecture

type: arquitectura
category: arquitecturas_desarrollo_software
tags:
  - clean-architecture
  - ddd
topics:
  - diseno-software
  - backend
nivel: intermedio
estado: borrador
origen: notas-personales
keywords:
  - clean architecture
---

# Clean Architecture

## Qué es

Clean Architecture organiza el sistema en **anillos concéntricos** donde las dependencias siempre apuntan **hacia el centro**: en el centro están las entidades de dominio y reglas de negocio; hacia fuera, casos de uso e interfaces; en el anillo externo, frameworks, UI, BD. Los detalles técnicos dependen del dominio, nunca al revés. *(UI = User Interface, interfaz de usuario; BD = base de datos.)*

## Para qué sirve

Sirve para **mantener el dominio estable e independiente** de frameworks y bases de datos: puedes cambiar tecnología sin reescribir la lógica de negocio. Maximiza la **testabilidad** (el núcleo se prueba sin BD ni HTTP) y facilita que el equipo comparta un criterio claro de dónde va cada tipo de código.

## Cómo se reconoce y cómo aplicarla

- **En el código:** Proyectos o carpetas como `Domain` (entidades puras), `Application` o `UseCases` (orquestación que usa interfaces), `Infrastructure` (implementaciones de repositorios, APIs externas), `Web` o `API` (controllers que llaman a casos de uso). La regla: nada del centro importa nada del exterior; la infra implementa interfaces definidas en el núcleo.
- **En la práctica:** Las entidades no conocen la BD ni el framework; los casos de uso reciben repositorios por interfaz. Si ves `using EntityFramework` o `import express` en el paquete de dominio, la dependencia está invertida y hay que moverla a un adaptador.

## Cuándo usarla

- Sistemas con **dominio relevante** que quieres mantener independiente de frameworks.
- Proyectos de medio/largo plazo donde sabes que **cambiarán las tecnologías** (UI, BD, etc.).
- Cuando quieres maximizar **testabilidad del dominio** y de los casos de uso.

## Ventajas

- Fuerte **independencia de frameworks** y detalles técnicos.
- Dominios más **testables y estables** en el tiempo.
- Estructura que se adapta bien a DDD y a arquitecturas como hexagonal/onion.

## Desventajas

- Curva de aprendizaje más alta para equipos sin experiencia en diseño por capas limpias.
- Más archivos/capas de lo que parece necesario en aplicaciones pequeñas.
- Si se aplica mecánicamente, puede añadir complejidad sin un beneficio claro.

## Ejemplos / diagramas

```mermaid
flowchart TB
  UI[UI / Frameworks] --> CASOS[Casos de uso]
  CASOS --> DOMINIO[Entidades de dominio]
  CASOS --> ADAPTADORES[Interfaces / Gateways]
  ADAPTADORES --> INFRA[Infraestructura (BD, APIs externas)]
```

## Instalación / puesta en marcha

Referencias y guías prácticas:

- Libro *Clean Architecture* de Robert C. Martin.
- Ejemplos en:
  - **Java/Spring**: proyectos de referencia que separan `domain`, `usecase`, `infrastructure`.
  - **.NET**: plantillas tipo “Clean Architecture Template”.
  - **Node/NestJS**: separar `domain`, `application`, `infrastructure` y conectar con inyección de dependencias.

En tu biblioteca puedes documentar **tu plantilla concreta** (árbol de carpetas, nombres de capas y ejemplos de casos de uso).

