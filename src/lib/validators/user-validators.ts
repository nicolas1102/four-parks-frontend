import { z } from 'zod'

export const EditUserFromManagerValidator = z.object({
  firstName: z.string().min(1, { message: 'Este campo es necesario.' }),
  secondName: z.string(),
  firstLastname: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  secondLastname: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  accountActive: z.boolean(),
  accountBlocked: z.boolean(),
  loginAttempts: z
    .number()
    .min(0, { message: 'El número de intentos de logueo debe ser mayor o igual a 0.' })
    .max(4, { message: 'El número de intentos de logueo debe no puede ser mayor a 4.' })
});

export const CreateAdminFromManagerValidator = z.object({
  email: z.string().email({ message: 'Dirección de email invalida.' }),
  firstName: z.string().min(1, { message: 'Este campo es necesario.' }),
  secondName: z.string(),
  firstLastname: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  secondLastname: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  accountActive: z.boolean(),
  accountBlocked: z.boolean(),
  loginAttempts: z
    .number()
    .min(0, { message: 'El número de intentos de logueo debe ser mayor o igual a 0.' })
    .max(4, { message: 'El número de intentos de logueo debe no puede ser mayor a 4.' }),
  parking: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
});

export const EditPersonalInfoValidator = z.object({
  firstName: z.string().min(1, { message: 'Este campo es necesario.' }),
  secondName: z.string(),
  firstLastname: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  secondLastname: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
});

export const EditCreditCardValidator = z.object({
  cardNumber: z
    .number()
    .min(1000000000000000, { message: 'El número de la tarjeta de la tarjeta es requerida.' })
    .max(9999999999999999, { message: 'No puede contener más de 12 digitos' }),
  expirationMonth: z
    .string(),
  expirationYear: z
    .string(),
  cvv: z
    .number()
    .min(100, { message: 'El CVV es requerido.' })
    .max(9999, { message: 'No puede contener más de 4 digitos' }),
})

export type TEditPersonalInfoValidator = z.infer<typeof EditPersonalInfoValidator>
export type TEditUserFromManagerValidator = z.infer<typeof EditUserFromManagerValidator>
export type TCreateAdminFromManagerValidator = z.infer<typeof CreateAdminFromManagerValidator>
export type TEditCreditCardValidator = z.infer<typeof EditCreditCardValidator>