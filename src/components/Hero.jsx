import { useEffect, useRef } from 'react'
import NetworkCanvas from './NetworkCanvas'

const PHRASES = [
  'Conectamos gobiernos, medios y empresas.',
  'Producimos eventos que dejan huella.',
  'Convertimos ideas en impacto real.',
  'Tu nexo con el ecosistema de Neuquén.',
]

const NETWORK_NODES = ['Medios', 'Sector Privado', 'Eventos', 'Proveedores', 'Sector Público', 'Internacional']

export default function Hero() {
  const twRef = useRef(null)

  useEffect(() => {
    let pi = 0, ci = 0, del = false
    let timeout

    function typeLoop() {
      const phrase = PHRASES[pi]
      const el = twRef.current
      if (!el) return
      if (!del) {
        el.textContent = phrase.slice(0, ci + 1)
        ci++
        if (ci === phrase.length) { del = true; timeout = setTimeout(typeLoop, 2000); return }
        timeout = setTimeout(typeLoop, 55)
      } else {
        el.textContent = phrase.slice(0, ci - 1)
        ci--
        if (ci === 0) { del = false; pi = (pi + 1) % PHRASES.length; timeout = setTimeout(typeLoop, 400); return }
        timeout = setTimeout(typeLoop, 28)
      }
    }

    const start = setTimeout(typeLoop, 1200)
    return () => { clearTimeout(start); clearTimeout(timeout) }
  }, [])

  const scrollTo = href => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-5 md:px-[4.5rem]">
      <NetworkCanvas />

      <div className="relative z-10 w-full max-w-[640px] pt-28 md:pt-24 pb-20">

        {/* Eyebrow */}
        <div className="hero-anim-1 inline-flex items-center gap-2.5 mb-6 md:mb-9 font-mono text-[0.58rem] md:text-[0.62rem] tracking-[3px] uppercase text-gold">
          <span className="w-[7px] h-[7px] rounded-full bg-gold animate-pulseDot flex-shrink-0" />
          Neuquén · Patagonia · +15 años
        </div>

        {/* Título */}
        <h1
          className="hero-anim-2 font-playfair font-black leading-[1.02] tracking-tight text-off-white"
          style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)' }}
        >
          Hacemos que<br />
          <span className="italic text-gold">las cosas</span>
          <span className="block">pasen.</span>
        </h1>

        {/* Typewriter */}
        <div className="hero-anim-3 mt-5 md:mt-7" style={{ minHeight: '2em' }}>
          <span
            ref={twRef}
            className="font-playfair italic text-cream2 typewriter-cursor"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
          />
        </div>

        {/* Descripción */}
        <p className="hero-anim-4 text-sm md:text-base text-brand-slate leading-[1.85] max-w-[500px] mt-5 md:mt-7">
          MSGN es la plataforma de comunicación, producción y vinculación que convierte ideas en resultados reales. Con acceso al ecosistema completo de Neuquén.
        </p>

        {/* CTAs */}
        <div className="hero-anim-5 flex flex-col sm:flex-row gap-3 mt-8 md:mt-11">
          <button
            onClick={() => scrollTo('#portfolio')}
            className="btn-shine font-mono text-[0.65rem] tracking-[3px] uppercase bg-gold text-bg px-7 py-4 border border-gold hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,153,58,0.3)] transition-all duration-300 text-center"
          >
            Ver proyectos
          </button>
          <button
            onClick={() => scrollTo('#contacto')}
            className="font-mono text-[0.65rem] tracking-[3px] uppercase text-cream2 px-7 py-4 border border-[rgba(237,232,223,0.2)] hover:border-gold hover:text-gold transition-all duration-300 text-center"
          >
            Conocer más →
          </button>
        </div>
      </div>

      {/* Nodos derecha — solo desktop */}
      <div className="hero-anim-6 hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 z-10 text-right">
        <div className="font-mono text-[0.58rem] tracking-[3px] uppercase text-gold mb-4">// La red MSGN</div>
        <div className="flex flex-col gap-3 items-end">
          {NETWORK_NODES.map(n => (
            <span key={n}
              className="font-mono text-[0.7rem] tracking-[1px] uppercase text-brand-slate px-3.5 py-1.5 border border-[rgba(107,122,153,0.2)] hover:text-gold hover:border-gold transition-all duration-300">
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-anim-7 absolute bottom-6 left-5 md:left-[4.5rem] flex items-center gap-3 font-mono text-[0.55rem] tracking-[3px] text-brand-slate uppercase pointer-events-none">
        <div className="w-8 md:w-10 h-px bg-gradient-to-r from-gold to-transparent" />
        Scrollear
      </div>
    </section>
  )
}