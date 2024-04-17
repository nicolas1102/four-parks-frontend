'use client'

import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = () => {
  const [sessionState, setSessionState] = useState<Session>();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (session) {
      setSessionState(session);
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    // TODO: CAMBIAR A GERENTE
    if (!loading && sessionState?.user.role !== 'USUARIO') {
      router.push('/auth/unauthorized');
    }
  }, [loading, router, sessionState]);

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

export default Page
