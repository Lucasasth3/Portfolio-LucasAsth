import { Link } from 'react-router-dom'
import { useLanguage } from '../languageContext'
import { socialLinks } from '../data/profile'
import Journey from './Journey'
import './Journey.css'

function Hero() {
  const { text } = useLanguage()

  return (
    <section className="journey-home" id="home" aria-labelledby="hero-title">
      <div className="journey-intro">
        <p className="journey-kicker">Lucas Asth <span aria-hidden="true">/</span> {text('Belo Horizonte, Brazil', 'Belo Horizonte, Brasil')}</p>
        <h1 id="hero-title">{text('From selling sweets to writing code', 'De vender doces a escrever código')}</h1>
        <p className="journey-description">{text('I started selling sweets at school. At 15, I learned digital marketing and programming, then took on my first freelance projects.', 'Comecei vendendo doces na escola. Aos 15, aprendi marketing digital e programação e comecei a fazer meus primeiros freelas.')}</p>
        <p className="journey-instructions">{text('Follow my story in three scenes and choose what Lucas does next.', 'Acompanhe minha história em três cenas e escolha o que o Lucas faz a seguir.')}</p>
        <div className="journey-actions">
          <Link className="button button-secondary" to="/#projects">{text('Projects', 'Projetos')}</Link>
          <Link className="button button-secondary" to="/resume">{text('Résumé', 'Currículo')}</Link>
          <Link className="button button-secondary" to="/contact">{text('Contact', 'Contato')}</Link>
        </div>
        <div className="journey-social">
          {socialLinks.map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer">{label} <span aria-hidden="true">↗</span></a>
          ))}
        </div>
      </div>
      <Journey />
    </section>
  )
}

export default Hero
