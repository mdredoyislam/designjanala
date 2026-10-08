# DesignJanala monorepo

npm workspaces + [Turborepo](https://turborepo.com). One repo for the marketing site, the admin dashboard, the API and the tests.

| Workspace | Path | What it is | Port |
| --- | --- | --- | --- |
| `@designjanala/web` | `apps/web` | Marketing site ([designjanala.com](https://designjanala.com)), Next.js 16 + Tailwind 4 | 3000 |
| `@designjanala/dashboard` | `apps/dashboard` | Admin dashboard for contact-form leads, Next.js 16 | 3001 |
| `@designjanala/api` | `apps/api` | REST API (Hono on Node) that stores leads | 4000 |
| `@designjanala/shared` | `packages/shared` | Zod schemas and types shared by all apps | — |
| `@designjanala/e2e` | `tests/e2e` | Playwright end-to-end tests across all three apps | — |

## Develop

```bash
npm install
npm run dev              # web + dashboard + api together
npm run dev:web          # just the site
npm run dev:dashboard    # dashboard + api
```

Copy each app's `.env.example` to `.env.local` (Next apps) or `.env` (API) as needed.
Set `API_URL=http://localhost:4000` in `apps/web/.env.local` to have contact-form submissions saved to the API and shown in the dashboard.

## Check

```bash
npm run lint        # ESLint (Next apps) and tsc (packages)
npm run typecheck
npm test            # Vitest unit tests (api, shared)
npm run build
npm run test:e2e    # Playwright; needs `npm run build` first and `npx playwright install chromium` once
                    # (or PW_CHANNEL=chrome to use your installed Chrome)
```

CI (`.github/workflows/ci.yml`) runs all of the above on every push to `main` and on pull requests.

## How the pieces connect

```
apps/web contact form ──POST /leads──▶ apps/api ◀──GET/PATCH /leads, /stats (Bearer API_TOKEN)── apps/dashboard
```

- **API** (`apps/api/src/app.ts`): `GET /health`, public `POST /leads`, and token-protected `GET /leads`, `GET /leads/:id`, `PATCH /leads/:id`, `GET /stats`. Leads are kept **in memory** (`MemoryLeadStore`), so they reset on restart; implement `LeadStore` against a real database before going live.
- **Dashboard**: server-rendered; calls the API with `API_URL` / `API_TOKEN`. It has **no login of its own yet**: put it behind auth (or a private network / access proxy) before deploying.
- **Web**: unchanged content; see `apps/web` for where copy, pages and components live. The contact form still supports `CONTACT_WEBHOOK_URL`, and also posts to the API when `API_URL` is set.
