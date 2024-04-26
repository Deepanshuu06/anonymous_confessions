import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log('already connected to database');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
    console.log("log DB ----- ",db);
    connection.isConnected = db.connections[0].readyState;
    console.log("log DB Connctions ----- ",db.connections[0]);
    console.log('DB Connected Sucessfully');
  } catch (error) {
    console.log('DB connection Faild', error);

    process.exit();
  }
}

export default dbConnect;
