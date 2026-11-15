import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../contextoIdioma'
import './PaginaLivros.css'
import CapasLivrosReais from './CapasLivrosReais'

const bookSeed = [
  ['Mindset', [['Mindset', 'Carol Dweck', 5, '9788547000240'], ['O poder do agora', 'Eckhart Tolle', 5, '9788575420273'], ['Os 7 hábitos das pessoas altamente eficazes', 'Stephen Covey', 5, '9788543105871'], ['A coragem de ser imperfeito', 'Brené Brown', 4, '9788543104300'], ['Mais esperto que o diabo', 'Napoleon Hill', 4, '9788568014000'], ['O jeito Harvard de ser feliz', 'Shawn Achor', 4, '0553415067'], ['Rápido e devagar', 'Daniel Kahneman', 5, '9788539003839'], ['O homem em busca de sentido', 'Viktor Frankl', 5, '9788532532899'], ['A arte da felicidade', 'Dalai Lama', 4, '9788573029950'], ['Meditações', 'Marco Aurélio', 5, '9786559100576'], ['A montanha é você', 'Brianna Wiest', 4, '9786555603491'], ['O obstáculo é o caminho', 'Ryan Holiday', 4, '9788551004924'], ['Antifrágil', 'Nassim Taleb', 4, '9788576849333']]],
  ['Produtividade', [['Essencialismo', 'Greg McKeown', 5, '0804137382'], ['Trabalho focado', 'Cal Newport', 5, '9788551003422'], ['Hábitos atômicos', 'James Clear', 5, '9788550807564'], ['A única coisa', 'Gary Keller', 4, '9788543102382'], ['Getting Things Done', 'David Allen', 4, '9780349406784'], ['Comece pelo mais difícil', 'Brian Tracy', 4, '9788573126742'], ['A tríade do tempo', 'Christian Barbosa', 4, '9788573127152'], ['O poder do hábito', 'Charles Duhigg', 5, '081298160X'], ['Organize amanhã hoje', 'Jason Selk', 4, '9788573129184'], ['Deep Work', 'Cal Newport', 5, '9781455586691'], ['Checklist', 'Atul Gawande', 4, '9788539002047'], ['A arte de fazer acontecer', 'David Allen', 4, '9788575428026']]],
  ['Empreendedorismo', [['Comece pelo porquê', 'Simon Sinek', 5, '1591846447'], ['A startup enxuta', 'Eric Ries', 5, '9788543108629'], ['De zero a um', 'Peter Thiel', 4, '9788580577514'], ['O lado difícil das situações difíceis', 'Ben Horowitz', 4, '9788543102023'], ['A estratégia do oceano azul', 'W. Chan Kim', 4, '9788535215244'], ['Pai rico, pai pobre', 'Robert Kiyosaki', 4, '9788557173280'], ['A empresa do século XXI', 'Robert Kiyosaki', 4, '9788576843168'], ['Rework', 'Jason Fried', 4, '9780307463746'], ['O mito do empreendedor', 'Michael Gerber', 4, '9788535207485'], ['Criatividade S.A.', 'Ed Catmull', 5, '9788539604798'], ['StoryBrand', 'Donald Miller', 4, '9788543105464'], ['A loja de tudo', 'Brad Stone', 4, '9788543102207'], ['Sprint', 'Jake Knapp', 4, '9781501121746'], ['Marketing 4.0', 'Philip Kotler', 4, '9788543105334']]],
  ['Tecnologia e desenvolvimento', [['Código limpo', 'Robert C. Martin', 5, '9788576082675'], ['O programador pragmático', 'Andrew Hunt', 5, '9780135957059'], ['Refatoração', 'Martin Fowler', 5, '9780134757599'], ['Domain-Driven Design', 'Eric Evans', 4, '0321125215'], ['Entendendo algoritmos', 'Aditya Bhargava', 5, '9788575225634'], ['Estruturas de dados e algoritmos em Java', 'Michael Goodrich', 4, '9781118771334'], ['Design de interação', 'Jennifer Preece', 4, '9788536304947'], ['Não me faça pensar', 'Steve Krug', 5, '9788576088505'], ['O design do dia a dia', 'Don Norman', 5, '9788532520836'], ['Clean Architecture', 'Robert C. Martin', 4, '9780134494166'], ['Engenharia de software', 'Ian Sommerville', 4, '9788543024970'], ['Design Patterns', 'Erich Gamma', 5, '0201633612'], ['The Phoenix Project', 'Gene Kim', 5, '9781942788294'], ['The Mythical Man-Month', 'Frederick Brooks', 4, '9780201835953'], ['You Don’t Know JS', 'Kyle Simpson', 4, '9781491904244']]],
]

