'use client'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import Separator from '@/components/Separator'
import { Input } from '@/components/ui/input'
import { Shield, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Hero = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const onSubmit = ({ email }: { email: string }) => {
    router.push(`/auth/sign-up?email=${email}`)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(email)

    setEmail(event.target.value)
  }

  return (
    <div className='h-[600px] w-full grid grid-cols-12 relative'>
      <div className='col-span-7 pr-4'>
        <h1 className='mt-2 text-7xl font-light tracking-wider'>
          <span className=' font-bold'>¡</span>LA FORMA MÁS FÁCIL DE{' '}
          <span className='font-bold '>ASEGURAR</span>{' '}TU{' '}
          <span className='font-bold '>PARQUEADERO</span> DE TODA{' '}
          <span className='font-bold '>
            <span className=' text-yellow-400'>COLO</span>
            <span className=' text-blue-700'>MB</span>
            <span className=' text-red-700'>IA</span>!
          </span>
        </h1>

        <div className='pt-7'>
          <p className='text-xl font-medium tracking-widest'>
            {/* Olvídate del estrés de buscar estacionamiento.  */}
            Ingresa, encuentra y reserva en segundos.
          </p>
          <div className='pt-5 w-[500px]'>
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
                width={500}
              />
            </Link>

            <Separator text={'¿Ya tienes una cuenta?'} />

            <Link href={'/auth/log-in'}>
              <PrimaryButton
                text='INGRESA A TU CUENTA'
                isLoading={false}
                width={500}
              />
            </Link>
          </div>
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
