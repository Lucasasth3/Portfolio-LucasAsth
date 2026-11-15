import { Link } from 'react-router-dom'
import { useLanguage } from '../contextoIdioma'
import { socialLinks } from '../data/perfil'
import Journey from './Jornada'
import './Jornada.css'

function Hero() {
  const { text } = useLanguage()
  const technologies = ['Java', 'JavaScript', 'React', 'Node.js', 'APIs REST', 'MongoDB']

  return (
    <section className="journey-home" id="home" aria-labelledby="hero-title">
      <div className="journey-intro">
        <p className="journey-kicker">Lucas Asth <span aria-hidden="true">/</span> {text('Software Engineer in training', 'Software Engineer em formação')}</p>
        <h1 id="hero-title">{text('Building useful software with curiosity and purpose.', 'Construindo software útil com curiosidade e propósito.')}</h1>
        <p className="journey-description">{text('I am a Software Engineering student who learns by turning real problems into web applications, APIs and data-driven experiences.', 'Sou estudante de Engenharia de Software e aprendo transformando problemas reais em aplicações web, APIs e experiências orientadas por dados.')}</p>
        <p className="journey-instructions">{text('Explore my journey, the technologies I use and the projects that shaped my next step.', 'Explore minha jornada, as tecnologias que estudo e os projetos que construíram meu próximo passo.')}</p>
        <div className="journey-actions">
          <Link className="button button-primary" to="/#projects">{text('Explore projects', 'Explorar projetos')}</Link>
          <Link className="button button-secondary" to="/resume">{text('Resume', 'Currículo')}</Link>
          <Link className="button button-secondary" to="/contact">{text('Contact', 'Contato')}</Link>
        </div>
        <div className="journey-social">
          {socialLinks.map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer">{label} <span aria-hidden="true">↗</span></a>
          ))}
        </div>
        <ul className="hero-tech-list" aria-label={text('Technologies', 'Tecnologias')}>
          {technologies.map(technology => <li key={technology}>{technology}</li>)}
        </ul>
      </div>
      <Journey />
    </section>
  )
}

export default Hero
