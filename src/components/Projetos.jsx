import { useLanguage } from '../contextoIdioma'
import PortfolioSection from './SecaoPortfolio'
import GitHubProjects from './ProjetosGitHub'
import { repositoryUrl } from '../data/projetosGitHub'

const projects = [
  {
    title: 'Uai, Adota!',
    id: 'uai-adota',
    repository: 'Site-Final',
    description: { en: "A pet adoption platform for Belo Horizonte. An interactive map shows available pets and the organization caring for each animal.", pt: "Plataforma de adoção de animais em Belo Horizonte. Um mapa interativo mostra os pets disponíveis e as informações da ONG responsável por cada animal." },
    technologies: ['JavaScript', 'Mapbox API', 'JSON Server'],
  },
  {
    title: { en: "Movie Catalog", pt: "Catálogo de Filmes" },
    id: 'catalogo-filmes',
    description: { en: "A web app that searches the TMDB API for movies by title and displays their posters, ratings, and synopses.", pt: "Aplicação que consulta a API do TMDB e permite buscar filmes pelo título. Os resultados exibem pôster, nota e sinopse." },
    technologies: ['JavaScript', 'HTML', 'CSS', 'TMDB API'],
  },
]

function Projects() {
  const { language, text } = useLanguage()
  return (
    <PortfolioSection id="projects">
      <div className="project-list">
        {projects.map(({ id, title, description, technologies, repository }) => (
          <article className="portfolio-entry project-feature" key={id}>
            <div className={'project-cover project-cover--' + id} aria-hidden="true"><span /></div>
            <div className="project-details">
              <h3>{title[language] ?? title}</h3>
              <p>{description[language]}</p>
              <ul className="tag-list">
                {technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              {repository && (
                <a className="project-source" href={repositoryUrl(repository)} target="_blank" rel="noreferrer">
                  {text('View source on GitHub', 'Ver código no GitHub')} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <GitHubProjects />
    </PortfolioSection>
  )
}

export default Projects
