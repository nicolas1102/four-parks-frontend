// validaciones del lado del cliente

import { z } from 'zod'

export const AuthCredentialsValidator = z.object({
  email: z.string().email({ message: 'Dirección de email invalida.' }),
  password: z
    .string()
    .min(2, { message: 'Recuerda que la contraseña debe tener mínimo 5 caracteres.' })
    .max(8, { message: 'Recuerda que la contraseña debe tener máximo 8 caracteres.' }),
})

export const SignUpCredentialsValidator = z.object({
  email: z.string().email({ message: 'Dirección de email invalida.' }),
  firstName: z.string().min(1, { message: 'Este campo es necesario.' }),
  secondName: z.string(),
  firstLastname: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  secondLastname: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
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
});

export const ChangePasswordCredentialsValidator = z.object({
  email: z.string().email({ message: 'Dirección de email invalida.' }),
  oldPassword: z
    .string()
    .min(5, { message: 'Recuerda que la contraseña debe tener mínimo 5 caracteres.' })
    .max(8, { message: 'Recuerda que la contraseña debe tener máximo 8 caracteres.' }),
  newPassword: z
    .string()
    .min(5, { message: 'Recuerda que la contraseña debe tener mínimo 5 caracteres.' })
    .max(8, { message: 'Recuerda que la contraseña debe tener máximo 8 caracteres.' }),
  confirmPassword: z
    .string()
    .min(5, { message: 'Recuerda que la contraseña debe tener mínimo 5 caracteres.' })
    .max(8, { message: 'Recuerda que la contraseña debe tener máximo 8 caracteres.' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseña no son iguales.",
  path: ["confirmPassword"],
});

export type TSignUpCredentialsValidator = z.infer<typeof SignUpCredentialsValidator>

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>

export type TChangePasswordCredentialsValidator = z.infer<typeof ChangePasswordCredentialsValidator>