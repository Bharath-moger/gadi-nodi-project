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
IMGBB_API_KEY=your_imgbb_key
```

## Extend user types

Runtime content now comes only from the API and database. To extend user types or seed the initial marketplace content, update the API bootstrap data in `../../API/gadinodi/prisma/seed-data.ts` and rerun:

```bash
npm --prefix ../../API/gadinodi run db:seed
```

Seller vehicle image uploads use `imgbb` through the UI server route. Keep `IMGBB_API_KEY` only in `.env.local`; do not expose it in client-side environment variables.

## Audience modes

PLP and PDP support:

- `?mode=guest`
- `?mode=user`

## Tailwind CSS

Tailwind CSS is configured for new UI changes.

Important project rule:

- existing screens still rely on the custom global stylesheet
- Tailwind utilities should be used for new work
- use the `tw:` prefix, for example `tw:flex tw:gap-4 tw:rounded-2xl`

This setup intentionally skips Tailwind Preflight so older styles are not reset unexpectedly.
