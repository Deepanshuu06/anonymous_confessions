import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/model/user.model';
import { Message } from '@/model/user.model';

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: 'user not exist',
        },
        {
          status: 404,
        },
      );
    }
    //is user accepting messages
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: 'user is not accepting the message',
        },
        {
          status: 404,
        },
      );
    }
    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: 'message send successfully',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log('failed to send the messages', error);

    return Response.json(
      {
        success: false,
        message: 'failed to send the messages',
      },
      {
        status: 500,
      },
    );
  }
}
