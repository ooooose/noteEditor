import * as React from 'react'

import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type CardProps = {
  title: string
  description?: string
  children: React.ReactNode
}

export const Card = ({ title, description, children }: CardProps) => {
  return (
    <CardComponent className='w-[300px] h-[320px]'>
      <CardHeader className='py-5'>
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription>{description}</CardDescription> */}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </CardComponent>
  )
}
