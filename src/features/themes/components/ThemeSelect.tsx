'use client'

import * as React from 'react'

import { useFetchThemes } from '../hooks/useFetchThemes'
import { Theme } from '@/features/themes/types'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type ThemeSelectProps = {
  handleSelectChange: (value: string) => void
  selectedId: string
}

export const ThemeSelect = ({ handleSelectChange, selectedId }: ThemeSelectProps) => {
  const { themes, isLoading } = useFetchThemes()
  return (
    <Select disabled={isLoading} onValueChange={handleSelectChange}>
      <SelectTrigger className='w-[280px]'>
        <SelectValue placeholder='テーマを選んでください' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {themes?.map((theme: Theme) => {
            return (
              <SelectItem key={theme.id} value={theme.id}>
                {theme.title}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
