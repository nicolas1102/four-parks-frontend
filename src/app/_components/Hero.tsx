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
    <div className='h-[650px] w-full grid grid-cols-12 relative overflow-hidden'>
      <div className='col-span-7 my-12 ml-32 mr-10'>
        <h1 className='text-6xl font-light tracking-wider'>
          <span className=' font-bold'>¡</span>LA FORMA MÁS{' '}
          <span className='font-bold'>FÁCIL</span>{' '}DE{' '}
          <span className='font-bold'>ASEGURAR</span> TU{' '}
          <span className='font-bold'>PARQUEADERO</span> EN TODA{' '}
          <span className='font-bold hover:animate-pulse'>
            <span className=' text-yellowFPC-400'>COLO</span>
            <span className=' text-blueFPC-400'>MB</span>
            <span className=' text-redFPC-400'>IA</span>!
          </span>
        </h1>

        <div className='pt-12'>
          <p className='text-xl font-medium tracking-widest'>
            {/* Olvídate del estrés de buscar estacionamiento.  */}
            Ingresa, encuentra y reserva en segundos.
          </p>
          <div className='pt-5 w-[450px]'>
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

            <Separator text={'¿Ya tienes una cuenta?'} background='bg-background' />

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
      <div className='col-span-5 relative overflow-hidden'>
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
