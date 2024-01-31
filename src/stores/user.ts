import { AuthUser } from '@/features/auth/types'

import { atom } from 'jotai'

export const userAtom = atom<AuthUser | null>(null)
