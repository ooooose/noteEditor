import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

export const SkeletonCard = () => {
  return (
    <div className='w-[250px] h-[320px] mx-auto'>
      <div className='flex flex-col space-y-3 text-center'>
        <div className='mt-5 mb-3'>
          <Skeleton className='w-[120px] h-[30px] ml-4' />
        </div>
        <Skeleton className='w-[200px] h-[150px] mx-auto' />
      </div>
    </div>
  )
}
