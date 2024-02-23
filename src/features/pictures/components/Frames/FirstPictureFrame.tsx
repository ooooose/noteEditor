import React from 'react'

import styles from '@/features/pictures/styles/FirstPictureFrame.module.css'

type FirstPictureFrameProps = {
  children: React.ReactNode
}

export const FirstPictureFrame = React.memo(({ children }: FirstPictureFrameProps) => {
  return (
    <>
      <div className={styles.outerFrame}>
        <div className={styles.frame}>{children}</div>
      </div>
    </>
  )
})

FirstPictureFrame.displayName = 'FirstPictureFrame'
