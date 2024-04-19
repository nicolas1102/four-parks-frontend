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
    image: '/1.jpg',
  },
  {
    name: 'María Gómez',
    experience:
      'Me encantó la opción de reservar mi lugar de estacionamiento con anticipación. Esto me ahorró mucho tiempo y estrés.',
    image: '/3.jpg',
  },
  {
    name: 'Pedro Rodríguez',
    experience:
      'El sistema de navegación me guió directamente al parqueadero, sin necesidad de dar vueltas. ¡Muy útil!',
    image: '/2.jpg',
  },
  {
    name: 'Ana López',
    experience:
      'Los precios del estacionamiento son muy razonables, especialmente considerando la comodidad y seguridad que ofrece el servicio.',
    image: '/1.jpg',
  },
  {
    name: 'David Sánchez',
    experience:
      'El personal del parqueadero fue muy amable y servicial. Me ayudaron con mi equipaje y me proporcionaron información sobre la zona.',
    image: '/3.jpg',
  },
]

export function ExperiencesCards() {
  return (
    <div className='py-20 px-10'>
      <h2 className='text-3xl tracking-widest dark:font-normal font-medium pb-7 text-center'>
        EXPERIENCIAS DE NUESTROS CLIENTES
      </h2>
      <div className='px-12 flex justify-center'>
        <Carousel
          className='w-[1150px] '
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
              <CarouselItem key={index} className='basis-1/2'>
                <div className='p-1'>
                  <Card className='bg-yellow-300 border border-primary'>
                    <CardContent className='flex aspect-square content-start justify-center p-6 h-96 flex-col w-full text-black'>
                      <div className='flex justify-center flex-col items-center'>
                        <div className='rounded-full relative overflow-hidden h-40 w-40 border-2 border-primary'>
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
                        <p className='uppercase tracking-widest pt-3 text-xl font-medium'>{item.name}</p>
                      </div>
                      <div className=''>
                        <p className='mt-3 text-center'>
                          <span className='text-xl font-bold'>&quot;</span>
                          <span className='text-xl '>{item.experience}</span>
                          <span className='text-xl font-bold'>&quot;</span>
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
