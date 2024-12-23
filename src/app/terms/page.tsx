import { Suspense } from 'react'

import MainLayout from '@/components/layouts/Layout/MainLayout'
import { TabContent } from '@/components/layouts/Terms/tab-content'

export default function Terms() {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <TabContent />
      </Suspense>
    </MainLayout>
  )
}
