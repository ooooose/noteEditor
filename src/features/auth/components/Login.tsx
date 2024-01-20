'use client'

import { Modal } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

export const Login = () => {
  return (
    <Modal text='はじめる' description='ログインしますか？'>
      <Button variant='outline' onClick={() => signIn('google', {}, { prompt: 'login' })}>
        Googleアカウントでログイン
      </Button>
    </Modal>
  )
}
