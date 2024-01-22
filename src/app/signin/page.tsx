'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { signIn as signInByNextAuth } from 'next-auth/react'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    if (!email) return
    if (!password) return

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()
      await signInByNextAuth('credentials', {
        idToken,
        callbackUrl: '/',
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='flex flex-col items-center w-1/3 m-auto'>
      <div className='w-full space-y-5'>
        <Input
          type='email'
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
          placeholder='メールアドレス'
        />
        <Input
          type='password'
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
          placeholder='パスワード'
        />
      </div>
      <div className='w-full text-right mb-5'>
        <p className='text-xs'>
          新規登録は<Link href='/signup'>こちら</Link>
        </p>
      </div>
      <Button
        variant='outline'
        onClick={() => {
          signIn()
        }}
        disabled={!email || !password}
      >
        ログイン
      </Button>
    </div>
  )
}

export default SignIn
