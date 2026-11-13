import { useImperativeHandle, useLayoutEffect, useRef } from 'react'

const width = 160
const height = 100

function drawLucas(rect, x, y, shirt, reacting) {
  rect(x - 13, y + 40, 26, 3, '#150e24')
  rect(x - 6, y + 28, 5, 12, '#292242')
  rect(x + 1, y + 28, 5, 12, '#292242')
  rect(x - 8, y + 39, 7, 3, '#e8dbf4')
  rect(x + 1, y + 39, 7, 3, '#e8dbf4')
  rect(x - 8, y + 18, 16, 13, shirt)
  rect(x - 11, y + 20, 4, 10, '#d99a77')
  rect(x + 8, y + (reacting ? 16 : 20), 4, 9, '#d99a77')
  if (reacting) rect(x + 11, y + 13, 3, 7, '#f0ba90')
  rect(x - 3, y + 16, 6, 4, '#d99a77')
  rect(x - 8, y + 4, 16, 12, '#f0ba90')
  rect(x - 6, y + 15, 12, 2, '#f0ba90')
  rect(x - 9, y + 3, 3, 8, '#352138')
  rect(x - 6, y, 12, 5, '#352138')
  rect(x + 4, y + 3, 5, 4, '#352138')
  rect(x - 4, y + 9, 2, 2, '#352138')
  rect(x + 3, y + 9, 2, 2, '#352138')
  rect(x, y + 13, reacting ? 4 : 3, 1, '#a65e64')
}

function drawWindow(rect, x, y, sky) {
  rect(x - 2, y - 2, 46, 35, '#21182e')
  rect(x, y, 42, 31, sky)
  rect(x + 3, y + 6, 11, 2, '#ffdfb277')
  rect(x + 25, y + 10, 12, 2, '#ffdfb277')
  rect(x + 20, y, 2, 31, '#382942')
  rect(x, y + 18, 42, 2, '#382942')
  rect(x - 4, y + 31, 50, 3, '#a17c90')
}

function drawRoom(context, scene) {
  const rect = (x, y, w, h, color) => {
    context.fillStyle = color
    context.fillRect(x, y, w, h)
  }
  const palettes = [
    ['#75465c', '#a86874', '#52334e'],
    ['#33264f', '#554074', '#25213d'],
    ['#423052', '#68506f', '#322440'],
    ['#553953', '#83566b', '#39253f'],
  ]
  const [wall, trim, floor] = palettes[scene]
  rect(0, 0, width, height, wall)
  rect(0, 55, width, 11, trim)
  rect(0, 65, width, 3, '#24182d')
  rect(0, 68, width, 32, floor)
  for (let row = 0; row < 3; row += 1) {
    const y = 74 + row * 10
    rect(0, y, width, 1, '#170e263d')
    for (let x = row % 2 ? 10 : 0; x < width; x += 22) rect(x, y, 1, 10, '#170e263d')
  }

  if (scene === 0) {
    drawWindow(rect, 14, 15, '#db9a8b')
    rect(105, 14, 40, 29, '#58364b')
    rect(108, 17, 34, 23, '#375756')
    rect(114, 24, 16, 1, '#aec7a8')
    rect(114, 28, 22, 1, '#aec7a8')
    rect(116, 33, 9, 1, '#aec7a8')
    rect(98, 70, 4, 18, '#432c41')
    rect(143, 70, 4, 18, '#432c41')
    rect(94, 66, 57, 5, '#bd8180')
    rect(103, 60, 27, 6, '#e4ad7e')
    for (let i = 0; i < 5; i += 1) rect(105 + 5 * i, 59, 3, 3, i % 2 ? '#ee98ae' : '#7a4265')
  } else {
    drawWindow(rect, 105, 12, scene === 1 ? '#6d70a1' : '#cc878e')
    rect(15, 66, 64, 5, '#a47b92')
    rect(20, 71, 4, 16, '#302138')
    rect(71, 71, 4, 16, '#302138')
    rect(24, 44, 30, 17, '#1e1a32')
    rect(26, 46, 26, 13, '#514674')
    rect(35, 61, 7, 5, '#211932')
    if (scene === 1) {
      for (let i = 0; i < 3; i += 1) rect(29, 49 + 3 * i, 16 - i * 3, 1, i % 2 ? '#e6adce' : '#91d9ce')
    } else {
      rect(29, 49, 20, 2, '#d0b0ed')
      rect(29, 53, 7, 4, '#a27aca')
      rect(38, 53, 11, 1, '#b9a6d0')
      rect(38, 55, 8, 1, '#b9a6d0')
    }
    rect(57, 63, 8, 3, '#e2ac9e')
    rect(128, 70, 12, 10, '#b27e81')
    rect(132, 53, 2, 18, '#609986')
    rect(126, 56, 6, 4, '#88b6a2')
    rect(134, 61, 7, 4, '#88b6a2')
  }

  if (scene >= 2) {
    const x = scene === 2 ? 105 : 125
    rect(x - 10, 61, 20, 7, '#b8879e')
    rect(x - 8, 68, 3, 12, '#26192e')
    rect(x + 5, 68, 3, 12, '#26192e')
    rect(x - 6, 53, 12, 7, '#1e1a32')
    rect(x - 4, 54, 8, 5, scene === 2 ? '#ffc8a5' : '#c4a5ff')
    rect(x - 2, 56, 4, 1, '#62496c')
  }


}

const shirts = ['#e1a456', '#a684f5', '#65c6a9', '#d5a5ff']

export default function JourneyStage({ ref, scene, targetX, exit }) {
  const canvas = useRef(null)
  const background = useRef(null)
  const facing = useRef(1)

  function paint(position, isRevealed, direction = 0, walking = false) {
    const context = canvas.current?.getContext('2d')
    if (!context || !background.current) return
    const rect = (x, y, w, h, color) => {
      context.fillStyle = color
      context.fillRect(x, y, w, h)
    }
    context.drawImage(background.current, 0, 0)
    if (exit) {
      rect(exit.x - 6, 58, 12, 25, '#20152b')
      rect(exit.x - 5, 59, 10, 23, isRevealed ? '#8462b2' : '#40334c')
      rect(exit.x + 2, 70, 2, 2, isRevealed ? '#fff0b4' : '#746482')
      if (isRevealed) rect(exit.x - 6, 83, 12, 2, '#d9b3ff')
    }
    if (!isRevealed) {
      rect(targetX - 4, 71, 9, 11, '#321f3b')
      rect(targetX - 1, 72, 3, 5, '#ffd68b')
      rect(targetX - 1, 79, 3, 2, '#ffd68b')
      rect(targetX - 5, 86, 11, 2, '#ffd68b')
    }
    if (direction) facing.current = direction
    const x = Math.round(position.x)
    const y = Math.round(position.y) - 42
    const stride = walking ? Math.floor((position.x + position.y) / 3) % 2 : 0
    context.save()
    context.translate(x, 0)
    context.scale(facing.current, 1)
    drawLucas(rect, 0, y - stride, shirts[scene], false)
    context.restore()
  }

  useLayoutEffect(() => {
    if (!background.current) {
      background.current = document.createElement('canvas')
      background.current.width = width
      background.current.height = height
    }
    const context = background.current.getContext('2d')
    if (context) drawRoom(context, scene)
    facing.current = 1
  }, [scene])

  useImperativeHandle(ref, () => ({ paint }))

  return (
    <div className="journey-stage" aria-hidden="true">
      <canvas ref={canvas} width={width} height={height} />
    </div>
  )
}