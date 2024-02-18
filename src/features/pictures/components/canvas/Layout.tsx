import React from 'react'

import { Canvas } from './Canvas'

export const CanvasLayout = () => {
  return (
    <div className='mx-auto text-center'>
      <Canvas height={400} width={500} />
    </div>
  )
}
