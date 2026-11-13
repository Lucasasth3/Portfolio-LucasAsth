import { useLanguage } from '../contextoIdioma'
import PortfolioSection from './SecaoPortfolio'

const experiences = [
  {
    period: { en: "2026 — present", pt: "2026 — atual" },
    role: { en: "Project Lead", pt: "Líder de Projetos" },
    company: { en: "Student Software Consultancy · PUC Minas", pt: "Empresa Júnior de Software · PUC Minas" },
    description: { en: "I coordinate and track the team’s deliveries and contribute to software development.", pt: "Organizo e acompanho as entregas da equipe e participo do desenvolvimento de projetos de software." },
  },
  {
    period: { en: "Jul 2025 — present", pt: "Jul 2025 — atual" },
    role: { en: "Intern", pt: "Estagiário" },
    company: 'Axel Mendes Assessoria',
    description: { en: "I prepare reports and assist clients. I also help organize internal processes and automate administrative tasks.", pt: "Desenvolvo relatórios e atendo clientes. Também apoio a organização de procedimentos internos e automatizo tarefas administrativas." },
  },
  {
    period: { en: "Ongoing", pt: "Em andamento" },
    role: { en: "Freelance Web Developer", pt: "Desenvolvedor web freelancer" },
    company: { en: "Client and personal projects", pt: "Projetos para clientes e iniciativas pessoais" },
  },
]

function Experience() {
  const { language } = useLanguage()
  return (
    <PortfolioSection id="experience">
      <div className="portfolio-timeline">
        {experiences.map(({ role, company, period, description }) => (
          <article className="portfolio-entry" key={role.en}>
            <h3>{role[language] ?? role}</h3>
            <p className="entry-organization">{company[language] ?? company}</p>
            <p className="entry-period">{period[language] ?? period}</p>
            {description && <p>{description[language] ?? description}</p>}
          </article>
        ))}
      </div>
    </PortfolioSection>
  )
}

export default Experience
