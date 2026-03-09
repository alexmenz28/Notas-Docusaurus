---
id: github-repositorios
title: GitHub — Repositorios
sidebar_label: Repositorios
slug: /github/repositorios

type: herramienta
category: github
tags:
  - repositorios
  - clone
  - fork
  - remote
topics:
  - desarrollo-software
nivel: basico
estado: en_revision
origen: notas-personales
keywords:
  - repository
  - clone
  - fork
  - remote
---

# GitHub — Repositorios

## Términos

- **Repositorio (repo):** Proyecto en GitHub: contiene commits, ramas, archivos y configuración. Puede ser público o privado.
- **Clone:** Copiar un repositorio remoto a tu máquina local; obtienes una copia completa del historial.
- **Fork:** Copia de un repositorio en tu cuenta de GitHub; permite contribuir sin modificar el original. Típico en open source.
- **Remote:** Referencia a un repositorio remoto (p. ej. `origin`). `git push` y `git pull` usan el remote para sincronizar.
- **Origin:** Nombre por defecto del remote que apunta al repo del que clonaste.

## Qué es

Un **repositorio** en GitHub es una unidad de proyecto: código, historial de versiones, issues, configuración de PRs y Actions. Puedes crearlo vacío o con README inicial; clonarlo para trabajar en local; o hacer fork de un proyecto ajeno para proponer cambios sin tocar el original.

## Para qué sirve

- **Crear repo:** Iniciar un proyecto nuevo desde cero o importar uno existente.
- **Clonar:** Obtener una copia local para trabajar; `git clone` descarga el repo y configura el remote `origin`.
- **Fork:** Contribuir a proyectos que no controlas; creas tu copia, haces cambios y abres un PR al repo original.
- **Remote:** Mantener varios remotes (p. ej. `origin` = tu fork, `upstream` = repo original) para sincronizar con el proyecto original.

## Cómo se aplica

**Crear repositorio en GitHub:**  
En la web: New repository → nombre, descripción, público/privado, opcional README o .gitignore.

**Clonar:**
```bash
git clone https://github.com/usuario/repo.git
cd repo
```

**Fork (en la web):** Botón "Fork" en la página del repo → se crea en tu cuenta.

**Clonar tu fork y añadir upstream:**
```bash
git clone https://github.com/tu-usuario/repo.git
cd repo
git remote add upstream https://github.com/original/repo.git
```

**Sincronizar con upstream:**
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

## Estructura típica de un repo

- **README.md:** Descripción del proyecto, cómo instalarlo y usarlo.
- **.gitignore:** Archivos que Git no debe versionar (node_modules, .env, build, etc.).
- **LICENSE:** Licencia del proyecto (MIT, Apache, GPL, etc.).
- **Carpetas:** `src/`, `docs/`, `tests/` según convención del proyecto.

## Relación con otras notas

- [Ramas y commits](/docs/github/ramas-y-commits): trabajar con ramas y subir cambios.
- [Pull Requests](/docs/github/pull-requests): proponer cambios desde un fork o rama.
