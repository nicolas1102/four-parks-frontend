import { z } from 'zod'

export const CreateManagerValidator = z.object({
  email: z.string().email({ message: 'Dirección de email invalida.' }),
  firstName: z.string().min(1, { message: 'Este campo es necesario.' }),
  secondName: z.string(),
  firstLastname: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  secondLastname: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  parking: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
});

export type TCreateManagerValidator = z.infer<typeof CreateManagerValidator>