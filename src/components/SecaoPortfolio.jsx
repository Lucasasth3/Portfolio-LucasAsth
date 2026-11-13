import { useLanguage } from '../contextoIdioma'
import { homeSections } from '../data/perfil'

export default function PortfolioSection({ id, description, children }) {
  const { language } = useLanguage()
  const { number, title } = homeSections.find((section) => section.id === id)

  return (
    <section className="portfolio-section" id={id} aria-labelledby={id + '-title'}>
      <header className="section-heading">
        <span className="section-index" aria-hidden="true">{number}</span>
        <h2 id={id + '-title'}>{title[language]}</h2>
        {description && <p>{description}</p>}
      </header>
      <div className="section-body">{children}</div>
    </section>
  )
}
