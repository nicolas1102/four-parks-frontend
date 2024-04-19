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
      <LogIn size={256} strokeWidth={1.1} className='hover:animate-pulse' />
    ),
  },
  {
    title: 'VISUALIZA TODOS LOS PARQUEADEROS.',
    image: (
      <SquareParking
        size={256}
        strokeWidth={1.1}
        className='hover:animate-pulse'
      />
    ),
  },
  {
    title: 'SEGURIDAD EN TU MÉTODO DE PAGO.',
    image: (
      <CreditCard
        size={256}
        strokeWidth={1.1}
        className='hover:animate-pulse'
      />
    ),
  },
  {
    title: 'RESERVA EN POCOS SEGUNDOS.',
    image: (
      <BookmarkCheck
        size={256}
        strokeWidth={1.1}
        className='hover:animate-pulse'
      />
    ),
  },
  {
    title: 'ACTIVA TU RESERVA CON UN QR.',
    image: (
      <QrCode size={256} strokeWidth={1.1} className='hover:animate-pulse' />
    ),
  },
]

const Benefits = () => {
  return (
    <div className='py-20 px-10'>
      <h2 className='text-3xl tracking-widest dark:font-normal font-medium'>
        MÁS QUE UN SIMPLE ESTACIONAMIENTO
      </h2>
      <ul className='flex flex-row px-8 justify-around pt-6 flex-wrap'>
        {benefits.map((item, index) => (
          <li
            key={index}
            className='border border-primary w-64 m-2 bg-yellow-300 '
          >
            <p className='text-primary text-center bg-white'>{item.image}</p>
            <div className='p-2'>
              <h3 className='font-medium text-2xl tracking-wider text-black text-center'>
                {item.title}
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Benefits
