---
id: xp
title: Extreme Programming (XP)
sidebar_label: XP
slug: /metodologias/xp

type: metodologia
category: metodologias
tags:
  - agile
  - calidad
  - buenas-practicas
topics:
  - desarrollo-software
nivel: intermedio
estado: en_revision
origen: notas-personales
keywords:
  - extreme programming
  - xp
  - practicas de ingenieria
---

# Extreme Programming (XP)

## Términos

- **XP:** Extreme Programming. **TDD:** Test-Driven Development (desarrollo guiado por pruebas: escribir la prueba primero, luego el código mínimo, luego refactorizar). **PO:** Product Owner (en XP suele hablarse de “cliente” en el equipo).

## Qué es

XP es una metodología ágil centrada en **prácticas de ingeniería** (programación en pareja, TDD, integración continua, refactorización, propiedad colectiva del código) para mejorar la calidad del software y la respuesta al cambio. Se apoya en valores como comunicación, simplicidad, feedback, coraje y respeto.

## Para qué sirve

Sirve para **mantener el código de calidad y evolucionable**: las pruebas y la refactorización reducen deuda técnica; la integración continua detecta problemas pronto; el trabajo en pareja reparte conocimiento. Ayuda a equipos que quieren entregar valor frecuente sin que la base de código se degrade.

## Cómo se reconoce y cómo aplicarla

Se reconoce por el uso explícito de TDD, programación en pareja, integración continua (build + tests automáticos), refactorización continua y planificación por iteraciones con historias. Para aplicarla: empieza por una o dos prácticas (p. ej. TDD e integración continua), extiende a pair programming y propiedad colectiva del código, y alinea iteraciones y feedback con el cliente (o con Scrum si usas ambos).

## Prácticas clave

- **Programación en pareja (*Pair Programming*)**
  - Dos desarrolladores trabajando juntos en la misma tarea.
  - Uno escribe código, el otro revisa en tiempo real; se alternan con frecuencia.

- **Desarrollo guiado por pruebas (*TDD*)**
  1. Escribir una prueba que falle.
  2. Escribir el código mínimo para que la prueba pase.
  3. Refactorizar manteniendo las pruebas verdes.

- **Integración continua**
  - Integrar cambios con frecuencia (varias veces al día).
  - Ejecutar automáticamente la suite de pruebas.

- **Refactorización continua**
  - Mejorar el diseño del código sin cambiar su comportamiento observable.
  - Se hace con apoyo de las pruebas automatizadas.

- **Propiedad colectiva del código**
  - Cualquier miembro del equipo puede modificar cualquier parte del código.

## Ciclo de vida típico en XP

Una visión simple del ciclo de vida de un equipo que aplica XP podría verse así:

1. **Exploración (Exploration phase)**
   - El cliente define historias de usuario con las funcionalidades deseadas.
   - El equipo explora tecnologías, herramientas y arquitectura inicial.
   - Se entienden los riesgos principales.
2. **Planificación (Planning phase)**
   - El cliente prioriza historias.
   - El equipo estima el esfuerzo (habitualmente con story points).
   - Se define el primer release y las iteraciones iniciales.
3. **Iteraciones (Iterations to Release)**
   - Selección de historias.
   - Diseño simple.
   - Programación en parejas.
   - Desarrollo guiado por pruebas (TDD).
   - Integración continua.
   - Refactorización constante.
4. **Producción (Production phase)**
   - Se estabiliza el sistema.
   - Se corrigen errores.
   - Se prepara el software para producción.
   - Se realizan pruebas adicionales (aceptación, rendimiento, etc.).
   **Resultado:** versión del producto lista para entregar.
5. **Mantenimiento (Maintenance phase)**
   - Se siguen agregando nuevas historias.
   - Se realizan correcciones.
   - Se ejecutan nuevas iteraciones de mantenimiento.
6. **Finalización (Death phase)**
   - Ya no se encuentran historias significativas.
   - El cliente decide cerrar el desarrollo.
   - El coste de seguir agregando funciones es mayor que el beneficio.
   - Se realiza una entrega final y documentación esencial.

## Ejemplo sencillo de TDD

Supongamos que quieres una función `esMayorDeEdad(edad)` que devuelva `true` si la edad es mayor o igual a 18.

1. **Prueba primero**:

```ts
// tests/esMayorDeEdad.test.ts
import {esMayorDeEdad} from '../src/esMayorDeEdad';

test('mayor de edad con 18 o más', () => {
  expect(esMayorDeEdad(18)).toBe(true);
  expect(esMayorDeEdad(20)).toBe(true);
});

test('menor de edad con menos de 18', () => {
  expect(esMayorDeEdad(17)).toBe(false);
});
```

2. **Implementación mínima**:

```ts
// src/esMayorDeEdad.ts
export function esMayorDeEdad(edad: number): boolean {
  return edad >= 18;
}
```

3. **Refactorización**:

- Si más adelante necesitas validar otro tipo de reglas (por país, etc.), refactorizas manteniendo las pruebas verdes.

## Cuándo usar Scrum vs XP (idea general)

- **Scrum** se enfoca más en la **gestión del trabajo** (roles, eventos, artefactos).
- **XP** se enfoca más en **cómo se escribe el código** (prácticas de ingeniería).

En muchos equipos ágiles maduros se combinan: Scrum para la gestión y XP para las prácticas técnicas del día a día.

