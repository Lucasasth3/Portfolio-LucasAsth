import { LanguageProvider } from './ProvedorIdioma'
import { useLanguage } from './contextoIdioma'
import { Route, Routes } from 'react-router-dom'
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

function Portfolio() {
  const { text } = useLanguage()
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/education/grades" element={<AcademicRecordPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer>{text("Lucas Asth · Belo Horizonte, Brazil", "Lucas Asth · Belo Horizonte, Brasil")}</footer>
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
