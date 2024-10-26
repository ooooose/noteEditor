import { cn } from '@/lib/utils'

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
}

const variants = {
  light: 'text-white',
  primary: 'text-slate-600',
}

export type SpinnerProps = {
  size?: keyof typeof sizes
  variant?: keyof typeof variants
  className?: string
}

export const Spinner = ({ size = 'md', variant = 'primary', className = '' }: SpinnerProps) => {
  return (
    <>
      <svg
        className={cn('animate-spin', sizes[size], variants[variant], className)}
        fill='none'
        height='24'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        viewBox='0 0 24 24'
        width='24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M21 12a9 9 0 1 1-6.219-8.56' />
      </svg>
      <span className='sr-only'>Loading</span>
    </>
  )
}
