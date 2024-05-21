'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ReservationInterface } from '@/lib/interfaces/reservation.interface'
import { DateTime } from 'luxon'
import { useRouter } from 'next/navigation'

export function ReservationTableItem({
  reservation,
}: {
  reservation: ReservationInterface
}) {
  const router = useRouter()

  return (
    <TableRow>
      <TableCell>
        <div className='font-medium'>
          {reservation?.parkingSlot?.parkingId?.name}
        </div>
        <div className='text-sm text-muted-foreground md:inline'>
          {reservation.parkingSlot?.parkingId?.location.address}
        </div>
        <div className='text-sm text-muted-foreground italic'>
          {reservation.parkingSlot?.parkingId?.location.city.city}
        </div>
      </TableCell>
      <TableCell className='text-center'>
        {reservation.parkingSlot?.vehicleTypeId.type}
      </TableCell>
      <TableCell className='text-center'>
        <div className='font-medium'>
          {DateTime.fromISO(reservation?.reservationTime)
            .setLocale('co')
            .toLocaleString({
              hour: 'numeric',
              minute: 'numeric',
            })}
        </div>
        <div className='hidden text-sm text-muted-foreground md:inline'>
          {DateTime.fromISO(reservation?.reservationTime)
            .setLocale('co')
            .toLocaleString()}
        </div>
      </TableCell>
      <TableCell className='text-center'>
        {!reservation.reservationEndTime ? (
          <Badge className='bg-yellowFPC-400 text-black hover:text-white border border-primary'>
            Activa
          </Badge>
        ) : (
          <Badge>Finalizada</Badge>
        )}
      </TableCell>
      <TableCell className='text-right'>
        {reservation.totalPrice === undefined ? (
          <p></p>
        ) : (
          '$' + reservation.totalPrice
        )}
      </TableCell>
      <TableCell className='text-right'>
        <Button
          onClick={() => {
            router.push(`/reserva/thank-you?reservationId=${reservation.id}`)
          }}
        >
          Ver Detalle
        </Button>
      </TableCell>
    </TableRow>
  )
}
