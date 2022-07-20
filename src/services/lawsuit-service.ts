import lawsuitRepository from '../repositories/lawsuit-repository.js';

async function getBalance(clientId: number | undefined, isActive: boolean | undefined) {
  const balance = await lawsuitRepository.getBalance(clientId, isActive);
  const formattedBalance = (balance / 100).toFixed(2).replace('.', ',');

  return { total: `R$ ${formattedBalance}` };
}

export default { getBalance };
