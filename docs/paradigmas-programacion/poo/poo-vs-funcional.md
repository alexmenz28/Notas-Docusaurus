---
id: poo-vs-funcional
title: POO vs programación funcional
sidebar_label: POO vs funcional
slug: /paradigmas-programacion/poo/poo-vs-funcional

type: paradigma
category: poo
tags:
  - poo
  - funcional
topics:
  - paradigmas
nivel: intermedio
estado: borrador
origen: notas-personales
keywords:
  - oop vs functional
---

# POO vs programación funcional

## Qué es

- **POO** organiza el programa alrededor de **objetos** (estado + comportamiento) y **mensajes** entre ellos; el estado puede ser mutable y encapsulado.
- **Programación funcional** enfatiza **funciones puras**, **inmutabilidad** y **composición de funciones**; se evita el estado mutable compartido y los efectos secundarios en el flujo principal.

No son excluyentes: muchos lenguajes y proyectos combinan ambos.

## Para qué sirve esta comparación

Sirve para **elegir o combinar** enfoques según el problema: dominios con entidades e identidad suelen encajar bien con POO; transformaciones de datos, pipelines y lógica sin estado compartido suelen encajar con funcional. Entender ambos ayuda a leer código ajeno y a diseñar APIs más claras.

## Cómo se aplica

No hay una regla única: revisa si el núcleo del problema es “entidades con ciclo de vida” (favorece POO) o “transformaciones y composición” (favorece funcional); en muchos proyectos se usan clases para el dominio y funciones puras para servicios o utilidades. Las secciones “Cuándo favorecer POO” y “Cuándo favorecer funcional” dan criterios concretos.

## Diferencias clave

| Aspecto        | POO                         | Funcional                          |
|----------------|-----------------------------|------------------------------------|
| Unidad base    | Objeto (estado + métodos)   | Función                            |
| Estado         | Mutable encapsulado         | Inmutable, evolución por nuevos valores |
| Énfasis        | Encapsulación, identidad    | Composición, transformaciones      |
| Flujo          | Mensajes entre objetos      | Composición y pipelines de funciones |
| Efectos        | Métodos con side effects    | Efectos acotados (IO al borde)     |

## Cuándo favorecer POO

- Dominios con **entidades con identidad** y ciclo de vida (usuarios, pedidos, facturas) donde el estado y las invariantes son centrales.
- Sistemas con **muchas interfaces** (UI, APIs, eventos) que se modelan bien con polimorfismo y encapsulación.
- Equipos y codebases que ya piensan en términos de objetos y responsabilidades por clase.

## Cuándo favorecer funcional

- **Transformaciones de datos** y pipelines (ETL, reportes, APIs que mapean/filtran).
- Lógica **sin estado compartido** y fácil de testear con entradas/salidas puras.
- Concurrencia y paralelismo donde la inmutabilidad reduce errores (menos condiciones de carrera).

## Enfoques híbridos en C# y TypeScript

- **C#:** LINQ es funcional (expresiones, delegados, inmutabilidad de secuencias); el resto del dominio puede seguir siendo POO. Records + pattern matching acercan el modelo de datos al estilo “valor” funcional.
- **TypeScript:** Funciones puras y composición para lógica de negocio y transformaciones; clases e interfaces para modelos de dominio, servicios e integración con frameworks (NestJS, Angular). Evitar mutar parámetros; usar `readonly` y tipos inmutables donde tenga sentido.

