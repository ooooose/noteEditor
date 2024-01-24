import clsx from 'clsx'
import { UseFormRegisterReturn } from 'react-hook-form'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'
import { Input as InputComponent } from '@/components/ui/input'
import { ChangeEvent } from 'react'

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password'
  className?: string
  registration: Partial<UseFormRegisterReturn>
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = (props: InputFieldProps) => {
  const { type = 'text', label, className, registration, onChange, error } = props
  return (
    <FieldWrapper label={label} error={error}>
      <InputComponent
        type={type}
        onChange={onChange}
        className={clsx(
          'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
          className,
        )}
        {...registration}
      />
    </FieldWrapper>
  )
}
