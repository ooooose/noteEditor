import { memo, ReactNode } from 'react'

import { FirstPictureFrame, SecondPictureFrame } from '.'

type FramesProps = {
  frameId: number
  children: ReactNode
}

export const Frames = memo(({ frameId, children }: FramesProps) => {
  switch (frameId) {
    case 0:
      return <FirstPictureFrame>{children}</FirstPictureFrame>
    case 1:
      return <SecondPictureFrame>{children}</SecondPictureFrame>
    default:
      return <FirstPictureFrame>{children}</FirstPictureFrame>
  }
})

Frames.displayName = 'Frames'
