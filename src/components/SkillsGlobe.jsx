import { useEffect, useRef, useState } from 'react'
import { technologies } from '../data/tecnologias'
import { useLanguage } from '../contextoIdioma'
import './SkillsGlobe.css'

const points = technologies.map((_, index) => {
  const y = 1 - (index / (technologies.length - 1)) * 2
  const radius = Math.sqrt(1 - y * y)
  const angle = index * Math.PI * (3 - Math.sqrt(5))
  return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius }
})

export default function SkillsGlobe() {
  const { text } = useLanguage()
  const viewport = useRef(null)
  const nodes = useRef([])
  const rotation = useRef({ x: -.2, y: .3 })
  const drag = useRef(null)
  const dragged = useRef(false)
  const paused = useRef(false)
  const [selected, setSelected] = useState(null)
  const [rotating, setRotating] = useState(true)
  useEffect(() => {
    const element = viewport.current
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame, previous = 0, visible = true
    let radius = Math.min(element.clientWidth * .37, 230)
    const resize = new ResizeObserver(() => { radius = Math.min(element.clientWidth * .37, 230) })
    resize.observe(element)
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting })
    observer.observe(element)
    const draw = time => {
      const elapsed = previous ? Math.min(time - previous, 40) : 0
      previous = time
      if (visible) {
        if (!drag.current && !paused.current && rotating && !media.matches) rotation.current.y += elapsed * .00012
        const { x: pitch, y: yaw } = rotation.current
        points.forEach((point, index) => {
          const x = point.x * Math.cos(yaw) + point.z * Math.sin(yaw)
          const z = point.z * Math.cos(yaw) - point.x * Math.sin(yaw)
          const y = point.y * Math.cos(pitch) - z * Math.sin(pitch)
          const depth = point.y * Math.sin(pitch) + z * Math.cos(pitch)
          const node = nodes.current[index]
          if (!node) return
          node.style.transform = `translate(-50%, -50%) translate(${x * radius}px, ${y * radius}px) scale(${.74 + (depth + 1) * .16})`
          node.style.opacity = `${.45 + (depth + 1) * .275}`
          node.style.zIndex = depth > .15 ? '30' : '10'
        })
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect() }
  }, [rotating])

  function move(event) {
    if (!drag.current) return
    const dx = event.clientX - drag.current.x
    const dy = event.clientY - drag.current.y
    if (Math.abs(dx) + Math.abs(dy) > 4) {
      dragged.current = true
      viewport.current.setPointerCapture(event.pointerId)
    }
    rotation.current.y += dx * .008
    rotation.current.x += dy * .008
    drag.current = { x: event.clientX, y: event.clientY }
  }
  function end(event) {
    drag.current = null
    if (viewport.current.hasPointerCapture(event.pointerId)) viewport.current.releasePointerCapture(event.pointerId)
  }
  return <section className="skills-globe-panel" aria-label={text('Interactive skill globe', 'Globo interativo de habilidades')}>
    <header className="waka-heading"><h3>skills.globo</h3><button className="globe-motion" type="button" aria-pressed={!rotating} onClick={() => setRotating(value => !value)}>{rotating ? text('Pause rotation', 'Pausar rotação') : text('Resume rotation', 'Retomar rotação')}</button></header>
    <div ref={viewport} className="skills-globe-stage" tabIndex="0" aria-label={text('Drag or use arrow keys to rotate. Tab to explore technologies.', 'Arraste ou use as setas para girar. Use Tab para explorar as tecnologias.')} onPointerDown={event => { if (event.button !== 0) return; drag.current = { x: event.clientX, y: event.clientY }; dragged.current = false }} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={() => { drag.current = null }} onFocus={() => { paused.current = true }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) paused.current = false }} onKeyDown={event => {
      if (event.target !== event.currentTarget) return
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault()
        rotation.current.y += event.key === 'ArrowLeft' ? -.15 : event.key === 'ArrowRight' ? .15 : 0
        rotation.current.x += event.key === 'ArrowUp' ? -.15 : event.key === 'ArrowDown' ? .15 : 0
      }
    }}>
      <div className="skills-globe-wire" aria-hidden="true"><span /><span /><span /></div>
      <div className="skills-globe-shield" aria-hidden="true"><svg viewBox="0 0 160 190"><path d="M80 8 Q120 30 150 22 L145 98 Q135 145 80 180 Q25 145 15 98 L10 22 Q40 30 80 8Z" /><path d="M80 20 Q117 39 138 35 L133 97 Q123 136 80 165 Q37 136 27 97 L22 35 Q43 39 80 20Z" /><text x="80" y="98" textAnchor="middle">LA</text><text x="80" y="125" textAnchor="middle">LUCAS ASTH</text></svg></div>
      {technologies.map((tech, index) => <button type="button" className="skills-globe-node" key={tech.name} ref={node => { nodes.current[index] = node }} aria-label={`${text('Learn about', 'Saiba mais sobre')} ${tech.name}`} aria-pressed={selected?.name === tech.name} onClick={() => { if (!dragged.current) setSelected(tech) }} onKeyDown={() => { dragged.current = false }}><span className="skills-globe-icon"><img src={`/icons/${tech.icon}.svg`} alt="" width="30" height="30" draggable="false" /></span><span className="skills-globe-label">{tech.name}</span></button>)}
    </div>
    <div className="skills-globe-details" aria-live="polite">{selected ? <><img src={`/icons/${selected.icon}.svg`} alt="" width="28" height="28" /><div><strong>{selected.name}</strong><p>{selected.description}</p></div><button type="button" aria-label={text('Close details', 'Fechar detalhes')} onClick={() => setSelected(null)}>×</button></> : <p>{text('Drag to rotate · select a technology to learn more', 'Arraste para girar · selecione uma tecnologia para saber mais')}</p>}</div>
  </section>
}
