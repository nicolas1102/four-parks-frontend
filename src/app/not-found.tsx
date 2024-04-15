import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import FloatingButton from '@/components/buttons/FloatingButton'

export default function NotFound() {
  return (
    <div className='container relative flex flex-col items-center gap-2 pt-10'>
      <FloatingButton text='PANTALLA DE INICIO' href='/' direction='left' />
      <div className='relative mb-4 h-32 w-32 text-muted-foreground'>
        <Icons.lost className='text-red-400' />
      </div>
      <h3 className='tracking-widest text-2xl'>TE PERDISTE.</h3>
      <p className='text-muted-foreground'>
        No se pudo encontrar la pagina que estás buscando.
      </p>
      <Link
        className={buttonVariants({
          variant: 'link',
          className: 'gap-1.5',
        })}
        href='/'
      >
        <ArrowLeft className='h-4 w-4' />
        Volver a un lugar seguro.
      </Link>
    </div>
  )
}
