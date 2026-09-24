import {
  ArrowRight,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import analysisImage from '../assets/images/analyse.jpg'
import correctionImage from '../assets/images/correction.jpg'
import maintenanceImage from '../assets/images/entretien.jpg'
import analysisExample from '../assets/analyse-example.pdf'

const offerGroups = [
  {
    id: 'services',
    offers: [
      {
        id: 'analyse-diagnostic',
        title: 'Analyse et diagnostic',
        stage: 'Comprendre',
        image: analysisImage,
        example: analysisExample,
        budget: {
          amounts: [{ price: '~1 200 € HT', label: 'pour l’analyse' }],
          note: 'Analyse, rapport et restitution sur le périmètre convenu.',
        },
        description:
          'Je vous aide à comprendre ce qui fragilise votre application et quoi corriger en premier.',
        points: [
          'Analyse du code, de l’architecture, des dépendances et des tests',
          'Rapport des risques et plan d’action priorisé',
          'Restitution pour décider des prochaines étapes',
        ],
      },
      {
        id: 'correction-refactorisation',
        title: 'Correction et refactorisation',
        stage: 'Améliorer',
        image: correctionImage,
        budget: {
          amounts: [{ price: '~3 000 € HT', label: 'pour le sprint' }],
          note: 'Budget du sprint, hors analyse initiale. Les corrections à réaliser sont définies dans le devis.',
        },
        description:
          'Je transforme le diagnostic en corrections concrètes pour rendre votre code plus fiable et plus facile à faire évoluer.',
        points: [
          'Corrections et refactorisation sur le périmètre validé',
          'Tests et documentation des changements',
          'Bilan des améliorations apportées',
        ],
      },
      {
        id: 'accompagnement-mensuel',
        title: 'Accompagnement mensuel',
        stage: 'Maintenir',
        image: maintenanceImage,
        budget: {
          amounts: [
            { price: '~960 € HT', label: '/ mois · engagement de 6 mois' },
            { price: '~840 € HT', label: '/ mois · engagement de 12 mois' },
          ],
          note: 'Soit 5 760 € HT sur 6 mois ou 10 080 € HT sur 12 mois, hors analyse initiale. Suivi seul : correctifs facturés séparément sur devis accepté.',
        },
        description:
          'Je suis les évolutions de votre application et vous accompagne pour traiter les problèmes au fil du temps.',
        points: [
          'Revue mensuelle du code, des dépendances et des risques',
          'Rapport, restitution et priorités actualisées',
          'Correctifs en supplément, sur devis à tarif préférentiel',
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
        <h1 id="offers-title">Offres</h1>
        <p className="offers-hero-lead">Comprendre. Améliorer. Maintenir.</p>
        <p className="offers-hero-copy">
          Je vous accompagne dans l’analyse, la correction et le suivi de votre
          application, pour un besoin ciblé ou dans la durée. Chaque prestation
          fait l’objet d’un devis adapté à la taille et à la complexité du projet,
          avec un périmètre, des priorités, des livrables et un budget définis ensemble.
        </p>
      </section>

      {offerGroups.map((group) => (
        <section className="offers-group" id={group.id} key={group.id} aria-label="Prestations et budgets indicatifs">
          <div className="offers-reference-scope">
            <strong>Budget indicatif</strong>
            <ul aria-label="Périmètre indicatif">
              <li>Spring Boot</li>
              <li>~15 packages</li>
              <li>~50 classes</li>
              <li>~250 méthodes</li>
            </ul>
          </div>

          <div className="offers-grid">
            {group.offers.map((offer, index) => (
              <article
                className="offer-card"
                id={offer.id}
                key={offer.title}
                aria-labelledby={`${offer.id}-title`}
              >
                <div className="offer-visual">
                  <img src={offer.image} alt="" loading="lazy" />
                  <div className="offer-stage">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {offer.stage}
                  </div>
                </div>
                <h3 id={`${offer.id}-title`}>{offer.title}</h3>
                <p className="offer-description">{offer.description}</p>
                <ul className="offer-points">
                  {offer.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                {offer.budget && (
                  <div className="offer-budget">
                    <p className="offer-budget-label">Budget indicatif :</p>
                    {offer.budget.amounts.map((amount) => (
                      <div className="offer-budget-amount" key={amount.label}>
                        <strong>{amount.price}</strong>
                        <span>{amount.label}</span>
                      </div>
                    ))}
                    <p>{offer.budget.note}</p>
                  </div>
                )}
                <div className="offer-actions">
                  <button className="button primary offer-card-action" type="button"
                    aria-label={`Demander un devis : ${offer.title}`}
                    onClick={() => openOffer(offer)}>
                    Demander un devis
                    <ArrowRight size={17} aria-hidden="true" />
                  </button>
                  {offer.example && (
                    <a className="offer-example" href={offer.example} target="_blank" rel="noreferrer">
                      Voir un exemple de rapport <span className="offer-example-hint">(PDF, nouvel onglet)</span>
                    </a>
                  )}
                </div>
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
              le volume d’intervention mensuel sont définis au devis.
            </p>
          )}
        </section>
      ))}

      <section className="offers-custom" aria-labelledby="custom-offer-title">
        <div>
          <div className="offers-custom-heading"> 
            <h2 id="custom-offer-title">Rien ne vous correspond ?</h2>
          </div>
          <p className="offers-custom-lead">Parlons de ce qui vous freine aujourd’hui.</p>
          <p>Discutons de votre projet et je vous ferais un devis personnalisé.</p>
        </div>
        <Link className="button primary" to="/contact">
          Me contacter
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
