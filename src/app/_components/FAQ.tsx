'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Image from 'next/image'

const questions = [
  {
    question: '¿CÓMO FUNCIONA EL SISTEMA FOUR-PARKS COLOMBIA?',
    answer:
      'FOUR-PARKS COLOMBIA es una aplicación móvil que te permite encontrar, reservar y pagar tu estacionamiento en toda Colombia. Simplemente, descarga la aplicación, crea una cuenta y agrega un método de pago. Luego, puedes buscar un parqueadero cercano, seleccionar un lugar y reservar tu estacionamiento. Cuando llegues al parqueadero, la aplicación abrirá la puerta y podrás ingresar y salir sin necesidad de tiquetes o efectivo.',
  },
  {
    question: '¿EN QUÉ CIUDADES ESTÁ DISPONIBLE FOUR-PARKS COLOMBIA?',
    answer:
      'FOUR-PARKS COLOMBIA está disponible en las principales ciudades de Colombia, incluyendo Bogotá, Medellín, Cali, Barranquilla, Cartagena, Bucaramanga, Pereira, Manizales, Cúcuta y Villavicencio. Estamos expandiendo nuestra red continuamente, así que asegúrate de revisar la aplicación para ver si estamos disponibles en tu ciudad.',
  },
  {
    question: '¿CUÁNTO CUESTA USAR FOUR-PARKS COLOMBIA?',
    answer:
      'Los precios del estacionamiento varían según la ubicación, el tipo de parqueadero y la duración de tu estadía. Puedes ver los precios estimados en la aplicación antes de reservar tu lugar. Aceptamos tarjetas de crédito, débito y efectivo a través de la aplicación.',
  },
  {
    question: '¿ES SEGURO USAR FOUR-PARKS COLOMBIA?',
    answer:
      'Sí, FOUR-PARKS COLOMBIA es una plataforma segura y confiable. Utilizamos tecnología de última generación para proteger tu información personal y financiera. Todos los parqueaderos asociados con FOUR-PARKS COLOMBIA cuentan con medidas de seguridad para garantizar la seguridad de tu vehículo.',
  },
  {
    question:
      '¿CÓMO PUEDO OBTENER AYUDA SI TENGO PROBLEMAS CON FOUR PARKS?',
    answer:
      'Si tienes algún problema con FOUR-PARKS COLOMBIA, puedes contactarnos a través de la aplicación o por correo electrónico. Nuestro equipo de atención al cliente estará encantado de ayudarte.',
  },
]

export function FAQ() {
  return (
    <div className='pb-10 px-6 sm:pb-20 sm:px-10'>
      <h2 className='text-2xl sm:text-3xl tracking-widest dark:font-normal font-medium text-center'>
        PREGUNTAS FRECUENTES (FAQ)
      </h2>
      <div className='sm:px-60 flex justify-center'>
        <Accordion type='single' collapsible className='sm:my-6 my-2 w-full'>
          {questions.map((item, index) => (
            <AccordionItem value={index + 1 + ''} key={index} className='border-b border-redFPC-400'>
              <AccordionTrigger className='font-normal text-base sm:text-lg tracking-widest'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className='text-base font-normal'>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
