import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import GoogleAuthButton from '@/features/auth/components/GoogleAuthButton'

const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>はじめる</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogDescription>Markdown形式のメモアプリ</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <GoogleAuthButton />
          <Button variant='outline'>メールアドレスでログイン</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
