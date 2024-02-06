'use client'

import * as React from 'react'
import * as z from 'zod'

import { Button } from '@/components/elements/Button'
import { Form, Input } from '@/components/elements/Form'
import Link from 'next/link'
import { signIn, SignInResponse } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

const schema = z.object({
  name: z.string().min(1, '必須項目です'),
  email: z.string().min(1, '必須項目です'),
  password: z.string().min(6, '6文字以上で入力してください'),
})

type RegisterValues = {
  name: string
  email: string
  password: string
}

type RegisterFormProps = {
  onSuccess: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { toast } = useToast()
  const router = useRouter()
  const registerUser = async (data: RegisterValues) => {
    await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    }).then(async (res: Response) => {
      if (res.status === 201) {
        await signIn('credentials', {
          ...data,
          redirect: false,
        }).then((res: SignInResponse | undefined) => {
          if (res && res.status === 200) {
            router.push('/themes')
          } else if (res?.status === 401) {
            toast({
              description: 'ログインに失敗しました',
              variant: 'destructive',
            })
          }
        })
      } else if (res.status === 400) {
        toast({
          description: '新規登録に失敗しました',
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async (values) => {
          await registerUser(values)
          onSuccess()
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              type='text'
              label='お名前'
              error={formState.errors['name']}
              registration={register('name')}
            />
            <Input
              type='email'
              label='メールアドレス'
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Input
              type='password'
              label='パスワード'
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <Button type='submit' className='w-full mt-6'>
                新規登録
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className='mt-2 flex items-center justify-end'>
        <div className='text-sm'>
          ログイン画面は
          <Link href='/login' className='font-medium text-blue-600 hover:text-blue-500'>
            こちら
          </Link>
        </div>
      </div>
    </div>
  )
}
