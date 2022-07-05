const productsModel = require('../models/productsModel');

const error = require('../helpers/errorObject');

const productsService = {
  validateProductName(name) {
    // if (!name) throw Error(error[1]);
    if (!name) throw Error('"name" is required');
    // if (name.length < 5) throw Error(error[2]);
    if (name.length < 5) throw Error('"name" length must be at least 5 characters long');
  },

  async checkExistsProduct(id) {
    const exist = await productsModel.exists(id);

    if (!exist) throw Error('Product not found');

    return true;
  },

  async getAll() {
    const products = await productsModel.getAll();

    return products;
  },

  async getById(id) {
    const product = await productsModel.getById(id);

    if (!product) throw error[0];

    return product;
  },

  async create(productName) {
    this.validateProductName(productName);

    const data = await productsModel.create(productName);

    return data;
  },

  async update(id, productName) {
    await productsModel.update(id, productName);
  },

  async delete(id) {
    await productsModel.delete(id);
  },
};

module.exports = productsService;