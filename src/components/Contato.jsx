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
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [comments, setComments] = useState(() => JSON.parse(window.localStorage.getItem('portfolio-comments') || '[]'))

  useEffect(() => {
    if (ready) return
    const timer = window.setTimeout(() => setReady(true), callDuration)
    return () => window.clearTimeout(timer)
  }, [ready])

  async function openEmail(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
    if (!endpoint) {
      setSendError(text('Contact sending is not configured yet.', 'O envio direto ainda não foi configurado.'))
      return
    }
    setSending(true)
    setSendError('')
    try {
      const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error('send failed')
      setSent(true)
      event.currentTarget.reset()
    } catch {
      setSendError(text('Could not send the message. Please try again.', 'Não foi possível enviar a mensagem. Tente novamente.'))
    } finally {
      setSending(false)
    }
  }

  function addComment(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const file = data.get('comment-photo')
    if (!file || !file.size || !file.type.startsWith('image/')) return
    if (file.size > 5 * 1024 * 1024) return
    const reader = new FileReader()
    reader.onload = () => {
      const comment = { name: data.get('comment-name').trim(), message: data.get('comment-message').trim(), photo: reader.result }
      const next = [comment, ...comments].slice(0, 12)
      setComments(next)
      window.localStorage.setItem('portfolio-comments', JSON.stringify(next))
      event.currentTarget.reset()
    }
    reader.readAsDataURL(file)
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
          <aside className="contact-info-panel" aria-label={text('Contact details', 'Detalhes de contato')}>
            <div className="contact-availability"><i aria-hidden="true" />{text('Open to work and collaborations', 'Aberto a trabalho e colaborações')}</div>
            <a className="contact-info-card" href={'mailto:' + email}><span aria-hidden="true">✉</span><div><small>E-MAIL</small><strong>{email}</strong></div></a>
            <div className="contact-info-card"><span aria-hidden="true">⌖</span><div><small>{text('LOCATION', 'LOCALIZAÇÃO')}</small><strong>{text('Belo Horizonte, Brazil', 'Belo Horizonte, Brasil')}</strong></div></div>
            <div className="contact-info-socials">
              {[...socialLinks, instagram].map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>{label.slice(0, 2)}</a>)}
            </div>
            <p className="contact-response-note">{text('Feel free to write in English or Portuguese. I usually reply within one day.', 'Fique à vontade para escrever em inglês ou português. Normalmente respondo em um dia.')}</p>
          </aside>
          {sent ? <div className="contact-success"><h2>Thank you!</h2><p>{text('I will get back to you as soon as possible.', 'Entrarei em contato assim que possível.')}</p><button className="button button-secondary" type="button" onClick={() => setSent(false)}>{text('Send another message', 'Enviar outra mensagem')}</button></div> : <form className="contact-form" onSubmit={openEmail} aria-labelledby="contact-form-title">
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
              <button className="button button-primary" type="submit" disabled={sending}>{sending ? text('Sending…', 'Enviando…') : text('Send message', 'Enviar mensagem')}</button>
              {sendError ? <p className="contact-send-error">{sendError}</p> : <p>{text('Your message will be sent directly to me.', 'Sua mensagem será enviada diretamente para mim.')}</p>}
            </div>
          </form>}

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

          <section className="contact-comments" aria-labelledby="comments-title">
            <div className="contact-comments-heading">
              <p className="contact-eyebrow">{text('Recommendations', 'Recomendações')}</p>
              <h2 id="comments-title">{text('What people say about working with me', 'O que dizem sobre trabalhar comigo')}</h2>
            </div>
            <form className="contact-comment-form" onSubmit={addComment}>
              <label>{text('Name', 'Nome')}<input name="comment-name" required maxLength={80} placeholder={text('Your name', 'Seu nome')} /></label>
              <label>{text('Comment', 'Comentário')}<textarea name="comment-message" required maxLength={400} rows={4} placeholder={text('Share your experience...', 'Conte como foi trabalhar comigo...')} /></label>
              <label>{text('Profile photo (required)', 'Foto de perfil (obrigatória)')}<input name="comment-photo" type="file" accept="image/*" required /></label>
              <button className="button button-primary" type="submit">{text('Leave a recommendation', 'Deixar uma recomendação')}</button>
            </form>
            <div className="contact-comment-list">
              {comments.length === 0 && <p className="contact-empty-comments">{text('Your recommendations will appear here.', 'Suas recomendações aparecerão aqui.')}</p>}
              {comments.map((comment, index) => <article className="contact-comment" key={`${comment.name}-${index}`}>{comment.photo && <img src={comment.photo} alt="" /> }<div><strong>{comment.name}</strong><p>{comment.message}</p></div></article>)}
            </div>
          </section>
        </div>
      )}
    </section>
  )
}

export default Contact
