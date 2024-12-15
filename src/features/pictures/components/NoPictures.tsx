'use client'

import { PaintbrushIcon as PaintBrush } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

const EmptyStateIcon = () => (
  <div className='flex size-24 items-center justify-center rounded-full bg-yellow-50'>
    <PaintBrush className='size-12 text-yellow-500' />
  </div>
)

const EmptyStateText = () => (
  <div className='space-y-2 text-center'>
    <h3 className='text-2xl font-semibold text-gray-900'>まだ絵がありません</h3>
    <p className='text-sm text-gray-500'>絵を描いて、タイムラインに共有しましょう！</p>
  </div>
)

export const NoPictures = () => {
  const router = useRouter()

  const handleCreateClick = () => {
    router.push('/canvas')
  }

  return (
    <div className='flex min-h-[300px] flex-col items-center justify-center space-y-4 rounded-lg bg-white p-8'>
      <EmptyStateIcon />
      <EmptyStateText />
      <Button className='mt-4' onClick={handleCreateClick}>
        絵を描く
      </Button>
    </div>
  )
}
