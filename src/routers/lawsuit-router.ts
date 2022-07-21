import { Router } from 'express';
import lawsuitController from '../controllers/lawsuit-controller.js';

const lawsuitRouter = Router();

lawsuitRouter.get('/balance', lawsuitController.getLawsuitsBalance);
lawsuitRouter.get('/average', lawsuitController.getAverage);
lawsuitRouter.get('/count', lawsuitController.getLawsuitCount);
lawsuitRouter.get('/', lawsuitController.getLawsuits);

export default lawsuitRouter;
