import MSGNLogo from './MSGNLogo'

const FOOT_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/marcosgalianok' },
  { label: 'LinkedIn',  href: 'https://ar.linkedin.com/in/marcosgalian' },
  { label: 'WhatsApp',  href: 'https://wa.me/5492994567290' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 bg-bg2 border-t border-[rgba(201,153,58,0.12)] px-9 md:px-[4.5rem] py-9 flex flex-col md:flex-row justify-between items-center gap-5">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <MSGNLogo width={80} />
      </div>

      {/* Copyright */}
      <div className="font-mono text-[0.55rem] tracking-[2px] text-brand-slate uppercase text-center">
        © 2026 · Marcos Galian · Experiencias & Producciones · Neuquén
      </div>

      {/* Links */}
      <div className="flex gap-7">
        {FOOT_LINKS.map(l => (
          <a key={l.label} href={l.href}
            target="_blank" rel="noreferrer"
            className="font-mono text-[0.6rem] tracking-[1px] uppercase text-brand-slate no-underline hover:text-gold transition-colors duration-200">
            {l.label}
          </a>
        ))}
      </div>

    </footer>
  )
}