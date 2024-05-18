import { Button } from '../ui/button'
import { MouseEventHandler } from 'react'

const PrimaryButton = ({
  text,
  onClick,
  isLoading,
  width,
  size,
}: {
  text: string
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  isLoading?: boolean | undefined
  width?: number
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
}) => {
  return (
    <Button
      onClick={onClick}
      className={`tracking-widest dark:font-semibold border border-primary ${
        width ? `sm:w-[${width}px] w-full ` : 'w-full'
      }`}
      disabled={isLoading}
      size={size}
    >
      <p className='sm:text-base text-sm'>
      {text}

      </p>
    </Button>
  )
}

export default PrimaryButton
