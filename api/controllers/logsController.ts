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
      .sort({ date: -1 })
      .toArray();
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getDateOnly = (isoDateString: string): string => {
  // Convert ISO date to just the date part (e.g., "2024-07-26")
  return isoDateString.split('T')[0];
};

export const addLogs = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const data = req.body;

    const dateOnly = getDateOnly(data.date);

    // Check if a log with the same date and userId already exists
    const existingLog = await db.collection('logs').findOne({
      date: { $regex: `^${dateOnly}` },
      userId: data.userId,
    });

    let result;

    if (existingLog) {
      // Update the existing log
      result = await db
        .collection('logs')
        .updateOne(
          { date: { $regex: `^${dateOnly}` }, userId: data.userId },
          { $set: data },
        );

      if (result.acknowledged) {
        res.status(200).json({ message: 'Log updated successfully', data });
      } else {
        res.status(500).json({ error: 'Failed to update the log' });
      }
    } else {
      // Insert a new log
      result = await db.collection('logs').insertOne(data);
      console.log(result);
      if (result.acknowledged) {
        res.status(201).json({ message: 'Log added successfully', data });
      } else {
        res.status(500).json({ error: 'Failed to add the log' });
      }
    }
  } catch (error) {
    console.error('Error handling log request:', error);

    // Ensure only one response is sent
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
