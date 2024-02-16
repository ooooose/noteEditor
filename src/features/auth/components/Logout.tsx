'use client'

import React from 'react'
import { signOut } from 'next-auth/react'
import { Modal } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { toast } from 'sonner'

export const Logout = () => {
  return (
    <Modal text='ログアウト' description='ログアウトしますか？'>
      <Button variant='outline' onClick={() => signOut()}>
        ログアウト
      </Button>
      <DialogClose asChild>
        <Button variant='outline' className='bg-gray-100'>
          キャンセル
        </Button>
      </DialogClose>
    </Modal>
  )
}
