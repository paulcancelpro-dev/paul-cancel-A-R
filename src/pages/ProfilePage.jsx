import profilePhoto from '../assets/photoprofil.jpeg'
import imtLogo from '../assets/logos/imt.png'
import iutLogo from '../assets/logos/iut.png'

function ProfilePage() {
  return (
    <main className="profile-page">
      <section className="profile-page-content" aria-labelledby="profile-story-title">
        <div className="profile-portrait">
          <img src={profilePhoto} alt="Portrait de Paul Cancel" />
        </div>

        <section className="profile-story" aria-labelledby="profile-story-title">
          <div className="profile-story-heading">
            <h1 id="profile-story-title">Qui suis-je ?</h1>
          </div>
          <div className="profile-story-copy">
            <p>
              Tout a commencé en 2011, lorsque j’avais 7 ans. Je jouais à
              Minecraft et j’ai découvert les mods et, étant de nature
              curieuse, j’ai voulu comprendre comment c’était possible. J’y ai
              fait ma première rencontre avec Java, j’apprenais par la lecture
              de code et par des tests répétés. J’ai également reçu à cette
              période, par mon oncle lors d’un Noël, un livre sur la
              programmation Scratch, où a débuté ma compréhension et ma passion
              du format séquentiel.
            </p>
            <p>
              Mon intérêt s’est consolidé par la spécialité Numérique et
              Sciences Informatiques au lycée, puis par un BUT Informatique en
              parcours réalisation d’applications : conception, développement
              et validation. J’y ai acquis beaucoup de compétences et de bonnes
              pratiques que j’applique quotidiennement dans mon travail, encore
              aujourd’hui. Je poursuis ce parcours par des études d’ingénieur à
              l’IMT Nord Europe, parcours Informatique et Télécommunications où
              je suis actuellement en deuxième année.
            </p>
            <p>
              J’aime comprendre et structurer, ce qui m’a naturellement tourné
              vers l’analyse de code et la refacto lorsque je l’ai combinée à ma
              passion pour le développement. J’aime la sensation que cela me
              procure de trouver, puis de comprendre un problème, dans le but
              d’y apporter une solution. Et j’ai à cœur également que cette
              solution produise des résultats mesurables et adaptés aux besoins
              nécessaires.
            </p>
          </div>
        </section>

        <div className="profile-school-logos" aria-label="Établissements de formation">
          <img className="profile-school-logo imt" src={imtLogo} alt="IMT Nord Europe" />
          <img className="profile-school-logo iut" src={iutLogo} alt="IUT de Lille" />
        </div>
      </section>
    </main>
  )
}

export default ProfilePage
