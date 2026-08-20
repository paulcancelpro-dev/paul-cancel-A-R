import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Code2,
  FileText,
  Gauge,
  GraduationCap,
  ShieldCheck,
  TerminalSquare,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    icon: FileText,
    title: "Rapport d'audit et d'analyse",
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
  { label: 'Couverture visée', value: '> 80 %', tone: 'success' },
  { label: 'Duplication', value: '0 %', tone: 'neutral' },
  { label: 'Effort estimé', value: '2 j', tone: 'neutral' },
]

const steps = [
  'Analyse statique SonarQube et lecture du code métier',
  'Mesure de couverture JaCoCo et repérage des zones aveugles',
  'Priorisation P0/P1 avec impact technique et business',
  'Correction, tests JUnit 5 et contre-expertise finale',
]

const stack = ['Java', 'Spring Boot', 'Quarkus', 'SonarQube', 'JaCoCo', 'JUnit 5']

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
              Demander un audit
              <ArrowRight size={18} />
            </Link>
            <a className="button secondary" href="#rapport">
              Voir un exemple
              <ClipboardList size={18} />
            </a>
          </div>
        </div>

        <div className="audit-preview" aria-label="Exemple de rapport d'audit">
          <div className="preview-topbar">
            <span></span>
            <span></span>
            <span></span>
            <strong>Votre Projet</strong>
          </div>
          <div className="preview-body">
            <div>
              <p className="preview-label">Score de santé</p>
              <h2>Audit technique</h2>
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
          <h2>De la lecture du code à la correction vérifiée.</h2>
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
          <p className="eyebrow">Livrable d'audit</p>
          <h2>Un rapport qui parle autant technique que décision.</h2>
          <p>
            Le document met en avant les notes de sécurité, fiabilité,
            maintenabilité, couverture de tests et duplication, puis relie
            chaque problème à un impact et à un effort de correction.
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
          <h2>Une intervention courte, tracée et mesurable.</h2>
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

      <section className="section profile-section" id="profil">
        <div className="profile-copy">
          <p className="eyebrow">Profil</p>
          <h2>Spécialisé Java, Spring Boot et Quarkus.</h2>
          <p>
            Diplomé d'un BUT informatique à Lille spécialisé en développement, je
            suis actuellement à l'IMT Nord Europe en alternance, en première année du
            parcours Informatique et Télécommunications, spécialité Informatique. Je
            suis spécialisé dans le développement backend Java.
          </p>
        </div>
        <div className="profile-facts">
          <div>
            <Code2 size={22} />
            <strong>Code review orientée production</strong>
            <span>Architecture, dette, sécurité et tests.</span>
          </div>
          <div>
            <TerminalSquare size={22} />
            <strong>Stack backend Java</strong>
            <span>Spring Boot, Quarkus, JUnit, outillage qualité.</span>
          </div>
          <div>
            <GraduationCap size={22} />
            <strong>Formation developpement</strong>
            <span>BUT informatique puis IMT Nord Europe.</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
