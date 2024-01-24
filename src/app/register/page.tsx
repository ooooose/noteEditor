'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { signIn as signInByNextAuth } from 'next-auth/react'

function Register() {
  const router = useRouter()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  // const signIn = async () => {
  //   if (!email) return
  //   if (!password) return

  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  //     const idToken = await userCredential.user.getIdToken()
  //     await signInByNextAuth('credentials', {
  //       idToken,
  //       callbackUrl: '/',
  //     })
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  const registerUser = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
    const userInfo = await response.json()
    router.push('/login')
  }

  return (
    <div className='flex flex-col items-center w-1/3 m-auto'>
      <div className='w-full space-y-5'>
        <Input
          type='text'
          value={data.name}
          required
          onChange={(event) => setData({ ...data, name: event.target.value })}
          placeholder='お名前'
        />
        <Input
          type='email'
          value={data.email}
          required
          onChange={(event) => setData({ ...data, email: event.target.value })}
          placeholder='メールアドレス'
        />
        <Input
          type='password'
          value={data.password}
          required
          onChange={(event) => setData({ ...data, password: event.target.value })}
          placeholder='パスワード'
        />
      </div>
      <div className='w-full text-right mb-5'>
        <p className='text-xs'>
          ログインは<Link href='/signin'>こちら</Link>
        </p>
      </div>
      <Button
        variant='outline'
        onClick={registerUser}
        disabled={!data.email || !data.password || !data.name}
      >
        新規登録
      </Button>
    </div>
  )
}

export default Register
