import Link from 'next/link'
import { Jugador } from '../../types'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useJugador } from '@/hooks/JugadorContext'
import { Button } from './ui/button'

interface TableInterface {
  jugadores: Array<Jugador>
}

const JUGADORES_TABLA_COLUMNS = [
  'Id',
  'Nombre',
  'Apellido',
  'Nacionalidad',
  'Minutos Jugados',
  'Posicion',
  'Edad',
  'Equipo',
]

const TableJugadores = ({ jugadores }: TableInterface) => {
  const { deleteJugador } = useJugador()
  return (
    <Table className='border'>
      <TableCaption>Una lista de todos los jugadores.</TableCaption>
      <TableHeader>
        <TableRow>
          {JUGADORES_TABLA_COLUMNS.map((column: string) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
          <TableHead className='text-center'>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jugadores.map((jugador) => (
          <TableRow key={jugador._id}>
            <TableCell className='font-light'>{jugador._id}</TableCell>
            <TableCell>{jugador.nombre}</TableCell>
            <TableCell>{jugador.apellido}</TableCell>
            <TableCell>{jugador.nacionalidad}</TableCell>
            <TableCell>{jugador.minutos_jugados} min.</TableCell>
            <TableCell>{jugador.posicion}</TableCell>
            <TableCell>{jugador.edad} años</TableCell>
            <TableCell>{jugador.equipo}</TableCell>
            <TableCell className='text-center flex gap-2 justify-center'>
              <Button variant='outline'>
                <Link href={`/jugadores/editar/${jugador._id}`}>Editar</Link>
              </Button>

              <Button
                variant='destructive'
                onClick={() => {
                  if (jugador._id) deleteJugador(jugador._id)
                }}
              >
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableJugadores
