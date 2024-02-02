'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { useDrawPicture } from '../../hooks/useDrawPicture'
import { ThemeSelect } from '@/features/themes/components/ThemeSelect'

interface IProps {
  width: number
  height: number
}

export const Canvas: React.FC<IProps> = (props) => {
  const { width, height } = props

  const { canvasRef, OnClick, OnMove, DrawEnd, Reset, handleSelectChange, selectedId } =
    useDrawPicture({
      width: width,
      height: height,
    })

  return (
    <section>
      <ThemeSelect handleSelectChange={handleSelectChange} selectedId={selectedId} />
      <div className='border mb-4'>
        <canvas
          onMouseDown={OnClick}
          onMouseMove={OnMove}
          onMouseUp={DrawEnd}
          onMouseOut={DrawEnd}
          ref={canvasRef}
          width={`${width}px`}
          height={`${height}px`}
        />
      </div>
      <div className='flex gap-2'>
        <Button onClick={Reset}>リセット</Button>
      </div>
    </section>
  )
}
