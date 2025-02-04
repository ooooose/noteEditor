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
    setIsLoading(true)
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

      const fileName = `${Date.now()}-${title}`
      const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_HOST_URL}/${fileName}`
      const params = {
        image: compressedBase64,
        fileName: fileName,
      }
      await middleApiClient.apiPost('/api/pictures', params)
      createPictureMutation.mutate({
        image_url: imageUrl,
        title: title,
      })
      router.push('/timeline')
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [title, createPictureMutation, router])

  return {
    canvasRef,
    OnClick,
    OnMove,
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
