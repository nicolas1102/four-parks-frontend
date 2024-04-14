import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const FloatingLink = ({
  text,
  href,
  direction,
}: {
  text: string
  href: string
  direction: 'right' | 'left'
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-yellow-100 hover:text-accent-foreground h-9 px-4 py-2 absolute top-0 z-10 tracking-widest border dark:hover:bg-yellow-300 dark:hover:text-black',
        { 'left-2 md:left-0 ': direction === 'left' },
        { 'right-2 md:right-0 ': direction === 'right' }
      )}
    >
      {direction === 'left' && <ArrowLeft className='h-4 w-4 mx-1' />}
      {text}
      {direction === 'right' && <ArrowRight className='h-4 w-4 mx-1' />}
    </Link>
  )
}

export default FloatingLink
