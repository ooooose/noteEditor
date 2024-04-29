import React from 'react'

import MainLayout from '@/components/layouts/Layout/MainLayout'

import UserPictures from '@/features/user/components/UserPictures'

function Me() {
  return (
    <MainLayout>
      <UserPictures />
    </MainLayout>
  )
}

export default Me
