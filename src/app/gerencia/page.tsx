'use client'

import { useSession } from 'next-auth/react'

export default function Home() {
  // const { data: session, status } = useSession()

  return (
    <div className='max-h-full m-auto flex flex-col gap-y-10'>
      <h1 className='text-sm tracking-widest text-center'>
        Yo había ponido mi pagina de GERENTES aquí
      </h1>
      <div className='flex justify-center flex-row gap-6 '>
        {/* <HomeItem
          title={PAGES_INFO[0].title}
          link={PAGES_INFO[0].link}
          icon={PAGES_INFO[0].icon}
          text={PAGES_INFO[0].text}
        />
        <HomeItem
          title={PAGES_INFO[1].title}
          link={PAGES_INFO[1].link}
          icon={PAGES_INFO[1].icon}
          text={PAGES_INFO[1].text}
        /> */}
      </div>
    </div>
  )
}
