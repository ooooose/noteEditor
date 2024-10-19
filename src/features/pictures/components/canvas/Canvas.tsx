'use client'

import React from 'react'

import { useDrawPicture } from '../../hooks/useDrawPicture'

import { CanvasMenu } from './CanvasMenu'

interface IProps {
  width: number
  height: number
}

export const Canvas: React.FC<IProps> = (props) => {
  const { width, height } = props

  const {
    canvasRef,
    OnClick,
    OnMove,
    DrawEnd,
    Reset,
    lineWidth,
    color,
    handleSelectChange,
    title,
    uploadPicture,
    setColor,
    setLineWidth,
    isLoading,
  } = useDrawPicture({
    width: width,
    height: height,
  })
  return (
    <section className='mt-10 flex'>
      <div className='mb-4 border'>
        <canvas
          height={`${height}px`}
          onMouseDown={OnClick}
          onMouseMove={OnMove}
          onMouseOut={DrawEnd}
          onMouseUp={DrawEnd}
          ref={canvasRef}
          width={`${width}px`}
        />
      </div>
      <CanvasMenu
        Reset={Reset}
        color={color}
        handleSelectChange={handleSelectChange}
        isLoading={isLoading}
        lineWidth={lineWidth}
        setColor={setColor}
        setLineWidth={setLineWidth}
        title={title}
        uploadPicture={uploadPicture}
      />
    </section>
  )
}
