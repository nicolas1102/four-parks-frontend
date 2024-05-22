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
    name: 'Hernesto',
    experience:
      'Me encantó la opción de reservar mi lugar de estacionamiento con anticipación. Esto me ahorró mucho tiempo y estrés.',
    image: '/landing/experiences/1.jpg',
  },
  {
    name: 'Pancracio',
    experience:
      'El sistema de navegación me guio directamente al parqueadero, sin necesidad de dar vueltas. ¡Muy útil!',
    image: '/landing/experiences/3.jpg',
  },
  {
    name: 'Andrés',
    experience:
      'Los precios del estacionamiento son muy razonables, especialmente considerando la comodidad y seguridad que ofrece el servicio.',
    image: '/landing/experiences/handi.jpeg',
  },
  {
    name: 'Alejandro',
    experience:
      'Excelente servicio. El personal me ayudó a meter mi tractomula hasta el fondo del sótano sin problemas.',
    image: '/landing/experiences/alejandro.png',
  },
  {
    name: 'Shara',
    experience:
      'El personal del parqueadero fue muy amable y servicial. Me ayudaron con mi equipaje y me proporcionaron información sobre la zona.',
    image: '/landing/experiences/2.jpg',
  },
]

export function ExperiencesCards() {
  return (
    <div className='sm:py-20 sm:px-10 py-10 px-2'>
      <h2 className='sm:text-3xl text-2xl tracking-widest dark:font-normal font-medium pb-7 text-center'>
        EXPERIENCIAS DE NUESTROS CLIENTES
      </h2>
      <div className='px-12 flex justify-center'>
        <Carousel
          className='sm:w-[1000px] w-64 '
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
              <CarouselItem key={index} className='sm:basis-1/3'>
                <div className='p-1'>
                  <Card className='bg-blueFPC-400 border border-primary'>
                    <CardContent className='flex aspect-square content-start justify-center py-10 p-6 h-[500px] flex-col w-full text-white'>
                      <div className='flex justify-center flex-col items-center'>
                        <div className='rounded-full relative overflow-hidden h-40 w-40 border-2 border-white'>
                          <Image
                            src={item.image}
                            alt={item.image}
                            className='object-cover object-center'
                            priority
                            autoSave='true'
                            width={160}
                            height={160}
                          />
                        </div>
                        <p className='uppercase tracking-widest pt-3 text-lg sm:text-xl font-medium'>
                          {item.name}
                        </p>
                      </div>
                      <div className=''>
                        <p className='mt-3 text-center'>
                          <span className='text-lg sm:text-xl font-bold'>
                            &quot;
                          </span>
                          <span className='text-lg sm:text-xl '>
                            {item.experience}
                          </span>
                          <span className='text-lg sm:text-xl font-bold'>
                            &quot;
                          </span>
                        </p>
                      </div>
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
