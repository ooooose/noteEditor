import React from 'react'

import CanvasLayout from '@/components/layouts/Layout/CanvasLayout'

import { Canvas } from '@/features/pictures/components/canvas/Canvas'

function CanvasPage() {
  return (
    <CanvasLayout>
      <div className='mx-auto text-center'>
        <Canvas height={450} width={550} />
      </div>
    </CanvasLayout>
  )
}

export default CanvasPage
