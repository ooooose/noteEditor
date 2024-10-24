import React from 'react'

import { usePictures } from '../api/get-pictures'

import LoadingPictures from './LoadingPictures'
import { NoPictures } from './NoPictures'
import Pictures from './Pictures'

const Timeline = () => {
  const picturesQuery = usePictures()
  if (picturesQuery.isLoading) return <LoadingPictures />
  if (picturesQuery.error) return <>Error loading pictures</>
  if (picturesQuery.data?.length === 0) return <NoPictures />
  return (
    <div className='mt-5 h-[600px]'>
      <Pictures isLoading={picturesQuery.isLoading} pictures={picturesQuery.data} />
    </div>
  )
}
export default Timeline
