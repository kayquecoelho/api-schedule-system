import { Router } from 'express';
import clientRouter from './client-router.js';
import lawsuitRouter from './lawsuit-router.js';

const router = Router();

router.use('/lawsuits', lawsuitRouter);
router.use('/clients', clientRouter);

export default router;
