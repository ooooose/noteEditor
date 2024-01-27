'use client'

import React, { useState } from 'react'
import { LoginForm } from '@/features/auth/components/LoginForm'

function Login() {
  return (
    <div>
      <LoginForm onSuccess={() => {}} />
    </div>
  )
}

export default Login
