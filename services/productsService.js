const productsModel = require('../models/productsModel');

const error = require('../helpers/errorObject');

const productsService = {
  
  async getAll() {
    const products = await productsModel.getAll();
    
    return products;
  },

  async getById(id) {
    const product = await productsModel.getById(id);
    
    if (!product) throw error[0];
    
    return product;
  },
};

module.exports = productsService;