import { TrafficCone } from 'lucide-react'

const Separator = ({
  text,
  background,
}: {
  text?: string
  background?: string
}) => {
  return (
    <div className='relative py-2'>
      <div aria-hidden='true' className='absolute inset-0 flex items-center'>
        <span className='w-full border-t border-primary' />
      </div>
      <div className='relative flex justify-center text-xs'>
        <span
          className={`px-2 ${
            background ? background : 'bg-background-contrast'
          }`}
        >
          {text ? text : <TrafficCone className='text-yellow-300' />}
        </span>
      </div>
    </div>
  )
}

export default Separator
