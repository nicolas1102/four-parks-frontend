'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import SecondaryButton from '@/components/CustomButtons/SecondaryButton'
import Link from 'next/link'

const ConvinceYou = () => {
  const [email, setEmail] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  return (
    <div className=' bg-yellowFPC-400 py-20 px-48 w-full grid grid-cols-12'>
      <div className='col-span-7 pr-10'>
        <h2 className='text-4xl text-black tracking-widest font-medium'>
          ¿TE CONVENCIMOS?
        </h2>
        <p className='text-2xl text-black pt-3 tracking-wider pb-5'>
          REGÍSTRATE GRATIS Y COMIENZA A HACER USO DE NUESTROS PARQUEADEROS POR
          TODA COLOMBIA.
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
            <SecondaryButton
              text='COMIENZA A PARQUEAR MEJOR'
              isLoading={false}
              width={450}
            />
          </Link>
        </div>
      </div>

      <div className='col-span-5 relative overflow-hidden h-[300px]'>
        <Image
          src='/landing/convinceyou.jpg'
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

export default ConvinceYou
