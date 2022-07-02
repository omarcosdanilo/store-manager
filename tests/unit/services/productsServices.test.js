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
  });

  describe('Testa a função getById', () => {

    describe('Quando a camada de productsModels retorna undefined', () => {

      beforeEach(() => {
        sinon.stub(productsModel, 'getById').returns(undefined);
      });
      
      afterEach(() => {
        productsModel.getById.restore();
      });

      it('Deve lançar um erro', async () => {
        try {
          const response = await productsServices.getById();
        } catch (error) {
          expect(error.message.message).to.be.equal('Product not found');
          expect(error.status).to.be.equal(404);
        }

        // await productsServices
        //   .getById()
        //   .catch((error) =>
        //     expect(error.message).to.be.equal('Product not found')
        //   );
      });

    })
  });

  describe('Testa a função create', () => {
    
    it('Deve chamar a função validateProductName', async () => {
      sinon.spy(productsServices, "validateProductName");
      await productsServices.create('teste');

      sinon.assert.calledWith(productsServices.validateProductName, 'teste');
       productsServices.validateProductName.restore();
    });

    it('Deve retornar um objeto em caso o nome do produto seja validado com sucesso', async () => {

      sinon.stub(productsServices, 'validateProductName').resolves('nomeQualquer');
      sinon.stub(productsModel, 'create').resolves({});
      
      const data = await productsServices.create();

      expect(data).to.be.an('object');

      sinon.restore();
    })
  });

  // describe('Testa a função validateProductName', () => {

  //   it.only('Deve lançar um erro se o nome não existir', async () => {

  //   });
  // });
});