import { useEffect, useRef } from 'react'

const NODES = [
  { label: 'MSGN',           cx: 0.5,  cy: 0.5,  hub: true },
  { label: 'Gobierno',       cx: 0.2,  cy: 0.15 },
  { label: 'Medios',         cx: 0.8,  cy: 0.15 },
  { label: 'Sector Privado', cx: 0.82, cy: 0.5  },
  { label: 'Internacional',  cx: 0.75, cy: 0.85 },
  { label: 'Eventos',        cx: 0.25, cy: 0.85 },
  { label: 'Proveedores',    cx: 0.18, cy: 0.5  },
  { label: 'Comunicación',   cx: 0.35, cy: 0.28 },
  { label: 'Marketing',      cx: 0.65, cy: 0.28 },
]

export default function WebCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId, t = 0, started = false

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function draw() {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      t += 0.008

      const hx = NODES[0].cx * W
      const hy = NODES[0].cy * H

      NODES.forEach((n, i) => {
        if (i === 0) return
        const nx   = n.cx * W + Math.sin(t + i) * 6
        const ny   = n.cy * H + Math.cos(t + i * 0.7) * 4
        const prog = Math.sin(t * 1.5 + i) * 0.5 + 0.5

        // Línea hub → nodo
        ctx.beginPath()
        ctx.moveTo(hx, hy)
        const mx = hx + (nx - hx) * 0.5
        const my = hy + (ny - hy) * 0.5
        ctx.quadraticCurveTo(mx + Math.cos(i) * 20, my + Math.sin(i) * 20, nx, ny)
        ctx.strokeStyle = `rgba(201,153,58,${0.1 + prog * 0.2})`
        ctx.lineWidth   = 1
        ctx.stroke()

        // Punto
        ctx.beginPath()
        ctx.arc(nx, ny, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(201,153,58,0.7)'
        ctx.fill()

        // Anillo pulso
        const ring = (t * 0.5 + i * 0.3) % 1
        ctx.beginPath()
        ctx.arc(nx, ny, 4 + ring * 12, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(201,153,58,${0.3 * (1 - ring)})`
        ctx.lineWidth   = 0.8
        ctx.stroke()

        // Label
        ctx.font      = `500 11px 'DM Mono', monospace`
        ctx.fillStyle = 'rgba(200,192,176,0.85)'
        const lx      = nx + (n.cx < 0.5 ? -8 : 8)
        ctx.textAlign = n.cx < 0.5 ? 'right' : 'left'
        ctx.fillText(n.label.toUpperCase(), lx, ny + 4)
      })

      // Hub
      ctx.beginPath(); ctx.arc(hx, hy, 14, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(201,153,58,0.15)'; ctx.fill()
      ctx.beginPath(); ctx.arc(hx, hy, 8, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(201,153,58,0.9)';  ctx.fill()

      const hp = (t * 0.6) % 1
      ctx.beginPath(); ctx.arc(hx, hy, 8 + hp * 22, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(201,153,58,${0.3 * (1 - hp)})`
      ctx.lineWidth   = 1.5; ctx.stroke()

      ctx.font      = `bold 12px 'DM Mono', monospace`
      ctx.fillStyle = 'rgba(201,153,58,0.9)'
      ctx.textAlign = 'center'
      ctx.fillText('MSGN', hx, hy + 28)

      rafId = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started) {
        started = true; resize(); draw(); io.disconnect()
      }
    }, { threshold: 0.2 })
    io.observe(canvas)

    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); io.disconnect() }
  }, [])

  return <canvas ref={canvasRef} className="w-full block" style={{ height: '440px' }} />
}