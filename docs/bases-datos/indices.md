---
id: bases-datos-indices
title: Índices
sidebar_label: Índices
slug: /bases-datos/indices

type: concepto
category: bases_datos
tags:
  - indices
  - rendimiento
  - sql
topics:
  - bases-datos
nivel: intermedio
estado: en_revision
origen: notas-personales
keywords:
  - database indexes
  - b-tree index
---

# Índices

## Qué es

Un **índice** es una estructura auxiliar que permite al SGBD localizar filas más rápido sin recorrer toda la tabla. A cambio, las inserciones, actualizaciones y borrados pueden ser más lentos porque hay que mantener el índice, y el índice ocupa espacio.

## Para qué sirve

Sirve para **acelerar consultas** que filtran, ordenan o hacen JOIN por ciertas columnas: el SGBD usa el índice en lugar de leer toda la tabla. También para garantizar unicidad (índices UNIQUE) y para soportar claves primarias y foráneas de forma eficiente.

## Cómo se reconoce y cómo aplicarla

- **En el esquema:** Definiciones `CREATE INDEX` (o equivalente en tu herramienta); a menudo índices implícitos en PK y UNIQUE. Puedes listar los índices de una tabla en el catálogo del SGBD.
- **En la práctica:** Identificar consultas lentas → ver el plan de ejecución (**EXPLAIN** / **EXPLAIN ANALYZE**: comandos que muestran cómo el SGBD ejecuta la consulta y si usa índices) → añadir índice en columnas usadas en WHERE, JOIN, ORDER BY → medir de nuevo. No indexar por intuición; medir antes y después.

## Cuándo ayudan

- **WHERE** sobre columnas indexadas (igualdad, rangos, a veces LIKE con prefijo).
- **JOIN** sobre columnas indexadas (típicamente las FK).
- **ORDER BY** y **GROUP BY** sobre columnas indexadas; a veces el planificador puede evitar ordenaciones adicionales.
- **UNIQUE** y **PRIMARY KEY** suelen implementarse con índices; además garantizan unicidad.

## Cuándo no abusar

- Tablas muy pequeñas (el coste de usar el índice puede ser mayor que un full scan).
- Columnas con pocos valores distintos (baja selectividad); a veces el SGBD ignora el índice.
- Columnas que se modifican muy a menudo y donde la prioridad es escritura rápida.
- Demasiados índices en la misma tabla: cada uno hay que mantenerlo en cada escritura.

## Tipos típicos (según SGBD)

- **B-tree (o B+tree):** El más común. Bueno para igualdad, rangos y ordenación. PostgreSQL, MySQL, SQL Server lo usan por defecto para índices estándar.
- **Hash:** Solo igualdad (no rangos). Algunos SGBD lo ofrecen para columnas usadas solo en `=`.
- **Índices compuestos:** Varias columnas en un solo índice; el orden de las columnas importa (la primera suele usarse para filtrar). Útil para consultas que filtran por (A, B) o por A.
- **Índices parciales / filtrados:** Solo indexan filas que cumplen una condición (por ejemplo `WHERE activo = true`); ahorran espacio y pueden ser más eficientes para consultas que filtran por esa condición.
- **Índices de solo lectura / cubiertos:** Incluyen en el índice todas las columnas necesarias para la consulta para evitar acceder a la tabla (“index-only scan”).

## Buenas prácticas

- Medir con **EXPLAIN** / **EXPLAIN ANALYZE** (o equivalente) antes y después de añadir índices.
- Indexar FKs y columnas usadas en filtros y JOINs frecuentes.
- Revisar índices no usados o duplicados y eliminarlos para no ralentizar escrituras.

## Ejemplos de CREATE INDEX por SGBD

La creación de índices es con **DDL** del SGBD que uses. Ejemplos (solo como referencia):

- **PostgreSQL:** `CREATE INDEX idx_pedidos_cliente ON pedidos(cliente_id);` — [Docs](https://www.postgresql.org/docs/current/sql-createindex.html).
- **SQL Server:** `CREATE INDEX idx_pedidos_cliente ON dbo.pedidos(cliente_id);` — [Docs](https://learn.microsoft.com/sql/t-sql/statements/create-index-transact-sql).
- **MySQL:** `CREATE INDEX idx_pedidos_cliente ON pedidos(cliente_id);` — [Docs](https://dev.mysql.com/doc/refman/8.0/en/create-index.html).

Puedes anotar aquí los índices que tengas en proyectos reales y el criterio por el que los añadiste.
