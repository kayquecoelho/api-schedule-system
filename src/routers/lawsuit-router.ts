import { Router } from 'express';
import lawsuitController from '../controllers/lawsuit-controller.js';

const lawsuitRouter = Router();

lawsuitRouter.get('/balance', lawsuitController.getLawsuitsBalance);
lawsuitRouter.get('/average', lawsuitController.getAverage);

export default lawsuitRouter;
