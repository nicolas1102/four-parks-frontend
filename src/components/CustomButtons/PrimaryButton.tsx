import { Button } from '../ui/button'

const PrimaryButton = ({
  text,
  isLoading,
  width,
}: {
  text: string
  isLoading: boolean | undefined
  width?: number
}) => {
  return (
    <Button
      className={`tracking-widest dark:font-semibold w-[${width ? width : ''}px] border border-primary`}
      disabled={isLoading}
    >
      {text}
    </Button>
  )
}

export default PrimaryButton
