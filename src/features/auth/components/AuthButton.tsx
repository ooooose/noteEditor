'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { Login } from './Login'
import { Logout } from './Logout'

export const AuthButton = () => {
  const { data: session } = useSession()
  if (session) {
    return <Logout />
  }

  return <Login />
}
