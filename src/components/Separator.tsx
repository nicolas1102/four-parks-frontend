import { TrafficCone } from 'lucide-react'

const Separator = ({ text }: { text?: string }) => {
  return (
    <div className='relative py-2'>
      <div aria-hidden='true' className='absolute inset-0 flex items-center'>
        <span className='w-full border-t' />
      </div>
      <div className='relative flex justify-center text-xs'>
        <span className='bg-background-contrast px-2 text-muted-foreground'>
          {text ? text : <TrafficCone className='text-yellow-300' />}
        </span>
      </div>
    </div>
  )
}

export default Separator
