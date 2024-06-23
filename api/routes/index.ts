import { Router } from 'express';
import usersRoute from './users';
import routinesRoute from './routines';

const router = Router();

router.use('/users', usersRoute);
router.use('/routines', routinesRoute);

export default router;
