const TTL = 6 * 60 * 60 * 1000
const ranges = new Set(['all_time', 'last_7_days', 'last_30_days', 'last_6_months', 'last_year'])

function publicStats(data) {
  if (!data || !Number.isFinite(data.total_seconds) || !Array.isArray(data.languages)) throw new Error('Invalid stats')
  const entries = (items = []) => items.filter(item => typeof item.name === 'string').map(({ name, total_seconds, percent, text }) => ({ name, total_seconds: Math.max(0, Number(total_seconds) || 0), percent: Math.max(0, Math.min(100, Number(percent) || 0)), text }))
  const total = data.total_seconds_including_other_language ?? data.total_seconds
  const activeDays = data.days_minus_holidays ?? data.days_active ?? 0
  const editors = new Map()
  for (const editor of entries(data.editors)) {
    const name = /vs\s?code|visual studio code/i.test(editor.name) ? 'VS Code' : editor.name
    const current = editors.get(name) || { name, total_seconds: 0, percent: 0 }
    current.total_seconds += editor.total_seconds
    current.percent += editor.percent
    editors.set(name, current)
  }
  return {
    total_seconds: total,
    daily_average: activeDays > 0 ? total / activeDays : data.daily_average_including_other_language ?? data.daily_average ?? 0,
    days_active: activeDays,
    days_including_holidays: data.days_including_holidays ?? 0,
    start: data.start ?? null, end: data.end ?? null,
    languages: entries(data.languages), editors: [...editors.values()].sort((a, b) => b.total_seconds - a.total_seconds),
  }
}

export function createWakaTimeService({ env = process.env, fetcher = fetch, now = Date.now, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)), initialCache = null } = {}) {
  let cache = initialCache
  let pending
  let nextAttempt = 0
  const range = ranges.has(env.WAKATIME_RANGE) ? env.WAKATIME_RANGE : 'all_time'
  if (cache?.range && cache.range !== range) cache = null
  let profileUrl = env.WAKATIME_USERNAME ? `https://wakatime.com/@${encodeURIComponent(env.WAKATIME_USERNAME)}` : cache?.profileUrl ?? null
  const fallback = status => ({ data: cache?.data ? publicStats(cache.data) : null, updatedAt: cache?.updatedAt ?? null, profileUrl, range, source: cache?.data ? 'cache' : 'empty', stale: Boolean(cache?.data), status })
  return async function getStats() {
    if (cache && now() - Date.parse(cache.updatedAt) < TTL) return { ...fallback('ok'), stale: false }
    if (pending) return pending
    if (now() < nextAttempt) return fallback('unavailable')
    const token = env.WAKATIME_ACCESS_TOKEN?.trim()
    const key = env.WAKATIME_API_KEY?.trim()
    const username = env.WAKATIME_USERNAME?.trim()
    if (!token && !key && !username) return fallback('not_configured')
    pending = (async () => {
      try {
        const user = token || !username ? 'current' : encodeURIComponent(username)
        const headers = token ? { Authorization: `Bearer ${token}` } : !username && key ? { Authorization: `Basic ${Buffer.from(key).toString('base64')}` } : {}
        for (let attempt = 0; attempt < 3; attempt++) {
          const response = await fetcher(`https://wakatime.com/api/v1/users/${user}/stats/${range}`, { headers, signal: AbortSignal.timeout(8000), redirect: 'error' })
          if (response.status === 202 || response.status === 429 || response.status >= 500) {
            if (attempt < 2) { await sleep(500 * 2 ** attempt); continue }
            throw new Error('Stats unavailable')
          }
          if (!response.ok) { nextAttempt = now() + 60000; return fallback(response.status === 403 || response.status === 401 ? 'authorization_required' : 'unavailable') }
          const body = await response.json()
          if (body.data?.is_up_to_date === false && !body.data?.languages?.length) {
            if (attempt < 2) { await sleep(500 * 2 ** attempt); continue }
            throw new Error('Stats processing')
          }
          const data = publicStats(body.data)
          const profile = body.data.username || body.data.user_id
          if (profile) profileUrl = `https://wakatime.com/@${encodeURIComponent(profile)}`
          cache = { data, updatedAt: new Date(now()).toISOString() }
          return { ...fallback('ok'), data, source: 'live', stale: false }
        }
      } catch {
        nextAttempt = now() + 60000
        return fallback('unavailable')
      }
    })()
    try { return await pending } finally { pending = null }
  }
}
