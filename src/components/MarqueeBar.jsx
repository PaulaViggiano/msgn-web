const ITEMS = [
  'Edifica Neuquén',
  'IA Week 2026',
  'Oil & Gas · AOG Patagonia',
  '+500 proyectos',
  '+45.000 visitantes',
  'Comunicación · Marketing · Eventos',
  'Relaciones Institucionales',
  'Producción Integral',
]

const ALL_ITEMS = [...ITEMS, ...ITEMS]

export default function MarqueeBar() {
  return (
    <div className="py-[22px] bg-bg2 border-t border-b border-[rgba(201,153,58,0.12)] overflow-hidden relative z-10">
      <div className="marquee-track flex w-max animate-marquee">
        {ALL_ITEMS.map((text, i) => (
          <div key={i} className="flex items-center gap-8 px-10 whitespace-nowrap">
            <span className="font-mono text-[0.7rem] tracking-[3px] uppercase text-brand-slate">
              {text}
            </span>
            <span className="text-gold text-base">◆</span>
          </div>
        ))}
      </div>
    </div>
  )
}