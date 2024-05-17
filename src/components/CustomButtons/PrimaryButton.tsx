import { Button } from '../ui/button'
import { MouseEventHandler } from 'react'

const PrimaryButton = ({
  text,
  onClick,
  isLoading,
  width,
}: {
  text: string
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  isLoading?: boolean | undefined
  width?: number
}) => {
  return (
    <Button
      onClick={onClick}
      className={`tracking-widest dark:font-semibold border border-primary ${
        width ? `sm:w-[${width}px] w-full ` : 'w-full'
      }`}
      disabled={isLoading}
    >
      {text}
    </Button>
  )
}

export default PrimaryButton
