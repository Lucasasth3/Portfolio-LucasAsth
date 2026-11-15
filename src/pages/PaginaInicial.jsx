import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contextoIdioma'
import { githubProfile, repositorySnapshot } from '../data/projetosGitHub'
import { linkedInProfile } from '../data/perfil'
import './PaginaInicial.css'
import './HomeFooter.css'
import WakaTimeActivity from '../components/WakaTimeActivity'

export default function HomePage() {
  const { text } = useLanguage()
  const [skillTab, setSkillTab] = useState('technologies')

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
              <small>{text('2025 — Dec 2029', '2025 — Dez 2029')}</small>
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
              <small>{text('Ongoing', 'Em andamento')}</small>
            </div>
          </article>
        </div>

        <div className="home-achievement-grid">
          <div className="home-achievement-card"><strong>7+</strong><span>{text('projects explored', 'projetos explorados')}</span></div>
          <div className="home-achievement-card"><strong>02</strong><span>{text('certificates', 'certificados')}</span></div>
          <div className="home-achievement-card"><strong>01</strong><span>{text('entrepreneurial mindset', 'mentalidade empreendedora')}</span></div>
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
            <span>SKILLS / GITHUB SNAPSHOT</span>
            <small>{text('Based on projects and current studies', 'Baseado nos projetos e estudos atuais')}</small>
          </div>
          <div className="home-skills-tabs" role="tablist" aria-label={text('Skills views', 'Visões das habilidades')}>
            {[
              ['technologies', text('Technologies', 'Tecnologias')],
              ['tools', text('Tools', 'Ferramentas')],
              ['activity', text('Activity', 'Atividade')],
              ['globe', 'skills.globo'],
            ].map(([value, label]) => (
              <button type="button" role="tab" aria-selected={skillTab === value} className={skillTab === value ? 'is-active' : ''} onClick={() => setSkillTab(value)} key={value}>{label}</button>
            ))}
          </div>
          {skillTab === 'technologies' && <div className="home-skills-grid">{['JavaScript', 'TypeScript', 'Java', 'React', 'Node.js', 'REST APIs', 'MongoDB', 'HTML & CSS', 'Git & GitHub', 'Vite'].map((skill) => <span className="home-skill-chip" key={skill}>{skill}</span>)}</div>}
          {skillTab === 'tools' && <div className="home-skills-grid">{['VS Code', 'GitHub', 'Vite', 'MongoDB Atlas', 'Postman', 'Figma', 'Spotify API', 'WakaTime'].map((skill) => <span className="home-skill-chip" key={skill}>{skill}</span>)}</div>}
          {skillTab === 'activity' && <div className="home-skill-stats"><strong>{repositorySnapshot.length}+</strong><span>{text('public repositories in the current snapshot', 'repositórios públicos no snapshot atual')}</span><strong>WakaTime</strong><span>{text('time data will appear after connecting your public profile', 'os tempos aparecerão após conectar seu perfil público')}</span></div>}
          {skillTab === 'globe' && <div className="home-skill-globe" aria-label="skills.globo"><div className="home-skill-orbit home-skill-orbit-one"><span>React</span><span>JavaScript</span><span>GitHub</span></div><div className="home-skill-orbit home-skill-orbit-two"><span>Node.js</span><span>Java</span><span>MongoDB</span></div><strong>Lucas<br />Asth</strong></div>}
          <WakaTimeActivity />
          <p className="home-skills-note">{text('GitHub supplies project activity. WakaTime will supply actual coding time when connected.', 'O GitHub fornece atividade dos projetos. O WakaTime fornecerá o tempo real de programação quando for conectado.')}</p>
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
            <a href={githubProfile} target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
            <a href={linkedInProfile} target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href="mailto:lucas.asth3@outlook.com" aria-label="E-mail">@</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
