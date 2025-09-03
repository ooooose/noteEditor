import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'

const LoadingPictures = () => {
  return (
    <div className='flex w-full justify-center'>
      <div className='mt-5 grid grid-cols-1 gap-10 px-2 sm:grid-cols-2 md:grid-cols-3'>
        {[...Array(6)].map((_, i) => {
          return <SkeletonCard key={i} />
        })}
      </div>
    </div>
  )
}

export default LoadingPictures
