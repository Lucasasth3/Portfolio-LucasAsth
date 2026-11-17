import { repositoryUrl } from './projetosGitHub'

export const projects = [
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
    id: 'catalogo-filmes',
    title: { en: 'Movie Catalog', pt: 'Catálogo de Filmes' },
    category: { en: 'Cinema & discovery', pt: 'Cinema e descoberta' },
    description: {
      en: 'A web app that searches the TMDB API for movies by title and displays their posters, ratings, and synopses.',
      pt: 'Aplicação que consulta a API do TMDB e permite buscar filmes pelo título. Os resultados exibem pôster, nota e sinopse.',
    },
    technologies: ['JavaScript', 'HTML', 'CSS', 'TMDB API'],
    cover: null,
    github: null,
    website: null,
    initials: 'CF',
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
