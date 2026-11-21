import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../contextoIdioma'
import './RetratoInterativo.css'

export default function RetratoInterativo() {
  const { text } = useLanguage()
  const canvasRef = useRef(null)
  const photoRef = useRef(null)
  const previousPoint = useRef(null)
  const activeRef = useRef(false)
  const resetRef = useRef(() => {})
  const resetTimer = useRef(null)
  const [active, setActive] = useState(false)
  const [ready, setReady] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const photo = photoRef.current
    const context = canvas.getContext('2d')
    if (!context) return
    const drawPhoto = () => {
      if (!photo.complete || !photo.naturalWidth) return
      const { width, height } = canvas.getBoundingClientRect()
      if (!width || !height) return
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const scale = Math.max(width / photo.naturalWidth, height / photo.naturalHeight)
      const sourceWidth = width / scale
      const sourceHeight = height / scale
      context.drawImage(photo, (photo.naturalWidth - sourceWidth) / 2, (photo.naturalHeight - sourceHeight) * .24, sourceWidth, sourceHeight, 0, 0, width, height)
      previousPoint.current = null
      setReady(true)
    }
    resetRef.current = drawPhoto
    photo.addEventListener('load', drawPhoto)
    const observer = new ResizeObserver(drawPhoto)
    observer.observe(canvas)
    drawPhoto()
    return () => { clearTimeout(resetTimer.current); photo.removeEventListener('load', drawPhoto); observer.disconnect() }
  }, [])

  function activate() {
    clearTimeout(resetTimer.current)
    if (!activeRef.current) resetRef.current()
    activeRef.current = true
    setActive(true)
  }

  function paint(event) {
    if (!ready || !activeRef.current || revealed) return
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const point = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    const last = previousPoint.current || point
    const radius = Math.max(34, Math.min(rect.width * .19, 65))
    const steps = Math.max(1, Math.ceil(Math.hypot(point.x - last.x, point.y - last.y) / (radius / 4)))
    const context = canvas.getContext('2d')
    context.save()
    context.globalCompositeOperation = 'destination-out'
    for (let step = 1; step <= steps; step++) {
      const x = last.x + (point.x - last.x) * step / steps
      const y = last.y + (point.y - last.y) * step / steps
      const brush = context.createRadialGradient(x, y, radius * .35, x, y, radius)
      brush.addColorStop(0, 'rgba(0,0,0,1)')
      brush.addColorStop(1, 'rgba(0,0,0,0)')
      context.fillStyle = brush
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2)
    }
    context.restore()
    previousPoint.current = point
  }

  function reset() {
    clearTimeout(resetTimer.current)
    activeRef.current = false
    previousPoint.current = null
    setActive(false)
    setRevealed(false)
  }

  function scheduleReset() {
    clearTimeout(resetTimer.current)
    previousPoint.current = null
    resetTimer.current = setTimeout(reset, 8000)
  }

  return <button type="button" className={`home-about-visual portrait-painter${ready ? ' is-ready' : ''}${active ? ' is-painting' : ''}${revealed ? ' is-revealed' : ''}`} aria-pressed={revealed} aria-label={text('Lucas Asth portrait. Press Enter to reveal or hide the pixel art.', 'Retrato de Lucas Asth. Pressione Enter para revelar ou ocultar a pixel art.')} onPointerEnter={event => { if (event.pointerType === 'mouse') { activate(); paint(event) } }} onPointerMove={paint} onPointerDown={event => { if (event.pointerType !== 'mouse') { activate(); event.currentTarget.setPointerCapture(event.pointerId); paint(event) } }} onPointerUp={event => { previousPoint.current = null; if (event.pointerType !== 'mouse') scheduleReset() }} onPointerCancel={reset} onPointerLeave={event => { if (event.pointerType === 'mouse') scheduleReset() }} onClick={event => { if (event.detail === 0) { clearTimeout(resetTimer.current); setRevealed(value => !value) } }} onKeyDown={event => { if (event.key === 'Escape') reset() }} onBlur={scheduleReset}>
    <span className="portrait-paint-surface" aria-hidden="true">
      <img ref={photoRef} className="portrait-original" src="/images/lucas.png" alt="" draggable="false" />
      <img className="portrait-pixels" src="/images/lucas-pixel.png" alt="" decoding="async" draggable="false" />
      <canvas ref={canvasRef} className="portrait-photo-layer" />
    </span>
    <span className="home-about-hint" aria-hidden="true">{text('Move to paint · drag on touch', 'Passe para pintar · arraste no celular')}</span>
  </button>
}
