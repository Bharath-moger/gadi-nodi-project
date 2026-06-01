# gadinodi.com

Monorepo for the `Gadinodi` marketplace UI and API.

## Apps

- `Web/UI/gadinodi`: Next.js storefront
- `Web/API/gadinodi`: NestJS + Prisma API

## First-time setup

```bash
nvm use
npm install
npm run bootstrap
```

`bootstrap` runs a workspace preflight, creates local env files, and installs both subprojects. To bring up PostgreSQL automatically you need Docker installed for `docker compose`.

If you see an `EBADENGINE` warning from the UI lint toolchain on Node `22.12.0`, move to Node `22.13.0+` or Node `24+`.

## Run the stack

```bash
npm run dev:stack
```

That flow:

- syncs env files
- starts PostgreSQL with Docker Compose
- generates Prisma client
- applies migrations
- seeds the database
- runs API and UI together

If your PostgreSQL server is already running and configured in `Web/API/gadinodi/.env`, use:

```bash
npm run dev
```

## Run Production Build

```bash
npm run build
npm run start
```

`start` serves the built NestJS API and the built Next.js UI together.
