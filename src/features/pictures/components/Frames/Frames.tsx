import React from 'react'

import { FirstPictureFrame, SecondPictureFrame } from '.'

type FramesProps = {
  frameId: number
  children: React.ReactNode
}

export const Frames = React.memo(({ frameId, children }: FramesProps) => {
  switch (frameId) {
    case 0:
      return <FirstPictureFrame>{children}</FirstPictureFrame>
    case 2:
      return <SecondPictureFrame>{children}</SecondPictureFrame>
    default:
      return <FirstPictureFrame>{children}</FirstPictureFrame>
  }
})

Frames.displayName = 'Frames'
