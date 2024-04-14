import { MouseEventHandler } from 'react'
import { Button } from '../ui/button'

const SecondaryButton = ({
  text,
  onClick,
  isLoading,
}: {
  text: string
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
  isLoading: boolean | undefined
}) => {
  return (
    <Button
      onClick={onClick}
      variant='secondary'
      disabled={isLoading}
      className='tracking-widest dark:font-semibold hover:bg-yellow-300 bg-yellow-100 border border-input dark:border-primary hover:border-primary dark:text-black dark:bg-yellow-200 dark:hover:bg-yellow-300'
    >
      {text}
    </Button>
  )
}

export default SecondaryButton
