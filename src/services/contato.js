export function getWhatsAppLink(value = '') {
  const number = value.replace(/\D/g, '')
  return /^[1-9]\d{9,14}$/.test(number) ? `https://wa.me/${number}` : ''
}

export async function sendContact(form, { endpoint, fetcher = fetch } = {}) {
  if (!endpoint?.trim()) throw new Error('not_configured')
  const payload = new FormData()
  const limits = { name: 120, email: 254, subject: 140, message: 1500 }
  for (const [key, limit] of Object.entries(limits)) {
    const value = String(form.get(key) || '').trim()
    if (!value || value.length > limit) throw new Error('invalid_form')
    payload.append(key, value)
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.get('email'))) throw new Error('invalid_form')
  payload.append('_replyto', payload.get('email'))
  const response = await fetcher(endpoint.trim(), {
    method: 'POST', body: payload, headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error('send_failed')
}
