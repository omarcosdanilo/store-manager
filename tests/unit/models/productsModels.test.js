const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const PRODUCTS_MOCK = require('../../../mocks/productsMock');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.use(chaiAsPromised);

describe('Testa a camada productModels', () => {
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

  describe('Testa a função getById', () => {

    describe('Quando não encontra um produto com o id passado por parametro', () => {

       beforeEach(() => {
         sinon.stub(connection, "query").resolves([[]]);
       });

       afterEach(() => {
         connection.query.restore();
       });
      
      it('Deve retornar undefined', async () => {
        const result = await productsModel.getById(1);

        expect(result).to.be.undefined;
      });
    });

    describe('Quando encontra um produto com o id passado por parametro', () => {
      const payload = {
        id: 1,
        name: "Martelo de Thor",
      };

       beforeEach(() => {
         sinon.stub(connection, "query").resolves([[payload]]);
       });

       afterEach(() => {
         connection.query.restore();
       });
      
         it('Deve retornar um objeto com o formato { id: idProduct , name: "nameProduct" }', async () => {
           const result = await productsModel.getById(1);

           expect(result).to.be.deep.equal(payload);
         });
    })
  })

  describe('Testa a função create', () => {

    it('Deve disparar um erro caso dê problema no mysql', async () => {
      sinon.stub(connection, 'query').rejects()
      chai.expect(productsModel.create('ProdutoX')).to.eventually.be.rejected;
      sinon.restore();
    });

    it('Em caso de sucesso Deve retornar um objeto', async () => {
      sinon.stub(connection, 'query').resolves([{}])
      const data = await productsModel.create('ProdutoX');
      expect(data).to.be.an('object');
    });
  })
})