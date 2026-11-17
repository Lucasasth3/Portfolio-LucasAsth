import { createWakaTimeService } from '../server/wakatime.js'

import snapshot from '../src/data/wakatimeSnapshot.json' with { type: 'json' }

const getStats = createWakaTimeService({ initialCache: snapshot })

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'Method not allowed' })
  }
  return response.status(200).json(await getStats())
}
