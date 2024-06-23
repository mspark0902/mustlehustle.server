import { Router } from 'express';
import usersRoute from './users';
import routinesRoute from './routines';
import exerciseRoute from './exercise';

const router = Router();

router.use('/users', usersRoute);
router.use('/routines', routinesRoute);
router.use('/exercise', exerciseRoute);

export default router;
