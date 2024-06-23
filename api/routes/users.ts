import { Router } from 'express';
import { getUserInfo } from '../controllers/userController';
import { getUserWeights, logWeight } from '../controllers/weightController';

const router = Router();

router.get('/', getUserInfo);
router.post('/logweight', logWeight);
router.get('/weights/:userid', getUserWeights);

export default router;
