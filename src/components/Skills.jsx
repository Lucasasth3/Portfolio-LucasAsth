const skillGroups = [
  { title: 'Linguagens', items: ['JavaScript', 'Python', 'Java', 'HTML', 'CSS'] },
  { title: 'Tecnologias', items: ['React', 'Node.js', 'NestJS', 'Django', 'REST'] },
  { title: 'Dados e ferramentas', items: ['MongoDB', 'SQL', 'Git', 'GitHub', 'Power BI'] },
]

function Skills() {
  return (
    <section className="content-section" id="skills">
      <p className="section-number">02</p>
      <div>
        <h2>Habilidades</h2>
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
