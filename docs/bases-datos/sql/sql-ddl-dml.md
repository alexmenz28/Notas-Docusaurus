---
id: bases-datos-sql-ddl-dml
title: SQL — DDL y DML
sidebar_label: DDL y DML
slug: /bases-datos/sql/sql-ddl-dml

type: concepto
category: bases_datos
tags:
  - sql
  - ddl
  - dml
topics:
  - bases-datos
nivel: basico
estado: en_revision
origen: notas-personales
keywords:
  - sql create insert update delete
---

# SQL — DDL y DML

## Qué es

**SQL** (*Structured Query Language*, lenguaje de consulta estructurado) es el estándar para definir y manipular datos en bases relacionales. **DDL** define la estructura (tablas, columnas, índices); **DML** inserta, actualiza, borra y consulta datos. La sintaxis puede variar entre PostgreSQL, SQL Server, MySQL, etc.; aquí se usan formas estándar o muy habituales.

## Para qué sirve

- **DDL:** Para **crear y modificar** el esquema (tablas, restricciones, índices) antes de guardar datos o cuando evoluciona el modelo. Sin DDL no tendrías tablas donde hacer INSERT o SELECT.
- **DML:** Para **leer y escribir** datos en el día a día: altas, bajas, modificaciones y consultas. Es lo que usa la aplicación en runtime (directamente o vía ORM).

## Cómo se reconoce y cómo aplicarla

- **En el código o en el cliente:** DDL se ejecuta al configurar la base (migraciones, scripts de instalación) o desde un cliente SQL. DML se ejecuta desde la aplicación (sentencias parametrizadas o ORM que genera INSERT/UPDATE/DELETE/SELECT). Siempre con conexión al SGBD y, en entornos serios, dentro de transacciones cuando hay varias operaciones que deben ser todo-o-nada.

## DDL — Crear y modificar estructura

**Crear tabla:**

```sql
CREATE TABLE usuarios (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  email      VARCHAR(255) NOT NULL UNIQUE,
  nombre     VARCHAR(100),
  creado_en  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedidos (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id  INT NOT NULL,
  total       DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_pedidos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
```

**Modificar tabla (ALTER):**

```sql
ALTER TABLE usuarios ADD COLUMN telefono VARCHAR(20);
ALTER TABLE usuarios ALTER COLUMN nombre SET NOT NULL;
ALTER TABLE usuarios DROP COLUMN telefono;
```

**Índices y vistas:**

```sql
CREATE INDEX idx_pedidos_usuario ON pedidos(usuario_id);
CREATE VIEW pedidos_recientes AS
  SELECT * FROM pedidos WHERE creado_en >= CURRENT_DATE - INTERVAL '30 days';
```

**Eliminar:**

```sql
DROP VIEW pedidos_recientes;
DROP TABLE pedidos;
DROP TABLE usuarios;
```

## DML — Insertar, actualizar, borrar

**INSERT:**

```sql
INSERT INTO usuarios (email, nombre) VALUES ('ana@ejemplo.com', 'Ana');
INSERT INTO usuarios (email, nombre) VALUES ('luis@ejemplo.com', 'Luis'), ('maria@ejemplo.com', 'María');
```

**UPDATE:**

```sql
UPDATE usuarios SET nombre = 'Ana García' WHERE email = 'ana@ejemplo.com';
UPDATE pedidos SET total = total * 1.10 WHERE usuario_id = 1;
```

**DELETE:**

```sql
DELETE FROM pedidos WHERE id = 42;
DELETE FROM usuarios WHERE creado_en < '2020-01-01';
```

**SELECT básico:**

```sql
SELECT * FROM usuarios;
SELECT id, email, nombre FROM usuarios WHERE nombre IS NOT NULL;
SELECT * FROM usuarios ORDER BY nombre ASC LIMIT 10;
```

## Buenas prácticas

- Usar **transacciones** para grupos de INSERT/UPDATE/DELETE que deban ser todo-o-nada.
- Restricciones (PK = clave primaria, FK = clave foránea, NOT NULL, UNIQUE, CHECK) para mantener integridad en el SGBD (sistema gestor de bases de datos).
- Nombres de tablas y columnas claros y consistentes; evitar palabras reservadas.

## Instalación / puesta en marcha

Cualquier SGBD relacional incluye un motor SQL. Ejemplos de clientes (solo como referencia):

- **PostgreSQL:** `psql` (CLI), pgAdmin, DBeaver.
- **SQL Server:** sqlcmd, SSMS, Azure Data Studio.
- **MySQL:** mysql (CLI), MySQL Workbench, DBeaver.

Puedes anotar aquí el SGBD y el cliente que uses para practicar DDL/DML.
