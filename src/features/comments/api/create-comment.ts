import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Deserializer } from 'jsonapi-serializer'
import { z } from 'zod'

import { apiClient } from '@/lib/api/api-client'
import { generateUUID } from '@/lib/uuid'

import { getCommentsQueryOptions } from './get-comments'

import type { Comment } from '../types'
import type { MutationConfig } from '@/lib/react-query/react-query'
import type { DeserializerOptions } from 'jsonapi-serializer'

export const createCommentInputSchema = z.object({
  body: z.string().min(1, '入力必須です').max(200, '200文字以内で入力してください'),
})

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export type CreateCommentInput = z.infer<typeof createCommentInputSchema>

export const createComment = async (params: CreateCommentInput): Promise<Comment> => {
  const uuid = generateUUID()
  const paramsWithUUID = { ...params, id: uuid }
  const response = await apiClient.post('/api/v1/comments', paramsWithUUID)
  const deserializer = new Deserializer(deserializerOptions)
  const comment = await deserializer.deserialize(response.json())
  return comment
}

type UsePostCommentOptions = {
  mutationConfig?: MutationConfig<typeof createComment>
}

export const useCreateComment = ({ mutationConfig }: UsePostCommentOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getCommentsQueryOptions().queryKey,
      })
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createComment,
  })
}
