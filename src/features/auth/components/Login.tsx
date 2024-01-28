'use client'

import Link from 'next/link'
import { Modal } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { DialogClose } from '@/components/ui/dialog'

export const Login = () => {
  return (
    <Modal text='はじめる' description='ログインしますか？'>
      <DialogClose asChild>
        <Button variant='outline' onClick={() => signIn('google', {}, { prompt: 'login' })}>
          Googleアカウントでログイン
        </Button>
      </DialogClose>
      <DialogClose asChild>
        <Button variant='outline' className='bg-gray-100' asChild>
          <Link href='/login'>メールでログイン</Link>
        </Button>
      </DialogClose>
    </Modal>
  )
}
