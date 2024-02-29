'use client'

import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import React from 'react'

import { Modal } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'

export const Logout = () => {
  const router = useRouter()
  return (
    <Modal description='ログアウトしますか？' text='ログアウト'>
      <Button
        onClick={() => {
          signOut()
            .then(() => {
              console.log('Sign-out successful')
              router.push('/')
            })
            .catch((error) => {
              console.error('Sign-out error:', error)
            })
        }}
        variant='outline'
      >
        ログアウト
      </Button>
      <DialogClose asChild>
        <Button className='bg-gray-100' variant='outline'>
          キャンセル
        </Button>
      </DialogClose>
    </Modal>
  )
}
