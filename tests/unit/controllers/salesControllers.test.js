const { expect } = require("chai");
const sinon = require("sinon");
const salesController = require("../../../controllers/salesController");
const salesService = require("../../../services/salesServices");

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
})

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

    it('O next deve ser chamado com o objeto { status: 400, message: { message: "productId" is required } }', async () => {
      req.body = [
        {
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ];

      await salesController.create(req, res, next);

      expect(next.calledWith({ status: 400, message: { message: '"productId" is required' } })).to.be.equal(true);
    });

    it('O next deve ser chamado com o objeto { status: 400, message: { message: "quantity" is required } }', async () => {
      req.body = [
        {
          productId: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ];

      await salesController.create(req, res, next);

      expect(
        next.calledWith({
          status: 400,
          message: { message: '"quantity" is required' },
        })
      ).to.be.equal(true);
    });
  });
})