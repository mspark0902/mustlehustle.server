import { Router } from 'express';
import { getExercise, addExercise } from '../controllers/exerciseController';

const router = Router();

router.get('/', getExercise);
router.post('/add', addExercise);

export default router;
