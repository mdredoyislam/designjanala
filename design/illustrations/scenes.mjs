// Product-shot scenes. Each renders to apps/web/public/images/illustrations/<name>.webp.
import { av, backdrop, chart, icon, page, phone, win } from "./kit.mjs";

const Y = "#ffd000";
const FIGMA_BLUE = "#0d99ff";

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

/** The Nimbus Health landing page, as designed in Figma and shipped on the phone. */
const nimbusLanding = (scale = 1) => `
<div style="width:${560}px;transform:scale(${scale});transform-origin:0 0;background:#fbfaf7;font-family:-apple-system,sans-serif">
  <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 26px;border-bottom:1px solid #eee">
    <div style="display:flex;align-items:center;gap:7px;font-weight:700;font-size:14px;color:#0f3d2e"><span style="width:18px;height:18px;border-radius:6px;background:#0f3d2e;display:inline-block"></span>nimbus</div>
    <div style="display:flex;gap:18px;font-size:11px;color:#555"><span>Clinics</span><span>Doctors</span><span>Pricing</span><span>Sign in</span></div>
  </div>
  <div style="display:flex;gap:22px;padding:30px 26px 26px">
    <div style="flex:1.1">
      <div style="font-size:10px;font-weight:600;color:#2a7a5a;letter-spacing:.08em">TELEHEALTH · DHAKA</div>
      <div style="font-size:30px;line-height:1.05;font-weight:700;letter-spacing:-.03em;color:#10241c;margin-top:8px">Care that fits<br>your day.</div>
      <div style="font-size:11.5px;color:#5b6b64;margin-top:10px;line-height:1.5">Book a verified doctor in minutes, get prescriptions delivered and keep your records in one place.</div>
      <div style="display:flex;gap:8px;margin-top:16px">
        <span id="cta" style="background:#0f3d2e;color:#fff;font-size:11px;font-weight:600;padding:9px 14px;border-radius:8px">Book appointment</span>
        <span style="border:1px solid #cfd8d3;color:#10241c;font-size:11px;font-weight:600;padding:9px 14px;border-radius:8px">How it works</span>
      </div>
      <div style="display:flex;gap:14px;margin-top:18px;font-size:10px;color:#6b7a73"><span><b style="color:#10241c">4.9</b> ★ App Store</span><span><b style="color:#10241c">120k</b> patients</span></div>
    </div>
    <div style="flex:.9;border-radius:14px;background:linear-gradient(160deg,#d7eadf,#a9d1bd);position:relative;min-height:170px;overflow:hidden">
      <div style="position:absolute;left:14px;top:14px;right:14px;background:#fff;border-radius:10px;padding:10px;box-shadow:0 6px 18px rgba(16,36,28,.12)">
        <div style="display:flex;gap:8px;align-items:center">${av("Farhana Akter", 26, "#2a7a5a")}<div><div style="font-size:11px;font-weight:600">Dr. Farhana Akter</div><div style="font-size:9.5px;color:#6b7a73">General physician · 12 yrs</div></div></div>
        <div style="display:flex;gap:5px;margin-top:9px">${["10:30", "11:00", "11:30"].map((t, i) => `<span style="flex:1;text-align:center;font-size:10px;padding:5px 0;border-radius:6px;${i === 1 ? "background:#0f3d2e;color:#fff" : "background:#f1f5f3;color:#10241c"}">${t}</span>`).join("")}</div>
      </div>
      <div style="position:absolute;left:14px;bottom:14px;background:#10241c;color:#fff;border-radius:9px;padding:7px 10px;font-size:10px;display:flex;gap:6px;align-items:center"><span style="width:6px;height:6px;border-radius:50%;background:#5fe0a0"></span>3 doctors online now</div>
    </div>
  </div>
</div>`;

/** Syntax-highlighted code lines: [[text, colour], ...] per line. */
const code = (lines, { size = 12.5, lh = 21, gutter = true, start = 1 } = {}) =>
  `<div class="mono" style="font-size:${size}px;line-height:${lh}px;padding:12px 0">${lines
    .map(
      (parts, i) =>
        `<div style="display:flex;white-space:pre">${gutter ? `<span style="width:42px;text-align:right;padding-right:16px;color:#5a5a5a">${start + i}</span>` : ""}<span>${parts
          .map(([t, c]) => `<span style="color:${c}">${t.replace(/</g, "&lt;")}</span>`)
          .join("")}</span></div>`,
    )
    .join("")}</div>`;
const K = "#c586c0", F = "#dcdcaa", S = "#ce9178", T = "#4ec9b0", V = "#9cdcfe", P = "#d4d4d4", C = "#6a9955", G = "#808080";

/* ------------------------------------------------------------------ */
/* Studio: Figma + editor + phone (team hero, 16:6)                    */
/* ------------------------------------------------------------------ */
const studio = {
  name: "studio",
  width: 1600,
  height: 600,
  html: page({
    width: 1600,
    height: 600,
    bg: backdrop("55%", "20%", 0.2),
    body: `
