import { Shield, User } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

interface HomeItemInterface {
  title: string
  link: string
  icon: ReactNode
  text: string
}

const AdminFunctionItem = ({ title, link, icon, text }: HomeItemInterface) => {
  return (
    <Link
      className='border border-primary bg-card text-card-foreground shadow flex flex-col justify-center p-4 w-72 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-accent transition-colors hover:bg-yellow-200 hover:text-black duration-500'
      href={link}
    >
      {icon}
      <h1 className='text-2xl font-normal tracking-wider text-center m-auto'>
        {title.toUpperCase()}
      </h1>
      <p className='text-sm tracking-widest text-center'>{text}</p>
    </Link>
  )
}

export default AdminFunctionItem
