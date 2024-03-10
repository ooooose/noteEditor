import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import { Theme } from '@/features/themes/types'

import LoadingThemes from './LoadingThemes'

type ThemesProps = {
  themes: Theme[]
  isLoading: boolean
}

const Themes = ({ themes, isLoading }: ThemesProps) => {
  const searchParams = useSearchParams()
  const title = searchParams.get('theme')
  const router = useRouter()
  if (isLoading) return <LoadingThemes />

  return (
    <div className='flex gap-2'>
      {themes.map((theme: Theme) => {
        return (
          <div
            className={
              theme.title === title
                ? 'cursor-pointer rounded-full border-2 border-black p-2'
                : 'cursor-pointer rounded-full border p-2'
            }
            key={theme.id}
            onClick={() => {
              router.push(`/timeline?theme=${theme.title}`)
            }}
          >
            #{theme.title}
          </div>
        )
      })}
    </div>
  )
}

export default Themes
