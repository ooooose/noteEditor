import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { apiClient } from '@/lib/axios/api-client'
import { useState, useRef } from 'react'

interface IProps {
  width: number
  height: number
  email: string
}

interface IRect {
  width: number
  height: number
  left: number
  right: number
  top: number
  bottom: number
}

export const useDrawPicture = ({ width, height, email }: IProps) => {
  const { authUser } = useFetchAuthUserByEmail(email)
  let canvasRef = useRef<HTMLCanvasElement | null>(null)
  let mouseX: number | null = null
  let mouseY: number | null = null
  const [selectedId, setSelectedId] = useState<string>('')

  const handleSelectChange = (value: string) => {
    const selectedValue = value
    setSelectedId(selectedValue)
  }

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
    ctx.lineWidth = 2
    ctx.strokeStyle = '#000000'
    ctx.stroke()
    mouseX = x
    mouseY = y
  }

  const Reset = () => {
    const ctx = getContext()
    ctx.clearRect(0, 0, width, height)
  }

  const generateParams = (base64: string) => {
    const pictureParams = {
      image: base64,
      email: email,
      themeId: selectedId,
    }
    return pictureParams
  }

  const uploadPicture = () => {
    const base64 = canvasRef.current?.toDataURL('image/png') ?? ''
    const params = generateParams(base64)
    try {
      apiClient.apiPost('/api/pictures', params)
    } catch (err) {
      console.log(err)
    }
  }

  function toBlob(base64: string) {
    const bin = atob(base64.replace(/^.*,/, ''))
    const buffer = new Uint8Array(bin.length)
    for (var i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i)
    }
    const blob = new Blob([buffer.buffer], {
      type: 'image/png',
    })
    return blob
  }

  return {
    canvasRef,
    OnClick,
    OnMove,
    DrawEnd,
    Reset,
    handleSelectChange,
    selectedId,
    uploadPicture,
  }
}
