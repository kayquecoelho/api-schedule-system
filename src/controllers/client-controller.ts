import { Request, Response } from 'express';
import clientService from '../services/client-service.js';

type ClientFilter = {
  onlyState: string | boolean;
};

async function getClients(req: Request, res: Response) {
  let { onlyState } = req.query as unknown as ClientFilter;

  if (onlyState === undefined || onlyState === 'true') {
    onlyState = true;
  } else {
    onlyState = false;
  }

  const clients = await clientService.getClients(onlyState);
  res.send(clients);
}

export default { getClients };
