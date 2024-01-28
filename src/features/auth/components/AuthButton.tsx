'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { Login } from './Login'
import { Logout } from './Logout'

export const AuthButton = () => {
  // TODO: いらないかも、要修正
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return (
      <main className='flex flex-col items-center justify-between'>
        <p>Loading...</p>
      </main>
    )
  }
  if (session) {
    return <Logout />
  }

  return <Login />
}
