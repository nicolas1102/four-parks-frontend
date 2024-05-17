'use client'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import Separator from '@/components/Separator'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Hero = () => {
  const [email, setEmail] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  return (
    <div className='sm:h-[650px] pb-8 w-full sm:grid sm:grid-cols-12 relative overflow-hidden'>
      <div className='sm:col-span-7 sm:my-12 my-8 sm:ml-32 m-6 sm:mr-10'>
        <h1 className='sm:text-6xl text-4xl font-light tracking-wider'>
          <span className=' font-bold'>¡</span>LA FORMA MÁS{' '}
          <span className='font-bold'>FÁCIL</span> DE{' '}
          <span className='font-bold'>ASEGURAR</span> TU{' '}
          <span className='font-bold'>PARQUEADERO</span> EN TODA{' '}
          <span className='font-bold hover:animate-pulse'>
            <span className=' text-yellowFPC-400'>COLO</span>
            <span className=' text-blueFPC-400'>MB</span>
            <span className=' text-redFPC-400'>IA</span>!
          </span>
        </h1>

        <div className='sm:pt-12 pt-6'>
          <p className='sm:text-xl text-lg sm:font-medium tracking-widest'>
            Ingresa, encuentra y reserva en segundos.
          </p>
          <div className='pt-5 sm:w-[450px] w-full'>
            <Input
              type='email'
              placeholder='Tu email'
              value={email}
              onChange={handleChange}
              className='mb-2 border-primary'
            />
            <Link href={`/auth/sign-up?email=${email}`}>
              <PrimaryButton
                text='COMIENZA A PARQUEAR MEJOR'
                isLoading={false}
                width={450}
              />
            </Link>

            <Separator
              text={'¿Ya tienes una cuenta?'}
              background='bg-background'
            />

            <Link href={'/auth/log-in'}>
              <PrimaryButton
                text='INGRESA A TU CUENTA'
                isLoading={false}
                width={450}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className='sm:col-span-5 relative overflow-hidden  sm:block hidden'>
        <Image
          src='/landing/hero.jpg'
          className='w-full h-full object-cover object-center '
          alt='thank you for your order'
          priority
          width='1200'
          height='1200'
        />
      </div>
    </div>
  )
}

export default Hero
