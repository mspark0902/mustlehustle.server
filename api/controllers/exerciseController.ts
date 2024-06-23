import { Request, Response } from 'express';
import { connectDB } from '../../lib/db';

const collection = 'exercise';

export const getExercise = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const users = await db.collection(collection).find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addExercise = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const data = req.body;
    const result = await db.collection(collection).insertOne(data);
    res
      .status(201)
      .json({ message: 'Exercise added successfully', data: result });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
