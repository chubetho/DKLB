# DKLB Setup and Usage Guide
- [DKLB Setup and Usage Guide](#dklb-setup-and-usage-guide)
  - [Requirements](#requirements)
  - [How to run](#how-to-run)
    - [Using Vite](#using-vite)
    - [Using docker](#using-docker)
  - [How to develop](#how-to-develop)
    - [To create route in a app](#to-create-route-in-a-app)
    - [To create new MicroFrontend](#to-create-new-microfrontend)
    - [To start developing](#to-start-developing)

## Requirements

1. Node.js version 20
2. Bun

## How to run

### Using Vite

1. Build `bun run build`
2. Start `bun run start`

### Using docker

1. Prepare docker `bun run prepare:docker`
2. Build images `docker compose up --build`

## How to develop

### To create route in a app

Routes are registered based on folder structure. For examples:

- `/`: `apps/home/src/pages/+index.vue`
- `/about`: `apps/home/src/pages/about.vue`
- `/services/news`: `apps/home/src/pages/services/news.vue`

### To create new MicroFrontend

1. In terminal run `bun run create:app`
2. Enter folder name. For e.g. `eurojackpot`
3. Enter prefix. For e.g. `/eurojackpot`
4. Others

### To start developing

Run each commands in a terminal

1. `bun run dev:server`
2. `bun run dev:shell`
3. `bun run build:apps:watch`
4. `bun run start:apps`
5. `bun run build:ui` (optional)
6. `bun run build:ui:types` (optional)
