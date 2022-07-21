import prisma from '../database.js';

async function getGroupedByClient() {
  return prisma.client.findMany({
    include: {
      Lawsuit: true,
    },
  });
}

export default {
  getGroupedByClient,
};
