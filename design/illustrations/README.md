# Website illustrations

The product shots on the website (team hero, services, process, culture slider, About, career cards) are HTML
mockups rendered to WebP by Chrome, so they read like real app screenshots: real text, real data, macOS windows.

- `kit.mjs`: page shell, backdrop, windows, phone frame, icons, avatars, chart.
- `scenes.mjs`: one entry per image (`name`, `width`, `height`, `html`).
- `render.mjs`: renders scenes at 2× into `apps/web/public/images/illustrations/<name>.webp`.

```bash
PW_CHANNEL=chrome node design/illustrations/render.mjs          # all
PW_CHANNEL=chrome node design/illustrations/render.mjs studio   # one
```

Render on macOS: the scenes use the system fonts (SF Pro, SF Mono, Avenir Next) and Apple emoji.
The people and companies shown (Nimbus Health, Ledgerly, Bazaar Go, patients, applicants) are fictional.
