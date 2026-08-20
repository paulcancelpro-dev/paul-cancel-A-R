import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function ContactPage() {
  const handleContactSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
  }

  return (
    <main className="contact-page">
      <section className="contact-section" aria-labelledby="contact-title">
        <div>
          <Link className="contact-back" to="/">
            <ArrowLeft size={17} />
            Retour à l'accueil
          </Link>
          <p className="eyebrow">Contact</p>
          <h1 id="contact-title">Parlons de votre base de code.</h1>
          <p>
            Faites-moi une description de votre projet, des frameworks utilisés
            et de sa taille. Je vous répondrai avec un devis et un délai pour
            l'audit, dans lequel je détaillerai la qualité de votre code et la
            dette technique à corriger. J'y inclurai également un plan d'action
            pour traiter les points critiques et améliorer la maintenabilité de
            votre codebase.
          </p>
          <h4>Email : paulcancel.pro@gmail.com</h4>
        </div>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <label>
            Nom
            <input type="text" name="name" autoComplete="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label>
            Besoin
            <textarea name="message" rows="6" required></textarea>
          </label>
          <button className="button primary" type="submit">
            Envoyer la demande
            <ArrowRight size={18} />
          </button>
        </form>
      </section>
    </main>
  )
}

export default ContactPage
