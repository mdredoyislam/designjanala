// Building blocks for the website's product-shot illustrations: page shell, backdrop,
// macOS windows, an iPhone frame, icons and avatars. Scenes in scenes.mjs use these.

/** Fine film grain, so flat gradients read as photographed rather than drawn. */
const grain = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 .9 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
)}")`;

const css = /* css */ `
*{box-sizing:border-box;margin:0;padding:0}
html,body{overflow:hidden}
body{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",sans-serif;-webkit-font-smoothing:antialiased;color:#111;font-size:13px;line-height:1.4;letter-spacing:-.005em}
.mono{font-family:ui-monospace,"SF Mono",Menlo,monospace}
.stage{position:relative;overflow:hidden}
.stage::after{content:"";position:absolute;inset:0;background-image:${grain};opacity:.07;mix-blend-mode:overlay;pointer-events:none;z-index:50}
.abs{position:absolute}
.win{position:absolute;border-radius:12px;overflow:hidden;background:#fff;
  box-shadow:0 0 0 .5px rgba(0,0,0,.55),0 1px 0 rgba(255,255,255,.08) inset,0 50px 100px -20px rgba(0,0,0,.65),0 20px 40px -10px rgba(0,0,0,.4)}
.win.dark{background:#1e1e1e;color:#e6e6e6;box-shadow:0 0 0 .5px rgba(255,255,255,.12),0 50px 100px -20px rgba(0,0,0,.75),0 20px 40px -10px rgba(0,0,0,.5)}
.bar{height:36px;display:flex;align-items:center;gap:8px;padding:0 13px;background:linear-gradient(#f6f6f6,#e9e9e9);border-bottom:1px solid #d4d4d4;font-size:12px;color:#4a4a4a;font-weight:500}
.win.dark .bar{background:linear-gradient(#323232,#2a2a2a);border-color:#111;color:#bdbdbd}
.tl{display:flex;gap:8px;margin-right:6px}.tl i{width:12px;height:12px;border-radius:50%;display:block;box-shadow:0 0 0 .5px rgba(0,0,0,.25) inset}
.tl i:nth-child(1){background:#ff5f57}.tl i:nth-child(2){background:#febc2e}.tl i:nth-child(3){background:#28c840}
.bar .t{flex:1;text-align:center;margin-right:66px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.url{flex:1;margin:0 70px 0 10px;height:24px;border-radius:7px;background:#fff;border:1px solid #d8d8d8;display:flex;align-items:center;justify-content:center;gap:6px;color:#555;font-size:12px}
.win.dark .url{background:#1b1b1b;border-color:#3a3a3a;color:#aaa}
.av{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;color:#fff;font-weight:600;flex-shrink:0}
.ico{width:16px;height:16px;flex-shrink:0;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.pill{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:2px 8px;font-size:11px;font-weight:600}
.phone{position:absolute;border-radius:54px;background:#0b0b0b;padding:11px;box-shadow:0 0 0 1.5px #3b3b3b,0 0 0 3px #1a1a1a,0 60px 100px -20px rgba(0,0,0,.7),0 25px 45px -15px rgba(0,0,0,.5)}
.phone .scr{position:relative;width:100%;height:100%;border-radius:44px;overflow:hidden;background:#fff}
.phone .island{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:27%;height:23px;border-radius:20px;background:#000;z-index:5}
.sb{height:46px;display:flex;align-items:center;justify-content:space-between;padding:4px 9% 0 11%;font-weight:600;font-size:13px}
.sb .r{display:flex;gap:5px;align-items:center}
`;

