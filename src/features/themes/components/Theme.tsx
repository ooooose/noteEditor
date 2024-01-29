import * as React from 'react'
import { Card } from '@/components/elements/Card/Card'

type ThemeProps = {
  title: string
}

export const Theme = ({ title }: ThemeProps) => {
  return (
    <>
      <Card title={title}>
        <div className='w-[200px] h-[150px] mx-auto bg-gray-100'></div>
      </Card>
    </>
  )
}
