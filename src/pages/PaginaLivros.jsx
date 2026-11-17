import { books } from '../data/livros'
import { useLanguage } from '../contextoIdioma'
import CapasLivrosReais from './CapasLivrosReais'
import './PaginaLivros.css'

export default function BooksPage() {
  const { text } = useLanguage()
  return <section className="books-page" aria-labelledby="books-title">
    <header className="books-heading">
      <p className="contact-eyebrow">04 / {text('Reading list', 'Livros')}</p>
      <h1 id="books-title">{text('Ideas I keep close.', 'Ideias que carrego comigo.')}</h1>
      <p>{text('Books that shaped how I think about products, people and building software.', 'Livros que influenciaram minha forma de pensar sobre produtos, pessoas e software.')}</p>
    </header>
    <div className="books-summary"><strong>{books.length}</strong><span>{text('books read and revisited', 'livros lidos e revisitados')}</span></div>
    <p className="books-rating-note">{text('Reading ratings, from one to five stars.', 'Notas de leitura, de uma a cinco estrelas.')}</p>
    <CapasLivrosReais books={books} />
  </section>
}
