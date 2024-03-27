import { Picture } from '@/features/pictures/types'

export type Theme = {
  id: string
  title: string
  userId: string
  pictures: Picture[]
  createdAt: Date
  updatedAt: Date
}

export type ThemeOption = {
  value: string
  label: string
}
