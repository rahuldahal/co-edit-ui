import { z } from 'zod';
import { messages } from '@/constants/messages';
import { ALPHA, ALPHANUMERIC_UNDERSCORES } from '@/constants/regex';

export const signupSchema = z.object({
  username: z
    .string()
    .min(
      3,
      messages.length({ field: 'Username', condition: 'at least', length: 3 }),
    )
    .max(
      15,
      messages.length({ field: 'Username', condition: 'at most', length: 15 }),
    )
    .regex(
      ALPHANUMERIC_UNDERSCORES,
      messages.regex.alphanumeric_underscores('Username'),
    ),
  password: z
    .string()
    .min(
      6,
      messages.length({ field: 'Password', condition: 'at least', length: 6 }),
    ),
  firstname: z
    .string()
    .regex(ALPHA, messages.regex.alpha('Firstname'))
    .optional(),
  lastname: z
    .string()
    .regex(ALPHA, messages.regex.alpha('Lastname'))
    .optional(),
});
