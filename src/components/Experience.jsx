const experiences = [
  {
    period: '2026 — atual',
    role: 'Líder de Projetos',
    company: 'Empresa Júnior de Software — PUC Minas',
  },
  {
    period: '2025 — atual',
    role: 'Consultor Comercial',
    company: 'Axel Mendes Assessoria',
  },
  {
    period: 'Em andamento',
    role: 'Desenvolvedor web freelancer',
    company: 'Projetos para clientes e iniciativas pessoais',
  },
]

function Experience() {
  return (
    <section className="content-section" id="experience">
      <p className="section-number">03</p>
      <div>
        <h2>Experiência</h2>
        <div className="timeline">
          {experiences.map((experience) => (
            <article className="timeline-item" key={`${experience.role}-${experience.company}`}>
              <p className="timeline-period">{experience.period}</p>
              <h3>{experience.role}</h3>
              <p>{experience.company}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
