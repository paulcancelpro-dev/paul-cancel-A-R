import {
  ArrowRight,
  Check,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const offerGroups = [
  {
    eyebrow: 'Analyse et diagnostic',
    title: 'Comprendre les risques et décider quoi traiter en priorité.',
    description:
      'Chaque analyse combine une lecture automatisée et manuelle du périmètre, puis aboutit à des recommandations directement exploitables.',
    offers: [
      {
        title: 'Analyse ciblée',
        price: '700 € HT',
        description:
          'Pour étudier un composant, un module ou une problématique précise liée à la qualité, aux dépendances, aux tests, aux performances ou à la maintenabilité.',
        points: [
          'Entretien initial et cadrage du périmètre',
          'Analyse automatisée et manuelle',
          'Rapport des problèmes et recommandations prioritaires',
          'Réunion de restitution',
        ],
        note: "Cette formule ne constitue pas une analyse complète de l'application.",
        payment: 'Acompte de 350 €, puis solde à la livraison.',
      },
      {
        title: 'Analyse complète',
        price: '1 750 € HT',
        description:
          "Pour une application de taille limitée ou un périmètre fonctionnel clairement défini, avec une vue d'ensemble technique et organisationnelle.",
        points: [
          'Architecture, maintenabilité et dépendances',
          'Vulnérabilités, tests et documentation',
          'Synthèse décideur et rapport technique classé de P0 à P3',
          "Estimation de la dette et plan d'action priorisé",
        ],
        payment: 'Acompte de 700 €, puis solde de 1 050 € à la livraison.',
      },
      {
        title: 'Analyse multi-modules',
        price: '2 800 € HT',
        description:
          'Pour les projets composés de plusieurs modules, services ou dépôts de code, avec étude de leurs interactions et des composants critiques.',
        points: [
          "Tous les éléments de l'analyse complète",
          "Entretiens avec les membres de l'équipe concernés",
          'Étude des interactions, pipelines et composants critiques',
          'Atelier de priorisation et feuille de route',
        ],
        note: 'Le périmètre exact est validé avant la signature du devis.',
        payment: 'Paiement en trois échéances.',
      },
    ],
  },
  {
    eyebrow: 'Correction et refactorisation',
    title: 'Transformer les constats en améliorations mesurables.',
    description:
      "Les sprints sont définis à partir d'une analyse préalable et concentrés sur une liste de priorités clairement validée.",
    offers: [
      {
        title: 'Sprint ciblé',
        price: '1 470 € HT',
        description:
          'Pour traiter un composant ou un groupe restreint de problèmes prioritaires sans engager un chantier plus large.',
        points: [
          'Traitement des éléments sélectionnés',
          'Création ou adaptation des tests nécessaires',
          'Documentation des changements',
          'Restitution et backlog des éléments restants',
        ],
        payment: 'Acompte de 735 €, puis solde à la livraison.',
      },
      {
        title: 'Sprint renforcé',
        price: '2 450 € HT',
        description:
          'Pour traiter plusieurs problèmes liés ou intervenir sur un composant plus important et fortement couplé.',
        points: [
          'Correction de vulnérabilités et de bugs',
          'Refactorisation des composants sélectionnés',
          'Amélioration des tests et de la documentation',
          'Comparaison des indicateurs avant et après intervention',
        ],
        payment: 'Acompte de 980 €, puis solde de 1 470 € à la livraison.',
      },
      {
        title: 'Sprint transformation',
        price: '4 900 € HT',
        description:
          'Pour un chantier technique structuré en plusieurs étapes, avec un suivi intermédiaire des éléments les plus critiques.',
        points: [
          'Traitement des éléments P0',
          'Traitement des éléments P1 sélectionnés',
          'Amélioration des tests et de la maintenabilité',
          'Documentation, rendu intermédiaire et restitution',
        ],
        payment: 'Paiement en trois échéances.',
      },
    ],
  },
  {
    eyebrow: 'Accompagnement mensuel',
    title: 'Maintenir la qualité dans la durée.',
    description:
      "Ces abonnements sont réservés aux applications ayant déjà fait l'objet d'une analyse ou d'un sprint de refactorisation. Ils sont réglés en début de mois.",
    offers: [
      {
        title: 'Suivi essentiel',
        price: '350 € HT / mois',
        description:
          'Un suivi régulier pour conserver une vision claire des évolutions récentes et des risques émergents.',
        points: [
          'Analyse des changements récents',
          'Suivi de la qualité, des dépendances et des vulnérabilités',
          'Rapport synthétique',
          'Réunion mensuelle',
        ],
      },
      {
        title: 'Suivi actif',
        price: '700 € HT / mois',
        description:
          'Une formule qui associe veille technique, revue ciblée et améliorations ponctuelles de la codebase.',
        points: [
          'Veille qualité et revue des changements récents',
          'Correction de problèmes mineurs',
          'Amélioration ponctuelle des tests ou de la documentation',
          'Réunion mensuelle de suivi',
        ],
      },
      {
        title: 'Suivi continu',
        price: '1 400 € HT / mois',
        description:
          'Un accompagnement approfondi pour faire progresser régulièrement la qualité et traiter les priorités techniques.',
        points: [
          'Suivi régulier de la qualité et des dépendances',
          'Revues de code et traitement de problèmes prioritaires',
          'Amélioration progressive des tests et de la documentation',
          'Réunion mensuelle et bilan trimestriel',
        ],
      },
    ],
    footer:
      'Un engagement initial de trois mois est recommandé. Les corrections importantes ou les demandes hors périmètre font l’objet d’un forfait complémentaire.',
  },
  {
    eyebrow: 'Tests et documentation',
    title: 'Sécuriser les parcours critiques et faciliter la reprise du projet.',
    description:
      'Des prestations dédiées pour renforcer la stratégie de tests ou rendre la connaissance technique accessible à votre équipe.',
    offers: [
      {
        title: 'Analyse des tests ciblée',
        price: '980 € HT',
        description:
          'Pour un module, un parcours métier ou une problématique de tests précise.',
        points: [
          'Analyse des tests existants',
          'Identification des parcours critiques insuffisamment protégés',
          "Recommandations sur l'organisation des tests",
          "Plan d'action et réunion de restitution",
        ],
        note: "La création d'un ensemble important de tests fait l'objet d'un sprint complémentaire.",
        payment: 'Acompte de 490 €, puis solde à la livraison.',
      },
      {
        title: 'Stratégie de tests complète',
        price: '1 960 € HT',
        description:
          "Pour une application de taille limitée ou un périmètre fonctionnel important nécessitant une stratégie globale.",
        points: [
          'État des lieux et cartographie des parcours critiques',
          "Analyse des tests unitaires, d'intégration et de bout en bout",
          "Définition d'une stratégie et d'objectifs de couverture adaptés",
          'Exemples représentatifs et feuille de route',
        ],
        payment: 'Acompte de 784 €, puis solde de 1 176 € à la livraison.',
      },
      {
        title: 'Documentation ciblée',
        price: '980 € HT',
        description:
          'Pour documenter un composant, une API ou une procédure précise du projet.',
        points: [
          "Documentation d'un module ou d'une API",
          "Procédure d'installation et de test",
          'Procédure de déploiement',
          'Livrable adapté aux utilisateurs concernés',
        ],
        payment: 'Acompte de 490 €, puis solde à la livraison.',
      },
      {
        title: 'Documentation projet',
        price: '1 960 € HT',
        description:
          "Pour faciliter la reprise du projet et l'arrivée de nouveaux développeurs.",
        points: [
          'Présentation de l’architecture et des principaux composants',
          "Guide d'installation et d'arrivée pour les développeurs",
          'Documentation des procédures de test et de déploiement',
          'Réunion de transmission et recommandations de suivi',
        ],
        note: 'La prestation porte sur les éléments convenus et les informations rendues accessibles.',
        payment: 'Acompte de 784 €, puis solde de 1 176 € à la livraison.',
      },
    ],
  },
]

const createOfferMailto = ({ title, price }, client) => {
  const subject = `Demande concernant l'offre ${title}`
  const body = `Bonjour,

Je souhaite échanger au sujet de l'offre « ${title} » (${price}).

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
        <h1 id="offers-title">Offres et tarifs</h1>
        <p className="offers-hero-lead">Un périmètre et un prix définis.</p>
        <p className="offers-hero-copy">
          Les prestations sont proposées au forfait ou sous la forme d’un
          abonnement mensuel. Vous payez la réalisation de la prestation
          convenue.
        </p>
        <div className="offers-hero-meta">
          <span>Prix exprimés hors taxes</span>
          <span>Devis adaptés à votre périmètre</span>
          <span>Paiement échelonné selon l’offre</span>
        </div>
      </section>

      {offerGroups.map((group) => (
        <section className="offers-group" key={group.eyebrow}>
          <div className="offers-group-heading">
            <div className="offers-group-title-row">
              <h2>{group.eyebrow}</h2>
            </div>
            <p className="offers-group-lead">{group.title}</p>
            <p className="offers-group-description">{group.description}</p>
          </div>

          <div className="offers-grid">
            {group.offers.map(({ ...offer }) => (
              <article
                className={`offer-card`}
                key={offer.title}
                role="button"
                tabIndex="0"
                aria-label={`Choisir l'offre ${offer.title}`}
                onClick={() => openOffer(offer)}
                onKeyDown={(event) => handleOfferKeyDown(event, offer)}
              >
                <h3>{offer.title}</h3>
                <strong className="offer-price">{offer.price}</strong>
                <p className="offer-description">{offer.description}</p>
                <ul>
                  {offer.points.map((point) => (
                    <li key={point}>
                      <Check size={17} aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="offer-card-footer">
                  {offer.note && <p>{offer.note}</p>}
                  {offer.payment && <small>{offer.payment}</small>}
                </div>
                <span className="offer-card-action">
                  Choisir cette offre
                  <ArrowRight size={17} aria-hidden="true" />
                </span>
              </article>
            ))}
          </div>

          {group.footer && <p className="offers-group-note">{group.footer}</p>}
        </section>
      ))}

      <section className="offers-custom" aria-labelledby="custom-offer-title">
        <div>
          <div className="offers-custom-heading">
            <h2 id="custom-offer-title">Besoin spécifique</h2>
          </div>
          <p className="offers-custom-lead">Votre projet ne rentre pas dans une case&nbsp;?</p>
          <p>
            Après un entretien de cadrage, je vous propose un forfait
            personnalisé précisant le périmètre, les priorités, les livrables,
            les exclusions, le calendrier et les conditions de paiement.
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
              <strong>{selectedOffer.price}</strong>
              <p>Complétez ces informations avant d’ouvrir votre email.</p>
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
                  placeholder="Contexte, technologies, contraintes…"
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
