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
  isLoading: boolean | undefined
  width?: number
}) => {
  return (
    <Button
    onClick={onClick}
      className={`tracking-widest dark:font-semibold w-[${width ? width : ''}px] border border-primary`}
      disabled={isLoading}
    >
      {text}
    </Button>
  )
}

export default PrimaryButton
