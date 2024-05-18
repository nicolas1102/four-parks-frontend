import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  BookmarkCheck,
  QrCode,
  SquareParking,
  LogIn,
  CreditCard,
} from 'lucide-react'

const benefits = [
  {
    title: 'INICIO DE SESIÓN CONFIABLE Y SEGURO.',
    image: (
      <LogIn
        size={184}
        strokeWidth={0.9}
        className='hover:animate-pulse text-black'
      />
    ),
  },
  {
    title: 'VISUALIZA TODOS LOS PARQUEADEROS.',
    image: (
      <SquareParking
        size={184}
        strokeWidth={0.9}
        className='hover:animate-pulse text-black'
      />
    ),
  },
  {
    title: 'SEGURIDAD EN TU MÉTODO DE PAGO.',
    image: (
      <CreditCard
        size={184}
        strokeWidth={0.9}
        className='hover:animate-pulse text-black'
      />
    ),
  },
  {
    title: 'RESERVA EN POCOS SEGUNDOS.',
    image: (
      <BookmarkCheck
        size={184}
        strokeWidth={0.9}
        className='hover:animate-pulse text-black'
      />
    ),
  },
  {
    title: 'ACTIVA TU RESERVA CON UN QR.',
    image: (
      <QrCode
        size={184}
        strokeWidth={0.9}
        className='hover:animate-pulse text-black'
      />
    ),
  },
]

const Features = () => {
  return (
    <div className='sm:py-20 py-10 sm:px-28 px-6'>
      <h2 className='sm:text-3xl text-2xl tracking-widest dark:font-normal font-medium'>
        MÁS QUE UN SIMPLE ESTACIONAMIENTO
      </h2>
      <div className='flex justify-center'>
        <ScrollArea className='pt-6 w-[340px] sm:w-full'>
          <div className='flex flex-row gap-2 pr-3'>
            {benefits.map((item, index) => (
              <div
                key={index}
                className='border border-primary w-48 sm:m-2 bg-redFPC-400'
              >
                <p className='text-primary text-center bg-white p-2'>
                  {item.image}
                </p>
                <div className='p-2'>
                  <h3 className='font-medium text-xl tracking-wider text-white text-center'>
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </div>
  )
}

export default Features
