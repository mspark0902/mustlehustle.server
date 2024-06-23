import { Router } from 'express';
import { connectDB } from '../../lib/db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('users');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
