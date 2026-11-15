import { Link } from 'react-router-dom'
import { useLanguage } from '../contextoIdioma'
import { linkedInProfile } from '../data/perfil'
import { githubProfile, repositorySnapshot, repositoryUrl } from '../data/projetosGitHub'
import './PaginaInicial.css'

const skillGroups = [
  { title: { en: 'Build', pt: 'Construção' }, items: ['Java', 'JavaScript', 'React', 'Node.js'] },
  { title: { en: 'Connect', pt: 'Integração' }, items: ['REST APIs', 'MongoDB', 'SQL', 'Git'] },
  { title: { en: 'Think', pt: 'Visão' }, items: ['UX', 'Product thinking', 'Problem solving', 'Learning'] },
]

const featuredProjects = repositorySnapshot.slice(0, 3)

export default function HomePage() {
  const { language, text } = useLanguage()

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="home-eyebrow">{text('Software Engineer in training', 'Software Engineer em formação')}</p>
          <h1 id="home-title">{text('I build ideas into useful digital products.', 'Transformo ideias em produtos digitais úteis.')}</h1>
          <p className="home-lead">{text('I combine software engineering, entrepreneurship and curiosity to understand problems, design solutions and build experiences people can use.', 'Uno engenharia de software, empreendedorismo e curiosidade para entender problemas, desenhar soluções e construir experiências que as pessoas conseguem usar.')}</p>
          <div className="home-actions">
            <a className="home-button home-button-primary" href="#projects">{text('See my projects', 'Ver meus projetos')}</a>
            <Link className="home-button home-button-secondary" to="/contact">{text('Let’s talk', 'Vamos conversar')}</Link>
          </div>
          <div className="home-socials">
            <a href={githubProfile} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={linkedInProfile} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <Link to="/resume">{text('Resume ↗', 'Currículo ↗')}</Link>
          </div>
        </div>
        <div className="home-hero-card" aria-label={text('Entrepreneurial profile', 'Perfil empreendedor')}>
          <span className="home-card-label">01 / mindset</span>
          <strong>{text('From problem', 'Do problema')}</strong>
          <span className="home-card-arrow">→</span>
          <strong>{text('to possibility', 'à possibilidade')}</strong>
          <p>{text('Every project is a chance to learn, test and make something better.', 'Cada projeto é uma oportunidade de aprender, testar e fazer algo melhor.')}</p>
        </div>
      </section>

      <section className="home-section home-business" id="about" aria-labelledby="about-title">
        <div className="home-section-index">01</div>
        <div>
          <p className="home-section-kicker">{text('How I think', 'Como eu penso')}</p>
          <h2 id="about-title">{text('Technology is a tool. The real work starts with understanding the problem.', 'Tecnologia é ferramenta. O trabalho começa entendendo o problema.')}</h2>
          <p>{text('I enjoy the space between an idea and its execution: asking better questions, organizing the path and turning learning into something concrete.', 'Gosto do espaço entre uma ideia e sua execução: fazer perguntas melhores, organizar o caminho e transformar aprendizado em algo concreto.')}</p>
        </div>
      </section>

      <section className="home-section" id="skills" aria-labelledby="skills-title">
        <div className="home-section-index">02</div>
        <div>
          <p className="home-section-kicker">{text('What I work with', 'Com o que eu trabalho')}</p>
          <h2 id="skills-title">{text('A toolkit that keeps growing.', 'Uma caixa de ferramentas em evolução.')}</h2>
          <div className="home-skill-grid">
            {skillGroups.map(group => <article className="home-skill-card" key={group.title.en}>
              <h3>{group.title[language]}</h3>
              <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
            </article>)}
          </div>
        </div>
      </section>

      <section className="home-section" id="projects" aria-labelledby="projects-title">
        <div className="home-section-index">03</div>
        <div>
          <p className="home-section-kicker">{text('Selected work', 'Projetos em destaque')}</p>
          <h2 id="projects-title">{text('Things I have built while learning.', 'O que venho construindo enquanto aprendo.')}</h2>
          <div className="home-project-grid">
            {featuredProjects.map((project, index) => <article className="home-project-card" key={project.name}>
              <span>0{index + 1}</span>
              <h3>{project.name}</h3>
              <p>{project.description || text('A project where I practiced turning an idea into a working solution.', 'Um projeto em que pratiquei transformar uma ideia em uma solução funcionando.')}</p>
              <small>{project.language || 'Web development'}</small>
              <a href={repositoryUrl(project.name)} target="_blank" rel="noreferrer">{text('View repository', 'Ver repositório')} ↗</a>
            </article>)}
          </div>
          <Link className="home-text-link" to="/projects">{text('Explore all projects', 'Explorar todos os projetos')} →</Link>
        </div>
      </section>

      <section className="home-contact" id="contact" aria-labelledby="contact-title">
        <p className="home-section-kicker">04 / {text('Next step', 'Próximo passo')}</p>
        <h2 id="contact-title">{text('Have a problem worth building?', 'Tem um problema que vale a pena construir?')}</h2>
        <Link className="home-button home-button-primary" to="/contact">{text('Start a conversation', 'Começar uma conversa')}</Link>
      </section>
    </div>
  )
}
