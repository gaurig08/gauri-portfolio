
import { createDragon } from './dragonPlayer.js'

export function startDragon(canvas) {
  let dragon
  try { dragon = createDragon(canvas) } catch (err) { console.error('dragon failed', err); return () => {} }
  let W = 0, size = 0, B = null, last = null, clock = 0, phase = 0.35, turn = 0, raf = 0

  function bounds() {
    W = document.documentElement.clientWidth
    size = W < 700 ? 74 : 112
    const dpr = Math.min(2, devicePixelRatio || 1)
    canvas.style.width = size + 'px'
    canvas.width = Math.round(size * dpr); canvas.height = Math.round(((size * 880) / 1040) * dpr)
    B = { x0: 16, x1: W - size - 16, y0: 84, y1: innerHeight - size * 0.85 - 30 }
  }
  const onResize = () => bounds()

  function step(t) {
    const dt = last === null ? 16 : Math.min(50, t - last)
    last = t; clock += dt
    const Ax = (B.x1 - B.x0) / 2, Ay = ((B.y1 - B.y0) / 2) * 0.8, speed = W < 700 ? 68 : 100
    const sx = -Ax * Math.sin(phase), sy = Ay * Math.cos(phase) + Ay * 0.25 * 3 * Math.cos(3 * phase)
    phase += ((dt / 1000) * speed) / (Math.hypot(sx, sy) || 1)          // same speed all the way round
    const x = B.x0 + Ax + Ax * Math.cos(phase)
    const y = B.y0 + (B.y1 - B.y0) / 2 + Ay * Math.sin(phase) + Ay * 0.25 * Math.sin(3 * phase)
    const vx = -Math.sin(phase), vy = ((Math.cos(phase) + 0.75 * Math.cos(3 * phase)) * Ay) / Ax
    turn += ((vx < 0 ? 0 : 180) - turn) * Math.min(1, dt / 220)        // the drawing faces left; 180 = facing right
    const tilt = Math.max(-10, Math.min(10, Math.atan2(vy, Math.abs(vx) + 0.35) * 30)) * (vx < 0 ? -1 : 1)
    canvas.style.transform = `translate(${x}px,${y + Math.sin(clock / 650) * 5}px) rotate(${tilt}deg) perspective(600px) rotateY(${turn}deg)`
    dragon.draw(((clock / 1000) * dragon.fps * 0.9) % dragon.frames)
    raf = requestAnimationFrame(step)
  }

  bounds()
  addEventListener('resize', onResize)
  canvas.style.opacity = 1
  raf = requestAnimationFrame(step)
  return () => { cancelAnimationFrame(raf); removeEventListener('resize', onResize); canvas.style.opacity = 0 }
}
