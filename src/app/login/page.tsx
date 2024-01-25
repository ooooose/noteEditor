'use client'

import React, { useState } from 'react'
import { LoginForm } from '@/features/auth/components/LoginForm'

function Login() {
  return (
    <div className='flex flex-col m-auto w-1/4'>
      <LoginForm onSuccess={() => {}} />
    </div>
  )
}

export default Login
