import { Request, Response } from 'express';
import { connectDB } from '../../lib/db';

const collection = 'logs';

export const getLogs = async (req: Request, res: Response) => {
  try {
    const { userid } = req.query;
    const db = await connectDB();
    const logs = await db
      .collection(collection)
      .find({ userId: Number(userid) })
      .toArray();
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addLogs = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const data = req.body;
    const result = await db.collection(collection).insertOne(data);
    res.status(201).json({ message: 'Logs added successfully', data: result });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
