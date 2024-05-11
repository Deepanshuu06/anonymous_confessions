

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import dbConnect from '@/lib/dbConnect';
import { User } from 'next-auth';
import { UserModel } from '@/model/user.model';


export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Not Authenticated',
      }),
      {
        status: 401,
      },
    );
  }

  const userID = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      {
        isAcceptingMessage: acceptMessages,
      },
      {
        new: true,
      },
    );

    if (!updatedUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Failed to update user status message to accept message',
        }),
        {
          status: 400,
        },
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: 'message acceptance status updated successfully',
        updatedUser,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log('Failed to update user status message to accept message');

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to update user status message to accept message',
      }),
      {
        status: 500,
      },
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Not Authenticated',
      }),
      {
        status: 401,
      },
    );
  }

  const userID = user._id;

  try {
    const foundUser = await UserModel.findById(userID);

    if (!foundUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'User Not Found',
        }),
        {
          status: 404,
        },
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log('failed to get the user message acceptance status');

    return new Response(
      JSON.stringify({
        success: false,
        message: 'failed to get the user message acceptance status',
      }),
      {
        status: 500,
      },
    );
  }
}
