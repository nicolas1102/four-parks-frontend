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
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'lastName',
    header: 'Apellido',
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
