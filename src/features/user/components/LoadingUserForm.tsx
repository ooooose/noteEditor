import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const LoadingUserForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>プロフィール</CardTitle>
        <CardDescription>プロフィール情報を管理します</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Skeleton className='size-20 rounded-full' />
          <Skeleton className='h-8 w-24' />
        </div>
        <div className='grid gap-4'>
          <div className='grid w-64 gap-1'>
            <Skeleton className='h-5 w-12' />
            <Skeleton className='h-10 w-full' />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled>変更を保存</Button>
      </CardFooter>
    </Card>
  )
}
