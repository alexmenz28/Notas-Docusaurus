---
id: bases-datos-sql-procedimientos-triggers-funciones
title: SQL — Procedimientos, triggers y funciones
sidebar_label: Procedimientos, triggers y funciones
slug: /bases-datos/sql/sql-procedimientos-triggers-funciones

type: concepto
category: bases_datos
tags:
  - sql
  - stored-procedures
  - triggers
  - funciones
topics:
  - bases-datos
nivel: intermedio
estado: en_revision
origen: notas-personales
keywords:
  - stored procedure
  - trigger
  - function
  - pl sql
  - t-sql
---

# SQL — Procedimientos almacenados, triggers y funciones

En muchas bases relacionales (PostgreSQL, SQL Server, MySQL, Oracle) puedes guardar **lógica en el servidor**: procedimientos almacenados, funciones y triggers. Esta nota resume qué son, para qué sirven y cuándo conviene usarlos.

## Términos

- **Procedimiento almacenado (stored procedure):** Rutina guardada en el SGBD que ejecuta una secuencia de sentencias SQL (y a veces lógica condicional). Se invoca con `CALL` o `EXEC`.
- **Función (en la BD):** Rutina que devuelve un valor (escalar) o una tabla. Se usa dentro de una consulta o asignación (a diferencia del procedimiento, que se “ejecuta” por sí solo).
- **Trigger (disparador):** Código que el SGBD ejecuta **automáticamente** cuando ocurre un suceso (INSERT, UPDATE o DELETE en una tabla), antes o después del cambio.
- **SGBD:** Sistema gestor de bases de datos. **DDL/DML:** ver [SQL DDL y DML](/docs/bases-datos/sql/sql-ddl-dml).

## Qué es

- **Procedimiento almacenado:** Un bloque de código SQL (y extensiones propietarias como PL/pgSQL, T-SQL, etc.) que se guarda en la base y se ejecuta bajo demanda. Puede recibir parámetros y contener transacciones, bucles y condicionales.
- **Función:** Similar, pero pensada para **devolver un valor** (número, texto, fecha) o un **conjunto de filas**. Se usa dentro de `SELECT`, `WHERE` o en asignaciones.
- **Trigger:** Un procedimiento asociado a una tabla y a un evento (p. ej. “después de INSERT”). Cada vez que ocurre ese evento, el SGBD ejecuta el trigger sin que la aplicación lo llame explícitamente.

## Para qué sirve

| Elemento | Para qué sirve |
|----------|----------------|
| **Procedimientos** | Encapsular operaciones complejas (varios pasos, transacciones) en un solo punto; reutilizar desde varias aplicaciones; reducir round-trips (una llamada en vez de muchas sentencias). |
| **Funciones** | Cálculos o reglas reutilizables (p. ej. formatear, validar, calcular un valor) que se usan dentro de consultas; a veces para abstraer lógica repetitiva en vistas o consultas. |
| **Triggers** | Reaccionar a cambios en datos sin tocar la aplicación: auditoría (quién/cuándo cambió), mantener columnas derivadas o desnormalizadas, validaciones complejas, sincronizar tablas. |

## Cómo se aplica

- **Procedimientos:** Se crean con `CREATE PROCEDURE` (o `CREATE OR REPLACE` según el SGBD). La aplicación los invoca con `CALL nombre(args)` o `EXEC nombre args`. Útiles cuando la lógica es multi-paso y quieres que viva en la BD; hay que documentarlos y versionarlos (p. ej. en migraciones).
- **Funciones:** Se crean con `CREATE FUNCTION` y devuelven un tipo (escalar o tabla). Se usan en SQL: `SELECT mi_funcion(columna) FROM tabla`. En muchos SGBD pueden tener efectos secundarios; conviene limitarlos si se usan en consultas.
- **Triggers:** Se crean con `CREATE TRIGGER`, asociados a una tabla y a un evento (BEFORE/AFTER, INSERT/UPDATE/DELETE). El cuerpo suele ser un procedimiento o un bloque de código. Hay que usarlos con mesura: dificultan el razonamiento y las pruebas, y pueden encadenarse; preferir lógica en la aplicación cuando sea posible y reservar triggers para auditoría o consistencia que deba garantizar la BD.

## Procedimientos almacenados — Ejemplos básicos

Sintaxis típica (varía por SGBD). **PostgreSQL (PL/pgSQL):**

