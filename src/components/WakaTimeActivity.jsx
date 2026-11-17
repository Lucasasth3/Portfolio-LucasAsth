import { useEffect, useState } from 'react'
import { useLanguage } from '../contextoIdioma'
import { technologyFor } from '../data/tecnologias'
import snapshot from '../data/wakatimeSnapshot.json'
import './WakaTimeActivity.css'

const CACHE_KEY = 'lucas-wakatime-v3'
const valid = value => value?.data && Number.isFinite(value.data.total_seconds) && Array.isArray(value.data.languages)
function readCache() {
  try {
    const value = JSON.parse(localStorage.getItem(CACHE_KEY))
    if (valid(value) && Date.parse(value.updatedAt) > Date.parse(snapshot.updatedAt)) return value
  } catch { /* O último registro local continua disponível sem armazenamento. */ }
  return valid(snapshot) ? { ...snapshot, source: 'cache' } : null
}
function duration(seconds) {
  if (!Number.isFinite(seconds)) return '—'
  const minutes = Math.floor(Math.max(0, seconds) / 60)
  const hours = Math.floor(minutes / 60)
  return hours ? `${hours} h ${minutes % 60} min` : `${minutes} min`
}
function groupLanguages(languages, text) {
  const sorted = [...languages].filter(item => item.total_seconds > 0).sort((a, b) => b.total_seconds - a.total_seconds)
  const main = sorted.slice(0, 11)
  const rest = sorted.slice(11)
  if (rest.length) main.push({ name: `${text('Others', 'Outras')} (${rest.length})`, total_seconds: rest.reduce((sum, item) => sum + item.total_seconds, 0), percent: rest.reduce((sum, item) => sum + item.percent, 0) })
  return main
}
export default function WakaTimeActivity({ view = 'grade' }) {
  const { text, language } = useLanguage()
  const [state, setState] = useState(() => ({ payload: readCache(), loading: true }))
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    const cached = readCache()
    fetch('/api/wakatime', { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Unavailable')))
      .then(payload => {
        if (controller.signal.aborted) return
        if (valid(payload)) {
          try { localStorage.setItem(CACHE_KEY, JSON.stringify(payload)) } catch { /* O armazenamento pode estar indisponível no modo privado. */ }
          setState({ payload, loading: false })
        } else setState({ payload: cached ? { ...cached, stale: true, source: 'cache' } : payload, loading: false })
      })
      .catch(() => { if (!controller.signal.aborted) setState({ payload: cached ? { ...cached, stale: true, source: 'cache' } : null, loading: false }) })
    return () => controller.abort()
  }, [attempt])
  const payload = state.payload
  const data = valid(payload) ? payload.data : null
  const languages = groupLanguages(data?.languages || [], text)
  const editor = data?.editors?.[0]
  const editorName = /vs\s?code|visual studio code/i.test(editor?.name || '') ? 'VS Code' : editor?.name
  const total = data ? duration(data.total_seconds) : '—'
  const average = data ? duration(data.daily_average) : '—'
  const locale = language === 'pt' ? 'pt-BR' : 'en-US'
  const percent = value => `${Number(value || 0).toLocaleString(locale, { maximumFractionDigits: 1 })}%`
  const start = data?.start ? new Date(data.start) : null
  return <section className="waka-view" aria-label={view === 'slices' ? 'WakaTime fatias' : 'WakaTime grade'} aria-busy={state.loading}>
    <header className="waka-heading"><h3>{view === 'slices' ? 'wakatime.fatias' : 'wakatime.grade'}</h3><span className="waka-source">{state.loading ? text('Updating…', 'Atualizando…') : data ? payload.stale ? text('Last available record', 'Último registro disponível') : payload.source === 'cache' ? text('Saved activity', 'Atividade salva') : text('Connected', 'Conectado') : text('Awaiting connection', 'Aguardando conexão')}</span></header>
    <div className="waka-profile">{start && !Number.isNaN(start.getTime()) && <span>{text('Since', 'Desde')} {start.toLocaleDateString(locale)} · </span>}{payload?.profileUrl && <a href={payload.profileUrl} target="_blank" rel="noreferrer">{text('My WakaTime profile', 'Meu perfil no WakaTime')} ↗</a>}{payload?.updatedAt && data && <span> · {text('Updated', 'Atualizado em')} {new Date(payload.updatedAt).toLocaleDateString(locale)}</span>}</div>
    {view === 'grade' ? <>
      <div className="waka-summary">
        <div><span>{text('Total time', 'Tempo total')}</span><strong>{total}</strong><small>{data ? `${data.languages.length} ${text('languages', 'linguagens')}` : text('Your coding activity', 'Sua atividade de código')}</small></div>
        <div><span>{text('Daily average', 'Média diária')}</span><strong>{average}</strong><small>{text('On coding days', 'Nos dias com código')}</small></div>
        <div><span>{text('Active days', 'Dias ativos')}</span><strong>{data?.days_active ?? '—'}</strong><small>{data ? `${text('Out of', 'De')} ${data.days_including_holidays} ${text('days', 'dias')}` : text('Days with recorded activity', 'Dias com atividade registrada')}</small></div>
        <div><span>{text('Editor', 'Editor')}</span><strong>{editorName || '—'}</strong><small>{editor ? `${percent(editor.percent)} ${text('of time', 'do tempo')}` : text('Your main workspace', 'Seu ambiente de trabalho')}</small></div>
      </div>
      {!!languages.length && <div className="waka-language-grid">{languages.map(item => { const tech = technologyFor(item.name); return <article key={item.name} style={{ '--language-color': tech.color }}><div className="waka-ring" style={{ '--progress': `${item.percent}%` }} aria-label={`${item.name}: ${percent(item.percent)}`}><span>{tech.icon ? <img src={`/icons/${tech.icon}.svg`} width="40" height="40" alt="" /> : <span aria-hidden="true">{item.name.startsWith('Out') ? '•••' : '〈/〉'}</span>}</span></div><strong>{item.name}</strong><span>{duration(item.total_seconds)}</span><small>{percent(item.percent)}</small></article> })}</div>}
    </> : <>
      <p className="waka-total"><strong>{total}</strong> {text('in total · average of', 'no total · média de')} <strong>{average}</strong> {text('per coding day', 'por dia de código')}</p>
      <div className="waka-bar" role="img" aria-label={languages.length ? languages.map(item => `${item.name}: ${percent(item.percent)}`).join(', ') : text('No activity recorded yet', 'Nenhuma atividade registrada ainda')}>{languages.map(item => <span key={item.name} style={{ width: `${item.percent}%`, background: technologyFor(item.name).color }} title={`${item.name}: ${duration(item.total_seconds)} (${percent(item.percent)})`} />)}</div>
      <div className="waka-legend">{languages.map(item => <div key={item.name}><i style={{ background: technologyFor(item.name).color }} /><strong>{item.name}</strong><span>{duration(item.total_seconds)}</span></div>)}</div>
    </>}
    {!data && <div className="waka-empty" role="status"><strong>{text('Every hour starts with a first line.', 'Cada hora começa com uma primeira linha.')}</strong><p>{text('Coding activity will appear here once connected. Saved records remain available if the connection drops.', 'Sua atividade aparecerá aqui quando a conexão estiver pronta. Os registros salvos continuam disponíveis se a conexão cair.')}</p></div>}
    {data?.total_seconds === 0 && <p role="status">{text('No activity recorded in this period.', 'Nenhuma atividade registrada neste período.')}</p>}
    <div className="waka-bottom"><span>{text('Source: WakaTime', 'Fonte: WakaTime')} · {payload?.range === 'all_time' ? text('All time', 'Todo o período') : payload?.range || text('All time', 'Todo o período')}</span><button type="button" disabled={state.loading} onClick={() => { setState(current => ({ ...current, loading: true })); setAttempt(value => value + 1) }}>{text('Refresh', 'Atualizar')}</button></div>
  </section>
}
