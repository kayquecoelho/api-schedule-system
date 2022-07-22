import { Request, Response } from 'express';
import lawsuitService from '../services/lawsuit-service.js';

type BalanceFilters = {
  clientId: string;
  isActive: string;
};

async function getLawsuitsBalance(req: Request, res: Response) {
  let { clientId, isActive } = req.query as unknown as BalanceFilters;

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

async function getLawsuitCount(req: Request, res: Response) {
  const minCharge = +req.query.minCharge;

  if (isNaN(minCharge)) {
    return res.sendStatus(400);
  }

  const lawsuitCount = await lawsuitService.getLawsuitCount(minCharge);

  return lawsuitCount;
}

type LawsuitFilters = {
  initialism: string;
  startDate: string;
  endDate: string;
};

async function getLawsuits(req: Request, res: Response) {
  const { initialism, startDate, endDate } = req.query as unknown as LawsuitFilters;

  const dateSchema = /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/;
  if (
    (startDate && !dateSchema.test(startDate)) ||
    (endDate && !dateSchema.test(endDate))
  )
    return res.sendStatus(400);

  const lawsuits = await lawsuitService.getLawsuits(initialism, startDate, endDate);

  res.send(lawsuits);
}

export default {
  getLawsuitsBalance,
  getAverage,
  getLawsuitCount,
  getLawsuits,
};
