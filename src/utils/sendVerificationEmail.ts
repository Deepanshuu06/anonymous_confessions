import { resend } from '@/lib/resend';
import VerificationEmail from '../../emails/verificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Anonymous Confessions || Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: 'Verification email sent successfully',
    };
  } catch (emailError) {
    console.error('Error in sending the email', emailError);
    return {
      success: false,
      message: 'Failed to send the verification email',
    };
  }
}
