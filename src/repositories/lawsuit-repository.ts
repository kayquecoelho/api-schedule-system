import { Prisma } from '@prisma/client';
import prisma from '../database.js';

async function getBalance(clientId: number | undefined, isActive: boolean | undefined) {
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

export default {
  getBalance,
};
