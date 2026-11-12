import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="content-section not-found">
      <p className="section-number">404</p>
      <div>
        <h1>Página não encontrada</h1>
        <p>O endereço informado não corresponde a uma página do portfólio.</p>
        <Link className="button button-primary" to="/">Voltar para a home</Link>
      </div>
    </section>
  )
}

export default NotFoundPage
