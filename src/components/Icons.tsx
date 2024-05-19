import { LucideProps } from 'lucide-react'

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-square-parking '
      {...props}
      x='0px'
      y='0px'
      enableBackground='new 0 0 32 32'
      xmlSpace='preserve'
    >
      <rect width='20' height='20' x='2' y='2' rx='2'  />
      <path d='M9 17V7h4a3 3 0 0 1 0 6H9'  />
    </svg>
  ),
  lost: (props: LucideProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-square-parking-off'
      {...props}
      x='0px'
      y='0px'
      enableBackground='new 0 0 32 32'
      xmlSpace='preserve'
    >
      <path d='M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41' />
      <path d='M3 8.7V19a2 2 0 0 0 2 2h10.3' />
      <path d='m2 2 20 20' />
      <path d='M13 13a3 3 0 1 0 0-6H9v2' />
      <path d='M9 17v-2.3' />
    </svg>
  ),
}
