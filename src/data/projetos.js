import { repositoryUrl } from './projetosGitHub'

export const projects = [
  {
    id: 'calculador',
    title: 'CalculaDOR',
    category: { en: 'Business management', pt: 'Gestão comercial' },
    description: {
      en: 'A business management system with inventory, financial tracking and a dashboard showing revenue, customers, low stock and pending bills.',
      pt: 'Sistema de gestão comercial com estoque, controle financeiro e dashboard de faturamento, clientes, estoque crítico e contas pendentes.',
    },
    technologies: ['JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Chart.js', 'JSON Server'],
    cover: '/images/projetos/calculador.png',
    github: null,
    website: null,
    initials: 'CD',
  },
  {
    id: 'doacao',
    title: 'DoAção',
    category: { en: 'Blood donation', pt: 'Doação de sangue' },
    description: {
      en: 'A blood donation platform with pre-screening and an interactive map of blood centers and collection points.',
      pt: 'Plataforma de doação de sangue com pré-triagem e mapa interativo de hemocentros e pontos de coleta.',
    },
    technologies: ['Leaflet', 'OpenStreetMap'],
    cover: '/images/projetos/doacao.png',
    privateRepository: true,
    github: null,
    website: null,
    initials: 'DA',
  },
  {
    id: 'uai-adota',
    title: 'Uai, Adota!',
    category: { en: 'Pet adoption', pt: 'Adoção de animais' },
    description: {
      en: 'A pet adoption platform for Belo Horizonte. An interactive map shows available pets and the organization caring for each animal.',
      pt: 'Plataforma de adoção de animais em Belo Horizonte. Um mapa interativo mostra os pets disponíveis e as informações da ONG responsável por cada animal.',
    },
    technologies: ['JavaScript', 'Mapbox API', 'JSON Server'],
    cover: '/images/projetos/uai-adota.png',
    github: repositoryUrl('Site-Final'),
    website: null,
    initials: 'UA',
  },
  {
    id: 'cosmomind',
    title: 'CosmoMind',
    category: { en: 'Web application', pt: 'Aplicação web' },
    description: {
      en: 'A project exploring technology, experimentation and product development.',
      pt: 'Um projeto que reúne tecnologia, experimentação e desenvolvimento de produto.',
    },
    technologies: ['React', 'JavaScript', 'Vite'],
    cover: '/images/projetos/cosmomind.png',
    github: repositoryUrl('cosmomind'),
    website: null,
    initials: 'CM',
  },
]
