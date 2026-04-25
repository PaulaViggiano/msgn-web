
const PROJECTS = [
  {
    id: '01',
    category: 'Construcción · Infraestructura · Patagonia',
    title: 'Edifica Neuquén',
    desc: 'La exposición de construcción más importante de la Patagonia. Declarada de interés legislativo por la Cámara de Diputados. Presencia del MIT y organismos internacionales. Tendencia en redes durante 3 días consecutivos. Rondas de negocios público-privadas.',
    stats: [
      { val: '+45K', label: 'Visitantes' },
      { val: '130+', label: 'Expositores' },
      { val: '2 ed.', label: 'Ediciones'  },
    ],
    institutional: 'MIT · Cámara de Diputados de Neuquén · Organismos internacionales · Cámaras binacionales',
    featured: true,
    // image: '/images/edifica.jpg',
  },
  {
    id: '02',
    category: 'Tecnología · Inteligencia Artificial',
    title: 'IA Week Neuquén 2026',
    desc: 'Primer gran evento de IA de la Patagonia. Polo Tecnológico. Speakers como Santi Siri y Freddy Vivas. Productor general y comercializador del evento.',
    image: '/images/ia-week.jpg',
  },
  {
    id: '03',
    category: 'Energía · Internacional',
    title: 'Oil & Gas · AOG Australia',
    desc: 'Presencia en el evento de oil & gas más importante de Australia. Expansión de la red de vínculos hacia el ecosistema energético internacional.',
    // image: '/images/aog.jpg',
  },
]

function Placeholder() {
  return (
    <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-bg3 to-bg2 border border-[rgba(201,153,58,0.1)] relative overflow-hidden mb-5">
      <span className="font-mono text-[0.58rem] tracking-[3px] uppercase text-brand-slate/40">
        Imagen próximamente
      </span>
    </div>
  )
}

function FeaturedCard({ proj }) {
  return (
    <div className="proj-card relative bg-bg3 col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-12 md:p-14 hover:bg-[#1e2538] transition-all duration-400 overflow-hidden reveal">
      <span className="absolute top-6 right-7 font-playfair text-5xl font-black text-gold/[0.08] leading-none select-none">
        {proj.id}
      </span>

      <div>
        <div className="font-mono text-[0.58rem] tracking-[3px] uppercase text-gold mb-5">
          {proj.category}
        </div>
        <h3 className="font-playfair text-[2.2rem] font-bold text-off-white leading-[1.15] mb-3.5">
          {proj.title}
        </h3>
        <p className="text-[0.95rem] text-brand-slate leading-[1.75]">{proj.desc}</p>
      </div>

      <div>
        {proj.image
          ? <img src={proj.image} alt={proj.title} className="w-full h-48 object-cover mb-7" />
          : <Placeholder />
        }
        <div className="flex gap-6 pt-5 border-t border-[rgba(201,153,58,0.12)]">
          {proj.stats?.map(s => (
            <div key={s.label} className="text-center">
              <span className="font-playfair text-2xl font-extrabold text-gold block leading-none">{s.val}</span>
              <span className="font-mono text-[0.56rem] tracking-[1px] text-brand-slate uppercase mt-1 block">{s.label}</span>
            </div>
          ))}
        </div>
        {proj.institutional && (
          <div className="mt-7 p-5 border border-[rgba(201,153,58,0.12)] bg-[rgba(201,153,58,0.04)]">
            <div className="font-mono text-[0.58rem] tracking-[2px] uppercase text-gold mb-2">Presencia institucional</div>
            <div className="text-[0.85rem] text-cream2 leading-[1.7]">{proj.institutional}</div>
          </div>
        )}
      </div>
    </div>
  )
}

function SmallCard({ proj, delay }) {
  return (
    <div className={`proj-card reveal reveal-d${delay} relative bg-bg3 p-9 hover:bg-[#1e2538] transition-all duration-400 overflow-hidden`}>
      <span className="absolute top-6 right-7 font-playfair text-5xl font-black text-gold/[0.08] leading-none select-none">
        {proj.id}
      </span>
      {proj.image
        ? <img src={proj.image} alt={proj.title} className="w-full h-40 object-cover mb-5" />
        : <Placeholder />
      }
      <div className="font-mono text-[0.58rem] tracking-[3px] uppercase text-gold mb-5">{proj.category}</div>
      <h3 className="font-playfair text-[1.45rem] font-bold text-off-white leading-[1.15] mb-3.5">{proj.title}</h3>
      <p className="text-[0.87rem] text-brand-slate leading-[1.75]">{proj.desc}</p>
    </div>
  )
}

export default function Portfolio() {
  const [featured, ...rest] = PROJECTS

  return (
    <section id="portfolio" className="relative z-10 py-[110px] px-9 md:px-[4.5rem] bg-bg2">

      <div className="reveal">
        <div className="flex items-center gap-3.5 mb-5 font-mono text-[0.62rem] tracking-[4px] uppercase text-gold">
          <span className="w-7 h-px bg-gold block" />
          Portfolio
        </div>
        <h2 className="font-playfair font-extrabold leading-[1.05] text-off-white"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
          Proyectos que <em className="italic text-gold">hablan solos</em>
        </h2>
        <p className="text-base text-brand-slate leading-[1.85] max-w-[560px] mt-4">
          Cada proyecto es una historia de vinculación, comunicación e impacto real en la región.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0.5 mt-16">
        <FeaturedCard proj={featured} />
        {rest.map((proj, i) => (
          <SmallCard key={proj.id} proj={proj} delay={i + 1} />
        ))}
      </div>

    </section>
  )
}