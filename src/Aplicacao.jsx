import { LanguageProvider } from './ProvedorIdioma'
import { useLanguage } from './contextoIdioma'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './Aplicacao.css'
import Header from './components/Cabecalho'
import Skills from './components/Habilidades'
import AcademicRecordPage from './pages/PaginaHistoricoAcademico'
import ContactPage from './pages/PaginaContato'
import EducationPage from './pages/PaginaFormacao'
import ExperiencePage from './pages/PaginaExperiencia'
import HomePage from './pages/PaginaInicial'
import NotFoundPage from './pages/PaginaNaoEncontrada'
import ProjectsPage from './pages/PaginaProjetos'
import ResumePage from './pages/PaginaCurriculo'
import BooksPage from './pages/PaginaLivros'

function Portfolio() {
  const { text } = useLanguage()
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    else window.scrollTo(0, 0)
  }, [pathname, hash, key])
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">{text('Skip to content', 'Pular para o conteúdo')}</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/education/grades" element={<AcademicRecordPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>{text("Lucas Asth · Belo Horizonte, Brazil", "Lucas Asth · Belo Horizonte, Brasil")}</span>
        <a href="https://github.com/Lucasasth3/Portfolio-LucasAsth" target="_blank" rel="noreferrer">{text('Portfolio source code', 'Código deste portfólio')}</a>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  )
}
