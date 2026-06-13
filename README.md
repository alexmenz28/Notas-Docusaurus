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

Tras el primer visit en producción, el service worker (PWA) precachea HTML, assets e `search-index.json` en móvil para lectura y búsqueda offline.

## Despliegue en Vercel (Hobby)

Repositorio: [alexmenz28/Notas-Docusaurus](https://github.com/alexmenz28/Notas-Docusaurus). Segundo proyecto en la cuenta Hobby; la raíz del repo **es** el proyecto Docusaurus (no hay subcarpeta `web/`).

| Campo | Valor |
| --- | --- |
| **Root Directory** | `.` (raíz del repo) |
| **Framework Preset** | Other |
| **Build Command** | `npm run build` |
| **Output Directory** | `build` |
| **Install Command** | `npm install` |

El archivo `vercel.json` fija build/output y cabeceras para `sw.js` y `manifest.json`.

### Variables de entorno

| Variable | Cuándo | Propósito |
| --- | --- | --- |
| **`SITE_URL`** | Producción (recomendado) | URL canónica del sitio, p. ej. `https://notas-docusaurus.vercel.app` o tu dominio custom. Tiene prioridad sobre las variables de Vercel. |
| **`VERCEL_PROJECT_PRODUCTION_URL`** | Build en Vercel | La inyecta Vercel en despliegues de producción; `docusaurus.config.ts` la usa si no hay `SITE_URL`. |
| **`VERCEL_URL`** | Build en Vercel | URL del deployment actual (previews incluidos); fallback si faltan las anteriores. |

Tras el primer deploy, define **`SITE_URL`** con el dominio final para metadatos, sitemap y PWA coherentes.

### Privacidad (notas personales)

- Repo **privado** en GitHub.
- Vercel: **Deployment Protection** (contraseña o Vercel Authentication según plan).
- **`static/robots.txt`** con `Disallow: /` para desalentar indexación en buscadores.
- Evita enlazar el sitio públicamente si el contenido es sensible.

### Checklist: prueba offline en móvil

1. Abrir el sitio en **HTTPS** (producción o preview de Vercel).
2. Navegar por varias notas y la búsqueda (**primera carga**); esperar a que el service worker termine de instalar (segundos).
3. Activar **modo avión** (o añadir `?offlineMode=true` a la URL).
4. Abrir otra nota ya visitada → debe cargar sin red.
5. Usar la **búsqueda local** (Ctrl/Cmd+K o icono) → debe devolver resultados (índice precacheado en `search-index.json`).

Para instalar como app: menú del navegador → «Añadir a pantalla de inicio».

## Enlaces externos en la documentación

Para comprobar respuestas HTTP de las URLs `https://…` citadas en `docs/` (omite `github.com/usuario/…` y similares usados solo como ejemplo):

```bash
npm run check:links
```

Opcional: `LINK_CHECK_DELAY_MS=400` para espaciar más las peticiones. Algunos sitios pueden bloquear o limitar el tráfico automatizado; revisa manualmente si un fallo parece falso positivo.

## Tecnologías

- [Docusaurus](https://docusaurus.io/) 3.10.x (bundler Faster + PWA)
- [Mermaid](https://mermaid.js.org/) — Diagramas en Markdown
- [docusaurus-plugin-search-local](https://github.com/gabrielcsapo/docusaurus-plugin-search-local) — Búsqueda local (offline con PWA)
- [@docusaurus/plugin-pwa](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-pwa) — Service worker y caché offline
