import React from 'react'
import { FirstPictureFrame } from '.'

type FramesProps = {
  frameId: number
  children: React.ReactNode
}

export const Frames = ({ frameId, children }: FramesProps) => {
  switch (frameId) {
    case 0:
      return <FirstPictureFrame>{children}</FirstPictureFrame>
    default:
      return <FirstPictureFrame>{children}</FirstPictureFrame>
  }
}
