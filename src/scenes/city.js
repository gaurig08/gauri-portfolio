
import { isDark, seeded } from './util.js'

export function startCity(canvas, hero, reduce) {
  const c = canvas.getContext('2d')
  const R = seeded((Math.random() * 1e9) | 0)
  const rnd = (a, b) => a + R() * (b - a)
  let W = 0, H = 0, base = null, night = null, raf = 0, rebuildTimer = 0, lastW = 0
  let clouds = [], birds = [], neons = [], flick = [], magic = []

  function cloudSprite(w) {
    const h = w * 0.8, o = document.createElement('canvas')
    o.width = w; o.height = h
    const x = o.getContext('2d'), n = 9 + Math.floor(Math.random() * 5)
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1), cx = w * (0.12 + 0.76 * t), r = w * (0.1 + 0.14 * Math.sin(Math.PI * t)) * rnd(0.8, 1.15), cy = h * 0.72 - r * 0.5
      const g = x.createRadialGradient(cx - r * 0.25, cy - r * 0.35, r * 0.1, cx, cy, r)
      g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.7, 'rgba(255,250,255,.95)'); g.addColorStop(1, 'rgba(255,250,255,0)')
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill()
    }
    x.globalCompositeOperation = 'source-atop'
    const sh = x.createLinearGradient(0, h * 0.4, 0, h * 0.8)
    sh.addColorStop(0, 'rgba(210,190,255,0)'); sh.addColorStop(1, 'rgba(190,160,245,.75)')
    x.fillStyle = sh; x.fillRect(0, 0, w, h)
    x.globalCompositeOperation = 'destination-out'
    const cut = x.createLinearGradient(0, h * 0.72, 0, h * 0.86)
    cut.addColorStop(0, 'rgba(0,0,0,0)'); cut.addColorStop(1, 'rgba(0,0,0,1)')
    x.fillStyle = cut; x.fillRect(0, 0, w, h)
    return o
  }

  // fantasy roofs on top of a plain building
  function drawMagic(b, kind, x, top, bw, s, col, layer) {
    b.fillStyle = col; b.beginPath()
    if (kind === 'castle') {
      for (let i = 0; i < 3; i++) b.rect(x - 3 + i * (bw + 6) / 3, top - 6 * s, (bw + 6) / 6, 6 * s)
      b.rect(x - 3, top - 2, bw + 6, 3); b.fill(); b.beginPath()
      const ax = x + bw / 2, ay = top - 46 * s
      b.moveTo(x + 2, top - 6 * s); b.lineTo(ax, ay); b.lineTo(x + bw - 2, top - 6 * s); b.closePath(); b.fill()
      b.strokeStyle = col; b.lineWidth = 1.2; b.beginPath(); b.moveTo(ax, ay); b.lineTo(ax, ay - 12 * s); b.stroke()
      b.fillStyle = '#ff7eb6'; b.beginPath(); b.moveTo(ax, ay - 12 * s); b.lineTo(ax + 10 * s, ay - 9 * s); b.lineTo(ax, ay - 6 * s); b.fill()
      magic.push({ x: ax, y: top + 20 * s, w: 6 * s, h: 10 * s, arch: true, col: '255,214,140' })
      magic.push({ x: ax, y: top + 52 * s, w: 6 * s, h: 10 * s, arch: true, col: '255,214,140' })
    } else if (kind === 'tower') {
      b.moveTo(x - 3, top); b.lineTo(x + bw / 2, top - 46 * s); b.lineTo(x + bw + 3, top); b.closePath(); b.fill()
      b.fillRect(x - 5, top - 1, bw + 10, 3)
      magic.push({ x: x + bw / 2, y: top + 18 * s, r: 4.5 * s, col: '150,255,200' })
      magic.push({ x: x + bw / 2, y: top + 58 * s, r: 3 * s, col: '150,255,200' })
    } else if (kind === 'roof') {
      b.moveTo(x - 4, top); b.lineTo(x + bw / 2, top - bw * 0.55); b.lineTo(x + bw + 4, top); b.closePath(); b.fill()
      b.fillRect(x + bw * 0.68, top - bw * 0.42, 5 * s, bw * 0.3)
      if (layer === 2) magic.push({ x: x + bw / 2, y: top - bw * 0.22, r: 3 * s, col: '255,214,140' })
    } else if (kind === 'spire') {
      b.moveTo(x + bw * 0.2, top); b.lineTo(x + bw * 0.5, top - 40 * s); b.lineTo(x + bw * 0.8, top); b.closePath(); b.fill()
    }
  }

  function build() {
    try { buildNow() } catch (err) { console.error('city build failed', err) }
  }

  function buildNow() {
    R.reset()
    const dpr = Math.min(2, devicePixelRatio || 1)
    W = document.documentElement.clientWidth
    H = Math.round(hero.getBoundingClientRect().bottom + scrollY + 40)
    if (!W || H < 100) { W = 0; return }
    canvas.width = W * dpr; canvas.height = H * dpr; canvas.style.height = H + 'px'
    c.setTransform(dpr, 0, 0, dpr, 0, 0)
    base = document.createElement('canvas'); base.width = W * dpr; base.height = H * dpr
    const b = base.getContext('2d'); b.setTransform(dpr, 0, 0, dpr, 0, 0)
    night = isDark()

    if (night) {
      // crescent moon with a soft glow, and a faint purple haze over the city
      const mx = W * (W < 700 ? 0.82 : 0.86), my = H * 0.14
      const mo = document.createElement('canvas'); mo.width = mo.height = 48 * dpr
      const m = mo.getContext('2d'); m.setTransform(dpr, 0, 0, dpr, 0, 0)
      m.fillStyle = '#d9cff5'; m.globalAlpha = 0.85; m.beginPath(); m.arc(24, 24, 18, 0, 7); m.fill()
      m.globalAlpha = 1; m.globalCompositeOperation = 'destination-out'; m.beginPath(); m.arc(32, 18, 16, 0, 7); m.fill()
      b.save(); b.shadowColor = 'rgba(200,185,255,.6)'; b.shadowBlur = 14; b.drawImage(mo, mx - 24, my - 24, 48, 48); b.restore()
      const hz = b.createLinearGradient(0, H * 0.5, 0, H - 30)
      hz.addColorStop(0, 'rgba(122,82,244,0)'); hz.addColorStop(1, 'rgba(160,110,255,.14)')
      b.fillStyle = hz; b.fillRect(0, H * 0.5, W, H * 0.5 - 30)
    } else {
      const sky = b.createLinearGradient(0, 0, 0, H)
      sky.addColorStop(0, '#e4daff'); sky.addColorStop(0.55, '#f1ecfd'); sky.addColorStop(1, '#f8f6fc')
      b.fillStyle = sky; b.fillRect(0, 0, W, H)
      const sun = b.createRadialGradient(W * 0.74, H * 0.42, 0, W * 0.74, H * 0.42, Math.max(W, H) * 0.45)
      sun.addColorStop(0, 'rgba(255,250,240,.6)'); sun.addColorStop(0.3, 'rgba(255,245,240,.25)'); sun.addColorStop(1, 'rgba(255,245,240,0)')
      b.fillStyle = sun; b.fillRect(0, 0, W, H)
    }

    const ground = H - 30, sc = Math.min(1, W / 1300)
    neons = []; flick = []; magic = []
    const dayColors = ['rgba(176,150,236,.42)', 'rgba(144,112,224,.58)', 'rgba(98,70,186,.88)']
    const nightColors = ['rgba(92,74,152,.5)', 'rgba(64,50,122,.82)', 'rgba(42,32,84,.97)']
    const layers = [[40, 95, false], [50, 125, false], [55, 165, true]] // [min height, max height, front layer?]
    layers.forEach(([minH, maxH, front], li) => {
      const col = (night ? nightColors : dayColors)[li]
      const s2 = Math.max(0.7, sc)
      const special = li === 2
        ? (W < 700 ? [[0.16, 'castle'], [0.52, 'tower'], [0.84, 'roof']] : [[0.09, 'castle'], [0.3, 'roof'], [0.5, 'tower'], [0.73, 'roof'], [0.92, 'castle']])
        : li === 1 ? (W < 700 ? [[0.36, 'spire']] : [[0.2, 'roof'], [0.62, 'spire']]) : []
      let x = -10
      while (x < W + 10) {
        let bw = rnd(28, 70) * s2, bh = rnd(minH, maxH) * 0.85 * Math.max(0.65, sc), kind = null
        if (special.length && x + bw / 2 >= special[0][0] * W) {
          kind = special.shift()[1]
          if (kind === 'castle') { bw = 30 * s2; bh = Math.max(bh, 105 * s2) } else if (kind === 'tower') { bw = 24 * s2; bh = Math.max(bh, 118 * s2) }
        }
        const top = ground - bh
        b.fillStyle = col; b.fillRect(x, top, bw, bh)
        if (kind) drawMagic(b, kind, x, top, bw, s2, col, li)
        if (R() < 0.3) b.fillRect(x + bw * 0.45, top - rnd(12, 30), 2, 30)                         // antenna
        if (R() < 0.22) { b.fillRect(x + bw * 0.2, top - 9, bw * 0.28, 9); b.beginPath(); b.ellipse(x + bw * 0.34, top - 9, bw * 0.14, 3, 0, 0, 7); b.fill() } // water tank
        if (front && kind !== 'castle' && kind !== 'tower') {
          for (let wy = top + 10; wy < ground - 8; wy += 13) {
            for (let wx = x + 6; wx < x + bw - 8; wx += 11) {
              const r = R(), r2 = R(), r3 = R()
              if (r < (night ? 0.3 : 0.2)) {
                b.fillStyle = r2 < 0.7 ? 'rgba(255,214,140,.95)' : 'rgba(255,170,215,.9)'; b.fillRect(wx, wy, 5, 7)
                if (r3 < 0.08) flick.push({ x: wx, y: wy })
              } else if (r < 0.55) {
                b.fillStyle = night ? 'rgba(120,100,200,.12)' : 'rgba(60,40,140,.5)'; b.fillRect(wx, wy, 5, 7)
              }
            }
          }
          b.fillStyle = col
          if (R() < 0.24 && bh > 75) neons.push({ x: x + bw - 10, y: top + rnd(16, 40), h: rnd(26, Math.min(60, bh - 40)), col: ['#ff4fa3', '#33dcff', '#c9a2ff'][Math.floor(R() * 3)], ph: rnd(0, 6) })
          if (R() < 0.25) neons.push({ x: x + 4, y: top + 4, w: bw - 8, col: ['#ff4fa3', '#33dcff'][Math.floor(R() * 2)], ph: rnd(0, 6), strip: true })
        }
        x += bw + rnd(-4, 6)
      }
    })
    // power line strung across the rooftops
    b.strokeStyle = night ? 'rgba(150,130,230,.3)' : 'rgba(90,64,170,.55)'; b.lineWidth = 1; b.beginPath()
    b.moveTo(0, ground - 76 * sc)
    b.quadraticCurveTo(W * 0.25, ground - 38 * sc, W * 0.5, ground - 70 * sc)
    b.quadraticCurveTo(W * 0.75, ground - 32 * sc, W, ground - 66 * sc)
    b.stroke()

    clouds = []
    const nc = night ? 0 : W < 700 ? 2 : 3
    for (let i = 0; i < nc; i++) {
      const cw = rnd(150, 290) * Math.max(0.6, sc)
      clouds.push({ img: cloudSprite(Math.round(cw)), w: cw, x: rnd(-cw, W), y: rnd(H * 0.1, H * 0.34), v: rnd(0.05, 0.14), a: rnd(0.55, 0.75) })
    }
    birds = []
    for (let i = 0; i < (night ? 0 : 2); i++) birds.push({ x: rnd(0, W), y: rnd(H * 0.15, H * 0.35), v: rnd(0.25, 0.45), ph: rnd(0, 6), s: rnd(5, 8) })
  }

  function draw(t) {
    if (isDark() !== night || !W || !base) build()
    if (!W || !base) return
    canvas.style.zIndex = night ? 1 : 0   // at night the dragon flies behind the buildings
    c.clearRect(0, 0, W, H); c.drawImage(base, 0, 0, W, H)
    clouds.forEach((k) => {
      k.x += k.v; if (k.x > W + 20) k.x = -k.w
      c.globalAlpha = k.a; c.drawImage(k.img, k.x, k.y - k.w * 0.25, k.w, k.w * 0.8)
    })
    c.globalAlpha = 1
    c.strokeStyle = 'rgba(80,60,140,.55)'; c.lineWidth = 1.4
    birds.forEach((q) => {
      q.x += q.v; q.ph += 0.12
      if (q.x > W + 20) { q.x = -20; q.y = rnd(H * 0.12, H * 0.35) }
      const f = Math.sin(q.ph) * q.s * 0.45
      c.beginPath(); c.moveTo(q.x - q.s, q.y - f)
      c.quadraticCurveTo(q.x - q.s * 0.4, q.y - 2, q.x, q.y); c.quadraticCurveTo(q.x + q.s * 0.4, q.y - 2, q.x + q.s, q.y - f); c.stroke()
    })
    neons.forEach((n) => {
      let a = 0.65 + 0.35 * Math.sin(t / 700 + n.ph)
      if (Math.sin(t / 97 + n.ph * 7) > 0.985) a = 0.2   // the odd glitch
      c.shadowColor = n.col; c.shadowBlur = night ? 18 : 12; c.fillStyle = n.col; c.globalAlpha = a
      if (n.strip) c.fillRect(n.x, n.y, n.w, 2.5)
      else { c.beginPath(); if (c.roundRect) c.roundRect(n.x, n.y, 6, n.h, 3); else c.rect(n.x, n.y, 6, n.h); c.fill() }
    })
    c.shadowBlur = 0; c.globalAlpha = 1
    magic.forEach((m, i) => {   // glowing castle and tower windows
      const a = (night ? 0.75 : 0.55) + 0.25 * Math.sin(t / 1100 + i * 1.7), r2 = (m.r || 5) * 3.2
      const g = c.createRadialGradient(m.x, m.y, 0, m.x, m.y, r2)
      g.addColorStop(0, `rgba(${m.col},${a * (night ? 0.55 : 0.35)})`); g.addColorStop(1, `rgba(${m.col},0)`)
      c.fillStyle = g; c.beginPath(); c.arc(m.x, m.y, r2, 0, 7); c.fill()
      c.fillStyle = `rgba(${m.col},${a})`; c.beginPath()
      if (m.arch) { c.rect(m.x - m.w / 2, m.y - m.h / 2 + m.w / 2, m.w, m.h - m.w / 2); c.arc(m.x, m.y - m.h / 2 + m.w / 2, m.w / 2, Math.PI, 0) }
      else c.arc(m.x, m.y, m.r, 0, 7)
      c.fill()
    })
    flick.forEach((f, i) => {
      if (Math.sin(t / 900 + i * 2.3) > 0.6) { c.fillStyle = night ? 'rgba(42,32,84,.95)' : 'rgba(60,40,140,.85)'; c.fillRect(f.x, f.y, 5, 7) }
    })
  }

  function frame(t) {
    try { draw(t) } catch (err) { console.error('city frame failed', err) }
    if (!reduce) raf = requestAnimationFrame(frame)
  }

  const rebuild = () => { clearTimeout(rebuildTimer); rebuildTimer = setTimeout(build, 150) }
  const ro = 'ResizeObserver' in window
    ? new ResizeObserver(() => { const w = document.documentElement.clientWidth; if (w !== lastW || !base) { lastW = w; rebuild() } })
    : null
  build()
  addEventListener('resize', rebuild)
  addEventListener('load', build)
  ro?.observe(hero)
  document.fonts?.ready.then(build)
  raf = requestAnimationFrame(frame)

  // React calls this to redraw right away when the theme changes (matters when animation is off)
  const api = () => {
    cancelAnimationFrame(raf); clearTimeout(rebuildTimer)
    removeEventListener('resize', rebuild); removeEventListener('load', build); ro?.disconnect()
  }
  api.redraw = () => { build(); if (reduce) draw(performance.now()) }
  return api
}
