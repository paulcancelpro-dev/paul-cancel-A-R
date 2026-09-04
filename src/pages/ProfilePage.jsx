import profilePhoto from '../assets/photoprofil.jpeg'
import dockerLogo from '../assets/logos/docker.png'
import javaLogo from '../assets/logos/java.png'
import quarkusLogo from '../assets/logos/quarkus.png'
import sonarQubeLogo from '../assets/logos/sonarqube.svg'
import springBootLogo from '../assets/logos/spring-boot.svg'
import jeeLogo from '../assets/logos/JakartaEE.png'
import junitLogo from '../assets/logos/junit.svg'
import postgresqlLogo from '../assets/logos/postgresql.png'

const technologies = [
  { name: 'Java', logo: javaLogo },
  { name: 'Spring Boot', logo: springBootLogo },
  { name: 'Quarkus', logo: quarkusLogo },
  { name: 'Jakarta EE', logo: jeeLogo },
  { name: 'Docker', logo: dockerLogo },
  { name: 'SonarQube', logo: sonarQubeLogo },
  { name: 'JUnit 5', logo: junitLogo },
  { name: 'PostgreSQL', logo: postgresqlLogo },
]

function ProfilePage() {
  return (
    <main className="profile-page">
      <section className="profile-page-content" aria-labelledby="profile-title">
        <div className="profile-portrait">
          <img src={profilePhoto} alt="Portrait de Paul Cancel" />
        </div>

        <div className="profile-copy">
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
            <strong>Code review orientée production</strong>
            <span>Architecture, dette, sécurité et tests.</span>
          </div>
          <div>
            <strong>Stack backend Java</strong>
            <span>Spring Boot, Quarkus, JUnit, outillage qualité.</span>
          </div>
          <div>
            <strong>Formation developpement</strong>
            <span>BUT informatique puis IMT Nord Europe.</span>
          </div>
        </div>

        <section className="profile-technologies" aria-labelledby="technologies-title">
          <h2 id="technologies-title">Technologies</h2>
          <div className="profile-logo-marquee">
            <div className="profile-logo-track">
              {[false, true].map((isDuplicate) => (
                <div
                  className="profile-logo-set"
                  key={isDuplicate ? 'duplicate' : 'original'}
                  aria-hidden={isDuplicate || undefined}
                >
                  {technologies.map((technology) => (
                    <div className="profile-logo-item" key={technology.name}>
                      <img src={technology.logo} alt={isDuplicate ? '' : technology.name} />
                      <span>{technology.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

export default ProfilePage
