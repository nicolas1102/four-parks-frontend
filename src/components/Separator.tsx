import { TrafficCone } from 'lucide-react'

const Separator = () => {
  return (
    <div className='relative'>
      <div aria-hidden='true' className='absolute inset-0 flex items-center'>
        <span className='w-full border-t' />
      </div>
      <div className='relative flex justify-center text-xs uppercase'>
        <span className='bg-background px-2 text-muted-foreground'>
          <TrafficCone className='text-yellow-300' />
        </span>
      </div>
    </div>
  )
}

export default Separator
