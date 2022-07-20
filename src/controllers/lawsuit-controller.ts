import { Request, Response } from 'express';
import lawsuitService from '../services/lawsuit-service.js';

type BalanceFilters = {
  clientId: number | undefined;
  isActive: boolean | undefined;
};

async function getLawsuitsBalance(req: Request, res: Response) {
  const { clientId, isActive } = req.query as unknown as BalanceFilters;

  if (isActive !== undefined && typeof isActive !== 'boolean') {
    return res.sendStatus(400);
  }

  if (clientId !== undefined && isNaN(+clientId)) {
    return res.sendStatus(400);
  }

  const balance = await lawsuitService.getBalance(+clientId, isActive);
  res.send(balance);
}

type AverageFilters = {
  companyId: number;
  state: string;
};

async function getAverage(req: Request, res: Response) {
  const { companyId, state } = req.query as unknown as AverageFilters;

  if (companyId !== undefined && isNaN(+companyId)) {
    return res.sendStatus(400);
  }

  if (state !== undefined && typeof state !== 'string') {
    return res.sendStatus(400);
  }

  const average = await lawsuitService.getAverage(+companyId, state);

  res.send(average);
}

export default {
  getLawsuitsBalance,
  getAverage,
};
