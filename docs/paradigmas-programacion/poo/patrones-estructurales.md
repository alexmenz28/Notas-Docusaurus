---
id: poo-patrones-estructurales
title: Patrones estructurales
sidebar_label: Patrones estructurales
slug: /paradigmas-programacion/poo/patrones-estructurales

type: paradigma
category: poo
tags:
  - patrones-diseno
  - estructurales
topics:
  - diseno-software
nivel: intermedio
estado: borrador
origen: notas-personales
keywords:
  - design patterns structural
---

# Patrones estructurales

## Qué es

Los patrones **estructurales** se centran en cómo se **componen clases y objetos** para formar estructuras más grandes: Adapter, Facade, Decorator, Proxy, Composite, etc., sin reescribir código existente.

## Para qué sirve

Sirve para **adaptar interfaces** (Adapter), **simplificar subsistemas** (Facade), **añadir comportamiento sin modificar clases** (Decorator), **controlar acceso o coste** (Proxy) o **tratar jerarquías parte-todo** de forma uniforme (Composite), manteniendo el código flexible y reutilizable.

## Cómo se aplica

Envolviendo o componiendo objetos: creas una clase que implementa la interfaz esperada y delega en la existente (Adapter), una fachada que orquesta varias clases (Facade), decoradores que envuelven un objeto y añaden lógica (Decorator), etc. Los siguientes apartados detallan cada patrón.

## Adapter

Adapta la **interfaz** de una clase existente a la que espera el cliente, sin cambiar el código original. Permite que clases incompatibles trabajen juntas.

- **Ejemplo:** Tienes `ServicioLegado` con método `ObtenerDatos()` y el cliente espera `IObtenerPedidos.Pedidos()`. Creas `ServicioLegadoAdapter : IObtenerPedidos` que envuelve el legado y traduce la llamada.
- **C# / TypeScript:** Clase o función que implementa la interfaz deseada y delega internamente en el objeto adaptado.

## Facade

Proporciona una **interfaz simplificada** a un subsistema complejo (varias clases, APIs). El cliente solo habla con la fachada; esta orquesta las llamadas internas.

- **Ejemplo:** `SistemaPedidosFacade` con `CrearPedidoCompleto(datos)` que internamente valida, persiste, envía notificación y actualiza inventario.
- Reduce acoplamiento del cliente con el detalle del subsistema.

## Decorator

Añade **responsabilidades adicionales** a un objeto de forma dinámica, envolviéndolo en “decoradores” que implementan la misma interfaz y delegan en el objeto envuelto, añadiendo comportamiento antes o después.

- **Ejemplo:** `Notificador` base; `DecoradorLog(Notificador)`, `DecoradorRetry(Notificador)`. El cliente trabaja con la interfaz `INotificador`; la cadena de decoradores añade logging y reintentos.
- **C# / TypeScript:** Clase que recibe el componente en el constructor, implementa la misma interfaz y en cada método llama al componente y opcionalmente añade lógica extra.

## Composite

Compone objetos en **estructuras en árbol** para representar jerarquías parte–todo. El cliente trata tanto los objetos individuales (hojas) como las composiciones (nodos) de forma uniforme.

- **Ejemplo:** `Componente` con `Agregar()`, `Quitar()`, `ObtenerHijos()`. `Archivo` (hoja) y `Carpeta` (contenedor) implementan la misma interfaz; una carpeta puede contener archivos y otras carpetas.
- Permite construir árboles y aplicar operaciones recursivas (renderizar, calcular tamaño, etc.) sin distinguir hoja de contenedor en el cliente.

## Proxy

Proporciona un **sustituto o representante** de otro objeto para controlar el acceso a él. El proxy implementa la misma interfaz que el objeto real y puede añadir lazy loading, control de acceso, logging o caché.

- **Ejemplo:** `ProxyImagen` que no carga el bitmap hasta que se llama a `Dibujar()`; o `ProxySeguro` que comprueba permisos antes de delegar en el servicio real.
- **C#:** A menudo con interfaces compartidas; el cliente recibe el proxy y no nota la diferencia.
- **TypeScript:** Objeto o clase que envuelve el objetivo y reenvía las llamadas con lógica adicional.

## Bridge

Desacopla una **abstracción** de su **implementación** para que ambas puedan variar independientemente. En vez de una explosión de subclases (AbstraccionA + Impl1, Impl2, …), se tiene una jerarquía de abstracciones y otra de implementaciones; la abstracción tiene una referencia a la implementación.

- **Ejemplo:** `Forma` (abstracción) con `Dibujar()` que delega en `IDibujo` (implementación). `Circulo`, `Rectangulo` son formas; `DibujoVectorial`, `DibujoRaster` son implementaciones. Se combinan en tiempo de ejecución.
- Útil cuando hay múltiples dimensiones de variación que no quieres combinar con herencia múltiple.

## Flyweight

Comparte estado **intrínseco** (común a muchos objetos) para ahorrar memoria; el estado **extrínseco** (específico de cada contexto) se pasa desde fuera cuando se usa el objeto.

- **Ejemplo:** Miles de árboles en un juego: tipo, textura y modelo 3D se almacenan una vez (flyweight); posición y rotación se pasan al dibujar cada instancia.
- **C# / TypeScript:** Fábrica o caché que devuelve objetos reutilizables; el cliente proporciona el contexto (posición, etc.) en cada uso.

