import { Request, Response } from 'express';
import lawsuitService from '../services/lawsuit-service.js';

async function getLawsuitsBalance(req: Request, res: Response) {
  const clientId = req.query.clientId;
  const isActive = req.query.isActive as unknown;

  if (isActive !== undefined && typeof isActive !== 'boolean') {
    return res.sendStatus(400);
  }

  if (clientId !== undefined && isNaN(+clientId)) {
    return res.sendStatus(400);
  }

  const balance = await lawsuitService.getBalance(+clientId, isActive);
  res.send(balance);
}

export default {
  getLawsuitsBalance,
};
