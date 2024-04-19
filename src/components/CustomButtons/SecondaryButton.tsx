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
      className={`tracking-widest dark:font-semibold hover:bg-yellow-300 bg-yellow-100 X dark:border-primary hover:border-primary dark:text-black dark:bg-yellow-200 dark:hover:bg-yellow-300 border border-primary w-[${width ? width : ''}px] `}
    >
      {text}
    </Button>
  )
}

export default SecondaryButton
