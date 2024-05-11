import { z } from 'zod';

export const verificationCodeValidation = z.string().length(7, "Verification code must be 7 digit")

export const verifySchema = z.object({
  code: verificationCodeValidation,
});
