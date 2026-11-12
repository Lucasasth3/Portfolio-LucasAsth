import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/">Lucas Asth</NavLink>
      <nav aria-label="Navegação principal">
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/" end>Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/resume">Resume</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/projects">Projects</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/experience">Experience</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/education">Education</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/contact">Contact</NavLink>
      </nav>
    </header>
  )
}

export default Header
