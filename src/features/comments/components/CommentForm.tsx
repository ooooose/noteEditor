'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/elements/Button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { createCommentInputSchema, useCreateComment } from '@/features/comments/api/create-comment'

import type { CreateCommentInput } from '@/features/comments/api'
import type { SubmitHandler } from 'react-hook-form'

type CommentFormProps = {
  pictureId: number
}

const CommentForm = React.memo(({ pictureId }: CommentFormProps) => {
  const createCommentMutation = useCreateComment({
    pictureId: pictureId,
    mutationConfig: {
      onSuccess: () => {
        toast.success('コメントを登録しました')
      },
      onError: () => {
        toast.error('コメントの登録に失敗しました')
      },
    },
  })

  const form = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentInputSchema),
    defaultValues: {
      body: '',
    },
  })

  const onSubmit: SubmitHandler<CreateCommentInput> = (values) => {
    createCommentMutation.mutate({
      body: values.body,
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='body'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button
          className='float-right mt-4'
          disabled={createCommentMutation.isLoading}
          isLoading={createCommentMutation.isLoading}
          type='submit'
          variant='default'
        >
          登録する
        </Button>
      </form>
    </Form>
  )
})

export default CommentForm
CommentForm.displayName = 'CommentForm'
