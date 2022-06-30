const { expect } = require("chai");
const sinon = require("sinon");
const productsServices = require("../../../services/productsService");
const PRODUCTS_MOCK = require("../../../mocks/productsMock");
const productsController = require("../../../controllers/productsController");

describe('Testa a camada de productsControllers', () => {
  describe('Quando retorna algum erro para a camada de productsController', () => {
    const res = {};
    const req = {};
    const next = sinon.spy();
    const errorIndex = '0';

    it('A função next é chamada passando como parâmetro o indice referente a um array de erros', async () => {
      await productsController.getAll(req, res, next);
      expect(next.calledWith(errorIndex)).to.be.equal(true);
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