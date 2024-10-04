'use client'

import { CheckCircledIcon, Cross2Icon } from '@radix-ui/react-icons'
import { memo } from 'react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { UpdateCommentInput } from '../api'
import type {
  ControllerRenderProps,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'

type EditCommentProps = {
  form: UseFormReturn<UpdateCommentInput>
  onSubmit: SubmitHandler<UpdateCommentInput>
  setEditedFlag: (flag: boolean) => void
}

const InputField = memo(({ field }: { field: ControllerRenderProps<FieldValues, string> }) => (
  <Input {...field} className='h-[300px]' />
))
InputField.displayName = 'InputField'

export const EditComment = memo(({ form, onSubmit, setEditedFlag }: EditCommentProps) => {
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
                <div className='mt-2 flex w-full justify-end gap-2'>
                  <Button type='submit' variant='outline'>
                    <CheckCircledIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      setEditedFlag(false)
                    }}
                    variant='outline'
                  >
                    <Cross2Icon />
                  </Button>
                </div>
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
})

EditComment.displayName = 'EditComment'
