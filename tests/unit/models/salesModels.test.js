const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModels = require('../../../models/salesModel');

const CREATED_RESPONSE = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 1,
  info: "",
  serverStatus: 2,
  warningStatus: 0,
};

describe('Testa a função create da camada salesModels', () => {
  describe('Se a criação for bem sucedida', () => {
    
    before(() => {
      sinon.stub(connection, 'query').resolves([CREATED_RESPONSE]);
    })

    afterEach(() => {
      connection.query.restore();
    })

    it('Retorna o id do item inserido', async () => {
      const data = await salesModels.create();

      expect(data).to.be.a('number');
    })

  })
})
describe('Testa a função getAll da camada salesModels', () => {
  describe("Se não encontrar nenhum dado no DB", () => {
    
    beforeEach(() => {
      sinon.stub(connection, 'query').resolves([[]]);
    });

    afterEach(() => {
      connection.query.restore();
    });

    it('retorna um array vazio', async () => {
      const data = await salesModels.getAll();
  
      expect(data).to.be.an('array');
    })
  });
})