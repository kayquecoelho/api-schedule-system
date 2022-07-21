import clientsRepository from '../repositories/clients-repository.js';
import lawsuitRepository from '../repositories/lawsuit-repository.js';

async function getBalance(clientId: number, isActive: boolean) {
  const balance = await lawsuitRepository.getBalance(clientId, isActive);
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
