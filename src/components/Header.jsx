import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../assets/paul-cancel-logo.png'

function Header() {
  return (
    <header className="navbar">
      <Link className="brand" to="/" aria-label="Paul Cancel A&R - Accueil">
        <img src={logo} alt="Logo Paul Cancel A&R" />
      </Link>
      <nav aria-label="Navigation principale">
        <Link to="/#services">Services</Link>
        <Link to="/#methode">Méthode</Link>
        <Link to="/profil">Profil</Link>
      </nav>
      <Link className="nav-cta" to="/contact">
        <Mail size={17} />
        Contact
      </Link>
    </header>
  )
}

export default Header
