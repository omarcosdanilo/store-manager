const salesModel = require('../models/salesModel');
const salesProductModel = require('../models/salesProductModel');
const errorEncoding = require('../utils/errorEncoding');

// const error = require('../helpers/errorObject');

const salesService = {

  validateProductId(sales) {
    const productsIds = sales.map((sale) => sale.productId);
    const includesZeroOrUnder = sales.some((sale) => sale.quantity === 0 || sale.quantity < 0);

    if (productsIds.includes(undefined)) errorEncoding(400, '"productId" is required');
    if (includesZeroOrUnder) errorEncoding(422, '"quantity" must be greater than or equal to 1');
  },

  validateQuantity(sales) {
    const quantities = sales.map((sale) => sale.quantity);

    if (quantities.includes(undefined)) errorEncoding(400, '"quantity" is required');
  },

  async checkExistsProduct(sales) {
    const productsIds = sales.map((sale) => sale.productId);
    
    const products = await Promise.all(
      productsIds.map((id) => salesProductModel.exists(id)),
    );
    
    const reduced = products.reduce((acc, currValue) => acc.concat(currValue), []);
    const exists = productsIds.length === reduced.length;
    
    if (!exists) errorEncoding(404, 'Product not found');
    
    return true;
  },

  async checkExistsSale(id) {
    const exist = await salesModel.exists(id);

    if (!exist) errorEncoding(404, 'Sale not found');

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
      saleId: obj.sale_id,
      date: obj.date,
      productId: obj.product_id,
      quantity: obj.quantity,
    }));

    return formated;
  },

  async getById(id) {
    const data = await salesModel.getById(id);

    const formated = data.map((obj) => ({
      date: obj.date,
      productId: obj.productId,
      quantity: obj.quantity,
    }));

    return formated;
  },

  async delete(id) {
    await salesModel.delete(id);
  },

  async update(saleId, updates) {
    await Promise.all(
      updates.map((update) => salesProductModel.update({ saleId, ...update })),
    );
  },
};

module.exports = salesService;