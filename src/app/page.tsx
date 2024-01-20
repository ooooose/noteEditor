'use client'

import { AuthButton } from '@/features/auth/components/AuthButton'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { status } = useSession()
  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status !== 'authenticated') {
    return (
      <div>
        <p>あなたはログインしていません</p>
      </div>
    )
  }

  return (
    <main className='flex flex-col items-center justify-between'>
      <div className='my-20'>ここにImageを持ってくる。</div>
      <div className='my-10'>
        <p>Tipserは、あなたの持っているTipsを共有するアプリです。</p>
      </div>
      <AuthButton />
    </main>
  )
}
