'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Tweet } from 'react-tweet'
import Autoplay from 'embla-carousel-autoplay'

export function XTweets() {
  return (
    <div className='sm:py-20 sm:px-10 py-10 px-2'>
      <h2 className='sm:text-3xl text-2xl tracking-widest dark:font-normal font-medium pb-7 text-center'>
        TWEETS
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
            <CarouselItem className='sm:basis-1/3'>
              <div className='p-1'>
                <Tweet id='1805973576958284043' />
              </div>
            </CarouselItem>
            <CarouselItem className='sm:basis-1/3'>
              <div className='p-1'>
                <Tweet id='1806328908540735534' />
              </div>
            </CarouselItem>
            <CarouselItem className='sm:basis-1/3'>
              <div className='p-1'>
                <Tweet id='1806329865525764121' />
              </div>
            </CarouselItem>
            <CarouselItem className='sm:basis-1/3'>
              <div className='p-1'>
                <Tweet id='1806330679908544846' />
              </div>
            </CarouselItem>
            <CarouselItem className='sm:basis-1/3'>
              <div className='p-1'>
                <Tweet id='1806332685306015877' />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
