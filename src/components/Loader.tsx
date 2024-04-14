'use client'

import { Loader2 } from 'lucide-react'
import { Icons } from '@/components/Icons'
import { ReactNode, Suspense, useEffect } from 'react'

const Loader = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    console.log('goku');
  }, []);
  return (
    <Suspense
      fallback={
        <div className='flex flex-col items-center gap-2'>
          <div className='animate-pulse relative mb-4 h-32 w-32 text-muted-foreground'>
            <Icons.logo />
          </div>
          <Loader2 className='animate-spin h-8 w-8 text-zinc-300' />
          <h3 className='tracking-widest text-2xl'>CARGANDO...</h3>
          <p className='text-muted-foreground'>Esto no tomará mucho tiempo.</p>
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export default Loader
