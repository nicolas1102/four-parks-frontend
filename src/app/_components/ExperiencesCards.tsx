'use client'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

const experiences = [
  {
    name: 'Juan Pérez',
    experience:
      'Encontré un lugar de estacionamiento rápidamente y sin problemas. El sistema de pago fue muy fácil de usar.',
    image: '',
  },
  {
    name: 'María Gómez',
    experience:
      'Me encantó la opción de reservar mi lugar de estacionamiento con anticipación. Esto me ahorró mucho tiempo y estrés.',
    image: '',
  },
  {
    name: 'Pedro Rodríguez',
    experience:
      'El sistema de navegación me guió directamente al parqueadero, sin necesidad de dar vueltas. ¡Muy útil!',
    image: '',
  },
  {
    name: 'Ana López',
    experience:
      'Los precios del estacionamiento son muy razonables, especialmente considerando la comodidad y seguridad que ofrece el servicio.',
    image: '',
  },
  {
    name: 'David Sánchez',
    experience:
      'El personal del parqueadero fue muy amable y servicial. Me ayudaron con mi equipaje y me proporcionaron información sobre la zona.',
    image: '',
  },
]

export function ExperiencesCards() {
  return (
    <div className='py-20 px-10'>
      <h2 className='text-3xl tracking-widest dark:font-normal font-medium pb-7'>
        EXPERIENCIAS DE NUESTROS CLIENTES
      </h2>
      <div className='px-12'>
        <Carousel
          className='w-full flex flex-col px-10'
          opts={{
            align: 'center',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 10000,
            }),
          ]}
        >
          <CarouselContent className=''>
            {experiences.map((item, index) => (
              <CarouselItem
                key={index}
                className='md:basis-1/2 lg:basis-10/12 '
              >
                <div className='p-3 md:p-1'>
                  <Card className='overflow-hidden'>
                    <CardContent className='flex items-center justify-center p-6 h-96 md:h-[600px] relative'>
                      <Image
                        src={item.image}
                        alt={item.image}
                        fill
                        className='object-cover object-center'
                        priority
                        autoSave='true'
                      />
                      <p>{item.experience}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
