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

  // useEffect(() => {
  //   if (randomTheme) {
  //     setSelectedOption({ value: randomTheme.title, label: randomTheme.title })
  //     handleSelectChange(randomTheme.title)
  //   }
  // }, [randomTheme, handleSelectChange])

  const options: ThemeOption[] =
    themes?.map((theme: Theme) => ({
      value: theme.title,
      label: theme.title,
    })) || []

  return (
    <CreatableSelect
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
