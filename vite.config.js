import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import snapshot from './src/data/wakatimeSnapshot.json' with { type: 'json' }
import { createWakaTimeService } from './server/wakatime.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const getStats = createWakaTimeService({ env, initialCache: snapshot })
  const middleware = (request, response, next) => {
    if (request.url?.split('?')[0] !== '/api/wakatime') return next()
    response.setHeader('Content-Type', 'application/json; charset=utf-8')
    response.setHeader('Cache-Control', 'no-store')
    if (request.method !== 'GET') {
      response.statusCode = 405
      response.setHeader('Allow', 'GET')
      return response.end(JSON.stringify({ error: 'Method not allowed' }))
    }
    getStats().then(data => response.end(JSON.stringify(data)))
  }
  return {
    plugins: [react(), {
      name: 'wakatime-local',
      configureServer(server) { server.middlewares.use(middleware) },
      configurePreviewServer(server) { server.middlewares.use(middleware) },
    }],
  }
})
