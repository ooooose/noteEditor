'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import Image from 'next/image'

import { Card } from '@/components/ui/card'

export const TopPicture = () => {
  return (
    <Card className='group overflow-hidden bg-white/50 transition-shadow hover:shadow-lg'>
      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-10 rounded-full shadow-sm'>
              <AvatarImage src='/avatar.png' />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div>
              <div className='text-sm font-semibold'>Aさん</div>
              <p className='text-xs text-gray-500'>11/12</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-4'>
        <div className='overflow-hidden'>
          <div className='bg-white px-4 pb-4'>
            <Image
              alt='Picture'
              className='rounded-lg'
              height={200}
              src='/TopImage.png'
              width={300}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
