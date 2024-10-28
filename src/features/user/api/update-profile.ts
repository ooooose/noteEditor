import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { apiClient } from '@/lib/api/api-client'
import { MutationConfig } from '@/lib/react-query/react-query'

import { getProfileQueryOptions } from './get-profile'

export const updateProfileInputSchema = z.object({
  name: z.string().min(1, '入力必須です').max(40, '名前は40文字以内で入力してください').optional(),
  image: z.string().optional(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>

export const updateProfile = ({ data }: { data: UpdateProfileInput }) => {
  return apiClient.put('/api/v1/users/profile', data)
}

type UseUpdateProfileOptions = {
  mutationConfig?: MutationConfig<typeof updateProfile>
}

export const useUpdateProfile = ({ mutationConfig }: UseUpdateProfileOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getProfileQueryOptions().queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: updateProfile,
  })
}
