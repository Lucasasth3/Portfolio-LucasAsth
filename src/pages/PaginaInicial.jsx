import { Link } from 'react-router-dom'
import { useLanguage } from '../contextoIdioma'
import { githubProfile } from '../data/projetosGitHub'
import { linkedInProfile } from '../data/perfil'
import './PaginaInicial.css'

export default function HomePage() {
  const { text } = useLanguage()

  return (
    <main className="home-space" aria-labelledby="home-title">
      <div className="home-stars" aria-hidden="true">
        <span className="home-asteroid home-asteroid-one" />
        <span className="home-asteroid home-asteroid-two" />
        <span className="home-asteroid home-asteroid-three" />
      </div>
      <section className="home-space-hero">
        <div className="home-space-copy">
          <p className="home-space-kicker">{text('Software Engineer in training', 'Software Engineer em formação')}</p>
          <h1 id="home-title">{text('Ideas become software.', 'Ideias viram software.')}</h1>
          <p className="home-space-role">{text('Entrepreneurship, engineering and curiosity.', 'Empreendedorismo, engenharia e curiosidade.')}</p>
          <p className="home-space-description">{text('I build web experiences and APIs while learning how technology can turn real problems into useful products.', 'Construo experiências web e APIs enquanto aprendo como a tecnologia pode transformar problemas reais em produtos úteis.')}</p>
          <div className="home-space-actions">
            <a className="home-space-button home-space-button-primary" href="#about">{text('Discover my story', 'Conheça minha história')} <span aria-hidden="true">↓</span></a>
            <Link className="home-space-button home-space-button-secondary" to="/contact">{text('Contact me', 'Entre em contato')} <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="home-space-socials" aria-label={text('Social links', 'Links sociais')}>
            <a href={githubProfile} target="_blank" rel="noreferrer">GitHub</a>
            <a href={linkedInProfile} target="_blank" rel="noreferrer">LinkedIn</a>
            <Link to="/resume">{text('Resume', 'Currículo')}</Link>
          </div>
        </div>

        <div className="home-profile-card">
          <div className="home-profile-card-top">
            <span>PORTFOLIO / 2026</span>
            <span aria-hidden="true">✦</span>
          </div>
          <div className="home-photo-placeholder">
            <span>{text('Your photo', 'Sua foto')}</span>
            <small>240 × 300</small>
          </div>
          <div className="home-profile-card-bottom">
            <strong>Lucas Asth</strong>
            <span>{text('Software Engineer', 'Software Engineer')}</span>
          </div>
        </div>
      </section>

      <section className="home-space-note" id="about" aria-labelledby="about-title">
        <p className="home-space-kicker">01 / {text('About the builder', 'Sobre quem constrói')}</p>
        <h2 id="about-title">{text('I like the beginning of things: the question, the sketch and the first working version.', 'Gosto do começo das coisas: da pergunta, do rascunho e da primeira versão funcionando.')}</h2>
      </section>
    </main>
  )
}
