import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(utc);
dayjs.extend(customParseFormat)
const prisma = new PrismaClient();

async function main() {
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
      createdAt: dayjs('10-10-2007', 'DD-MM-YYYY').utc().format(),
      charge: 20000000,
      state: 'Rio de Janeiro',
      clientId: empresaA.id,
    },
    {
      initialism: '00002CIVELSP',
      isActive: true,
      createdAt: dayjs('20-10-2007', 'DD-MM-YYYY').utc().format(),
      charge: 10000000,
      state: 'São Paulo',
      clientId: empresaA.id,
    },
    {
      initialism: '00003TRABMJ',
      isActive: false,
      createdAt: dayjs('30-10-2007', 'DD-MM-YYYY').utc().format(),
      charge: 1000000,
      state: 'Minas Gerais',
      clientId: empresaA.id,
    },
    {
      initialism: '00004CIVELRJ',
      isActive: false,
      createdAt: dayjs('10-11-2007', 'DD-MM-YYYY').utc().format(),
      charge: 2000000,
      state: 'Rio de Janeiro',
      clientId: empresaA.id,
    },
    {
      initialism: '00005CIVELSP',
      isActive: true,
      createdAt: dayjs('15-11-2007', 'DD-MM-YYYY').utc().format(),
      charge: 3500000,
      state: 'São Paulo',
      clientId: empresaA.id,
    },
  ];

  const lawsuitsB = [
    {
      initialism: '00006CIVELRJ',
      isActive: true,
      createdAt: dayjs('01-05-2007', 'DD-MM-YYYY').utc().format(),
      charge: 2000000,
      state: 'Rio de Janeiro',
      clientId: empresaB.id,
    },
    {
      initialism: '00007CIVELRJ',
      isActive: true,
      createdAt: dayjs('02-06-2007', 'DD-MM-YYYY').utc().format(),
      charge: 70000000,
      state: 'Rio de Janeiro',
      clientId: empresaB.id,
    },
    {
      initialism: '00008CIVELSP',
      isActive: false,
      createdAt: dayjs('03-07-2007', 'DD-MM-YYYY').utc().format(),
      charge: 50000,
      state: 'São Paulo',
      clientId: empresaB.id,
    },
    {
      initialism: '00009CIVELSP',
      isActive: true,
      createdAt: dayjs('04-08-2007', 'DD-MM-YYYY').utc().format(),
      charge: 3200000,
      state: 'São Paulo',
      clientId: empresaB.id,
    },
    {
      initialism: '00010TRABAM',
      isActive: false,
      createdAt: dayjs('05-09-2007', 'DD-MM-YYYY').utc().format(),
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
