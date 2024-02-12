import { Like } from '@/features/likes/types'

export type Picture = {
  id: string
  image: string
  author: string
  frameId: number
  userId: string
  themeId: string
  likes: Like[]
}
