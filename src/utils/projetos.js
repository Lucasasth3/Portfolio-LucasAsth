export function projectDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const date = new Date(`${value}T12:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null
}

export function orderProjects(projects) {
  return [...projects].sort((a, b) => {
    const first = projectDate(a.startedAt)?.getTime() ?? Infinity
    const second = projectDate(b.startedAt)?.getTime() ?? Infinity
    return first === second ? 0 : first - second
  })
}
