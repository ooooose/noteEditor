'use client'

import React from 'react'
import { useFetchThemes } from '@/features/themes/hooks/useFetchThemes'
import { Theme } from '@/features/themes/types'

function Themes() {
  const { themes, isError, isLoading } = useFetchThemes()
  if (isLoading) return <div>loading</div>
  if (isError) return <div>Error loading themes</div>

  return (
    <div className='flex flex-col m-auto'>
      {themes?.map((theme: Theme) => {
        return <div key={theme.id}>{theme.title}</div>
      })}
    </div>
  )
}

export default Themes
