import { useEffect, useState } from 'react'
import { useLanguage } from '../contextoIdioma'
import { socialLinks } from '../data/perfil'
import ContactCall from './LigacaoContato'
import './Contato.css'

const email = 'lucasasth3@outlook.com'
const instagram = { label: 'Instagram', href: 'https://www.instagram.com/lucasasth/' }
const callDuration = 2400

function Contact() {
  const { text } = useLanguage()
  const [ready, setReady] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (ready) return
    const timer = window.setTimeout(() => setReady(true), callDuration)
    return () => window.clearTimeout(timer)
  }, [ready])

  function openEmail(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(data.get('subject').trim())
    const body = encodeURIComponent([
      data.get('message').trim(),
      '',
      text('Full name: ', 'Nome completo: ') + data.get('name').trim(),
      text('Email: ', 'E-mail: ') + data.get('email').trim(),
    ].join('\r\n'))
    window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + body
  }

  return (
    <section className="contact-page" aria-labelledby="contact-title">
      <header className="contact-heading">
        <p className="contact-eyebrow">{text('Projects & partnerships', 'Projetos e parcerias')}</p>
        <h1 id="contact-title">{text('Get in touch', 'Entre em contato comigo')}</h1>
        <p>{text('Have a question or just want to say hello? Send me a message.', 'Quer tirar uma dúvida ou só bater um papo? Me mande uma mensagem.')}</p>
      </header>

      <div className="contact-call">
        <ContactCall playing={!ready} />
        <div className="contact-call-caption">
          <span className="contact-call-status"><i aria-hidden="true" />{ready ? text('Connected', 'Ligação atendida') : text('Calling…', 'Ligando…')}</span>
          <h2>Lucas Asth</h2>
          <p>{ready
            ? text('What are you interested in?', 'Me conte o que tem interesse?')
            : text('Hi, this is Lucas. Is now a good time to talk about your project?', 'Oi, aqui é o Lucas. É um bom momento pra falar do seu projeto?')}</p>
          {!ready && (
            <button className="contact-skip" type="button" onClick={() => setReady(true)}>
              {text('Skip to contact form', 'Ir para o formulário')}
            </button>
          )}
        </div>
      </div>

      {ready && (
        <div className="contact-details">
          <form className="contact-form" onSubmit={openEmail} aria-labelledby="contact-form-title">
            <h2 id="contact-form-title">{text('Contact me', 'Entre em contato')}</h2>
            <label>{text('Full name', 'Nome completo')}
              <input name="name" autoComplete="name" required maxLength={120} />
            </label>
            <label>{text('Email', 'E-mail')}
              <input name="email" type="email" autoComplete="email" required maxLength={254} />
            </label>
            <label className="contact-wide">{text('What’s it about?', 'Sobre o que é?')}
              <input name="subject" required maxLength={140} placeholder={text('e.g. A website for my business', 'Ex.: um site para minha empresa')} />
            </label>
            <label className="contact-wide">{text('Message', 'Mensagem')}
              <textarea name="message" rows={5} required maxLength={1500}
                placeholder={text('What do you need, and when would you like it ready?', 'Do que você precisa e para quando?')} />
            </label>
            <div className="contact-wide contact-submit">
              <button className="button button-primary" type="submit">{text('Open in my email app', 'Abrir no meu app de e-mail')}</button>
              <p>{text('Your email app opens with the message ready for you to send.', 'Seu app de e-mail abre com a mensagem pronta para você enviar.')}</p>
            </div>
          </form>

          <address className="contact-address" aria-label={text('Contact information', 'Informações de contato')}>
            <div>
              <p className="contact-eyebrow">{text('Direct contact', 'Contato direto')}</p>
              <a className="contact-email" href={'mailto:' + email}>{email}</a>
              <p className="contact-location">{text('Belo Horizonte, Brazil', 'Belo Horizonte, Brasil')}</p>
            </div>
            <div className="contact-socials">
              {[...socialLinks, instagram].map(({ label, href }) => (
                <a key={label} className="button button-secondary" href={href} target="_blank" rel="noreferrer">
                  {label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </address>
        </div>
      )}
    </section>
  )
}

export default Contact