${win({
  x: 70, y: 60, w: 860, h: 470, dark: true, title: "Nimbus Health — Website", body: `
  <div style="display:flex;height:434px;background:#2c2c2c">
    <div style="width:180px;background:#2c2c2c;border-right:1px solid #1e1e1e;padding:10px 0;font-size:11.5px;color:#d0d0d0">
      <div style="padding:2px 12px 8px;color:#fff;font-weight:600">Layers</div>
      ${[["frame", "Home — Desktop", 0, true], ["frame", "Nav", 1], ["frame", "Hero", 1, false, true], ["type", "Headline", 2], ["type", "Subhead", 2], ["frame", "Book appointment", 2, false, false, true], ["frame", "Doctor card", 2], ["frame", "Features", 1], ["frame", "Footer", 1], ["frame", "Home — Mobile", 0]]
        .map(([ic, n, d, b, open, sel]) => `<div style="display:flex;align-items:center;gap:6px;padding:4px 12px 4px ${12 + d * 14}px;${sel ? `background:${FIGMA_BLUE}33;color:#fff` : ""};${b ? "color:#fff;font-weight:600" : ""}">${icon(ic, 12, "opacity:.7")}${n}</div>`)
        .join("")}
    </div>
    <div style="flex:1;position:relative;background:#1e1e1e;overflow:hidden">
      <div style="position:absolute;left:36px;top:24px;font-size:11px;color:#9a9a9a">Home — Desktop</div>
      <div style="position:absolute;left:36px;top:42px;box-shadow:0 2px 12px rgba(0,0,0,.4)">${nimbusLanding(0.86)}</div>
      <div style="position:absolute;left:58px;top:250px;width:105px;height:30px;border:1.5px solid ${FIGMA_BLUE}"></div>
      ${[[58, 250], [161, 250], [58, 278], [161, 278]].map(([x, y]) => `<div style="position:absolute;left:${x - 3}px;top:${y - 3}px;width:7px;height:7px;background:#fff;border:1.5px solid ${FIGMA_BLUE}"></div>`).join("")}
      <div style="position:absolute;left:170px;top:258px;background:${FIGMA_BLUE};color:#fff;font-size:10px;padding:1px 5px;border-radius:3px" class="mono">104 × 30</div>
      <div style="position:absolute;left:300px;top:330px;display:flex;align-items:flex-start;gap:2px">
        <svg width="16" height="20" viewBox="0 0 16 20"><path d="M1 1l13 8-6 1.4L5 18z" fill="#9b5de5" stroke="#fff" stroke-width="1.2"/></svg>
        <span style="margin-top:14px;background:#9b5de5;color:#fff;font-size:10.5px;font-weight:600;padding:2px 7px;border-radius:9px">Zumanur</span>
      </div>
    </div>
    <div style="width:190px;background:#2c2c2c;border-left:1px solid #1e1e1e;padding:12px;font-size:11px;color:#cfcfcf">
      <div style="color:#fff;font-weight:600;margin-bottom:10px">Book appointment</div>
      <div style="color:#8a8a8a;margin-bottom:6px">Auto layout</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px">${["↔ 14", "↕ 9", "Gap 6", "R 8"].map((t) => `<span style="background:#383838;border-radius:5px;padding:5px 7px">${t}</span>`).join("")}</div>
      <div style="color:#8a8a8a;margin-bottom:6px">Fill</div>
      <div style="display:flex;align-items:center;gap:7px;background:#383838;border-radius:5px;padding:5px 7px;margin-bottom:12px"><span style="width:14px;height:14px;border-radius:3px;background:#0f3d2e"></span>0F3D2E <span style="margin-left:auto;color:#8a8a8a">100%</span></div>
      <div style="color:#8a8a8a;margin-bottom:6px">Text</div>
      <div style="background:#383838;border-radius:5px;padding:5px 7px;margin-bottom:6px">SF Pro · Semibold</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">${["11", "Auto"].map((t) => `<span style="background:#383838;border-radius:5px;padding:5px 7px">${t}</span>`).join("")}</div>
    </div>
  </div>`,
})}
${win({
  x: 760, y: 250, w: 560, h: 320, dark: true, title: "BookButton.tsx — nimbus-web", body: `
  <div style="background:#1e1e1e;height:284px;display:flex">
    <div style="width:44px;background:#252526;border-right:1px solid #191919"></div>
    <div style="flex:1">${code(
      [
        [["import", K], [" { cn } ", P], ["from", K], [' "@/lib/utils"', S], [";", P]],
        [],
        [["export function ", K], ["BookButton", F], ["({ slot }: { slot: ", P], ["Slot", T], [" }) {", P]],
        [["  return", K], [" (", P]],
        [["    <", G], ["button", T], [" className", V], ["=", P], ['"rounded-lg bg-pine px-3.5 py-2.5', S]],
        [['      text-[11px] font-semibold text-white"', S], [">", G]],
        [["      Book ", P], ["{", K], ["slot", V], [".", P], ["time", V], ["}", K]],
        [["    </", G], ["button", T], [">", G]],
        [["  );", P]],
        [["}", P]],
      ],
      { start: 1 },
    )}</div>
  </div>`,
})}
<div style="position:absolute;left:1180px;top:440px;display:flex;align-items:flex-start;gap:2px;z-index:6">
  <svg width="16" height="20" viewBox="0 0 16 20"><path d="M1 1l13 8-6 1.4L5 18z" fill="#2a9d8f" stroke="#fff" stroke-width="1.2"/></svg>
  <span style="margin-top:14px;background:#2a9d8f;color:#fff;font-size:10.5px;font-weight:600;padding:2px 7px;border-radius:9px">Redoy</span>
</div>
${phone({
  x: 1340, y: 40, w: 220, body: `
  <div style="padding:6px 16px 0;font-family:-apple-system,sans-serif">
    <div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:12px;color:#6b7a73">Good morning,</div>${av("Nadia Islam", 26, "#2a7a5a")}</div>
    <div style="font-size:20px;font-weight:700;letter-spacing:-.02em;color:#10241c">Nadia</div>
    <div style="margin-top:10px;border-radius:14px;background:#0f3d2e;color:#fff;padding:12px">
      <div style="font-size:10px;opacity:.7">NEXT APPOINTMENT</div>
      <div style="font-size:14px;font-weight:600;margin-top:3px">Dr. Farhana Akter</div>
      <div style="font-size:11px;opacity:.8">Today · 11:00 AM · Video</div>
      <div style="margin-top:9px;background:#5fe0a0;color:#0f3d2e;text-align:center;border-radius:8px;padding:6px;font-size:11px;font-weight:700">Join call</div>
    </div>
    <div style="font-size:12px;font-weight:600;margin:12px 0 6px;color:#10241c">Your care</div>
    ${[["Prescriptions", "2 active", "file"], ["Lab results", "New · CBC", "chart"], ["Messages", "1 unread", "msg"]]
      .map(([t, s, ic]) => `<div style="display:flex;gap:9px;align-items:center;padding:8px;border-radius:10px;background:#f3f6f4;margin-bottom:6px;color:#10241c"><span style="width:26px;height:26px;border-radius:8px;background:#fff;display:flex;align-items:center;justify-content:center">${icon(ic, 14)}</span><div><div style="font-size:11.5px;font-weight:600">${t}</div><div style="font-size:10px;color:#6b7a73">${s}</div></div></div>`)
      .join("")}
  </div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:62px;border-top:1px solid #eee;display:flex;justify-content:space-around;align-items:center;color:#9aa5a0;background:#fff">${["home", "calendar", "msg", "users"].map((ic, i) => `<span style="${i === 0 ? "color:#0f3d2e" : ""}">${icon(ic, 19)}</span>`).join("")}</div>`,
})}
`,
  }),
};

/* ------------------------------------------------------------------ */
/* Process: project roadmap (home, 4:5)                                */
/* ------------------------------------------------------------------ */
const phases = [
  { n: "Idea & Requirements", st: "Done", dates: "Aug 4 – Aug 15", p: 100, tasks: ["Stakeholder interviews (6)", "User journeys & success metrics"], who: ["Zumanur Rahman", "Sara Ahmed"] },
  { n: "AI-Enhanced Planning", st: "Done", dates: "Aug 18 – Aug 29", p: 100, tasks: ["Effort estimate & roadmap v2", "Architecture decision records"], who: ["Redoy Islam", "Zumanur Rahman"] },
  { n: "Design & Engineering", st: "In progress", dates: "Sep 1 – Oct 17", p: 64, tasks: ["Booking flow — web & iOS", "Doctor availability API"], who: ["Zumanur Rahman", "Redoy Islam"] },
  { n: "Testing & QA", st: "Planned", dates: "Oct 13 – Oct 24", p: 0, tasks: ["E2E suite: booking, payments", "Accessibility audit (WCAG AA)"], who: ["Redoy Islam"] },
  { n: "Launch & Iteration", st: "Planned", dates: "Oct 27 →", p: 0, tasks: ["Staged rollout to 3 clinics", "Weekly metrics review"], who: ["Sara Ahmed", "Zumanur Rahman"] },
];
const stColor = { Done: ["#e7f6ec", "#1f8a4c"], "In progress": ["#fff6cc", "#8a6800"], Planned: ["#f0f0f0", "#666"] };
const process = {
  name: "process",
  width: 800,
  height: 1000,
  html: page({
    width: 800,
    height: 1000,
    bg: backdrop("50%", "40%", 0.18),
    body: win({
      x: 48, y: 60, w: 704, h: 880, url: "projects.designjanala.com/nimbus/roadmap", body: `
  <div style="display:flex;height:844px">
    <div style="width:160px;background:#f7f7f6;border-right:1px solid #ececec;padding:14px 10px;font-size:12px;color:#555">
      <div style="display:flex;align-items:center;gap:7px;font-weight:600;color:#111;margin-bottom:16px"><span style="width:20px;height:20px;border-radius:6px;background:#0f3d2e"></span>Nimbus Health</div>
      ${[["inbox", "Inbox", "3"], ["check", "My issues"], ["layers", "Projects"], ["calendar", "Roadmap", "", true], ["chart", "Insights"]]
        .map(([ic, t, b, on]) => `<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;${on ? "background:#ebebea;color:#111;font-weight:600" : ""}">${icon(ic, 14)}${t}${b ? `<span style="margin-left:auto;font-size:10px;background:#e5e5e5;border-radius:8px;padding:0 6px">${b}</span>` : ""}</div>`)
        .join("")}
      <div style="margin-top:18px;font-size:10.5px;color:#999;padding:0 8px">TEAM</div>
      ${["Zumanur Rahman", "Redoy Islam", "Sara Ahmed"].map((n) => `<div style="display:flex;align-items:center;gap:8px;padding:6px 8px">${av(n, 18)}${n.split(" ")[0]}</div>`).join("")}
    </div>
    <div style="flex:1;padding:20px 22px;overflow:hidden">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div><div style="font-size:11px;color:#888">Projects / Patient app v1</div><div style="font-size:19px;font-weight:650;letter-spacing:-.02em;margin-top:2px">Roadmap</div></div>
        <div style="display:flex;align-items:center;gap:10px"><span style="font-size:11px;color:#666">Target Oct 31</span><span class="pill" style="background:#fff6cc;color:#8a6800">● On track</span></div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin:14px 0 16px"><div style="flex:1;height:6px;border-radius:3px;background:#eee;overflow:hidden"><div style="width:58%;height:100%;background:#111"></div></div><span style="font-size:11px;color:#555;font-weight:600">58%</span></div>
      ${phases
        .map(
          (ph, i) => `
      <div style="border:1px solid #ececec;border-radius:10px;padding:13px 14px;margin-bottom:10px;${ph.st === "In progress" ? `box-shadow:0 0 0 2px ${Y}55;border-color:#e2c200` : ""}">
        <div style="display:flex;align-items:center;gap:10px">
          <span class="mono" style="font-size:11px;color:#999">0${i + 1}</span>
          <span style="font-weight:600;font-size:13.5px">${ph.n}</span>
          <span class="pill" style="background:${stColor[ph.st][0]};color:${stColor[ph.st][1]}">${ph.st}</span>
          <span style="margin-left:auto;font-size:11px;color:#888">${ph.dates}</span>
        </div>
        <div style="margin-top:9px;display:grid;gap:5px">${ph.tasks
          .map((t, j) => {
            const done = ph.st === "Done" || (ph.st === "In progress" && j === 0);
            return `<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:${done ? "#777" : "#222"}"><span style="width:14px;height:14px;border-radius:50%;border:1.5px solid ${done ? "#1f8a4c" : "#c9c9c9"};background:${done ? "#1f8a4c" : "transparent"};display:flex;align-items:center;justify-content:center;color:#fff">${done ? icon("check", 9, "stroke-width:3") : ""}</span><span style="${done ? "text-decoration:line-through" : ""}">${t}</span></div>`;
          })
          .join("")}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:10px">
          <div style="display:flex">${ph.who.map((n, k) => `<span style="margin-left:${k ? -6 : 0}px;border:2px solid #fff;border-radius:50%">${av(n, 20)}</span>`).join("")}</div>
          <div style="flex:1;height:4px;border-radius:2px;background:#f0f0f0;overflow:hidden"><div style="width:${ph.p}%;height:100%;background:${ph.p === 100 ? "#1f8a4c" : "#e2b600"}"></div></div>
          <span style="font-size:10.5px;color:#888;width:28px;text-align:right">${ph.p}%</span>
        </div>
      </div>`,
        )
        .join("")}
    </div>
  </div>`,
    }),
  }),
};

