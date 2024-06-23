import { Router } from 'express';
import usersRoute from './users';
import routinesRoute from './routines';
import exerciseRoute from './exercise';
import LogsRoute from './logs';

const router = Router();

router.use('/users', usersRoute);
router.use('/routines', routinesRoute);
router.use('/exercise', exerciseRoute);
router.use('/logs', LogsRoute);

export default router;
