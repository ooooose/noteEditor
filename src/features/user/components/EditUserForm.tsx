import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { Label } from '@radix-ui/react-label'
import { Camera } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import type { User } from '../types'

type EditProfileModalProps = {
  user: User | undefined
}

export const EditUserForm = ({ user }: EditProfileModalProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>プロフィール</CardTitle>
        <CardDescription>プロフィール情報を管理します</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Avatar className='size-20'>
            <AvatarImage className='rounded-full' src={user?.image} />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <Button icon={<Camera />} variant='outline'>
            画像を変更
          </Button>
        </div>
        <div className='grid gap-4'>
          <div className='grid w-64 gap-2'>
            <Label htmlFor='name'>お名前</Label>
            <Input id='name' placeholder='合瀬雄記' />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>変更を保存</Button>
      </CardFooter>
    </Card>
  )
}
