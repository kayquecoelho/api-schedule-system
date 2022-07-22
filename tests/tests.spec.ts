import app from '../src/app.js';
import supertest from 'supertest';
import prisma from '../src/database.js';

const server = supertest(app);

describe('TESTS', () => {
  describe('GET/lawsuits/balance', () => {
    it('should return "R$ 1087000,00" as sum of all active lawsuits', async () => {
      const response = await server.get('/lawsuits/balance?isActive=true');

      expect(response.body.total).toEqual('R$ 1087000,00');
    });
  });

  describe('GET/lawsuits/average', () => {
    it('should return the average (R$ 110.000,00) of charge of all lawsuits which state is "Rio de Janeiro" from "empresa A"', async () => {
      const empresaA = await prisma.client.findFirst({ where: { name: 'Empresa A' } });
      const state = 'Rio de Janeiro';

      const response = await server.get(`/lawsuits/average?clientId=${empresaA.id}&state=${state}`);

      expect(response.body.total).toEqual('R$ 110000,00');
    });
  });

  describe('GET/lawsuits/count', () => {
    it('should the amount (2) of lawsuits with charge greater than R$ 100000,00"', async () => {
      const minCharge = '10000000';

      const response = await server.get(`/lawsuits/count?minCharge=${minCharge}`);

      expect(response.body.lawsuitCount).toEqual(2);
    });
  });

  describe('GET/lawsuits', () => {
    it('should return all lawsuits from September of 2007', async () => {
      const startDate = '01-09-2007';
      const endDate = '30-09-2007';

      const response = await server.get(`/lawsuits?startDate=${startDate}&endDate=${endDate}`);

      expect(response.body.length).toEqual(1);
      expect(response.body[0].initialism).toEqual('00010TRABAM');
    });

    it('should return all lawsuits which initialism contains "TRAB"', async () => {
      const initialism = 'TRAB';

      const { body } = await server.get(`/lawsuits?initialism=${initialism}`);

      expect(body.length).toEqual(2);
      expect(body[0].initialism).toEqual('00003TRABMG');
      expect(body[1].initialism).toEqual('00010TRABAM');
    });
  });

  describe('GET/clients', () => {
    it('should return all lawsuits that are located in the based state of each client', async () => {
      const onlyState = true;

      const { body } = await server.get(`/clients?onlyState=${onlyState}`);

      expect(body.length).toEqual(2);
      expect(body[0].cnpj).toEqual('00000000001');
      expect(body[0].state).toEqual('Rio de Janeiro');
      expect(body[0].Lawsuit.length).toEqual(2);
      expect(body[0].Lawsuit[0].initialism).toEqual('00001CIVELRJ');
      expect(body[0].Lawsuit[1].initialism).toEqual('00004CIVELRJ');
      expect(body[1].cnpj).toEqual('00000000002');
      expect(body[1].state).toEqual('São Paulo');
      expect(body[1].Lawsuit[0].initialism).toEqual('00008CIVELSP');
      expect(body[1].Lawsuit[1].initialism).toEqual('00009CIVELSP');
    });
  });
});
