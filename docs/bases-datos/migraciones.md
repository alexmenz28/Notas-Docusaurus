---
id: bases-datos-migraciones
title: Migraciones de esquema
sidebar_label: Migraciones
slug: /bases-datos/migraciones

type: concepto
category: bases_datos
tags:
  - migraciones
  - versionado
  - devops
topics:
  - bases-datos
nivel: intermedio
estado: en_revision
origen: notas-personales
keywords:
  - database migrations
  - schema versioning
---

# Migraciones de esquema

## Qué es

Las **migraciones** son scripts versionados que aplican cambios al esquema (y a veces a datos) de forma reproducible. Cada cambio (nueva tabla, columna, índice) queda registrado y se aplica en orden en cada entorno (desarrollo, staging, producción).

## Para qué sirve

Sirve para **versionar el esquema** junto al código: cualquier entorno puede quedar al mismo estado ejecutando las migraciones pendientes. Evita aplicar cambios “a mano” solo en un servidor y facilita rollback o correcciones porque tienes historial de qué se aplicó y en qué orden.

## Cómo se reconoce y cómo aplicarla

- **En el proyecto:** Carpeta o módulo de migraciones (por ejemplo `migrations/`) con archivos numerados o fechados; cada archivo tiene un “up” (aplicar cambio) y opcionalmente “down” (revertir). La herramienta (Flyway, EF Core, TypeORM, etc.) registra en una tabla del SGBD qué migraciones ya se ejecutaron.
- **Flujo típico:** Creas una nueva migración desde el modelo o escribes el SQL → la ejecutas en local → la subes al repo → en cada entorno se ejecutan solo las migraciones nuevas al desplegar.

## Por qué usarlas

- **Reproducibilidad:** Cualquier entorno se puede llevar al mismo estado ejecutando las migraciones en orden.
- **Historial:** Sabes qué cambios se hicieron y cuándo; facilita rollback o correcciones.
- **Colaboración:** El equipo comparte los mismos scripts; se evita aplicar cambios “a mano” solo en un servidor.

## Cómo funcionan

- Cada migración tiene un **identificador** (número, fecha, nombre) y se ejecuta una sola vez; el SGBD o la herramienta guarda en una tabla qué migraciones ya se aplicaron.
- **Up:** script que aplica el cambio (CREATE TABLE, ALTER TABLE, etc.).
- **Down (opcional):** script que revierte el cambio (DROP TABLE, quitar columna, etc.) para rollback.

## Buenas prácticas

- Migraciones **idempotentes** cuando sea posible, o al menos que no fallen si el cambio ya existía (por ejemplo “CREATE TABLE IF NOT EXISTS”).
- No modificar migraciones ya aplicadas en producción; hacer una **nueva migración** que corrija o añada lo que haga falta.
- En cambios destructivos (DROP column, DROP table), valorar backup y ventana de mantenimiento; a veces conviene migración en dos fases (deprecar uso, luego eliminar).

## Herramientas de migración (referencia)

Ejemplos de herramientas (solo como referencia; **puedes usar otras**):

- **Entity Framework Core (C#):** Migraciones generadas desde el modelo; `dotnet ef migrations add Nombre`, `dotnet ef database update`. [Docs](https://learn.microsoft.com/ef/core/managing-schemas/migrations/).
- **Flyway:** Migraciones en SQL (o Java); se ejecutan en orden por versión. [Flyway](https://flywaydb.org/documentation/).
- **TypeORM (Node/TypeScript):** Migraciones desde entidades o SQL; en **0.3+** se usa un `DataSource` y la CLI suele ser del tipo `npx typeorm -d ruta/al/data-source.ts migration:run` (el comando exacto depende de tu `package.json` y versión). Las versiones antiguas usaban `typeorm migration:run` global. [TypeORM Migrations](https://typeorm.io/migrations).
- **Alembic (Python/SQLAlchemy):** Migraciones para Python. [Alembic](https://alembic.sqlalchemy.org/).

Puedes anotar aquí la herramienta y el flujo que uses (por ejemplo “Flyway + Jenkins” o “EF Core en deploy”).
