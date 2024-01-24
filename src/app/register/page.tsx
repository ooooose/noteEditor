'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

function Register() {
  const router = useRouter()

  return (
    <div className='flex flex-col m-auto w-1/4'>
      <RegisterForm onSuccess={() => router.push('/login')} />
    </div>
  )
}

export default Register
