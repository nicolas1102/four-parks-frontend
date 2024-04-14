import { Shield, User } from 'lucide-react'
import Link from 'next/link'

interface HomeItemInterface {
  title: string
  link: string
  icon: string
  text: string
}

const HomeItem = ({ title, link, icon, text }: HomeItemInterface) => {
  return (
    <Link
      className=' border bg-card text-card-foreground shadow flex flex-col justify-center gap-8 p-4 w-72 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-accent transition-colors '
      href={link}
    >
      {icon === 'Player' ? (
        <User className='h-24 w-24 mx-auto' />
      ) : (
        <Shield className='h-24 w-24 mx-auto' />
      )}
      <h1 className='text-3xl font-normal tracking-wider text-center text-primary sm:text-4xl m-auto'>
        {title.toUpperCase()}
      </h1>
      <p className='text-sm tracking-widest text-center'>{text}</p>
    </Link>
  )
}

export default HomeItem
