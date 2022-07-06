const { expect } = require('chai');
const chai = require("chai");
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");
const connection = require('../../../models/connection');
const salesModels = require('../../../models/salesModel');

chai.use(chaiAsPromised);

const CREATED_RESPONSE = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 1,
  info: "",
  serverStatus: 2,
  warningStatus: 0,
};

describe('Testa a função create da salesModels', () => {
  describe('Se a criação for bem sucedida', () => {
    
    before(() => {
      sinon.stub(connection, 'query').resolves([CREATED_RESPONSE]);
    })

    afterEach(() => {
      connection.query.restore();
    })

    it('Retorna o id do item inserido', async () => {
      const data = await salesModels.create();

      expect(data).to.be.a('number');
    })

  })
});

describe('Testa a função getAll da salesModels', () => {
  describe("Se não encontrar nenhum dado no DB", () => {
    
    beforeEach(() => {
      sinon.stub(connection, 'query').resolves([[]]);
    });

    afterEach(() => {
      connection.query.restore();
    });

    it('retorna um array vazio', async () => {
      const data = await salesModels.getAll();
  
      expect(data).to.be.an('array');
    })
  });
});

describe('Testa a função "exists" da salesModel', () => {

  describe('A função "exists"', () => {

    afterEach(() => {
      sinon.restore();
    });

    it('Deve disparar um erro caso dê problema no DB', () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(salesModels.exists(1)).to.eventually.be.rejected;
    });

    it('Deve disparar um erro caso o mysql retorna algo que não seja uma lista', () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
      chai.expect(salesModels.exists(1)).to.eventually.be.rejected;
    });

    it('Deve retorna false caso não encontre a venda', () => {
      sinon.stub(connection, 'query').resolves([[]]);
      chai.expect(salesModels.exists(1)).to.eventually.be.false;
    });

    it('Deve retornar true se encontrar a venda', () => {
      sinon.stub(connection, 'query').resolves([[{}]]);
      chai.expect(salesModels.exists(1)).to.be.eventually.true
    });
  });
});

describe('Testa a função getById da salesModel', () => {

  describe('A função getById', () => {

    afterEach(() => {
      sinon.restore();
    })
    
    it('deve retornar um erro caso dê problema no DB', () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(salesModels.getById(1)).to.eventually.be.rejected;
    });

    it('deve retornar um erro caso o DB não retorne uma lista', () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(salesModels.getById(1)).to.eventually.be.rejected;
    });

    it('deve retornar um array caso encontre vendas com o id passado por parâmetro', () => {
      sinon.stub(connection, 'query').resolves([[]]);
      chai.expect(salesModels.getById(1)).to.eventually.be.equal('array');
    });
  })
});

describe("Testa a função delete da salesModel", () => {
  describe("A função delete", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("Deve lançar um erro caso dê problema no DB", () => {
      sinon.stub(connection, "query").rejects();
      chai.expect(salesModels.delete(1)).to.eventually.be.rejected;
    });

    it("Deve deletar o produto", () => {
      sinon.stub(connection, "query").resolves();
      chai.expect(salesModels.delete(1)).to.eventually.be.ok;
    });
  });
});