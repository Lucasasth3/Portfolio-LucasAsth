export const githubUser = 'Lucasasth3'
export const githubProfile = 'https://github.com/' + githubUser

export const repositorySnapshot = [
  {
    "name": "catalogo-produtos",
    "description": null,
    "language": "JavaScript",
    "homepage": null
  },
  {
    "name": "Dakcabeleireiro",
    "description": null,
    "language": "TypeScript",
    "homepage": "https://dakcabeleireiros.vercel.app"
  },
  {
    "name": "diaw",
    "description": null,
    "language": "JavaScript",
    "homepage": null
  },
  {
    "name": "finance-saas",
    "description": "SaaS de controle financeiro pessoal",
    "language": "JavaScript",
    "homepage": null
  },
  {
    "name": "lab-spring-mvc-concluido",
    "description": null,
    "language": "Java",
    "homepage": null
  },
  {
    "name": "project",
    "description": null,
    "language": null,
    "homepage": null
  },
  {
    "name": "projeto-sprint-1",
    "description": "json public",
    "language": null,
    "homepage": null
  }
]

export async function fetchRepositories(signal) {
  const repositories = []
  const excluded = new Set([githubUser.toLowerCase(), 'portfolio-lucasasth', 'site-final'])
  const pageSize = 100

  for (let page = 1; ; page += 1) {
    const url = new URL('https://api.github.com/users/' + githubUser + '/repos')
    url.search = new URLSearchParams({ sort: 'updated', per_page: pageSize, page }).toString()
    const response = await fetch(url, { signal })
    if (!response.ok) throw new Error('GitHub request failed: ' + response.status)

    const results = await response.json()
    if (!Array.isArray(results)) throw new Error('Invalid GitHub response')
    repositories.push(...results.filter(repo => !repo.fork && !repo.archived && !excluded.has(repo.name.toLowerCase())))

    if (results.length < pageSize) return repositories
  }
}

export function repositoryUrl(name) {
  return githubProfile + '/' + encodeURIComponent(name)
}

export function demoUrl(homepage) {
  if (!homepage) return null
  try {
    const url = new URL(homepage)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null
  } catch {
    return null
  }
}
