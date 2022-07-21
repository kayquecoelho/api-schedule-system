import { Router } from 'express';
import clientController from '../controllers/client-controller.js';

const clientRouter = Router();

clientRouter.get('', clientController.getClients);

export default clientRouter;