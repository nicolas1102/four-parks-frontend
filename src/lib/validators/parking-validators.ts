import { z } from 'zod'

export const ParkingValidator = z.object({
  name: z.string().min(1, { message: 'Este campo es necesario.' }),
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
  // admin: z
  //   .string()
  //   .min(1, { message: 'Este campo es necesario.' }),
  totalSlots: z
    .number()
    .min(1, { message: 'La capacidad (número de slots) no puede ser menor o igual a 0.' })
    .max(1000, { message: 'No puede contener más de 1000 slots' }),
  hoursOpenTime: z
    .number()
    .min(0, { message: 'La hora no puede ser negativa.' })
    .max(23, { message: 'La hora no puede ser mayor a 24.' }),
  minutesOpenTime: z
    .number()
    .min(0, { message: 'Los minutos no pueden ser negativos.' })
    .max(59, { message: 'La minutos no pueden ser mayores a 59.' }),
  hoursCloseTime: z
    .number()
    .min(0, { message: 'La hora no puede ser negativa.' })
    .max(23, { message: 'La hora no puede ser mayor a 24.' }),
  minutesCloseTime: z
    .number()
    .min(0, { message: 'Los minutos no pueden ser negativos.' })
    .max(59, { message: 'La minutos no pueden ser mayores a 59.' }),
  loyalty: z
    .boolean(),
  parkingType: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
});

// export const EditUserFromAdminValidator = z.object({
//   firstName: z.string().min(1, { message: 'Este campo es necesario.' }),
//   secondName: z.string(),
//   firstLastname: z
//     .string()
//     .min(1, { message: 'Este campo es necesario.' }),
//   secondLastname: z
//     .string()
//     .min(1, { message: 'Este campo es necesario.' }),
//   accountActive: z.boolean(),
//   accountBlocked: z.boolean(),
//   loginAttempts: z
//     .number()
//     .min(0, { message: 'El número de intentos de logueo debe ser mayor o igual a 0.' })
//     .max(4, { message: 'El número de intentos de logueo debe no puede ser mayor a 4.' })
// });

// export const CreateAdminFromAdminValidator = z.object({
//   email: z.string().email({ message: 'Dirección de email invalida.' }),
//   firstName: z.string().min(1, { message: 'Este campo es necesario.' }),
//   secondName: z.string(),
//   firstLastname: z
//     .string()
//     .min(1, { message: 'Este campo es necesario.' }),
//   secondLastname: z
//     .string()
//     .min(1, { message: 'Este campo es necesario.' }),
//   accountActive: z.boolean(),
//   accountBlocked: z.boolean(),
//   loginAttempts: z
//     .number()
//     .min(0, { message: 'El número de intentos de logueo debe ser mayor o igual a 0.' })
//     .max(4, { message: 'El número de intentos de logueo debe no puede ser mayor a 4.' })
// });

// export const EditPersonalInfoValidator = z.object({
//   firstName: z.string().min(1, { message: 'Este campo es necesario.' }),
//   secondName: z.string(),
//   firstLastname: z
//     .string()
//     .min(1, { message: 'Este campo es necesario.' }),
//   secondLastname: z
//     .string()
//     .min(1, { message: 'Este campo es necesario.' }),
// });

// export const EditCreditCardValidator = z.object({
//   cardNumber: z
//     .number()
//     .min(1000000000000000, { message: 'El número de la tarjeta de la tarjeta es requerida.' })
//     .max(9999999999999999, { message: 'No puede contener más de 12 digitos' }),
//   expirationMonth: z
//     .string(),
//   expirationYear: z
//     .string(),
//   cvv: z
//     .number()
//     .min(100, { message: 'El CVV es requerido.' })
//     .max(9999, { message: 'No puede contener más de 4 digitos' }),
// })

export type TParkingValidator = z.infer<typeof ParkingValidator>
