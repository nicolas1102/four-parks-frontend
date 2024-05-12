'use client'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { useParking } from '@/services/useParking'
import {
  ParkingAdminValidator,
  TParkingAdminValidator,
} from '@/lib/validators/parking-validators'
import { AdminSelect } from './AdminSelect'

export function ParkingAdminDialog({ parking }: { parking: ParkingInterface }) {
  const router = useRouter()
  const { updateParkingAdmin, isLoading } = useParking()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TParkingAdminValidator>({
    resolver: zodResolver(ParkingAdminValidator),
  })
  const onSubmit = async ({ admin }: TParkingAdminValidator) => {
    // TODO: cerrar ventana al crear nuevo parqueadero
    const res = await updateParkingAdmin(admin, parking)

    if (res?.status === 200) {
      router.refresh()
      router.push('/admin/parqueaderos')
    }
  }

  useEffect(() => {
    if (parking) {
      setValue('admin', parking.name)
    }
  }, [])
  return (
    <>
      <DialogTrigger asChild>
        <div className='relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted'>
          <p>Editar administrador de punto</p>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>
              {!parking ? 'CREAR PARQUEADERO' : 'EDITAR PARQUEADERO'}
            </p>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-2'>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='admin'>Administrador</Label>
              <AdminSelect
                selectValue={parking.admin ? parking.admin : ''}
                setSelectValue={setValue}
                errors={errors.admin}
              />
              {errors?.admin && (
                <p className='text-sm text-red-500'>{errors.admin.message}</p>
              )}
            </div>

            <PrimaryButton
              text={'CONFIRMAR ADMINISTRADOR'}
              isLoading={isLoading}
            />
          </div>
        </form>
      </DialogContent>
    </>
  )
}
