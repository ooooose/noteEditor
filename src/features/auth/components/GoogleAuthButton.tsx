'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

export const GoogleAuthButton = () => {
  return (
    <Button variant='outline' onClick={() => signIn('google', {}, { prompt: 'login' })}>
      Googleアカウントでログイン
    </Button>
  )
}
