import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-profile">
        <div className="profile-frame">
          <div className="profile-placeholder" aria-label="Espaço reservado para foto profissional">
            LA
          </div>
        </div>
        <div className="hero-index" aria-label="Índice do portfólio">
          <Link to="/resume#skills"><span>01</span> Skills</Link>
          <Link to="/experience"><span>02</span> Experience</Link>
          <Link to="/education"><span>03</span> Education</Link>
          <Link to="/projects"><span>04</span> Projects</Link>
        </div>
      </div>

      <div className="hero-content">
        <p className="availability"><span aria-hidden="true"></span> Open to work &amp; collaborations</p>
        <h1>Lucas Asth</h1>
        <p className="hero-role">Software Engineer em formação <span>/</span> Belo Horizonte, Brasil</p>
        <p className="hero-copy">
          Estudante de Engenharia de Software na PUC Minas, com experiência em
          desenvolvimento web, automação e projetos de tecnologia.
        </p>
        <p className="hero-copy">
          Gosto de entender o problema antes de escrever o código e construir
          soluções que sejam úteis, claras e fáceis de manter.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/resume">View resume</Link>
          <Link className="button button-secondary" to="/contact">Get in touch</Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
