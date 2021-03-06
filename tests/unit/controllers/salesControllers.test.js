const { expect } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const salesController = require("../../../controllers/salesController");
const salesService = require("../../../services/salesServices");

chai.use(chaiAsPromised);

const RESPONSE_MOCK = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },

  /* ... */
];

const RESPONSE_CREATED_MOCK = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const REQUEST_BODY_DATA = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

describe('Testa a função getAll da camada salesController', () => {
  describe('Se tiver dados no DB', () => {
    const res = {};
    const req = {};

    beforeEach(() => {
      sinon.stub(salesService, 'getAll').resolves(RESPONSE_MOCK);
    });

    afterEach(() => {
      salesService.getAll.restore();
    })

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    it('Deve retornar um array com os dados', async () => {
      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(RESPONSE_MOCK)).to.be.equal(true);
    })
  })
});

describe('Testa a função create da camada salesController', () => {

  describe('Se a criação for bem sucedida', () => {
    const res = {};
    const req = {};
    const next = () => { };

    beforeEach(() => {
      req.body = REQUEST_BODY_DATA;
      sinon.stub(salesService, "create").returns(3);
    });

    afterEach(() => {
      salesService.create.restore();
    });
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    it('Retorna um objeto com o id da criação e os itens vendidos', async () => {
      await salesController.create(req, res, next);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(RESPONSE_CREATED_MOCK)).to.be.equal(true);
    });
  });

  describe('Se o payload for passado de maneira incorreta no corpo da requisição', () => {
    const res = {};
    const req = {};
    const next = sinon.spy();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    it('O next deve ser chamado com o erro "productId" is required', async () => {
      req.body = [
        {
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ];
      try {
        await salesController.create(req, res, next);
      } catch (error) {
        expect(next.calledWith(error)).to.be.equal(true);
      }

    });

    it('O next deve ser chamado com o erro  "quantity" is required ', async () => {
      req.body = [
        {
          productId: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ];

      try {
        await salesController.create(req, res, next);
      } catch (error) {
        expect(next.calledWith(error)).to.be.equal(true);
      }
    });
  });
});

describe('Testa a função getById da salesController', () => {

  describe('A função getById', () => {

    res = {};
    req = {};

    afterEach(() => {
      sinon.restore();
    });

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    it("Deve disparar o erro caso o salesService.checkExistsSale(id) dispare um erro", () => {
      sinon.stub(salesService, 'checkExistsSale').rejects();
      return chai.expect(salesController.getById({}, {})).to.be.eventually.rejected
    });

    it("Deve disparar o erro caso o salesService.getById(id) dispare um erro", () => {
      sinon.stub(salesService, "getById").rejects();
      return chai.expect(salesController.getById({}, {})).to.be.eventually.rejected;
    });

    it("Deve chamar o res.json passando um array com as vendas encontradas", async () => {
      sinon.stub(salesService, "checkExistsSale").resolves(true);
      sinon.stub(salesService, "getById").resolves([[]]);
      req.params = { id: 1 };
      await salesController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith([[]])).to.be.equal(true);
    });
  })
});

describe("Testa a função delete da salesController", () => {
  describe("A função delete", () => {
    const res = {};
    const req = {};
    const next = sinon.spy();

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      req.params = { id: 1 };
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Deve chamar o res.status com o statusCode 204 caso remova o produto", async () => {
      sinon.stub(salesService, "checkExistsProduct").resolves();
      sinon.stub(salesService, "delete").resolves();

      await salesController.delete(req, res, next);

      expect(res.status.calledWith(204)).to.be.equal(true);
    });

    it("Deve chamar o next passando um erro como parâmetro caso não exista o produto no DB", async () => {
      try {
        sinon.stub(salesService, "checkExistsProduct").rejects();
        await salesController.delete(req, res, next);
      } catch (error) {
        expect(next.calledWith(error)).to.be.equal(true);
      }
    });
  });
});

describe('Testa a função update da salesController', () => {

  describe('A função salesController', () => {

    const res = {};
    const req = {};
    const next = sinon.spy();

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      req.params = { id: 1 };
      req.body = [
        {
          productId: 1,
          quantity: 10,
        },
        {
          productId: 2,
          quantity: 50,
        },
      ];
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Deve chamar o método status com o status code 200 se o DB for atualiazado", async () => {
      sinon.stub(salesService, "validateProductId").returns(true);
      sinon.stub(salesService, "validateQuantity").returns(true);
      sinon.stub(salesService, "checkExistsSale").resolves(true);
      sinon.stub(salesService, "checkExistsProduct").resolves(true);

      await salesController.update(req, res, next);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});