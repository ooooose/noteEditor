'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signIn as signInByNextAuth } from 'next-auth/react'

function Login() {
  const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  console.log(data)

  const loginUser = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    await signInByNextAuth('credentials', {
      ...data,
      redirect: false,
    })
    router.push('/')
  }

  return (
    <div className='flex flex-col items-center w-1/3 m-auto'>
      <div className='w-full space-y-5'>
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
          新規登録は<Link href='/register'>こちら</Link>
        </p>
      </div>
      <Button variant='outline' onClick={loginUser} disabled={!data.email || !data.password}>
        ログイン
      </Button>
    </div>
  )
}

export default Login
