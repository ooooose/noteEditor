import MainLayout from '@/components/layouts/Layout/MainLayout'

import TimelineLayout from '@/features/pictures/components/TimelineLayout'

function Timeline() {
  return (
    <MainLayout>
      <div className='mt-5'>
        <TimelineLayout />
      </div>
    </MainLayout>
  )
}

export default Timeline
