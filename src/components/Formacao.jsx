import { useLanguage } from '../contextoIdioma'
import { Link } from 'react-router-dom'
import PortfolioSection from './SecaoPortfolio'
import { linkedInProfile } from '../data/perfil'

const subjects = [{ en: "Data structures", pt: "Estruturas de dados" }, { en: "Algorithms", pt: "Algoritmos" }, 'Java', 'Python', { en: "Web development", pt: "Desenvolvimento web" }, { en: "Git and GitHub", pt: "Git e GitHub" }]

function Education() {
  const { language, text } = useLanguage()
  return (
    <PortfolioSection id="education">
      <div className="portfolio-timeline">
        <article className="portfolio-entry">
          <h3>{text("Bachelor’s Degree in Software Engineering", "Bacharelado em Engenharia de Software")}</h3>
          <p className="entry-organization">Pontifícia Universidade Católica de Minas Gerais · PUC Minas</p>
          <p className="entry-period">{text("2026 – expected 2030", "2026 – previsão de conclusão em 2030")}</p>
          <ul className="tag-list">
            {subjects.map((subject) => <li key={subject.en ?? subject}>{subject[language] ?? subject}</li>)}
          </ul>
          <Link className="button button-secondary education-record-link" to="/education/grades">
            {text("View my grades", "Ver minhas notas")} <span aria-hidden="true">&#8594;</span>
          </Link>
        </article>
        <article className="portfolio-entry">
          <h3>{text("Power BI Fundamentals: Data Analysis and Dashboards", "Curso Básico de Power BI: Análise de Dados e Construção de Dashboards")}</h3>
          <p className="entry-organization">Easy Consultoria Júnior</p>
          <p className="entry-period">{text('Issued May 2026', 'Emitido em maio de 2026')}</p>
          <a className="button button-secondary education-record-link" href={linkedInProfile + 'details/certifications/'} target="_blank" rel="noreferrer">
            {text('View certifications on LinkedIn', 'Ver certificações no LinkedIn')} <span aria-hidden="true">↗</span>
          </a>
        </article>
      </div>
    </PortfolioSection>
  )
}

export default Education
