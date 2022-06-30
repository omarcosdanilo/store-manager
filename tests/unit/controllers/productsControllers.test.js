const { expect } = require("chai");
const sinon = require("sinon");
const productsServices = require("../../../services/productsService");
const PRODUCTS_MOCK = require("../../../mocks/productsMock");
const productsController = require("../../../controllers/productsController");
const productsModel = require("../../../models/productsModel");

describe('Testa a camada de productsControllers', () => {
  describe('Quando retorna algum erro para a camada de productsController', () => {
    const res = {};
    const req = {};
    const next = () => {};

    beforeEach(() => {
      sinon.stub(productsServices, 'getAll').rejects();
    });

    afterEach(() => {
      productsServices.getAll.restore();
    });

    it('A função next é chamada passando como parâmetro um erro caso dê erro no DB', async () => {
     try {
       await productsController.getAll(req, res, next);
      
     } catch (error) {
       expect(next.calledWith(error)).to.be.equal(true);
      
     }
    })
  })
  
  describe('Quando retorna um array de produtos da camada de productsServices', () => {

    const res = {};
    const req = {};
    const next = () => { };

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAll').resolves(PRODUCTS_MOCK);
    })

    afterEach(() => {
      productsServices.getAll.restore();
    })

  
    it('É chamada a função status com o valor 200', async () => {
      await productsController.getAll(req, res, next);

      expect(res.status.calledWith(200)).to.be.equal(true);
    })

    it('É chamada a funcao json com o array de produtos', async () => {
      await productsController.getAll(req, res, next);

       expect(res.json.calledWith(PRODUCTS_MOCK)).to.be.equal(true);
    })
  })
})