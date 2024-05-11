import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/model/usermodel';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/utils/sendVerificationEmail';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { username, email, password, name } = await request.json();
    const existingUserVerifiedUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedUsername) {
      return Response.json(
        {
          success: false,
          message: 'username is already taken',
        },
        {
          status: 400,
        },
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: 'User with this email is already registered and verified',
          },
          {
            status: 400,
          },
        );
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verifyUserOTP = Math.floor(1000000 + Math.random() * 9000000).toString();
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        name,
        username,
        email,
        password: hashedPassword,
        verifyCode: verifyUserOTP,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();

      // Send verification email
      const emailResponse = await sendVerificationEmail(email, username, verifyUserOTP);

      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message,
          },
          {
            status: 500,
          },
        );
      }

      return Response.json(
        {
          success: true,
          message: 'User registered successfully. Please verify your email.',
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error('Error Registering User ', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      {
        status: 500,
      },
    );
  }
}
