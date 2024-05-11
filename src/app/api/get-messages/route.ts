import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { UserModel } from '@/model/usermodel';

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const userId = new mongoose.Types.ObjectId(user._id);
    const userMessages = await UserModel.aggregate([
      { $match: { _id: userId } }, // Match the user by ID
      { $unwind: '$messages' }, // Deconstruct the messages array
      { $sort: { 'messages.createdAt': -1 } }, // Sort messages by createdAt in descending order
      { $group: { _id: '$_id', messages: { $push: '$messages' } } }, // Group messages by user ID
    ]);

    if (!userMessages || userMessages.length === 0) {
      return Response.json(
        { message: 'No messages found for the user', success: true },
        { status: 200 },
      );
    }

    return Response.json({ messages: userMessages[0].messages }, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return Response.json({ message: 'Internal server error', success: false }, { status: 500 });
  }
}
