import { Icons } from '@/components/Icons'
import { cn } from '@/lib/utils'
import { Shield, User } from 'lucide-react'
import Link from 'next/link'

interface HomeItemInterface {
  number: number
  title: string
  description: string
  image: string
}

const StepItem = ({ number, title, description, image }: HomeItemInterface) => {
  return (
    <div
      className={cn('py-8 flex items-center h-72 text-black', {
        'justify-start': (number + 1) % 2 !== 0,
        'justify-end': (number + 1) % 2 === 0,
      })}
    >
      {(number + 1) % 2 !== 0 && (
        <>
          <div className='bg-yellow-300 w-[700px] border-2 border-primary flex flex-row content-center justify-between'>
            <div className='p-6 w-[470px]'>
              <h3 className='text-3xl font-normal pb-2'>{title}</h3>
              <p className='text-xl'>{description}</p>
            </div>
            <div className='flex content-center items-center justify-center w-60 h-60 bg-white'>
              <Icons.logo />
            </div>
          </div>
          <div className='w-28 border border-primary'></div>
          <div className='w-28 h-28 flex items-center justify-center my-auto border-[2px] border-primary bg-yellow-300'>
            <h3 className='text-5xl'>{number + 1}</h3>
          </div>
        </>
      )}

      {(number + 1) % 2 === 0 && (
        <>
          <div className='w-28 h-28 flex items-center justify-center my-auto border-[2px] border-primary bg-yellow-300'>
            <h3 className='text-5xl'>{number + 1}</h3>
          </div>
          <div className='w-28 border border-primary'></div>
          <div className='bg-yellow-300 w-[700px] border-2 border-primary flex flex-row content-center justify-between'>
            <div className='flex content-center items-center justify-center w-60 h-60 bg-white'>
              <Icons.logo />
            </div>
            <div className='p-6 w-[470px]'>
              <h3 className='text-3xl font-normal pb-2'>{title}</h3>
              <p className='text-xl'>{description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default StepItem
