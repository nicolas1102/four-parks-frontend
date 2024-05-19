'use client'

import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import SecondaryButton from '@/components/CustomButtons/SecondaryButton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { ReservationInterface } from '@/lib/interfaces/reservation.interface'
import { useReservation } from '@/services/useReservation'
import { useRouter } from 'next/navigation'

export function StartReservationDialog({
  reservation,
}: {
  reservation: ReservationInterface
}) {
  const { startReservation } = useReservation()
  const router = useRouter()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PrimaryButton text='INICIAR TIEMPO RESERVA' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>INICIAR TIEMPO RESERVA</p>
          </DialogTitle>
          <DialogDescription>
            Con esto iniciaría la reserva del usuario y empezaría el conteo de
            tiempo.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <PrimaryButton
            text='INICIAR TIEMPO'
            onClick={async () => {
              const res = await startReservation(reservation)
              console.log(res?.status)

              if (res?.status == 200) {
                router.refresh()
              }
            }}
          />
          <DialogClose>
            <SecondaryButton text='CANCELAR' />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
