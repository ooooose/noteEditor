import { memo, ReactNode } from 'react'

import styles from '@/features/pictures/styles/FirstPictureFrame.module.css'

import { OuterFrame } from '.'

type FirstPictureFrameProps = {
  children: ReactNode
}

export const FirstPictureFrame = memo(({ children }: FirstPictureFrameProps) => {
  return (
    <>
      <OuterFrame>
        <div className={styles.frame}>{children}</div>
      </OuterFrame>
    </>
  )
})

FirstPictureFrame.displayName = 'FirstPictureFrame'
