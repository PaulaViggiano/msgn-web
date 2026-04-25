import { useEffect, useRef } from 'react'

const LABELS = ['Medios', 'Sector Privado', 'Eventos', 'Proveedores', 'Sector Público', 'Internacional', 'Comunicación', 'Marketing']

export default function NetworkCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId
    let nodes = []
    const mouse = { x: -999, y: -999 }

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initNodes()
    }

    function initNodes() {
      const { width: W, height: H } = canvas
      nodes = Array.from({ length: 28 }, (_, i) => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        vx:    (Math.random() - 0.5) * 0.4,
        vy:    (Math.random() - 0.5) * 0.4,
        r:     Math.random() * 2 + 1,
        isHub: i < LABELS.length,
      }))
    }

    function draw() {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
        const dx = n.x - mouse.x, dy = n.y - mouse.y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < 80) { const f = ((80 - d) / 80) * 0.8; n.vx += (dx / d) * f; n.vy += (dy / d) * f }
      })

      nodes.forEach((a, i) => {
        nodes.forEach((b, j) => {
          if (j <= i) return
          const dx = a.x - b.x, dy = a.y - b.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 160) {
            const alpha = (1 - d / 160) * 0.18
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = (a.isHub || b.isHub) ? `rgba(201,153,58,${alpha * 1.6})` : `rgba(107,122,153,${alpha})`
            ctx.lineWidth = (a.isHub && b.isHub) ? 0.8 : 0.4
            ctx.stroke()
          }
        })
      })

      nodes.forEach(n => {
        const dx = n.x - mouse.x, dy = n.y - mouse.y
        const near = Math.sqrt(dx * dx + dy * dy) < 100
        ctx.beginPath(); ctx.arc(n.x, n.y, n.isHub ? 3.5 : n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.isHub ? (near ? 'rgba(232,184,75,0.9)' : 'rgba(201,153,58,0.7)') : 'rgba(107,122,153,0.4)'
        ctx.fill()
        if (n.isHub && near) {
          ctx.beginPath(); ctx.arc(n.x, n.y, 10, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(201,153,58,0.2)'; ctx.lineWidth = 1; ctx.stroke()
        }
      })

      rafId = requestAnimationFrame(draw)
    }

    const onMouseMove = e => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouseMove)
    resize(); draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />
}