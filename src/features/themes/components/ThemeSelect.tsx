'use client'

import React from 'react'
import { useFetchThemes } from '../hooks/useFetchThemes'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Theme } from '../types'

export const ThemeSelect = () => {
  const { themes, isLoading } = useFetchThemes()
  const body = (
    <Select disabled={isLoading}>
      <SelectTrigger className='w-[280px]'>
        <SelectValue placeholder='テーマを選択してください' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>テーマ</SelectLabel>
          {themes?.map((theme: Theme, idx: number) => {
            return (
              <SelectItem key={idx} value={theme.title}>
                {theme.title}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
  return body
}
