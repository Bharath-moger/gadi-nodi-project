# Gadinodi API

NestJS API for the Gadinodi vehicle marketplace UI.

## Run

```bash
npm install
npm run db:prepare
npm run start:dev
```

For a production boot after `npm run build`, use:

```bash
npm run start
```

## Environment

Create a local `.env` from `.env.example` when needed:

```bash
NODE_ENV=development
HOST=127.0.0.1
PORT=4000
UI_ORIGIN=http://localhost:3000,http://127.0.0.1:3000
DATABASE_URL=postgresql://gadinodi:gadinodi@127.0.0.1:5432/gadinodi?schema=public
```

The seed process is idempotent and reconciles the bootstrap dataset, so rerunning `npm run db:seed` updates existing records and removes stale bootstrap rows that no longer exist in `prisma/seed-data.ts`.

## Endpoints

- `GET /api/health`
- `GET /api/marketplace/home`
- `GET /api/marketplace/facets`
- `GET /api/vehicles/slugs`
- `GET /api/vehicles`
- `GET /api/vehicles/:slug`
- `GET /api/vehicles/:slug/related`
- `GET /api/partners/slugs`
- `GET /api/partners`
- `GET /api/partners/:slug`
