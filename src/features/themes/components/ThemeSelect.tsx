import { memo, useState } from 'react'
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
  const [selectedOption, setSelectedOption] = useState<ThemeOption | null>(null)

  const options: ThemeOption[] =
    themes?.map((theme: Theme) => ({
      value: theme.title,
      label: theme.title,
    })) || []

  return (
    <CreatableSelect
      instanceId='theme-select-instance-id'
      isClearable
      isDisabled={isLoading}
      onChange={(e) => {
        const newValue = e ? e.value : ''
        handleSelectChange(newValue)
        setSelectedOption(e)
      }}
      options={options}
      value={selectedOption}
    />
  )
})

ThemeSelect.displayName = 'ThemeSelect'
