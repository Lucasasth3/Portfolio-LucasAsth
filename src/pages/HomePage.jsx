import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'

function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [hash])

  return (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Education />
      <Projects />
    </>
  )
}

export default HomePage
