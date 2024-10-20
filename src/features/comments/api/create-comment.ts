import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { apiClient } from '@/lib/api/api-client'

import { getCommentsQueryOptions } from './get-comments'

import type { MutationConfig } from '@/lib/react-query/react-query'

export const createCommentInputSchema = z.object({
  picture_id: z.number(),
  body: z.string().min(1, '入力必須です').max(200, '200文字以内で入力してください'),
})

export type CreateCommentInput = z.infer<typeof createCommentInputSchema>

export const createComment = async (params: CreateCommentInput) => {
  return await apiClient.post(`/api/v1/pictures/${params.picture_id}/comments`, params)
}

type UseCreateCommentOptions = {
  picture_id: number
  mutationConfig?: MutationConfig<typeof createComment>
}

export const useCreateComment = ({ picture_id, mutationConfig }: UseCreateCommentOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCommentsQueryOptions(picture_id).queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: createComment,
  })
}
