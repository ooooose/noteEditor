import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Form'

const schema = z.object({
  body: z.string().min(1, '入力してください'),
})

type CommentValue = {
  body: string
}

type CommentFormProps = {
  onSubmit: (body: string) => Promise<void>
}

export const CommentForm = React.memo(({ onSubmit }: CommentFormProps) => {
  const { register, handleSubmit, reset, formState } = useForm<CommentValue>({
    resolver: zodResolver(schema),
  })
  return (
    <form
      onSubmit={() =>
        handleSubmit(async (values) => {
          await onSubmit(values.body)
          reset()
        })
      }
    >
      <Input
        error={formState.errors['body']}
        label='コメント'
        registration={register('body')}
        type='text'
      />
      <div>
        <Button className='mt-3 w-full' type='submit' variant='outline'>
          投稿
        </Button>
      </div>
    </form>
  )
})

CommentForm.displayName = 'CommentForm'
