---
id: poo-patrones-creacionales
title: Patrones creacionales
sidebar_label: Patrones creacionales
slug: /paradigmas-programacion/poo/patrones-creacionales

type: paradigma
category: poo
tags:
  - patrones-diseno
  - creacionales
topics:
  - diseno-software
nivel: intermedio
estado: borrador
origen: notas-personales
keywords:
  - design patterns creational
---

# Patrones creacionales

## Qué es

Los patrones **creacionales** abstraen el proceso de **creación de objetos**, desacoplando el código cliente de las clases concretas y de cómo se construyen (Singleton, Factory Method, Abstract Factory, Builder, Prototype, etc.).

## Para qué sirve

Sirve para **centralizar y flexibilizar** la creación de objetos: poder cambiar las implementaciones concretas, controlar el número de instancias (p. ej. una sola) o construir objetos complejos paso a paso sin que el cliente conozca los detalles.

## Cómo se aplica

Introduces una capa entre el cliente y el “new”: un método estático o de fábrica, una clase Builder o un Prototype. El cliente pide “un producto” o “un servicio” y recibe la instancia adecuada sin depender de la clase concreta. Los siguientes apartados detallan cada patrón.

## Singleton

Garantiza **una única instancia** de una clase en toda la aplicación y un punto de acceso global (o mediante inyección).

- **C#:** Instancia estática privada, constructor privado, propiedad/método estático que devuelve la instancia. En entornos con DI suele preferirse registrar el tipo como “single instance” en el contenedor en vez de un Singleton estático.
- **TypeScript:** Módulo con objeto exportado o clase con instancia estática; en Node el propio módulo ya actúa como singleton al ser cacheado.
- **Cuándo usarlo:** Configuración global de solo lectura, *feature flags* estáticos u otros recursos que deban ser únicos en el proceso. **Evitar** para conexiones abiertas a BD: suele ser un antipatrón (mejor pool del driver/ORM). El patrón también dificulta tests y escalado si se abusa del estado global.

## Factory Method

Una clase **define un método** que crea objetos, pero delega en subclases (o sobrecargas) la **clase concreta** a instanciar.

- El cliente llama a un método “crear” y recibe un objeto del tipo abstracto; la subclase decide qué implementación devolver.
- **Ejemplo:** `Documento.CrearPagina()` devuelve `Pagina`; `Informe` devuelve `PaginaInforme`, `Web` devuelve `PaginaWeb`.

## Abstract Factory

Proporciona una **interfaz para crear familias de objetos relacionados** sin especificar clases concretas. Cada “fábrica concreta” produce un conjunto coherente de productos (por ejemplo, widgets para Windows vs para macOS).

- **Ejemplo:** `IGUIFactory` con `CrearBoton()` y `CrearCampo()`. `WindowsFactory` y `MacFactory` implementan la interfaz y devuelven controles nativos de cada plataforma.
- Útil para mantener consistencia entre objetos que deben trabajar juntos.

## Builder

Separa la **construcción de un objeto complejo** de su representación, de modo que el mismo proceso de construcción pueda crear distintas representaciones. El cliente usa un objeto “builder” y llama a métodos encadenados para configurar paso a paso; al final se obtiene el producto.

- **Ejemplo:** `InformeBuilder.AgregarTitulo("X").AgregarSeccion("Y").ConFormato(Pdf).Build()`.
- **C#:** Clase `Builder` con métodos que devuelven `this` para encadenar; método `Build()` que devuelve el objeto final.
- **TypeScript:** Misma idea; opcionalmente tipos estrictos para obligar a llamar a ciertos métodos antes de `build()`.

## Prototype

Crea nuevos objetos **clonando** un prototipo (instancia existente) en vez de construir desde cero. Útil cuando la construcción es costosa o cuando quieres independizar el cliente de las clases concretas.

- **C#:** Implementar `ICloneable` o un método `Clone()` que devuelva una copia (superficial o profunda según el caso).
- **TypeScript:** Método `clone()` que devuelve `{ ...this }` o una copia profunda; en clases con referencias anidadas hay que definir bien la semántica de copia.

