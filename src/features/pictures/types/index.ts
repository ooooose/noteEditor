import type { Comment } from '@/features/comments/types'
import type { Like } from '@/features/likes/types'
import type { Theme } from '@/features/themes/types'

export type Picture = {
  id: string
  image: string
  author: string
  frameId: number
  userId: string
  themeId: string
  createdAt: Date
  theme: Theme
  likes: Like[]
  comments: Comment[]
}
