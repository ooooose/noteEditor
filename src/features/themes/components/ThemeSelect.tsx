import { memo } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Theme } from '@/features/themes/types'

import { useFetchThemes } from '../hooks/useFetchThemes'

type ThemeSelectProps = {
  handleSelectChange: (value: string) => void
}

export const ThemeSelect = memo(({ handleSelectChange }: ThemeSelectProps) => {
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
})

ThemeSelect.displayName = 'ThemeSelect'
