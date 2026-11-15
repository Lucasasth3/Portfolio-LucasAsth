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

      <section className="home-about" id="about" aria-labelledby="about-title">
        <div className="home-about-heading">
          <p className="home-space-kicker">01 / {text('About me', 'Sobre mim')}</p>
          <h2 id="about-title">{text('Hi, I’m Lucas.', 'Oi, eu sou o Lucas.')}</h2>
          <p className="home-about-signature">{text('Software Engineer in training · Entrepreneur at heart', 'Software Engineer em formação · Empreendedor por natureza')}</p>
        </div>

        <div className="home-about-visual" tabIndex="0" aria-label={text('Hover to see the illustrated version', 'Passe o mouse para ver a versão ilustrada')}>
          <div className="home-about-image home-about-image-photo"><span>{text('Your professional photo', 'Sua foto profissional')}</span></div>
          <div className="home-about-image home-about-image-drawing" aria-hidden="true"><span>{text('Illustrated version', 'Versão ilustrada')}</span></div>
          <span className="home-about-hint">{text('Hover me', 'Passe o mouse')}</span>
        </div>

        <div className="home-about-copy">
          <p>{text('I am a Software Engineering student at PUC Minas with practical experience building web applications, REST APIs and data solutions. My path started with entrepreneurship: I learned by testing ideas, talking to people and turning small opportunities into something real.', 'Sou estudante de Engenharia de Software na PUC Minas, com experiência prática construindo aplicações web, APIs REST e soluções com dados. Minha trajetória começou pelo empreendedorismo: aprendi testando ideias, conversando com pessoas e transformando pequenas oportunidades em algo real.')}</p>
          <p>{text('Today I combine that business curiosity with software engineering. I like understanding the reason behind a product, organizing the work and building a first version that can be improved with feedback.', 'Hoje uno essa curiosidade de negócio à engenharia de software. Gosto de entender o motivo por trás de um produto, organizar o trabalho e construir uma primeira versão que possa evoluir com feedback.')}</p>
          <Link className="home-space-button home-space-button-secondary" to="/experience">{text('See my experience', 'Ver minha experiência')} <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="home-space-note" id="principles" aria-labelledby="principles-title">
        <p className="home-space-kicker">01 / {text('About the builder', 'Sobre quem constrói')}</p>
        <h2 id="principles-title">{text('I like the beginning of things: the question, the sketch and the first working version.', 'Gosto do começo das coisas: da pergunta, do rascunho e da primeira versão funcionando.')}</h2>
      </section>
    </main>
  )
}
