'use client'

import React, { useState } from 'react'
import { Button } from '@/components/elements/Button'
import * as z from 'zod'

import { Form, Input } from '@/components/elements/Form'
import { useMutateComment } from '../hooks/useMutateComment'

const schema = z.object({
  body: z.string().min(1, '入力してください'),
})

type CommentValue = {
  body: string
}

type CommentFormProps = {
  pictureId: string
}

export const CommentForm = ({ pictureId }: CommentFormProps) => {
  const { onSubmitComment } = useMutateComment(pictureId)
  return (
    <Form<CommentValue, typeof schema>
      onSubmit={async (values) => {
        await onSubmitComment(values.body)
      }}
      schema={schema}
    >
      {({ register, formState }) => (
        <>
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
        </>
      )}
    </Form>
  )
}
