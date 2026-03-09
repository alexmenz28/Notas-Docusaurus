---
id: poo-en-csharp
title: POO en C#
sidebar_label: POO en C#
slug: /paradigmas-programacion/poo/poo-en-csharp

type: paradigma
category: poo
tags:
  - csharp
  - poo
topics:
  - desarrollo-backend
nivel: basico
estado: borrador
origen: notas-personales
keywords:
  - c# oop
---

# POO en C#

## Qué es

C# es un lenguaje **orientado a objetos** con clases, herencia, interfaces, clases abstractas, propiedades, eventos y genéricos. Todo el código vive en tipos (clases, structs, interfaces, enums); la visibilidad se controla con modificadores (`public`, `private`, `protected`, `internal`).

## Para qué sirve

Sirve para **implementar modelos de dominio**, capas de servicio y librerías reutilizables en .NET: encapsulación, herencia y polimorfismo están en el núcleo del lenguaje; los genéricos y las interfaces permiten desacoplar y testear con mocks.

## Cómo se aplica

Defines clases con campos, propiedades y métodos; usas herencia (`: Base`) e implementación de interfaces (`: IRepository`); expones contratos con interfaces y opcionalmente clases abstractas; usas eventos y delegados para comunicación desacoplada. A continuación se detallan sintaxis y prácticas.

## Clases, objetos y visibilidad

En C# todo vive dentro de tipos; los más usados en POO son **clases** y **structs**. Una clase define campos, propiedades, métodos, constructores y eventos. La **visibilidad** se controla con `public`, `private`, `protected`, `internal`, `protected internal`.

- **Ejemplo:** `public class Pedido { private decimal _total; public decimal Total { get => _total; private set => _total = value; } }`
- Los **constructores** se declaran como métodos con el nombre de la clase; puedes tener sobrecargas y encadenar con `: this(...)`.

## Herencia, interfaces y abstracción

- **Herencia:** `class Hijo : Padre`. Una clase solo puede heredar de una clase; puede implementar varias interfaces: `class Servicio : IServicio, IDisposable`.
- **Interfaces:** Contratos sin implementación: `interface IRepository<T> { T GetById(int id); void Save(T entity); }`.
- **Clases abstractas:** `abstract class Base { public abstract void Ejecutar(); protected virtual void PreEjecutar() { } }`. Pueden tener miembros implementados y abstractos; no se instancian.
- ** sealed:** Impide que una clase sea heredada; `sealed override` impide más overrides en la jerarquía.

## Propiedades, eventos y delegados

- **Propiedades:** Atajos para get/set con lógica; autoimplementadas `public string Nombre { get; set; }` o con backing field y validación.
- **Eventos:** Mecanismo built-in para el patrón Observer: `public event EventHandler<MiArgs> AlCambiar;` y `AlCambiar?.Invoke(this, args);`.
- **Delegados:** Tipos que representan referencias a métodos: `Func<T, TResult>`, `Action<T>`, o delegados personalizados; base de eventos y callbacks.

## Genéricos

Las **clases, interfaces y métodos genéricos** permiten escribir código reutilizable para cualquier tipo respetando type-safety: `class Repository<T> where T : class, IEntity`, `T GetById(int id)`.

- **Constraints:** `where T : class`, `where T : struct`, `where T : Base`, `where T : IInterface`, `where T : new()`.
- **Covarianza y contravarianza** en interfaces: `IEnumerable<out T>`, `IComparer<in T>`.

## Características modernas (records, pattern matching, etc.)

- **Records** (C# 9+): Tipos orientados a datos con igualdad por valor: `record Usuario(string Nombre, int Edad);` genera constructor, propiedades, `Equals` y `GetHashCode` por miembros.
- **Pattern matching:** `switch` por tipo y forma: `valor switch { int i => i * 2, string s => s.Length, _ => 0 }`; `if (o is Pedido p) { ... }`.
- **Init-only properties**, **nullable reference types** (`string?`), **default interface members** (métodos con implementación en interfaces desde C# 8) completan el modelo POO moderno en C#.

