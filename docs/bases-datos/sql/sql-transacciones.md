---
id: bases-datos-sql-transacciones
title: SQL — Transacciones
sidebar_label: Transacciones
slug: /bases-datos/sql/sql-transacciones

type: concepto
category: bases_datos
tags:
  - sql
  - transacciones
  - acid
  - concurrencia
topics:
  - bases-datos
nivel: intermedio
estado: en_revision
origen: notas-personales
keywords:
  - sql transactions
  - ACID
---

# SQL — Transacciones

## Qué es

Una **transacción** es una secuencia de operaciones que el SGBD trata como una **unidad**: o se aplican todas o no se aplica ninguna. Si algo falla o se cancela, se deshacen los cambios (rollback). Así se mantiene la consistencia ante fallos y ante ejecución concurrente.

## Para qué sirve

Sirve para **agrupar varias operaciones** (varios INSERT/UPDATE/DELETE) en un solo “bloque” todo-o-nada: si una falla, se revierte todo y la base no queda a medias. Sin transacciones, un fallo a mitad de un proceso podría dejar datos incoherentes.

## Cómo se aplica

En SQL abres con BEGIN (o START TRANSACTION), ejecutas las sentencias que forman la operación lógica y cierras con COMMIT (confirmar) o ROLLBACK (deshacer). En aplicaciones, el driver o el ORM suelen exponer “iniciar transacción”, “confirmar” y “revertir”; conviene mantener las transacciones cortas y manejar errores para hacer ROLLBACK cuando falle algo.

## ACID

**ACID** son siglas en inglés que resumen las propiedades que el SGBD garantiza en una transacción:

- **A**tomicity (**Atomicidad**): La transacción es indivisible; no puede quedar “a medias”.
- **C**onsistency (**Consistencia**): La transacción lleva la base de un estado válido a otro estado válido (respetando restricciones e invariantes).
- **I**solation (**Aislamiento**): El efecto de una transacción no es visible para otras hasta que se confirma; el SGBD evita interferencias (con bloqueos o control de concurrencia).
- **D**urability (**Durabilidad**): Una vez confirmada (commit), los cambios persisten aunque el sistema falle después.

## Comandos básicos

- **BEGIN** (o **START TRANSACTION**): Inicia una transacción.
- **COMMIT:** Confirma los cambios; la transacción termina con éxito.
- **ROLLBACK:** Deshace todos los cambios de la transacción actual; la transacción termina sin aplicar nada.

**Ejemplo (pseudocódigo estándar):**

```sql
BEGIN;
  UPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;
  UPDATE cuentas SET saldo = saldo + 100 WHERE id = 2;
  -- Si todo va bien:
COMMIT;
  -- Si hay error:
  -- ROLLBACK;
```

En muchos entornos (aplicaciones, ORMs) el “BEGIN” es implícito al ejecutar la primera sentencia y el COMMIT/ROLLBACK lo gestiona el código o el framework.

## Niveles de aislamiento

El **nivel de aislamiento** define qué fenómenos de concurrencia se evitan (lecturas sucias, no repetibles, fantasmas). Los nombres y comportamientos exactos dependen del SGBD; típicamente:

- **READ UNCOMMITTED:** Mínimo aislamiento; pueden verse cambios no confirmados (lecturas sucias). Raramente recomendable.
- **READ COMMITTED:** Solo se ven datos ya confirmados; puede haber lecturas no repetibles entre dos SELECT en la misma transacción.
- **REPEATABLE READ:** Dentro de la transacción las lecturas se repiten; puede haber fenómenos “fantasma” (nuevas filas que aparecen).
- **SERIALIZABLE:** Máximo aislamiento; la transacción se comporta como si fuera la única. Más segura pero más propensa a bloqueos y reintentos.

Por defecto, PostgreSQL y SQL Server suelen usar READ COMMITTED; MySQL InnoDB usa REPEATABLE READ por defecto. Subir el nivel reduce anomalías pero puede aumentar contención.

## Buenas prácticas

- Mantener las transacciones **cortas**: hacer solo lo necesario dentro del BEGIN/COMMIT para reducir tiempo de bloqueo.
- Manejar errores en la aplicación: en caso de fallo, hacer **ROLLBACK** (o dejar que el driver lo haga) y opcionalmente reintentar.
- No hacer lógica pesada ni llamadas externas dentro de la transacción; solo operaciones de BD.
- Entender el nivel de aislamiento por defecto de tu SGBD y subirlo solo cuando lo necesites (y asumir el coste).

## Instalación / puesta en marcha

Las transacciones son parte del estándar SQL y están en todos los SGBD relacionales. La sintaxis exacta puede variar (por ejemplo `BEGIN` vs `START TRANSACTION`, manejo de savepoints). Consulta la documentación de tu motor:

- PostgreSQL: [Transaction](https://www.postgresql.org/docs/current/tutorial-transactions.html)
- SQL Server: [Transactions](https://learn.microsoft.com/sql/t-sql/language-elements/transactions-transact-sql)
- MySQL: [Transaction](https://dev.mysql.com/doc/refman/8.0/en/commit.html)

Puedes anotar aquí el nivel de aislamiento que uses por defecto y en qué casos lo cambias.
