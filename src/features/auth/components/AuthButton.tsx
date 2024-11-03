'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const AuthButton = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <div>
      {loading ? (
        <Skeleton className='h-[50px] w-[100px]' />
      ) : session ? (
        <div className='flex h-full items-center justify-center gap-2'>
          <p className='text-center'>{session.user?.name} さん</p>
          <Button onClick={() => signOut()} variant='outline'>
            ログアウト
          </Button>
        </div>
      ) : (
        <Button onClick={() => signIn('google', {})} variant='outline'>
          Google認証ボタン
        </Button>
      )}
    </div>
  )
}

export default AuthButton
