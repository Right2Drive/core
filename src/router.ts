import { Router } from 'express';

import authentication from '@/controllers/authentication';

const router = Router();

// Setup controllers
router.use('/authentication', authentication);

export default router;
