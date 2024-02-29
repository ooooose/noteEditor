'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'

import { Modal } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'

export const Login = () => {
  return (
    <Modal description='ログインしますか？' text='はじめる'>
      <DialogClose asChild>
        <Button
          onClick={() => {
            signIn('google', {}, { prompt: 'login' })
          }}
          variant='outline'
        >
          Googleアカウントでログイン
        </Button>
      </DialogClose>
      <DialogClose asChild>
        <Button asChild className='bg-gray-100' variant='outline'>
          <Link href='/login'>メールでログイン</Link>
        </Button>
      </DialogClose>
    </Modal>
  )
}
