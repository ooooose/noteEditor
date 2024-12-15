'use client'

import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

const EmptyStateIcon = () => (
  <div className='flex size-24 items-center justify-center rounded-full bg-pink-50'>
    <Heart className='size-12 text-pink-500' />
  </div>
)

const EmptyStateText = () => (
  <div className='space-y-2 text-center'>
    <h3 className='text-2xl font-semibold text-gray-900'>いいねした絵がありません</h3>
    <p className='text-sm text-gray-500'>
      お気に入りの作品を見つけて、いいねを押してみましょう！ <br />
      あなたのお気に入りがここに表示されます。
    </p>
  </div>
)

export const NoLikedPictures = () => {
  const router = useRouter()

  const handleExploreClick = () => {
    router.push('/timeline')
  }

  return (
    <div className='flex min-h-[300px] flex-col items-center justify-center space-y-4 rounded-lg bg-white p-8'>
      <EmptyStateIcon />
      <EmptyStateText />
      <Button className='mt-4' onClick={handleExploreClick}>
        作品を探す
      </Button>
    </div>
  )
}
