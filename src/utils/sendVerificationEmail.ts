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
      from: 'you@example.com',
      to: email,
      subject: 'Anonymous Confessions || Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: 'verification email send successfullly',
    };
  } catch (emailError) {
    console.error('Error in sending the email', emailError);
    return {
      success: false,
      message: 'faild to send the  verification email email',
    };
  }
}
