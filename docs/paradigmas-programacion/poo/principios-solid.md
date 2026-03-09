---
id: poo-solid
title: Principios SOLID
sidebar_label: SOLID
slug: /paradigmas-programacion/poo/principios-solid

type: paradigma
category: poo
tags:
  - poo
  - solid
topics:
  - diseno-software
nivel: intermedio
estado: borrador
origen: notas-personales
keywords:
  - solid principles
---

# Principios SOLID

## Términos

- **SOLID:** acrónimo de cinco principios (SRP, OCP, LSP, ISP, DIP). **SRP:** Single Responsibility Principle. **OCP:** Open/Closed Principle. **LSP:** Liskov Substitution Principle. **ISP:** Interface Segregation Principle. **DIP:** Dependency Inversion Principle.

## Qué es

**SOLID** son cinco principios de diseño orientado a objetos que buscan código más mantenible, extensible y desacoplado. Fueron popularizados por Robert C. Martin y aplican tanto a clases como a módulos e interfaces.

## Para qué sirve

Sirve para **reducir acoplamiento** y **facilitar cambios**: una sola responsabilidad por clase, extensión sin modificación, sustitución correcta de subtipos, interfaces pequeñas y dependencias hacia abstracciones hacen que añadir funcionalidad o cambiar implementaciones no rompa el resto del sistema.

## Cómo se aplica

Al diseñar: asigna una responsabilidad clara por clase (SRP), extiende con nuevas clases o estrategias en lugar de modificar las existentes (OCP), asegura que los subtipos respeten el contrato del tipo base (LSP), divide interfaces grandes en otras más específicas (ISP) y haz que las clases dependan de abstracciones (interfaces) en lugar de implementaciones concretas (DIP). Los ejemplos siguientes detallan cada principio.

## S — Single Responsibility Principle (SRP)

**Una clase debe tener una sola razón para cambiar**: una única responsabilidad.

- Si una clase hace varias cosas (persistencia, validación, notificaciones, formato), un cambio en cualquiera de ellas obliga a tocarla.
- Conviene extraer responsabilidades en clases o módulos separados.

**Ejemplo C#:** En vez de que `Pedido` guarde en BD y envíe emails, tener `Pedido` (dominio), `IPedidoRepository` (persistencia) y `INotificadorPedido` (emails).

**Ejemplo TypeScript:** Separar `OrderService` (lógica de negocio) de `OrderRepository` (acceso a datos) y `OrderEmailService` (notificaciones).

## O — Open/Closed Principle (OCP)

**Abierto a extensión, cerrado a modificación**: puedes añadir comportamiento nuevo sin cambiar el código existente.

- Extender mediante herencia, composición o estrategias (patrón Strategy), no modificando clases estables.
- Polimorfismo e interfaces permiten añadir nuevos tipos sin tocar los antiguos.

**Ejemplo:** En vez de un `if/switch` por tipo de pago, tener `IPagoStrategy` con implementaciones `TarjetaStrategy`, `TransferenciaStrategy`; añadir un nuevo pago = nueva clase, sin tocar las demás.

## L — Liskov Substitution Principle (LSP)

**Las subclases deben poder sustituir a sus superclases** sin romper el contrato que el cliente espera.

- Si `B` hereda de `A`, cualquier código que use `A` debe seguir funcionando si recibe un `B`.
- No endurecer precondiciones, no debilitar postcondiciones, respetar invariantes de la clase base.

**Ejemplo:** Si `Rectangulo` tiene subclase `Cuadrado`, no debe redefinir setters de ancho/alto de forma que rompa la expectativa “rectángulo con lados independientes”.

## I — Interface Segregation Principle (ISP)

**Interfaces específicas son mejores que una interfaz general**: los clientes no deben depender de métodos que no usan.

- En vez de una interfaz “gorda” con muchos métodos, definir varias interfaces pequeñas (roles) e implementar solo las que correspondan.
- Reduce acoplamiento y evita que cambios en un método afecten a clientes que no lo usan.

**Ejemplo C#:** En vez de `IUsuario` con `Guardar()`, `EnviarEmail()`, `ExportarPdf()`, tener `IPersistible`, `INotificable`, `IExportable` y que cada clase implemente solo lo que necesita.

## D — Dependency Inversion Principle (DIP)

**Depender de abstracciones, no de concreciones**: los módulos de alto nivel no deben depender de los de bajo nivel; ambos deben depender de abstracciones (interfaces).

- La inyección de dependencias (constructor, propiedad, contenedor) permite sustituir implementaciones (BD, APIs, logging) sin tocar la lógica de negocio.
- Facilita testing (mocks) y cambios de infraestructura.

**Ejemplo:** Un `ServicioPedidos` recibe `IRepositorioPedidos` e `IEnvioEmail` por constructor; en producción se inyectan implementaciones reales, en tests se inyectan mocks.

