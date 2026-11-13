import { useLanguage } from '../contextoIdioma'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  const { text } = useLanguage()
  return (
    <section className="content-section not-found">
      <p className="section-number">404</p>
      <div>
        <h1>{text("Page not found", "Página não encontrada")}</h1>
        <p>{text("There’s no portfolio page at this address.", "O endereço informado não corresponde a uma página do portfólio.")}</p>
        <Link className="button button-primary" to="/">{text("Back to home", "Voltar para a home")}</Link>
      </div>
    </section>
  )
}

export default NotFoundPage
