# Gadinodi

SEO-first Next.js storefront for new and used vehicle listings with enterprise-ready PLP, PDP, and partner-type landing pages.

## Run

```bash
npm install
npm run dev
```

For a production boot after `npm run build`, use:

```bash
npm run start
```

## API integration

The UI is wired to a NestJS API in `../../API/gadinodi`.

Create `.env.local` from `.env.local.example` if you want to point the UI at a non-default backend URL:

```bash
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:4000/api
API_BASE_URL=http://127.0.0.1:4000/api
```

## Extend user types

Runtime content now comes only from the API and database. To extend user types or seed the initial marketplace content, update the API bootstrap data in `../../API/gadinodi/prisma/seed-data.ts` and rerun:

```bash
npm --prefix ../../API/gadinodi run db:seed
```

## Audience modes

PLP and PDP support:

- `?mode=guest`
- `?mode=user`
