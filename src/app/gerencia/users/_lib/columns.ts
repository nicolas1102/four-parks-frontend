import { User } from '@/interfaces/user.model'
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
  },
  {
    accessorKey: 'firstName',
    header: 'Primer Nombre',
  },
  {
    accessorKey: 'secondName',
    header: 'Segundo Nombre',
  },
  {
    accessorKey: 'firstSurname',
    header: 'Primer Apellido',
  },
  {
    accessorKey: 'secondSurname',
    header: 'Segundo Apellido',
  },
  {
    accessorKey: 'loginAttempts',
    header: 'Intentos de Logueo',
  },
  {
    accessorKey: 'isActive',
    header: 'Estado Cuenta',
  },
]
