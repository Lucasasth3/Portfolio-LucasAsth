import { useEffect, useState } from 'react'

export default function WakaTimeActivity() {
  const [state, setState] = useState({ loading: true, data: null })
  useEffect(() => {
    fetch('/api/wakatime').then((r) => (r.ok ? r.json() : null)).then((data) => setState({ loading: false, data })).catch(() => setState({ loading: false, data: null }))
  }, [])
  if (state.loading) return <p className="home-wakatime-status">Carregando atividade do WakaTime…</p>
  if (!state.data) return <p className="home-wakatime-status">Os dados aparecerão aqui quando o histórico público do WakaTime estiver disponível.</p>
  return <div className="home-wakatime-widget"><strong>{state.data.human_readable_total || '—'}</strong><span>últimos 7 dias</span>{(state.data.languages || []).slice(0, 6).map((language) => <span key={language.name}>{language.name}: {language.text}</span>)}</div>
}
