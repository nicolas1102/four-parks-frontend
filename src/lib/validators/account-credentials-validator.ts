// validaciones del lado del cliente

import { z } from 'zod'

export const AuthCredentialsValidator = z.object({
  email: z.string().email({ message: 'Dirección de email invalida.' }),
  password: z
    .string()
    .min(5, { message: 'Recuerda que la contraseña debe tener mínimo 5 caracteres.' }).max(8, { message: 'Recuerda que la contraseña debe tener máximo 8 caracteres.' }),
})

export const SignUpCredentialsValidator = z.object({
  email: z.string().email({ message: 'Dirección de email invalida.' }),
  firstName: z.string().min(1, { message: 'Este campo es necesario.' }),
  secondName: z.string(),
  firstLastname: z.string().min(1, { message: 'Este campo es necesario.' }),
  secondLastname: z.string().min(1, { message: 'Este campo es necesario.' }),
  // nombreTarjeta: z.string().min(1, { message: 'Este campo es necesario.' }),
  // numeroTarjeta: z.number().min(1000000000000000, { message: 'El número de la tarjeta de la tarjeta es requerida.' }).max(9999999999999999, { message: 'No puede contener más de 12 digitos' }),
  // mesExpiracion: z.string().min(1, { message: 'El mes de expiración es requerido.' }),
  // añoExpiracion: z.string().min(1, { message: 'El año de expiración es requerido.' }),
  // CVC: z.number().min(100, { message: 'El CVC es requerido.' }).max(999, { message: 'No puede contener más de 3 digitos' }),
  nombreTarjeta: z.string(),
  numeroTarjeta: z.string(),
  mesExpiracion: z.string(),
  añoExpiracion: z.string(),
  CVC: z.string(),
});

export type TSignUpCredentialsValidator = z.infer<typeof SignUpCredentialsValidator>

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>