/** A full HTML document of the given size. `bg` is the backdrop behind the windows. */
export function page({ width, height, bg, body }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}
body{width:${width}px;height:${height}px}.stage{width:${width}px;height:${height}px;background:${bg}}</style></head>
<body><div class="stage">${body}</div></body></html>`;
}

/** Dark graphite backdrop with a warm studio light from one side. */
export const backdrop = (x = "70%", y = "30%", strength = 0.22) =>
  `radial-gradient(ellipse 60% 70% at ${x} ${y}, rgba(255,208,0,${strength}), transparent 70%), radial-gradient(ellipse 90% 80% at 50% 110%, #1c1c1c, transparent), linear-gradient(160deg,#151515,#0a0a0a 60%,#060606)`;

/** macOS window. `title` shows in the bar; `url` makes it a browser window instead. */
export function win({ x, y, w, h, dark = false, title = "", url = "", bar = true, style = "", body }) {
  const chrome = !bar
    ? ""
    : `<div class="bar"><div class="tl"><i></i><i></i><i></i></div>${
        url ? `<div class="url">${icon("lock", 11)}${url}</div>` : `<div class="t">${title}</div>`
      }</div>`;
  return `<div class="win${dark ? " dark" : ""}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;${style}">${chrome}${body}</div>`;
}

/** iPhone with a status bar. `w` is the outer width; the height follows the real aspect ratio. */
export function phone({ x, y, w, dark = false, rotate = 0, body }) {
  const h = Math.round(w * 2.05);
  const color = dark ? "#fff" : "#111";
  return `<div class="phone" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:rotate(${rotate}deg)">
  <div class="scr" style="background:${dark ? "#0e0e0e" : "#fff"};color:${color}"><div class="island"></div>
  <div class="sb" style="color:${color}"><span>9:41</span><span class="r">${signal(color)}${wifi(color)}${battery(color)}</span></div>${body}</div></div>`;
}

const signal = (c) =>
  `<svg width="17" height="11" viewBox="0 0 17 11">${[0, 1, 2, 3].map((i) => `<rect x="${i * 4.5}" y="${8 - i * 2.6}" width="3" height="${3 + i * 2.6}" rx=".8" fill="${c}"/>`).join("")}</svg>`;
const wifi = (c) =>
  `<svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 10.5l2-2.3a3 3 0 00-4 0zM3.3 5.6a6 6 0 018.4 0l1.4-1.6a8.2 8.2 0 00-11.2 0zM.4 2.6a10.3 10.3 0 0114.2 0" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const battery = (c) =>
  `<svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3.2" fill="none" stroke="${c}" opacity=".4"/><rect x="2" y="2" width="17" height="8" rx="2" fill="${c}"/><rect x="22.5" y="4" width="1.8" height="4" rx=".9" fill="${c}" opacity=".45"/></svg>`;

/** The same people always get the same colour across scenes. */
const people = { "Zumanur Rahman": "#9b5de5", "Redoy Islam": "#2a9d8f", "Sara Ahmed": "#e07a5f" };
const avatarColors = ["#e07a5f", "#3d405b", "#81b29a", "#5b8def", "#9b5de5", "#f2a541", "#2a9d8f", "#d1495b"];
/** Initials avatar with a stable colour per name. */
export function av(name, size = 24, color) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const c = color ?? people[name] ?? avatarColors[[...name].reduce((n, ch) => n + ch.charCodeAt(0), 0) % avatarColors.length];
  return `<span class="av" style="width:${size}px;height:${size}px;background:${c};font-size:${Math.round(size * 0.4)}px">${initials}</span>`;
}

const iconPaths = {
  home: "M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  users: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  inbox: "M22 12h-6l-2 3h-4l-2-3H2M5.5 5.1L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.5-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.7 1.1z",
  file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6",
  check: "M20 6L9 17l-5-5",
  play: "M6 4l14 8-14 8z",
  plus: "M12 5v14M5 12h14",
  bell: "M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0",
  git: "M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM18 9a9 9 0 01-9 9",
  globe: "M12 22a10 10 0 100-20 10 10 0 000 20zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2",
  clip: "M21.4 11l-9.2 9.2a6 6 0 01-8.5-8.5l9.2-9.2a4 4 0 015.7 5.7l-9.2 9.2a2 2 0 01-2.8-2.8l8.5-8.5",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
  spark: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z",
  db: "M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 018 0v4",
  layers: "M12 2l10 5-10 5L2 7zM2 17l10 5 10-5M2 12l10 5 10-5",
  frame: "M8 3v18M16 3v18M3 8h18M3 16h18",
  type: "M4 7V4h16v3M9 20h6M12 4v16",
  pen: "M12 19l7-7 3 3-7 7zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18zM2 2l7.6 7.6M11 13a2 2 0 100-4 2 2 0 000 4z",
  cart: "M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6",
  heart: "M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 000-7.8z",
  calendar: "M4 5h16v16H4zM16 3v4M8 3v4M4 11h16",
  pin: "M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12zM12 12a2 2 0 100-4 2 2 0 000 4z",
  msg: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9z",
  arrowUp: "M12 19V5M5 12l7-7 7 7",
  more: "M12 13a1 1 0 100-2 1 1 0 000 2zM19 13a1 1 0 100-2 1 1 0 000 2zM5 13a1 1 0 100-2 1 1 0 000 2z",
};
export function icon(name, size = 16, style = "") {
  return `<svg class="ico" viewBox="0 0 24 24" style="width:${size}px;height:${size}px;${style}"><path d="${iconPaths[name]}"/></svg>`;
}

/** Smooth area/line chart path through `values` (0..1) inside w×h. */
export function chart(values, w, h, { stroke = "#111", fill = "rgba(0,0,0,.06)", width = 2.2 } = {}) {
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - v * h]);
  const d = pts.reduce((acc, [x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = pts[i - 1];
    const cx = (px + x) / 2;
    return `${acc} C${cx},${py} ${cx},${y} ${x},${y}`;
  }, "");
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="overflow:visible;display:block">
  <path d="${d} L${w},${h} L0,${h}Z" fill="${fill}"/><path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round"/></svg>`;
}
