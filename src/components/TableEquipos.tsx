import Link from 'next/link'
import { Equipo } from '../../types'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEquipo } from '@/hooks/EquipoContext'
import { Button } from './ui/button'

interface TableInterface {
  equipos: Array<Equipo>
}

const EQUIPOS_TABLA_COLUMNS = [
  'Id',
  'Nombre',
  'Himno',
  'Record (V:E:D)',
  'Cantidad Titulos',
  'Cantidad Jugadores',
]

const TableEquipos = ({ equipos }: TableInterface) => {
  const { deleteEquipo } = useEquipo()
  return (
    <Table className='border'>
      <TableCaption>Una lista de todos los equipos.</TableCaption>
      <TableHeader>
        <TableRow>
          {EQUIPOS_TABLA_COLUMNS.map((column: string) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
          <TableHead className='text-center'>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {equipos.map((equipo) => (
          <TableRow key={equipo._id}>
            <TableCell className='font-medium'>{equipo._id}</TableCell>
            <TableCell>{equipo.nombre}</TableCell>
            <TableCell className='truncate overflow-ellipsis max-w-xs'>
              {equipo.himno}
            </TableCell>
            <TableCell>
              {equipo.victorias} : {equipo.empates} : {equipo.derrotas}
            </TableCell>
            <TableCell className='text-center'>
              {equipo.cantidad_titulos}
            </TableCell>
            <TableCell className='text-center'>
              {equipo.cantidad_jugadores}
            </TableCell>
            <TableCell className='text-center flex gap-2'>
              <Button variant='outline'>
                <Link href={`/equipos/editar/${equipo._id}`}>Editar</Link>
              </Button>

              <Button
                variant='destructive'
                onClick={() => {
                  if (equipo._id) deleteEquipo(equipo._id)
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

export default TableEquipos
