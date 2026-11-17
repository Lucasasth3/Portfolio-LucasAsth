export const technologies = [
  { name: 'Java', icon: 'java', color: '#ed8b00', description: 'Orientação a objetos, algoritmos e aplicações do curso de Engenharia de Software.' },
  { name: 'JavaScript', icon: 'javascript', color: '#f7df1e', description: 'Interações e aplicações web, incluindo este portfólio.' },
  { name: 'TypeScript', icon: 'typescript', color: '#3178c6', description: 'Tipagem e organização de aplicações web presentes nos meus projetos.' },
  { name: 'Python', icon: 'python', color: '#3776ab', description: 'Automação, estudo de algoritmos e desenvolvimento de soluções com dados.' },
  { name: 'HTML', icon: 'html5', color: '#e34f26', description: 'Estrutura semântica e acessível das páginas web.' },
  { name: 'CSS', icon: 'css3', color: '#1572b6', description: 'Layouts responsivos e identidade visual das interfaces.' },
  { name: 'React', icon: 'react', color: '#61dafb', description: 'Componentes e interfaces reativas; a base deste portfólio.' },
  { name: 'Node.js', icon: 'nodejs', color: '#5fa04e', description: 'Serviços web e execução de JavaScript no servidor.' },
  { name: 'NestJS', icon: 'nestjs', color: '#e0234e', description: 'Estruturação de APIs REST com módulos e serviços.' },
  { name: 'Django', icon: 'django', color: '#44b78b', description: 'Desenvolvimento de aplicações e APIs com Python.' },
  { name: 'MongoDB', icon: 'mongodb', color: '#47a248', description: 'Persistência e consulta de documentos nos projetos.' },
  { name: 'SQL', icon: 'postgresql', color: '#4169e1', description: 'Modelagem relacional e consultas para explorar dados.' },
  { name: 'Git', icon: 'git', color: '#f05032', description: 'Controle de versão e organização do trabalho com código.' },
  { name: 'GitHub', icon: 'github', color: '#b8bdc8', description: 'Repositórios, colaboração e publicação dos meus projetos.' },
  { name: 'VS Code', icon: 'vscode', color: '#23a9f2', description: 'Editor usado para desenvolver e estudar.' },
]

const extra = {
  Markdown: { icon: 'markdown', color: '#b8bdc8' }, Bash: { icon: 'bash', color: '#89e051' },
  JSON: { icon: 'json', color: '#d6ca56' }, 'C#': { icon: 'csharp', color: '#a179dc' },
  C: { icon: 'c', color: '#a8b9cc' }, 'C++': { icon: 'cplusplus', color: '#659ad2' }, PHP: { icon: 'php', color: '#a4a9e5' },
}

export function technologyFor(name) {
  return technologies.find(item => item.name.toLowerCase() === name.toLowerCase()) || extra[name] || { icon: null, color: '#a3a3b0' }
}
