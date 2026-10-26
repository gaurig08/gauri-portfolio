
import DRAGON from './dragonData.js'

// cubic-bezier easing, the same curve CSS uses: control points (x1,y1) (x2,y2)
function ease(x1, y1, x2, y2, x) {
  if (x <= 0) return 0
  if (x >= 1) return 1
  const X = (t) => ((1 - 3 * x2 + 3 * x1) * t + (3 * x2 - 6 * x1)) * t * t + 3 * x1 * t
  let t = x, cx = 0
  for (let i = 0; i < 8; i++) {                      // Newton steps
    cx = X(t) - x
    const dx = 3 * (1 - 3 * x2 + 3 * x1) * t * t + 2 * (3 * x2 - 6 * x1) * t + 3 * x1
    if (Math.abs(cx) < 1e-6 || Math.abs(dx) < 1e-6) break
    t -= cx / dx
  }
  if (t < 0 || t > 1 || Math.abs(cx) >= 1e-6) {     // fall back to bisection
    let lo = 0, hi = 1; t = x
    for (let i = 0; i < 30; i++) { if (X(t) > x) hi = t; else lo = t; t = (lo + hi) / 2 }
  }
  return ((1 - 3 * y2 + 3 * y1) * t + (3 * y2 - 6 * y1)) * t * t + 3 * y1 * t
}

// curved motion paths are walked at an even speed, so measure them first
function curve(a, b, to, ti) {
  const p1 = [a[0] + to[0], a[1] + to[1]], p2 = [b[0] + ti[0], b[1] + ti[1]], pts = [], len = [0], n = 60
  for (let i = 0; i <= n; i++) {
    const u = i / n, m = 1 - u
    pts.push([
      m * m * m * a[0] + 3 * m * m * u * p1[0] + 3 * m * u * u * p2[0] + u * u * u * b[0],
      m * m * m * a[1] + 3 * m * m * u * p1[1] + 3 * m * u * u * p2[1] + u * u * u * b[1],
    ])
    if (i) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
  }
  return (e) => {
    const d = e * len[n]
    let j = 1
    while (j < n && len[j] < d) j++
    const f = (d - len[j - 1]) / (len[j] - len[j - 1] || 1)
    const r = [pts[j - 1][0] + (pts[j][0] - pts[j - 1][0]) * f, pts[j - 1][1] + (pts[j][1] - pts[j - 1][1]) * f]
    for (let k = 2; k < a.length; k++) r.push(a[k] + (b[k] - a[k]) * e)
    return r
  }
}

// value of a property at frame t: fixed, or eased between keyframes
function value(p, t) {
  if (p.v) return p.v
  const k = p.k
  if (t <= k[0].t) return k[0].s
  if (t >= k[k.length - 1].t) return k[k.length - 1].s
  let i = 0
  while (k[i + 1].t <= t) i++
  const A = k[i], B = k[i + 1], e = ease(A.e[0], A.e[1], A.e[2], A.e[3], (t - A.t) / (B.t - A.t))
  if (A.to) { A.c = A.c || curve(A.s, B.s, A.to, A.ti); return A.c(e) }
  return A.s.map((s, j) => s + (B.s[j] - s) * e)
}

// 4x4 matrices; points are rows (p' = p * M), stored as 16 numbers
function mul(A, B) {
  const r = new Array(16)
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) r[i * 4 + j] = A[i * 4] * B[j] + A[i * 4 + 1] * B[4 + j] + A[i * 4 + 2] * B[8 + j] + A[i * 4 + 3] * B[12 + j]
  return r
}
const T = (x, y, z) => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]
const S = (x, y, z) => [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]
const RZ = (a) => { const c = Math.cos(a), s = Math.sin(a); return [c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] }
const RX = (a) => { const c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1] }
const RAD = Math.PI / 180

// a layer's own transform: anchor to origin, scale, rotate, then move to its position
function local(L, t) {
  const a = value(L.a, t), s = value(L.s, t), p = value(L.p, t)
  let m = mul(T(-a[0], -a[1], a[2] || 0), S(s[0] / 100, s[1] / 100, (s[2] || 100) / 100))
  m = L.rx ? mul(m, RX(value(L.rx, t)[0] * RAD)) : mul(m, RZ(-value(L.r, t)[0] * RAD))
  return mul(m, T(p[0], p[1], -(p[2] || 0)))
}

export function createDragon(canvas) {
  const ctx = canvas.getContext('2d'), byId = {}
  const layers = DRAGON.layers.map((L) => ({ ...L, paths: L.shapes.map(([color, d]) => [color, new Path2D(d)]) }))
  layers.forEach((L) => { byId[L.id] = L })
  function world(L, t, memo) {
    if (memo[L.id]) return memo[L.id]
    let m = local(L, t)
    if (L.parent) m = mul(m, world(byId[L.parent], t, memo))
    return (memo[L.id] = m)
  }
  return {
    frames: DRAGON.frames,
    fps: DRAGON.fps,
    draw(t) {
      const w = canvas.width, h = canvas.height, v = DRAGON.view, k = Math.min(w / v[2], h / v[3]), memo = {}
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, w, h)
      layers.forEach((L) => {
        if (!L.draw || t < L.ip || t >= L.op) return
        const m = world(L, t, memo)   // flatten 3D to the screen (no perspective), then fit the view box
        ctx.setTransform(m[0] * k, m[1] * k, m[4] * k, m[5] * k, (m[12] - v[0]) * k + (w - v[2] * k) / 2, (m[13] - v[1]) * k + (h - v[3] * k) / 2)
        L.paths.forEach(([color, path]) => { ctx.fillStyle = color; ctx.fill(path) })
      })
    },
  }
}
