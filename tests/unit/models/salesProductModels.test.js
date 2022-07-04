const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesProductModel = require('../../../models/salesProductModel');

describe('Testa a função create da camada salesProductModel', () => {

  describe('Caso dê tudo certo com a criação', () => {

    beforeEach(() => {
      sinon
        .stub(connection, "query")
        .resolves([3, 1, 1 ]);
    });
    
    afterEach(() => {
      connection.query.restore();
    });

    it('Deve retornar um array', async () => {
      const data = await salesProductModel.create({
        id: 3,
        productId: 1,
        quantity: 1,
      });
      
      expect(data).to.be.an('array');
    });
  });
});