```sql
CREATE OR REPLACE PROCEDURE cerrar_pedido(p_pedido_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE pedidos SET estado = 'cerrado', actualizado_en = NOW() WHERE id = p_pedido_id;
  -- Más lógica: mover a historial, notificar, etc.
  -- El COMMIT lo suele hacer quien llama a CALL; solo en procedimientos avanzados (p. ej. PostgreSQL 11+) tiene sentido COMMIT explícito dentro del cuerpo.
END;
$$;

-- Llamada:
CALL cerrar_pedido(123);
```

**SQL Server (T-SQL):**

```sql
CREATE PROCEDURE dbo.CerrarPedido @PedidoId INT
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE dbo.Pedidos SET Estado = 'cerrado', ActualizadoEn = GETDATE() WHERE Id = @PedidoId;
END;
GO

-- Llamada:
EXEC dbo.CerrarPedido 123;
```

**MySQL:**

```sql
DELIMITER //
CREATE PROCEDURE cerrar_pedido(IN p_pedido_id INT)
BEGIN
  UPDATE pedidos SET estado = 'cerrado', actualizado_en = NOW() WHERE id = p_pedido_id;
END //
DELIMITER ;

-- Llamada:
CALL cerrar_pedido(123);
```

## Funciones — Ejemplos básicos

**PostgreSQL — función escalar:**

```sql
CREATE OR REPLACE FUNCTION nombre_completo(nombre TEXT, apellido TEXT)
RETURNS TEXT LANGUAGE sql AS $$
  SELECT nombre || ' ' || apellido;
$$;

-- Uso en consulta:
SELECT id, nombre_completo(nombre, apellido) AS full_name FROM usuarios;
```

**SQL Server — función escalar:**

```sql
CREATE FUNCTION dbo.NombreCompleto(@Nombre NVARCHAR(100), @Apellido NVARCHAR(100))
RETURNS NVARCHAR(201)
AS
BEGIN
  RETURN @Nombre + ' ' + @Apellido;
END;
GO
```

Las funciones que devuelven tabla (table-valued) permiten usarlas como origen en `FROM`; la sintaxis depende del motor.

## Triggers — Ejemplo conceptual

**PostgreSQL — trigger que registra cambios (auditoría):**

```sql
CREATE TABLE auditoria_pedidos (
  id SERIAL PRIMARY KEY,
  pedido_id INT,
  accion TEXT,
  usuario TEXT,
  momento TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION fn_auditar_pedido()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO auditoria_pedidos (pedido_id, accion, usuario)
  VALUES (COALESCE(NEW.id, OLD.id), TG_OP, current_user);
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER tr_auditar_pedido
  AFTER INSERT OR UPDATE OR DELETE ON pedidos
  FOR EACH ROW EXECUTE PROCEDURE fn_auditar_pedido();
```

- `TG_OP` indica la operación (INSERT, UPDATE, DELETE). `NEW` y `OLD` son las filas nueva y antigua (en UPDATE/DELETE).
- En otros SGBD la sintaxis cambia (p. ej. `FOR EACH ROW` vs `AFTER INSERT`), pero la idea es la misma: “cuando pase X en la tabla Y, ejecuta esta función”.

## Cuándo usar cada uno

| Situación | Recomendación |
|-----------|----------------|
| Lógica de negocio que ya tienes en la aplicación (ORM, servicios) | Mantenerla en la aplicación; más fácil de testear y desplegar. |
| Operación pesada que requiere muchas idas y vueltas al servidor | Valorar procedimiento que haga todo en una llamada. |
| Regla de cálculo o formato reutilizada en muchas consultas | Función en la BD puede ser útil; si la app puede hacerlo, también es válido. |
| Auditoría “nadie puede saltársela” o consistencia que la BD debe garantizar | Trigger puede ser adecuado; documentar y mantenerlos simples. |
| Desnormalización (p. ej. contador en otra tabla) | Trigger o job que actualice; documentar bien para no duplicar lógica. |

## Relación con el resto de la biblioteca

- [SQL — DDL y DML](/docs/bases-datos/sql/sql-ddl-dml): base de sentencias que pueden ir dentro de procedimientos y triggers.
- [SQL — Transacciones](/docs/bases-datos/sql/sql-transacciones): los procedimientos suelen usar BEGIN/COMMIT/ROLLBACK.
- [Diseño de esquemas](/docs/bases-datos/diseno-esquemas): se mencionan triggers como opción para mantener coherencia al desnormalizar.
