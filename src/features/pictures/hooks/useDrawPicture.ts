import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { useState, useRef } from 'react'
import { toast } from 'sonner'

import { middleApiClient } from '@/lib/api/middle-api-client'

import { useCreatePicture } from '../api/create-picture'

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
  const router = useRouter()
  const createPictureMutation = useCreatePicture({
    mutationConfig: {
      onSuccess: async () => {
        toast('画像を投稿しました', { position: 'top-center' })
        router.push('/timeline')
      },
      onError: () => {
        toast('画像の投稿に失敗しました', { position: 'top-center' })
      },
    },
  })
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  let mouseX: number | null = null
  let mouseY: number | null = null
  const isDrawingRef = useRef(false)
  const [title, setTitle] = useState<string>('')
  const [color, setColor] = useState<string>('#000000')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [lineWidth, setLineWidth] = useState<number>(2)

  const handleSelectChange = (value: string) => {
    const selectedValue = value
    setTitle(selectedValue)
  }

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current
    return canvas.getContext('2d')
  }

  const getCanvasPoint = (clientX: number, clientY: number) => {
    const canvas: any = canvasRef.current
    const rect: IRect = canvas.getBoundingClientRect()
    const scaleX = width / rect.width
    const scaleY = height / rect.height
    const x = Math.floor((clientX - rect.left) * scaleX)
    const y = Math.floor((clientY - rect.top) * scaleY)
    return { x, y }
  }

  const OnPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    isDrawingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    const { x, y } = getCanvasPoint(e.clientX, e.clientY)
    Draw(x, y)
  }

  const OnPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return
    const { x, y } = getCanvasPoint(e.clientX, e.clientY)
    Draw(x, y)
  }

  const DrawEnd = (e?: React.PointerEvent<HTMLCanvasElement>) => {
    if (e) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
    }
    isDrawingRef.current = false
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
    setIsLoading(true)
    try {
      const blob = await new Promise<Blob | null>((resolve) => {
        canvasRef.current?.toBlob((blob) => resolve(blob), 'image/png', 0.5)
      })

      if (!blob) {
        console.error('Failed to convert canvas to blob.')
        return
      }

      const compressedBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(blob)
      })

      const fileName = `${Date.now()}-${title}`
      const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_HOST_URL}/${fileName}`

      await middleApiClient.apiPost('/api/pictures', { image: compressedBase64, fileName })

      // OGPをウォームアップ（R2へのアップロード完了後に叩く）
      const ogUrl = `/api/og?imageName=${encodeURIComponent(fileName)}`
      fetch(ogUrl).catch(() => {})

      createPictureMutation.mutate({ image_url: imageUrl, title })
      router.push('/timeline')
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [title, createPictureMutation, router])

  return {
    canvasRef,
    OnPointerDown,
    OnPointerMove,
    DrawEnd,
    Reset,
    handleSelectChange,
    title,
    uploadPicture,
    setColor,
    setLineWidth,
    color,
    lineWidth,
    isLoading,
  }
}
