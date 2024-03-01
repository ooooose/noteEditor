import { memo, ReactNode } from 'react'

import styles from '@/features/pictures/styles/OuterFrame.module.css'

type OuterFrameProps = {
  children: ReactNode
}

export const OuterFrame = memo(({ children }: OuterFrameProps) => {
  return (
    <>
      <div className={styles.outerFrame}>{children}</div>
    </>
  )
})

OuterFrame.displayName = 'OuterFrame'
