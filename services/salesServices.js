const salesModel = require('../models/salesModel');
const salesProductModel = require('../models/salesProductModel');

const error = require('../helpers/errorObject');

const salesService = {

  validateProductId(sales) {
    const productsIds = sales.map((sale) => sale.productId);
    const includesZeroOrUnder = sales.some((sale) => sale.quantity === 0 || sale.quantity < 0);

    if (productsIds.includes(undefined)) throw error[3];
    if (includesZeroOrUnder) throw error[5];
  },

  validateQuantity(sales) {
    const quantities = sales.map((sale) => sale.quantity);

    if (quantities.includes(undefined)) throw error[4];
  },

  async checkExistsProduct(sales) {
    const productsIds = sales.map((sale) => sale.productId);
    
    const products = await Promise.all(
      productsIds.map((id) => salesProductModel.exists(id)),
    );
    
    const reduced = products.reduce((acc, currValue) => acc.concat(currValue), []);
    const exists = productsIds.length === reduced.length;
    
    if (!exists) throw error[6];
    
    return true;
  },

  async create(sales) {
    this.validateProductId(sales);
    this.validateQuantity(sales);
    await this.checkExistsProduct(sales);

    const id = await salesModel.create();

    await Promise.all(sales.map((sale) => salesProductModel.create({ id, ...sale })));

    return id;
  },

  async getAll() {
    const data = await salesModel.getAll();

    const formated = data.map((obj) => ({
      saleId: ,
      productId ,
    }));

    return data;
  },
};

module.exports = salesService;