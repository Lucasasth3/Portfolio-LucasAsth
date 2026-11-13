import { LanguageProvider } from './language'
import { useLanguage } from './languageContext'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import AcademicRecordPage from './pages/AcademicRecordPage'
import ContactPage from './pages/ContactPage'
import EducationPage from './pages/EducationPage'
import ExperiencePage from './pages/ExperiencePage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ProjectsPage from './pages/ProjectsPage'
import ResumePage from './pages/ResumePage'

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
