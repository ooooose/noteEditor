import { useProfile } from '../api'

export const EditUserForm = () => {
  const useProfilequery = useProfile({})
  if (useProfilequery.isLoading) {
    return <div>Loading...</div>
  }

  return <></>
}
