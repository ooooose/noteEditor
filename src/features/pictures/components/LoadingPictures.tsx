import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'

const LoadingPictures = () => {
  return (
    <div>
      <div className='mt-10 grid grid-cols-3 grid-rows-2 gap-10'>
        {[...Array(6)].map((_, i) => {
          return <SkeletonCard key={i} />
        })}
      </div>
    </div>
  )
}

export default LoadingPictures
