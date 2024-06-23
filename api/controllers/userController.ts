import { Request, Response } from 'express';
import { connectDB } from '../../lib/db';

const weightCollection = 'weight';
const usersCollection = 'users';

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const users = await db.collection(usersCollection).find({}).toArray();
    const userIds = users.map((user: any) => user.userid);

    const logs = await db
      .collection(weightCollection)
      .aggregate([
        { $match: { userid: { $in: userIds } } }, // Match weights for users in the Users collection
        { $sort: { userid: 1, date: -1 } }, // Sort by userid and date in descending order
        {
          $group: {
            _id: '$userid',
            weight: { $first: '$weight' }, // Get the first (latest) weight for each userid
            date: { $first: '$date' }, // Get the date of the first (latest) weight
          },
        },
        { $project: { _id: 0, userid: '$_id', weight: 1, date: 1 } }, // Project fields as required
      ])
      .toArray();

    const userInfo = users.map((user: any) => {
      const currentUserLog = logs.find(
        (log: any) => log.userid === user.userid,
      );
      return {
        userid: user.userid,
        name: user.name,
        height: user.height,
        weight: currentUserLog ? currentUserLog.weight : null,
      };
    });

    res.json(userInfo);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
