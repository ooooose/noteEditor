import { memo } from 'react'
import CreatableSelect from 'react-select/creatable'

import { useFetchThemes } from '../hooks/useFetchThemes'

import type { Theme } from '@/features/themes/types'

type ThemeOption = {
  value: string
  label: string
}

type ThemeSelectProps = {
  handleSelectChange: (value: string) => void
}

export const ThemeSelect = memo(({ handleSelectChange }: ThemeSelectProps) => {
  const { themes, isLoading } = useFetchThemes()
  const options: ThemeOption[] = []
  themes?.map((theme: Theme) =>
    options.push({
      value: theme.title,
      label: theme.title,
    }),
  )

  return (
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      onChange={(e) => handleSelectChange(e?.value ?? '')}
      options={options}
    />
  )
})

ThemeSelect.displayName = 'ThemeSelect'
