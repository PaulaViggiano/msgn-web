import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body || {}

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ ok: false, error: 'Campos requeridos faltantes.' })
  }

  // Email a Marcos
  const { error: err1 } = await resend.emails.send({
    from:    'Web MSGN <director@msgn.com.ar>',
    to:      'director@msgn.com.ar',
    replyTo: email,
    subject: `[MSGN] ${subject || 'Nuevo contacto desde msgn.com.ar'}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#EDE8DF;padding:40px;border:1px solid rgba(201,153,58,0.2);">
        <h2 style="color:#C9993A;border-bottom:2px solid #C9993A;padding-bottom:12px;margin-bottom:24px;">
          MSGN · Nuevo mensaje desde msgn.com.ar
        </h2>
        <p style="margin-bottom:8px;"><strong style="color:#6B7A99;">Nombre:</strong> ${name}</p>
        <p style="margin-bottom:8px;"><strong style="color:#6B7A99;">Email:</strong>
          <a href="mailto:${email}" style="color:#C9993A;">${email}</a>
        </p>
        ${subject ? `<p style="margin-bottom:8px;"><strong style="color:#6B7A99;">Asunto:</strong> ${subject}</p>` : ''}
        <div style="margin-top:24px;padding:20px;background:#161B27;border-left:3px solid #C9993A;">
          <p style="color:#6B7A99;font-size:0.75rem;margin:0 0 10px;text-transform:uppercase;letter-spacing:1px;">Mensaje</p>
          <p style="margin:0;line-height:1.7;white-space:pre-wrap;">${message}</p>
        </div>
        <p style="margin-top:28px;color:#6B7A99;font-size:0.75rem;">
          Enviado desde msgn.com.ar · ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}
        </p>
      </div>
    `,
  })

  if (err1) {
    console.error('[MSGN] Error email a Marcos:', err1.message)
    return res.status(500).json({ ok: false, error: err1.message })
  }

  // Auto-respuesta al visitante
  const { error: err2 } = await resend.emails.send({
    from:    'Marcos Galián · MSGN <director@msgn.com.ar>',
    to:      email,
    subject: `Recibimos tu mensaje — MSGN`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#EDE8DF;padding:40px;border:1px solid rgba(201,153,58,0.2);">
        <h2 style="color:#C9993A;border-bottom:2px solid #C9993A;padding-bottom:12px;margin-bottom:24px;">MSGN</h2>
        <p>Hola <strong>${name.split(' ')[0]}</strong>,</p>
        <p style="color:#C8C0B0;line-height:1.7;margin-top:12px;">
          Gracias por escribirnos. Recibimos tu mensaje y nos ponemos en contacto a la brevedad.
        </p>
        <p style="color:#C8C0B0;line-height:1.7;margin-top:12px;">
          Si tu consulta es urgente podés escribirnos directamente por WhatsApp:
        </p>
        <div style="text-align:center;margin:28px 0;">
          <a href="https://wa.me/5492994567290"
            style="display:inline-block;background:#C9993A;color:#0D1117;text-decoration:none;padding:14px 36px;font-size:0.8rem;letter-spacing:2px;text-transform:uppercase;font-weight:600;">
            💬 WhatsApp
          </a>
        </div>
        <p style="color:#6B7A99;font-size:0.85rem;margin-top:32px;">
          — Marcos Galián<br/>
          <span style="font-size:0.75rem;">msgn.com.ar · Neuquén · Patagonia Argentina</span>
        </p>
      </div>
    `,
  })

  if (err2) {
    console.error('[MSGN] Error auto-respuesta:', err2.message)
    // No fallamos por esto — el mail principal ya se envió
  }

  return res.status(200).json({ ok: true })
}