import prisma from '../database.js';

async function getGroupedByClient() {
  return prisma.client.findMany({
    orderBy: {
      cnpj: 'asc'
    },
    include: {
      Lawsuit: {
        orderBy: {
          initialism: 'asc'
        },
      },
    },
  });
}

export default {
  getGroupedByClient,
};
