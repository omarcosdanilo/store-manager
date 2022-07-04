const { expect } = require("chai");
const sinon = require("sinon");
const salesModel = require('../../../models/salesModel');
const salesProductModel = require("../../../models/salesProductModel");
const salesService = require("../../../services/salesServices");

const CREATED_RESPONSE = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 1,
  info: "",
  serverStatus: 2,
  warningStatus: 0,
};

const SALES_MOCK = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

describe('Testa a função create da camada salesServices', () => {
  describe("Se a criação for bem sucedida", () => {

     before(() => {
       sinon.stub(salesModel, "create").resolves(CREATED_RESPONSE);
       sinon
         .stub(salesProductModel, "create")
         .resolves({ id: 1, productId: 1, quantity: 1 });
     });

     afterEach(() => {
       salesModel.create.restore();
       salesProductModel.create.restore();
     });

    it('Retorna um objeto com informações item criado', async () => {
      const data = await salesService.create(SALES_MOCK);

      expect(data).to.be.an('object');
    });
  });
})