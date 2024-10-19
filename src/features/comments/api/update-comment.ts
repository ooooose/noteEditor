import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { apiClient } from '@/lib/api/api-client'

import { getCommentsQueryOptions } from './get-comments'

import type { Comment } from '../types'
import type { MutationConfig } from '@/lib/react-query/react-query'

export const updateCommentInputSchema = z.object({
  body: z.string().min(1, '入力必須です').max(200, '200文字以内で入力してください'),
})

export type UpdateCommentInput = z.infer<typeof updateCommentInputSchema>

export const updateComment = async ({
  data,
  commentId,
}: {
  data: UpdateCommentInput
  commentId: number
}): Promise<Comment> => {
  return await apiClient.put(`/api/v1/comments/${commentId}`, data)
}

type UseUpdateCommentOptions = {
  pictureId: number
  mutationConfig?: MutationConfig<typeof updateComment>
}

export const useUpdateComment = ({ pictureId, mutationConfig }: UseUpdateCommentOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getCommentsQueryOptions(pictureId).queryKey,
      })
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateComment,
  })
}
