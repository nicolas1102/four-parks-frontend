'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Tweet } from 'react-tweet'

export function XTweets() {
  return (
    <div className='pb-10 px-6 sm:pb-20 sm:px-10'>
      <h2 className='text-2xl sm:text-3xl tracking-widest dark:font-normal font-medium text-center'>
        TWEETS
      </h2>
      <div className='sm:px-60 flex justify-center'>
        <ScrollArea>
          <div className='h-[500px]'>
            <Tweet id='1805973576958284043' />
            <Tweet id='1683920951807971329' />
            <Tweet id='1683920951807971329' />
            <Tweet id='1683920951807971329' />
            <Tweet id='1683920951807971329' />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
