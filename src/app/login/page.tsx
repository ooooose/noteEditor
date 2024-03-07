'use client'

import React from 'react'

import MainLayout from '@/components/layouts/Layout/MainLayout'

import { LoginForm } from '@/features/auth/components/LoginForm'

function Login() {
  return (
    <MainLayout>
      <LoginForm />
    </MainLayout>
  )
}

export default Login
