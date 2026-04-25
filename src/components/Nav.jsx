import { useState, useEffect } from 'react'
import MSGNLogo from './MSGNLogo'

const links = [
  { href: '#conector', label: 'Nosotros' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchor = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-500 px-5 md:px-[4.5rem] ${
        scrolled || menuOpen
          ? 'py-2 bg-bg/98 backdrop-blur-xl border-b border-[rgba(201,153,58,0.12)]'
          : 'py-3 md:py-6'
      }`}>

        {/* Logo */}
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center no-underline z-10">
          <MSGNLogo width={70} className="md:w-[90px]" />
        </a>

        {/* Links desktop */}
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

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a href="https://wa.me/5492994567290" target="_blank" rel="noreferrer"
            className="font-mono text-[0.55rem] md:text-[0.63rem] tracking-[1px] md:tracking-[2px] uppercase text-bg bg-gold px-3 py-2 md:px-7 md:py-3 border border-gold hover:bg-transparent hover:text-gold transition-all duration-300 no-underline whitespace-nowrap">
            <span className="hidden md:inline">Hablar con Marcos</span>
            <span className="md:hidden">WhatsApp</span>
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 z-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-gold transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-gold transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-gold transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {links.map(l => (
            <a key={l.href} href={l.href}
              onClick={e => handleAnchor(e, l.href)}
              className="font-mono text-[1rem] tracking-[4px] uppercase text-cream hover:text-gold transition-colors duration-200 no-underline">
              {l.label}
            </a>
          ))}
          <a href="https://wa.me/5492994567290" target="_blank" rel="noreferrer"
            className="mt-4 font-mono text-[0.7rem] tracking-[2px] uppercase text-bg bg-gold px-8 py-4 border border-gold no-underline">
            Hablar con Marcos
          </a>
        </div>
      )}
    </>
  )
}