import { Router } from 'express';
import { getLogs, addLogs } from '../controllers/logsController';

const router = Router();

router.get('/', getLogs);
router.post('/add', addLogs);

export default router;
