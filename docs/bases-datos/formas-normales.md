---
id: bases-datos-formas-normales
title: Formas normales
sidebar_label: Formas normales
slug: /bases-datos/formas-normales

type: concepto
category: bases_datos
tags:
  - normalizacion
  - diseno
  - sql
topics:
  - bases-datos
  - modelo-relacional
nivel: intermedio
estado: en_revision
origen: notas-personales
keywords:
  - normal forms
  - 1NF 2NF 3NF BCNF
---

# Formas normales

## Términos

- **1FN, 2FN, 3FN:** primera, segunda y tercera forma normal. **FNBC:** forma normal de Boyce-Codd. **SGBD:** sistema gestor de bases de datos (ver [Fundamentos](/docs/bases-datos/fundamentos)).

## Qué es

Las **formas normales** son reglas de diseño que reducen redundancia y anomalías (inserción, actualización, borrado) en un esquema relacional. Cada forma implica que se cumplen las anteriores; normalizar suele implicar **dividir tablas** y definir bien claves y dependencias.

## Para qué sirve

Sirve para **evitar datos duplicados e inconsistentes**: si un dato vive en un solo sitio, al actualizarlo no tienes que tocar varias filas ni arriesgarte a que queden desincronizadas. También para que el esquema sea más claro y las consultas predecibles.

## Cómo se aplica

En la práctica: revisas cada tabla, identificas dependencias (qué atributos dependen de qué clave o de qué otro atributo) y **descompones** en tablas nuevas cuando un atributo no depende de toda la clave (2FN) o depende de otro no clave (3FN). Los ejemplos siguientes muestran el “antes” y “después” de aplicar cada forma.

## Primera forma normal (1FN)

**Regla:** Dos cosas deben cumplirse:

1. **Atomicidad:** En cada celda solo puede haber **un valor** (no listas, no conjuntos). Si guardas “varios valores” en una sola celda, no es atómico.
2. **Identificación única:** Debe existir una **clave** (una o varias columnas) que identifique de forma única cada fila; no puede haber filas repetidas.

**Por qué importa:** Si una celda tiene varios valores (por ejemplo "111, 222, 333"), no puedes buscar, filtrar o actualizar “un valor” de forma limpia; el SGBD no trata eso como datos relacionales normales.

---

### Ejemplo detallado — Violación de 1FN

Imagina una tabla de **empleados** donde guardas el nombre y los teléfonos en una sola columna separados por comas:

**Antes (viola 1FN):**

| id_empleado | nombre   | telefonos    |
|-------------|----------|---------------|
| 1           | Ana      | 600111222, 600333444 |
| 2           | Luis     | 600555666    |

Problemas:

- **No atómico:** En `telefonos` hay dos números en la primera fila. No puedes “consultar solo el segundo teléfono” ni “poner índice en teléfono” de forma estándar.
- Si Ana cambia un número, tienes que **escribir toda la cadena** de nuevo; si alguien escribe mal un número, es fácil romper el formato.

**Después (cumple 1FN):**

Opción A — Una fila por empleado y una fila por cada teléfono en otra tabla:

**Tabla `empleados`:**

| id_empleado | nombre |
|-------------|--------|
| 1           | Ana    |
| 2           | Luis   |

**Tabla `telefonos_empleado`:**

| id_empleado | telefono  |
|-------------|-----------|
| 1           | 600111222 |
| 1           | 600333444 |
| 2           | 600555666 |

Ahora cada celda tiene **un solo valor** y cada fila está bien identificada (en `telefonos_empleado` la clave podría ser `(id_empleado, telefono)`). Añadir, borrar o cambiar un teléfono es una operación sobre una fila concreta.

---

## Segunda forma normal (2FN)

**Regla:** Estar en 1FN y que **cada atributo que no forma parte de la clave** dependa de **toda** la clave primaria, no solo de una parte.

Esto solo tiene sentido cuando la clave primaria es **compuesta** (varias columnas). Si la clave es una sola columna, todo lo que depende de esa columna depende “de toda la clave”, así que 1FN implica 2FN en ese caso.

**Idea:** Si tienes una tabla con clave `(A, B)` y una columna `C` que solo depende de `B` (es decir, conoces `B` y ya sabes `C`), entonces `C` no debería estar en esa tabla: debería estar en una tabla donde `B` sea la clave (o parte de la clave). Así evitas repetir `C` muchas veces para cada combinación de `A` y `B`.

---

### Ejemplo detallado — Violación de 2FN

Tabla de **líneas de pedido**: cada fila es “en el pedido X, el producto Y va con cantidad Z”. La clave natural es (pedido_id, producto_id). Añadimos el **nombre del producto** en la misma tabla:

**Antes (viola 2FN):**

| pedido_id | producto_id | cantidad | nombre_producto |
|-----------|-------------|----------|------------------|
| 101       | P1          | 2        | Lápiz            |
| 101       | P2          | 1        | Cuaderno         |
| 102       | P1          | 5        | Lápiz            |

- La clave primaria es **(pedido_id, producto_id)**.
- **cantidad** sí depende de toda la clave: “en el pedido 101, el producto P1 va con cantidad 2”. Si cambias pedido o producto, la cantidad puede ser otra.
- **nombre_producto** solo depende de **producto_id**: el nombre “Lápiz” es del producto P1, no del pedido. Por eso en la fila (102, P1) repetimos “Lápiz”.

Problemas:

- **Redundancia:** Cada vez que el producto P1 aparece en un pedido, copiamos “Lápiz”. Si mañana el producto P1 se llama “Lápiz HB”, tendrías que actualizar **todas** las filas donde aparece P1 y es fácil olvidar alguna.
- **Inserción rara:** Para “crear” el producto “Lápiz” tendrías que meterlo en alguna línea de pedido, lo cual no tiene sentido conceptual.

