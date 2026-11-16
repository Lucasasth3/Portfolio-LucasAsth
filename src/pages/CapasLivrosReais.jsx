import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../contextoIdioma'
import './PaginaLivros.css'

export default function CapasLivrosReais({ books }) {
  const { text } = useLanguage()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [covers, setCovers] = useState(() => Object.fromEntries(books.map((book) => [book.title, book.localCover || book.isbnCover])))
  useEffect(() => {
    let active = true
    Promise.all(books.map(async (book) => {
      if (book.localCover) return [book.title, book.localCover]
      try {
        const googleResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(book.isbn)}&maxResults=1`)
        const googleResult = await googleResponse.json()
        const image = googleResult.items?.[0]?.volumeInfo?.imageLinks?.thumbnail?.replace('http://', 'https://')
        if (image) return [book.title, image]
        const response = await fetch(`https://openlibrary.org/search.json?isbn=${encodeURIComponent(book.isbn)}&limit=1`)
        const result = await response.json()
        const coverId = result.docs?.[0]?.cover_i
        return [book.title, coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : book.isbnCover]
      } catch { return [book.title, book.isbnCover] }
    })).then((entries) => { if (active) setCovers(Object.fromEntries(entries)) })
    return () => { active = false }
  }, [books])
  const categories = ['all', ...new Set(books.map((book) => book.category))]
  const filtered = useMemo(() => books.filter((book) => (category === 'all' || book.category === category) && book.title.toLowerCase().includes(query.toLowerCase()) && covers[book.title]), [books, category, query, covers])
  return <>
    <div className="books-filters"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text('Search by title', 'Buscar por título')} /><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item} value={item}>{item === 'all' ? text('All categories', 'Todas as categorias') : item}</option>)}</select></div>
    <div className="books-grid">{filtered.map((book) => <article className="book-card" key={book.title}><div className="book-cover"><img src={covers[book.title]} alt={`Capa de ${book.title}`} loading="lazy" /></div><div className="book-info"><span>{book.category}</span><h2>{book.title}</h2><p>{book.author}</p><div className="book-rating" aria-label={`${book.rating} de 5 estrelas`}>{'★'.repeat(book.rating)}<i>{'★'.repeat(5 - book.rating)}</i></div></div></article>)}</div>
  </>
}
