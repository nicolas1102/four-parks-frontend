import { ArrowLeft, Loader2 } from 'lucide-react'
import { Icons } from '@/components/Icons'
import { ReactNode } from 'react'
import FloatingButton from './CustomButtons/FloatingButton'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

const NoResults = ({ redirection }: { redirection?: string }) => {
  return (
    <div className='relative flex flex-col items-center gap-y-2'>
      <FloatingButton
        text='IR A LUGAR SEGURO'
        href={redirection ? redirection : '/'}
        direction='left'
      />
      <div className='relative mb-4 h-32 w-32 text-muted-foreground'>
        <Icons.lost className='text-red-400' />
      </div>
      <h3 className='tracking-widest text-2xl'>SIN RESULTADOS.</h3>
      <p className='text-muted-foreground'>
        No se encontraron resultados de lo que estás buscando. Intenta más
        tarde.
      </p>
      <Link
        className={buttonVariants({
          variant: 'link',
          className: 'gap-1.5',
        })}
        href={redirection ? redirection : '/'}
      >
        <ArrowLeft className='h-4 w-4' />
        Volver a un lugar seguro.
      </Link>
    </div>
  )
}

export default NoResults
