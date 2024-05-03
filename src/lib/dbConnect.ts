import mongoose from 'mongoose';

let isConnected = false;

async function dbConnect(): Promise<void> {
  if (isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('DB Connected Successfully');
  } catch (error) {
    console.error('DB Connection Failed:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export default dbConnect;
