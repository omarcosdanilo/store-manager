const productsModel = require('../models/productsModel');

const productsService = {
  
  async getAll() {
    const products = await productsModel.getAll();
    
    return products;
  },

  async getById(id) {
    const product = await productsModel.getById(id);

    if (!product) throw new Error();
    
    return product;
  },
};

module.exports = productsService;