import React from 'react'

import styles from '@/features/pictures/styles/OuterFrame.module.css'

type OuterFrameProps = {
  children: React.ReactNode
}

export const OuterFrame = React.memo(({ children }: OuterFrameProps) => {
  return (
    <>
      <div className={styles.outerFrame}>{children}</div>
    </>
  )
})

OuterFrame.displayName = 'OuterFrame'
