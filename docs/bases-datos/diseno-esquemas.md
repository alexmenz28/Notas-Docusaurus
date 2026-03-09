---
id: bases-datos-diseno-esquemas
title: Diseño de esquemas
sidebar_label: Diseño de esquemas
slug: /bases-datos/diseno-esquemas

type: concepto
category: bases_datos
tags:
  - diseno
  - entidad-relacion
  - normalizacion
topics:
  - bases-datos
nivel: intermedio
estado: en_revision
origen: notas-personales
keywords:
  - schema design
  - ER model
---

# Diseño de esquemas

## Términos

- **ER** = modelo **E**ntidad–**R**elación: representación del dominio con entidades, atributos y relaciones antes de pasar a tablas.
- **PK** = clave primaria; **FK** = clave foránea (ver [Fundamentos](/docs/bases-datos/fundamentos)).

## Qué es

El **diseño del esquema** define las tablas, atributos, claves y relaciones de una base de datos para que reflejen bien el dominio y permitan consultas y actualizaciones eficientes y coherentes. Suele partir de un modelo **ER** y luego traducirse a tablas relacionales y normalizarse (o desnormalizarse) según el caso.

## Para qué sirve

Sirve para **traducir el dominio** (usuarios, pedidos, productos, etc.) en una estructura de datos persistente clara y sin redundancias innecesarias, y para que esa estructura sea mantenible y aproveche bien las capacidades del SGBD (índices, integridad, consultas).

## Cómo se reconoce y cómo aplicarla

- **En la práctica:** Bocetos o diagramas ER (en papel, DbDiagram, herramientas del SGBD); luego DDL (CREATE TABLE, etc.) o migraciones que crean esas tablas. Las relaciones se ven en las FKs y en las tablas de unión para N:M.
- **Flujo típico:** Identificar entidades y relaciones → dibujar ER → definir tablas y claves → normalizar si aplica → generar DDL o primera migración.

## Modelo entidad–relación

- **Entidades:** “Cosas” del dominio (Usuario, Pedido, Producto). Se convierten en tablas.
- **Atributos:** Propiedades de la entidad. Se convierten en columnas.
- **Relaciones:** Vínculos entre entidades (1:1, 1:N, N:M). Se modelan con claves foráneas o tablas de unión (para N:M).
- **Cardinalidades:** Indican cuántos registros de una entidad se relacionan con cuántos de la otra (uno a uno, uno a muchos, muchos a muchos).

## De ER a tablas relacionales

- Entidad → tabla; atributos → columnas; identificador → clave primaria.
- Relación 1:N → **FK** (clave foránea) en la tabla del lado “muchos”.
- Relación N:M → tabla intermedia (tabla de unión) con FKs a ambas entidades; la **PK** (clave primaria) suele ser compuesta por ambas FKs (o se añade un id propio si hay más atributos en la relación).
- Relación 1:1 → FK en una de las dos tablas (o tabla compartida según el caso).

## Normalización y desnormalización

- **Normalización:** Aplicar formas normales (1FN–FNBC) para eliminar redundancia y anomalías; ver [Formas normales](/docs/bases-datos/formas-normales).
- **Desnormalización:** Introducir redundancia controlada (columnas duplicadas, vistas materializadas) para optimizar lecturas; hay que documentar y mantener la coherencia (triggers, jobs, aplicación).

## Buenas prácticas

- Nombres claros y consistentes (singular o plural, convención de la organización).
- PKs simples (id numérico o UUID) cuando facilita FKs y rendimiento.
- FKs y restricciones para garantizar integridad; índices en columnas usadas en JOINs y filtros.
- Evitar columnas con muchos NULLs o “tablas anchísimas”; valorar partición o descomposición.

## Instalación / puesta en marcha

Ejemplos de herramientas (solo como referencia; **puedes usar otras**):

- **DbDiagram.io:** Modelado online, export a DDL.
- **pgModeler / MySQL Workbench:** Diseño visual para PostgreSQL y MySQL.
- **Entity Relationship** en papel o en herramientas de diagramas (Mermaid, Draw.io) para bocetos.

Puedes anotar aquí tu flujo preferido: por ejemplo “diseño en DbDiagram → export SQL → migraciones con Flyway”.
