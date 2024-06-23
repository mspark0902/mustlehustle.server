import { Request, Response } from 'express';
import { connectDB } from '../../lib/db';
import { ObjectId } from 'mongodb';

const collection = 'routines';
const exercisesCollection = 'exercise';

export const getRoutines = async (req: Request, res: Response) => {
  try {
    const { userid } = req.query;
    const db = await connectDB();
    const routines = await db
      .collection(collection)
      .aggregate([
        { $match: { userId: Number(userid) } },
        { $unwind: '$exercises' },
        {
          $lookup: {
            from: exercisesCollection,
            localField: 'exercises.exerciseId',
            foreignField: 'id',
            as: 'exerciseDetails',
          },
        },
        { $unwind: '$exerciseDetails' },
        {
          $addFields: {
            'exercises.images': '$exerciseDetails.images',
          },
        },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            userId: { $first: '$userId' },
            exercises: { $push: '$exercises' },
          },
        },
      ])
      .toArray();

    res.json(routines);
  } catch (error) {
    console.error('Error retrieving routines:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addRoutines = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const db = await connectDB();
    const result = await db.collection(collection).insertOne(data);
    res
      .status(201)
      .json({ message: 'Routine added successfully', data: result });
  } catch (error) {
    console.error('Error logging weight:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const editRoutine = async (req: Request, res: Response) => {
  try {
    const { routineId, userId, routine } = req.body;

    const routineObjectId = new ObjectId(routineId as string);

    const db = await connectDB();
    const result = await db
      .collection(collection)
      .updateOne({ _id: routineObjectId, userId: userId }, { $set: routine });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res
      .status(200)
      .json({ message: 'Routine updated successfully', data: result });
  } catch (error) {
    console.error('Error logging weight:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteRoutine = async (req: Request, res: Response) => {
  try {
    const { routineId, userId } = req.body;

    const routineObjectId = new ObjectId(routineId as string);

    const db = await connectDB();
    const result = await db
      .collection(collection)
      .deleteOne({ _id: routineObjectId, userId: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    res
      .status(200)
      .json({ message: 'Routine deleted successfully', data: result });
  } catch (error) {
    console.error('Error deleting routine:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const assignRoutine = async (req: Request, res: Response) => {
  try {
    const { routineId, userId, newUserId } = req.body;

    const db = await connectDB();

    const routineObjectId = new ObjectId(routineId as string);

    const routine = await db
      .collection(collection)
      .findOne({ _id: routineObjectId, userId: userId });

    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    const newRoutine = { ...routine, userId: newUserId };
    delete newRoutine._id;

    const result = await db.collection(collection).insertOne(newRoutine);

    res
      .status(201)
      .json({ message: 'Routine assigned successfully', data: result });
  } catch (error) {
    console.error('Error deleting routine:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
