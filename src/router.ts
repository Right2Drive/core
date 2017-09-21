import { Router } from 'express';

import authentication from '@/routers/authentication';

const router = Router();

// Setup controllers
router.use('/authentication', authentication);

export default router;
