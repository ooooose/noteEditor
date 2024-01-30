import { useRef } from 'react'

interface IProps {
  width: number
  height: number
}

interface IRect {
  width: number
  height: number
  left: number
  right: number
  top: number
  bottom: number
}

export const useDrawPicture = ({ width, height }: IProps) => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null)
  let mouseX: number | null = null
  let mouseY: number | null = null

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current
    return canvas.getContext('2d')
  }

  const OnClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) {
      return
    }
    const canvas: any = canvasRef.current
    const rect: IRect = canvas.getBoundingClientRect()
    const x = ~~(e.clientX - rect.left)
    const y = ~~(e.clientY - rect.top)
    Draw(x, y)
  }

  const OnMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) {
      return
    }
    const canvas: any = canvasRef.current
    const rect: IRect = canvas.getBoundingClientRect()
    const x = ~~(e.clientX - rect.left)
    const y = ~~(e.clientY - rect.top)
    Draw(x, y)
  }

  const DrawEnd = (e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseX = null
    mouseY = null
  }

  const Draw = (x: number, y: number) => {
    const ctx = getContext()
    ctx.beginPath()
    ctx.globalAlpha = 1.0
    if (mouseX === null || mouseY === null) {
      ctx.moveTo(x, y)
    } else {
      ctx.moveTo(mouseX, mouseY)
    }
    ctx.lineTo(x, y)
    ctx.lineCap = 'round'
    ctx.lineWidth = 10
    ctx.strokeStyle = '#000000'
    ctx.stroke()
    mouseX = x
    mouseY = y
  }

  const Reset = () => {
    const ctx = getContext()
    ctx.clearRect(0, 0, width, height)
  }

  const convertBase64 = () => {
    // base64に変換するロジックを記述
    const data = canvasRef.current?.toDataURL('image/png')
  }

  return {
    canvasRef,
    OnClick,
    OnMove,
    DrawEnd,
    Reset,
  }
}
