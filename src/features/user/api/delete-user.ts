import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/lib/api/api-client'
import { MutationConfig } from '@/lib/react-query/react-query'

import { getUserQueryOptions } from './get-user'

export const deleteUser = ({ userUid }: { userUid: string }): Promise<void> => {
  return apiClient.delete(`/api/v1/users/${userUid}`)
}

type UseDeleteUserOptions = {
  mutationConfig?: MutationConfig<typeof deleteUser>
}

export const useDeleteUser = ({ mutationConfig }: UseDeleteUserOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUserQueryOptions().queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: deleteUser,
  })
}
