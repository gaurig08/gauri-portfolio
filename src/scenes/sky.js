// Full-window background: sakura petals drift down by day (they dodge the cursor),
// stars twinkle by night with a little parallax and the occasional shooting star.
import { isDark } from './util.js'

export function startSky(canvas, reduce) {
  const c = canvas.getContext('2d')
  let w = 0, h = 0, petals = [], stars = [], shoot = null, nextShoot = 2000, mx = 0.5, my = 0.5, mode = null, raf = 0

  function size() {
    const dpr = Math.min(2, devicePixelRatio || 1)
    w = innerWidth; h = innerHeight
    canvas.width = w * dpr; canvas.height = h * dpr
    c.setTransform(dpr, 0, 0, dpr, 0, 0)
    const n = w < 700 ? 7 : 13
    petals = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 5 + Math.random() * 5, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.03, vy: 0.25 + Math.random() * 0.3, sw: Math.random() * 6, vx: 0 }))
    stars = Array.from({ length: Math.round((w * h) / 9000) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 0.5 + Math.random() * 1.3, z: 0.35 + Math.random() * 0.65, ph: Math.random() * 6, sp: 0.02 + Math.random() * 0.06, big: Math.random() < 0.12 }))
  }
  const onMove = (e) => { mx = e.clientX; my = e.clientY }

  function draw(t) {
    const dark = isDark()
    if (dark !== mode) { mode = dark; canvas.style.opacity = 0; setTimeout(() => { canvas.style.opacity = 1 }, 250) }
    c.clearRect(0, 0, w, h)
    if (dark) {
      const ox = (mx / w - 0.5) * 16, oy = (my / h - 0.5) * 10
      stars.forEach((s) => {
        if (!reduce) s.ph += s.sp
        const tw = Math.pow(0.5 + 0.5 * Math.sin(s.ph), 2), a = (0.12 + 0.88 * tw) * s.z, x = s.x - ox * s.z, y = s.y - oy * s.z
        c.fillStyle = `rgba(240,234,255,${a})`; c.beginPath(); c.arc(x, y, s.r * (0.8 + 0.4 * tw), 0, 7); c.fill()
        if (s.big) {
          const r = (4 + 6 * tw) * s.z, g = c.createRadialGradient(x, y, 0, x, y, r)
          g.addColorStop(0, `rgba(235,225,255,${a * 0.55})`); g.addColorStop(1, 'rgba(200,180,255,0)')
          c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill()
        }
      })
      if (reduce) return
      if (!shoot && t > nextShoot) shoot = { x: w * (0.4 + Math.random() * 0.6), y: h * Math.random() * 0.4, l: 0 }
      if (shoot) {
        shoot.l += 12
        const x2 = shoot.x - shoot.l, y2 = shoot.y + shoot.l * 0.45, g = c.createLinearGradient(x2, y2, x2 + 90, y2 - 40)
        g.addColorStop(0, 'rgba(255,255,255,.85)'); g.addColorStop(1, 'rgba(255,255,255,0)')
        c.strokeStyle = g; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x2, y2); c.lineTo(x2 + 90, y2 - 40); c.stroke()
        if (shoot.l > w) { shoot = null; nextShoot = t + 5000 + Math.random() * 6000 }
      }
    } else {
      petals.forEach((q) => {
        if (!reduce) {
          q.sw += 0.015; q.y += q.vy; q.x += Math.sin(q.sw) * 0.5 + q.vx; q.a += q.va; q.vx *= 0.95
          const dx = q.x - mx, dy = q.y - my, dd = Math.sqrt(dx * dx + dy * dy) || 1
          if (dd < 90) { q.vx += (dx / dd) * 0.9; q.a += 0.05 }
          if (q.y > h + 20) { q.y = -20; q.x = Math.random() * w }
          if (q.x < -20) q.x = w + 20
          if (q.x > w + 20) q.x = -20
        }
        c.save(); c.translate(q.x, q.y); c.rotate(q.a)
        c.fillStyle = q.r > 7.5 ? 'rgba(190,160,255,.45)' : 'rgba(255,160,205,.42)'
        c.beginPath(); c.moveTo(0, -q.r); c.quadraticCurveTo(q.r, -q.r * 0.2, 0, q.r); c.quadraticCurveTo(-q.r, -q.r * 0.2, 0, -q.r); c.fill()
        c.restore()
      })
    }
  }
  function frame(t) {
    draw(t)
    raf = requestAnimationFrame(frame)
  }

  const onResize = () => { size(); if (reduce) draw(0) }
  size()
  addEventListener('resize', onResize)
  addEventListener('pointermove', onMove, { passive: true })
  if (reduce) draw(0); else raf = requestAnimationFrame(frame)

  const api = () => { cancelAnimationFrame(raf); removeEventListener('resize', onResize); removeEventListener('pointermove', onMove) }
  api.redraw = () => { if (reduce) draw(0) }
  return api
}
