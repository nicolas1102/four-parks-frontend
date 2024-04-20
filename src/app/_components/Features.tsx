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
    <div className='py-20 px-32'>
      <h2 className='text-3xl tracking-widest dark:font-normal font-medium'>
        MÁS QUE UN SIMPLE ESTACIONAMIENTO
      </h2>
      <ul className='flex flex-row justify-evenly pt-6 flex-wrap'>
        {benefits.map((item, index) => (
          <li
            key={index}
            className='border border-primary w-48 m-2 bg-yellow-300 '
          >
            <p className='text-primary text-center bg-white p-2'>{item.image}</p>
            <div className='p-2'>
              <h3 className='font-medium text-xl tracking-wider text-black text-center'>
                {item.title}
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Features
