# DesignJanala monorepo

npm workspaces + [Turborepo](https://turborepo.com). One repo for the marketing site, the admin dashboard, the API and the tests.

| Workspace | Path | What it is | Port |
| --- | --- | --- | --- |
| `@designjanala/web` | `apps/web` | Marketing site ([designjanala.com](https://designjanala.com)), Next.js 16 + Tailwind 4 | 3000 |
| `@designjanala/dashboard` | `apps/dashboard` | Admin dashboard: website content editor and contact-form leads, Next.js 16 | 3001 |
| `@designjanala/api` | `apps/api` | REST API (Hono on Node) that stores content edits, leads and uploaded images | 4000 |
| `@designjanala/shared` | `packages/shared` | Content model + default content, lead schemas, shared by all apps | — |
| `@designjanala/e2e` | `tests/e2e` | Playwright end-to-end tests across all three apps | — |

## Develop

```bash
npm install
npm run dev              # web + dashboard + api together
npm run dev:web          # just the site
npm run dev:dashboard    # dashboard + api
```

Copy each app's `.env.example` to `.env.local` (Next apps) or `.env` (API) as needed. For the full system locally:

| App | Variables |
| --- | --- |
| `apps/web/.env.local` | `API_URL=http://localhost:4000`, `REVALIDATE_SECRET=<any string>` |
| `apps/dashboard/.env.local` | `API_URL=http://localhost:4000`, `WEB_URL=http://localhost:3000`, `REVALIDATE_SECRET=<same string>` |

In development the dashboard and API need no password or token; set `DASHBOARD_EMAIL`, `DASHBOARD_PASSWORD` and `API_TOKEN` to try sign-in.

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
                 GET /content, /uploads/*                         PUT/DELETE /content/:section, POST /uploads,
apps/web  ◀───────────────────────────────  apps/api  ◀───────────  GET/PATCH /leads, /stats  (Bearer API_TOKEN)  ── apps/dashboard
   │      ── POST /leads (contact form) ──▶                                                                            │
   ▲                                                                                                                  │
   └──────────────── POST /api/revalidate (x-revalidate-secret) after every content save ─────────────────────────────┘
```

- **Content** (`packages/shared/src/content`): `schema.ts` defines every editable section (services, articles, team, portfolio, FAQs, settings…); `defaults.ts` holds the original website content. The API validates saves against the schema, the dashboard generates its editor forms from it, and the website renders the result.
- **API** (`apps/api/src/app.ts`): public `GET /content` (defaults merged with saved edits), `GET /uploads/:name` and `POST /leads`; token-protected leads, `GET /content/sections`, `PUT /content/:section`, `DELETE /content/:section` (reset to original) and `POST /uploads` (PNG/JPG/WebP/GIF/AVIF up to 5 MB). Everything is stored as files under `DATA_DIR` (`leads.json`, `content.json`, `uploads/`), so **put `DATA_DIR` on a persistent disk and back it up**. `API_TOKEN` is required in production.
- **Dashboard**: sign-in with `DASHBOARD_EMAIL` + `DASHBOARD_PASSWORD` (the password is required in production); **Content** lists every section and edits it, **Leads** manages contact-form leads. After a save it calls the website's `/api/revalidate`, so changes are live on the next page view.
- **Web**: reads content with `getContent()` (`apps/web/src/lib/content.ts`). If `API_URL` isn't set or the API is down it shows the original content, so the site never goes down with the API. Pages also refresh from the API every 5 minutes. Set `API_URL` **at build time** too: it adds the `/uploads/*` rewrite that serves dashboard-uploaded images. New services and articles get pages on first visit, without a rebuild.

### Production checklist

- API: `API_TOKEN`, `DATA_DIR` (persistent), `CORS_ORIGINS`.
- Dashboard: `API_URL`, `API_TOKEN`, `DASHBOARD_EMAIL`, `DASHBOARD_PASSWORD`, `SESSION_SECRET`, `WEB_URL`, `REVALIDATE_SECRET`.
- Web: `API_URL` (build and runtime), `REVALIDATE_SECRET`, `CONTACT_WEBHOOK_URL`.
