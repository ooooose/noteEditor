import React from 'react'

import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'

const LoadingPictures = () => {
  return (
    <div>
      <div className='grid w-[800px] grid-cols-3 grid-rows-2 gap-1'>
        {[...Array(6)].map((_, i) => {
          return <SkeletonCard key={i} />
        })}
      </div>
    </div>
  )
}

export default LoadingPictures
