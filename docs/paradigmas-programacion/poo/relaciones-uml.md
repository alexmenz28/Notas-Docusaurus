---
id: poo-relaciones-uml
title: Relaciones en UML orientado a objetos
sidebar_label: Relaciones UML
slug: /paradigmas-programacion/poo/relaciones-uml

type: paradigma
category: poo
tags:
  - uml
  - relaciones
topics:
  - diseno-software
nivel: basico
estado: borrador
origen: notas-personales
keywords:
  - uml associations
---

# Relaciones UML orientadas a objetos

## Qué es

En el diagrama de clases, las **relaciones** describen cómo las clases se vinculan entre sí: asociación, agregación, composición, herencia y dependencia. Cada una tiene una notación y un significado distinto en cuanto a propiedad del ciclo de vida y acoplamiento.

## Para qué sirve

Sirve para **diseñar y comunicar** la estructura del modelo de dominio: quién conoce a quién, qué es “parte de” qué, qué puede existir de forma independiente. Ayuda a detectar acoplamientos fuertes o ciclos de dependencia antes de implementar.

## Cómo se aplica

Se aplica dibujando diagramas de clases (en papel, en herramienta o en código como documentación) y eligiendo el tipo de relación según si hay propiedad del ciclo de vida (composición), solo referencia (asociación) o reutilización de definición (herencia). En código se traduce en referencias, colecciones, herencia o inyección de dependencias. Resumen práctico:

## Asociación

Relación estructural entre clases: una “conoce” o “usa” a la otra. Puede tener multiplicidad (1, *, 0..1, etc.) y nombre del rol.

- **Ejemplo:** `Usuario` — *tiene* —> `Pedido[]`. Un usuario tiene varios pedidos.
- En código: un objeto mantiene una referencia a otro (campo, propiedad). No implica propiedad del ciclo de vida.

## Agregación

Asociación con sentido de “todo–parte” donde las partes **pueden existir sin el todo**. Se dibuja con un rombo vacío en el lado del todo.

- **Ejemplo:** `Departamento` ◇—> `Empleado`. Un departamento agrupa empleados, pero un empleado puede cambiar de departamento o existir sin uno.
- En código: el todo tiene una colección o referencia a las partes; las partes no son creadas/destruidas necesariamente por el todo.

## Composición

Relación “todo–parte” más fuerte: las partes **no tienen sentido sin el todo** y su ciclo de vida suele estar ligado a él. Rombo relleno en el lado del todo.

- **Ejemplo:** `Factura` ◆—> `LineaFactura`. Las líneas solo existen dentro de la factura; si se borra la factura, se borran las líneas.
- En código: el todo crea las partes y las posee; al destruir el todo se destruyen las partes (o se delega su borrado).

## Dependencia

Relación de uso puntual: una clase **usa** temporalmente a otra (parámetro, variable local, llamada estática). No hay referencia persistente. Se dibuja con flecha punteada.

- **Ejemplo:** `ServicioPedidos` - - - > `ILogger`. El servicio usa un logger en algunos métodos.
- En código: no hay campo de tipo `ILogger`; se recibe por parámetro o se obtiene de un contenedor en el momento del uso.

## Herencia / Realización

- **Herencia (generalización):** una clase hija extiende a una clase base y hereda atributos y métodos. Triángulo vacío en la clase base.
- **Realización:** una clase **implementa** una interfaz (cumple un contrato). Triángulo punteado en la interfaz.

En código: en C# `class B : A` y `class C : IAlgo`; en TypeScript `class B extends A` y `class C implements IAlgo`.

