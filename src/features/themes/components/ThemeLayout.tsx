'use client'

import React from 'react'
import { useFetchThemeById } from '../hooks/useFetchThemeById'

type ThemeLayoutProps = {
  id: string
}

export const ThemeLayout = ({ id }: ThemeLayoutProps) => {
  const { theme, isError, isLoading } = useFetchThemeById(id)
  if (isLoading) return <>loading...</>
  if (isError) return <>Error loading theme</>
  return (
    <div>
      <div className='text-center py-5'>
        <p className='p-2'>{theme?.title}</p>
      </div>
    </div>
  )
}
