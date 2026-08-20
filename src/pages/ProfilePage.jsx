import { Code2, GraduationCap, TerminalSquare } from 'lucide-react'
import profilePhoto from '../assets/photoprofil.jpeg'

function ProfilePage() {
  return (
    <main className="profile-page">
      <section className="profile-page-content" aria-labelledby="profile-title">
        <div className="profile-portrait">
          <img src={profilePhoto} alt="Portrait de Paul Cancel" />
        </div>

        <div className="profile-copy">
          <p className="eyebrow">Profil</p>
          <h1 id="profile-title">Spécialisé Java, Spring Boot et Quarkus.</h1>
          <p>
            Diplomé d'un BUT informatique à Lille spécialisé en développement, je
            suis actuellement en formation d'ingénieur à l'institut 
            des Mines Télécom campus Nord Europe, parcours Informatique et Télécommunications. 
            Je suis spécialisé dans le développement backend Java depuis près de 4 ans.
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

export default ProfilePage
