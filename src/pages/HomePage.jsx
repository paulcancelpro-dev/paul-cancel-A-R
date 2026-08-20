import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FileText,
  Gauge,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import analysisExample from '../assets/analyse-example.pdf'

const services = [
  {
    icon: FileText,
    title: "Analyse de la codebase",
    text: 'Un diagnostic technique lisible pour prioriser les risques, la dette et les corrections utiles sur vos applications Java.',
    points: ['Synthèse exécutive', 'Scores SonarQube', 'Couverture JaCoCo'],
  },
  {
    icon: Wrench,
    title: 'Correction et refacto',
    text: 'Une intervention ciblée pour corriger les points identifiés, renforcer les tests et rendre la base plus maintenable.',
    points: ['Correctifs P0/P1', 'Refacto progressif', 'Validation après scan'],
  },
]

const metrics = [
  { label: 'Sécurité', value: 'D -> A', tone: 'danger' },
  { label: 'Couverture visée', value: '43% -> 80 %', tone: 'mid' },
  { label: 'Duplication', value: '23% -> 5%', tone: 'success' },
  { label: 'Effort estimé', value: '18 j', tone: 'neutral' },
]

const steps = [
  'Analyse statique de la qualité de code et des vulnérabilités',
  'Mesure de la couverture de tests et des zones aveugles',
  'Priorisation P0/P1 des différents risques identifiés',
  'Correction, tests JUnit 5 et contre-expertise finale',
]

const stack = ['Java', 'Spring Boot', 'Quarkus', 'JUnit 5']

function HomePage() {
  return (
    <main id="top">
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">Analyse et refacto pour applications Java</p>
          <h1>Paul Cancel A&R</h1>
          <p className="hero-copy">
            J'aide les équipes à comprendre leur dette technique, sécuriser
            leurs services Spring Boot ou Quarkus, puis corriger les points
            critiques avec des livrables concrets.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/contact">
              Faire une demande
              <ArrowRight size={18} />
            </Link>
            <a
              className="button secondary"
              href={analysisExample}
              target="_blank"
              rel="noreferrer"
            >
              Voir un exemple
              <ClipboardList size={18} />
            </a>
          </div>
        </div>

        <div className="audit-preview" aria-label="Exemple d'une analyse">
          <div className="preview-topbar">
            <span></span>
            <span></span>
            <span></span>
            <strong>Votre Projet</strong>
          </div>
          <div className="preview-body">
            <div>
              <p className="preview-label">Score de santé</p>
              <h2>Analyse technique</h2>
            </div>
            <div className="score-grid">
              {metrics.map((metric) => (
                <div className={`score ${metric.tone}`} key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
            <div className="finding">
              <ShieldCheck size={22} />
              <div>
                <strong>Risque prioritaire détecté</strong>
                <p>
                  Vulnérabilités de sécurité dans la configuration et le
                  chiffrement, à traiter avant ouverture en production.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-band" aria-label="Technologies utilisées">
        {stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="section" id="services">
        <div className="section-heading">
          <p className="eyebrow">Deux offres complémentaires</p>
          <h2>Une compréhension approfondie de votre codebase et de son infrastructure. Puis une correction vérifiée</h2>
        </div>
        <div className="service-grid">
          {services.map(({ icon: Icon, title, text, points }) => (
            <article className="service-card" key={title}>
              <div className="icon-badge">
                <Icon size={24} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul>
                {points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={18} />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="rapport">
        <div>
          <p className="eyebrow">Analyse complète</p>
          <h2>Un rapport axé technique et organisationnel.</h2>
          <p>
            Je vous met en avant tous les problèmes de sécurité et de maintenabilité,
            mais également les codes smells, les points d'amélioration et les zones aveugles.
            Ensuite je vous expose les différents impacts et efforts de correction nécessaires
            ainsi que l'urgence de ceux-ci dans un plan d'action organisé.
          </p>
        </div>
        <div className="report-list">
          <div>
            <BadgeCheck size={21} />
            <span>Synthèse exécutive pour arbitrer rapidement</span>
          </div>
          <div>
            <Gauge size={21} />
            <span>Priorités P0/P1 avec zones fragiles du code</span>
          </div>
          <div>
            <BarChart3 size={21} />
            <span>Objectifs mesurables après intervention</span>
          </div>
        </div>
      </section>

      <section className="section method-section" id="methode">
        <div className="section-heading">
          <p className="eyebrow">Méthode</p>
          <h2>Une intervention tracée et mesurable.</h2>
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

    </main>
  )
}

export default HomePage
