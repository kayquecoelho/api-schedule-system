import clientsRepository from "../repositories/clients-repository.js";

async function getClients(onlyState: boolean) {
  const clients = await clientsRepository.getGroupedByClient();

  if (onlyState) {
    return clients.map((client) => {
      const validLawsuits = client.Lawsuit.filter((lawsuit) => lawsuit.state === client.state);
      return { ...client, Lawsuit: validLawsuits };
    });
  } 

  return clients;
}

export default { getClients };