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
  nombre: z.string().min(1, { message: 'El nombre debe tener al menos 1 carácter.' }),
  apellido: z.string().min(1, { message: 'El apellido debe tener al menos 1 carácter.' }),
  nombreTarjeta: z.string().min(1, { message: 'El nombre de la tarjeta debe tener al menos 1 carácter.' }),
  numeroTarjeta: z.number().min(1000000000000000, { message: 'El número de la tarjeta de la tarjeta es requerida.' }).max(9999999999999999, {message: 'No puede contener más de 12 digitos'}),
  mesExpiracion: z.string().min(1, { message: 'El mes de expiración es requerido.' }),
  añoExpiracion: z.string().min(1, { message: 'El año de expiración es requerido.' }),
  CVC: z.number().min(100, { message: 'El CVC es requerido.' }).max(999, {message: 'No puede contener más de 3 digitos'}),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 character long.' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Confirm password must be at least 8 character long.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type TSignUpCredentialsValidator = z.infer<typeof SignUpCredentialsValidator>

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>