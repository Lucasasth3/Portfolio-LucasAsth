import { useLanguage } from '../languageContext'
import { NavLink } from 'react-router-dom'

const navigation = [
  { path: '/', title: { en: "Home", pt: "Início" } },
  { path: '/resume', title: { en: "Resume", pt: "Currículo" } },
  { path: '/projects', title: { en: "Projects", pt: "Projetos" } },
  { path: '/experience', title: { en: "Experience", pt: "Experiência" } },
  { path: '/education', title: { en: "Education", pt: "Formação" } },
  { path: '/education/grades', title: { en: "Academics", pt: "Histórico" } },
  { path: '/contact', title: { en: "Contact", pt: "Contato" } },
]

function Header() {
  const { language, setLanguage, text } = useLanguage()
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" end>Lucas Asth</NavLink>
      <nav aria-label={text('Main navigation', 'Navegação principal')}>
        {navigation.map(({ path, title }) => (
          <NavLink className="nav-link" key={path} to={path} end>{title[language]}</NavLink>
        ))}
      </nav>
      <div className="language-switch" role="group" aria-label={text('Site language', 'Idioma do site')}>
        <button type="button" lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
        <button type="button" lang="pt-BR" aria-label="Português" aria-pressed={language === 'pt'} onClick={() => setLanguage('pt')}>PT</button>
      </div>
    </header>
  )
}

export default Header
