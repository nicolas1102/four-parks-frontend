import StepItem from './StepItem'

const steps = [
  {
    title: 'INGRESA A NUESTRO SITIO WEB.',
    description:
      'Por ahora solo podrás acceder a nuestros servicios desde esta página web, pero pronto estaremos en más plataformas para llegar a ti más fácil.',
    image: '', // Empty image attribute
  },
  {
    title: 'REGÍSTRATE EN NUESTRO SISTEMA.',
    description:
      'A través de los distintos botones de registro, podrás dirigirte al formulario de registro, donde podrás ingresar a nuestro sistema.',
    image: '', // Empty image attribute
  },
  {
    title: 'INICIA SESIÓN POR PRIMERA VEZ.',
    description:
      'Como es tu primer ingreso, deberás ingresar con la contraseña que enviamos a tu correo.',
    image: '', // Empty image attribute
  },
  {
    title: 'CREA UNA NUEVA CONTRASEÑA.',
    description:
      'Luego de ingresar por primera vez, crearás tu nueva contraseña con la que podrás acceder las próximas veces que ingreses a nuestro sistema.',
    image: '', // Empty image attribute
  },
  {
    title: 'COMIENZA A USAR FOUR PARKS.',
    description:
      'Ahora podrás reservar cualquier parqueadero para carro, moto o incluso bicicleta disponible a nivel nacional.',
    image: '', // Empty image attribute
  },
]

const Benefits = () => {
  return (
    <div className='col-span-7 mt-4'>
      <h2 className='mt-2 text-4xl tracking-wider'>
        PARQUEA MEJOR, ASÍ DE FÁCIL
      </h2>

      <div className='pt-7 flex flex-col mx-16'>
        {steps.map((item, index) => (
          <StepItem
            key={index}
            number={index}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

export default Benefits
