import React from 'react'

import styles from '@/features/pictures/styles/SecondPictureFrame.module.css'

import { OuterFrame } from '.'

type SecondPictureFrameProps = {
  children: React.ReactNode
}

export const SecondPictureFrame = React.memo(({ children }: SecondPictureFrameProps) => {
  return (
    <>
      <OuterFrame>
        <div className={styles.frame}>{children}</div>
      </OuterFrame>
    </>
  )
})

SecondPictureFrame.displayName = 'SecondPictureFrame'
