# Biblioteca — Sitio web

Biblioteca personal de conocimiento construida con [Docusaurus](https://docusaurus.io/). Incluye notas sobre arquitecturas de software, bases de datos, marcos de trabajo, metodologías, paradigmas de programación, prácticas ágiles, desarrollo web y GitHub, con intención de seguir anotando mi aprendizaje.

## Contenido

- **Ejemplos** — Guía de uso de Markdown (tablas, código, Mermaid, admonitions)
- **Arquitecturas de desarrollo** — Monolito, n-capas, hexagonal, clean, microservicios, CQRS, SPA/SSR/SSG, micro-frontends
- **Bases de datos** — Fundamentos, formas normales, diseño, índices, NoSQL, migraciones, SQL (DDL/DML, consultas, transacciones, procedimientos/triggers/funciones)
- **Marcos de trabajo** — Scrum, PUDS
- **Metodologías** — XP
- **Paradigmas (POO)** — Fundamentos, SOLID, relaciones UML, patrones, POO en C#/TypeScript
- **Prácticas ágiles** — Historias de usuario, Planning poker
- **Desarrollo web** — Diagramas y stacks (frontend, backend, datos, despliegue)
- **GitHub** — Fundamentos, repositorios, ramas y commits, pull requests, issues, Actions

## Requisitos

- Node.js >= 20
- npm

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run start
```

Inicia el servidor de desarrollo. La mayoría de los cambios se reflejan en vivo sin reiniciar.

## Build y vista previa de producción

```bash
npm run build
npm run serve
```

El build genera el contenido estático en `build/`. La búsqueda local se indexa correctamente tras el build (en `start` el índice puede estar incompleto).

## Despliegue

Para GitHub Pages u otro hosting estático, sube el contenido de la carpeta `build/` tras ejecutar `npm run build`.

## Tecnologías

- [Docusaurus](https://docusaurus.io/) 3.x
- [Mermaid](https://mermaid.js.org/) — Diagramas en Markdown
- [docusaurus-plugin-search-local](https://github.com/cmfcmf/docusaurus-search-local) — Búsqueda local
