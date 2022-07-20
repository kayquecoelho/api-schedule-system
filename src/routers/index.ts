import { Router } from 'express';
import lawsuitRouter from './lawsuit-router.js';

const router = Router();

router.use('/lawsuits', lawsuitRouter);

export default router;
