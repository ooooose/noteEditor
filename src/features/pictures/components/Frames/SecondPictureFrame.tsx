import { memo, ReactNode } from 'react'

import styles from '@/features/pictures/styles/SecondPictureFrame.module.css'

import { OuterFrame } from '.'

type SecondPictureFrameProps = {
  children: ReactNode
}

export const SecondPictureFrame = memo(({ children }: SecondPictureFrameProps) => {
  return (
    <>
      <OuterFrame>
        <div className={styles.frame}>{children}</div>
      </OuterFrame>
    </>
  )
})

SecondPictureFrame.displayName = 'SecondPictureFrame'
