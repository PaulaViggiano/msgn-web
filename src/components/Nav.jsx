import { useState, useEffect } from 'react'
import MSGNLogo from './MSGNLogo'

const links = [
  { href: '#conector', label: 'Nosotros' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchor = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-500 px-9 md:px-[4.5rem] ${
      scrolled ? 'py-4 bg-bg/95 backdrop-blur-xl border-b border-[rgba(201,153,58,0.12)]' : 'py-7'
    }`}>
      <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        className="flex items-center gap-4 no-underline">
        <MSGNLogo width={100} />
      </a>

      <ul className="hidden md:flex gap-10 list-none">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={e => handleAnchor(e, l.href)}
              className="font-mono text-[0.63rem] tracking-[2px] uppercase text-brand-slate hover:text-gold transition-colors duration-200 no-underline">
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a href="https://wa.me/5492994567290" target="_blank" rel="noreferrer"
        className="font-mono text-[0.63rem] tracking-[2px] uppercase text-bg bg-gold px-7 py-3 border border-gold hover:bg-transparent hover:text-gold transition-all duration-300 no-underline">
        Hablar con Marcos
      </a>
    </nav>
  )
}