import lawsuitRepository from '../repositories/lawsuit-repository.js';

export type IsActiveFilter = 'all' | boolean;

async function getBalance(clientId: number, isActive: string) {
  let isActiveFilter : IsActiveFilter = 'all';

  if (isActive === 'false') {
    isActiveFilter = false;
  } else if (isActive === 'true') {
    isActiveFilter = true;
  }

  const balance = await lawsuitRepository.getBalance(clientId, isActiveFilter);
  const total = formatTotal(balance);

  return { total };
}

async function getAverage(companyId: number, state: string) {
  const average = await lawsuitRepository.getAverage(companyId, state);
  const total = formatTotal(average);
  return { total };
}

function formatTotal(total: number) {
  return `R$ ${(total / 100).toFixed(2).replace('.', ',')}`;
}

async function getLawsuitCount(minCharge: number) {
  const lawsuitCount = await lawsuitRepository.getCount(minCharge);
  return { lawsuitCount };
}

async function getLawsuits(initialism: string, startDate: string, endDate: string) {
  return lawsuitRepository.getAll(initialism, startDate, endDate);
}

export default { getBalance, getAverage, getLawsuitCount, getLawsuits };
