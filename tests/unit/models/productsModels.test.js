const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

const PRODUCTS_MOCK = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

describe('Testa a camada models', () => {
  describe('Testa a função getAll', () => {
    describe("Quando não encontra nenhum produto no DB", () => {
       beforeEach(() => {
         sinon.stub(connection, "query").resolves([[]]);
       });

       afterEach(() => {
         connection.query.restore();
       });

       it("Retorna um array vazio", async () => {
         const result = await productsModel.getAll();
         expect(result).to.have.lengthOf(0);
       });
    });
    
    describe('Quando encontra produtos no DB', () => {
       beforeEach(() => {
         sinon.stub(connection, "query").resolves([PRODUCTS_MOCK]);
       });

       afterEach(() => {
         connection.query.restore();
       });
      it('Retorna um array de objetos', async () => {
        const result = await productsModel.getAll();
        expect(result).to.be.deep.equal(PRODUCTS_MOCK);
      })
    })
  })
})