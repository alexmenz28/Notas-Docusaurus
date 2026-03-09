---
id: poo-en-typescript
title: POO en TypeScript
sidebar_label: POO en TypeScript
slug: /paradigmas-programacion/poo/poo-en-typescript

type: paradigma
category: poo
tags:
  - typescript
  - poo
topics:
  - desarrollo-frontend
  - desarrollo-backend
nivel: basico
estado: borrador
origen: notas-personales
keywords:
  - typescript oop
---

# POO en TypeScript

## Qué es

TypeScript añade **soporte explícito para POO** sobre JavaScript: clases, modificadores de acceso (`public`, `private`, `protected`), interfaces, herencia y, con disciplina, encaje con patrones clásicos (Strategy, Observer, etc.). El código se compila a JavaScript; la tipificación y el POO ayudan en tiempo de desarrollo.

## Para qué sirve

Sirve para **estructurar aplicaciones** frontend o Node con modelos tipados, encapsulación y reutilización por herencia o composición. Las interfaces permiten contratos claros y sustitución (polimorfismo); las clases organizan estado y comportamiento de dominio o servicios.

## Cómo se aplica

Defines clases con constructor y propiedades; usas `implements` para interfaces y `extends` para herencia; expones solo lo necesario con `public`/`private`/`protected`. Puedes combinar clases con tipos e interfaces para describir formas de datos. A continuación se detallan sintaxis y opciones.

## Clases y modificadores de acceso

TypeScript añade **clases** con sintaxis similar a ES6 y modificadores de acceso: `public`, `private`, `protected`, `readonly`. El constructor puede declarar parámetros con modificadores para declarar y asignar propiedades en uno (**parameter properties**).

```typescript
class Usuario {
  constructor(
    public readonly id: string,
    private _email: string,
    protected rol: string
  ) {}
  get email() { return this._email; }
  set email(v: string) { this._email = v; }
}
```

- **private** / **protected** solo existen en tiempo de compilación; en JavaScript emitido los miembros son públicos. A partir de TS 4.3 existe `#campo` (campos privados reales en runtime).

## Interfaces y tipos

- **Interfaces:** Contratos para la forma de los objetos: `interface IUsuario { id: string; nombre: string; }`. Pueden extenderse (`extends`) y describir métodos y propiedades opcionales.
- **Types:** `type Usuario = { id: string; nombre: string; }`. Permiten uniones (`type Id = string | number`), intersecciones y mapeos.
- Para POO, las **interfaces** se usan para contratos (implementables con `implements`); los **types** para uniones, tuplas y formas de datos. Ambos soportan firma de índices y genéricos.

## Herencia y clases abstractas

- **Herencia:** `class Admin extends Usuario { ... }`. `super` para llamar al constructor y métodos de la clase base.
- **Clases abstractas:** `abstract class Base { abstract ejecutar(): void; }`. No se pueden instanciar; sirven como base para subclases que implementen los miembros abstractos.
- **implements:** Una clase puede implementar una o varias interfaces: `class Servicio implements ILogger, IConfigurable { ... }`.

## Genéricos

Clases, interfaces y funciones pueden ser genéricas: `class Repo<T> { find(id: string): T | null { ... } }`, `interface IRepo<T> { find(id: string): T | null; }`, `function first<T>(arr: T[]): T | undefined`.

- **Constraints:** `function compare<T extends { id: string }>(a: T, b: T): number`.
- **Utility types:** `Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>` ayudan a derivar tipos en código POO y APIs.

## POO idiomática en frontend y backend

- **Backend (NestJS):** Uso intensivo de clases para controladores, servicios, repositorios e inyección de dependencias; interfaces para contratos y mocks en tests.
- **Frontend (Angular):** Componentes y servicios son clases; decoradores definen metadatos. En **React** con TypeScript, las clases son menos habituales que funciones + hooks; aun así, clases para componentes legacy o para modelar dominio compartido.
- **Recomendación:** Usar clases cuando modeles entidades de dominio, servicios o capas con estado; usar tipos/interfaces para DTOs, props y formas de datos. Evitar jerarquías profundas; preferir composición e interfaces pequeñas.

