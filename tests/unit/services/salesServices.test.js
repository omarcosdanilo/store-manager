const { expect } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
const salesModel = require('../../../models/salesModel');
const salesProductModel = require("../../../models/salesProductModel");
const salesService = require("../../../services/salesServices");

chai.use(chaiAsPromised);

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

const WRONG_SALES_MOCK = [
  {
    productId: 1,
    quantity: 0,
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

  describe('Testa a função checkExistSale', () => {
    
    describe('A função checkExistsSale', () => {

      afterEach(() => {
        sinon.restore();
      });

      it('Deve lançar um erro caso não encontre a venda', () => {
        sinon.stub(salesModel, 'exists').returns(false);
        chai
          .expect(salesService.checkExistsSale(1))
          .to.eventually.throws({
            status: 404,
            message: { message: "Sale not found" },
          });
      });

      it('Deve retornar true se encontrar a venda', () => {
        sinon.stub(salesModel, "exists").returns(true);
        chai.expect(salesService.checkExistsSale(1)).to.eventually.be.true;
      });

    });

  });

  describe('Testa a função getById da salesService', () => {

    describe('A função getById', () => {

      afterEach(() => {
        sinon.restore();
      });

      it('Deve retornar um erro se der problema no banco', () => {
        sinon.stub(salesModel, 'getById').rejects();
        chai.expect(salesService.getById(1)).to.eventually.be.rejected;
      });

      it('Deve retornar um erro se o model não retornar uma lista', () => {
        sinon.stub(salesModel, 'getById').resolves([{ teste: 1, teste: 2 }]);
        chai.expect(salesService.getById(1)).to.eventually.be.rejected;
      });

      it('Deve retornar um array com as vendas encontradas', () => {
        sinon.stub(salesModel, 'getById').resolves([[]]);
        chai.expect(salesService.getById(1)).to.eventually.be.equal('array');
      });


    });
  });

  describe('Testa a função getAll da salesService', () => {

    describe('A função getAll', () => {

      afterEach(() => {
        sinon.restore();
      });

      it('Deve retornar um erro caso dê problema no DB', () => {
        sinon.stub(salesModel, 'getAll').rejects();
        chai.expect(salesService.getAll()).to.eventually.be.rejected;
      });

      it('Deve retornar um erro caso o DB não retorne uma lista', () => {
        sinon.stub(salesModel, 'getAll').resolves([{ teste: 1, teste: 2 }]);
        chai.expect(salesService.getAll()).to.eventually.be.rejected;
      });

      it('Deve retornar uma lista com todas as vendas caso sejam encontradas no DB', () => {
        sinon.stub(salesModel, 'getAll').resolves([[]]);
        chai.expect(salesService.getAll()).to.eventually.be.equal('array');
      });
    });
  });

  describe('Testa a função validateProductId da salesService', () => {

    describe("A função validateProductId", () => {

      it('Deve lançar um erro se o payload passado não for correto', () => {
        
        try {
          salesService.validateProductId(WRONG_SALES_MOCK);
        } catch (error) {
          expect(error).to.be.throws;
        }
      })
    });
  });
})