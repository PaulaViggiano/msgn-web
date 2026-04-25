export default function MSGNLogo({ width = 140, className = '' }) {
  return (
    <img
      src="/logoMSGN_blanco.png"
      alt="MSGN · Marcos Galián"
      width={width}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}