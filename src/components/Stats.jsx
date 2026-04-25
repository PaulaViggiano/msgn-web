import { useEffect, useRef } from 'react'

const STATS = [
  { value: 15,    suffix: '+',  label: 'Años de trayectoria',      sub: 'Neuquén · Patagonia',                isCounter: true  },
  { value: 500,   suffix: '+',  label: 'Proyectos realizados',     sub: 'Comunicación · Eventos · Marketing', isCounter: true  },
  { value: 45,    suffix: 'K+', label: 'Visitantes · Edifica NQN', sub: 'En una sola edición',                isCounter: true  },
  { value: '360°',suffix: '',   label: 'Soluciones integrales',    sub: 'De la idea a la ejecución',          isCounter: false },
]

function CounterItem({ stat, delay }) {
  const spanRef  = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    if (!stat.isCounter) return

    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated.current) {
        animated.current   = true
        const target   = stat.value
        const duration = 1800
        const start    = performance.now()

        function step(now) {
          const p    = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          if (spanRef.current) spanRef.current.textContent = Math.floor(ease * target)
          if (p < 1) requestAnimationFrame(step)
          else if (spanRef.current) spanRef.current.textContent = target
        }
        requestAnimationFrame(step)
        io.disconnect()
      }
    }, { threshold: 0.5 })

    if (spanRef.current) io.observe(spanRef.current.closest('.stat-item'))
    return () => io.disconnect()
  }, [stat])

  return (
    <div className={`stat-item reveal reveal-d${delay} text-center py-12 px-6 border-r border-[rgba(201,153,58,0.12)] last:border-r-0 hover:bg-[rgba(201,153,58,0.03)] transition-colors duration-300`}>
      <span className="font-playfair font-black text-gold leading-none block"
        style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}>
        {stat.isCounter
          ? <><span ref={spanRef}>0</span>{stat.suffix}</>
          : <>{stat.value}</>
        }
      </span>
      <span className="font-mono text-[0.6rem] tracking-[2px] uppercase text-brand-slate mt-2.5 block">
        {stat.label}
      </span>
      <span className="text-[0.78rem] text-brand-slate/60 mt-1 block">
        {stat.sub}
      </span>
    </div>
  )
}

export default function Stats() {
  return (
    <div className="relative z-10 border-t border-b border-[rgba(201,153,58,0.12)] py-20 px-9 md:px-[4.5rem]">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <CounterItem key={i} stat={stat} delay={i} />
        ))}
      </div>
    </div>
  )
}