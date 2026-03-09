---
id: poo-patrones-comportamiento
title: Patrones de comportamiento
sidebar_label: Patrones de comportamiento
slug: /paradigmas-programacion/poo/patrones-comportamiento

type: paradigma
category: poo
tags:
  - patrones-diseno
  - comportamiento
topics:
  - diseno-software
nivel: intermedio
estado: borrador
origen: notas-personales
keywords:
  - design patterns behavioral
---

# Patrones de comportamiento

## Qué es

Los patrones **de comportamiento** se centran en la **asignación de responsabilidades** entre objetos y en los **flujos de comunicación**: Strategy, Observer, Command, State, etc., definen quién hace qué y cómo se notifican cambios o peticiones.

## Para qué sirve

Sirve para **desacoplar** el que pide una acción del que la ejecuta (Command), el que cambia de estado del que reacciona (Observer), o el algoritmo concreto del contexto que lo usa (Strategy), y para **modelar estados** (State) o **cadenas de responsabilidad** (Chain of Responsibility).

## Cómo se aplica

Introduces abstracciones (interfaces) para la acción, la estrategia o el observador; el cliente depende de la abstracción y en tiempo de ejecución se inyecta la implementación concreta. En código se ve como interfaces + varias implementaciones, eventos/callbacks o objetos comando con `Ejecutar()`. Los siguientes apartados detallan cada patrón.

## Strategy

Define una **familia de algoritmos**, los encapsula y los hace intercambiables. El cliente usa una interfaz común; la estrategia concreta (inyectada o configurada) determina el comportamiento.

- **Ejemplo:** Cálculo de descuento: `IDescuento` con `Calcular(precio)`; implementaciones `SinDescuento`, `DescuentoPorcentaje`, `DescuentoFijo`. El contexto (pedido, factura) recibe la estrategia y la usa sin conocer el detalle.
- **C# / TypeScript:** Interfaz + varias implementaciones; el cliente recibe la estrategia por constructor o setter.

## Observer

Define una dependencia **uno a muchos** entre objetos: cuando uno (sujeto) cambia de estado, todos sus observadores son notificados y se actualizan. Desacopla el sujeto de quién consume sus cambios.

- **Ejemplo:** Un `Producto` notifica a `AlmacenObserver` y `UIObserver` cuando cambia el stock; cada uno reacciona (actualizar BD, refrescar pantalla).
- **C#:** Eventos (`event`), `IObservable<T>` / `IObserver<T>`; **TypeScript:** callbacks, RxJS `Subject`/`Observable`, o un pequeño bus de eventos.

## Command

Encapsula una **petición como objeto**, de modo que puedas parametrizar clientes con distintas peticiones, encolar, registrar logs o soportar deshacer. El objeto comando tiene un método `Ejecutar()` (y opcionalmente `Deshacer()`).

- **Ejemplo:** `IComando` con `Ejecutar()`. `ComandoCrearPedido`, `ComandoAprobarPedido`; una cola o un menú invocan `Ejecutar()` sin saber el detalle. Útil para undo/redo.
- **C# / TypeScript:** Interfaz con `execute()`; cada acción del dominio es una clase que implementa la interfaz.

## Template Method

Define el **esqueleto de un algoritmo** en una clase base, dejando que las subclases redefinan ciertos pasos sin cambiar la estructura del algoritmo.

- **Ejemplo:** `ProcesoAltaUsuario` con método `Ejecutar()` que llama a `Validar()`, `Persistir()`, `Notificar()`; la subclase redefine `Notificar()` para enviar email en vez de SMS.
- **C#:** Método con `virtual` o `abstract` en la base; **TypeScript:** clase base con métodos que las subclases sobrescriben.

## State

Permite que un objeto **altere su comportamiento** cuando su estado interno cambia; parece que cambia la clase del objeto. Cada estado es una clase que implementa la misma interfaz; el contexto delega en el estado actual.

- **Ejemplo:** `Pedido` con estados `Borrador`, `Enviado`, `Entregado`. Cada estado implementa `Confirmar()`, `Enviar()`, etc. de forma distinta; el pedido tiene una referencia al estado actual y delega en él.
- **C# / TypeScript:** Interfaz `IEstadoPedido`; clases `BorradorEstado`, `EnviadoEstado`, etc.; el contexto tiene `EstadoActual` y en cada acción llama a `EstadoActual.HacerX(this)`.

## Chain of Responsibility

Pasa una petición a lo largo de una **cadena de manejadores**; cada uno decide si la procesa o la pasa al siguiente. Desacopla el emisor de los receptores.

- **Ejemplo:** Pipeline de validación: `ValidadorNombre` → `ValidadorEmail` → `ValidadorEdad`; cada uno puede rechazar o pasar al siguiente.
- **C# / TypeScript:** Cada manejador tiene referencia al siguiente; en su método, si no puede manejar la petición la reenvía.

## Mediator

Define un objeto que **centraliza la comunicación** entre un conjunto de objetos, evitando que se referencien entre sí. Reduce acoplamiento entre colegas.

- **Ejemplo:** En un formulario, `FormularioMediator` recibe eventos de `CampoNombre`, `CampoEmail`, `BotonEnviar` y orquesta validaciones y habilitación del botón; los campos no se conocen entre sí.
- **C# / TypeScript:** Un objeto “mediador” con referencia a los participantes; los participantes notifican al mediador y este decide qué hacer.

## Iterator

Proporciona una forma de **recorrer** una colección sin exponer su representación interna. El iterador encapsula la lógica de “siguiente elemento” y “hay más”.

- **Ejemplo:** `IEnumerable<T>` / `for...of` ya son iteradores en C# y TypeScript; un iterador personalizado para un árbol o un recorrido especial (por ejemplo, solo nodos visibles).
- **C#:** `IEnumerator<T>`, `yield return`; **TypeScript:** objeto con `next()` que devuelve `{ value, done }` o generadores (`function*`).

## Memento

Captura y **externaliza el estado interno** de un objeto para poder restaurarlo después, sin violar encapsulación. Útil para undo/redo o snapshots.

- **Ejemplo:** El editor guarda un `Memento` con el estado del documento; el comando “Deshacer” restaura el estado desde el memento.
- **C# / TypeScript:** Objeto opaco (el originador lo crea y lo lee; el resto del sistema solo lo almacena) que contiene una copia del estado necesario para restaurar.

## Visitor

Separa un **algoritmo** de la estructura de objetos sobre la que opera. Añades nuevas operaciones sobre una jerarquía de clases sin modificar las clases; cada clase “acepta” un visitante que implementa la operación para cada tipo.

- **Ejemplo:** Árbol de nodos (literal, binario, etc.); operación “imprimir” o “evaluar” implementada como visitante; cada nodo tiene `Aceptar(IVisitor v)` que llama a `v.Visitar(this)`.
- **C# / TypeScript:** Interfaz `IVisitor` con métodos `Visitar(NodoA)`, `Visitar(NodoB)`; cada elemento llama `visitador.Visitar(this)`. Útil cuando hay muchas operaciones distintas sobre la misma jerarquía.

