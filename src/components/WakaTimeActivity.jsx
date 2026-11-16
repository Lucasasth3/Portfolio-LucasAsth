import { useEffect, useState } from 'react'

export default function WakaTimeActivity({ view = 'grade' }) {
  const [state, setState] = useState({ loading: true, data: null })
  useEffect(() => {
    fetch('/api/wakatime')
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => setState({ loading: false, data }))
      .catch(() => setState({ loading: false, data: null }))
  }, [])
  if (state.loading) return <p className="home-wakatime-status">Carregando atividade do WakaTime...</p>
  if (!state.data) return <p className="home-wakatime-status">Conecte a chave do WakaTime no deploy para exibir os dados públicos.</p>
  const languages = (state.data.languages || []).slice(0, 12)
  const total = state.data.human_readable_total || '—'
  if (view === 'slices') {
    return <div className="waka-slices"><div className="waka-total"><strong>{total}</strong><span>tempo total registrado</span></div><div className="waka-bar">{languages.map((language) => <span key={language.name} style={{ width: `${Math.max(language.percent || 0, 1)}%` }} title={`${language.name}: ${language.text}`} />)}</div><div className="waka-legend">{languages.map((language) => <div key={language.name}><i /> <strong>{language.name}</strong><span>{language.text}</span></div>)}</div></div>
  }
  return <div className="waka-grade"><div className="waka-summary"><div><strong>{total}</strong><span>tempo total</span></div><div><strong>{state.data.human_readable_daily_average || '—'}</strong><span>média diária</span></div><div><strong>{state.data.days_including_holidays || '—'}</strong><span>dias ativos</span></div><div><strong>{state.data.editors?.[0]?.name || 'VS Code'}</strong><span>editor principal</span></div></div><div className="waka-language-grid">{languages.map((language) => <article key={language.name}><div className="waka-ring" style={{ '--progress': `${language.percent || 0}%` }}><span>{Math.round(language.percent || 0)}%</span></div><strong>{language.name}</strong><span>{language.text}</span></article>)}</div></div>
}
