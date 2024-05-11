import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/model/User.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

// Secret key for JWT
const secretKey = 'mklwqrelwnfo3843nkjnq5';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to the database
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { identifier, password } = req.body;

  // Validate identifier and password
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Identifier and password are required' });
  }

  try {
    // Find user by email or username
    const user = await UserModel.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifier.toLowerCase() }],
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    // Send token to client
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
