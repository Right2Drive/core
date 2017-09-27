import { Router } from 'express';

import authentication from '@/routers/authentication';

const router = Router();
const apiRouter = Router();

// Setup authentication
router.use('/authentication', authentication);

// Setup API routes
router.use('/api', apiRouter);

export default router;
