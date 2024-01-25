'use client'

import React from 'react'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

function Register() {
  return (
    <div className='flex flex-col m-auto w-1/4'>
      <RegisterForm onSuccess={() => {}} />
    </div>
  )
}

export default Register
