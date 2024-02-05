import React from 'react'
import { TimelineLayout } from '@/features/pictures/components/Timeline'

function Timeline() {
  return (
    <div>
      <div className='text-center py-5'>
        <p className='p-2'>タイムライン</p>
      </div>
      <TimelineLayout />
    </div>
  )
}

export default Timeline
