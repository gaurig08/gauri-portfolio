import { useEffect, useState } from "react";
import {
  links, stats, featured, projects, skills, certs, notes, ribbon, wins, clubs, reviews,
} from "./data.js";
import { GithubIcon, LinkedinIcon, MailIcon, ArrowIcon, SunIcon, MoonIcon } from "./icons.jsx";

const BASE = import.meta.env.BASE_URL;

const chapters = [
  { id: "cover", label: "Cover" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

/* ───────────── hooks ───────────── */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("gg-theme");
      if (saved) return saved;
    } catch { /* ignore */ }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("gg-theme", theme); } catch { /* ignore */ }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

// Gentle scroll parallax for elements with data-speed.
function useParallax() {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce), (max-width: 960px)").matches) return;
    const els = [...document.querySelectorAll("[data-speed]")];
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        const r = el.parentElement.getBoundingClientRect();
        const raw = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.speed);
        const off = Math.max(-36, Math.min(36, raw));
        el.style.setProperty("--py", `${off.toFixed(1)}px`);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
}

function useActiveChapter() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let idx = 0;
      chapters.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.offsetTop <= y) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

function useTypewriter(lines, speed = 38, pause = 1700) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let line = 0, i = 0, deleting = false, t;
    const tick = () => {
      const full = lines[line];
      if (!deleting) {
        i++;
        setOut(full.slice(0, i));
        if (i === full.length) { deleting = true; t = setTimeout(tick, pause); return; }
      } else {
        i--;
        setOut(full.slice(0, i));
        if (i === 0) { deleting = false; line = (line + 1) % lines.length; }
      }
      t = setTimeout(tick, deleting ? speed / 2 : speed);
    };
    t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, [lines, speed, pause]);
  return out;
}

