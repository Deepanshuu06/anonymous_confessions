import { UserModel } from '@/model/User.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import dbConnect from '@/lib/dbConnect';
import { User } from 'next-auth';

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: 'Not Authenticated',
      },
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
      return Response.json(
        {
          success: false,
          message: 'Failed to update user status message to accept message',
        },
        {
          status: 400,
        },
      );
    }
    return Response.json(
      {
        success: true,
        message: 'message acceptance status updated successfully',
        updatedUser,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log('Failed to update user status message to accept message');

    return Response.json(
      {
        success: false,
        message: 'Failed to update user status message to accept message',
      },
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
    return Response.json(
      {
        success: false,
        message: 'Not Authenticated',
      },
      {
        status: 401,
      },
    );
  }

  const userID = user._id;

  try {
    const foundUser = await UserModel.findById(userID);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: 'User Not Found',
        },
        {
          status: 404,
        },
      );
    }
    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log('failed to get the user message acceptance status');

    return Response.json(
      {
        success: false,
        message: 'failed to get the user message acceptance status',
      },
      {
        status: 500,
      },
    );
  }
}
