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

export function EndReservationDialog({
  reservation,
}: {
  reservation: ReservationInterface
}) {
  const { endReservation } = useReservation()
  const router = useRouter()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PrimaryButton text='TERMINAR TIEMPO RESERVA' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>TERMINAR TIEMPO RESERVA</p>
          </DialogTitle>
          <DialogDescription>
            Con esto terminará la el tiempo de reserva del usuario y se
            realizará el cobro a la tarjeta de crédito del usuario.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <PrimaryButton
            text='TERMINAR TIEMPO'
            onClick={async () => {
              const res = await endReservation(reservation)
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
