'use client'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import Separator from '@/components/Separator'
import { Input } from '@/components/ui/input'
import { Shield, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Benefits = () => {
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
    <div className='col-span-7 pr-4'>
      <h2 className='mt-2 text-4xl font-light tracking-wider'>
        PARQUEAR MEJOR ES ASÍ DE FÁCIL
      </h2>

      <div className='pt-7'>
        
      </div>
    </div>
  )
}

export default Benefits
