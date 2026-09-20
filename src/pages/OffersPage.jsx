import {
  ArrowRight,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const offerGroups = [
  {
    id: 'services',
    eyebrow: 'Les trois services',
    title: 'Un accompagnement adapté à votre application.',
    description:
      'Chaque intervention est définie avec vous : périmètre, priorités, livrables et budget.',
    offers: [
      {
        id: 'analyse-diagnostic',
        title: 'Analyse et diagnostic',
        budget: {
          amounts: ['Environ 1 200 € HT'],
          note: 'Analyse, rapport et restitution sur le périmètre convenu.',
        },
        description:
          'Comprendre l’état de votre application, identifier les risques et décider quoi traiter en priorité.',
        points: [
          'Lecture automatisée et manuelle du code',
          'Architecture, dépendances, vulnérabilités et tests',
          'Rapport et plan d’action priorisé',
          'Réunion de restitution',
        ],
      },
      {
        id: 'correction-refactorisation',
        title: 'Correction et refactorisation',
        budget: {
          amounts: ['Environ 3 000 € HT'],
          note: 'Budget du sprint, hors analyse initiale. Les corrections à réaliser sont définies dans le devis.',
        },
        description:
          'À partir d’un diagnostic, corriger les problèmes et améliorer la maintenabilité sur un périmètre convenu ensemble.',
        points: [
          'Correction des bugs et vulnérabilités sélectionnés',
          'Refactorisation des composants concernés',
          'Création ou adaptation des tests',
          'Documentation et bilan des améliorations',
        ],
      },
      {
        id: 'accompagnement-mensuel',
        title: 'Accompagnement mensuel',
        budget: {
          amounts: ['960 € HT / mois sur 6 mois', '840 € HT / mois sur 12 mois'],
          note: 'Soit 5 760 € HT sur 6 mois ou 10 080 € HT sur 12 mois, hors analyse initiale. Le montant mensuel est fixé au devis pour la durée choisie.',
        },
        description:
          'Un suivi sur 6 ou 12 mois pour analyser les évolutions de votre application et corriger progressivement les problèmes identifiés. Le suivi mensuel et les interventions sont chiffrés séparément.',
        points: [
          'Revue des changements et suivi de la qualité',
          'Suivi des dépendances et vulnérabilités',
          'Rapport mensuel et recommandations prioritaires',
          'Corrections et refactorisations progressives sur devis à tarif préférentiel',
          'Validation de chaque devis avant intervention, dans la limite du volume mensuel convenu',
        ],
      },
    ],
  },

]

const createOfferMailto = ({ title }, client) => {
  const subject = `Demande de devis — ${title}`
  const body = `Bonjour,

Je souhaite obtenir un devis pour la prestation « ${title} ».

Entreprise : ${client.company}
Nom et fonction : ${client.name}
Email : ${client.email}
Téléphone : ${client.phone || 'Non renseigné'}
Projet concerné : ${client.project}
Besoin principal : ${client.need}
Échéance souhaitée : ${client.deadline || 'Non renseignée'}
Informations complémentaires : ${client.details || 'Aucune'}

Cordialement,
${client.name}`

  return `mailto:paulcancel.pro@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function OffersPage() {
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [formErrors, setFormErrors] = useState({})
  const firstFieldRef = useRef(null)

  useEffect(() => {
    if (!selectedOffer) return undefined

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedOffer(null)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    firstFieldRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedOffer])

  const openOffer = (offer) => {
    setFormErrors({})
    setSelectedOffer(offer)
  }

  const handleOfferKeyDown = (event, offer) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openOffer(offer)
    }
  }

  const handleOfferSubmit = (event) => {
    event.preventDefault()
    const client = Object.fromEntries(new FormData(event.currentTarget))
    const errors = {}

    if (!client.company.trim()) errors.company = 'Indiquez votre entreprise.'
    if (!client.name.trim()) errors.name = 'Indiquez votre nom et votre fonction.'
    if (!client.email.trim()) {
      errors.email = 'Indiquez votre adresse email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
      errors.email = 'Utilisez une adresse email valide.'
    }
    if (!client.project.trim()) errors.project = 'Indiquez le projet concerné.'
    if (!client.need.trim()) errors.need = 'Décrivez brièvement votre besoin.'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      const firstInvalidField = Object.keys(errors)[0]
      event.currentTarget.querySelector(`[name="${firstInvalidField}"]`)?.focus()
      return
    }

    window.location.href = createOfferMailto(selectedOffer, client)
    setSelectedOffer(null)
  }

  const handleFormInput = (event) => {
    const { name } = event.target
    if (!formErrors[name]) return

    setFormErrors((currentErrors) => {
      const nextErrors = { ...currentErrors }
      delete nextErrors[name]
      return nextErrors
    })
  }

  return (
    <main className="offers-page">
      <section className="offers-hero" aria-labelledby="offers-title">
        <h1 id="offers-title">Services</h1>
        <p className="offers-hero-lead">Un périmètre et un budget adapté à votre projet.</p>
        <p className="offers-hero-copy">
          Toutes les prestations sont proposées uniquement sur devis. Le budget
          dépend de la taille et de la complexité de l'application, de son
          architecture, de l’état du code et du périmètre de l'intervention.
        </p>
      </section>

      {offerGroups.map((group) => (
        <section className="offers-group" id={group.id} key={group.id}>
          <div className="offers-group-heading">
            <div className="offers-group-title-row">
              <h2>{group.eyebrow}</h2>
            </div>
            <p className="offers-group-lead">{group.title}</p>
            <p className="offers-group-description">{group.description}</p>
          </div>

          <p className="offers-reference-scope">
            <strong>Budget indicatif :</strong> les tarifs ci-dessous correspondent
            à une application Spring Boot d’environ <strong>15 packages, 50 classes
            et 250 méthodes</strong>. Les montants sont ajustés sur devis selon
            la complexité et les besoins.
          </p>

          <div className="offers-grid">
            {group.offers.map((offer) => (
              <article
                className="offer-card"
                id={offer.id}
                key={offer.title}
                role="button"
                tabIndex="0"
                aria-label={`Demander un devis : ${offer.title}`}
                onClick={() => openOffer(offer)}
                onKeyDown={(event) => handleOfferKeyDown(event, offer)}
              >
                <h3>{offer.title}</h3>
                <p className="offer-description">{offer.description}</p>
                <ul className="offer-points">
                  {offer.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                {offer.budget && (
                  <div className="offer-budget">
                    <p className="offer-budget-label">Budget indicatif :</p>
                    {offer.budget.amounts.map((amount) => (
                      <strong key={amount}>{amount}</strong>
                    ))}
                    <p>{offer.budget.note}</p>
                  </div>
                )}
                <span className="offer-card-action">
                  Demander un devis
                  <ArrowRight size={17} aria-hidden="true" />
                </span>
              </article>
            ))}
          </div>

          {group.id === 'services' && (
            <p className="offers-group-note">
              Ces montants sont des repères indicatifs, à confirmer sur devis selon
              la complexité et le périmètre. Le nombre de classes ne suffit pas à
              déterminer le budget. Dans l’accompagnement, les corrections et
              refactorisations sont facturées en supplément du suivi, sur devis
              à tarif préférentiel accepté avant intervention. Leur périmètre et
              le volume d’intervention mensuel sont définis au devis ; les demandes
              au-delà de ce volume sont planifiées séparément.
            </p>
          )}
        </section>
      ))}

      <section className="offers-custom" aria-labelledby="custom-offer-title">
        <div>
          <div className="offers-custom-heading">
            <h2 id="custom-offer-title">Besoin spécifique</h2>
          </div>
          <p className="offers-custom-lead">Parlons de votre application.</p>
          <p>
            Après un entretien de cadrage, je vous propose un devis précisant
            le périmètre, les livrables et le budget de votre intervention. Le calendrier et
            les conditions de paiement sont définis dans ce devis.
          </p>
        </div>
        <Link className="button primary" to="/contact">
          Demander un devis
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>

      <p className="offers-tax-note">
        TVA non applicable, article 293 B du Code général des impôts.
      </p>

      {selectedOffer && (
        <div
          className="offer-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedOffer(null)
          }}
        >
          <section
            className="offer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-modal-title"
          >
            <button
              className="offer-modal-close"
              type="button"
              aria-label="Fermer"
              onClick={() => setSelectedOffer(null)}
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="offer-modal-heading">
              <h2 id="offer-modal-title">{selectedOffer.title}</h2>
              <strong>Budget personnalisé sur devis</strong>
              <p>Décrivez votre application pour préparer votre demande de devis. Ce formulaire ouvre votre messagerie avec un email prérempli.</p>
            </div>

            <form
              className="offer-form"
              noValidate
              onInput={handleFormInput}
              onSubmit={handleOfferSubmit}
            >
              <div className="offer-form-grid">
                <label>
                  <span>Entreprise *</span>
                  <input
                    ref={firstFieldRef}
                    type="text"
                    name="company"
                    placeholder="Nom de l’entreprise"
                    autoComplete="organization"
                    aria-invalid={Boolean(formErrors.company)}
                    aria-describedby={formErrors.company ? 'company-error' : undefined}
                    required
                  />
                  {formErrors.company && (
                    <small className="offer-field-error" id="company-error">
                      {formErrors.company}
                    </small>
                  )}
                </label>
                <label>
                  <span>Nom et fonction *</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Prénom, nom — fonction"
                    autoComplete="name"
                    aria-invalid={Boolean(formErrors.name)}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                    required
                  />
                  {formErrors.name && (
                    <small className="offer-field-error" id="name-error">
                      {formErrors.name}
                    </small>
                  )}
                </label>
                <label>
                  <span>Email *</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="vous@entreprise.fr"
                    autoComplete="email"
                    aria-invalid={Boolean(formErrors.email)}
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                    required
                  />
                  {formErrors.email && (
                    <small className="offer-field-error" id="email-error">
                      {formErrors.email}
                    </small>
                  )}
                </label>
                <label>
                  <span>Téléphone</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Votre numéro"
                    autoComplete="tel"
                  />
                </label>
              </div>

              <label>
                <span>Projet concerné *</span>
                <input
                  type="text"
                  name="project"
                  placeholder="Application, module ou service"
                  aria-invalid={Boolean(formErrors.project)}
                  aria-describedby={formErrors.project ? 'project-error' : undefined}
                  required
                />
                {formErrors.project && (
                  <small className="offer-field-error" id="project-error">
                    {formErrors.project}
                  </small>
                )}
              </label>
              <label>
                <span>Besoin principal *</span>
                <textarea
                  name="need"
                  rows="3"
                  placeholder="Décrivez brièvement votre besoin"
                  aria-invalid={Boolean(formErrors.need)}
                  aria-describedby={formErrors.need ? 'need-error' : undefined}
                  required
                ></textarea>
                {formErrors.need && (
                  <small className="offer-field-error" id="need-error">
                    {formErrors.need}
                  </small>
                )}
              </label>
              <label>
                <span>Échéance souhaitée</span>
                <input
                  type="text"
                  name="deadline"
                  placeholder="Date ou période souhaitée"
                />
              </label>
              <label>
                <span>Informations complémentaires</span>
                <textarea
                  name="details"
                  rows="3"
                  placeholder="Technologies, nombre de modules, packages ou classes, complexité métier, tests existants, contraintes…"
                ></textarea>
              </label>

              <div className="offer-form-actions">
                <button
                  className="button secondary"
                  type="button"
                  onClick={() => setSelectedOffer(null)}
                >
                  Annuler
                </button>
                <button className="button primary" type="submit">
                  Ouvrir l’email
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}

export default OffersPage
