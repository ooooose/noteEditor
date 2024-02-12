import React, { useState } from 'react'
import { Button } from '@/components/elements/Button'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, Input } from '@/components/elements/Form'

const schema = z.object({
  body: z.string().min(1, '入力してください'),
})

type CommentValue = {
  body: string
}

type CommentFormProps = {
  onSubmit: (body: string) => Promise<void>
}

export const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const { register, handleSubmit, reset, formState } = useForm<CommentValue>({
    resolver: zodResolver(schema),
  })
  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values.body)
        reset()
      })}
    >
      <Input
        type='text'
        label='コメント'
        error={formState.errors['body']}
        registration={register('body')}
      />
      <div>
        <Button type='submit' className='w-full mt-6' variant='outline'>
          投稿
        </Button>
      </div>
    </form>
  )
}
