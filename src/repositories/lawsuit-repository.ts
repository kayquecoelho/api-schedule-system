import { Prisma } from '@prisma/client';
import formatDate from '../utils/formatDate.js';
import prisma from '../database.js';
import { IsActiveFilter } from 'src/services/lawsuit-service.js';

async function getBalance(clientId: number, isActive: IsActiveFilter): Promise<number> {
  const filter = getBalanceFilter(clientId, isActive);

  const balance = await prisma.lawsuit.aggregate({
    where: filter,
    _sum: {
      charge: true,
    },
  });

  return balance._sum.charge;
}

function getBalanceFilter(clientId: number, isActive: IsActiveFilter): Prisma.LawsuitWhereInput {
  const filter = {};

  if (!isNaN(clientId)) {
    filter['clientId'] = clientId;
  }
  
  if (isActive !== 'all') {
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

async function getCount(minCharge: number): Promise<number> {
  const lawsuitCount = await prisma.lawsuit.count({
    where: {
      charge: {
        gt: minCharge,
      },
    },
  });
  return lawsuitCount;
}

async function getAll(initialism: string, startDate: string, endDate: string) {
  const filter = lawsuitFilter(initialism, startDate, endDate);
  return prisma.lawsuit.findMany({
    orderBy: {
      initialism: 'asc'
    },
    where: {
      ...filter,
    },
  });
}

function lawsuitFilter(initialism: string, startDate: string, endDate: string): Prisma.LawsuitWhereInput {
  const filter = [];

  if (initialism) {
    filter.push({ initialism: { contains: initialism } });
  }

  if (startDate) {
    filter.push({ createdAt: { gte: formatDate(startDate) } });
  }

  if (endDate) {
    filter.push({ createdAt: { lte: formatDate(endDate) } });
  }

  return { AND: filter };
}

export default {
  getBalance,
  getAverage,
  getCount,
  getAll,
};
