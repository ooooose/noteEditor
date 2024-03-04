import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'

import { apiClient } from '@/lib/api/api-client'

interface IProps {
  width: number
  height: number
  userId: string
  userName: string
}

interface IRect {
  width: number
  height: number
  left: number
  right: number
  top: number
  bottom: number
}

export const useDrawPicture = ({ width, height, userId, userName }: IProps) => {
  const { mutate } = useSWRConfig()
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  let mouseX: number | null = null
  let mouseY: number | null = null
  const [selectedId, setSelectedId] = useState<string>('')
  const [color, setColor] = useState<string>('#000000')
  const [lineWidth, setLineWidth] = useState<number>(2)

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

  const DrawEnd = () => {
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
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    ctx.stroke()
    mouseX = x
    mouseY = y
  }

  const Reset = () => {
    const ctx = getContext()
    ctx.clearRect(0, 0, width, height)
    toast('リセットしました', { position: 'top-center' })
  }

  const uploadPicture = useCallback(async () => {
    try {
      const blob = await new Promise<Blob | null>((resolve) => {
        canvasRef.current?.toBlob(
          (blob) => {
            resolve(blob)
          },
          'image/webp',
          0.5,
        )
      })

      if (!blob) {
        console.error('Failed to convert canvas to blob.')
        return
      }

      const compressedBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          resolve(reader.result as string)
        }
        reader.readAsDataURL(blob)
      })

      const params = {
        image: compressedBase64,
        userId: userId,
        userName: userName,
        themeId: selectedId,
      }

      const res = await apiClient.apiPost('/api/pictures', params)
      if (res.status === 201) {
        mutate('/api/pictures')
        mutate('/api/themes')
        router.push(`/themes/${selectedId}`)
      }
    } catch (err) {
      console.error(err)
    }
  }, [mutate, router, selectedId, userId, userName])

  return {
    canvasRef,
    OnClick,
    OnMove,
    DrawEnd,
    Reset,
    handleSelectChange,
    selectedId,
    uploadPicture,
    setColor,
    setLineWidth,
    color,
    lineWidth,
  }
}
