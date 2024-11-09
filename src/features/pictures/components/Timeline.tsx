import React from 'react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

import { useInfiniitePictures } from '../api/get-pictures'

import LoadingPictures from './LoadingPictures'
import { NoPictures } from './NoPictures'
import Pictures from './Pictures'

const Timeline = () => {
  const picturesQuery = useInfiniitePictures()
  if (picturesQuery.isLoading) return <LoadingPictures />
  const pictures = picturesQuery.data?.pages.flatMap((page) => page.data)
  if (!pictures?.length) return <NoPictures />
  return (
    <div className='mt-10'>
      <Pictures isLoading={picturesQuery.isLoading} pictures={pictures} />
      {picturesQuery.hasNextPage && (
        <div className='flex items-center justify-center py-4'>
          <Button onClick={() => picturesQuery.fetchNextPage()}>
            {picturesQuery.isFetchingNextPage ? <Spinner /> : 'さらに読み込む'}
          </Button>
        </div>
      )}
    </div>
  )
}
export default Timeline
