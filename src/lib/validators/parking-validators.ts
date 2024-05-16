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
  openTime: z
    .string().min(1, { message: 'Este campo es necesario.' }),
  closeTime: z
    .string().min(1, { message: 'Este campo es necesario.' }),
  loyalty: z
    .boolean(),
  parkingType: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  carSlots: z
    .number()
    .min(0, { message: 'La capacidad no puede ser menor a 0.' }),
  bicycleSlots: z
    .number()
    .min(0, { message: 'La capacidad no puede ser menor a 0.' }),
  motorcycleSlots: z
    .number()
    .min(0, { message: 'La capacidad no puede ser menor a 0.' }),
  heavyVehicleSlots: z
    .number()
    .min(0, { message: 'La capacidad no puede ser menor a 0.' }),
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
