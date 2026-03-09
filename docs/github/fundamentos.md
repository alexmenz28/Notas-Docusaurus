---
id: github-fundamentos
title: GitHub — Fundamentos
sidebar_label: Fundamentos
slug: /github/fundamentos

type: herramienta
category: github
tags:
  - git
  - control-versiones
  - colaboracion
topics:
  - desarrollo-software
  - devops
nivel: basico
estado: en_revision
origen: notas-personales
keywords:
  - github
  - git
  - version control
---

# GitHub — Fundamentos

## Términos

- **Git:** Sistema de control de versiones distribuido. Guarda el historial de cambios en un repositorio local; cada desarrollador tiene una copia completa.
- **GitHub:** Plataforma web que aloja repositorios Git y añade colaboración (Issues, Pull Requests, Actions, etc.). Alternativas: GitLab, Bitbucket, etc.
- **Repositorio (repo):** Carpeta con historial de versiones; contiene commits, ramas y archivos.
- **Commit:** Punto de guardado en el historial; un snapshot de los cambios con mensaje, autor y fecha.
- **Rama (branch):** Línea de desarrollo paralela; permite trabajar en features sin tocar la rama principal.

## Qué es

**GitHub** es una plataforma web (de Microsoft) que sirve como **hosting de repositorios Git** y añade herramientas para colaboración: código abierto, issues, pull requests, code review, wiki, proyectos, CI/CD con GitHub Actions y más. No es lo mismo que Git: Git es el motor de versiones; GitHub es el sitio donde se alojan y comparten los repos.

## Para qué sirve

Sirve para **almacenar código** en la nube, **colaborar** en equipo (fork, pull request, merge), **revisar código** antes de integrarlo, **gestionar tareas** (issues, proyectos) y **automatizar** builds, tests y despliegues con GitHub Actions. Es el estándar de facto para proyectos open source y muchos equipos privados.

## Cómo se reconoce y cómo aplicarlo

Se reconoce por la interfaz web (github.com), URLs como `github.com/usuario/repo`, y por el flujo típico: clone → branch → commit → push → pull request → merge. Para usarlo: crea una cuenta, instala Git en tu máquina, configura SSH o token, clona o crea un repo y empieza a hacer commits y PRs. Las notas siguientes detallan repositorios, ramas, pull requests, issues y Actions.

## Git vs GitHub

| Git | GitHub |
|-----|--------|
| Herramienta de control de versiones (local) | Plataforma web que aloja repos Git |
| Comandos: `git init`, `git add`, `git commit`, `git clone` | Interfaz web: ver código, issues, PRs, Actions |
| Funciona sin internet (después de clonar) | Requiere conexión para push/pull/clonar |
| Estándar abierto; cualquiera puede hostear | Servicio comercial (con plan gratuito) |

## Contenido del bloque GitHub

- [Repositorios](/docs/github/repositorios): crear, clonar, fork, remotes.
- [Ramas y commits](/docs/github/ramas-y-commits): branch, commit, push, pull.
- [Pull Requests](/docs/github/pull-requests): PR, code review, merge.
- [Issues y proyectos](/docs/github/issues-y-proyectos): issues, labels, milestones, proyectos.
- [GitHub Actions](/docs/github/github-actions): CI/CD, workflows, automatización.

## Instalación / puesta en marcha

- **Cuenta:** [github.com](https://github.com) — crear cuenta gratuita.
- **Git (local):** [git-scm.com](https://git-scm.com) — instalar en Windows, Mac o Linux.
- **Autenticación:** SSH (recomendado) o [Personal Access Token (PAT)](https://github.com/settings/tokens) para HTTPS.
- **Cliente opcional:** GitHub Desktop, VS Code con extensión Git, o línea de comandos.
