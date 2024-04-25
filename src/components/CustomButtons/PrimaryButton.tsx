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
      className={`tracking-widest dark:font-semibold border border-primary w-[${width ? width : ''}px]`}
      disabled={isLoading}
    >
      {text}
    </Button>
  )
}

export default PrimaryButton
