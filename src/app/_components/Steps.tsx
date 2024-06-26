import Image from 'next/image'

const steps = [
  {
    title: 'INGRESA A NUESTRO SITIO WEB.',
    description:
      'Por ahora solo podrás acceder a nuestros servicios desde esta página web, pero pronto estaremos en más plataformas para llegar a ti más fácil.',
    image: '',
  },
  {
    title: 'REGÍSTRATE EN NUESTRO SISTEMA.',
    description:
      'A través de los distintos botones de registro, podrás dirigirte al formulario de registro, donde podrás ingresar a nuestro sistema.',
    image: '',
  },
  {
    title: 'INICIA SESIÓN POR PRIMERA VEZ.',
    description:
      'Como es tu primer ingreso, deberás ingresar con la contraseña que enviamos a tu correo.',
    image: '',
  },
  {
    title: 'CREA UNA NUEVA CONTRASEÑA.',
    description:
      'Luego de ingresar por primera vez, crearás tu nueva contraseña con la que podrás acceder las próximas veces que ingreses a nuestro sistema.',
    image: '',
  },
  {
    title: 'COMIENZA A USAR FOUR PARKS.',
    description:
      'Ahora podrás reservar cualquier parqueadero para carro, moto o incluso bicicleta disponible a nivel nacional.',
    image: '',
  },
]

const Steps = () => {
  return (
    <div className=' bg-blueFPC-400 py-10 sm:py-20 px-6 sm:px-32 w-full sm:grid sm:grid-cols-12'>
      <div className='hidden sm:block col-span-5 relative overflow-hidden h-[630px]'>
        <Image
          src='/landing/steps.jpg'
          className='w-full h-full object-cover object-center'
          alt='thank you for your order'
          priority
          width='1200'
          height='1200'
        />
      </div>

      <div className='sm:col-span-7 sm:pl-10'>
        <h2 className='text-3xl text-black tracking-widest font-medium'>
          PARQUEA MEJOR, ASÍ DE FÁCIL
        </h2>
        <p className='text-lg text-black'>
          En solo unos pocos pasos estarás reservando tus parqueaderos en todo
          Colombia.
        </p>
        <ul className='flex flex-col gap-4 py-4'>
          {steps.map((item, index) => (
            <li
              key={index}
              className='flex flex-row text-black border border-black p-2 bg-blueFPC-200'
            >
              <p className='text-3xl font-semibold text-center'>{index + 1}.</p>
              <div className='flex flex-col pl-4'>
                <h3 className='font-semibold text-lg tracking-wide'>
                  {item.title}
                </h3>
                <p className='text-base'>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Steps
