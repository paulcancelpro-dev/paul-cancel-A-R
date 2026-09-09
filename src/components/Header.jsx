import { House, Mail } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/paul-cancel-logo.jpeg'

function Header() {
  return (
    <header className="navbar">
      <Link className="brand" to="/" aria-label="Paul Cancel A&R - Accueil">
        <img src={logo} alt="Logo Paul Cancel A&R" />
      </Link>
      <nav aria-label="Navigation principale">
        <NavLink className="nav-home" to="/" end>
          <House size={16} aria-hidden="true" />
          <span>Accueil</span>
        </NavLink>
        <NavLink to="/offres">Offres</NavLink>
        <NavLink to="/profil">Profil</NavLink>
      </nav>
      <NavLink className="nav-cta" to="/contact">
        <Mail size={17} aria-hidden="true" />
        Contact
      </NavLink>
    </header>
  )
}

export default Header
