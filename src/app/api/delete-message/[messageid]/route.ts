import { UserModel } from '@/model/usermodel';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import dbConnect from '@/lib/dbConnect';
import { User } from 'next-auth';

export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {
  const messageId = params.messageid;
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
  try {
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } },
    );
    if (updateResult.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: 'message is not found or already deleted',
        },
        {
          status: 400,
        },
      );
    }
    
    return Response.json(
        {
          success: true,
          message: 'message delete successfully',
        },
        {
          status: 200,
        },
      );
  } catch (error) {

    return Response.json(
        {
          success: false,
          message: 'Error in deleting message',
        },
        {
          status: 500,
        },
      );

  }
}