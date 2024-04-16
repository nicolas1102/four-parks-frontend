import { User } from '@/lib/interfaces/user.model'
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
    accessorKey: 'firstLastname',
    header: 'Primer Apellido',
  },
  {
    accessorKey: 'secondLastname',
    header: 'Segundo Apellido',
  },
  {
    accessorKey: 'loginAttempts',
    header: 'Intentos de Logueo',
  },
  {
    accessorKey: 'isActive',
    header: 'Cuenta Activada',
  },
  {
    accessorKey: 'isBlocked',
    header: 'Cuenta Bloqueada',
  },
  {
    accessorKey: 'roleRequest.roleListName',
    header: 'Rol',
  },
]
