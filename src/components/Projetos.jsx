import { useState } from 'react'
import { useLanguage } from '../contextoIdioma'
import GitHubProjects from './ProjetosGitHub'
import { githubProfile } from '../data/projetosGitHub'
import { projects } from '../data/projetos'
import { orderProjects, projectDate } from '../utils/projetos.js'
import './Projetos.css'

function ProjectIcon({ source = false }) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {source ? <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18" /></> : <><path d="M14 3h7v7m0-7L10 14" /><path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /></>}
  </svg>
}

function ProjectCover({ project, title }) {
  const [failedCover, setFailedCover] = useState(null)
  const showImage = project.cover && failedCover !== project.cover
  return <div className={`project-showcase-media project-showcase-media--${project.id}${showImage ? ' has-cover' : ''}`}>
    {showImage ? <img src={project.cover} alt={title} loading="lazy" decoding="async" onError={() => setFailedCover(project.cover)} /> : <div className="project-showcase-art" aria-hidden="true"><span className="project-art-orbit" /><span className="project-art-monogram">{project.initials}</span><span className="project-art-title">{title}</span></div>}
    <div className="project-media-caption" aria-hidden="true"><span>Lucas Asth</span><span>{project.id}</span></div>
  </div>
}

function Projects() {
  const { language, text } = useLanguage()
  return (
    <section className="projects-page" aria-labelledby="projects-title">
      <header className="projects-intro">
        <div><p className="projects-eyebrow">{text('Selected projects', 'Projetos selecionados')}</p><h1 id="projects-title">{text('Code in practice.', 'Código em prática.')}</h1></div>
        <div className="projects-intro-copy"><p>{text('Applications I have worked on, the ideas behind them and the tools I used to build them.', 'Aplicações em que trabalhei, as ideias por trás delas e as ferramentas que usei para construí-las.')}</p><a href={githubProfile} target="_blank" rel="noreferrer">{text('My GitHub', 'Meu GitHub')} <span aria-hidden="true">↗</span></a></div>
      </header>
      <ol className="project-showcase-list project-timeline">
        {orderProjects(projects).map(project => {
          const title = typeof project.title === 'string' ? project.title : project.title[language]
          const date = projectDate(project.startedAt)
          return <li className="project-timeline-item" key={project.id}>
            <p className="project-timeline-date">{date ? <time dateTime={project.startedAt}>{new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date)}</time> : text('Date to be confirmed', 'Data a confirmar')}</p>
            <article className="project-showcase" aria-labelledby={`project-${project.id}`}>
            <ProjectCover project={project} title={title} />
            <div className="project-showcase-content">
              <p className="project-showcase-category">{project.category[language]}</p>
              <h2 id={`project-${project.id}`}>{title}</h2>
              <p className="project-showcase-description">{project.description[language]}</p>
              <ul className="project-showcase-stack" aria-label={text('Technologies used', 'Tecnologias utilizadas')}>{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
              {(project.website || project.github || project.privateRepository) && <div className="project-showcase-actions">
                {project.website && <a className="project-action project-action-primary" href={project.website} target="_blank" rel="noreferrer" aria-label={`${text('Visit website', 'Acessar site')}: ${title}`}><ProjectIcon />{text('Visit website', 'Acessar site')}</a>}
                {project.github && !project.privateRepository && <a className="project-action" href={project.github} target="_blank" rel="noreferrer" aria-label={`${text('Source code', 'Código no GitHub')}: ${title}`}><ProjectIcon source />{text('Source code', 'Código no GitHub')}</a>}
                {project.privateRepository && <span className="project-private"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>{text('Private repository', 'Repositório privado')}</span>}
              </div>}
            </div>
          </article></li>
        })}
      </ol>
      <div className="projects-more"><GitHubProjects /></div>
    </section>
  )
}

export default Projects
