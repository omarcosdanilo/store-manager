const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const connection = require('../../../models/connection');
const salesProductModel = require('../../../models/salesProductModel');

chai.use(chaiAsPromised);

describe('Testa a função create da salesProductModel', () => {

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

describe('Testa a função update da salesProductModel', () => {

  describe('A função update', () => {

    afterEach(() => {
      sinon.restore();
    });

    it('Deve retornar um erro caso dê problema no DB', () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(salesProductModel.update(1, 1, 10)).to.be.eventually.rejected;
    });

    it('Deve atualizar caso não dê problema no DB', () => {
      sinon.stub(connection, 'query').resolves();
      chai.expect(salesProductModel.update(1, 1, 10)).to.be.eventually.ok;
    });
  });
});