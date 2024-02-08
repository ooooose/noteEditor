import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

export const SkeletonCard = () => {
  return (
    <Card className='w-[300px] h-[320px]'>
      <div className='flex flex-col space-y-3 text-center'>
        <div className='mt-5 mb-3'>
          <Skeleton className='w-[150px] h-[30px] ml-4' />
        </div>
        <Skeleton className='w-[200px] h-[150px] mx-auto' />
      </div>
    </Card>
  )
}
