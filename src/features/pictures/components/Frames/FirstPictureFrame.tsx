import React from 'react'

import styles from '@/features/pictures/styles/FirstPictureFrame.module.css'

import { OuterFrame } from '.'

type FirstPictureFrameProps = {
  children: React.ReactNode
}

export const FirstPictureFrame = React.memo(({ children }: FirstPictureFrameProps) => {
  return (
    <>
      <OuterFrame>
        <div className={styles.frame}>{children}</div>
      </OuterFrame>
    </>
  )
})

FirstPictureFrame.displayName = 'FirstPictureFrame'
