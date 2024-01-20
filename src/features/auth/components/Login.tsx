'use client'

import { Modal } from '@/components/elements'
import { GoogleAuthButton } from './GoogleAuthButton'

export const Login = () => {
  return (
    <Modal text='はじめる' description='あなたの持っているTipsを共有するアプリ'>
      <GoogleAuthButton />
    </Modal>
  )
}
