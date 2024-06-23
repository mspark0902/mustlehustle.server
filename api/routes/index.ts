import { Router } from 'express';
import usersRoute from './users';

const router = Router();

router.use('/users', usersRoute);

export default router;
