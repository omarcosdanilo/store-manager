const { expect } = require("chai");
const sinon = require("sinon");
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productsServices = require('../../../services/productsService');
const productsModel = require("../../../models/productsModel");
const PRODUCTS_MOCK = require("../../../mocks/productsMock");

chai.use(chaiAsPromised);

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

    describe('A função getById', () => {

      // beforeEach(() => {
      //   sinon.stub(productsModel, 'getById').returns(undefined);
      // });
      
      afterEach(() => {
        // productsModel.getById.restore();
        sinon.restore();
      });

      it('Deve lançar um erro se não encontrar o produto', async () => {
        sinon.stub(productsModel, "getById").returns(undefined);

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

      it('Deve retornar o produto caso seja encontrado no DB', () => {
        sinon.stub(productsModel, 'getById').resolves(1);
        chai.expect(productsServices.getById(1)).to.eventually.be.deep.equal({
          id: 1,
          name: "Machado do Thor Stormbreaker",
        });
      })

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

  describe("Testa a função checkExistsProduct", () => {

    describe("A função checkExistsProduct", () => {

      afterEach(() => {
        sinon.restore();
      });
    
      it("Deve lançar um erro se der problema no DB",  () => {
        sinon.stub(productsModel, 'exists').rejects();
        chai.expect(productsServices.checkExistsProduct(1)).to.eventually.be.rejected;
      });

      it("Deve lançar um erro se o produto não existir no DB",  () => {
        sinon.stub(productsModel, 'exists').returns(false);
        chai
          .expect(productsServices.checkExistsProduct(1))
          .to.eventually.throws("Product not found");
      });

      it("Deve retornar true se o produto existir no DB",  () => {
        sinon.stub(productsModel, 'exists').resolves(1);
        chai.expect(productsServices.checkExistsProduct(1)).to.eventually.be.true;
      });
    });
  });

  describe('Testa a função update', () => {

    describe('A função update', () => {

      afterEach(() => {
        sinon.restore();
      });

      it('Deve retornar um erro caso dê erro no DB', () => {
        sinon.stub(productsModel, 'update').rejects();
        chai.expect(productsServices.update(1, "Martelo do Marcos")).to.be.eventually.rejected;
      });

      it('Deve atualizar o DB caso todas as validações estejam ok', () => {
          sinon.stub(productsModel, "update").resolves(1, "Martelo do Marcos");
          chai.expect(productsServices.update(1, "Martelo do Marcos")).to.be.eventually.ok
      });
    });
  });

  describe("Testa a função validateProductName", () => {

    describe("A função validateProductName", () => {
  
      it('Deve lançar um erro caso o parâmetro passado esteja incorreto', () => {
        chai
          .expect(() => productsServices.validateProductName("a"))
          .to.throws('"name" length must be at least 5 characters long');
      });

      it('Deve lançar um erro caso não passe parâmetro', () => {
        chai
          .expect(() => productsServices.validateProductName())
          .to.throws('"name" is required');
      });
    });

  });
});