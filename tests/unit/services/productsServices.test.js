const { expect } = require("chai");
const sinon = require("sinon");
const productsServices = require('../../../services/productsService');
const productsModel = require("../../../models/productsModel");
const PRODUCTS_MOCK = require("../../../mocks/productsMock");

describe('Testa a camada productServices', () => {
  describe('Testa a função getAll', () => {
    describe('Quando não retorna nenhum produto da camada de productsModels', () => {

      beforeEach(() => {
        sinon.stub(productsModel, "getAll").resolves([]);
      });

      afterEach(() => {
        productsModel.getAll.restore();
      });

      it('Retorna um array vazio', async () => {
        const result = await productsServices.getAll();
        expect(result).to.have.lengthOf(0);
      })
    })

     describe("Quando a camada de productsModels encontra produtos no DB", () => {
       beforeEach(() => {
         sinon.stub(productsModel, "getAll").resolves(PRODUCTS_MOCK);
       });

       afterEach(() => {
         productsModel.getAll.restore();
       });
       it("Retorna um array de objetos", async () => {
         const result = await productsModel.getAll();
         expect(result).to.be.deep.equal(PRODUCTS_MOCK);
       });
     });
  })
})