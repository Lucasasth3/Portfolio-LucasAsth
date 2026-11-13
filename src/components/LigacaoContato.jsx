import { useLayoutEffect, useRef } from 'react'

function drawOffice(context) {
  const rect = (color, x, y, width, height) => {
    context.fillStyle = color
    context.fillRect(x, y, width, height)
  }

  const wall = context.createLinearGradient(0, 0, 128, 72)
  wall.addColorStop(0, '#2a1c43')
  wall.addColorStop(1, '#68435c')
  rect(wall, 0, 0, 128, 72)
  rect('#674670', 0, 43, 128, 7)
  rect('#382642', 0, 50, 128, 22)
  for (let y = 55; y < 72; y += 6) {
    rect('#4c3557', 0, y, 128, 1)
    for (let x = y % 4 === 1 ? 0 : 9; x < 128; x += 18) rect('#4c3557', x, y, 1, 6)
  }

  rect('#291a3c', 10, 8, 42, 30)
  rect('#cb8fa6', 13, 11, 36, 24)
  rect('#e2a3a9', 13, 11, 36, 9)
  rect('#80618d', 13, 26, 10, 9)
  rect('#957393', 24, 21, 7, 14)
  rect('#80618d', 37, 25, 12, 10)
  for (const [x, y] of [[15, 30], [18, 33], [26, 25], [27, 29], [42, 28], [46, 32]]) {
    rect('#f2bd96', x, y, 1, 1)
  }
  rect('#382445', 30, 11, 2, 24)
  rect('#382445', 13, 22, 36, 2)

  rect('#24182f', 95, 18, 22, 18)
  rect('#c796ae', 97, 20, 18, 14)
  rect('#73517a', 100, 29, 3, 3)
  rect('#73517a', 105, 26, 3, 6)
  rect('#73517a', 110, 23, 3, 9)

  rect('#362840', 6, 51, 12, 13)
  rect('#987189', 6, 51, 12, 3)
  rect('#78a290', 11, 40, 2, 12)
  rect('#679480', 7, 40, 4, 4)
  rect('#8cbba1', 13, 44, 5, 3)

  rect('#33213e', 62, 43, 18, 22)
  rect('#a68ad6', 62, 41, 18, 15)
  rect('#eab291', 58, 44, 4, 9)
  rect('#eab291', 80, 39, 4, 10)
  rect('#eab291', 64, 24, 14, 17)
  rect('#332139', 62, 22, 16, 5)
  rect('#332139', 62, 25, 3, 7)
  rect('#332139', 75, 25, 4, 4)
  rect('#332139', 72, 31, 2, 2)
  rect('#a66068', 73, 36, 4, 1)

  rect('#b9859d', 29, 53, 73, 5)
  rect('#6c4864', 32, 58, 5, 10)
  rect('#6c4864', 94, 58, 5, 10)
  rect('#2d203a', 37, 40, 20, 12)
  rect('#8f80b4', 38, 41, 18, 9)
  rect('#c8b2d7', 40, 43, 10, 1)
  rect('#b8dbc6', 40, 46, 6, 1)
  rect('#d5acc1', 36, 51, 23, 2)
  rect('#e3b390', 91, 47, 5, 5)
  rect('#af797b', 95, 48, 3, 3)
  rect('#261a3a', 86, 49, 9, 4)
}

export default function ContactCall({ playing }) {
  const canvas = useRef(null)
  useLayoutEffect(() => {
    const context = canvas.current?.getContext('2d')
    if (context) drawOffice(context)
  }, [])

  return (
    <div className={'contact-scene' + (playing ? ' contact-scene--playing' : '')} aria-hidden="true">
      <canvas ref={canvas} width={128} height={72} />
      <span className="contact-handset" />
      <span className="contact-signal"><i /><i /><i /></span>
    </div>
  )
}
