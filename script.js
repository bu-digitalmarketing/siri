/* ══════════════════════════════════════════════════════════
   Personal Profile — renders everything from data.js
   ══════════════════════════════════════════════════════════ */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* escape text that goes into innerHTML */
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ── 1. simple text bindings ───────────────────────────── */
$$("[data-bind]").forEach((el) => { el.textContent = profile[el.dataset.bind] || ""; });
document.title = `${profile.name} — Personal Profile`;

/* ── 2. avatar ─────────────────────────────────────────── */
if (profile.photo) {
  const img = new Image();
  img.src = profile.photo;
  img.alt = profile.name;
  img.onload = () => { $("#avatar").innerHTML = ""; $("#avatar").appendChild(img); };
} else {
  const src = profile.name || profile.nameAlt;
  $("#avatarInitials").textContent = src.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

/* ── 3. about + stats ──────────────────────────────────── */
$("#aboutText").innerHTML = (profile.about || []).map((p) => `<p>${esc(p)}</p>`).join("");
$("#stats").innerHTML = (profile.stats || [])
  .map((s) => `<li><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join("");

/* ── 4. skills ─────────────────────────────────────────── */
$("#skills-grid").innerHTML = (profile.skills || []).map((g) => `
  <article class="skill-card reveal">
    <h3>${esc(g.group)}</h3>
    <ul class="chips">${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
  </article>`).join("");

/* ── 5. timeline ───────────────────────────────────────── */
$("#timeline").innerHTML = (profile.timeline || []).map((t) => `
  <li class="reveal">
    <div class="period">${esc(t.period)}</div>
    <h3>${esc(t.title)}</h3>
    <p class="org">${esc(t.org)}</p>
    <p class="desc">${esc(t.desc)}</p>
  </li>`).join("");

/* ── 6. projects ───────────────────────────────────────── */
$("#projects").innerHTML = (profile.projects || []).map((p) => `
  <article class="card reveal">
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.desc)}</p>
    <ul class="chips">${(p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    ${p.link ? `<a class="card__link" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer">View project →</a>` : ""}
  </article>`).join("");

/* ── 7. contact ────────────────────────────────────────── */
const CONTACT_META = {
  email:     { icon: "✉️", label: "Email",     href: (v) => `mailto:${v}` },
  phone:     { icon: "📞", label: "Phone",     href: (v) => `tel:${v.replace(/[^\d+]/g, "")}` },
  facebook:  { icon: "📘", label: "Facebook",  href: (v) => v },
  instagram: { icon: "📸", label: "Instagram", href: (v) => v },
  line:      { icon: "💬", label: "LINE",      href: (v) => (/^https?:/.test(v) ? v : `https://line.me/ti/p/~${v}`) },
  github:    { icon: "💻", label: "GitHub",    href: (v) => v },
  linkedin:  { icon: "🔗", label: "LinkedIn",  href: (v) => v },
};

const prettyValue = (v) => v.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

$("#contact-list").innerHTML = Object.entries(profile.contact || {})
  .filter(([k, v]) => v && CONTACT_META[k])
  .map(([k, v]) => {
    const m = CONTACT_META[k];
    const ext = /^https?:/.test(m.href(v));
    return `<a class="reveal" href="${esc(m.href(v))}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>
      <span class="ico" aria-hidden="true">${m.icon}</span>
      <span class="meta"><span class="k">${esc(m.label)}</span><span class="v">${esc(prettyValue(v))}</span></span>
    </a>`;
  }).join("");

/* ── 8. footer year ────────────────────────────────────── */
$("#year").textContent = new Date().getFullYear();

/* ── 9. theme toggle ───────────────────────────────────── */
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch (_) { /* private mode / blocked storage */ }

$("#themeToggle").addEventListener("click", () => {
  // พื้นดำคือค่าเริ่มต้น — ไม่มี data-theme หรือ data-theme="dark" ถือว่ามืด
  const isDark = root.dataset.theme !== "light";
  root.dataset.theme = isDark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (_) {}
});

/* ── 10. mobile menu ───────────────────────────────────── */
const burger = $("#burger");
const links  = $(".nav__links");

burger.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }
});

