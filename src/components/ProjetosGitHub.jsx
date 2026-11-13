import { useEffect, useState } from 'react'
import { useLanguage } from '../contextoIdioma'
import { demoUrl, fetchRepositories, githubProfile, repositorySnapshot, repositoryUrl } from '../data/projetosGitHub'
import './ProjetosGitHub.css'

const projectLabels = {
  'finance-saas': {
    title: 'Finance SaaS',
    en: 'A personal finance app.',
    pt: 'Aplicação de controle financeiro pessoal.',
  },
  'dakcabeleireiro': { title: 'Dak Cabeleireiros' },
  'catalogo-produtos': { title: 'Product Catalog', ptTitle: 'Catálogo de Produtos' },
}

export default function GitHubProjects() {
  const { language, text } = useLanguage()
  const [repositories, setRepositories] = useState(repositorySnapshot)

  useEffect(() => {
    const controller = new AbortController()
    fetchRepositories(controller.signal).then(result => {
      if (!controller.signal.aborted) setRepositories(result)
    }).catch(() => {
      // Keep the last verified snapshot when GitHub is unavailable.
    })
    return () => controller.abort()
  }, [])

  return (
    <section className="github-projects" aria-labelledby="github-projects-heading">
      <div className="github-projects-heading">
        <h3 id="github-projects-heading">{text('GitHub repositories', 'Repositórios no GitHub')}</h3>
        <a href={githubProfile + '?tab=repositories'} target="_blank" rel="noreferrer">
          {text('View all on GitHub', 'Ver todos no GitHub')} <span aria-hidden="true">↗</span>
        </a>
      </div>
      {repositories.length > 0 && (
        <ul className="github-repository-list">
          {repositories.map(repository => {
            const label = projectLabels[repository.name.toLowerCase()]
            const title = (language === 'pt' ? label?.ptTitle : null) ?? label?.title ?? repository.name
            const description = label?.[language] ?? repository.description
            const demo = demoUrl(repository.homepage)
            return (
              <li key={repository.name}>
                <div>
                  <h4><a href={repositoryUrl(repository.name)} target="_blank" rel="noreferrer">{title}</a></h4>
                  {description && <p>{description}</p>}
                </div>
                <div className="github-repository-meta">
                  {repository.language && <span>{repository.language}</span>}
                  {demo && <a href={demo} target="_blank" rel="noreferrer">{text('Live site', 'Ver site')} <span aria-hidden="true">↗</span></a>}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