/* ------------------------------------------------------------------ */
/* AI assistant (service group, 4:3)                                   */
/* ------------------------------------------------------------------ */
const serviceAi = {
  name: "service-ai",
  width: 800,
  height: 600,
  html: page({
    width: 800,
    height: 600,
    bg: backdrop("75%", "25%", 0.22),
    body: win({
      x: 40, y: 40, w: 720, h: 520, url: "support.bazaargo.com/assistant", body: `
  <div style="display:flex;height:484px">
    <div style="width:170px;background:#f7f7f5;border-right:1px solid #ececec;padding:12px 10px;font-size:12px;color:#444">
      <div style="display:flex;align-items:center;justify-content:center;gap:6px;border:1px solid #ddd;border-radius:8px;padding:7px;background:#fff;font-weight:600">${icon("plus", 13)}New chat</div>
      <div style="font-size:10.5px;color:#999;margin:14px 4px 6px">TODAY</div>
      ${["Late delivery complaints", "Refund policy draft", "Weekly CSAT summary"].map((t, i) => `<div style="padding:6px 8px;border-radius:6px;${i === 0 ? "background:#ebebe8;color:#111;font-weight:600" : ""};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t}</div>`).join("")}
      <div style="font-size:10.5px;color:#999;margin:14px 4px 6px">CONNECTED</div>
      ${[["Zendesk", "#03363d"], ["Orders DB", "#336791"], ["Shopify", "#5e8e3e"]].map(([t, c]) => `<div style="display:flex;align-items:center;gap:8px;padding:5px 8px"><span style="width:8px;height:8px;border-radius:2px;background:${c}"></span>${t}<span style="margin-left:auto;width:6px;height:6px;border-radius:50%;background:#28c840"></span></div>`).join("")}
    </div>
    <div style="flex:1;display:flex;flex-direction:column;background:#fff">
      <div style="flex:1;padding:18px 22px;overflow:hidden">
        <div style="display:flex;justify-content:flex-end"><div style="background:#f1f1ef;border-radius:14px 14px 4px 14px;padding:9px 13px;font-size:13px;max-width:360px">Which customers complained about late deliveries this week, and what did we promise them?</div></div>
        <div style="display:flex;gap:10px;margin-top:16px">
          <span style="width:26px;height:26px;border-radius:8px;background:#111;color:${Y};display:flex;align-items:center;justify-content:center;flex-shrink:0">${icon("spark", 15)}</span>
          <div style="flex:1;font-size:13px;color:#222">
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
              ${[["search", "Searched Zendesk · 248 tickets"], ["db", "Queried orders · 31 late"], ["check", "Matched 3 customers"]].map(([ic, t]) => `<span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#555;background:#f6f6f4;border:1px solid #ececec;border-radius:6px;padding:3px 8px">${icon(ic, 12)}${t}</span>`).join("")}
            </div>
            <div>Three customers raised late deliveries since Monday:</div>
            <div style="margin-top:8px;border:1px solid #ececec;border-radius:10px;overflow:hidden;font-size:12px">
              ${[["Mina Rahman", "#BG-20418", "3 days late", "Free shipping on next order"], ["Tanvir Hasan", "#BG-20377", "2 days late", "৳500 credit applied"], ["Ava Chen", "#BG-20352", "4 days late", "Refund in progress"]]
                .map(([n, o, d, p], i) => `<div style="display:flex;align-items:center;gap:10px;padding:8px 11px;${i ? "border-top:1px solid #f0f0f0" : ""}">${av(n, 22)}<div style="flex:1"><div style="font-weight:600">${n} <span style="color:#999;font-weight:400" class="mono">${o}</span></div><div style="color:#777;font-size:11px">${p}</div></div><span class="pill" style="background:#fdecec;color:#c0392b">${d}</span></div>`)
                .join("")}
            </div>
            <div style="margin-top:10px;color:#444">All three were promised a follow-up by Friday. Want me to draft the replies?</div>
            <div style="display:flex;gap:6px;margin-top:10px">${["Draft replies", "Export CSV"].map((t, i) => `<span style="font-size:11.5px;font-weight:600;padding:6px 11px;border-radius:7px;${i ? "border:1px solid #ddd" : "background:#111;color:#fff"}">${t}</span>`).join("")}</div>
          </div>
        </div>
      </div>
      <div style="margin:0 18px 16px;border:1px solid #e2e2e0;border-radius:12px;padding:10px 12px;display:flex;align-items:center;gap:10px;color:#999;font-size:13px;box-shadow:0 2px 8px rgba(0,0,0,.04)">Ask about orders, tickets or customers…<span style="margin-left:auto;width:28px;height:28px;border-radius:8px;background:${Y};color:#111;display:flex;align-items:center;justify-content:center">${icon("arrowUp", 15, "stroke-width:2.4")}</span></div>
    </div>
  </div>`,
    }),
  }),
};

/* ------------------------------------------------------------------ */
/* SaaS dashboard (service group, 4:3)                                 */
/* ------------------------------------------------------------------ */
const serviceSaas = {
  name: "service-saas",
  width: 800,
  height: 600,
  html: page({
    width: 800,
    height: 600,
    bg: backdrop("30%", "20%", 0.2),
    body: win({
      x: 40, y: 40, w: 720, h: 520, url: "app.ledgerly.io/overview", body: `
  <div style="display:flex;height:484px;background:#fafafa">
    <div style="width:150px;background:#fff;border-right:1px solid #eee;padding:14px 10px;font-size:12px;color:#555">
      <div style="display:flex;align-items:center;gap:7px;font-weight:700;color:#111;margin:0 4px 16px"><span style="width:18px;height:18px;border-radius:5px;background:linear-gradient(135deg,#5b8def,#9b5de5)"></span>Ledgerly</div>
      ${[["home", "Overview", 1], ["chart", "Revenue"], ["users", "Customers"], ["file", "Invoices"], ["zap", "Automations"], ["settings", "Settings"]]
        .map(([ic, t, on]) => `<div style="display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:7px;${on ? "background:#f1f1f0;color:#111;font-weight:600" : ""}">${icon(ic, 14)}${t}</div>`)
        .join("")}
    </div>
    <div style="flex:1;padding:16px 18px;overflow:hidden">
      <div style="display:flex;align-items:center;justify-content:space-between"><div style="font-size:17px;font-weight:650;letter-spacing:-.02em">Overview</div><div style="display:flex;gap:6px;font-size:11px">${["7d", "30d", "12m"].map((t, i) => `<span style="padding:4px 9px;border-radius:6px;${i === 2 ? "background:#111;color:#fff" : "border:1px solid #e3e3e3;color:#555"}">${t}</span>`).join("")}</div></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px">
        ${[["MRR", "$48,210", "+12.4%"], ["Active customers", "1,284", "+3.1%"], ["Net churn", "1.8%", "−0.4 pt"]]
          .map(([l, v, d]) => `<div style="background:#fff;border:1px solid #eee;border-radius:10px;padding:11px 12px"><div style="font-size:11px;color:#777">${l}</div><div style="font-size:21px;font-weight:650;letter-spacing:-.02em;margin-top:3px">${v}</div><div style="font-size:11px;color:#1f8a4c;font-weight:600;margin-top:1px">${d} <span style="color:#999;font-weight:400">vs last year</span></div></div>`)
          .join("")}
      </div>
      <div style="background:#fff;border:1px solid #eee;border-radius:10px;padding:12px 14px 8px;margin-top:10px">
        <div style="display:flex;justify-content:space-between;font-size:12px"><b>Revenue</b><span style="color:#777">Jan – Dec 2026</span></div>
        <div style="position:relative;margin-top:10px;height:130px">
          ${[0, 1, 2, 3].map((i) => `<div style="position:absolute;left:0;right:0;top:${i * 43}px;border-top:1px dashed #eee"></div>`).join("")}
          <div style="position:absolute;inset:0">${chart([0.18, 0.22, 0.2, 0.31, 0.36, 0.34, 0.45, 0.52, 0.5, 0.63, 0.71, 0.82], 508, 130, { stroke: "#5b8def", fill: "rgba(91,141,239,.10)" })}</div>
          <div style="position:absolute;left:383px;top:6px;background:#111;color:#fff;font-size:10.5px;padding:4px 7px;border-radius:6px">Sep · $41.9k</div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;color:#999;margin-top:4px">${"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ").map((m) => `<span>${m}</span>`).join("")}</div>
      </div>
      <div style="background:#fff;border:1px solid #eee;border-radius:10px;margin-top:10px;font-size:12px;overflow:hidden">
        <div style="display:flex;padding:8px 12px;color:#888;font-size:11px;border-bottom:1px solid #f2f2f2"><span style="flex:1">Top accounts</span><span style="width:80px">Plan</span><span style="width:70px;text-align:right">MRR</span></div>
        ${[["Nimbus Health", "Scale", "$4,800"], ["Orbit Labs", "Growth", "$2,150"]]
          .map(([n, p, m]) => `<div style="display:flex;align-items:center;padding:8px 12px;border-top:1px solid #f5f5f5"><span style="flex:1;display:flex;align-items:center;gap:8px;font-weight:600">${av(n, 20)}${n}</span><span style="width:80px;color:#555">${p}</span><span style="width:70px;text-align:right;font-weight:600">${m}</span></div>`)
          .join("")}
      </div>
    </div>
  </div>`,
    }),
  }),
};

/* ------------------------------------------------------------------ */
/* Mobile app: shop + checkout (service group, 4:3)                    */
/* ------------------------------------------------------------------ */
const product = (emoji, bg, name, price, w = 92) =>
  `<div style="width:${w}px"><div style="height:${w}px;border-radius:14px;background:${bg};display:flex;align-items:center;justify-content:center;font-size:${Math.round(w * 0.5)}px">${emoji}</div><div style="font-size:11px;font-weight:600;margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div><div style="font-size:11px;color:#777">${price}</div></div>`;
const serviceMobile = {
  name: "service-mobile",
  width: 800,
  height: 600,
  html: page({
    width: 800,
    height: 600,
    bg: backdrop("50%", "35%", 0.26),
    body: `
${phone({
  x: 160, y: 40, w: 238, rotate: -5, body: `
  <div style="padding:2px 16px">
    <div style="display:flex;align-items:center;justify-content:space-between"><div style="font-size:21px;font-weight:700;letter-spacing:-.02em">Discover</div><span style="position:relative">${icon("cart", 20)}<span style="position:absolute;top:-5px;right:-6px;background:${Y};color:#111;font-size:9px;font-weight:700;border-radius:8px;padding:0 4px">2</span></span></div>
    <div style="display:flex;align-items:center;gap:7px;background:#f2f2f0;border-radius:10px;padding:7px 10px;margin-top:9px;color:#999;font-size:12px">${icon("search", 13)}Search Bazaar Go</div>
    <div style="margin-top:11px;border-radius:14px;background:#111;color:#fff;padding:12px;position:relative;overflow:hidden">
      <div style="font-size:10px;color:${Y};font-weight:700;letter-spacing:.06em">PUJA SALE</div><div style="font-size:15px;font-weight:700;margin-top:2px;line-height:1.15">Up to 40% off<br>new arrivals</div>
      <div style="position:absolute;right:-6px;bottom:-14px;font-size:58px">🛍️</div>
    </div>
    <div style="display:flex;gap:6px;margin:11px 0 9px;font-size:11px">${["All", "Shoes", "Audio", "Watches"].map((t, i) => `<span style="padding:4px 9px;border-radius:12px;${i === 0 ? "background:#111;color:#fff" : "background:#f2f2f0"}">${t}</span>`).join("")}</div>
    <div style="display:flex;gap:10px">${product("👟", "#f4e3d7", "Runner Pro", "৳ 6,450", 96)}${product("🎧", "#dfe8f5", "Studio Buds", "৳ 4,200", 96)}</div>
    <div style="display:flex;gap:10px;margin-top:9px">${product("⌚", "#e6efe2", "Fit Watch 2", "৳ 8,990", 96)}${product("🧢", "#f6eccb", "Club Cap", "৳ 950", 96)}</div>
  </div>`,
})}
${phone({
  x: 420, y: 70, w: 238, rotate: 5, body: `
  <div style="padding:2px 16px">
    <div style="display:flex;align-items:center;gap:8px;font-size:16px;font-weight:700"><span style="color:#999">‹</span>Checkout</div>
    ${[["👟", "#f4e3d7", "Runner Pro", "Size 42 · White", "৳ 6,450"], ["🎧", "#dfe8f5", "Studio Buds", "Midnight", "৳ 4,200"]]
      .map(([e, bg, n, v, p]) => `<div style="display:flex;gap:10px;align-items:center;margin-top:12px"><div style="width:52px;height:52px;border-radius:12px;background:${bg};display:flex;align-items:center;justify-content:center;font-size:28px">${e}</div><div style="flex:1"><div style="font-size:12.5px;font-weight:600">${n}</div><div style="font-size:11px;color:#888">${v}</div></div><div style="font-size:12px;font-weight:600">${p}</div></div>`)
      .join("")}
    <div style="margin-top:14px;border-radius:12px;background:#f6f6f4;padding:10px 12px;font-size:11.5px">
      <div style="display:flex;align-items:center;gap:6px;font-weight:600">${icon("pin", 13)}Deliver to</div><div style="color:#666;margin-top:2px">House 12, Road 7, Dhanmondi, Dhaka</div>
    </div>
    <div style="margin-top:12px;font-size:12px">${[["Subtotal", "৳ 10,650"], ["Delivery", "৳ 60"], ["Puja discount", "− ৳ 1,065"]].map(([l, v]) => `<div style="display:flex;justify-content:space-between;padding:3px 0;color:#555"><span>${l}</span><span>${v}</span></div>`).join("")}
      <div style="display:flex;justify-content:space-between;padding:7px 0 0;margin-top:5px;border-top:1px solid #eee;font-weight:700;font-size:14px"><span>Total</span><span>৳ 9,645</span></div></div>
    <div style="margin-top:12px;display:flex;gap:6px">${["bKash", "Card", "Cash"].map((t, i) => `<span style="flex:1;text-align:center;font-size:11px;font-weight:600;padding:7px 0;border-radius:9px;${i === 0 ? "border:1.5px solid #e2136e;color:#e2136e;background:#fdeef5" : "border:1px solid #e3e3e3;color:#555"}">${t}</span>`).join("")}</div>
    <div style="margin-top:12px;background:#111;color:#fff;border-radius:12px;padding:12px;text-align:center;font-weight:700;font-size:13px">Place order · ৳ 9,645</div>
  </div>`,
})}
`,
  }),
};

/* ------------------------------------------------------------------ */
/* Brand system board (service group, 4:3)                             */
/* ------------------------------------------------------------------ */
const swatch = (hex, name, light = false) =>
  `<div style="flex:1"><div style="height:58px;border-radius:9px;background:${hex};${light ? "box-shadow:0 0 0 1px #e5e5e5 inset" : ""}"></div><div style="font-size:11px;font-weight:600;margin-top:5px">${name}</div><div class="mono" style="font-size:10px;color:#888">${hex.toUpperCase()}</div></div>`;
const serviceDesign = {
  name: "service-design",
  width: 800,
  height: 600,
  html: page({
    width: 800,
    height: 600,
    bg: backdrop("25%", "30%", 0.22),
    body: win({
      x: 40, y: 40, w: 720, h: 520, dark: true, title: "Nimbus — Brand Guidelines", body: `
  <div style="height:484px;background:#1e1e1e;padding:22px;position:relative">
    <div style="position:absolute;left:22px;top:6px;font-size:10.5px;color:#9a9a9a">Brand board</div>
    <div style="display:grid;grid-template-columns:1.05fr 1fr;gap:14px;height:100%;padding-top:10px">
      <div style="display:grid;grid-template-rows:1.1fr 1fr;gap:14px">
        <div style="background:#0f3d2e;border-radius:12px;position:relative;display:flex;align-items:center;justify-content:center;gap:14px;color:#fff">
          <span style="width:54px;height:54px;border-radius:16px;background:#5fe0a0;display:flex;align-items:center;justify-content:center"><span style="width:22px;height:22px;border-radius:7px;background:#0f3d2e"></span></span>
          <span style="font-size:44px;font-weight:700;letter-spacing:-.04em">nimbus</span>
          <span style="position:absolute;left:12px;bottom:10px;font-size:10px;opacity:.6">Primary logo · on Pine</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
          <div style="background:#fbfaf7;border-radius:12px;display:flex;align-items:center;justify-content:center;gap:7px;color:#0f3d2e;font-weight:700;font-size:22px;letter-spacing:-.03em"><span style="width:22px;height:22px;border-radius:7px;background:#0f3d2e"></span>nimbus</div>
          <div style="background:#5fe0a0;border-radius:12px;display:flex;align-items:center;justify-content:center"><span style="width:46px;height:46px;border-radius:14px;background:#0f3d2e;display:flex;align-items:center;justify-content:center"><span style="width:18px;height:18px;border-radius:6px;background:#5fe0a0"></span></span></div>
        </div>
      </div>
      <div style="background:#fff;border-radius:12px;padding:16px;color:#111">
        <div style="font-size:10.5px;color:#888;letter-spacing:.06em">TYPOGRAPHY</div>
        <div style="display:flex;align-items:baseline;gap:12px;margin-top:6px"><span style="font-family:'Avenir Next',sans-serif;font-size:64px;font-weight:700;letter-spacing:-.03em;line-height:1">Aa</span><div><div style="font-family:'Avenir Next';font-weight:600;font-size:14px">Avenir Next</div><div style="font-size:11px;color:#888">Display · Bold / Demi</div></div></div>
        <div style="font-family:'Avenir Next';font-size:20px;font-weight:700;letter-spacing:-.02em;margin-top:10px;line-height:1.1">Care that fits your day.</div>
        <div style="font-size:11.5px;color:#555;margin-top:4px">SF Pro Text · Regular 13/20 — Book a verified doctor in minutes.</div>
        <div style="font-size:10.5px;color:#888;letter-spacing:.06em;margin-top:16px">COLOUR</div>
        <div style="display:flex;gap:8px;margin-top:6px">${swatch("#0f3d2e", "Pine")}${swatch("#5fe0a0", "Mint")}${swatch("#fbfaf7", "Paper", true)}${swatch("#10241c", "Ink")}</div>
        <div style="font-size:10.5px;color:#888;letter-spacing:.06em;margin-top:16px">COMPONENTS</div>
        <div style="display:flex;gap:8px;margin-top:6px;align-items:center"><span style="background:#0f3d2e;color:#fff;font-size:11px;font-weight:600;padding:8px 12px;border-radius:8px">Book appointment</span><span style="border:1px solid #cfd8d3;font-size:11px;font-weight:600;padding:8px 12px;border-radius:8px;color:#10241c">How it works</span><span class="pill" style="background:#e3f7ec;color:#0f3d2e">● Online</span></div>
      </div>
    </div>
  </div>`,
    }),
  }),
};

/* ------------------------------------------------------------------ */
/* Culture slides (16:9). Content sits on the right; copy covers the left. */
/* ------------------------------------------------------------------ */
const cultureBg = backdrop("78%", "40%", 0.2);

const cultureCraft = {
  name: "culture-craft",
  width: 1600,
  height: 900,
  html: page({
    width: 1600,
    height: 900,
    bg: cultureBg,
    body: win({
      x: 760, y: 110, w: 800, h: 680, dark: true, title: "Nimbus — Components", style: "transform:scale(.86);transform-origin:100% 50%", body: `
  <div style="display:flex;height:644px">
    <div style="flex:1;position:relative;background:#1e1e1e;background-image:linear-gradient(#262626 1px,transparent 1px),linear-gradient(90deg,#262626 1px,transparent 1px);background-size:12px 12px;overflow:hidden">
      <div style="position:absolute;left:24px;top:16px;font-size:11px;color:#9a9a9a">Doctor card / Default · 400%</div>
      <div style="position:absolute;left:70px;top:110px;width:440px;background:#fff;border-radius:22px;padding:24px;box-shadow:0 10px 30px rgba(0,0,0,.3)">
        <div style="display:flex;gap:16px;align-items:center">${av("Farhana Akter", 64, "#2a7a5a")}<div><div style="font-size:22px;font-weight:650;color:#10241c">Dr. Farhana Akter</div><div style="font-size:15px;color:#6b7a73">General physician · 12 yrs</div></div></div>
        <div style="display:flex;gap:12px;margin-top:22px">${["10:30", "11:00", "11:30"].map((t, i) => `<span style="flex:1;text-align:center;font-size:17px;padding:13px 0;border-radius:12px;${i === 1 ? "background:#0f3d2e;color:#fff" : "background:#f1f5f3;color:#10241c"}">${t}</span>`).join("")}</div>
      </div>
      <!-- redlines -->
      <div style="position:absolute;left:70px;top:94px;width:24px;border-top:1.5px solid #ff4d6d"></div>
      <div style="position:absolute;left:94px;top:110px;height:24px;border-left:1.5px solid #ff4d6d"></div>
      <div class="mono" style="position:absolute;left:100px;top:112px;background:#ff4d6d;color:#fff;font-size:11px;padding:1px 5px;border-radius:3px">24</div>
      <div style="position:absolute;left:94px;top:222px;height:22px;border-left:1.5px solid #ff4d6d"></div>
      <div class="mono" style="position:absolute;left:100px;top:224px;background:#ff4d6d;color:#fff;font-size:11px;padding:1px 5px;border-radius:3px">22</div>
      <div style="position:absolute;left:236px;top:244px;width:131px;height:47px;border:1.5px solid ${FIGMA_BLUE}"></div>
      ${[[236, 244], [367, 244], [236, 291], [367, 291]].map(([x, y]) => `<div style="position:absolute;left:${x - 3}px;top:${y - 3}px;width:7px;height:7px;background:#fff;border:1.5px solid ${FIGMA_BLUE}"></div>`).join("")}
      <div class="mono" style="position:absolute;left:268px;top:300px;background:${FIGMA_BLUE};color:#fff;font-size:11px;padding:1px 6px;border-radius:3px">Slot / Selected · 131 × 47</div>
      <div style="position:absolute;left:70px;top:390px;display:flex;gap:16px">${["Default", "Hover", "Selected", "Disabled"].map((t, i) => `<div style="text-align:center"><span style="display:block;width:98px;padding:11px 0;border-radius:11px;font-size:15px;${["background:#f1f5f3;color:#10241c", "background:#e2ece7;color:#10241c", "background:#0f3d2e;color:#fff", "background:#f1f5f3;color:#b5c0bb"][i]}">11:00</span><span style="display:block;font-size:11px;color:#9a9a9a;margin-top:6px">${t}</span></div>`).join("")}</div>
      <div style="position:absolute;left:62px;top:378px;width:460px;height:84px;border:1.5px dashed #9b5de5;border-radius:6px"></div>
      <div style="position:absolute;left:62px;top:356px;font-size:11px;color:#c8a6ff">◇ Slot · 4 variants</div>
    </div>
    <div style="width:210px;background:#2c2c2c;border-left:1px solid #1e1e1e;padding:14px;font-size:11.5px;color:#cfcfcf">
      <div style="color:#fff;font-weight:600;margin-bottom:12px">Slot / Selected</div>
      <div style="color:#8a8a8a;margin-bottom:6px">Auto layout</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:14px">${["↔ 0", "↕ 13", "W Fill", "H Hug"].map((t) => `<span style="background:#383838;border-radius:5px;padding:5px 7px">${t}</span>`).join("")}</div>
      <div style="color:#8a8a8a;margin-bottom:6px">Radius</div><div style="background:#383838;border-radius:5px;padding:5px 7px;margin-bottom:14px">12</div>
      <div style="color:#8a8a8a;margin-bottom:6px">Fill</div>
      <div style="display:flex;align-items:center;gap:7px;background:#383838;border-radius:5px;padding:5px 7px;margin-bottom:14px"><span style="width:14px;height:14px;border-radius:3px;background:#0f3d2e"></span>color/pine</div>
      <div style="color:#8a8a8a;margin-bottom:6px">Text style</div><div style="background:#383838;border-radius:5px;padding:5px 7px;margin-bottom:14px">body/medium · 15/20</div>
      <div style="color:#8a8a8a;margin-bottom:6px">Contrast</div><div style="display:flex;align-items:center;gap:7px;background:#383838;border-radius:5px;padding:5px 7px"><span style="color:#5fe0a0">AAA</span> 11.9 : 1</div>
    </div>
  </div>`,
    }),
  }),
};

const cultureLearning = {
  name: "culture-learning",
  width: 1600,
  height: 900,
  html: page({
    width: 1600,
    height: 900,
    bg: cultureBg,
    body: win({
      x: 760, y: 170, w: 800, h: 560, url: "learn.designjanala.com/design-systems", style: "transform:scale(.86);transform-origin:100% 50%", body: `
  <div style="display:flex;height:524px;background:#fafaf8">
    <div style="flex:1;padding:22px">
      <div style="font-size:11px;color:#888">Team learning · Week 6 of 8</div>
      <div style="font-size:22px;font-weight:650;letter-spacing:-.02em;margin-top:2px">Design Systems in Practice</div>
      <div style="margin-top:14px;border-radius:12px;overflow:hidden;background:#0d0d0d;position:relative;height:300px">
        <div style="position:absolute;inset:0;padding:30px 34px;color:#fff">
          <div class="mono" style="font-size:11px;color:${Y}">06 · TOKENS</div>
          <div style="font-size:34px;font-weight:700;letter-spacing:-.03em;line-height:1.05;margin-top:10px">Tokens before<br>components.</div>
          <div style="display:flex;gap:10px;margin-top:22px">${[["color/pine", "#0f3d2e"], ["color/mint", "#5fe0a0"], ["radius/md", "12"], ["space/4", "16"]].map(([t, v]) => `<span class="mono" style="font-size:11px;background:#1d1d1d;border:1px solid #333;border-radius:6px;padding:6px 8px">${t} <span style="color:#888">${v}</span></span>`).join("")}</div>
        </div>
        <div style="position:absolute;left:0;right:0;bottom:0;padding:12px 16px;background:linear-gradient(transparent,rgba(0,0,0,.8));display:flex;align-items:center;gap:12px;color:#fff;font-size:11px">${icon("play", 14, "fill:#fff;stroke:none")}<span>14:32 / 22:10</span><div style="flex:1;height:4px;border-radius:2px;background:rgba(255,255,255,.25)"><div style="width:66%;height:100%;border-radius:2px;background:${Y}"></div></div><span>1.25×</span></div>
      </div>
      <div style="display:flex;gap:10px;margin-top:14px">
        <div style="flex:1;background:#fff;border:1px solid #ececec;border-radius:10px;padding:12px">
          <div style="font-size:12px;font-weight:600">Notes</div>
          <div style="font-size:12px;color:#555;margin-top:6px;line-height:1.5">• Name tokens by role, not value<br>• One source → Figma + Tailwind<br>• Audit contrast at the token level</div>
        </div>
        <div style="width:180px;background:#fff;border:1px solid #ececec;border-radius:10px;padding:12px">
          <div style="font-size:12px;font-weight:600">Team progress</div>
          ${[["Zumanur Rahman", 100], ["Redoy Islam", 75], ["Sara Ahmed", 62]].map(([n, p]) => `<div style="display:flex;align-items:center;gap:7px;margin-top:8px">${av(n, 18)}<div style="flex:1;height:4px;border-radius:2px;background:#eee"><div style="width:${p}%;height:100%;border-radius:2px;background:#111"></div></div><span style="font-size:10px;color:#888">${p}%</span></div>`).join("")}
        </div>
      </div>
    </div>
    <div style="width:240px;border-left:1px solid #ececec;background:#fff;padding:18px 14px">
      <div style="font-size:12px;font-weight:600;margin-bottom:10px">Chapters</div>
      ${["Why systems fail", "Auditing what exists", "Naming & structure", "Foundations: type & colour", "Spacing and layout", "Tokens before components", "Components & variants", "Docs your team reads"]
        .map((t, i) => {
          const st = i < 5 ? "done" : i === 5 ? "now" : "next";
          return `<div style="display:flex;gap:9px;align-items:center;padding:8px 6px;border-radius:7px;font-size:12px;${st === "now" ? "background:#fff6cc;font-weight:600" : ""};color:${st === "next" ? "#999" : "#222"}"><span style="width:18px;height:18px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;${st === "done" ? "background:#111;color:#fff" : st === "now" ? `background:${Y};color:#111` : "border:1.5px solid #d5d5d5"}">${st === "done" ? icon("check", 10, "stroke-width:3") : st === "now" ? icon("play", 8, "fill:#111;stroke:none") : ""}</span>${t}</div>`;
        })
        .join("")}
    </div>
  </div>`,
    }),
  }),
};

const sticky = (x, y, w, bg, text, who, rot = 0) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;min-height:${w * 0.9}px;background:${bg};border-radius:4px;padding:12px;font-size:13px;line-height:1.35;color:#222;box-shadow:0 8px 16px -6px rgba(0,0,0,.25);transform:rotate(${rot}deg)">${text}<div style="margin-top:10px;display:flex;align-items:center;gap:5px;font-size:10px;color:#555">${av(who, 16)}${who.split(" ")[0]}</div></div>`;
const cursor = (x, y, name, c) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;display:flex;align-items:flex-start;gap:2px;z-index:4"><svg width="18" height="22" viewBox="0 0 16 20"><path d="M1 1l13 8-6 1.4L5 18z" fill="${c}" stroke="#fff" stroke-width="1.2"/></svg><span style="margin-top:15px;background:${c};color:#fff;font-size:11px;font-weight:600;padding:2px 8px;border-radius:10px">${name}</span></div>`;
const cultureCollaboration = {
  name: "culture-collaboration",
  width: 1600,
  height: 900,
  html: page({
    width: 1600,
    height: 900,
    bg: cultureBg,
    body: win({
      x: 760, y: 110, w: 800, h: 680, title: "Nimbus · Kickoff board", style: "transform:scale(.86);transform-origin:100% 50%", body: `
  <div style="position:relative;height:644px;background:#f4f3ef;background-image:radial-gradient(#d9d7d0 1px,transparent 1.2px);background-size:22px 22px;overflow:hidden">
    <div style="position:absolute;left:28px;top:22px;font-size:20px;font-weight:700;letter-spacing:-.02em">Kickoff · Patient app v1</div>
    <div style="position:absolute;left:28px;top:50px;font-size:12px;color:#777">Thu, Aug 7 · Zumanur, Redoy, Sara (Nimbus)</div>
    <div style="position:absolute;right:20px;top:20px;display:flex">${["Zumanur Rahman", "Redoy Islam", "Sara Ahmed"].map((n, k) => `<span style="margin-left:${k ? -8 : 0}px;border:2px solid #f4f3ef;border-radius:50%">${av(n, 28)}</span>`).join("")}</div>
    ${["Problems", "Ideas", "Decisions"].map((t, i) => `<div style="position:absolute;left:${28 + i * 250}px;top:92px;font-size:11px;font-weight:700;letter-spacing:.08em;color:#666">${t.toUpperCase()}</div>`).join("")}
    ${sticky(28, 118, 150, "#ffe58f", "34% drop off at the insurance step", "Sara Ahmed", -2)}
    ${sticky(70, 290, 150, "#ffe58f", "Patients can't find past prescriptions", "Sara Ahmed", 2)}
    ${sticky(278, 118, 150, "#b9f0d0", "Let patients skip insurance and add it later", "Zumanur Rahman", 1.5)}
    ${sticky(318, 290, 150, "#b9f0d0", "Records tab with search + PDF export", "Redoy Islam", -1.5)}
    ${sticky(528, 118, 160, "#c9dcff", "v1 ships Oct 31 to 3 clinics", "Sara Ahmed", -1)}
    ${sticky(548, 300, 160, "#c9dcff", "bKash + card in v1, insurance in v1.1", "Zumanur Rahman", 2)}
    <svg style="position:absolute;left:0;top:0" width="800" height="644"><path d="M180 175 C 230 175, 240 170, 276 168" fill="none" stroke="#999" stroke-width="1.6" stroke-dasharray="5 5"/><path d="M430 170 C 480 170, 490 165, 526 160" fill="none" stroke="#999" stroke-width="1.6" stroke-dasharray="5 5"/></svg>
    <div style="position:absolute;left:440px;top:420px;width:300px;background:#fff;border-radius:12px;box-shadow:0 12px 30px -8px rgba(0,0,0,.25);padding:12px 14px;font-size:12.5px">
      <div style="display:flex;gap:8px">${av("Sara Ahmed", 24)}<div><b>Sara</b> <span style="color:#999;font-size:11px">2m</span><div style="color:#333;margin-top:2px">Can we keep the doctor card from the old app? Patients love it.</div></div></div>
      <div style="display:flex;gap:8px;margin-top:10px;padding-top:10px;border-top:1px solid #f0f0f0">${av("Zumanur Rahman", 24)}<div><b>Zumanur</b> <span style="color:#999;font-size:11px">now</span><div style="color:#333;margin-top:2px">Yes, refreshed with the new slot picker 👍</div></div></div>
    </div>
    ${cursor(232, 390, "Zumanur", "#9b5de5")}
    ${cursor(620, 250, "Redoy", "#2a9d8f")}
    ${cursor(250, 520, "Sara · Nimbus", "#e07a5f")}
    <div style="position:absolute;left:50%;bottom:16px;transform:translateX(-50%);display:flex;gap:4px;background:#fff;border-radius:12px;padding:6px;box-shadow:0 6px 20px -6px rgba(0,0,0,.25)">${["pen", "type", "frame", "msg", "plus"].map((ic, i) => `<span style="width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;${i === 0 ? "background:#111;color:#fff" : "color:#444"}">${icon(ic, 16)}</span>`).join("")}</div>
  </div>`,
    }),
  }),
};

const cultureOwnership = {
  name: "culture-ownership",
  width: 1600,
  height: 900,
  html: page({
    width: 1600,
    height: 900,
    bg: cultureBg,
    body: win({
      x: 760, y: 160, w: 800, h: 580, url: "deploy.designjanala.com/nimbus-web", style: "transform:scale(.86);transform-origin:100% 50%", body: `
  <div style="height:544px;background:#fff;padding:22px 24px;overflow:hidden">
    <div style="display:flex;align-items:center;gap:10px"><span style="width:28px;height:28px;border-radius:8px;background:#0f3d2e"></span><div><div style="font-size:18px;font-weight:650;letter-spacing:-.02em">nimbus-web</div><div style="font-size:11.5px;color:#888">nimbushealth.com.bd · main</div></div><span class="pill" style="margin-left:auto;background:#e7f6ec;color:#1f8a4c">● Production · Ready</span></div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:18px">
      ${[["Uptime · 30d", "99.98%"], ["p95 response", "182 ms"], ["Errors · 24h", "0.02%"], ["Lighthouse", "98"]].map(([l, v]) => `<div style="border:1px solid #eee;border-radius:10px;padding:11px 12px"><div style="font-size:11px;color:#888">${l}</div><div style="font-size:20px;font-weight:650;letter-spacing:-.02em;margin-top:2px">${v}</div></div>`).join("")}
    </div>
    <div style="margin-top:14px;border:1px solid #eee;border-radius:10px;padding:12px 14px">
      <div style="display:flex;justify-content:space-between;font-size:12px"><b>Availability</b><span style="color:#888">Last 30 days</span></div>
      <div style="display:flex;gap:3px;margin-top:10px">${Array.from({ length: 30 }, (_, i) => `<span style="flex:1;height:28px;border-radius:3px;background:${i === 17 ? "#f2c94c" : "#3cba6f"}"></span>`).join("")}</div>
    </div>
    <div style="margin-top:14px;font-size:12px;font-weight:600">Deployments</div>
    <div style="margin-top:8px;border:1px solid #eee;border-radius:10px;overflow:hidden;font-size:12px">
      ${[["Ready", "Add skip-insurance path to booking", "Redoy Islam", "a41c9e2", "2m ago", "48s", "Production"], ["Ready", "Records tab: search + PDF export", "Redoy Islam", "7be0d13", "3h ago", "51s", "Production"], ["Ready", "Slot picker: selected & disabled states", "Zumanur Rahman", "c09f5aa", "Yesterday", "46s", "Preview"], ["Ready", "bKash checkout behind feature flag", "Redoy Islam", "19ad2c4", "Yesterday", "55s", "Preview"]]
        .map(([st, msg, who, sha, when, dur, env], i) => `<div style="display:flex;align-items:center;gap:12px;padding:10px 12px;${i ? "border-top:1px solid #f3f3f3" : ""}"><span style="width:8px;height:8px;border-radius:50%;background:#3cba6f"></span><div style="flex:1;min-width:0"><div style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${msg}</div><div style="color:#888;font-size:11px;display:flex;align-items:center;gap:6px;margin-top:1px">${icon("git", 11)}<span class="mono">${sha}</span> · ${who.split(" ")[0]}</div></div><span class="pill" style="background:${env === "Production" ? "#111" : "#f2f2f2"};color:${env === "Production" ? "#fff" : "#555"}">${env}</span><span style="width:46px;color:#888;text-align:right">${dur}</span><span style="width:70px;color:#888;text-align:right">${when}</span></div>`)
        .join("")}
    </div>
    <div style="display:flex;gap:8px;margin-top:14px">${["Type check", "Unit tests · 214", "E2E · 38", "Accessibility"].map((t) => `<span style="display:inline-flex;align-items:center;gap:5px;font-size:11.5px;border:1px solid #e6e6e6;border-radius:7px;padding:5px 9px"><span style="color:#1f8a4c">${icon("check", 12, "stroke-width:2.6")}</span>${t}</span>`).join("")}</div>
  </div>`,
    }),
  }),
};

/* ------------------------------------------------------------------ */
/* About: design → code (4:5)                                          */
/* ------------------------------------------------------------------ */
const designToCode = {
  name: "design-to-code",
  width: 800,
  height: 1000,
  html: page({
    width: 800,
    height: 1000,
    bg: backdrop("50%", "50%", 0.22),
    body: `
${win({
  x: 60, y: 60, w: 680, h: 430, dark: true, title: "Nimbus — Dev Mode", body: `
  <div style="display:flex;height:394px">
    <div style="flex:1;background:#1e1e1e;position:relative;display:flex;align-items:center;justify-content:center">
      <div style="background:#fbfaf7;border-radius:14px;padding:20px;width:300px">
        <div style="font-size:11px;color:#2a7a5a;font-weight:600;letter-spacing:.06em">NEXT AVAILABLE</div>
        <div style="font-size:17px;font-weight:650;color:#10241c;margin-top:4px">Today, 11:00 AM</div>
        <div style="position:relative;margin-top:14px"><span style="display:block;background:#0f3d2e;color:#fff;font-size:13px;font-weight:600;padding:11px 0;text-align:center;border-radius:9px">Book appointment</span>
          <div style="position:absolute;inset:-4px;border:1.5px solid ${FIGMA_BLUE};border-radius:11px"></div>
          <div class="mono" style="position:absolute;left:50%;transform:translateX(-50%);top:48px;background:${FIGMA_BLUE};color:#fff;font-size:10px;padding:1px 6px;border-radius:3px;white-space:nowrap">260 × 42</div>
        </div>
      </div>
    </div>
    <div style="width:240px;background:#2c2c2c;border-left:1px solid #1e1e1e;padding:14px;font-size:11.5px;color:#cfcfcf">
      <div style="display:flex;justify-content:space-between;color:#fff;font-weight:600;margin-bottom:12px"><span>BookButton</span><span style="color:#5fe0a0;font-size:10px">● Ready for dev</span></div>
      <div style="display:flex;gap:6px;margin-bottom:10px;font-size:11px">${["CSS", "Tailwind", "iOS"].map((t, i) => `<span style="padding:3px 8px;border-radius:5px;${i === 1 ? "background:#444;color:#fff" : "color:#9a9a9a"}">${t}</span>`).join("")}</div>
      <div class="mono" style="background:#1e1e1e;border-radius:6px;padding:10px;font-size:11px;line-height:1.7;color:#d4d4d4">w-full rounded-[9px]<br>bg-pine py-[11px]<br>text-[13px] font-semibold<br>text-white</div>
      <div style="color:#8a8a8a;margin:12px 0 6px">Tokens</div>
      ${[["#0f3d2e", "color/pine"], ["#ffffff", "color/on-pine"]].map(([c, t]) => `<div style="display:flex;align-items:center;gap:7px;padding:4px 0"><span style="width:14px;height:14px;border-radius:3px;background:${c};box-shadow:0 0 0 1px #555"></span>${t}</div>`).join("")}
      <div style="display:flex;align-items:center;gap:7px;padding:4px 0">${icon("type", 13)}body/semibold-13</div>
    </div>
  </div>`,
})}
<div style="position:absolute;left:380px;top:505px;width:40px;height:70px;display:flex;flex-direction:column;align-items:center">
  <svg width="40" height="70" viewBox="0 0 40 70"><path d="M20 2v58M8 48l12 14 12-14" fill="none" stroke="${Y}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
</div>
${win({
  x: 60, y: 590, w: 680, h: 350, dark: true, title: "BookButton.tsx — nimbus-web", body: `
  <div style="background:#1e1e1e;height:314px">${code(
    [
      [["import", K], [" type", K], [" { Slot } ", P], ["from", K], [' "@/lib/slots"', S], [";", P]],
      [],
      [["export function ", K], ["BookButton", F], ["({ slot, onBook }: ", P], ["Props", T], [") {", P]],
      [["  return", K], [" (", P]],
      [["    <", G], ["button", T], [" onClick", V], ["={() => ", P], ["onBook", F], ["(slot)}", P]],
      [["      className", V], ["=", P], ['"w-full rounded-[9px] bg-pine py-[11px]', S]],
      [['        text-[13px] font-semibold text-white"', S], [">", G]],
      [["      Book appointment", P]],
      [["    </", G], ["button", T], [">", G]],
      [["  );", P]],
      [["}", P]],
    ],
    { size: 13, lh: 22 },
  )}</div>`,
})}`,
  }),
};

/* ------------------------------------------------------------------ */
/* Career cards (5:3)                                                  */
/* ------------------------------------------------------------------ */
const careerOnline = {
  name: "career-online",
  width: 600,
  height: 360,
  html: page({
    width: 600,
    height: 360,
    bg: backdrop("30%", "30%", 0.2),
    body: win({
      x: 24, y: 24, w: 552, h: 312, url: "youtube.com/@designjanala", body: `
  <div style="display:flex;gap:12px;padding:12px;height:276px;background:#fff">
    <div style="flex:1">
      <div style="border-radius:10px;overflow:hidden;background:#0d0d0d;position:relative;height:186px;color:#fff">
        <div style="position:absolute;left:18px;top:16px"><div class="mono" style="font-size:9px;color:${Y}">LESSON 02</div><div style="font-size:21px;font-weight:700;letter-spacing:-.02em;line-height:1.05;margin-top:4px">Typography &amp;<br>hierarchy</div></div>
        <div style="position:absolute;right:16px;top:12px;font-family:Georgia,serif;font-size:84px;line-height:1;color:#f5f5f5">Aa</div>
        <div style="position:absolute;left:18px;bottom:30px;display:flex;gap:6px;align-items:flex-end">${[30, 22, 16, 12].map((s) => `<span style="font-weight:700;font-size:${s}px;line-height:1">H</span>`).join("")}</div>
        <div style="position:absolute;left:0;right:0;bottom:0;padding:7px 10px;background:linear-gradient(transparent,rgba(0,0,0,.85));display:flex;align-items:center;gap:8px;font-size:9.5px">${icon("play", 10, "fill:#fff;stroke:none")}<span>8:14 / 18:40</span><div style="flex:1;height:3px;background:rgba(255,255,255,.3);border-radius:2px"><div style="width:44%;height:100%;background:#ff0033;border-radius:2px"></div></div></div>
      </div>
      <div style="font-size:12.5px;font-weight:600;margin-top:8px;line-height:1.3">Lesson 2 · Typography &amp; hierarchy — Graphic Design in Bangla</div>
      <div style="display:flex;align-items:center;gap:6px;margin-top:6px;font-size:10.5px;color:#666"><span style="width:20px;height:20px;border-radius:50%;background:#111;display:inline-flex;align-items:center;justify-content:center;color:${Y};font-weight:700;font-size:9px">DJ</span>DesignJanala Classroom · 48K views</div>
    </div>
    <div style="width:170px;font-size:10.5px">
      ${["Colour theory basics", "Typography & hierarchy", "Grids and layout", "Logo design process"].map((t, i) => `<div style="display:flex;gap:7px;padding:5px;border-radius:7px;${i === 1 ? "background:#f2f2f2" : ""}"><div style="width:58px;height:34px;border-radius:5px;flex-shrink:0;background:${["#2b2b2b", "#0d0d0d", "#1f3b33", "#3a2a12"][i]};color:${Y};font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center" class="mono">0${i + 1}</div><div style="line-height:1.25"><div style="font-weight:600;color:#111">${t}</div><div style="color:#888;font-size:9.5px;margin-top:2px">${["14:20", "18:40", "21:05", "25:12"][i]}</div></div></div>`).join("")}
    </div>
  </div>`,
    }),
  }),
};

const careerOffline = {
  name: "career-offline",
  width: 600,
  height: 360,
  html: page({
    width: 600,
    height: 360,
    bg: backdrop("60%", "30%", 0.2),
    body: win({
      x: 24, y: 24, w: 552, h: 312, title: "Offline batch · Dhanmondi", body: `
  <div style="height:276px;background:#fff;padding:12px 14px">
    <div style="display:flex;align-items:center;justify-content:space-between"><div><div style="font-size:14px;font-weight:650">Graphic Design · Batch 14</div><div style="font-size:10.5px;color:#888;display:flex;align-items:center;gap:4px;margin-top:1px">${icon("pin", 11)}Road 7, Dhanmondi, Dhaka · 12 seats</div></div><span class="pill" style="background:#fff6cc;color:#8a6800">3 seats left</span></div>
    <div style="display:grid;grid-template-columns:44px repeat(4,1fr);gap:4px;margin-top:10px;font-size:10px">
      <span></span>${["Sat", "Sun", "Mon", "Tue"].map((d, i) => `<span style="text-align:center;color:#888;font-weight:600">${d} <span style="color:#bbb">${1 + i}</span></span>`).join("")}
      ${["5 PM", "6 PM", "7 PM", "8 PM"].map((t, r) => `<span style="color:#aaa;text-align:right;padding-right:4px;height:38px">${t}</span>${[0, 1, 2, 3].map((c) => {
        const cls = { "0-1": ["Layout & grids", "#111", "#fff"], "1-1": ["Type lab", "#fff6cc", "#5c4600"], "2-2": ["Brand identity", "#111", "#fff"], "3-1": ["Portfolio review", "#e7f6ec", "#1f6b3c"] }[`${c}-${r}`];
        return cls ? `<span style="border-radius:6px;background:${cls[1]};color:${cls[2]};padding:5px 6px;font-weight:600;line-height:1.2">${cls[0]}<br><span style="font-weight:400;opacity:.7">Room 2</span></span>` : `<span style="border-top:1px dashed #eee"></span>`;
      }).join("")}`).join("")}
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-top:8px;font-size:10.5px;color:#666"><div style="display:flex">${["Zumanur Rahman", "Nusrat Jahan", "Arif Hossain"].map((n, k) => `<span style="margin-left:${k ? -6 : 0}px;border:2px solid #fff;border-radius:50%">${av(n, 20)}</span>`).join("")}</div>Mentors: Zumanur + 2 designers</div>
  </div>`,
    }),
  }),
};

const careerCv = {
  name: "career-cv",
  width: 600,
  height: 360,
  html: page({
    width: 600,
    height: 360,
    bg: backdrop("40%", "50%", 0.18),
    body: win({
      x: 24, y: 24, w: 552, h: 312, title: "New Message", body: `
  <div style="height:276px;background:#fff;font-size:12px">
    ${[["To:", `<span style="background:#eef3ff;color:#2a56c6;border-radius:5px;padding:1px 6px">career@designjanala.com</span>`], ["Subject:", "<b>Application — UI/UX Designer</b>"]].map(([l, v]) => `<div style="display:flex;gap:8px;padding:8px 14px;border-bottom:1px solid #f0f0f0"><span style="color:#999;width:52px">${l}</span>${v}</div>`).join("")}
    <div style="padding:10px 14px;color:#333;line-height:1.5">Hi DesignJanala team,<br><br>I'm a product designer with 3 years of experience in fintech and health apps. My CV and recent case studies are attached — I'd love to talk about the UI/UX role.<br><br>Best,<br>Ayesha Rahman</div>
    <div style="display:flex;gap:8px;padding:0 14px">
      <span style="display:flex;align-items:center;gap:8px;border:1px solid #e6e6e6;border-radius:8px;padding:6px 10px"><span style="width:22px;height:26px;border-radius:3px;background:#e5484d;color:#fff;font-size:7px;font-weight:700;display:flex;align-items:flex-end;justify-content:center;padding-bottom:3px">PDF</span><span><b style="font-size:11px">CV_Ayesha_Rahman.pdf</b><br><span style="color:#999;font-size:10px">1.2 MB</span></span></span>
      <span style="display:flex;align-items:center;gap:8px;border:1px solid #e6e6e6;border-radius:8px;padding:6px 10px">${icon("globe", 18)}<span><b style="font-size:11px">Portfolio</b><br><span style="color:#999;font-size:10px">6 case studies</span></span></span>
      <span style="margin-left:auto;align-self:center;display:flex;align-items:center;gap:6px;background:#111;color:#fff;border-radius:8px;padding:8px 14px;font-weight:600">${icon("send", 13)}Send</span>
    </div>
  </div>`,
    }),
  }),
};

export const scenes = [
  studio,
  process,
  serviceAi,
  serviceSaas,
  serviceMobile,
  serviceDesign,
  cultureCraft,
  cultureLearning,
  cultureCollaboration,
  cultureOwnership,
  designToCode,
  careerOnline,
  careerOffline,
  careerCv,
];