/* ── 11. reveal on scroll ──────────────────────────────── */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  });
}, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

$$(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  io.observe(el);
});

/* ── 12. sticky nav shadow + active link ───────────────── */
const nav      = $("#nav");
const navLinks = $$(".nav__links a");
const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);

const onScroll = () => {
  nav.classList.toggle("is-stuck", window.scrollY > 8);

  let current = "";
  const line = window.scrollY + 100;
  sections.forEach((s) => { if (s.offsetTop <= line) current = `#${s.id}`; });
  navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === current));
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ── 13. ทุ่งดาวพื้นหลัง ─────────────────────────────────
   ดาว 3 ชั้นเลื่อนคนละความเร็วให้เกิดมิติ + ดาวตกเป็นครั้งคราว
   ปิดเองเมื่อ: ผู้ใช้ตั้งค่าลดการเคลื่อนไหว / สลับเป็นโหมดสว่าง / แท็บถูกซ่อน
   ───────────────────────────────────────────────────── */
(() => {
  const cv = $("#stars");
  if (!cv || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = cv.getContext("2d", { alpha: true });
  const rand = (a, b) => a + Math.random() * (b - a);
  const TAU = Math.PI * 2;

  const LAYERS = [
    { count: 90, speed: .012, size: [.5, 1.0], alpha: [.22, .50] }, // ไกลสุด
    { count: 52, speed: .030, size: [.8, 1.6], alpha: [.38, .78] },
    { count: 18, speed: .058, size: [1.2, 2.2], alpha: [.58, 1.0] }, // ใกล้สุด
  ];

  let w = 0, h = 0, dpr = 1, stars = [], shot = null, cleared = false;

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = cv.width  = Math.floor(innerWidth  * dpr);
    h = cv.height = Math.floor(innerHeight * dpr);
    cv.style.width  = innerWidth  + "px";
    cv.style.height = innerHeight + "px";

    stars = [];
    for (const L of LAYERS) {
      for (let i = 0; i < L.count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: rand(L.size[0], L.size[1]) * dpr,
          a: rand(L.alpha[0], L.alpha[1]),
          v: L.speed * dpr,
          tw: rand(.004, .016),          // จังหวะกะพริบ
          ph: Math.random() * TAU,
        });
      }
    }
  }

  function spawnShot() {
    if (shot || Math.random() > .0022) return;
    shot = {
      x: rand(w * .08, w * .92), y: rand(0, h * .42),
      vx: rand(3.2, 5.4) * dpr, vy: rand(1.3, 2.3) * dpr,
      len: rand(90, 190) * dpr, life: 1,
    };
  }

  function frame() {
    requestAnimationFrame(frame);

    // โหมดสว่าง: ล้างครั้งเดียวแล้วหยุดวาด ไม่กิน CPU ฟรี ๆ
    if (root.dataset.theme === "light") {
      if (!cleared) { ctx.clearRect(0, 0, w, h); cleared = true; }
      return;
    }
    cleared = false;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#cfe6ff";
    for (const s of stars) {
      s.ph += s.tw;
      s.y  += s.v;
      if (s.y > h + 2) { s.y = -2; s.x = Math.random() * w; }
      ctx.globalAlpha = s.a * (.62 + .38 * Math.sin(s.ph));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, TAU);
      ctx.fill();
    }

    spawnShot();
    if (shot) {
      const k = shot.len / Math.hypot(shot.vx, shot.vy);
      const tx = shot.x - shot.vx * k, ty = shot.y - shot.vy * k;
      const g = ctx.createLinearGradient(shot.x, shot.y, tx, ty);
      g.addColorStop(0, "rgba(180,235,255," + shot.life + ")");
      g.addColorStop(1, "rgba(180,235,255,0)");
      ctx.globalAlpha = 1;
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.8 * dpr;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(shot.x, shot.y);
      ctx.stroke();

      shot.x += shot.vx; shot.y += shot.vy; shot.life -= .012;
      if (shot.life <= 0 || shot.x > w + 40 || shot.y > h + 40) shot = null;
    }
    ctx.globalAlpha = 1;
  }

  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 180);
  });

  build();
  requestAnimationFrame(frame);
})();
