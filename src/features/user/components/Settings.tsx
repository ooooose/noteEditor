'use client'

import { useProfile } from '../api'

import { DeleteUser } from './DeleteUser'

export const Settings = () => {
  const useProfileQuery = useProfile({})
  if (useProfileQuery.isLoading) return <div>Loading...</div>
  return (
    <div>
      <h1>Settings</h1>
      <DeleteUser userUid={useProfileQuery.data?.uid} />
    </div>
  )
}
