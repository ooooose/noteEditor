'use client'

import React from 'react'

import MainLayout from '@/components/layouts/Layout/MainLayout'

import { RegisterForm } from '@/features/auth/components/RegisterForm'

function Register() {
  return (
    <MainLayout>
      <div>
        <RegisterForm onSuccess={() => {}} />
      </div>
    </MainLayout>
  )
}

export default Register
