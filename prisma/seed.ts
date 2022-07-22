import { PrismaClient } from '@prisma/client';
import formatDate from '../src/utils/formatDate.js';
const prisma = new PrismaClient();

export default async function seedDatabase() {
  const empresaB = await prisma.client.upsert({
    where: {
      cnpj: '00000000002',
    },
    create: {
      name: 'Empresa B',
      cnpj: '00000000002',
      state: 'São Paulo',
    },
    update: {},
  });

  const empresaA = await prisma.client.upsert({
    where: {
      cnpj: '00000000001',
    },
    create: {
      name: 'Empresa A',
      cnpj: '00000000001',
      state: 'Rio de Janeiro',
    },
    update: {},
  });
  
  const lawsuitsA = [
    {
      initialism: '00001CIVELRJ',
      isActive: true,
      createdAt: formatDate('10-10-2007'),
      charge: 20000000,
      state: 'Rio de Janeiro',
      clientId: empresaA.id,
    },
    {
      initialism: '00002CIVELSP',
      isActive: true,
      createdAt: formatDate('20-10-2007'),
      charge: 10000000,
      state: 'São Paulo',
      clientId: empresaA.id,
    },
    {
      initialism: '00003TRABMG',
      isActive: false,
      createdAt: formatDate('30-10-2007'),
      charge: 1000000,
      state: 'Minas Gerais',
      clientId: empresaA.id,
    },
    {
      initialism: '00004CIVELRJ',
      isActive: false,
      createdAt: formatDate('10-11-2007'),
      charge: 2000000,
      state: 'Rio de Janeiro',
      clientId: empresaA.id,
    },
    {
      initialism: '00005CIVELSP',
      isActive: true,
      createdAt: formatDate('15-11-2007'),
      charge: 3500000,
      state: 'São Paulo',
      clientId: empresaA.id,
    },
  ];

  const lawsuitsB = [
    {
      initialism: '00006CIVELRJ',
      isActive: true,
      createdAt: formatDate('01-05-2007'),
      charge: 2000000,
      state: 'Rio de Janeiro',
      clientId: empresaB.id,
    },
    {
      initialism: '00007CIVELRJ',
      isActive: true,
      createdAt: formatDate('02-06-2007'),
      charge: 70000000,
      state: 'Rio de Janeiro',
      clientId: empresaB.id,
    },
    {
      initialism: '00008CIVELSP',
      isActive: false,
      createdAt: formatDate('03-07-2007'),
      charge: 50000,
      state: 'São Paulo',
      clientId: empresaB.id,
    },
    {
      initialism: '00009CIVELSP',
      isActive: true,
      createdAt: formatDate('04-08-2007'),
      charge: 3200000,
      state: 'São Paulo',
      clientId: empresaB.id,
    },
    {
      initialism: '00010TRABAM',
      isActive: false,
      createdAt: formatDate('05-09-2007'),
      charge: 100000,
      state: 'Amazonas',
      clientId: empresaB.id,
    },
  ];
  
  const lawsuits = await prisma.lawsuit.createMany({
    data: [...lawsuitsA, ...lawsuitsB]
  });

  console.log(lawsuits, empresaA, empresaB);
}

seedDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
