import { useState } from 'react'

const SOCIAL_LINKS = [
  { icon: '💬', label: 'WhatsApp',        href: 'https://wa.me/5492994567290',          primary: true },
  { icon: '📷', label: '@marcosgalianok', href: 'https://instagram.com/marcosgalianok'              },
  { icon: '💼', label: 'LinkedIn',         href: 'https://ar.linkedin.com/in/marcosgalian'           },
  { icon: '📞', label: '299 456-7290',    href: 'tel:+5492994567290'                                 },
  { icon: '✉️', label: 'Email',            href: 'mailto:info@msgn.com.ar'                            },
]

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="relative z-10 text-center py-[120px] px-9 md:px-[4.5rem]"
      style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,153,58,0.04), transparent)' }}>

      <div className="reveal">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3.5 mb-5 font-mono text-[0.62rem] tracking-[4px] uppercase text-gold">
          <span className="w-7 h-px bg-gold block" />
          Trabajemos juntos
          <span className="w-7 h-px bg-gold block" />
        </div>

        {/* Título */}
        <h2 className="font-playfair font-black leading-[1.05] text-off-white mb-5"
          style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>
          ¿Tenés un proyecto<br />
          que necesita <em className="italic text-gold">pasar</em>?
        </h2>

        <p className="text-base text-brand-slate leading-[1.85] max-w-[480px] mx-auto mb-14">
          Contanos la idea. MSGN tiene los vínculos, la experiencia y la estructura para hacerlo realidad — sin importar la escala.
        </p>

        {/* Botones sociales */}
        <div className="flex flex-wrap justify-center gap-3.5 mb-14">
          {SOCIAL_LINKS.map(l => (
            <a key={l.label} href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className={`inline-flex items-center gap-2.5 font-mono text-[0.68rem] tracking-[2px] uppercase no-underline px-7 py-3.5 border transition-all duration-300 ${
                l.primary
                  ? 'bg-gold text-bg border-gold hover:bg-gold2 hover:border-gold2'
                  : 'text-cream2 border-[rgba(201,153,58,0.25)] hover:border-gold hover:text-gold hover:bg-[rgba(201,153,58,0.06)]'
              }`}>
              <span className="text-base">{l.icon}</span>
              {l.label}
            </a>
          ))}
        </div>

        {/* Formulario */}
        <div className="max-w-[600px] mx-auto text-left">
          <div className="border border-[rgba(201,153,58,0.12)] bg-bg2 p-8 md:p-10">

            <h3 className="font-playfair text-[1.3rem] font-bold text-off-white mb-1">
              Envianos un mensaje
            </h3>
            <p className="font-mono text-[0.6rem] tracking-[2px] uppercase text-brand-slate mb-8">
              Respondemos en menos de 24 hs
            </p>

            {status === 'success' && (
              <div className="mb-6 p-4 border border-teal/40 bg-teal/10 text-teal font-mono text-[0.72rem] tracking-[1px]">
                ✓ Mensaje enviado. ¡Pronto nos ponemos en contacto!
              </div>
            )}
            {status === 'error' && (
              <div className="mb-6 p-4 border border-red-800/40 bg-red-900/10 text-red-400 font-mono text-[0.72rem] tracking-[1px]">
                ✗ Algo salió mal. Escribinos directo a info@msgn.com.ar
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono text-[0.6rem] tracking-[2px] uppercase text-brand-slate block mb-2">
                    Nombre *
                  </label>
                  <input type="text" name="name" required
                    value={form.name} onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full bg-bg3 border border-[rgba(201,153,58,0.15)] text-cream px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors duration-200 placeholder:text-brand-slate/40"
                  />
                </div>
                <div>
                  <label className="font-mono text-[0.6rem] tracking-[2px] uppercase text-brand-slate block mb-2">
                    Email *
                  </label>
                  <input type="email" name="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="tu@email.com"
                    className="w-full bg-bg3 border border-[rgba(201,153,58,0.15)] text-cream px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors duration-200 placeholder:text-brand-slate/40"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[0.6rem] tracking-[2px] uppercase text-brand-slate block mb-2">
                  Asunto
                </label>
                <input type="text" name="subject"
                  value={form.subject} onChange={handleChange}
                  placeholder="¿De qué se trata tu proyecto?"
                  className="w-full bg-bg3 border border-[rgba(201,153,58,0.15)] text-cream px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors duration-200 placeholder:text-brand-slate/40"
                />
              </div>

              <div>
                <label className="font-mono text-[0.6rem] tracking-[2px] uppercase text-brand-slate block mb-2">
                  Mensaje *
                </label>
                <textarea name="message" required rows={5}
                  value={form.message} onChange={handleChange}
                  placeholder="Contanos tu idea, proyecto o consulta..."
                  className="w-full bg-bg3 border border-[rgba(201,153,58,0.15)] text-cream px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors duration-200 placeholder:text-brand-slate/40 resize-none"
                />
              </div>

              <button type="submit" disabled={status === 'loading'}
                className="btn-shine w-full font-mono text-[0.68rem] tracking-[3px] uppercase bg-gold text-bg py-4 border border-gold hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,153,58,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {status === 'loading' ? 'Enviando...' : 'Enviar mensaje →'}
              </button>
            </form>

          </div>
        </div>

        <div className="mt-12 font-mono text-[0.6rem] tracking-[2px] text-brand-slate uppercase">
          Neuquén Capital · Patagonia Argentina
        </div>

      </div>
    </section>
  )
}