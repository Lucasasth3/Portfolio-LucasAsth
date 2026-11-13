const localized = (en, pt) => ({ en, pt })

export const journey = [
  {
    label: localized('School', 'Escola'),
    category: localized('Entrepreneurship', 'Empreendedorismo'),
    title: localized('The first sale', 'A primeira venda'),
    story: localized(
      'My first business started at school. I liked the idea of selling something of my own, so I started selling candy to my classmates.',
      'Meu primeiro negócio começou na escola. Eu gostava da ideia de vender algo por conta própria, então comecei a vender balas para os meus colegas.',
    ),
    items: [
      { title: localized('Selling candy at school', 'Venda de balas na escola'), detail: localized('My first experience selling directly to customers.', 'Minha primeira experiência vendendo direto para os clientes.') },
    ],
    x: 115,
  },
  {
    label: localized('Age 15', 'Aos 15 anos'),
    category: localized('Skills', 'Habilidades'),
    title: localized('From marketing to programming', 'Do marketing à programação'),
    story: localized(
      'At 15, I started learning digital marketing and programming. I wanted to understand how to reach people and how to build the websites and tools they could use.',
      'Aos 15, comecei a aprender marketing digital e programação. Queria entender como alcançar pessoas e como construir os sites e ferramentas que elas poderiam usar.',
    ),
    tags: [localized('Digital marketing', 'Marketing digital'), 'Java', 'JavaScript', 'Python', 'React', 'Git'],
    links: [{ to: '/skills', label: localized('All skills', 'Todas as habilidades') }],
    x: 51,
  },
  {
    label: localized('Freelance', 'Freelas'),
    category: localized('Experience', 'Experiência'),
    title: localized('My first freelance projects', 'Meus primeiros freelas'),
    story: localized(
      'What I learned at 15 gave me a way to start working for myself. I began taking on freelance projects and applying what I knew to websites and software.',
      'O que aprendi aos 15 me deu um caminho para trabalhar por conta própria. Comecei a pegar freelas e aplicar o que sabia em sites e projetos de software.',
    ),
    items: [
      { title: localized('Freelance web development', 'Desenvolvimento web freelancer'), detail: localized('Client and personal projects.', 'Projetos para clientes e iniciativas pessoais.') },
      { title: localized('Project Lead · PUC Minas', 'Líder de Projetos · PUC Minas'), detail: localized('I coordinate deliveries at the student software consultancy.', 'Acompanho entregas na Empresa Júnior de Software.') },
    ],
    links: [{ to: '/experience', label: localized('More experience', 'Ver experiências') }],
    x: 105,
  },
  {
    label: localized('Today', 'Hoje'),
    category: localized('Education and achievements', 'Formação e conquistas'),
    title: localized('What I’m building today', 'O que estou construindo hoje'),
    story: localized(
      'Today I study Software Engineering at PUC Minas. I still like building things people can use, from a pet adoption map to a movie catalog.',
      'Hoje estudo Engenharia de Software na PUC Minas. Continuo gostando de construir coisas que as pessoas possam usar, como um mapa de adoção de animais e um catálogo de filmes.',
    ),
    items: [
      { title: localized('Software Engineering · PUC Minas', 'Engenharia de Software · PUC Minas'), detail: localized('Bachelor’s degree in progress.', 'Graduação em andamento.') },
      { title: localized('Power BI certification', 'Certificação em Power BI'), detail: localized('Data analysis and dashboards · Easy Consultoria Júnior, May 2026.', 'Análise de dados e dashboards · Easy Consultoria Júnior, maio de 2026.') },
      { title: 'Uai, Adota!', detail: localized('A project to help people find animals available for adoption in Belo Horizonte.', 'Projeto para ajudar pessoas a encontrar animais disponíveis para adoção em Belo Horizonte.') },
    ],
    links: [
      { to: '/education', label: localized('View education', 'Ver formação') },
      { to: '/projects', label: localized('Explore projects', 'Explorar projetos') },
    ],
    x: 118,
  },
]
