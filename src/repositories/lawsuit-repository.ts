import { Prisma } from '@prisma/client';
import prisma from '../database.js';

async function getBalance(clientId: number, isActive: boolean): Promise<number> {
  const filter = getBalanceFilter(clientId, isActive);

  const balance = await prisma.lawsuit.aggregate({
    where: filter,
    _sum: {
      charge: true,
    },
  });

  return balance._sum.charge;
}

function getBalanceFilter(clientId: number, isActive: boolean): Prisma.LawsuitWhereInput {
  const filter = {};

  if (!isNaN(clientId)) {
    filter['clientId'] = clientId;
  }
  if (isActive !== undefined) {
    filter['isActive'] = isActive;
  }
  return filter;
}

async function getAverage(clientId: number, state: string): Promise<number> {
  const filter = getAverageFilter(clientId, state);

  const average = await prisma.lawsuit.aggregate({
    where: filter,
    _avg: {
      charge: true,
    },
  });

  return average._avg.charge;
}

function getAverageFilter(clientId: number, state: string): Prisma.LawsuitWhereInput {
  const filter = {};

  if (!isNaN(clientId)) {
    filter['clientId'] = clientId;
  }
  if (state) {
    filter['state'] = state;
  }

  return filter;
}

export default {
  getBalance,
  getAverage,
};