function useTabTitle() {
  useEffect(() => {
    const base = "Gauri Gohad";
    const away = ["psst… chapter 2 is waiting ✦", "come back, the pipeline misses you", "to be continued… ✦"];
    let n = 0;
    const onVis = () => { document.title = document.hidden ? away[n++ % away.length] : base; };
    document.title = base;
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
}

/* ───────────── app ───────────── */

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const active = useActiveChapter();
  useReveal();
  useParallax();
  useTabTitle();

  return (
    <>
      <Nav active={active} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <div className="wrap"><Cover /></div>
        <Ribbon />
        <div className="wrap">
          <About />
          <Projects />
        </div>
        <Skills />
        <div className="wrap"><Achievements /></div>
        <Reviews />
        <div className="wrap"><Contact /></div>
      </main>
      <footer className="footer">
        <span>Designed & built by Gauri Gohad · © 2026</span>
        <span className="hand">to be continued…</span>
      </footer>
    </>
  );
}

/* ───────────── small pieces ───────────── */

function Nav({ active, theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <a href="#cover" className="nav-logo" aria-label="Gauri Gohad, back to top">
        <span className="logo-box">GG</span>
      </a>
      <nav className={`nav-links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        {chapters.slice(1).map((c, i) => (
          <a key={c.id} href={`#${c.id}`} className={active === i + 1 ? "on" : ""}>{c.label}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="icon-btn" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
        <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
          <span className="burger" data-open={open} />
        </button>
      </div>
      <div className="progress" style={{ transform: `scaleX(${(active + 1) / chapters.length})` }} />
    </header>
  );
}

// Hand-drawn mark that draws itself when its parent .reveal comes into view.
function Scribble({ children, kind = "underline" }) {
  const paths = {
    underline: "M3 14 C 40 6, 90 18, 140 9 S 196 10, 197 12",
    marker: "M2 10 C 50 8, 120 12, 198 9",
    zigzag: "M3 12 L 20 5 L 36 14 L 54 5 L 70 14 L 88 5 L 104 14 L 122 5 L 138 14 L 156 5 L 172 14 L 197 7",
  };
  return (
    <span className={`scribble s-${kind}`}>
      {children}
      <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
        <path d={paths[kind]} pathLength="1" />
      </svg>
    </span>
  );
}

function SectionHead({ no, title, note }) {
  return (
    <div className="shead reveal">
      <span className="hand shead-no">chapter {no} ↘</span>
      <h2>{title}</h2>
      {note && <p className="kicker">{note}</p>}
    </div>
  );
}

/* ───────────── cover ───────────── */

const bubbleLines = [
  "Hi, I'm Gauri. I build things with data.",
  "Pipelines, web apps and ML models.",
  "Currently: 4th year, class of 2027.",
  "Also: probably mid-way through a series.",
];

function Cover() {
  const typed = useTypewriter(bubbleLines);
  return (
    <section id="cover" className="cover">
      <div className="cover-grid">
        <div className="cover-text">
          <div className="vol-badge mono">VOL. 04 · THE 4TH-YEAR ARC</div>
          <h1 className="cover-title">
            <span className="t1"><span className="letters">Gauri</span></span>
            <span className="t2">Gohad<span className="ink-dot">.</span></span>
          </h1>
          <p className="cover-sub">
            <b>4th-year B.Tech CSE (Big Data Analytics)</b> student at SRMIST. I build data pipelines,
            full-stack apps and ML models, and I like clean schemas, honest metrics and a good plot twist.
          </p>
          <div className="cover-cta">
            <a className="btn btn-ink" href="#projects">See my projects <ArrowIcon /></a>
            <a className="btn btn-ghost" href="#contact">Get in touch</a>
          </div>
          <div className="socials">
            <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href={`mailto:${links.email}`} aria-label="Email"><MailIcon /></a>
          </div>
        </div>

        <div className="cover-art">
          <div className="speedlines" aria-hidden="true" />
          <div className="avatar-panel">
            <img src={`${BASE}profile.webp`} alt="Illustrated portrait of Gauri" width="420" height="420" fetchpriority="high" />
          </div>
          <div className="bubble" role="status" aria-live="polite">
            <span>{typed}</span><span className="caret">▍</span>
          </div>
          <span className="hand art-note" aria-hidden="true">that's me ↙</span>
        </div>
      </div>

      <dl className="stat-line">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="mono">{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Ribbon() {
  const items = [...ribbon, ...ribbon, ...ribbon, ...ribbon];
  return (
    <div className="ribbon" aria-hidden="true">
      <div className="ribbon-track">
        {items.map((t, i) => <span key={i}>{t} <b>✦</b></span>)}
      </div>
    </div>
  );
}

/* ───────────── about ───────────── */

function About() {
  return (
    <section id="about" className="section about">
      <span className="hand shead-no reveal">chapter 01 ↘</span>
      <p className="statement reveal">
        I'm Gauri, a 4th-year CSE student who turns messy data into <Scribble>clean pipelines</Scribble>,
        builds <Scribble kind="marker">full-stack apps</Scribble> and trains <Scribble kind="zigzag">ML models</Scribble> I
        can actually explain.
      </p>
      <div className="notes">
        {notes.map((n, i) => (
          <article key={n.title} className={`note note-${n.color} reveal`} style={{ "--d": `${i * 120}ms`, "--tilt": `${[-4, 3, -2][i]}deg` }}>
            <span className="tape" aria-hidden="true" />
            <h3 className="hand">{n.title}</h3>
            <p>{n.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ───────────── projects ───────────── */

function Projects() {
  const f = featured;
  return (
    <section id="projects" className="section">
      <SectionHead no="02" title="Things I've built" note="Six projects. Every one links to its code." />

      <article className="prow featured reveal">
        <div className="prow-visual">
          <a className="polaroid big" href={f.live} target="_blank" rel="noreferrer" aria-label="Open GeekShelf live" data-speed="-0.06">
            <span className="tape" aria-hidden="true" />
            <img src={`${BASE}${f.image}`} alt="GeekShelf's illustrated cozy-room home screen" loading="lazy" width="1400" height="788" />
            <span className="live-pill mono"><i /> LIVE</span>
          </a>
          <img className="sticker-logo" src={`${BASE}${f.logo}`} alt="" width="84" height="84" loading="lazy" />
          <span className="hand pnote">my favourite one ↑</span>
        </div>
        <div className="prow-text">
          <span className="pnum" aria-hidden="true">01</span>
          <span className="kind mono">{f.kind}</span>
          <h3>{f.title}</h3>
          <p className="question">{f.tagline}</p>
          <ul className="points">{f.points.map((p) => <li key={p}>{p}</li>)}</ul>
          <p className="stack mono">{f.stack.join(" · ")}</p>
          <div className="card-links">
            <a className="btn btn-ink btn-sm" href={f.live} target="_blank" rel="noreferrer">Open the app <ArrowIcon /></a>
            <a className="text-link" href={f.git} target="_blank" rel="noreferrer">View code <ArrowIcon /></a>
          </div>
        </div>
      </article>

      {projects.map((p, i) => (
        <article key={p.id} className={`prow reveal ${i % 2 === 0 ? "flip" : ""}`}>
          <div className="prow-visual">
            <div className="polaroid" data-speed={i % 2 ? "-0.05" : "0.05"} style={{ "--tilt": `${[3, -3, 2, -2, 3][i]}deg` }}>
              <span className="tape" aria-hidden="true" />
              <ProjectVisual c={p.cover} />
            </div>
          </div>
          <div className="prow-text">
            <span className="pnum" aria-hidden="true">{String(i + 2).padStart(2, "0")}</span>
            <span className="kind mono">{p.kind}</span>
            <h3>{p.title}</h3>
            <p className="question">{p.question}</p>
            <ul className="points">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="stack mono">{p.stack.join(" · ")}</p>
            <a className="text-link" href={p.git} target="_blank" rel="noreferrer">View code <ArrowIcon /></a>
          </div>
        </article>
      ))}
    </section>
  );
}

function ProjectVisual({ c }) {
  if (c.type === "image") {
    return <div className="pv pv-img"><img src={`${BASE}${c.src}`} alt={c.alt} loading="lazy" width="720" height="480" /></div>;
  }
  if (c.type === "ratio") {
    const pct = Math.round((c.part / c.whole) * 100);
    return (
      <div className="pv">
        <div className="big">{c.part.toLocaleString("en-IN")}<span> / {c.whole.toLocaleString("en-IN")}</span></div>
        <div className="ratio" role="img" aria-label={`${c.part} of ${c.whole} shows, ${pct}%`}><span style={{ width: `${pct}%` }} /></div>
        <div className="cap mono">{c.partLabel} · {pct}% of {c.wholeLabel}</div>
      </div>
    );
  }
  if (c.type === "risk") {
    return (
      <div className="pv">
        <div className="cap mono">{c.total.toLocaleString("en-IN")} district-years by risk level</div>
        <div className="risk" role="img" aria-label={c.parts.map((p) => `${p.label} ${p.n}`).join(", ")}>
          {c.parts.map((p, i) => <span key={p.label} className={`r${i}`} style={{ flexGrow: p.n }} title={`${p.label}: ${p.n.toLocaleString("en-IN")}`} />)}
        </div>
        <div className="risk-legend mono">
          {c.parts.map((p, i) => <span key={p.label}><i className={`r${i}`} />{p.label} {Math.round((p.n / c.total) * 100)}%</span>)}
        </div>
      </div>
    );
  }
  if (c.type === "formula") {
    return (
      <div className="pv">
        <div className="formula mono"><span>today's move</span><span className="over">stock's normal daily range</span></div>
        <div className="cap mono">= relative move, e.g. <b>2.4×</b> normal</div>
      </div>
    );
  }
  if (c.type === "dims") {
    return (
      <div className="pv">
        <div className="big">{c.from}<span className="arrow"> → </span>{c.to}</div>
        <div className="cap mono">features after PCA · {c.note}</div>
      </div>
    );
  }
  return null;
}

/* ───────────── skills ───────────── */

function Skills() {
  const all = skills.flatMap((g) => g.items);
  const unique = [...new Set(all)];
  const half = Math.ceil(unique.length / 2);
  const rowA = unique.slice(0, half), rowB = unique.slice(half);
  return (
    <section id="skills" className="skills">
      <div className="wrap">
        <SectionHead no="03" title="My toolbox" note="Everything here shows up in the projects above." />
      </div>
      <ul className="sr-only">{unique.map((s) => <li key={s}>{s}</li>)}</ul>
      <div className="sk-row" aria-hidden="true">
        <div className="sk-track">{[...rowA, ...rowA, ...rowA].map((s, i) => <span key={i} className="sticker" style={{ "--r": `${((i * 37) % 7) - 3}deg` }}>{s}</span>)}</div>
      </div>
      <div className="sk-row rev" aria-hidden="true">
        <div className="sk-track">{[...rowB, ...rowB, ...rowB].map((s, i) => <span key={i} className="sticker alt" style={{ "--r": `${((i * 53) % 7) - 3}deg` }}>{s}</span>)}</div>
      </div>
    </section>
  );
}

/* ───────────── achievements ───────────── */

function Achievements() {
  return (
    <section id="achievements" className="section">
      <SectionHead no="04" title="Badges & battles" />
      <div className="stamps">
        {certs.map((c, i) => (
          <figure key={c.short} className="stamp reveal" style={{ "--d": `${i * 100}ms`, "--tilt": `${[-8, 5, -3, 7][i]}deg` }} title={c.title}>
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id={`circ${i}`} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs>
              <circle cx="100" cy="100" r="96" className="st-outer" />
              <circle cx="100" cy="100" r="58" className="st-inner" />
              <text className="st-ring"><textPath href={`#circ${i}`} textLength="458" lengthAdjust="spacing">{c.by}</textPath></text>
            </svg>
            <figcaption>
              <b>{c.short}</b>
              <span className="mono">certified</span>
            </figcaption>
            <span className="sr-only">{c.title}</span>
          </figure>
        ))}
      </div>

      <div className="battles reveal">
        <div>
          <h3 className="hand">hackathons</h3>
          <ul>{wins.map((w) => <li key={w.detail}><b>{w.title}</b> · {w.detail}</li>)}</ul>
        </div>
        <div>
          <h3 className="hand">clubs</h3>
          <ul>{clubs.map((c) => <li key={c.org}><b>{c.title}</b> · {c.org}</li>)}</ul>
          <h3 className="hand">practice</h3>
          <ul>
            <li><a href={links.leetcode} target="_blank" rel="noreferrer"><b>LeetCode</b></a> · DSA in Java</li>
            <li><a href={links.codechef} target="_blank" rel="noreferrer"><b>CodeChef</b></a> · competitive programming</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────── reviews ───────────── */

function Reviews() {
  const row = [...reviews, ...reviews];
  return (
    <section className="reviews-sec" aria-label="Fake reviews, just for fun">
      <div className="wrap">
        <div className="reviews-head reveal">
          <h2 className="small-h">What the side characters say</h2>
          <span className="hand">(fake, for fun)</span>
        </div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {row.map((r, i) => (
            <figure key={i} className="review" aria-hidden={i >= reviews.length} style={{ "--r": `${[-1.5, 1, -0.5, 1.5, -1, 0.5][i % 6]}deg` }}>
              <div className="stars" aria-label={`${r.stars} stars`}>{"★".repeat(r.stars)}<span>{"★".repeat(5 - r.stars)}</span></div>
              <blockquote>“{r.text}”</blockquote>
              <figcaption><b>{r.who}</b> <span className="mono">· {r.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── contact ───────────── */

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(links.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };
  return (
    <section id="contact" className="section contact">
      <span className="hand shead-no reveal">chapter 05 ↘</span>
      <h2 className="contact-title reveal">Let's make the<br /><span>next chapter.</span></h2>
      <p className="kicker reveal">Open to internships and full-time roles, graduating 2027.</p>
      <div className="mail-row reveal">
        <a className="big-mail" href={`mailto:${links.email}`}>{links.email}</a>
        <button className="copy-btn mono" onClick={copy}>{copied ? "copied ✓" : "copy"}</button>
      </div>
      <div className="contact-links reveal">
        <a href={links.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon /> LinkedIn</a>
        <a href={links.github} target="_blank" rel="noreferrer"><GithubIcon /> GitHub</a>
      </div>
      <span className="hand contact-note" aria-hidden="true">say hi, I don't bite ✦</span>
    </section>
  );
}
