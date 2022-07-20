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

export default { getBalance, getAverage };
