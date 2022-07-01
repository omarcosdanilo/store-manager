const productsModel = require('../models/productsModel');

const error = require('../helpers/errorObject');

const productsService = {

  validateProductName(name) {
    if (!name) throw error[1];
    if (name.length < 5) throw error[2];
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
};

module.exports = productsService;