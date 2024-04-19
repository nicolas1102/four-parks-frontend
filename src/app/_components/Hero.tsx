import { Shield, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface HomeItemInterface {
  title: string
  link: string
  icon: string
  text: string
}

const Hero = () => {
  return (
    <div className='h-[600px] w-full grid grid-cols-12 relative'>
      <div className='col-span-7 pr-4'>
        <h1 className='mt-2 text-7xl font-light tracking-wide leading-tight'>
          <span className=' font-bold'>¡</span>LA FORMA MÁS RÁPIDA DE
          ESTACIONAR TU VEHÍCULO EN{' '}
          <span className='font-bold '>
            TODA <span className=' text-yellow-300'>COLO</span>
            <span className=' text-blue-700'>MB</span>
            <span className=' text-red-700'>IA</span>!
          </span>
        </h1>

        <div className='pt-7'>
          <p className='text-sm font-medium tracking-widest'>
            ORDER SUCCESSFUL
          </p>
        </div>
      </div>
      <div className='col-span-5 relative overflow-hidden'>
        <Image
          src='/thank-you-cbum.webp'
          className='w-full h-full object-cover object-center grayscale'
          alt='thank you for your order'
          priority
          width='500'
          height='600'
        />
      </div>
    </div>
  )
}

export default Hero
