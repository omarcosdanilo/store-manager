const { expect } = require("chai");
const sinon = require("sinon");
const productsServices = require("../../../services/productsService");
const PRODUCTS_MOCK = require("../../../mocks/productsMock");
const productsController = require("../../../controllers/productsController");
const productsModel = require("../../../models/productsModel");

describe('Testa a camada de productsControllers', () => {
  describe("Testa a função getAll da productsController", () => {
    describe("Quando retorna algum erro para a camada de productsController", () => {
      const res = {};
      const req = {};
      const next = () => { };

      beforeEach(() => {
        sinon.stub(productsServices, "getAll").rejects();
      });

      afterEach(() => {
        productsServices.getAll.restore();
      });

      it("A função next é chamada passando como parâmetro um erro caso dê erro no DB", async () => {
        try {
          await productsController.getAll(req, res, next);
        } catch (error) {
          expect(next.calledWith(error)).to.be.equal(true);
        }
      });
    });

    describe("Quando retorna um array de produtos da camada de productsServices", () => {
      const res = {};
      const req = {};
      const next = () => { };

      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsServices, "getAll").resolves(PRODUCTS_MOCK);
      });

      afterEach(() => {
        productsServices.getAll.restore();
      });

      it("É chamada a função status com o valor 200", async () => {
        await productsController.getAll(req, res, next);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("É chamada a funcao json com o array de produtos", async () => {
        await productsController.getAll(req, res, next);

        expect(res.json.calledWith(PRODUCTS_MOCK)).to.be.equal(true);
      });
    });
  });

  describe('Testa a função getById da productsController', () => {

    describe("Quando retorna algum erro para a camada de productsController", () => {
      const res = {};
      const req = {};
      const next = () => { };

      beforeEach(() => {
        sinon.stub(productsServices, "getById").rejects();
      });

      afterEach(() => {
        productsServices.getById.restore();
      });

      it("A função next é chamada passando como parâmetro um erro caso dê erro no DB", async () => {
        try {
          await productsController.getById(req, res, next);
        } catch (error) {
          expect(next.calledWith(error)).to.be.equal(true);
        }
      });
    });

    describe("Quando retorna um produto da camada de productServices", () => {
      const res = {};
      const req = {};
      const next = () => { };

      const payload = {
        id: 1,
        name: "Martelo de Thor",
      };

      beforeEach(() => {
        req.params = { id: 1 }
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsServices, 'getById').resolves(payload);
      });

      afterEach(() => {
        productsServices.getById.restore();
      });

      it("É chamado o método status com o valor 200", async () => {
        await productsController.getById(req, res, next);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("É chamadao o método json com um objeto no formato { id: idProduct, name: 'nameProduct'}", async () => {
        await productsController.getById(req, res, next);

        expect(res.json.calledWith(payload)).to.be.equal(true);
      });
    });
  })

  describe("Testa a função create da productControllers", () => {
    describe("Quando o payload não é informado", () => {
      const res = {};
      const req = {};
      const next = () => {};

      beforeEach(() => {
        req.body = {};
        // res.status = sinon.stub().returns(res);
        // req.send = sinon.stub().returns();
      });

      afterEach(() => {
        sinon.restore();
      });

      it("A função next é chamada com um objeto de erro", async () => {
        try {
          sinon.stub(productsServices, "create").rejects();

          await productsController.create(req, res, next);
        } catch (error) {
          expect(next.calledWith(error)).to.be.equal(true);
        }
      });
    });

    describe("Quando o payload é informado corretamente", () => {
      const res = {};
      const req = {};
      const next = () => {};

      beforeEach(() => {
        req.body = { name: "Teste" };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });
      afterEach(() => {
        sinon.restore();
      });
      describe("A função create", () => {
        it("Deve retornar um status 200 com o conteúdo criado", async () => {
          sinon.stub(productsServices, "create").resolves("Teste");

          await productsController.create(req, res, next);

          expect(res.status.calledWith(201)).to.be.equal(true);
        });
      });
    });
  });

  describe("Testa a função update da productControllers", () => {
    describe("A função update", () => {
      const res = {};
      const req = {};
      const next = () => {};

      beforeEach(() => {
        req.body = { name: "teste" };
        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsServices, "checkExistsProduct").resolves(1);
        sinon.stub(productsServices, "validateProductName").returns(true);
        sinon.stub(productsServices, "update").resolves(true);
      });

      afterEach(() => {
        sinon.restore();
      });

      it("Deve atualizar o DB Se todas as validações retornarem true", async () => {
        await productsController.update(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith({ id: 1, name: "teste" })).to.be.equal(true);
      });
    });

    describe("A função update", () => {
      const res = {};
      const req = {};
      const next = sinon.spy();

      afterEach(() => {
        sinon.restore();
      });

      it("Deve lançar um erro no next caso a função checkExistsProduct lance um erro", async () => {
        sinon.stub(productsServices, "checkExistsProduct").rejects();
        try {
          await productsController.update(req, res, next);
        } catch (error) {
          expect(next.calledWith(error)).to.be.equal(true);
        }
      });

      it("Deve lançar um erro no next caso a função validateProductName lance um erro", async () => {
        sinon.stub(productsServices, "validateProductName").throws();
        try {
          await productsController.update(req, res, next);
        } catch (error) {
          expect(next.calledWith(error)).to.be.equal(true);
        }
      });
    });
  });

  describe('Testa a função delete da productControllers', () => {

    describe('A função delete', () => {
      const res = {};
      const req = {};
      const next = sinon.spy();

      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        req.params = { id: 1 };
      })

      afterEach(() => {
        sinon.restore();
      });

      it('Deve chamar o res.status com o statusCode 204 caso remova o produto', async () => {
        sinon.stub(productsServices, 'checkExistsProduct').resolves();
        sinon.stub(productsServices, 'delete').resolves();

        await productsController.delete(req, res, next);

        expect(res.status.calledWith(204)).to.be.equal(true);
      });

      it('Deve chamar o next passando um erro como parâmetro caso não exista o produto no DB', async () => {
        try {

          sinon.stub(productsServices, "checkExistsProduct").rejects();
          await productsController.delete(req, res, next);

        } catch (error) {
          expect(next.calledWith(error)).to.be.equal(true);
        }
      });
    });
  });
});