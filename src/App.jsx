import { useEffect, useRef, useState } from 'react'
import { links, intro, featured, projects, skills, certifications } from './data.js'
import { startCity } from './scenes/city.js'
import { startSky } from './scenes/sky.js'
import { startDragon } from './scenes/dragonFlight.js'
import { prefersReducedMotion } from './scenes/util.js'

const reduce = prefersReducedMotion()

function currentTheme() {
  const t = document.documentElement.dataset.theme
  if (t) return t
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState(currentTheme)
  const heroRef = useRef(null), cityRef = useRef(null), skyRef = useRef(null), dragonRef = useRef(null)
  const scenes = useRef({})

  // background scenes: start once, stop on unmount
  useEffect(() => {
    const city = startCity(cityRef.current, heroRef.current, reduce)
    const sky = startSky(skyRef.current, reduce)
    const dragon = reduce ? () => {} : startDragon(dragonRef.current)
    scenes.current = { city, sky }
    return () => { city(); sky(); dragon() }
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('gg-theme', next) } catch { /* private mode: just don't remember */ }
    setTheme(next)
    scenes.current.city?.redraw(); scenes.current.sky?.redraw()
  }

  useReveal()

  return (
    <>
      <canvas className="city" ref={cityRef} aria-hidden="true" />
      <canvas className="sky" ref={skyRef} aria-hidden="true" />
      <canvas className="dragon" ref={dragonRef} aria-hidden="true" />

      <div className="wrap">
        <a className="skip" href="#work">Skip to projects</a>
        <header className="top">
          <a className="logo" href="#top" aria-label="Gauri Gohad, back to top"><span className="logo-box">GG</span></a>
          <nav aria-label="Main">
            <a href="#work">Projects</a>
            <a className="hide-sm" href="#skills">Skills</a>
            <a href="#contact">Contact</a>
            <ThemeButton theme={theme} onClick={toggleTheme} />
          </nav>
        </header>

        <main>
          <section className="hero" id="top" ref={heroRef}>
            <div>
              <Name first="Gauri" last="Gohad" />
              <p className="lede rv" style={{ '--d': '300ms' }}>{intro}</p>
              <div className="meta rv" style={{ '--d': '450ms' }}>
                <a className="pill" href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                <a className="pill" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a className="pill" href="#contact">Say hello</a>
              </div>
            </div>
            <div className="avatar rv" style={{ '--d': '200ms' }}>
              <div className="frame"><img src="profile.webp" alt="Anime-style illustrated portrait of Gauri" width="420" height="420" /></div>
            </div>
          </section>

          <section className="sec" id="work">
            <div className="sec-h rv"><h2>Projects</h2><span className="mono">{String(projects.length + 1).padStart(2, '0')} projects</span></div>
            <ol className="work">
              <li className="rv"><Featured p={featured} /></li>
              {projects.map((p, i) => <li className="rv" key={p.name}><ProjectRow p={p} n={i + 2} /></li>)}
            </ol>
          </section>

          <section className="sec" id="skills">
            <div className="sec-h rv"><h2>Skills</h2><span className="mono">used in the projects above</span></div>
            <div className="skills">
              {skills.map(([title, list], i) => (
                <div className="sk rv" key={title} style={{ '--d': `${(i % 3) * 60}ms` }}><h4>{title}</h4><p>{list}</p></div>
              ))}
            </div>
            <div className="certs rv">
              <h4>Certifications</h4>
              <div className="cert-list">
                <span className="cert aws"><StarIcon />{certifications.highlight}</span>
                {certifications.coursera.map((c) => <span className="cert" key={c}><span className="src">Coursera ·</span> {c}</span>)}
              </div>
            </div>
          </section>

          <Contact />
        </main>

        <footer>
          <span>deployed on vercel</span>
          <span>designed &amp; built by gauri · 2026</span>
        </footer>
      </div>
    </>
  )
}

function ThemeButton({ theme, onClick }) {
  return (
    <button className="theme" type="button" onClick={onClick} aria-label={theme === 'dark' ? 'Switch to day' : 'Switch to night'}>
      <svg className="sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" fill="currentColor" />
        <g className="rays"><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" /></g>
      </svg>
      <svg className="moon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" /><circle cx="19" cy="4.5" r=".9" /><circle cx="21.5" cy="8" r=".6" />
      </svg>
    </button>
  )
}

// the name "decodes" from random characters on load
function Name({ first, last }) {
  return (
    <h1>
      <span>{first}</span>{' '}
      <span className="em">{last}</span>
    </h1>
  )
}

function Featured({ p }) {
  return (
    <a className="feat" href={p.url} target="_blank" rel="noreferrer">
      <span className="img">
        <img src={p.image} alt={p.imageAlt} width="1400" height="788" loading="lazy" />
        <span className="tag"><i />{p.tag}</span>
      </span>
      <span className="body">
        <span className="k">{p.kicker}</span>
        <h3>{p.name}</h3>
        <p>{p.text}</p>
        <span className="shelves">{p.shelves.map((s) => <span key={s}>{s}</span>)}</span>
        <span className="stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</span>
      </span>
    </a>
  )
}

function ProjectRow({ p, n }) {
  return (
    <a className="row" href={p.url} target="_blank" rel="noreferrer">
      <span className="n">{String(n).padStart(2, '0')}</span>
      <h3>{p.name}<small>{p.label}</small></h3>
      <span className="desc">
        {p.text}
        <span className="stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</span>
        {p.image && <img className="thumb" src={p.image} alt={p.imageAlt} width="720" height="480" loading="lazy" />}
      </span>
      <span className="metric"><b className={p.highlight ? 'p' : undefined}>{p.metric}</b><span>{p.metricLabel}</span></span>
    </a>
  )
}

function Contact() {
  const [label, setLabel] = useState('copy')
  function copy() {
    if (!navigator.clipboard) { setLabel('select ↖'); return }
    navigator.clipboard.writeText(links.email).then(
      () => { setLabel('copied ✓'); setTimeout(() => setLabel('copy'), 1600) },
      () => setLabel('select ↖'),
    )
  }
  return (
    <section className="contact" id="contact">
      <h2 className="rv">Let&apos;s build <em>something.</em></h2>
      <div className="mailrow rv" style={{ '--d': '120ms' }}>
        <a href={`mailto:${links.email}`}>{links.email}</a>
        <button className="copy" type="button" onClick={copy}>{label}</button>
      </div>
      <div className="socials rv" style={{ '--d': '200ms' }}>
        <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href={links.leetcode} target="_blank" rel="noreferrer">LeetCode ↗</a>
      </div>
    </section>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l3 6 6 .9-4.5 4.4 1 6.2L12 16.6 6.5 19.5l1-6.2L3 8.9 9 8z" />
    </svg>
  )
}

// fade sections in as they scroll into view
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    if (reduce || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
