import React from 'react'
import { Canvas } from './Canvas'

export const CanvasLayout = () => {
  return (
    <div className='mx-auto text-center'>
      <div>絵を描く</div>
      <Canvas width={500} height={400} />
    </div>
  )
}
