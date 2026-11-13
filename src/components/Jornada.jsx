import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contextoIdioma'
import { journey } from '../data/jornada'
import JourneyStage from './CenarioJornada'

const start = { x: 23, y: 85 }
const exit = { x: 145, y: 85 }
const speed = 62
const directionKeys = {
  arrowleft: 'left', a: 'left', arrowright: 'right', d: 'right',
  arrowup: 'up', w: 'up', arrowdown: 'down', s: 'down',
}
const controls = [
  ['up', '↑', 'Up', 'Para cima'],
  ['left', '←', 'Left', 'Para a esquerda'],
  ['down', '↓', 'Down', 'Para baixo'],
  ['right', '→', 'Right', 'Para a direita'],
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function Journey() {
  const { language, text } = useLanguage()
  const [level, setLevel] = useState(0)
  const [visited, setVisited] = useState([])
  const stage = useRef(null)
  const viewport = useRef(null)
  const position = useRef({ ...start })
  const input = useRef(new Map())
  const frame = useRef(null)
  const lastTime = useRef(null)
  const discovered = useRef(false)
  const chapter = journey[level]
  const revealed = visited.includes(level)
  const lastChapter = level === journey.length - 1

  function stopWalking() {
    input.current.clear()
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = null
    lastTime.current = null
  }

  useEffect(() => {
    const stopOnHide = () => { if (document.hidden) stopWalking() }
    window.addEventListener('blur', stopWalking)
    document.addEventListener('visibilitychange', stopOnHide)
    return () => {
      window.removeEventListener('blur', stopWalking)
      document.removeEventListener('visibilitychange', stopOnHide)
      stopWalking()
    }
  }, [])

  useLayoutEffect(() => {
    stage.current?.paint(position.current, revealed)
  }, [level, revealed])

  function openChapter(index) {
    stopWalking()
    position.current = { ...start }
    discovered.current = visited.includes(index)
    if (index === level) stage.current?.paint(start, discovered.current)
    setLevel(index)
    viewport.current?.focus({ preventScroll: true })
  }

  function reveal() {
    if (discovered.current) return
    discovered.current = true
    setVisited(previous => previous.includes(level) ? previous : [...previous, level])
    stage.current?.paint(position.current, true)
  }

  function advance() {
    if (!lastChapter) openChapter(level + 1)
  }

  function walk(dx, dy) {
    const current = position.current
    const next = {
      x: clamp(current.x + dx, 12, 148),
      y: clamp(current.y + dy, 77, 96),
    }
    position.current = next
    if (!discovered.current && Math.hypot(next.x - chapter.x, next.y - 85) < 9) reveal()
    if (discovered.current && !lastChapter && Math.hypot(next.x - exit.x, next.y - exit.y) < 7) {
      advance()
      return
    }
    if (next.x !== current.x || next.y !== current.y) {
      stage.current?.paint(next, discovered.current, dx < 0 ? -1 : dx > 0 ? 1 : 0, true)
    }
  }

  function tick(now) {
    frame.current = null
    if (!input.current.size) return
    const elapsed = lastTime.current === null ? 0 : Math.min((now - lastTime.current) / 1000, .04)
    lastTime.current = now
    const active = new Set(input.current.values())
    const x = Number(active.has('right')) - Number(active.has('left'))
    const y = Number(active.has('down')) - Number(active.has('up'))
    const distance = Math.hypot(x, y)
    if (distance) walk(x * speed * elapsed / distance, y * speed * elapsed / distance)
    if (input.current.size) frame.current = requestAnimationFrame(tick)
  }

  function press(id, direction) {
    if (input.current.has(id)) return
    input.current.set(id, direction)
    if (frame.current === null) frame.current = requestAnimationFrame(tick)
  }

  function release(id) {
    input.current.delete(id)
    if (!input.current.size) {
      stopWalking()
      stage.current?.paint(position.current, discovered.current)
    }
  }

  function onKeyDown(event) {
    const key = event.key.toLowerCase()
    if (event.altKey || event.ctrlKey || event.metaKey || !Object.hasOwn(directionKeys, key)) return
    event.preventDefault()
    press(key, directionKeys[key])
  }

  function step(direction) {
    const delta = { up: [0, -3], left: [-3, 0], down: [0, 3], right: [3, 0] }
    walk(...delta[direction])
  }

  function restart() {
    openChapter(0)
    discovered.current = false
    setVisited([])
    if (level === 0) stage.current?.paint(start, false)
  }

  return (
    <section className="journey-game" aria-labelledby="hero-title">
      <header className="journey-game-title">
        <h1 id="hero-title">{text('From candy to code', 'Da bala ao código')}</h1>
        <p>{text('Walk through the places that shaped my story.', 'Caminhe pelos lugares que marcaram a minha história.')}</p>
      </header>

      <div className="journey-console">
        <ol className="journey-chapters" aria-label={text('Chapters', 'Fases')}>
          {journey.map((entry, index) => (
            <li key={entry.label.en}>
              <button type="button" disabled={index > 0 && !visited.includes(index - 1)}
                aria-current={index === level ? 'step' : undefined} onClick={() => openChapter(index)}>
                <span aria-hidden="true">{visited.includes(index) ? '✓' : String(index + 1).padStart(2, '0')}</span>
                {entry.label[language]}
              </button>
            </li>
          ))}
        </ol>

        <div className="journey-world">
          <div ref={viewport} tabIndex={0} className="journey-viewport"
            onKeyDown={onKeyDown} onKeyUp={event => release(event.key.toLowerCase())}
            onBlur={stopWalking} aria-label={text('Game world', 'Cenário do jogo')} aria-describedby="journey-instructions">
            <JourneyStage ref={stage} scene={level}
              targetX={chapter.x} exit={lastChapter ? null : exit} />
          </div>
          <span className="journey-location">{chapter.label[language]}</span>
        </div>

        <div className="journey-controls">
          <div className="journey-controls-copy">
            <p id="journey-instructions">{text('Focus the scene, then use arrows or WASD. On touch screens, hold a direction below.', 'Clique no cenário e use as setas ou WASD. Na tela de toque, segure uma direção abaixo.')}</p>
            <p className="journey-objective" role="status">{!revealed
              ? text('Walk to the gold marker to discover this chapter.', 'Ande até o marcador dourado para descobrir esta parte da história.')
              : lastChapter
                ? text('You reached the present day.', 'Você chegou aos dias de hoje.')
                : text('Walk to the lit door to enter the next chapter.', 'Ande até a porta iluminada para entrar na próxima fase.')}</p>
          </div>
          <div className="journey-inputs">
            <div className="journey-dpad" role="group" aria-label={text('Movement', 'Movimento')}>
              {controls.map(([direction, symbol, en, pt]) => (
                <button key={direction} type="button" aria-label={text(en, pt)}
                  onPointerDown={event => {
                    if (event.button !== 0) return
                    event.preventDefault()
                    viewport.current?.focus({ preventScroll: true })
                    event.currentTarget.setPointerCapture(event.pointerId)
                    press(event.pointerId, direction)
                    step(direction)
                  }}
                  onLostPointerCapture={event => release(event.pointerId)}
                  onPointerUp={event => release(event.pointerId)}
                  onPointerCancel={event => release(event.pointerId)}
                  onClick={event => {
                    if (event.detail !== 0) return
                    step(direction)
                  }}>
                  {symbol}
                </button>
              ))}
            </div>
            <button type="button" className="button button-secondary" onClick={revealed ? (lastChapter ? restart : advance) : reveal}>
              {revealed
                ? lastChapter ? text('Play again', 'Jogar de novo') : text('Next chapter', 'Próxima fase')
                : text('Read this chapter', 'Ler esta fase')}
            </button>
          </div>
        </div>

        {revealed && (
          <article className="journey-dialogue-panel" aria-labelledby="journey-story-title">
            <p className="journey-speaker">{chapter.category[language]}</p>
            <h2 id="journey-story-title">{chapter.title[language]}</h2>
            <p>{chapter.story[language]}</p>
            {chapter.tags && (
              <ul className="tag-list journey-highlights">
                {chapter.tags.map(tag => <li key={tag.en ?? tag}>{tag[language] ?? tag}</li>)}
              </ul>
            )}
            {chapter.items && (
              <dl className="journey-highlights journey-facts">
                {chapter.items.map(item => (
                  <div key={item.title.en}><dt>{item.title[language]}</dt><dd>{item.detail[language]}</dd></div>
                ))}
              </dl>
            )}
            {chapter.links && (
              <div className="journey-links">
                {chapter.links.map(link => <Link key={link.to} className="button button-secondary" to={link.to}>{link.label[language]}</Link>)}
              </div>
            )}
          </article>
        )}
      </div>
    </section>
  )
}
