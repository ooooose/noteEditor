'use client'

import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export const Login = () => {
  return (
    <Button onClick={() => signIn('google', {})} variant='outline'>
      Google認証ボタン
    </Button>
  )
}
