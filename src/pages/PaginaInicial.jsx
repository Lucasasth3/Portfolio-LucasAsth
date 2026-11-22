import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contextoIdioma'
import { githubProfile } from '../data/projetosGitHub'
import { linkedInProfile } from '../data/perfil'
import './PaginaInicial.css'
import './HomeFooter.css'
import WakaTimeActivity from '../components/WakaTimeActivity'
import SkillsGlobe from '../components/SkillsGlobe'
import RetratoInterativo from '../components/RetratoInterativo'
import SocialLogo from '../components/LogoSocial'

export default function HomePage() {
  const { text } = useLanguage()
  const [skillTab, setSkillTab] = useState('grade')

  return (
    <div className="home-space" aria-labelledby="home-title">
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
            <img src="/images/lucas.png" alt="Lucas Asth" />
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

        <RetratoInterativo />

        <div className="home-about-copy">
          <p>{text('I am a Software Engineering student at ', 'Sou estudante de Engenharia de Software na ')}<strong>PUC Minas</strong>{text(', based in Belo Horizonte, Brazil. I build web applications, REST APIs and automations, with an interest in both how a system works and how people use it in their daily lives.', ', em Belo Horizonte. Desenvolvo aplicações web, APIs REST e automações, com interesse tanto no funcionamento dos sistemas quanto na forma como as pessoas os utilizam no dia a dia.')}</p>
          <p>{text('I have been exploring entrepreneurship since ', 'Minha relação com o empreendedorismo começou em ')}<strong>2023</strong>{text('. Testing ideas, talking to clients and negotiating taught me to look at a business before proposing a solution. That experience shapes how I approach development: I want to understand the problem, who faces it and what needs to change.', '. Testar ideias, conversar com clientes e negociar me ensinou a olhar para o negócio antes de propor uma solução. Levo essa experiência para o desenvolvimento: gosto de entender o problema, quem convive com ele e o que precisa mudar.')}</p>
          <p>{text('At ', 'Na ')}<strong>Axel Mendes Assessoria</strong>{text(', I work with the ', ', trabalho com a ')}<strong>{text('official WhatsApp API and CRM solutions for clients', 'API oficial do WhatsApp e soluções de CRM para clientes')}</strong>{text('. I also lead client meetings to explain proposals, answer questions and guide contract signing. This combination of technical work and direct client contact has strengthened my communication and relationship-building skills. I value listening carefully, explaining solutions clearly and building trust throughout the process.', '. Também conduzo reuniões para apresentar propostas, esclarecer dúvidas e acompanhar a assinatura de contratos. Essa combinação de atuação técnica e contato direto com clientes fortalece minha comunicação e minha capacidade de construir relacionamentos. Valorizo a escuta, a clareza ao explicar soluções e a confiança em cada etapa do atendimento.')}</p>
          <p>{text('Since October 2025, I have also worked on ', 'Desde outubro de 2025, também desenvolvo ')}<strong>{text('freelance websites, APIs and automations', 'sites, APIs e automações como freelancer')}</strong>{text(' for local businesses. I like following a project from the initial conversation through implementation, listening to feedback and adjusting what was built to the client’s needs.', ' para comércios locais. Gosto de acompanhar o projeto desde a conversa inicial até a implementação, ouvir o retorno de quem usa e ajustar o que foi construído às necessidades do cliente.')}</p>
          <p>{text('My academic projects include ', 'Nos projetos acadêmicos, participei do ')}<strong>Uai, Adota!</strong>{text(' and ', ' e do ')}<strong>DoAção</strong>{text(', focused on pet adoption and blood donation. I also worked on CalculaDOR, a business management system, and CosmoMind, an educational game in Python. These projects have given me practice with interfaces, data and teamwork. I want to keep building that experience and take part in developing products from the first idea through the improvements that follow their release.', ', voltados à adoção de animais e à doação de sangue. Também trabalhei no CalculaDOR, um sistema de gestão comercial, e no CosmoMind, um jogo educativo em Python. São experiências que me permitem praticar interfaces, dados e trabalho em equipe. Quero continuar aprofundando essa base e participar da construção de produtos, da primeira ideia às melhorias depois da entrega.')}</p>
          <Link className="home-space-button home-space-button-secondary" to="/experience">{text('See my experience', 'Ver minha experiência')} <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="home-journey" id="journey" aria-labelledby="journey-title">
        <div className="home-section-heading">
          <p className="home-space-kicker">02 / {text('Education and achievements', 'Formação e conquistas')}</p>
          <h2 id="journey-title">{text('The work behind the ideas.', 'O trabalho por trás das ideias.')}</h2>
        </div>

        <div className="home-journey-grid">
          <article className="home-journey-column">
            <h3>{text('Education', 'Educação')}</h3>
            <div className="home-timeline-card">
              <strong>Colégio Marista Dom Silvério</strong>
              <span>{text('Early education through high school', 'Da educação infantil ao ensino médio')}</span>
              <small>{text('2010 — 2025', '2010 — 2025')}</small>
            </div>
            <div className="home-timeline-card">
              <strong>PUC Minas</strong>
              <span>{text('Software Engineering', 'Engenharia de Software')}</span>
              <small>{text('Feb 2026 — Present', 'Fev 2026 — Atual')}</small>
            </div>
          </article>

          <article className="home-journey-column">
            <h3>{text('Experience', 'Experiência')}</h3>
            <div className="home-timeline-card">
              <strong>Axel Mendes</strong>
              <span>{text('Sales, entrepreneurship, web development, APIs and WhatsApp messaging automation', 'Vendas, empreendedorismo, desenvolvimento web, APIs e disparos com WhatsApp')}</span>
              <small>{text('2025 — Present', '2025 — Presente')}</small>
            </div>
            <div className="home-timeline-card">
              <strong>{text('Freelance projects', 'Projetos freelance')}</strong>
              <span>{text('Websites, APIs and automation for local businesses', 'Sites, APIs e automações para comércios locais')}</span>
              <small>{text('Oct 2025 — Present', 'Out 2025 — Atual')}</small>
            </div>
          </article>
        </div>

        <div className="home-achievement-grid">
          <div className="home-achievement-card"><strong>7+</strong><span>{text('projects explored', 'projetos explorados')}</span></div>
          <div className="home-achievement-card"><strong>02</strong><span>{text('certificates', 'certificados')}</span></div>
          <div className="home-achievement-card"><strong>2023</strong><span>{text('entrepreneurship since', 'empreendendo desde')}</span></div>
        </div>
      </section>

      <section className="home-music" id="music" aria-labelledby="music-title">
        <div className="home-music-copy">
          <p className="home-space-kicker">03 / {text('A little music', 'Um pouco de música')}</p>
          <h2 id="music-title">{text('Music for ideas. Ideas for software.', 'Música para ideias. Ideias para software.')}</h2>
          <p>{text('Music follows me while I study, build products and turn new ideas into something real. This is a small window into what I listen to while creating.', 'A música me acompanha enquanto estudo, construo produtos e transformo novas ideias em algo real. Esta é uma pequena janela para o que escuto enquanto crio.')}</p>
          <a className="home-space-button home-space-button-secondary" href="https://open.spotify.com" target="_blank" rel="noreferrer">{text('Open my Spotify', 'Abrir meu Spotify')} <span aria-hidden="true">↗</span></a>
        </div>
        <div className="home-music-player">
          <iframe title={text('Lucas playlist on Spotify', 'Playlist do Lucas no Spotify')} src="https://open.spotify.com/embed/playlist/7r9JJq4hY9WSLxOzHUgcOk?utm_source=generator&theme=0" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
        </div>
      </section>

      <section className="home-explore" id="skills" aria-labelledby="explore-title">
        <div className="home-section-heading">
          <p className="home-space-kicker">04 / {text('Explore the portfolio', 'Explore o portfólio')}</p>
          <h2 id="explore-title">{text('A map of what I build and keep learning.', 'Um mapa do que construo e continuo aprendendo.')}</h2>
        </div>

        <nav className="home-explore-links" aria-label={text('Portfolio sections', 'Seções do portfólio')}>
          <Link to="/resume">{text('Resume', 'Currículo')} <span>↗</span></Link>
          <Link to="/projects">{text('Projects', 'Projetos')} <span>↗</span></Link>
          <Link to="/experience">{text('Experience', 'Experiência')} <span>↗</span></Link>
          <Link to="/education">{text('Education', 'Formação')} <span>↗</span></Link>
          <Link to="/contact">{text('Contact', 'Contato')} <span>↗</span></Link>
        </nav>

        <div className="home-skills-panel">
          <div className="home-skills-header">
            <span>SKILLS / WAKATIME</span>
            <small>{text('Based on projects and current studies', 'Baseado nos projetos e estudos atuais')}</small>
          </div>
          <div className="home-skills-tabs" role="tablist" aria-label={text('Skills views', 'Visões das habilidades')}>
            {[
              ['grade', text('Language grade', 'Grade de linguagens')],
              ['slices', text('Time slices', 'Fatias do tempo')],
              ['globe', text('Skill globe', 'Globo de habilidades')],
            ].map(([value, label]) => (
              <button type="button" role="tab" id={`skills-tab-${value}`} aria-controls="skills-panel" tabIndex={skillTab === value ? 0 : -1} onKeyDown={event => { const values = ['grade', 'slices', 'globe']; const index = values.indexOf(value); const next = event.key === 'ArrowRight' ? values[(index + 1) % 3] : event.key === 'ArrowLeft' ? values[(index + 2) % 3] : event.key === 'Home' ? values[0] : event.key === 'End' ? values[2] : null; if (next) { event.preventDefault(); setSkillTab(next); document.getElementById(`skills-tab-${next}`)?.focus() } }} aria-selected={skillTab === value} className={skillTab === value ? 'is-active' : ''} onClick={() => setSkillTab(value)} key={value}>{label}</button>
            ))}
          </div>
          <div id="skills-panel" role="tabpanel" aria-labelledby={`skills-tab-${skillTab}`} tabIndex="0">
            {skillTab === 'globe' ? <SkillsGlobe /> : <WakaTimeActivity view={skillTab} />}
          </div>
          <p className="home-skills-note">{text('My tools, studies and time spent building software.', 'Minhas ferramentas, estudos e o tempo dedicado a construir software.')}</p>
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-footer-brand">
          <strong><span aria-hidden="true">›_</span> Lucas Asth</strong>
          <p>Construindo experiências web com curiosidade, código e propósito.</p>
        </div>
        <div className="home-footer-navigation">
          <h3>NAVEGAÇÃO</h3>
          <Link to="/">Página inicial</Link>
          <a href="#about">Sobre mim</a>
          <Link to="/projects">Projetos</Link>
          <Link to="/contact">Contato</Link>
        </div>
        <div className="home-footer-socials">
          <h3>CONECTADO</h3>
          <div>
            <a href={githubProfile} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><SocialLogo name="GitHub" /></a>
            <a href={linkedInProfile} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><SocialLogo name="LinkedIn" /></a>
            <a href="mailto:lucasasth3@outlook.com" aria-label="E-mail" title="E-mail"><SocialLogo name="Email" /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
