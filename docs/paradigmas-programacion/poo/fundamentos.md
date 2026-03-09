---
id: poo-fundamentos
title: Fundamentos de Programación Orientada a Objetos
sidebar_label: Fundamentos
slug: /paradigmas-programacion/poo/fundamentos

type: paradigma
category: poo
tags:
  - poo
  - fundamentos
topics:
  - diseno-software
nivel: basico
estado: borrador
origen: notas-personales
keywords:
  - object oriented programming
---

# Fundamentos de Programación Orientada a Objetos

## Términos

- **POO:** Programación Orientada a Objetos. **Clase:** plantilla que define atributos y métodos de un tipo de objetos. **Objeto / instancia:** entidad concreta creada a partir de una clase. **Encapsulación:** ocultar detalles internos y exponer una interfaz controlada. **Herencia:** una clase extiende otra y reutiliza o redefine comportamiento. **Polimorfismo:** tratar distintos tipos de forma uniforme gracias a una interfaz común.

## Qué es

La **POO** es un paradigma en el que el programa se organiza alrededor de **objetos**: entidades que combinan **datos** (atributos/estado) y **comportamiento** (métodos). Las clases actúan como plantillas para crear objetos; la interacción entre objetos se hace mediante **mensajes** (llamadas a métodos).

## Para qué sirve

Sirve para **modelar el dominio** con entidades que tienen identidad, estado y comportamiento, y para **estructurar el código** en módulos (clases) reutilizables y extensibles. La encapsulación protege invariantes; la herencia y el polimorfismo permiten variar comportamiento sin tocar código existente.

## Cómo se reconoce y cómo aplicarla

Se reconoce por la presencia de clases, objetos, herencia, interfaces o clases abstractas y por el uso de visibilidad (public/private/protected). Para aplicarla: identifica entidades y responsabilidades, define clases con estado y métodos coherentes, usa herencia o composición para reutilizar y aplica principios como SOLID para mantener el diseño limpio.

## Conceptos básicos

- **Objeto**: instancia concreta con identidad, estado y comportamiento. Ejemplo: un `Usuario` con nombre "Ana" y método `CambiarEmail()`.
- **Clase**: definición (plantilla) de un tipo de objetos: atributos y métodos que tendrán sus instancias.
- **Instancia**: un objeto concreto creado a partir de una clase (`new Usuario()`).
- **Atributo / campo**: dato que pertenece al objeto (estado).
- **Método**: operación asociada al objeto (comportamiento).
- **Mensaje**: invocación de un método en un objeto; el objeto decide cómo responder.
- **Encapsulación**: ocultar detalles internos y exponer solo una interfaz controlada (visibilidad `private`, `protected`, `public`).

## Pilares de POO

- **Encapsulación**: agrupar datos y operaciones en una unidad (clase) y restringir el acceso para proteger la consistencia del estado.
- **Abstracción**: exponer solo lo esencial y ocultar la complejidad interna (interfaces, clases abstractas).
- **Herencia**: una clase puede extender otra y reutilizar/cambiar comportamiento (subclase hereda de superclase).
- **Polimorfismo**: tratar objetos de distintas clases de forma uniforme gracias a una interfaz común; la llamada al método se resuelve en tiempo de ejecución según el tipo real del objeto.

## Ejemplos simples (C# y TypeScript)

**C#:**

```csharp
public class Usuario
{
    private string _nombre;
    public string Nombre
    {
        get => _nombre;
        set => _nombre = value ?? throw new ArgumentNullException(nameof(Nombre));
    }
    public Usuario(string nombre) => _nombre = nombre;
    public void Saludar() => Console.WriteLine($"Hola, soy {_nombre}");
}
// Uso: var u = new Usuario("Ana"); u.Saludar();
```

**TypeScript:**

```typescript
class Usuario {
  private nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  saludar(): void {
    console.log(`Hola, soy ${this.nombre}`);
  }
}
// Uso: const u = new Usuario("Ana"); u.saludar();
```