const books = bookSeed.flatMap(([category, items]) => items.map(([title, author, rating, isbn]) => ({
  title,
  author,
  category,
  rating,
  isbn,
  // O endpoint por título encontra capas mesmo quando uma edição específica não possui ISBN cadastrado.
  cover: `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-L.jpg`,
  isbnCover: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
})))
const fallbackCover = (title) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900"><rect width="600" height="900" fill="#241f23"/><rect x="34" y="34" width="532" height="832" fill="none" stroke="#d5575e" stroke-width="4"/><text x="60" y="460" fill="#fefefe" font-size="42" font-family="Georgia" font-weight="bold">${title.replace(/[&<>]/g, '')}</text><text x="60" y="820" fill="#e6a8a8" font-size="22" font-family="Arial">Lucas Asth · leitura</text></svg>`)}`

export default function BooksPage() {
  if (typeof window !== 'undefined' && window.location.pathname === '/books') return <CapasLivrosReais books={books} />
  const { text } = useLanguage()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [coverMap, setCoverMap] = useState({})
  useEffect(() => {
    let cancelled = false
    Promise.all(books.map(async (book) => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}&maxResults=1`)
        const data = await response.json()
        const image = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail?.replace('http://', 'https://')
        return [book.title, image || book.cover]
      } catch {
        return [book.title, book.cover]
      }
    })).then((entries) => { if (!cancelled) setCoverMap(Object.fromEntries(entries)) })
    return () => { cancelled = true }
  }, [])
  const categories = ['all', ...new Set(books.map((book) => book.category))]
  const filtered = useMemo(() => books.filter((book) => (category === 'all' || book.category === category) && book.title.toLowerCase().includes(query.toLowerCase())), [category, query])

  return <section className="books-page" aria-labelledby="books-title">
    <header className="books-heading">
      <p className="contact-eyebrow">04 / {text('Reading list', 'Livros')}</p>
      <h1 id="books-title">{text('Ideas I keep close.', 'Ideias que carrego comigo.')}</h1>
      <p>{text('A selection of books that shaped how I think about products, people and the work of building.', 'Uma seleção de livros que influenciaram minha forma de pensar sobre produtos, pessoas e construção.')}</p>
    </header>
    <div className="books-summary"><strong>{books.length}</strong><span>{text('books read and revisited', 'livros lidos e revisitados')}</span></div>
    <p className="books-rating-note">{text('Ratings are a snapshot of public reader averages and may change over time.', 'As avaliações são um retrato das médias públicas de leitores e podem mudar com o tempo.')}</p>
    <div className="books-filters"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text('Search by title', 'Buscar por título')} /><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item} value={item}>{item === 'all' ? text('All categories', 'Todas as categorias') : item}</option>)}</select></div>
    <div className="books-grid">{filtered.map((book) => <article className="book-card" key={book.title}><div className="book-cover"><img src={book.cover} alt={`Capa de ${book.title}`} loading="lazy" onLoad={(event) => { if (event.currentTarget.naturalWidth < 10) { event.currentTarget.src = book.isbnCover } }} onError={(event) => { if (event.currentTarget.src === book.isbnCover) { event.currentTarget.onerror = null; event.currentTarget.src = fallbackCover(book.title) } else { event.currentTarget.src = book.isbnCover } }} /></div><div className="book-info"><span>{book.category}</span><h2>{book.title}</h2><p>{book.author}</p><div className="book-rating" aria-label={`${book.rating} de 5 estrelas`}>{'★'.repeat(book.rating)}<i>{'★'.repeat(5 - book.rating)}</i></div></div></article>)}</div>
  </section>
}
