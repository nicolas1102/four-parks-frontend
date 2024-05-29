'use client'

import { User as UserIcons } from 'lucide-react'
import Loader from '@/components/Loader'
import { AuditsTable } from './_components/AuditsTable'
import { useEffect, useState } from 'react'
import { useAudit } from '@/services/useAudit'
import { DateRangePicker } from './_components/DateRangePicker'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { addDays } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { useUser } from '@/services/useUser'
import { UserInterface } from '@/lib/interfaces/user.interface'
import NoResults from '@/components/NoResults'

const Page = ({ params: { userId } }: { params: { userId: number } }) => {
  const { audits, getAuditsByUserId, isLoading } = useAudit()
  const { getOneUserById, isLoading: isUseUserLoading } = useUser()
  const [user, setUser] = useState<UserInterface>()
  const [isFistTime, setIsFistTime] = useState(true)

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -2),
    to: new Date(),
  })

  useEffect(() => {
    const fetchUser = async (userId: number) => {
      const userData = await getOneUserById(userId)
      userData && setUser(userData)
    }
    userId.toString() !== '-1' && fetchUser(userId)
  }, [])

  const onSubmit = () => {
    if (isFistTime === true) setIsFistTime(false)
    const fetchAudits = async () => {
      if (dateRange?.from !== undefined && dateRange?.to !== undefined) {
        const nextDay = new Date(dateRange.to)
        nextDay.setDate(nextDay.getDate() + 1)
        const dateRangeData = {
          beginning: dateRange?.from
            ?.toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })
            .replace(/\//g, '-')
            .split('-')
            .map((part) => part.padStart(2, '0'))
            .reverse()
            .join('-'),
          ending: nextDay
            ?.toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })
            .replace(/\//g, '-')
            .split('-')
            .map((part) => part.padStart(2, '0'))
            .reverse()
            .join('-'),
        }
        await getAuditsByUserId(userId, dateRangeData)
      }
    }
    fetchAudits()
  }
  return (
    <div className=' flex flex-col relative m-6 sm:m-10'>
      {isLoading || isUseUserLoading ? (
        <Loader />
      ) : user === undefined && userId.toString() !== '-1' ? (
        <NoResults />
      ) : (
        <>
          <div className='flex sm:flex-row sm:justify-between justify-center flex-col  gap-y-3'>
            <div className=' flex flex-col gap-y-2'>
              <h1 className='text-3xl font-normal tracking-wider text-primary sm:text-4xl inline-flex'>
                <UserIcons className='h-9 w-9 mt-1 mr-2' />
                USUARIOS
              </h1>
              <p className='text-sm tracking-wider'>
                Visualiza todas las acciones del usuario.
              </p>
              {userId.toString() !== '-1' && (
                <div>
                  <p className='tracking-widest'>
                    NOMBRE:{' '}
                    <span className='font-light'>
                      {user?.firstName + ' ' + user?.firstLastname}
                    </span>
                  </p>
                  <p className='tracking-widest'>
                    EMAIL: <span className='font-light'>{user?.email}</span>
                  </p>
                  <p className='tracking-widest'>
                    ROLE:{' '}
                    {/* <span className='font-light'>{user?.roleList[0]}</span> */}
                  </p>
                </div>
              )}
            </div>
            <div className='flex gap-2 sm:flex-row flex-col'>
              <DateRangePicker
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
              <PrimaryButton text='BUSCAR' onClick={onSubmit} />
            </div>
          </div>
          {isFistTime ? (
            <div className='w-full h-32 flex items-center'>
              <p className='tracking-widest text-center w-full'>
                SELECCIONA UN RANGO DE FECHAS.
              </p>
            </div>
          ) : (
            <AuditsTable data={audits} />
          )}
        </>
      )}
    </div>
  )
}

export default Page
