'use client'

import Link from 'next/link'
import { Modal } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

export const Login = () => {
  return (
    <Modal text='はじめる' description='ログインしますか？'>
      <Button variant='outline' onClick={() => signIn('google', {}, { prompt: 'login' })}>
        Googleアカウントでログイン
      </Button>
      <Button variant='outline' className='bg-gray-100' asChild>
        <Link href='/login'>メールでログイン</Link>
      </Button>
    </Modal>
  )
}
