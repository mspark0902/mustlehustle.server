import { Router } from 'express';
import {
  addRoutines,
  assignRoutine,
  deleteRoutine,
  editRoutine,
  getRoutines,
} from '../controllers/routinesController';

const router = Router();

router.get('/', getRoutines);
router.post('/add', addRoutines);
router.post('/edit', editRoutine);
router.delete('/delete/:userId/:routineId', deleteRoutine);
router.post('/assign', assignRoutine);

export default router;
