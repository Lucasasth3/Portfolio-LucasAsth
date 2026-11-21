import { useEffect, useState } from 'react'
import { useLanguage } from '../contextoIdioma'
import { socialLinks } from '../data/perfil'
import ContactCall from './LigacaoContato'
import './Contato.css'
import { getWhatsAppLink, sendContact } from '../services/contato.js'

const email = 'lucasasth3@outlook.com'
const instagram = { label: 'Instagram', href: 'https://www.instagram.com/lucasasth/' }
const callDuration = 2400
const whatsappUrl = getWhatsAppLink(import.meta.env.VITE_WHATSAPP_NUMBER)
const contactLinks = [...socialLinks, instagram, ...(whatsappUrl ? [{ label: 'WhatsApp', href: whatsappUrl }] : [])]

function readComments() {
  try {
    const saved = JSON.parse(window.localStorage.getItem('portfolio-comments') || '[]')
    return Array.isArray(saved) ? saved.filter(item => item && typeof item.name === 'string' && typeof item.message === 'string' && typeof item.photo === 'string').slice(0, 12) : []
  } catch { return [] }
}

function Contact() {
  const { text } = useLanguage()
  const [ready, setReady] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [comments, setComments] = useState(readComments)
  const [commentError, setCommentError] = useState('')

  useEffect(() => {
    if (ready) return
    const timer = window.setTimeout(() => setReady(true), callDuration)
    return () => window.clearTimeout(timer)
  }, [ready])

  async function openEmail(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setSending(true)
    setSendError('')
    try {
      await sendContact(data, { endpoint: import.meta.env.VITE_CONTACT_ENDPOINT })
      form.reset()
      setSent(true)
    } catch (error) {
      setSendError(error.message === 'invalid_form'
        ? text('Check your name, email, subject and message.', 'Confira seu nome, e-mail, assunto e mensagem.')
        : text('The message could not be sent. Please try again or contact me by email.', 'A mensagem não foi enviada. Tente novamente ou fale comigo por e-mail.'))
    } finally {
      setSending(false)
    }
  }

  function addComment(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setCommentError('')
    const file = data.get('comment-photo')
    if (!file || !file.size || !file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      setCommentError(text('Choose an image smaller than 5 MB.', 'Escolha uma imagem de até 5 MB.'))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const comment = { name: data.get('comment-name').trim(), message: data.get('comment-message').trim(), photo: reader.result }
      const next = [comment, ...comments].slice(0, 12)
      try {
        window.localStorage.setItem('portfolio-comments', JSON.stringify(next))
        setComments(next)
        form.reset()
      } catch { setCommentError(text('Could not save. Try a smaller photo.', 'Não foi possível salvar. Tente uma foto menor.')) }
    }
    reader.onerror = () => setCommentError(text('Could not read the image.', 'Não foi possível ler a imagem.'))
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
            {whatsappUrl && <a className="contact-info-card" href={whatsappUrl} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.4 7.9L3 21l1.6-4.6A9 9 0 1 1 21 11.5Z" /><path d="M8 7c0 5 4 9 9 9l1-3-3-1-1 1c-1.5-.6-2.4-1.5-3-3l1-1-1-3-3 1Z" /></svg><div><small>WHATSAPP</small><strong>{text('Start a conversation', 'Converse comigo')}</strong></div></a>}
            <div className="contact-info-card"><span aria-hidden="true">⌖</span><div><small>{text('LOCATION', 'LOCALIZAÇÃO')}</small><strong>{text('Belo Horizonte, Brazil', 'Belo Horizonte, Brasil')}</strong></div></div>
            <div className="contact-info-socials">
              {contactLinks.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>{label.slice(0, 2)}</a>)}
            </div>
            <p className="contact-response-note">{text('Feel free to write in English or Portuguese. I usually reply within one day.', 'Fique à vontade para escrever em inglês ou português. Normalmente respondo em um dia.')}</p>
          </aside>
          {sent ? <div className="contact-success" role="status"><h2>{text('Message sent!', 'Mensagem enviada!')}</h2><p>{text('I will get back to you as soon as possible.', 'Entrarei em contato assim que possível.')}</p><button className="button button-secondary" type="button" onClick={() => setSent(false)}>{text('Send another message', 'Enviar outra mensagem')}</button></div> : <form className="contact-form" onSubmit={openEmail} aria-labelledby="contact-form-title">
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
              {sendError ? <p className="contact-send-error" role="alert">{sendError} <a href={'mailto:' + email}>{email}</a></p> : <p>{text('Your message will be sent directly to me.', 'Sua mensagem será enviada diretamente para mim.')}</p>}
            </div>
          </form>}

          <address className="contact-address" aria-label={text('Contact information', 'Informações de contato')}>
            <div>
              <p className="contact-eyebrow">{text('Direct contact', 'Contato direto')}</p>
              <a className="contact-email" href={'mailto:' + email}>{email}</a>
              <p className="contact-location">{text('Belo Horizonte, Brazil', 'Belo Horizonte, Brasil')}</p>
            </div>
            <div className="contact-socials">
              {contactLinks.map(({ label, href }) => (
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
              <p>{text('Recommendations added here are saved only in this browser.', 'As recomendações adicionadas aqui ficam salvas apenas neste navegador.')}</p>
            </div>
            <form className="contact-comment-form" onSubmit={addComment}>
              <label>{text('Name', 'Nome')}<input name="comment-name" required maxLength={80} placeholder={text('Your name', 'Seu nome')} /></label>
              <label>{text('Comment', 'Comentário')}<textarea name="comment-message" required maxLength={400} rows={4} placeholder={text('Share your experience...', 'Conte como foi trabalhar comigo...')} /></label>
              <label>{text('Profile photo (required)', 'Foto de perfil (obrigatória)')}<input name="comment-photo" type="file" accept="image/*" required /></label>
              <button className="button button-primary" type="submit">{text('Leave a recommendation', 'Deixar uma recomendação')}</button>
              {commentError && <p role="alert">{commentError}</p>}
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
