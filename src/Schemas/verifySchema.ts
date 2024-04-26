import { z } from 'zod';

export const verificationCodeValidation = z.string().length(6, "Verification code must be 6 digit")

export const verifySchema = z.object({
  code: verificationCodeValidation,
});