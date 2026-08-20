import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-section" aria-labelledby="contact-title">
        <div className="contact-intro">
          <Link className="contact-back" to="/">
            <ArrowLeft size={17} />
            Retour à l'accueil
          </Link>
          <p className="eyebrow">Contact</p>
          <h1 id="contact-title">Parlons de votre codebase.</h1>
          <p>
            Faites appel à moi pour résoudre vos soucis de dette technique, de couverture de tests et de faille de sécurité.
            Je suis spécialisé dans l'analyse et le refactoring d'applications Java.
          </p>
        </div>
        <aside className="contact-card" aria-label="Coordonnées de contact">
          <div className="contact-card-heading">
            <span>Contactez moi</span>
            <h2>Échangeons par email.</h2>
            <p>
              Présentez-moi votre projet, votre entreprise ainsi que vos frameworks
              et je reviendrai vers vous afin d'échanger et vous proposer un devis pour mes services.
            </p>
          </div>
          <a className="contact-email" href="mailto:paulcancel.pro@gmail.com">
            <span>
              <small>Email</small>
              <strong>paulcancel.pro@gmail.com</strong>
            </span>
            <ArrowRight size={20} aria-hidden="true" />
          </a>
          <p className="contact-note">
            Analyse, refacto et accompagnement sur vos applications Java.
          </p>
        </aside>
      </section>
    </main>
  )
}

export default ContactPage
