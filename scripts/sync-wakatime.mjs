import { writeFile } from 'node:fs/promises'
import { loadEnv } from 'vite'
import { createWakaTimeService } from '../server/wakatime.js'

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
const result = await createWakaTimeService({ env })()
if (!result.data) {
  console.error('Não foi possível atualizar o WakaTime. Confira o token pessoal de leitura em .env.local.')
  process.exitCode = 1
} else {
  await writeFile(new URL('../src/data/wakatimeSnapshot.json', import.meta.url), `${JSON.stringify(result, null, 2)}\n`)
  console.log(`WakaTime atualizado: ${result.data.languages.length} linguagens, ${result.data.days_active} dias com código.`)
}
