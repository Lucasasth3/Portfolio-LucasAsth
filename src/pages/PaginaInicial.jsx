import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Journey from '../components/Jornada'
import '../components/Jornada.css'

const sectionRoutes = {
  '#skills': '/skills',
  '#experience': '/experience',
  '#education': '/education',
  '#projects': '/projects',
}

export default function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const destination = Object.hasOwn(sectionRoutes, hash) ? sectionRoutes[hash] : null
  return destination ? <Navigate to={destination} replace /> : <Journey />
}
