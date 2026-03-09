---
id: bases-datos-nosql-introduccion
title: Introducción a NoSQL
sidebar_label: NoSQL
slug: /bases-datos/nosql-introduccion

type: concepto
category: bases_datos
tags:
  - nosql
  - documento
  - clave-valor
topics:
  - bases-datos
nivel: basico
estado: en_revision
origen: notas-personales
keywords:
  - nosql
  - mongodb
  - redis
---

# Introducción a NoSQL

## Términos

- **NoSQL:** nombre que suele explicarse como *“Not Only SQL”* (no solo SQL): sistemas de almacenamiento que no se basan en el modelo relacional clásico; pueden coexistir con bases SQL según el caso de uso.
- **SQL:** *Structured Query Language*; aquí se usa para referirse a bases de datos relacionales que usan ese lenguaje.

## Qué es

**NoSQL** agrupa sistemas de almacenamiento que no siguen el modelo relacional clásico (tablas, SQL estándar). Suelen priorizar escalabilidad horizontal, esquemas flexibles o modelos de datos distintos (documentos, grafos, clave–valor, columnas). No sustituyen siempre a SQL; son una opción según el caso de uso.

## Para qué sirve

Sirve cuando necesitas **esquemas flexibles**, **escalabilidad horizontal** o un **modelo de datos** que encaje mejor con documentos, grafos o caché clave–valor que con tablas relacionales. Cada tipo (documento, clave–valor, columnar, grafo) cubre problemas distintos; elegir según el patrón de datos y de acceso.

## Cómo se reconoce y cómo aplicarla

- **En la práctica:** No hay tablas con JOINs; hay colecciones de documentos, almacenes clave–valor, grafos de nodos y aristas, o columnas por familia. Las consultas usan lenguajes o APIs propias (MongoDB query, Cypher para grafos, comandos Redis, etc.).
- **Cuándo elegir:** Si tus datos son muy relacionales y necesitas transacciones ACID fuertes y JOINs complejos, suele ganar SQL. Si necesitas caché, documentos flexibles, analytics masivos o grafos de relaciones, valorar el tipo NoSQL adecuado.

## Tipos principales

- **Documento (MongoDB, Couchbase):** Los datos se almacenan en documentos (por ejemplo JSON/BSON). Buena opción cuando la estructura varía por registro o hay jerarquías anidadas. Consultas por campos y agregaciones; no hay JOINs como en SQL (se modela con referencias o datos embebidos).
- **Clave–valor (Redis, DynamoDB, Memcached):** Asociación clave → valor; muy rápido para caché, sesiones, colas. Redis añade estructuras (listas, sets, hashes) y operaciones atómicas.
- **Columnar (ClickHouse, Cassandra):** Datos organizados por columnas; muy eficiente para análisis y agregaciones sobre muchas filas y pocas columnas. Típico en analytics y data warehouses.
- **Grafo (Neo4j, Amazon Neptune):** Nodos y aristas; ideal para relaciones complejas (redes sociales, recomendaciones, grafos de conocimiento). Consultas tipo “camino entre A y B” o “vecinos de N”.

## Cuándo considerar NoSQL

- **Documento:** Modelos de datos variables, documentos con estructura anidada, prototipado rápido; cuando no necesitas transacciones complejas entre muchas entidades.
- **Clave–valor:** Caché, sesiones, rate limiting, colas ligeras.
- **Columnar:** Grandes volúmenes de datos analíticos, agregaciones pesadas, ingestas masivas.
- **Grafo:** Dominios donde las relaciones son tan importantes como las entidades (grafos de relaciones, recorridos, recomendaciones).

## Relacional vs NoSQL

- **Relacional (SQL):** Esquema rígido, integridad referencial, transacciones ACID, JOINs naturales. Mejor para datos muy estructurados y consistencia fuerte.
- **NoSQL:** Esquema flexible (en doc) o modelo distinto (clave–valor, grafo); escalabilidad horizontal y modelos de consistencia eventual en muchos sistemas. Elegir según requisitos de consistencia, modelo de datos y patrones de acceso.

## Instalación / puesta en marcha

Ejemplos de stack (solo como referencia; **puedes usar otros**):

- **MongoDB:** [Install MongoDB](https://www.mongodb.com/docs/manual/installation/). Uso desde aplicación con drivers o Mongoose (Node).
- **Redis:** [Download Redis](https://redis.io/download/). Uso con redis-cli o clientes en cada lenguaje.
- **Neo4j:** [Neo4j Download](https://neo4j.com/download/). Cypher como lenguaje de consulta.

Puedes anotar aquí los motores NoSQL que uses y para qué casos (caché, sesiones, analytics, etc.).
