import WebCanvas from './WebCanvas'

export default function Connector() {
  return (
    <section id="conector" className="relative z-10 py-[110px] px-9 md:px-[4.5rem] bg-bg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        <div className="reveal">
          <div className="flex items-center gap-3.5 mb-5 font-mono text-[0.62rem] tracking-[4px] uppercase text-gold">
            <span className="w-7 h-px bg-gold block" />
            Quién es Marcos
          </div>
          <h2 className="font-playfair font-extrabold leading-[1.05] text-off-white"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
            El nexo que <em className="italic text-gold">activa resultados</em>
          </h2>
          <div className="mt-8 space-y-4">
            <p className="text-base text-cream2 leading-[1.9]">
              <strong className="text-off-white">Marcos Galián no es solo productor de eventos.</strong> Es el punto donde convergen el gobierno, los medios, el sector privado y las instituciones de Neuquén y la Patagonia.
            </p>
            <p className="text-base text-cream2 leading-[1.9]">
              Con más de 15 años construyendo relaciones reales en la región, MSGN puede hacer que cualquier proyecto encuentre el eco que necesita: el contacto correcto, el medio adecuado, el sponsor estratégico, el aval institucional.
            </p>
            <p className="text-base text-cream2 leading-[1.9]">
              Desde una exposición con 45.000 personas hasta una campaña de comunicación para una pyme local. Desde el Polo Tecnológico de Neuquén hasta <strong className="text-off-white">AOG en Australia</strong>. La escala cambia, el compromiso no.
            </p>
          </div>
        </div>

        <div className="reveal reveal-d1">
          <WebCanvas />
        </div>

      </div>
    </section>
  )
}