'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

import { Button } from '@/components/ui/button'

export const Logout = () => {
  return (
    <Button onClick={() => signOut()} variant='destructive'>
      ログアウト
    </Button>
  )
}
