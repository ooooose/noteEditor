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
    <Card className='border-white/40 bg-white/70 backdrop-blur-sm'>
      <CardHeader className='p-5 sm:p-6'>
        <CardTitle>プロフィール</CardTitle>
        <CardDescription>プロフィール情報を管理します</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6 px-5 pb-5 sm:px-6 sm:pb-6'>
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
          <Skeleton className='size-20 rounded-full' />
          <Skeleton className='h-8 w-24' />
        </div>
        <div className='grid gap-4'>
          <div className='grid w-full gap-1'>
            <Skeleton className='h-5 w-12' />
            <Skeleton className='h-10 w-full' />
          </div>
        </div>
      </CardContent>
      <CardFooter className='px-5 pb-5 sm:px-6 sm:pb-6'>
        <Button className='w-full sm:w-auto' disabled>
          変更を保存
        </Button>
      </CardFooter>
    </Card>
  )
}
