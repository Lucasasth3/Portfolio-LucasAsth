export default async function handler(request, response) {
  if (request.method !== 'GET') return response.status(405).json({ error: 'Method not allowed' })
  const apiKey = process.env.WAKATIME_API_KEY
  if (!apiKey) return response.status(503).json({ error: 'WakaTime is not configured yet' })
  try {
    const upstream = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
      headers: { Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}` },
    })
    return response.status(upstream.status).json(await upstream.json())
  } catch {
    return response.status(502).json({ error: 'Could not reach WakaTime' })
  }
}
