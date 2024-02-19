import React from 'react'

import { Card as CardComponent, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type CardProps = {
  title: string
  children: React.ReactNode
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <CardComponent className='h-[320px] w-[300px]'>
      <CardHeader className='py-5'>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </CardComponent>
  )
}
