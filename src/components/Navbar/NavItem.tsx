import Link from 'next/link'

interface NavItemInterface {
  title: string
  link: string
}

const NavItem = ({ title, link }: NavItemInterface) => {
  return (
    <Link
      className={
        'select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex flex-row items-center gap-1 tracking-widest border hover:border-primary hover:bg-yellow-200  dark:hover:bg-yellow-300 dark:hover:text-background'
      }
      href={link}
    >

      <p className='text-sm font-medium leading-none m-0'>{title}</p>
    </Link>
  )
}
NavItem.displayName = 'NavItem'

export default NavItem
