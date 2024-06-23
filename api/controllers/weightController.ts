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
  const { period, month } = req.query;

  try {
    const db = await connectDB();
    let filter: any = { userid: parseInt(userid, 10) };

    if (period === '7days') {
      filter.date = { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) };
    } else if (period === 'month') {
      const today = new Date();
      filter.date = {
        $gte: new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate() + 1,
        ),
        $lte: today,
      };
    } else if (period === '6month') {
      const today = new Date();
      filter.date = {
        $gte: new Date(
          today.getFullYear(),
          today.getMonth() - 6,
          today.getDate() + 1,
        ),
        $lte: today,
      };
    } else if (period === 'year') {
      const today = new Date();
      filter.date = {
        $gte: new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate() + 1,
        ),
        $lte: today,
      };
    } else if (period === 'specific' && month) {
      const [year, monthValue] = (month as string).split('-').map(Number);
      const startDate = new Date(year, monthValue - 1, 1);
      const endDate = new Date(year, monthValue, 0);

      filter.date = { $gte: startDate, $lte: endDate };
    }

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
