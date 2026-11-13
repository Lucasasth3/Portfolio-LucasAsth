import { useLanguage } from '../languageContext'
import PortfolioSection from './PortfolioSection'

const skillGroups = [
  { title: { en: "Languages", pt: "Linguagens" }, items: ['Java', 'JavaScript', 'Python'] },
  { title: { en: "Web development", pt: "Desenvolvimento web" }, items: ['HTML', 'CSS', 'React', 'Node.js', 'NestJS', 'Django', { en: "REST APIs", pt: "APIs REST" }] },
  { title: { en: "Data", pt: "Dados" }, items: ['SQL', 'MongoDB', 'Power BI'] },
  { title: { en: "Tools", pt: "Ferramentas" }, items: ['Git', 'GitHub'] },
]

function Skills() {
  const { language, text } = useLanguage()
  return (
    <PortfolioSection id="skills" description={text("Technologies I use in coursework and projects", "Tecnologias que uso em estudos e projetos")}>
      <div className="skill-rows">
        {skillGroups.map(({ title, items }) => (
          <div className="skill-row" key={title.en}>
            <h3>{title[language]}</h3>
            <ul className="tag-list">
              {items.map((item) => <li key={item.en ?? item}>{item[language] ?? item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </PortfolioSection>
  )
}

export default Skills
