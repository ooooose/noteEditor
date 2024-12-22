import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const LoadingPictures = () => {
  return (
    <div>
      <div className='grid grid-cols-3 grid-rows-2 gap-8'>
        {[...Array(6)].map((_, i) => {
          return (
            <div key={i}>
              <Card className='group overflow-hidden bg-white/50 transition-shadow hover:shadow-lg'>
                <div className='p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <Skeleton className='size-10 rounded-full' />
                      <div className='space-y-2'>
                        <Skeleton className='h-4 w-[120px]' />
                        <Skeleton className='h-3 w-[100px]' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mx-4 mb-2'>
                  <div className='overflow-hidden'>
                    <div className='mb-4 bg-white p-4'>
                      <Skeleton className='aspect-[4/3] w-full' />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
