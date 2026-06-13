---
id: bases-datos-sql-consultas-avanzadas
title: SQL — Consultas avanzadas
sidebar_label: Consultas avanzadas
slug: /bases-datos/sql/sql-consultas-avanzadas

type: concepto
category: bases_datos
tags:
  - sql
  - joins
  - agregaciones
  - subconsultas
topics:
  - bases-datos
nivel: intermedio
estado: en_revision
origen: notas-personales
keywords:
  - sql join group by subquery
---

# SQL — Consultas avanzadas

## Qué es

Consultas que combinan **JOINs** (relacionar varias tablas), **agregaciones** (GROUP BY, COUNT, SUM, etc.), **subconsultas** (una consulta dentro de otra) y condiciones complejas para obtener exactamente los datos que necesitas en una sola petición.

## Para qué sirve

Sirve para **obtener resultados que cruzan tablas** (por ejemplo pedidos con nombre de cliente y de producto) o **resumir datos** (totales por categoría, conteos, promedios) sin tener que hacerlo en la aplicación. Es la base de reportes, listados y lógica de negocio que vive en la capa de datos.

## Cómo se aplica

Escribes una sentencia SELECT con uno o más JOINs, opcionalmente GROUP BY y HAVING, y subconsultas en WHERE o FROM. El orden lógico es: FROM (y JOINs) → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Practica con tablas de ejemplo (usuarios, pedidos, productos) y revisa el plan de ejecución (EXPLAIN) si una consulta va lenta.

## JOINs

Relacionar filas de dos o más tablas según una condición (normalmente igualdad de claves).

- **INNER JOIN:** Solo filas que coinciden en ambas tablas. Si no hay coincidencia, la fila no aparece.

```sql
SELECT p.id, p.total, u.nombre
FROM pedidos p
INNER JOIN usuarios u ON p.usuario_id = u.id;
```

- **LEFT JOIN (LEFT OUTER JOIN):** Todas las filas de la tabla izquierda; si no hay coincidencia en la derecha, las columnas de la derecha salen NULL.

```sql
SELECT u.nombre, COUNT(p.id) AS num_pedidos
FROM usuarios u
LEFT JOIN pedidos p ON p.usuario_id = u.id
GROUP BY u.id, u.nombre;
```

- **RIGHT JOIN:** Análogo a LEFT pero manteniendo todas las filas de la tabla derecha.
- **FULL OUTER JOIN:** Todas las filas de ambas tablas; NULL donde no hay coincidencia (no todos los SGBD lo soportan igual).
- **CROSS JOIN:** Producto cartesiano (cada fila de A con cada fila de B). Poco habitual; suele usarse para combinaciones explícitas.

## Agregaciones y GROUP BY

- **Funciones de agregación:** `COUNT(*)`, `SUM(columna)`, `AVG(columna)`, `MIN(columna)`, `MAX(columna)`.
- **GROUP BY:** Agrupa filas por el valor de una o más columnas; las agregaciones se calculan por grupo.

```sql
SELECT usuario_id, COUNT(*) AS total_pedidos, SUM(total) AS importe_total
FROM pedidos
GROUP BY usuario_id;
```

- **HAVING:** Filtra **después** de agrupar (a diferencia de WHERE, que filtra antes). Solo se aplica a resultados de agregación o columnas del GROUP BY.

```sql
SELECT usuario_id, SUM(total) AS importe_total
FROM pedidos
GROUP BY usuario_id
HAVING SUM(total) > 1000;
```

## Subconsultas

Una consulta anidada dentro de otra (en SELECT, FROM, WHERE o HAVING).

**En WHERE (escalar o lista):**

```sql
SELECT * FROM pedidos
WHERE usuario_id IN (SELECT id FROM usuarios WHERE nombre LIKE 'A%');

SELECT * FROM pedidos
WHERE total >= (SELECT AVG(total) FROM pedidos);
```

**En FROM (tabla derivada):**

```sql
SELECT u.nombre, sub.total
FROM usuarios u
JOIN (SELECT usuario_id, SUM(total) AS total FROM pedidos GROUP BY usuario_id) sub
  ON sub.usuario_id = u.id;
```

**Correlacionada:** La subconsulta referencia columnas de la consulta externa; se evalúa por cada fila. Útil pero costosa; a veces se puede sustituir por JOIN.

## Orden típico de escritura y evaluación

Cláusulas en el orden lógico de escritura: `SELECT` → `FROM` → `JOIN` → `WHERE` → `GROUP BY` → `HAVING` → `ORDER BY` → `LIMIT/OFFSET`. El SGBD optimiza; conceptualmente primero se resuelven FROM/JOIN/WHERE, luego agrupación y HAVING, luego ordenación y límite.

## Practicar con datos de ejemplo

Mismo SGBD y clientes que en [DDL y DML](/docs/bases-datos/sql/sql-ddl-dml). Conviene tener tablas de ejemplo (usuarios, pedidos, productos) para practicar JOINs y agregaciones. Puedes anotar aquí datasets o scripts de ejemplo que uses.
