import { useMemo, useState } from 'react'
import { useLanguage } from '../contextoIdioma'
import './PaginaLivros.css'

function BookCover({ book }) {
  const [failed, setFailed] = useState(false)
  return <div className="book-cover">
    {failed ? <div className="book-cover-fallback" role="img" aria-label={`Capa de ${book.title}, de ${book.author}`}><span>{book.category}</span><strong>{book.title}</strong><small>{book.author}</small></div> : <img src={book.cover} alt={`Capa de ${book.title}, de ${book.author}`} loading="lazy" decoding="async" onError={() => setFailed(true)} />}
  </div>
}

export default function CapasLivrosReais({ books }) {
  const { text } = useLanguage()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const categories = ['all', ...new Set(books.map(book => book.category))]
  const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const filtered = useMemo(() => books.filter(book => (category === 'all' || book.category === category) && normalize(`${book.title} ${book.author}`).includes(normalize(query))), [books, category, query])
  return <>
    <div className="books-filters"><input aria-label={text('Search books by title or author', 'Buscar livros por título ou autor')} value={query} onChange={event => setQuery(event.target.value)} placeholder={text('Search by title or author', 'Buscar por título ou autor')} /><select aria-label={text('Book category', 'Categoria do livro')} value={category} onChange={event => setCategory(event.target.value)}>{categories.map(item => <option key={item} value={item}>{item === 'all' ? text('All categories', 'Todas as categorias') : item}</option>)}</select></div>
    <div className="books-grid">{filtered.map(book => <article className="book-card" key={book.isbn}><BookCover book={book} /><div className="book-info"><span>{book.category}</span><h2>{book.title}</h2><p>{book.author}</p><div className="book-rating" aria-label={`${book.rating} de 5 estrelas`}>{'★'.repeat(book.rating)}<i>{'★'.repeat(5 - book.rating)}</i></div></div></article>)}</div>
    {!filtered.length && <p role="status">{text('No books found.', 'Nenhum livro encontrado.')}</p>}
  </>
}
