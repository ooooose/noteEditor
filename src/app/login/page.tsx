'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signIn as signInByNextAuth } from 'next-auth/react'
import { LoginForm } from '@/features/auth/components/LoginForm'

function Login() {
  const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const loginUser = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    await signInByNextAuth('credentials', {
      ...data,
      redirect: false,
    })
  }

  return (
    <div className='flex flex-col m-auto w-1/4'>
      <LoginForm onSuccess={() => router.push('/')} />
    </div>
  )
}

export default Login