**Después (cumple 2FN):**

Sacamos lo que solo depende de `producto_id` a una tabla de productos:

**Tabla `productos`:**

| producto_id | nombre_producto |
|-------------|-----------------|
| P1          | Lápiz           |
| P2          | Cuaderno        |

**Tabla `lineas_pedido`:**

| pedido_id | producto_id | cantidad |
|-----------|-------------|----------|
| 101       | P1          | 2        |
| 101       | P2          | 1        |
| 102       | P1          | 5        |

Ahora **todos** los atributos no clave de `lineas_pedido` (solo `cantidad`) dependen de **toda** la clave (pedido_id + producto_id). El nombre del producto vive solo en `productos`; si cambia el nombre, se actualiza en un solo sitio y se “ve” en todos los pedidos vía JOIN.

---

## Tercera forma normal (3FN)

**Regla:** Estar en 2FN y que **ningún atributo no clave** dependa de **otro atributo no clave**.

Es decir: cada columna que no es clave debe depender **directamente** de la clave primaria. Si tienes algo como “clave → A → B” (la clave determina A, y A determina B), entonces B depende de A, que no es clave: es una **dependencia transitiva**. Para cumplir 3FN, B debe ir a una tabla donde A sea la clave (o parte de la clave), no en la tabla donde la clave es la clave original.

**Idea:** Evitar tener en la misma tabla datos que en realidad “pertenecen” a otra entidad (por ejemplo el cliente), para no repetirlos y no tener que actualizarlos en muchos sitios.

---

### Ejemplo detallado — Violación de 3FN

Tabla de **pedidos** con: número de pedido, cliente, y **ciudad del cliente** (para facturación o envío). La clave es `pedido_id`.

**Antes (viola 3FN):**

| pedido_id | cliente_id | ciudad_cliente |
|-----------|------------|----------------|
| 101       | C1         | Madrid         |
| 102       | C1         | Madrid         |
| 103       | C2         | Barcelona      |

- **pedido_id** es la clave primaria.
- **cliente_id** depende del pedido (cada pedido tiene un cliente).
- **ciudad_cliente** no depende directamente del pedido: depende del **cliente**. Es decir: pedido → cliente_id → ciudad_cliente. La ciudad es una propiedad del cliente (cliente_id), no del pedido (pedido_id).

Problemas:

- **Redundancia:** Si el cliente C1 se muda a Valencia, tienes que actualizar **todas** las filas de pedidos donde aparece C1. Si te olvidas de una, tienes datos inconsistentes (un pedido con “Madrid” y otro con “Valencia” para el mismo cliente).
- **Inconsistencia:** No hay nada que obligue a que todos los pedidos del mismo cliente tengan la misma ciudad; podría haber un error y poner “Barcelona” en un pedido de C1.

**Después (cumple 3FN):**

La ciudad es un dato del **cliente**, no del pedido. Lo llevamos a la tabla de clientes:

**Tabla `clientes`:**

| cliente_id | ciudad   |
|------------|----------|
| C1         | Madrid   |
| C2         | Barcelona|

**Tabla `pedidos`:**

| pedido_id | cliente_id |
|-----------|------------|
| 101       | C1         |
| 102       | C1         |
| 103       | C2         |

Ahora en `pedidos` solo quedan atributos que dependen **directamente** de `pedido_id`. La ciudad se guarda una vez por cliente; si el cliente cambia de ciudad, se actualiza en un solo registro y todos sus pedidos “ven” la ciudad correcta mediante un JOIN con `clientes`.

## En resumen 1FN, 2FN y 3FN

- 1FN: Todos los atributos contienen valores atómicos (no divisibles). No hay columnas repetidas. No hay grupos de valroes repetidos.
- 2FN: Estar en 1FN y todos los atributos no clave dependen por completo de la clave primaria.
- 3FN: Estar en 2FN y ningún atributo no clave depende de otro atributo no clave.

## Forma normal de Boyce-Codd (FNBC)

- **Regla:** Toda **dependencia funcional** determinante es una clave candidata. Cubre casos donde hay varias claves candidatas y un no clave depende de una de ellas.
- En la práctica, muchas bases ya en 3FN están también en FNBC; las violaciones típicas aparecen con atributos que determinan parte de una clave compuesta.

## Cuarta y quinta forma normal (4FN, 5FN)

- **4FN:** Trata dependencias multivaluadas (cuando un atributo determina un conjunto de valores independientes); suele requerir descomponer en tablas adicionales.
- **5FN:** Trata dependencias de reunión (join) para evitar descomposiciones que pierdan información.
- Uso menos frecuente en diseño cotidiano; conviene conocerlas para casos con muchas relaciones muchos-a-muchos y atributos multivaluados.

## Cuándo normalizar y cuándo desnormalizar

- **Normalizar** para reducir redundancia, mantener consistencia y facilitar actualizaciones. Adecuado para sistemas transaccionales (**OLTP**: *Online Transaction Processing*, procesamiento de transacciones en línea).
- **Desnormalizar** a propósito (redundar datos, vistas materializadas) cuando priorizas **lecturas muy rápidas** o reportes pesados (**OLAP**: *Online Analytical Processing*, procesamiento analítico en línea) y puedes asumir la lógica de actualización.

## Instalación / puesta en marcha

No hay “instalación” específica; se aplican al **diseño del esquema** en cualquier SGBD relacional (PostgreSQL, SQL Server, MySQL, etc.). Puedes usar herramientas de modelado (pgModeler, MySQL Workbench, DbDiagram) para dibujar y refinar el esquema antes de generar DDL.
