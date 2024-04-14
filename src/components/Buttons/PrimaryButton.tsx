import { Button } from '../ui/button'

const PrimaryButton = ({
  text,
  isLoading,
}: {
  text: string
  isLoading: boolean | undefined
}) => {
  return (
    <Button className='tracking-widest dark:font-semibold' disabled={isLoading}>
      {text}
    </Button>
  )
}

export default PrimaryButton
