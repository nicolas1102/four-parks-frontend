import { z } from 'zod'

export const ParkingValidator = z.object({
  name: z.string().min(1, { message: 'Este campo es necesario.' }),
  admin: z
    .string()
    .min(1, { message: 'Todo parqueadero debe tener un administrador.' }),
  city: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  address: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  latitude: z
    .number(),
  longitude: z
    .number(),
  totalSlots: z
    .number()
    .min(1, { message: 'La capacidad (número de slots) no puede ser menor o igual a 0.' })
    .max(1000, { message: 'No puede contener más de 1000 slots' }),
  openTime: z
    .string().min(1, { message: 'Este campo es necesario.' }),
  closeTime: z
    .string().min(1, { message: 'Este campo es necesario.' }),
  loyalty: z
    .boolean(),
  parkingType: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  carRate: z
    .number()
    .min(0, { message: 'Un precio no puede ser menor a 0 pesos.' }),
  motorcycleRate: z
    .number()
    .min(0, { message: 'Un precio no puede ser menor a 0 pesos.' }),
  bikeRate: z
    .number()
    .min(0, { message: 'Un precio no puede ser menor a 0 pesos.' }),
  heavyCarRate: z
    .number()
    .min(0, { message: 'Un precio no puede ser menor a 0 pesos.' }),
}).refine((data) => data.closeTime >= data.openTime, {
  message: "La hora de cierre no puede ser igual o mayor a la de apertura.",
  path: ["closeTime"],
});

export type TParkingValidator = z.infer<typeof ParkingValidator>
