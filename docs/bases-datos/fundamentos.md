---
id: bases-datos-fundamentos
title: Fundamentos de bases de datos
sidebar_label: Fundamentos
slug: /bases-datos/fundamentos

type: concepto
category: bases_datos
tags:
  - bases-datos
  - modelo-relacional
topics:
  - persistencia
  - datos
nivel: basico
estado: en_revision
origen: notas-personales
keywords:
  - database fundamentals
  - relational model
---

# Fundamentos de bases de datos

## Qué es

Una **base de datos** es un conjunto de datos organizados y persistidos, gestionados por un **SGBD** (sistema gestor de bases de datos) que garantiza integridad, concurrencia, seguridad y recuperación. Las bases **relacionales** modelan los datos en tablas (relaciones), con filas (tuplas) y columnas (atributos), y relaciones entre tablas mediante claves.

## Para qué sirve

Sirve para **persistir datos** de forma fiable y compartida: varios usuarios o aplicaciones pueden leer y escribir con reglas claras (transacciones, integridad). El SGBD se encarga de almacenar, recuperar, proteger y optimizar el acceso, para que no tengas que implementar todo eso en tu aplicación.

## Cómo se reconoce y cómo aplicarla

- **En la práctica:** Te conectas al SGBD (cliente, conexión desde código o ORM); creas y modificas tablas (DDL); insertas, actualizas, borras y consultas datos (DML). Los datos viven en el servidor del SGBD, no solo en memoria.
- **En el código:** Drivers o ORMs (Entity Framework, TypeORM, Prisma, etc.) que abren conexión, ejecutan SQL o operaciones de alto nivel y cierran recursos. Las consultas y transacciones se hacen contra una “base de datos” configurada por entorno.

## Términos clave

- **SQL** = **S**tructured **Q**uery **L**anguage (lenguaje de consulta estructurado). Es el estándar para definir estructuras (tablas, índices) y manipular datos (consultas, inserciones, actualizaciones) en bases relacionales. Lo usas en DDL (crear/modificar esquema) y DML (consultar e insertar/actualizar/borrar). Ver [SQL — DDL y DML](/docs/bases-datos/sql/sql-ddl-dml).
- **SGBD** = **S**istema **G**estor de **B**ases de **D**atos (en inglés DBMS, *Database Management System*). El programa que administra la base de datos (PostgreSQL, MySQL, SQL Server, etc.).
- **PK** = **P**rimary **K**ey, clave primaria: atributo(s) que identifican de forma única cada fila; no puede haber duplicados ni valores nulos.
- **FK** = **F**oreign **K**ey, clave foránea: atributo(s) que referencian la clave primaria de otra tabla; garantiza integridad referencial.
- **ACID:** siglas en inglés (Atomicity, Consistency, Isolation, Durability): propiedades que el SGBD garantiza en transacciones. Se detallan en [SQL — Transacciones](/docs/bases-datos/sql/sql-transacciones).

## Conceptos clave

- **Tabla (relación):** conjunto de filas con la misma estructura; cada columna tiene un tipo y un nombre.
- **Clave primaria (PK):** atributo(s) que identifican de forma única cada fila; no puede haber duplicados ni valores nulos.
- **Clave foránea (FK):** atributo(s) que referencian la clave primaria de otra tabla; garantiza integridad referencial.
- **Transacción:** secuencia de operaciones que se ejecutan como una unidad (todo o nada); el SGBD garantiza propiedades ACID cuando se usa correctamente.
- **Integridad:** reglas que mantienen los datos coherentes (PK, FK, UNIQUE, CHECK, NOT NULL).

## Modelo relacional

El **modelo relacional** (Codd) representa los datos como relaciones (tablas) matemáticas. Las operaciones se expresan en álgebra relacional o en SQL. Ventajas: estructura clara, normalización para reducir redundancia, estándar SQL ampliamente soportado.

## Cuándo usar una base de datos

- Cuando necesitas **persistencia** más allá de la ejecución del programa.
- Cuando varios usuarios o procesos deben **compartir** y actualizar los mismos datos con consistencia.
- Cuando el volumen de datos o las consultas requieren **índices**, transacciones y capacidades que un SGBD ofrece.

## Instalación / puesta en marcha

Ejemplos de stack (solo como referencia; **puedes usar otros**):

- **PostgreSQL:** [Descarga e instalación](https://www.postgresql.org/download/). CLI: `psql`.
- **SQL Server:** [Documentación](https://learn.microsoft.com/sql/sql-server/). Express para desarrollo local.
- **SQLite:** Sin instalación de servidor; archivo local. Muy usado en móvil y herramientas.
- **MySQL / MariaDB:** [MySQL](https://dev.mysql.com/doc/), [MariaDB](https://mariadb.org/documentation/).

En esta sección puedes anotar los SGBD que uses y cómo levantas entornos locales (Docker, instalación nativa, etc.).
