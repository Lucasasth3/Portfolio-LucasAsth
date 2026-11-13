import { useLanguage } from '../languageContext'
import { socialLinks } from '../data/profile'

function Contact() {
  const { text } = useLanguage()
  return (
    <section className="content-section contact-section" id="contact">
      <div>
        <h2>{text("Contact", "Contato")}</h2>
        <p>{text("I’m open to conversations about internships, projects, and web development.", "Estou aberto a conversas sobre estágio, projetos e desenvolvimento web.")}</p>
        <div className="contact-links">
          <a href="mailto:lucasasth3@outlook.com">{text("Email", "E-mail")}</a>
          <a href="tel:+5531971019524">{text("Phone", "Telefone")}</a>
          {socialLinks.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
