# DesignJanala — Next.js site

Rebuild of [designjanala.com](https://designjanala.com) (previously WordPress) on Next.js 16 + React 19 + Tailwind CSS 4, with a layout and service lineup modelled on musemind.agency.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | Where |
| --- | --- |
| All copy, the 11 services (6 marked `featured` show on the homepage), portfolio, testimonials, FAQ, stats | `src/data/site.ts` |
| Pages | `src/app/*/page.tsx` |
| Shared UI (header, footer, cards, marquee, reveal) | `src/components/` |
| Design tokens (colors, buttons, type) | `src/app/globals.css` |
| Portfolio images & logo (copied from the WP site) | `public/images/` |
| Contact form server action | `src/app/contact/actions.ts` |
| Redirects for old WordPress URLs | `next.config.ts` |

**Add a portfolio item:** drop the image in `public/images/portfolio/` and add an entry to `projects` in `src/data/site.ts`. Set `free: true` to show it on /freebies.

## Contact form

Set `CONTACT_WEBHOOK_URL` (see `.env.example`). Submissions are validated server-side and POSTed as JSON. Without it, production shows an error asking visitors to email directly, so leads are never silently dropped.

## Deploy

Every route is statically generated, so it deploys anywhere Next.js runs (Vercel, Netlify, a Node server). Point the domain at the new host when ready; the WordPress site can stay up until then.
