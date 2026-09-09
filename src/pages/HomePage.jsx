import { Fragment, useEffect, useRef, useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import analysisExample from '../assets/analyse-example.pdf'
import dockerLogo from '../assets/logos/docker.png'
import javaLogo from '../assets/logos/java.png'
import junitLogo from '../assets/logos/junit.svg'
import mongoDbLogo from '../assets/logos/mongoDb.svg'
import postgresqlLogo from '../assets/logos/postgresql.png'
import quarkusLogo from '../assets/logos/quarkus.png'
import sonarQubeLogo from '../assets/logos/sonarqube.svg'
import springBootLogo from '../assets/logos/spring-boot.svg'

const primaryServices = [
  {
    stage: 'Comprendre',
    title: 'Analyse et diagnostic',
    text: 'Je regarde votre code, puis je vous fais un diagnostic des problèmes que je vous rends sous la forme d’un rapport avec un plan de résolution organisé.',
    offersSection: 'analyse-diagnostic',
  },
  {
    stage: 'Améliorer',
    title: 'Correction et refactorisation',
    text: 'En me basant sur l’analyse précédente, j’applique des correctifs par ordre de priorités. Je vous montre ensuite les changements et impacts avec une contre analyse.',
    offersSection: 'correction-refactorisation',
  },
  {
    stage: 'Maintenir',
    title: 'Accompagnement mensuel',
    text: 'Une fois que votre application est dans un état stable, je vous propose de la vérifier régulièrement. L’objectif est d’éviter que la dette technique ne s\'accumule à nouveau. ',
    offersSection: 'accompagnement-mensuel',
  },
]

const steps = [
  'Analyse statique de la qualité de code et des vulnérabilités',
  'Mesure de la couverture de tests et des zones aveugles',
  'Priorisation P0/P1 des différents risques identifiés',
  'Correction, tests JUnit 5 et contre-expertise finale',
]

const technologies = [
  { name: 'Java', logo: javaLogo },
  { name: 'Spring Boot', logo: springBootLogo },
  { name: 'Quarkus', logo: quarkusLogo },
  { name: 'Docker', logo: dockerLogo },
  { name: 'SonarQube', logo: sonarQubeLogo },
  { name: 'JUnit 5', logo: junitLogo },
  { name: 'PostgreSQL', logo: postgresqlLogo },
  { name: 'MongoDB', logo: mongoDbLogo },
]

function HomePage() {
  const [selectedService, setSelectedService] = useState(null)
  const closeButtonRef = useRef(null)
  const serviceTriggerRef = useRef(null)

  useEffect(() => {
    if (!selectedService) return undefined

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedService(null)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    requestAnimationFrame(() => closeButtonRef.current?.focus())

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      requestAnimationFrame(() => serviceTriggerRef.current?.focus())
    }
  }, [selectedService])

  const openService = (service, trigger) => {
    serviceTriggerRef.current = trigger
    setSelectedService(service)
  }

  return (
    <main id="top">
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">Analyse et refacto pour applications Java</p>
          <h1>
            Paul Cancel <span>A&amp;R</span>
          </h1>
          <p className="hero-copy">
            J'aide les équipes à comprendre leur dette technique, sécuriser
            leurs services Spring Boot ou Quarkus, puis corriger les points
            critiques.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/offres">
              Consulter les offres
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </section>

      <section className="trust-band" aria-label="Technologies utilisées">
        <div className="technology-marquee">
          <div className="technology-track">
            {[false, true].map((isDuplicate) => (
              <div
                className="technology-set"
                key={isDuplicate ? 'duplicate' : 'original'}
                aria-hidden={isDuplicate || undefined}
              >
                {technologies.map((technology) => (
                  <div className="technology-item" key={technology.name}>
                    <img
                      src={technology.logo}
                      alt={isDuplicate ? '' : technology.name}
                    />
                    <span>{technology.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-heading">
          <h2 className="section-title">Services</h2>
          <p className="section-lead">
            Un petit récapitulatif des services que je propose.
          </p>
        </div>
        <div className="service-journey" aria-label="Parcours principal">
          {primaryServices.map((service, index) => (
            <Fragment key={service.title}>
              <button
                className={`service-card service-step service-step-${index + 1}`}
                type="button"
                onClick={(event) => openService(service, event.currentTarget)}
              >
                <span className="service-step-label">{service.stage}</span>
                <h3>{service.title}</h3>
              </button>
              {index < primaryServices.length - 1 && (
                <ArrowRight
                  className={`service-connector service-connector-${index + 1}`}
                  size={24}
                  aria-hidden="true"
                />
              )}
            </Fragment>
          ))}
        </div>
      </section>

      <section className="section method-section" id="methode">
        <div className="section-heading">
          <h2 className="section-title">Méthode</h2>
          <p className="section-lead">Une intervention tracée et mesurable.</p>
        </div>
        <ol className="timeline">
          {steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-contact-section" aria-labelledby="home-contact-title">
        <div>
          <h2 id="home-contact-title">Besoin de renseignements&nbsp;?</h2>
        </div>
        <Link className="button primary" to="/contact">
          Me contacter
          <ArrowRight size={18} />
        </Link>
      </section>

      {selectedService && (
        <div
          className="offer-modal-backdrop service-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedService(null)
          }}
        >
          <section
            className="offer-modal service-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
            <button
              ref={closeButtonRef}
              className="offer-modal-close"
              type="button"
              aria-label="Fermer"
              onClick={() => setSelectedService(null)}
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="offer-modal-heading">
              <h2 id="service-modal-title">{selectedService.title}</h2>
              <p>{selectedService.text}</p>
              <div className="service-modal-actions">
                <Link
                  className="button primary service-modal-link"
                  to={`/offres#${selectedService.offersSection}`}
                  onClick={() => setSelectedService(null)}
                >
                  Voir les offres
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                {selectedService.offersSection === 'analyse-diagnostic' && (
                  <a
                    className="button secondary service-modal-link"
                    href={analysisExample}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Voir un exemple
                  </a>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default HomePage
