import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import LoadingThemes from './LoadingThemes'

import type { Theme } from '@/features/themes/types'

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
    <Carousel
      opts={{
        align: 'start',
      }}
    >
      <CarouselContent className='gap-2'>
        {themes.map((theme: Theme) => {
          return (
            <CarouselItem
              className={
                theme.title === title
                  ? 'cursor-pointer rounded-full border-2 border-black p-2 text-center md:basis-1/2 lg:basis-1/5'
                  : 'cursor-pointer rounded-full border p-2 text-center md:basis-1/2 lg:basis-1/4'
              }
              key={theme.id}
              onClick={() => {
                router.push(`/timeline?theme=${theme.title}`)
              }}
            >
              #{theme.title}
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default Themes
