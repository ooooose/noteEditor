'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

import { Modal } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'

export const Logout = () => {
  return (
    <Modal description='ログアウトしますか？' text='ログアウト'>
      <Button
        onClick={() => {
          void signOut()
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
