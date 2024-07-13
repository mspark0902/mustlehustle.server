import { Request, Response } from 'express';
import { connectDB } from '../../lib/db';

const weightCollection = 'weight';

export const logWeight = async (req: Request, res: Response) => {
  const { userid, weight } = req.body;

  try {
    const db = await connectDB();
    const result = await db.collection(weightCollection).insertOne({
      userid,
      weight,
      date: new Date(),
    });
    res
      .status(201)
      .json({ message: 'Weight logged successfully', data: result });
  } catch (error) {
    console.error('Error logging weight:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserWeights = async (req: Request, res: Response) => {
  const { userid } = req.params;

  try {
    const db = await connectDB();
    let filter: any = { userid: parseInt(userid, 10) };

    const weights = await db
      .collection(weightCollection)
      .find(filter)
      .sort({ date: -1 })
      .toArray();

    res.json(weights);
  } catch (error) {
    console.error('Error fetching user weights:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
