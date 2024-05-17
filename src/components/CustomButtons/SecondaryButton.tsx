import { MouseEventHandler } from 'react'
import { Button } from '../ui/button'

const SecondaryButton = ({
  text,
  onClick,
  isLoading,
  width,
}: {
  text: string
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  isLoading: boolean | undefined
  width?: number
}) => {
  return (
    <Button
      onClick={onClick}
      variant='secondary'
      disabled={isLoading}
      className={`tracking-widest dark:font-semibold hover:bg-yellowFPC-400 bg-yellow-200 dark:border-primary hover:border-primary dark:text-black dark:bg-yellowFPC-200 border border-primary sm:w-[${
        width ? width : ''
      }px] w-full`}
    >
      {text}
    </Button>
  )
}

export default SecondaryButton
