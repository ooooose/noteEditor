import type { Picture } from '@/features/pictures/types'
import type { Entity } from '@/types/api'

export type Theme = Entity<{
  title: string
  userId: number
  pictures: Picture[]
}>

export type ThemeOption = {
  value: string
  label: string
}
